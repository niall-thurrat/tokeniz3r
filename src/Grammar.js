import { Rule } from './Rule.js'

export class Grammar {
    constructor(grammar) {
      this.nextTokenRules = this.setNextTokenRules(grammar)
      this.prevTokenRules = this.setPrevTokenRules(grammar)
    }

    setNextTokenRules(grammar) {
        // TODO: loop through rules and throw errors if necesary
        let rules = []

        grammar.forEach(rule => {
            rules.push(new Rule(rule.tokenType, rule.regex))
        })
        // rules.push(new Rule('END', /someRegexHere?/))
        return rules
    }

    setPrevTokenRules(grammar) {
        // TODO: throw error if moving before first token
        let prevTokenRules = []

        grammar.forEach(rule => {
            // Transform regex pattern. Example: /^[\w|åäöÅÄÖ]+/ becomes '[\w|åäöÅÄÖ]+$'
            let regexStr = rule.regex.toString()
            regexStr = regexStr.substring(1,regexStr.length-1).replace(/\^/,'') + '$'

            prevTokenRules.push(new Rule(rule.tokenType, new RegExp(regexStr)))
        })
        return prevTokenRules
    }
  }