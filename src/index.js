import Grammar from './Grammar.js'
import Token from './Token.js'
import MethodCallError from './exceptions/MethodCallError.js'
import LexicalError from './exceptions/LexicalError.js'

export default class Tokenizer {
  #inputStr
  #grammar
  #currentIndex
  #activeToken

  get inputStrCurrentIndex() {
    return this.#currentIndex
  }

  get activeToken () {
    return this.#activeToken
  }

  constructor (inputStr, grammar) {
    this.#inputStr = inputStr.trim()
    this.#grammar = new Grammar(grammar)
    this.#currentIndex = 0
    this.#activeToken = this.getBestMatchingToken(this.#inputStr, false)
  }

  setActiveTokenToNext() {
    this.#throwExceptionIfSettingActiveTokenAfterEndToken()
    const nextIndex = this.#getNextIndex()
    const strAfterToken = this.#inputStr.slice(nextIndex)
    this.#activeToken = this.getBestMatchingToken(strAfterToken, false)

    this.#currentIndex = nextIndex
  }

  setActiveTokenToPrevious() {
    this.#throwExceptionIfSettingActiveTokenBeforeIndex0()
    const strBeforeToken = this.#inputStr.slice(0, this.#currentIndex)
    this.#activeToken = this.getBestMatchingToken(strBeforeToken, true)

    const prevIndex = this.#getPreviousIndex(strBeforeToken, this.#activeToken.value.length)
    this.#currentIndex = prevIndex
  }

  #getNextIndex() {
    const activeTokenLength = this.#activeToken.value.length
    const spaceCount = this.#countSpacesAfterActiveToken()

    return this.#currentIndex + activeTokenLength + spaceCount
  }

  #countSpacesAfterActiveToken() {
    const newIndex = this.#currentIndex + this.#activeToken.value.length
    const strAfterToken = this.#inputStr.slice(newIndex)

    return strAfterToken.indexOf(strAfterToken.trim())
  }

  #getPreviousIndex(strBeforeToken, prevTokenLength) {
    const preceedingSpaceCount = strBeforeToken.match(/(\s*)$/)[1].length

    return this.#currentIndex - preceedingSpaceCount - prevTokenLength
  }

  getBestMatchingToken(strToMatch, isPreviousToken) {
    const rules = isPreviousToken ? this.#grammar.previousTokenRules : this.#grammar.nextTokenRules
    const tokens = this.#getMatchingTokens(rules, strToMatch)
    this.#throwExceptionIfNoMatchingToken(tokens, strToMatch)
    
    return (tokens.length > 1) ? this.#getLongestMatch(tokens) : tokens[0]
  }

  #getMatchingTokens(rules, strToMatch) {
    const tokens = []

    rules.forEach(rule => {
      const match = strToMatch.trim().match(rule.regex)
      if (match !== null)
        tokens.push(new Token(rule.tokenType, match[0].toString()))
    })
    return tokens
  }

  #getLongestMatch(tokens) {
    tokens.sort((a, b) => b.value.length - a.value.length)
    this.#throwExceptionIfNoLongestMatch(tokens)

    return tokens[0]
  }

  #throwExceptionIfSettingActiveTokenAfterEndToken() {
    if (this.#activeToken.type === 'END')
      throw new MethodCallError('setActiveTokenToNext should not be called when END token is active')
  }
  #throwExceptionIfSettingActiveTokenBeforeIndex0() {
    if (this.#currentIndex === 0)
      throw new MethodCallError('setActiveTokenToPrevious should not be called when first token is active')
  }

  #throwExceptionIfNoMatchingToken(matchingTokens, matchedStr) {
    if (matchingTokens.length === 0)
      throw new LexicalError(`No grammar rule matches string \'${this.#limitStrTo10Chars(matchedStr)}\'`)
  }
  
  #limitStrTo10Chars(str) {
    return (str.length > 10) ? `${str.slice(0, 10)}...` : str
  }

  #throwExceptionIfNoLongestMatch(tokens) {
    if (tokens[0].value.length === tokens[1].value.length)
      throw new LexicalError(`Cannot get a longest match from tokens \'${tokens[0].toString()}\' and \'${tokens[1].toString()}\'`)
  }
}
