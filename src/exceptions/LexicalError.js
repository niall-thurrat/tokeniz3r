export default class LexicalError extends Error {
    constructor(message) {
      super(message)
      this.name = 'LexicalError'
    }
}
