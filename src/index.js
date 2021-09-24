import { Grammar } from './Grammar.js'
import { Token } from './Token.js'

export class Tokenizer {
    constructor(inputStr, grammar) {
        this.inputStr = inputStr.trim()
        this.grammar = new Grammar(grammar)
        this.currentIndex = 0
        this.activeToken = this.getBestMatch(inputStr, false) // ensure error thrown here if token not found
    }

    getActiveToken() {
        return this.activeToken
    }

    setActiveTokenToNext() { // is this doing one thing? 
        if (this.activeToken.type === 'END') {
            // Throw error
        } else {
            const nextIndex = this.getNextIndex()
            const strAfterToken = this.inputStr.slice(nextIndex)
            this.activeToken = this.getBestMatch(strAfterToken, false)
            // if match found/no error
            this.setCurrentIndex(nextIndex)
        }
    }

    setActiveTokenToPrev() { // AS ABOVE - is this doing one thing?
        // throw error if (this.currentIndex === 0)
        const strBeforeToken = this.inputStr.slice(0, this.currentIndex)
        // TODO: handle no strBeforeToken
        this.activeToken = this.getBestMatch(strBeforeToken.trim(), true)
        // if match found/no error
        const prevIndex = this.getPrevIndex(strBeforeToken, this.activeToken.value.length)
        this.setCurrentIndex(prevIndex)
    }

    getNextIndex() {
        const activeTokenLength = this.activeToken.value.length
        const spaceCount = this.countSpacesAfterToken()
        
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
        const rules = isForPrevious ? this.grammar.prevTokenRules : this.grammar.nextTokenRules

        rules.forEach(rule => {
            const match = str.match(rule.regex)
            if (match !== null) {
                matchingTokens.push(new Token(rule.tokenType, match[0].toString()))
            }
        })
        // TODO multiple munch handled here
        // TODO handle no matches
        // TODO handle multiple matching tokens of same length?
        return matchingTokens[0]
    }

    countSpacesAfterToken() {
        const newIndex = this.currentIndex + this.activeToken.value.length
        const strAfterToken = this.inputStr.slice(newIndex)

        return this.countSpacesAtStartOfStr(strAfterToken)
    }

    countSpacesAtStartOfStr(str) {
        return str.indexOf(str.trim())
    }

    reverseStr(str) {
        return str.split('').reverse().join('')
    }

    setCurrentIndex(newIndex) {
        this.currentIndex = newIndex
    }

    // TODO:
    // maximal munch
    // error handling
    // encapsulation
    // refactors
    // use .npmignore to remove unnecessary files when module is imported? Does it work like that??

    // match example [ 'return', index: 0, input: 'return me please.', groups: undefined ]
    // console.log(`Tokenizer test string: ${this.inputStr}`)
}