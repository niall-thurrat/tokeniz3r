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
through its interface. You can then create instances of Tokenizer based on a sting that you want to break into tokens,
and a grammar that you specify yourself and which uses regular expressions to find matches in the input string. When you instantiate a Tokenizer object, an active token is identified (i.e. is considered the best match using the grammar rules provided) at the start of the string. You will then be able to get info about the active token, as well as move the
active token to next and previous tokens within the boundaries of the string.

## Getting started

bla

### Prerequisites

- Node.js [installed](https://nodejs.org/en/download/)
- NPM installed (this comes with node.js)

## Using Tokenizer

bla

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

bla
