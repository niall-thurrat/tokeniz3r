import Tokenizer from './index.js'

const inputStr = 'aaaaa bbbb ccc dd e'
const WordAndDotGrammar = [
    {
        tokenType: 'WORD',
        regex: /^[\w|åäöÅÄÖ]+/i
    },
    { 
        tokenType: 'DOT',
        regex: /^\./
    }
]

// const inputStr = '4.1 * 2.5'
// const ArithmeticGrammar = [
//     {
//         tokenType: 'NUMBER',
//         regex: /^[0-9]+(\.([0-9])+)?/
//     },
//     { 
//         tokenType: 'ADD',
//         regex: /^[+]/
//     },
//     { 
//         tokenType: 'MUL',
//         regex: /^[*]/
//     }
// ]

// const inputStr = '3.14'
// const MaximalMunchGrammar = [
//     { 
//         tokenType: 'INTEGER',
//         regex: /^[0-9]+/
//     },
//     {
//         tokenType: 34,
//         regex: /^[0-9]+\.[0-9]+/
//     }
// ]

const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)
// const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)
// const tokenizer = new Tokenizer(inputStr, MaximalMunchGrammar)

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToNext()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToPrevious()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToPrevious()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToPrevious()

console.log(tokenizer.activeToken)

tokenizer.setActiveTokenToPrevious()

console.log(tokenizer.activeToken)