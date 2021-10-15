export default class Rule {
  #tokenType
  #regex

  constructor (tokenType, regex) {
    this.#tokenType = tokenType
    this.#regex = regex
  }

  getTokenType() {
    return this.#tokenType
  }

  getMatch(strToMatch) {
    const match = strToMatch.trim().match(this.#regex)

    return (match !== null) ? match[0].toString() : null
  }

  getRegexStr() {
    return this.#regex.toString()
  }
}
