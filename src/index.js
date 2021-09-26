import { Grammar } from './Grammar.js'
import { Token } from './Token.js'
import MethodCallError from './exceptions/MethodCallError.js'
import LexicalError from './exceptions/LexicalError.js'

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

    setActiveTokenToNext() {
        if (this.activeToken.type === 'END') {
            throw new MethodCallError('setActiveTokenToNext should not be called when END token is active')
        } else {
            const nextIndex = this.getNextIndex()
            const strAfterToken = this.inputStr.slice(nextIndex)
            this.activeToken = this.getBestMatch(strAfterToken, false)
            this.setCurrentIndex(nextIndex)
        }
    }

    setActiveTokenToPrev() {
        if (this.currentIndex === 0) {
            throw new MethodCallError('setActiveTokenToPrev should not be called when first token is active')
        } else {
            const strBeforeToken = this.inputStr.slice(0, this.currentIndex)
            this.activeToken = this.getBestMatch(strBeforeToken.trim(), true)
            const prevIndex = this.getPrevIndex(strBeforeToken, this.activeToken.value.length)
            this.setCurrentIndex(prevIndex)
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
        
        if (matchingTokens.length === 0) {
            throw new LexicalError(`No grammar rule matches string \'${this.limitStrTo10Chars(str)}\'`)
        }

        return (matchingTokens.length > 1) ? this.applyMaximalMunch(matchingTokens)[0] : matchingTokens[0]
    }

    applyMaximalMunch(tokens) {
        tokens.sort((a, b) => b.value.length - a.value.length)

        if (tokens[0].value.length === tokens[1].value.length) {
            const token1 = `${tokens[0].type}("${tokens[0].value}")`
            const token2 = `${tokens[1].type}("${tokens[1].value}")`
            throw new LexicalError(`Maximal munch cannot be applied to tokens \'${token1}\' and \'${token2}\'`)
        }
        return tokens
    }

    limitStrTo10Chars(str) {
        return (str.length > 10) ? `${str.slice(0, 10)}...` : str
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