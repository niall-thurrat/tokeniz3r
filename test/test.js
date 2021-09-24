import { expect } from "chai"
import { Tokenizer } from "../src/index.js"

describe("TC1_WordAndDotGrammar", () => {
    describe("GetActiveToken_Sequence[]", () => {
        it('should be WORD("a")', () => {
            const inputStr = 'a'
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
            const token = tokenizer.getActiveToken()

            expect(`${token.type}("${token.value}")`).to.equal('WORD("a")')
        })
    })
})