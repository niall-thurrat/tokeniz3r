export class Tokenizer {
    constructor(inputStr, grammar) {
        this.inputStr = inputStr
        this.grammar = grammar
        this.activeToken = this.getFirstToken()
        // this.currentIndex = 0
    }

    getFirstToken() {
        return this.getBestMatch()
    }

    getBestMatch() {
        let matchingTokens = []

        this.grammar.forEach(rule => {
            const match = this.inputStr.match(rule.regex)
            if (match !== null) {
                const token = {
                    type: rule.tokenType,
                    value: match.toString() 
                }
                matchingTokens.push(token)
            }
        })
        // TODO multiple munch handled here AND? other multiple results
        // TODO handle no matches
        return matchingTokens[0]
    }

    // TODO:
    // create activeToken property
    // set activeToken in constructor OR return error
    // how do we know where active token is in string? create currentIndex
    // create getActiveToken method
    // create setActiveTokenToNext method to change activeToken
    //     uses: getBestMatch method - loop through grammar rules and decide best match
    // create setActiveTokenToPrevious method to change activeToken
    //     uses: getBestMatch method?
    // create Grammar class with predefined END rule
    // instantiate Grammar class in constructor using grammar arg
    // create Token class
    // activeToken property becomes a Token instance
    // grammar class handles errors?
    // encapsulation where possible
    // refactor
    // use .npmignore to remove unnecessary files when module is imported? Does it work like that??

    // match example [ 'return', index: 0, input: 'return me please.', groups: undefined ]
    // console.log(`Tokenizer test string: ${this.inputStr}`)
}