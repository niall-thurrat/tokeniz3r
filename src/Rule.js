export default class Rule {
  #tokenType
  #regex

  get tokenType() {
    return this.#tokenType
  }

  get regex() { // CHALLENGE - Consider making regex truly private by removing the getter and instead move responsibility into the Rule class.
    return this.#regex
  }

  constructor (tokenType, regex) {
    this.#tokenType = tokenType
    this.#regex = regex
  }
}
