import { Grammar } from './Grammar.js'

export class Tokenizer {
    constructor(inputStr, grammar) {
        this.inputStr = inputStr
        this.grammar = new Grammar(grammar)
        this.currentIndex = 0
        this.activeToken = this.getBestMatch(inputStr, false) // ensure error thrown here if token not found
    }

    getActiveToken() {
        return this.activeToken
    }

    setActiveTokenToNext() { // is this doing one thing? // THIS MUST FAIL IF LAST TOKEN IS AUTO END TOKEN
        const nextIndex = this.getNextIndex()
        const strAfterToken = this.inputStr.slice(nextIndex)
        this.activeToken = this.getBestMatch(strAfterToken, false)
        // if match found/no error
        this.setCurrentIndex(nextIndex)
    }

    setActiveTokenToPrev() { // AS ABOVE - is this doing one thing? THROW ERROR IF FIRST TOKEN
        const strBeforeToken = this.inputStr.slice(0, this.currentIndex)
        // TODO: handle no strBeforeToken
        this.activeToken = this.getBestMatch(strBeforeToken.trim(), true)
        // if match found/no error
        const prevIndex = this.getPrevIndex(strBeforeToken, this.activeToken.value.length)
        this.setCurrentIndex(prevIndex)
    }

    getNextIndex() {
        const activeTokenLength = this.activeToken.value.length
        const spaceCount = this.countTokenTrailingSpaces()
        
        return this.currentIndex + activeTokenLength + spaceCount
    }

    getPrevIndex(strBeforeToken, prevTokenLength) {
        // TODO: create countSpacesAtEndOfStr()
        const reversedStr = this.reverseStr(strBeforeToken)
        const precedingSpaceCount = this.countSpacesAtStartOfStr(reversedStr)
        
        return this.currentIndex - precedingSpaceCount - prevTokenLength
    }

    getBestMatch(str, isForPrevious) {
        let matchingTokens = []
        const rules = isForPrevious ? this.grammar.prevTokenRules : this.grammar.nextTokenRules // is it rules you're getting though? more like ruleRegexs/ruleDiscriptions/rulePatterns

        rules.forEach(rule => {
            const match = str.match(rule.regex)
            if (match !== null) {
                const token = this.createToken(rule.tokenType, match.toString())
                matchingTokens.push(token)
            }
        })
        // TODO multiple munch handled here AND? other multiple results
        // TODO handle no matches
        return matchingTokens[0]
    }

    createToken(type, value) {
        return {
            type: type,
            value: value
        }
    }

    countTokenTrailingSpaces() { // vague name for a very specific function
        const newIndex = this.currentIndex + this.activeToken.value.length
        const strAfterToken = this.inputStr.slice(newIndex)

        return this.countSpacesAtStartOfStr(strAfterToken)
    }

    countSpacesAtStartOfStr(str) {
        return str.indexOf(str.trim()) // This could lead to problems if there is only whitespace after token (returns 0). Could this be an issue? Test?
    }

    reverseStr(str) {
        return str.split('').reverse().join('')
    }

    setCurrentIndex(newIndex) {
        this.currentIndex = newIndex
    }

    // TODO:
    // create END rule in Grammar class
    // create Token class
    // activeToken property becomes a Token instance
    // test to ensure works with ArithmaticGrammar
    // grammar class handles errors?
    // encapsulation where possible
    // refactor
    // use .npmignore to remove unnecessary files when module is imported? Does it work like that??

    // match example [ 'return', index: 0, input: 'return me please.', groups: undefined ]
    // console.log(`Tokenizer test string: ${this.inputStr}`)
}