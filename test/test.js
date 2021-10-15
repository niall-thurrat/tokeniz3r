import { expect } from 'chai'
import Tokenizer from '../src/index.js'
import MethodCallError from '../src/exceptions/MethodCallError.js'
import LexicalError from '../src/exceptions/LexicalError.js'

const sequenceFuncCaller = (sequenceStr, func1, func2) => {
    const sequenceArr = sequenceStr.split('')

    sequenceArr.forEach(el => {
        if (el === '>') func1()
        else if (el === '<') func2()
    })
}

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

            expect(token.toString()).to.equal('WORD("a")')
        })
    })

    describe("TC2_GetWordToken_Sequence[>]", () => {
        it('should be WORD("aa")', () => {
            const inputStr = 'a aa'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('WORD("aa")')
        })
    })

    describe("TC3_GetDotToken_Sequence[>]", () => {
        it('should be DOT(".")', () => {
            const inputStr = 'a.b'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('DOT(".")')
        })
    })

    describe("TC4_GetWordToken_Sequence[>>]", () => {
        it('should be WORD("b")', () => {
            const inputStr = 'a.b'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)
            const setNext = () => tokenizer.setActiveTokenToNext()

            sequenceFuncCaller('>>', setNext)
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('WORD("b")')
        })
    })

    describe("TC5_GetWordToken_Sequence[>>]", () => {
        it('should be WORD("b")', () => {
            const inputStr = 'aa. b'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)
            const setNext = () => tokenizer.setActiveTokenToNext()

            sequenceFuncCaller('>>', setNext)
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('WORD("b")')
        })
    })

    describe("TC6_GetDotToken_Sequence[>><]", () => {
        it('should be DOT(".")', () => {
            const inputStr = 'a .b'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)
            const setNext = () => tokenizer.setActiveTokenToNext()
            const setPrev = () => tokenizer.setActiveTokenToPrevious()

            sequenceFuncCaller('>><', setNext, setPrev)
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('DOT(".")')
        })
    })

    describe("TC7_GetEndToken_Sequence[]", () => {
        it('should be END', () => {
            const inputStr = ''
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            const token = tokenizer.getActiveToken()

            expect(token.getType()).to.equal('END')
        })
    })

    describe("TC8_GetEndToken_Sequence[]", () => {
        it('should be END', () => {
            const inputStr = ' '
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            const token = tokenizer.getActiveToken()

            expect(token.getType()).to.equal('END')
        })
    })

    describe("TC9_GetEndToken_Sequence[>]", () => {
        it('should be END', () => {
            const inputStr = 'a'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)

            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(token.getType()).to.equal('END')
        })
    })

    describe("TC10_GetException_Sequence[<]", () => {
        it('should be MethodCallError', () => {
            const inputStr = 'a'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar) 

            expect(tokenizer.setActiveTokenToPrevious.bind(tokenizer)).to.throw(MethodCallError)
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
        },
        { 
            tokenType: 'LEFT_PARENTHESIS',
            regex: /^[(]/
        },
        { 
            tokenType: 'RIGHT_PARENTHESIS',
            regex: /^[)]/
        },
        { 
            tokenType: 'DIV',
            regex: /^[/]/
        },
        { 
            tokenType: 'SUBTRACT',
            regex: /^[-]/
        }
    ]

    describe("TC12_GetNumberToken_Sequence[]", () => {
        it('should be NUMBER("3")', () => {
            const inputStr = '3'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('NUMBER("3")')
        })
    })

    describe("TC13_GetNumberToken_Sequence[]", () => {
        it('should be NUMBER("3.14")', () => {
            const inputStr = '3.14'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('NUMBER("3.14")')
        })
    })

    describe("TC14_GetMulToken_Sequence[>>>]", () => {
        it('should be MUL("*")', () => {
            const inputStr = '3 + 54 * 4'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)
            const setNext = () => tokenizer.setActiveTokenToNext()

            sequenceFuncCaller('>>>', setNext)
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('MUL("*")')
        })
    })

    describe("TC15_GetException_Sequence[>>>]", () => {
        it('should be LexicalError', () => {
            const inputStr = '3+5 # 4'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)
            const setNext = () => tokenizer.setActiveTokenToNext()

            sequenceFuncCaller('>>', setNext)

            expect(tokenizer.setActiveTokenToNext.bind(tokenizer)).to.throw(LexicalError)
        })
    })

    describe("TC16_GetAddToken_Sequence[><>>>]", () => {
        it('should be ADD("+")', () => {
            const inputStr = '3.0+54.1     + 4.2'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)
            const setNext = () => tokenizer.setActiveTokenToNext()
            const setPrev = () => tokenizer.setActiveTokenToPrevious()

            sequenceFuncCaller('><>>>', setNext, setPrev)
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('ADD("+")')
        })
    })

    describe("TC17_GetLeftParenthesisToken_Sequence[>>]", () => {
        it('should be LEFT_PARENTHESIS("(")', () => {
            const inputStr = '3.0 + (5 * 4)'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)
            const setNext = () => tokenizer.setActiveTokenToNext()

            sequenceFuncCaller('>>', setNext)
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('LEFT_PARENTHESIS("(")')
        })
    })

    describe("TC18_GetRightParenthesisToken_Sequence[>>>>]", () => {
        it('should be RIGHT_PARENTHESIS(")")', () => {
            const inputStr = '(5 * 4) / 2'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)
            const setNext = () => tokenizer.setActiveTokenToNext()

            sequenceFuncCaller('>>>>', setNext)
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('RIGHT_PARENTHESIS(")")')
        })
    })

    describe("TC19_GetDivisionToken_Sequence[>]", () => {
        it('should be DIV("/")', () => {
            const inputStr = '2 / 2'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('DIV("/")')
        })
    })

    describe("TC20_GetSubtractionToken_Sequence[>]", () => {
        it('should be SUBTRACT("-")', () => {
            const inputStr = '7-4'
            const tokenizer = new Tokenizer(inputStr, ArithmeticGrammar)

            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('SUBTRACT("-")')
        })
    })
})

describe("MaximalMunchGrammar", () => {
    const MaximalMunchGrammar = [
        {
            tokenType: 'FLOAT',
            regex: /^[0-9]+\.[0-9]+/
        },
        { 
            tokenType: 'INTEGER',
            regex: /^[0-9]+/ 
        }
    ]

    const FailingMaximalMunchGrammar  = [
        {
            tokenType: 'FLOAT',
            regex: /^[0-9]+\.[0-9]+/
        },
        { 
            tokenType: 'DUPLICATE_FLOAT',
            regex: /^[0-9]+\.[0-9]+/
        }
    ]

    describe("TC21_GetFloatTokenUsingMaxMunch_Sequence[]", () => {
        it('should be FLOAT("3.14")', () => {
            const inputStr = '3.14'
            const tokenizer = new Tokenizer(inputStr, MaximalMunchGrammar)

            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('FLOAT("3.14")')
        })
    })

    describe("TC22_GetExceptionForSameLengthMatchingTokens_Sequence[]", () => {
        it('should be LexicalError', () => {
            const inputStr = '3.14'

            expect(() => new Tokenizer(inputStr, FailingMaximalMunchGrammar)).to.throw(LexicalError)
        })
    })
})

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

    describe("TC23_EdgeCase_GetLastTokenFromInputStrWithNoTrailingSpace_Sequence[]", () => {
        it('should be WORD("a")', () => {
            const inputStr = 'a '
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)
    
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('WORD("a")')
        })
    })

    describe("TC24_EdgeCase_GetEndTokenWhenInputStrHasTrailingSpace_Sequence[>]", () => {
        it('should be END', () => {
            const inputStr = 'a '
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)
            
            tokenizer.setActiveTokenToNext()
            const token = tokenizer.getActiveToken()

            expect(token.getType()).to.equal('END')
        })
    })

    describe("TC25_EdgeCase_GetFirstTokenThatDoesNotContainLeadingSpace_Sequence[]", () => {
        it('should be WORD("a")', () => {
            const inputStr = ' a'
            const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)
    
            const token = tokenizer.getActiveToken()

            expect(token.toString()).to.equal('WORD("a")')
        })
    })
})