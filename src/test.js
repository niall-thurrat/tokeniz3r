import { Tokenizer } from './index.js'

const inputStr = 'wee test     .     '
const WordAndDotGrammar = [
    {
        tokenType: 'WORD',
        regex: /^[\w|åäöÅÄÖ]+/
    },
    { 
        tokenType: 'DOT',
        regex: /^\./
    }
]

const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToPrev()

console.log(tokenizer.activeToken)

// tokenizer.setActiveTokenToPrev()

// console.log(tokenizer.activeToken)