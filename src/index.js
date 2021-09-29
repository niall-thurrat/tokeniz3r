import Grammar from './Grammar.js'
import Token from './Token.js'
import MethodCallError from './exceptions/MethodCallError.js'
import LexicalError from './exceptions/LexicalError.js'

export default class Tokenizer {
  constructor (inputStr, grammar) {
    this.inputStr = inputStr.trim()
    this.grammar = new Grammar(grammar)
    this.activeToken = this.getBestMatchingToken(this.inputStr, false)
    this.currentIndex = 0
  }

  getActiveToken () {
    return this.activeToken
  }

  setActiveTokenToNext () {
    if (this.activeToken.type === 'END') {
      throw new MethodCallError('setActiveTokenToNext should not be called when END token is active')
    } else {
      const nextIndex = this.getNextIndex()
      const strAfterToken = this.inputStr.slice(nextIndex)
      this.activeToken = this.getBestMatchingToken(strAfterToken, false)
      this.setCurrentIndex(nextIndex)
    }
  }

  setActiveTokenToPrevious () {
    if (this.currentIndex === 0) {
      throw new MethodCallError('setActiveTokenToPrevious should not be called when first token is active')
    } else {
      const strBeforeToken = this.inputStr.slice(0, this.currentIndex)
      this.activeToken = this.getBestMatchingToken(strBeforeToken, true)
      const prevIndex = this.getPreviousIndex(strBeforeToken, this.activeToken.value.length)
      this.setCurrentIndex(prevIndex)
    }
  }

  getNextIndex () {
    const activeTokenLength = this.activeToken.value.length
    const spaceCount = this.countSpacesAfterActiveToken()

    return this.currentIndex + activeTokenLength + spaceCount
  }

  countSpacesAfterActiveToken () {
    const newIndex = this.currentIndex + this.activeToken.value.length
    const strAfterToken = this.inputStr.slice(newIndex)

    return strAfterToken.indexOf(strAfterToken.trim())
  }

  getPreviousIndex (strBeforeToken, prevTokenLength) {
    const preceedingSpaceCount = strBeforeToken.match(/(\s*)$/)[1].length

    return this.currentIndex - preceedingSpaceCount - prevTokenLength
  }

  getBestMatchingToken(strToMatch, isForPrevious) {
    const grammarRules = isForPrevious ? this.grammar.previousTokenRules : this.grammar.nextTokenRules
    const matchingTokens = this.getMatchingTokens(grammarRules, strToMatch)

    this.throwErrorIfNoMatchingToken(matchingTokens, strToMatch)
    
    return (matchingTokens.length > 1) ? this.applyMaximalMunch(matchingTokens)[0] : matchingTokens[0]
  }

  getMatchingTokens(grammarRules, strToMatch) {
    const matchingTokens = []

    grammarRules.forEach(rule => {
    const match = strToMatch.trim().match(rule.regex)
    if (match !== null) {
        matchingTokens.push(new Token(rule.tokenType, match[0].toString()))
    }
    })

    return matchingTokens
  }

  throwErrorIfNoMatchingToken(matchingTokens, matchedStr) {
    if (matchingTokens.length === 0) {
      throw new LexicalError(`No grammar rule matches string \'${this.limitStrTo10Chars(matchedStr)}\'`)
    }
  }

  limitStrTo10Chars (str) {
    return (str.length > 10) ? `${str.slice(0, 10)}...` : str
  }

  applyMaximalMunch (tokens) {
    tokens.sort((a, b) => b.value.length - a.value.length)

    if (tokens[0].value.length === tokens[1].value.length) {
      throw new LexicalError(`Maximal munch cannot be applied to tokens \'${tokens[0].toString()}\' and \'${tokens[1].toString()}\'`)
    }
    return tokens
  }

  getCurrentIndex () {
    return this.currentIndex
  }

  setCurrentIndex (newIndex) {
    this.currentIndex = newIndex
  }
}
