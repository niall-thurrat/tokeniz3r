export default class Rule {
  #tokenType
  #regex

  get tokenType() {
    return this.#tokenType
  }

  get regex() {
    return this.#regex
  }

  constructor (tokenType, regex) {
    this.#tokenType = tokenType
    this.#regex = regex
  }
}
