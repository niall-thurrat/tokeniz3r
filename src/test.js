import Tokenizer from './index.js'

const inputStr = 'one two.'
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

const token = tokenizer.activeToken

// console.log(`Token value: ${token.value}`)
// console.log(`Token type: ${token.type}`)
console.log(`Prettify token: ${token.toString()}`)
// console.log(`Token starts at index ${tokenizer.inputStrCurrentIndex}`)

// tokenizer.setActiveTokenToNext()
// const token2 = tokenizer.activeToken

// console.log(`Prettify token2: ${token2.toString()}`)
// console.log(`Token2 starts at index ${tokenizer.inputStrCurrentIndex}`)

// const nextToken = tokenizer.getBestMatchingToken('str to match', false)
// const prevToken = tokenizer.getBestMatchingToken('str to match', true)

// console.log(nextToken.value)
// console.log(prevToken.value)


