export default class GrammarValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'GrammarValidationError'
  }
}
