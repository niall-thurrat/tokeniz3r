export default class Token {
  #type
  #value
  
  constructor (type, value) {
    this.#type = type
    this.#value = value

    this.toString = function() {
      return `${this.#type}("${this.#value}")`
    }
  }
  
  getType() {
    return this.#type
  }

  getValue() {
    return this.#value
  }
}
