import Rule from './Rule.js'
import GrammarValidationError from './exceptions/GrammarValidationError.js'

export default class Grammar {
  constructor (grammar) {
    this.doValidation(grammar)
    this.nextTokenRules = this.setNextTokenRules(grammar)
    this.previousTokenRules = this.setPreviousTokenRules(grammar)
  }

  setNextTokenRules(grammar) {
    const rules = []

    grammar.forEach(rule => {
      rules.push(new Rule(rule.tokenType, rule.regex))
    })
    // END rule matches empty string
    rules.push(new Rule('END', new RegExp(/^\s*$/)))

    return rules
  }

  setPreviousTokenRules (grammar) {
    const prevTokenRules = []

    grammar.forEach(rule => {
      const prevTokenRule = this.createPreviousTokenRule(rule)
      prevTokenRules.push(prevTokenRule)
    })
    return prevTokenRules
  }

  createPreviousTokenRule(rule) {
    // Transform regex. Example: '/^[\\w|åäöÅÄÖ]+/i' becomes pattern '[\\w|åäöÅÄÖ]+$' and flags 'i'
    const regexStr = rule.regex.toString()
    const pattern = regexStr.substring(1, regexStr.lastIndexOf('/')).replace(/\^/, '') + '$'
    const flags = regexStr.substring(regexStr.lastIndexOf('/') + 1, regexStr.length)

    return new Rule(rule.tokenType, new RegExp(pattern, flags))
  }

  doValidation (grammar) {
    this.validateIsArrayOfObjects(grammar) 
    this.validateIsNotMissingAProperty(grammar)
    this.validateIsNotFormattedWithAWrongType(grammar)
  }

  validateIsArrayOfObjects(grammar) {
    grammar.forEach(rule => {
      if (Array.isArray(rule) || typeof rule !== 'object')
        throw new GrammarValidationError('Grammar argument is not an array of expected objects')
    })
  }

  validateIsNotMissingAProperty(grammar) {
    grammar.forEach(rule => {
      if ('tokenType' in rule === false || 'regex' in rule === false)
          throw new GrammarValidationError('Grammar rule found with missing property')
    })
  }

  validateIsNotFormattedWithAWrongType(grammar) {
   grammar.forEach(rule => {
      if (typeof rule.tokenType !== 'string' || rule.regex instanceof RegExp === false)
        throw new GrammarValidationError('Grammar rule property of wrong type used')
    })
  }
}
