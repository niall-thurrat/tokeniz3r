import { Grammar } from './Grammar.js'
import { Token } from './Token.js'
import MethodCallError from './exceptions/MethodCallError.js'

export class Tokenizer {
    constructor(inputStr, grammar) {
        this.inputStr = inputStr.trim()
        this.grammar = new Grammar(grammar)
        this.activeToken = this.getBestMatch(inputStr, false)
        this.currentIndex = 0
    }

    getActiveToken() {
        return this.activeToken
    }

    setActiveTokenToNext() { // is this doing one thing? 
        try {
            if (this.activeToken.type === 'END') {
                throw new MethodCallError('setActiveTokenToNext should not be called when END token is active')
            } else {
                const nextIndex = this.getNextIndex()
                const strAfterToken = this.inputStr.slice(nextIndex)
                this.activeToken = this.getBestMatch(strAfterToken, false)
                // if match found/no error
                this.setCurrentIndex(nextIndex)
            }
        } catch (err) {
            if (err instanceof MethodCallError) {
                console.error(err)
            } else throw err
        }
    }

    setActiveTokenToPrev() { // AS ABOVE - is this doing one thing?
        try {
            if (this.currentIndex === 0) {
                throw new MethodCallError('setActiveTokenToPrev should not be called when first token is active')
            } else {
                const strBeforeToken = this.inputStr.slice(0, this.currentIndex)
            // TODO: handle no strBeforeToken
            this.activeToken = this.getBestMatch(strBeforeToken.trim(), true)
            // if match found/no error
            const prevIndex = this.getPrevIndex(strBeforeToken, this.activeToken.value.length)
            this.setCurrentIndex(prevIndex)
            }
        } catch (err) {
            if (err instanceof MethodCallError) {
                console.error(err)
            } else throw err
        }
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
        // TODO handle no matches
        // TODO handle multiple matching tokens of same length
        return (matchingTokens.length > 1) ? this.applyMaximalMunch(matchingTokens)[0] : matchingTokens[0]
    }

    applyMaximalMunch(tokens) {
        return tokens.sort((a, b) => b.value.length - a.value.length)
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
    // error handling
    // encapsulation
    // refactors
    // use .npmignore to remove unnecessary files when module is imported? Does it work like that??
}