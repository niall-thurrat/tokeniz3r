export class Tokenizer {
    constructor(inputStr, grammar) {
        this.inputStr = inputStr
        this.grammar = grammar
        this.currentIndex = 0
        this.activeToken = this.getBestMatch(this.currentIndex) // ensure error thrown here if token not found
    }

    getBestMatch(index) {
        let matchingTokens = []
        const strAfterToken = this.inputStr.slice(index) // works for NEXT token specifically

        this.grammar.forEach(rule => {
            const match = strAfterToken.match(rule.regex)
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

    getActiveToken() {
        return this.activeToken
    }

    setActiveTokenToNext() {
        const nextIndex = this.getNextIndex()
        this.activeToken = this.getBestMatch(nextIndex)
        // if match found/no error
        this.setCurrentIndex(nextIndex)
    }

    getNextIndex() {
        const tokenLength = this.activeToken.value.length
        const spaceCount = this.countSpaces()
        
        return this.currentIndex + tokenLength + spaceCount
    }

    countSpaces() {
        const tokenLength = this.activeToken.value.length
        const newIndex = this.currentIndex + tokenLength
        const strAfterToken = this.inputStr.slice(newIndex)

        return strAfterToken.indexOf(strAfterToken.trim())
    }

    setCurrentIndex(nextIndex) {
        this.currentIndex = nextIndex
    }

    // TODO:
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