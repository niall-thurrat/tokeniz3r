export default class Rule {
  #tokenType
  #regex

  get tokenType() {
    return this.#tokenType
  }

  constructor (tokenType, regex) {
    this.#tokenType = tokenType
    this.#regex = regex
  }

  getMatch(strToMatch) {
    const match = strToMatch.trim().match(this.#regex)

    return (match !== null) ? match[0].toString() : null
  }

  getRegexStr() {
    return this.#regex.toString()
  }
}
