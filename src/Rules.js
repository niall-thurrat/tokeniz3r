import Rule from './Rule.js'

export default class Rules {
  #nextRules
  #previousRules

  constructor (grammar) {
    this.#setNextTokenRules(grammar)
    this.#setPreviousTokenRules(this.#nextRules)
  }

  getNextTokenRules() {
    return this.#nextRules
  }

  getPreviousTokenRules() {
    return this.#previousRules
  }

  #setNextTokenRules(grammar) {
    this.#nextRules = grammar.map(rule =>
      new Rule(rule.tokenType, rule.regex)
    )
    // END rule matches empty string
    this.#nextRules.push(new Rule('END', new RegExp(/^\s*$/)))
  }

  #setPreviousTokenRules(nextRules) {
    this.#previousRules = nextRules.map(rule => 
      this.#createPreviousTokenRule(rule)
    )
  }

  #createPreviousTokenRule(nextRule) {
    // Transform regex. Example: '/^[\\w|åäöÅÄÖ]+/i' becomes pattern '[\\w|åäöÅÄÖ]+$' and flags 'i'
    const regexStr = nextRule.getRegexStr()
    const pattern = regexStr.substring(1, regexStr.lastIndexOf('/')).replace(/\^/, '') + '$'
    const flags = regexStr.substring(regexStr.lastIndexOf('/') + 1, regexStr.length)

    return new Rule(nextRule.getTokenType(), new RegExp(pattern, flags))
  }
}
