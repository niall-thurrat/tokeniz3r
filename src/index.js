export class Tokenizer {
    constructor(inputStr, grammar) {
        this.inputStr = inputStr
        this.grammar = grammar
      }

    getFirstToken() {
        const wordRegex = this.grammar[0].regex
        const match = this.inputStr.match(wordRegex)
        // match example [ 'return', index: 0, input: 'return me please.', groups: undefined ]

        const token = {
            type: 'word',
            value: match[0]
        }

        return token
    }
}