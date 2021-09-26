import { expect } from 'chai'
import { Tokenizer } from '../src/index.js'
import MethodCallError from '../src/exceptions/MethodCallError.js'
import LexicalError from '../src/exceptions/LexicalError.js'

describe("WordAndDotGrammar", () => {
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

    describe("TC1_GetWordToken_Sequence[]", () => {
        it('should be WORD("a")', () => {
            const inputStr = 'a'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('WORD("a")')
        })
    })

    describe("TC2_GetWordToken_Sequence[>]", () => {
        it('should be WORD("aa")', () => {
            const inputStr = 'a aa'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('WORD("aa")')
        })
    })

    describe("TC3_GetDotToken_Sequence[>]", () => {
        it('should be DOT(".")', () => {
            const inputStr = 'a.b'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('DOT(".")')
        })
    })

    describe("TC4_GetWordToken_Sequence[>>]", () => {
        it('should be WORD("b")', () => {
            const inputStr = 'a.b'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('WORD("b")')
        })
    })

    describe("TC5_GetWordToken_Sequence[>>]", () => {
        it('should be WORD("b")', () => {
            const inputStr = 'aa. b'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('WORD("b")')
        })
    })

    describe("TC6_GetDotToken_Sequence[>><]", () => {
        it('should be DOT(".")', () => {
            const inputStr = 'a .b'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToPrev()
            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('DOT(".")')
        })
    })

    describe("TC7_GetEndToken_Sequence[]", () => {
        it('should be END', () => {
            const inputStr = ''
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            const token = tokenizer.getActiveToken()

            expect(token.type).to.equal('END')
        })
    })

    describe("TC8_GetEndToken_Sequence[]", () => {
        it('should be END', () => {
            const inputStr = ' '
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            const token = tokenizer.getActiveToken()

            expect(token.type).to.equal('END')
        })
    })

    describe("TC9_GetEndToken_Sequence[>]", () => {
        it('should be END', () => {
            const inputStr = 'a'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(token.type).to.equal('END')
        })
    })

    describe("TC10_GetException_Sequence[<]", () => {
        it('should be MethodCallError', () => {
            const inputStr = 'a'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar) 

            expect(tokenizer.setActiveTokenToPrev.bind(tokenizer)).to.throw(MethodCallError)
        })
    })

    describe("TC11_GetException_Sequence[]", () => {
        it('should be LexicalError', () => {
            const inputStr = '!'

            expect(() => new Tokenizer(inputStr, WordAndDotGrammar)).to.throw(LexicalError)
        })
    })
})

describe("ArithmeticGrammar", () => {
    const ArithmeticGrammar = [
        {
            tokenType: 'NUMBER',
            regex: /^[0-9]+(\.([0-9])+)?/
        },
        { 
            tokenType: 'ADD',
            regex: /^[+]/
        },
        { 
            tokenType: 'MUL',
            regex: /^[*]/
        }
    ]

    describe("TC12_GetNumberToken_Sequence[]", () => {
        it('should be NUMBER("3")', () => {
            const inputStr = '3'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('NUMBER("3")')
        })
    })

    describe("TC13_GetNumberToken_Sequence[]", () => {
        it('should be NUMBER("3.14")', () => {
            const inputStr = '3.14'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('NUMBER("3.14")')
        })
    })

    describe("TC14_GetMulToken_Sequence[>>>]", () => {
        it('should be MUL("*")', () => {
            const inputStr = '3 + 54 * 4'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('MUL("*")')
        })
    })

    describe("TC15_GetException_Sequence[>>>]", () => {
        it('should be LexicalError', () => {
            const inputStr = '3+5 # 4'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToNext()

            expect(tokenizer.setActiveTokenToNext.bind(tokenizer)).to.throw(LexicalError)
        })
    })

    describe("TC16_GetAddToken_Sequence[><>>>]", () => {
        it('should be ADD("+")', () => {
            const inputStr = '3.0+54.1     + 4.2'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToPrev()
            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToNext()
            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('ADD("+")')
        })
    })
})