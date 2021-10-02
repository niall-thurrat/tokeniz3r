export default class Token {
  #type
  #value

  get type() {
    return this.#type
  }

  get value() {
    return this.#value
  }
  
  constructor (type, value) {
    this.#type = type
    this.#value = value
  }
}

Token.prototype.toString = function() {
  return `${this.type}("${this.value}")`
}
