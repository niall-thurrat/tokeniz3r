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

        // Rule matches empty string
        rules.push(new Rule('END', new RegExp(/^\s*$/)))

        return rules
    }

    setPrevTokenRules(grammar) {
        // TODO: throw error if moving before first token
        let prevTokenRules = []

        grammar.forEach(rule => {
            // Transform regex pattern. Example: '/^[\\w|åäöÅÄÖ]+/i' becomes '[\\w|åäöÅÄÖ]+$' + 'i'
            let regexStr = rule.regex.toString()
            const pattern = regexStr.substring(1, regexStr.lastIndexOf("/"))
            const flags = regexStr.substring(regexStr.lastIndexOf("/") + 1, regexStr.length)
            const strEndPattern = pattern.replace(/\^/,'') + '$'
            
            prevTokenRules.push(new Rule(rule.tokenType, new RegExp(strEndPattern, flags)))
        })
        return prevTokenRules
    }
  }