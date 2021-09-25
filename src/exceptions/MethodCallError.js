export default class MethodCallError extends Error {
    constructor(message) {
      super(message);
      this.name = "MethodCallError"
    }
}
