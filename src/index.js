import Grammar from './Grammar.js'
import MethodCallError from './exceptions/MethodCallError.js'

export default class Tokenizer {
  #inputStr
  #grammar
  #currentIndex
  #activeToken

  get inputStrCurrentIndex() {
    return this.#currentIndex
  }

  get activeToken () {
    return this.#activeToken // not a high abstraction level - make a function instead
  }

  constructor (inputStr, grammar) {
    this.#inputStr = inputStr.trim()
    this.#grammar = new Grammar(grammar)
    this.#currentIndex = 0
    this.#activeToken = this.#grammar.getBestMatchingToken(this.#inputStr, false)
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

  #throwExceptionIfSettingActiveTokenAfterEndToken() {
    if (this.#activeToken.type === 'END')
      throw new MethodCallError('setActiveTokenToNext should not be called when END token is active')
  }
  
  #throwExceptionIfSettingActiveTokenBeforeIndex0() {
    if (this.#currentIndex === 0)
      throw new MethodCallError('setActiveTokenToPrevious should not be called when first token is active')
  }
}
