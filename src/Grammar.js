export class Grammar {
    constructor(grammar) {
      this.nextTokenRules = this.setNextTokenRules(grammar);
      this.prevTokenRules = this.setPrevTokenRules(grammar);
    }

    setNextTokenRules(grammar) {
        let rules = grammar
        // TODO: loop through rules and throw errors if necesary
        // TODO: add END tokenType
        return rules
    }

    setPrevTokenRules(grammar) {
        let inputRules = grammar
        // how is START token type handled?
        let prevTokenRules = []

        inputRules.forEach(rule => {
            let regexStr = rule.regex.toString()
            regexStr = regexStr.substring(1,regexStr.length-1)
            regexStr = regexStr.replace(/\^/,'') + '$'
            const newRule = {
                tokenType: rule.tokenType,
                regex: new RegExp(regexStr)
            }
            prevTokenRules.push(newRule)
        })
        return prevTokenRules
    }

  }