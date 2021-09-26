import { Rule } from './Rule.js'
import GrammarValidationError from './exceptions/GrammarValidationError.js'

export class Grammar {
    constructor(grammar) {
      this.nextTokenRules = this.setNextTokenRules(grammar)
      this.prevTokenRules = this.setPrevTokenRules(grammar)
    }

    setNextTokenRules(grammar) {
        this.doValidation(grammar)
        let rules = []

        grammar.forEach(rule => {
            rules.push(new Rule(rule.tokenType, rule.regex))
        })
        // END rule matches empty string
        rules.push(new Rule('END', new RegExp(/^\s*$/)))

        return rules
    }

    setPrevTokenRules(grammar) {
        let prevTokenRules = []

        grammar.forEach(rule => {
            // Transform regex. Example: '/^[\\w|åäöÅÄÖ]+/i' becomes pattern '[\\w|åäöÅÄÖ]+$' and flags 'i'
            const regexStr = rule.regex.toString()
            const pattern = regexStr.substring(1, regexStr.lastIndexOf("/")).replace(/\^/,'') + '$'
            const flags = regexStr.substring(regexStr.lastIndexOf("/") + 1, regexStr.length)
            
            prevTokenRules.push(new Rule(rule.tokenType, new RegExp(pattern, flags)))
        })
        return prevTokenRules
    }

    doValidation(grammar) {
        if (this.isNotArrayOfObjects(grammar)) {
            throw new GrammarValidationError('Grammar argument is not an array of expected objects')
        }
        if (this.isMissingAProperty(grammar)) {
            throw new GrammarValidationError('Grammar rule found with missing property')
        }
        if (this.isFormattedWithAWrongType(grammar)) {
            throw new GrammarValidationError('Grammar rule property of wrong type used')
        }
    }

    isNotArrayOfObjects(grammar) {
        let isFailing = false

        grammar.forEach(rule => {
            if (Array.isArray(rule) || typeof rule !== 'object') { isFailing = true } 
        })
        return isFailing
    }

    isMissingAProperty(grammar) {
        let isFailing = false

        grammar.forEach(rule => {
            if ('tokenType' in rule === false || 'regex' in rule === false) { isFailing = true }
        })
        return isFailing
    }

    isFormattedWithAWrongType(grammar) {
        let isFailing = false

        grammar.forEach(rule => {
            if (typeof rule.tokenType !== 'string' || rule.regex instanceof RegExp === false) { isFailing = true }
        })
        return isFailing
    }
  }