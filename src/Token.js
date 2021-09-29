export default class Token {
   constructor (type, value) {
    this.type = type
    this.value = value
  }
}

Token.prototype.toString = function() {
  return `${this.type}("${this.value}")`
}
