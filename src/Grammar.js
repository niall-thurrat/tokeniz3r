import Rule from './Rule.js'
import Token from './Token.js'
import GrammarValidationError from './exceptions/GrammarValidationError.js'
import LexicalError from './exceptions/LexicalError.js'

export default class Grammar {
  #nextTokenRules
  #previousTokenRules

  constructor (grammar) {
    this.#doValidation(grammar)
    this.#setNextTokenRules(grammar)
    this.#setPreviousTokenRules(this.#nextTokenRules)
  }

  getBestMatchingToken(strToMatch, isPreviousToken) {
    const rules = isPreviousToken ? this.#previousTokenRules : this.#nextTokenRules
    const tokens = this.#getMatchingTokens(rules, strToMatch)
    this.#throwExceptionIfNoMatchingToken(tokens, strToMatch)
    
    return (tokens.length > 1) ? this.#getLongestMatch(tokens) : tokens[0]
  }

  #getMatchingTokens(rules, strToMatch) {
    const tokens = []

    rules.forEach(rule => {
      const matchValue = rule.getMatch(strToMatch)
      if (matchValue !== null)
        tokens.push(new Token(rule.getTokenType(), matchValue))
    })
    return tokens
  }

  #getLongestMatch(tokens) {
    tokens.sort((a, b) => b.getValue().length - a.getValue().length)
    this.#throwExceptionIfNoLongestMatch(tokens)

    return tokens[0]
  }

  #doValidation (grammar) {
    this.#throwExceptionIfNotArrayOfObjects(grammar) 
    this.#throwExceptionIfMissingAProperty(grammar)
    this.#throwExceptionIfFormattedWithAWrongType(grammar)
  }

  #setNextTokenRules(grammar) {
    this.#nextTokenRules = grammar.map(rule =>
      new Rule(rule.tokenType, rule.regex)
    )
    // END rule matches empty string
    this.#nextTokenRules.push(new Rule('END', new RegExp(/^\s*$/)))
  }

  #setPreviousTokenRules(nextTokenRules) {
    this.#previousTokenRules = nextTokenRules.map(rule => 
      this.#createPreviousTokenRule(rule)
    )
  }

  #createPreviousTokenRule(nextTokenRule) {
    // Transform regex. Example: '/^[\\w|åäöÅÄÖ]+/i' becomes pattern '[\\w|åäöÅÄÖ]+$' and flags 'i'
    const regexStr = nextTokenRule.getRegexStr()
    const pattern = regexStr.substring(1, regexStr.lastIndexOf('/')).replace(/\^/, '') + '$'
    const flags = regexStr.substring(regexStr.lastIndexOf('/') + 1, regexStr.length)

    return new Rule(nextTokenRule.getTokenType(), new RegExp(pattern, flags))
  }

  #throwExceptionIfNoMatchingToken(matchingTokens, matchedStr) {
    if (matchingTokens.length === 0)
      throw new LexicalError(`No grammar rule matches string \'${this.#limitStrTo10Chars(matchedStr)}\'`)
  }
  
  #limitStrTo10Chars(str) {
    return (str.length > 10) ? `${str.slice(0, 10)}...` : str
  }

  #throwExceptionIfNoLongestMatch(tokens) {
    if (tokens[0].getValue().length === tokens[1].getValue().length)
      throw new LexicalError(`Cannot get a longest match from tokens \'${tokens[0].toString()}\' and \'${tokens[1].toString()}\'`)
  }

  #throwExceptionIfNotArrayOfObjects(grammar) {
    grammar.forEach(rule => {
      if (Array.isArray(rule) || typeof rule !== 'object')
        throw new GrammarValidationError('Grammar argument is not an array of expected objects')
    })
  }

  #throwExceptionIfMissingAProperty(grammar) {
    grammar.forEach(rule => {
      if ('tokenType' in rule === false || 'regex' in rule === false)
          throw new GrammarValidationError('Grammar rule found with missing property')
    })
  }

  #throwExceptionIfFormattedWithAWrongType(grammar) {
   grammar.forEach(rule => {
      if (typeof rule.tokenType !== 'string' || rule.regex instanceof RegExp === false)
        throw new GrammarValidationError('Grammar rule property of wrong type used')
    })
  }
}
