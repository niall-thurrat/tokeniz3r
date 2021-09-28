# Tokeniz3r

A module that tokenizes strings!!!

## What is a tokenizer

Tokenization is often used as a first step when interpreting strings, for example by a compiler. A tokenizer will
break a string down into tokens, the correct term for which is "Lexical Analysis". Tokens can be identified, for
example, using regular expressions (as is the method used by Tokeniz3r). A collection of token types and their
descriptions (referred to as grammar rules in Tokeniz3r) becomes a "lexical grammar" that describes all types of
tokens that are valid.

## How does Tokeniz3r work?

The Tokeniz3r node module, once required/imported by your own npm project, provides a single Tokenizer class
through its interface with a number of public methods. You can then create instances of Tokenizer based on a sting that you want to break into tokens, and a grammar that you specify yourself and which uses regular expressions to find matches in the input string. When you instantiate a Tokenizer object, an active token is identified (i.e. is considered the best match using the grammar rules provided) at the start of the string. You will then be able to get info about the active token, as well as move the
active token to next and previous tokens within the boundaries of the string.

## Getting started

### Prerequisites

- Node.js [installed](https://nodejs.org/en/download/)
- NPM installed (this comes with node.js)

## importing Tokeniz3r npm module

- Clone the [GitLab repository](https://gitlab.lnu.se/1dv610/student/nt222fc/l1) to your local machine
- run *npm install* in the project root directory to install dependencies
- run *npm link* in the project root directory to make the module available for import**
- run *npm link tokeniz3r* in the root directory of the project that you want to import tokeniz3r to. You will now see the module in your node_modules directory and you will be able to 'import'*** it as you would a regular installed npm package.

** Note that due to time constraints I have not been able to publish a successful build of this module to npm. Using *npm link* should be seen as a temporary measure to make the module available for the sake of the course.
*** Tokeniz3r uses ES Modules and you must import it as such, i.e. the 'require' method will not work. Your project must therefore usee ES Modules.

## Using Tokeniz3r

1. To use Tokeniz3r you must first import it as an ES6 module.

```javascript
import Tokenizer from 'tokeniz3r'
```

2. Create an input string.

```javascript
const inputStr = 'test string.'
```

3. Create a grammar object.

```javascript
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
```

4. Create an instance of the Tokenizer class.

```javascript
const tokenizer = new Tokenizer(inputStr, WordAndDotGrammar)
```

5. Use the instance's public methods.

```javascript
console.log(tokenizer.getActiveToken())
```

### Grammar formatting

The Grammar argument must be an array of objects. Each object represents a grammar rule which has a 'tokenType' property (with any string value) and a 'regex' property that is used to apply the rule to strings to find matching tokens. Another example (ArithmeticGrammar) is shown below.

```javascript
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
```

Some important things to note when forming the grammar argument are:

- The caret symbol **^** must be used at the start of the regex patterns. This is important to ensure that moving forward through your input string Tokeniz3r will always find a match at the start of the string.
- While flags can be used in your regex properties the global flag should NOT be used as token matching is based on single matches. Global matching is not handled by the app.
- When using capturing groups in your regex patterns you should be aware that the app will only use the first item (the whole match) from the returned value array.
- regex properties can be formatted one of 3 ways:
    - new RegExp('^[\\w|åäöÅÄÖ]+', 'i')
    - new RegExp(/^[\\w|åäöÅÄÖ]+/, 'i')
    - /^[\\w|åäöÅÄÖ]+/i

Other things you should be aware of:

- The input string is trimmed to remove spaces at the beginning and end
- spaces between tokens are not used as part of tokens.
- The only whitespace handled by tozeniz3r are regular word spaces (the common whitespace symbol U+0020 ‘ ‘ SPACE (also ASCII 32)). You should NOT therefore use other whitespace symbols in your string, such as tabs and hard line breaks.

### The END token

This token is automatically added to your grammar rules by the app. It is used to show you when you have reached the end of your input string. The rule is formatted as follows:

```javascript
    {
        tokenType: 'END',
        regex: /^\s*$/
    }
```

### Active, next and previous tokens

Tokeniz3r has 3 main functions: getActiveToken, setActiveTokenToNext and setActiveTokenToPrevious. The rules that you define in the grammar argument are used to get the active token as well as to set the active token to the next best matching token. However, the rules that are used to move to previous best matching tokens are generated by the app which uses the rules to create a comparable set of rules that find regex matches at the end of strings instead of the beginning.

### Maximal Munch rule

This is applied to every token matching that takes place. If multiple matching tokens are found then the token with the longest length will be considered best. When there are 2 or more best matches of the same length then a LexicalError will be thrown.

## Tokenizer's public methods

The following methods can be called on an instance of the Tokenizer class:

**getActiveToken**: You can get this at any time.

**setActiveTokenToNext**: Moves the active token to the next best matching token. Should not be used when the END token is active.

**setActiveTokenToPrevious**: Moves the active token to the next best matching token. Should not be used when currentIdex is 0

**getNextIndex**: The currentIndex property on a Tokenizer instance shows the index of the input string where the active token begins. Use this method to see the index of the next best matching token in the string.

**countSpacesAfterActiveToken**: This only handles word spaces (the common whitespace symbol U+0020 ‘ ‘ SPACE (also ASCII 32) which is used as a word divider in Western scripts). Other whitespace such as tabs and hard line breaks will not be counted and should therefore NOT be used.

**getPreviousIndex(strBeforeToken, prevTokenLength)**: Use this method to see the index of the previous best matching token in the string. The method may not be particularly useful as a certain amount of knowledge must be required and passed as arguments to the function.

**getBestMatchingToken(strToMatch, isForPrevious)**: Could prove useful for testing how the grammar in your instance handles various strings, both for next and previous token matches. The *isForPrevious* argument is a boolean used to switch between next or previous token rules in the app.

NB: More public methods as well as properties are currently accessible through the Tokeniz3r interface. I would not normally make such an unencapsulated module available for use (nor would I wish to draw attention to them!) but for the sake of the course I must note that due to time constraints I have not been able to encapsulate properties and methods on all classes that are part of Tokeniz3r.

It is also important to note that although the above methods are public and may prove useful in some circumstances, the only 2 methods that actually change state in the instance are the 2 active token setters (setActiveTokenToNext and setActiveTokenToPrevious)

## Common Exceptions

The below table lists some exceptions that may be thrown when interacting with Tokenizer's interface.

| Type                 | Message                                      |
| -------------------  | ---------------------------------------------|
| MethodCallError  | setActiveTokenToNext should not be called when END token is active  |
| MethodCallError  | setActiveTokenToPrevious should not be called when first token is active  |
| LexicalError  | No grammar rule matches string ‘x’  |
| LexicalError  | Maximal munch cannot be applied to tokens ‘x’ and ‘y’  |
| GrammarValidationError  | Grammar argument is not an array of expected objects  |
| GrammarValidationError  | Grammar rule found with missing property  |
| GrammarValidationError  | Grammar rule property of wrong type used  |

## Testing

You can run the modules built in mocha test suite using the npm script: 

`npm test`
