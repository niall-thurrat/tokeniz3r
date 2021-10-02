import Rule from './Rule.js'
import GrammarValidationError from './exceptions/GrammarValidationError.js'

export default class Grammar {
  #nextTokenRules
  #previousTokenRules

  get nextTokenRules() {
    return this.#nextTokenRules
  }

  get previousTokenRules() {
    return this.#previousTokenRules
  }

  constructor (grammar) {
    this.#doValidation(grammar)
    this.#setNextTokenRules(grammar)
    this.#setPreviousTokenRules(grammar)
  }

  #setNextTokenRules(grammar) {
    const rules = []

    grammar.forEach(rule => {
      rules.push(new Rule(rule.tokenType, rule.regex))
    })
    // END rule matches empty string
    rules.push(new Rule('END', new RegExp(/^\s*$/)))

    this.#nextTokenRules = rules
  }

  #setPreviousTokenRules (grammar) {
    const rules = []

    grammar.forEach(nextTokenRule => {
      const rule = this.#createPreviousTokenRule(nextTokenRule)
      rules.push(rule)
    })
    this.#previousTokenRules = rules
  }

  #createPreviousTokenRule(nextTokenRule) {
    // Transform regex. Example: '/^[\\w|åäöÅÄÖ]+/i' becomes pattern '[\\w|åäöÅÄÖ]+$' and flags 'i'
    const regexStr = nextTokenRule.regex.toString()
    const pattern = regexStr.substring(1, regexStr.lastIndexOf('/')).replace(/\^/, '') + '$'
    const flags = regexStr.substring(regexStr.lastIndexOf('/') + 1, regexStr.length)

    return new Rule(nextTokenRule.tokenType, new RegExp(pattern, flags))
  }

  #doValidation (grammar) {
    this.#validateIsArrayOfObjects(grammar) 
    this.#validateIsNotMissingAProperty(grammar)
    this.#validateIsNotFormattedWithAWrongType(grammar)
  }

  #validateIsArrayOfObjects(grammar) {
    grammar.forEach(rule => {
      if (Array.isArray(rule) || typeof rule !== 'object')
        throw new GrammarValidationError('Grammar argument is not an array of expected objects')
    })
  }

  #validateIsNotMissingAProperty(grammar) {
    grammar.forEach(rule => {
      if ('tokenType' in rule === false || 'regex' in rule === false)
          throw new GrammarValidationError('Grammar rule found with missing property')
    })
  }

  #validateIsNotFormattedWithAWrongType(grammar) {
   grammar.forEach(rule => {
      if (typeof rule.tokenType !== 'string' || rule.regex instanceof RegExp === false)
        throw new GrammarValidationError('Grammar rule property of wrong type used')
    })
  }
}
