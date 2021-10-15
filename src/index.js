import Grammar from './Grammar.js'
import MethodCallError from './exceptions/MethodCallError.js'

export default class Tokenizer {
  #inputStr
  #grammar
  #currentIndex
  #activeToken

  constructor (inputStr, grammar) {
    this.#inputStr = inputStr.trim()
    this.#grammar = new Grammar(grammar)
    this.#currentIndex = 0
    this.#activeToken = this.#grammar.getBestMatchingToken(this.#inputStr, false)
  }

  getInputStrCurrentIndex() {
    return this.#currentIndex
  }

  getActiveToken() {
    return this.#activeToken
  }

  setActiveTokenToNext() {
    this.#throwExceptionIfSettingActiveTokenAfterEndToken()
    const nextIndex = this.#getNextIndex()
    const strAfterToken = this.#inputStr.slice(nextIndex)
    this.#activeToken = this.#grammar.getBestMatchingToken(strAfterToken, false)

    this.#currentIndex = nextIndex
  }

  setActiveTokenToPrevious() {
    this.#throwExceptionIfSettingActiveTokenBeforeIndex0()
    const strBeforeToken = this.#inputStr.slice(0, this.#currentIndex)
    this.#activeToken = this.#grammar.getBestMatchingToken(strBeforeToken, true)

    const prevIndex = this.#getPreviousIndex(strBeforeToken, this.#activeToken.getValue().length)
    this.#currentIndex = prevIndex
  }

  #getNextIndex() {
    const tokenLength = this.#activeToken.getValue().length
    const spaceCount = this.#countSpacesAfterActiveToken()

    return this.#currentIndex + tokenLength + spaceCount
  }

  #countSpacesAfterActiveToken() {
    const newIndex = this.#currentIndex + this.#activeToken.getValue().length
    const strAfterToken = this.#inputStr.slice(newIndex)

    return strAfterToken.indexOf(strAfterToken.trim())
  }

  #getPreviousIndex(strBeforeToken, prevTokenLength) {
    const preceedingSpaceCount = strBeforeToken.match(/(\s*)$/)[1].length

    return this.#currentIndex - preceedingSpaceCount - prevTokenLength
  }

  #throwExceptionIfSettingActiveTokenAfterEndToken() {
    if (this.#activeToken.getType() === 'END')
      throw new MethodCallError('setActiveTokenToNext should not be called when END token is active')
  }

  #throwExceptionIfSettingActiveTokenBeforeIndex0() {
    if (this.#currentIndex === 0)
      throw new MethodCallError('setActiveTokenToPrevious should not be called when first token is active')
  }
}
