import { Tokenizer } from './index.js'

const inputStr = 'wee   test    .   with few words.'
const WordAndDotGrammar = [
    {
        tokenType: 'word',
        regex: /^[\w|åäöÅÄÖ]+/
    },
    { 
        tokenType: 'dot',
        regex: /^\./
    }
]

const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToPrev()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToPrev()

console.log(tokenizer.activeToken)