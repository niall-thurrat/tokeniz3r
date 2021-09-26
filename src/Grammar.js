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
  }