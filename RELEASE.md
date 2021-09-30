# Template for submission laboratory 1, 1dv610

## Checklist
  - [✅*] In my tokenizer there are no token types or reg-exp. These are in my test project because they are created by the user. 
  - [✅] I have written all the code and reflections myself. I have not used other people's code to solve the task.
  - [✅] My test results are written based on testing performed (and not theoretically, it should work :))
  - [✅] The only static methods or functions outside of classes that I have are to start my test application ex main (java).
  - [✅] The only libraries and ready-made classes used are those that must be used (or used to test the module).

*The END token (incl. regexp) is created in my app. This had to be done to manage handling the token in a controlled way.

## Self-assessment and goals
  - [ ] I'm not done because I know I'm missing something. Then do not submit!
  - [ ] I strive with this submission approved grade (E-D)
    - [✅] Most test cases work
    - [✅] The code is ready for reuse
    - [✅] All code and history are in git
    - [✅] The code quality requirements are met
    - [✅] Reflection is written
  - [✅] With this submission, I strive for higher grades (C-B) and consider myself to meet all the additional requirements for this.
    - [✅] All test cases are written
    - [✅] Own test cases for Maximum munch and edge cases
    - [✅] Test cases are automated
    - [✅] There is a clear description of how to use the module (in git)
    - [✅] The code quality requirements are varied
  - [] I strive for the highest grade (A) with this submission

Clarification: The examiner will give grades regardless of what you think.

## Reuse
Describe how you adapted your code and instructions for another programmer to use your tokenizer. If you have written instructions for your user link to these. If not, describe here what someone should do to use your code with their own grammar.

- First and foremost I have tried to use intention reveling names for all methods that are accessible through the modules public interface.
- I have also provided detailed information in the [README.md file](https://gitlab.lnu.se/1dv610/student/nt222fc/l1/-/blob/master/README.md) in the root directory of the project.

## Description of my code
Describe your code at a high level of abstraction. A brief description of your most important classes and methods. Feel free to create a class diagram as an image.

My module consists of 4 classes:
- **Tokenizer**: this is the class that is exported through the index.js file. It's public methods constitute the available methods in the module's public interface. 
- **Grammar**: the *grammar* argument used when instanciating a Tokenizer object is used by the Tokenizer constructer to create an instance of the Grammar class. This has 2 arrays of differing grammar Rule objects: nextTokenRules and previousTokenRules.
- **Rule**: rules are used to check if matching tokens can be identified in strings.
- **Token**: instances are created by the app to represent best matches and can be got by users using the getActiveToken method, or set using the setActiveTokenToNext and setActiveTokenToPrevious methods on the Tokenizer class.

## How I tested
Describe how you came to the conclusion that your code works.

A mocha test suite using the chai expect assertion library was added to the module. This performed tests using 3 different types of grammar.

### Test cases
List the individual test cases. **Bold** things that you have filled in yourself. One line per test case.

| Name  | Grammar | String | Sequence | Expected Active Token | PASS/FAIL |
| --------- | --------- | ------ | ------- | ------------ | --------- |
| TC1 | WordAndDotGrammar | "a" | [] | WORD("a") | ✅ |
| TC2 | WordAndDotGrammar | "a aa" | [>] | WORD("aa") | ✅ |
| TC3 | WordAndDotGrammar | "a.b" | [>] | DOT(".") | ✅ |
| TC4 | WordAndDotGrammar | "a.b" | [>>] | ***WORD("b")*** | ✅ |
| TC5 | WordAndDotGrammar | "aa. b" | ***[>>]*** | WORD("b") | ✅ |
| TC6 | WordAndDotGrammar | "a .b" | [>><] | DOT(".") | ✅ |
| TC7 | WordAndDotGrammar | "" | [] | END | ✅ |
| TC8 | WordAndDotGrammar | " " | [] | ***END*** | ✅ |
| TC9 | WordAndDotGrammar | "a" | ***[>]*** | END | ✅ |
| TC10 | WordAndDotGrammar | "a" | [<] | ***Exception*** | ✅ |
| TC11 | WordAndDotGrammar | "!" | [] | Exception | ✅ |
| TC12 | ArithmeticGrammar | "3" | [] | Number("3") | ✅ |
| TC13 | ArithmeticGrammar | "3.14" | [] | NUMBER("3.14") | ✅ |
| TC14 | ArithmeticGrammar | "3 + 54 * 4" | [>>>] | MUL("*") | ✅ |
| TC15 | ArithmeticGrammar | "3+5 # 4" | [>>>] | ***Exception*** | ✅ |
| TC16 | ArithmeticGrammar | "3.0+54.1     + 4.2" | [><>>>] | ***ADD("+")*** | ✅ |

You can comment if your tokenizer differs slightly from the default.

### Test cases for higher grade

List the individual test cases. One row per test case.

| Name  | Grammar | String | Sequence | Expected Active Token | PASS/FAIL |
| --------- | --------- | ------ | ------- | ------------ | --------- |
| TC17_GetLeftParenthesisToken_Sequence[>>] | ArithmeticGrammar | "3.0 + (5 * 4)" | [>>] | LEFT_PARENTHESIS("(") | ✅ |
| TC18_GetRightParenthesisToken_Sequence[>>>>] | ArithmeticGrammar | "(5 * 4) / 2" | [>>>>] | RIGHT_PARENTHESIS(")") | ✅ |
| TC19_GetDivisionToken_Sequence[>] | ArithmeticGrammar | "2 / 2" | [>] | DIV("/") | ✅ |
| TC20_GetSubtractionToken_Sequence[>] | ArithmeticGrammar | "7-4" | [>] | SUBTRACT("-") | ✅ |
| TC21_GetFloatTokenUsingMaxMunch_Sequence[] | MaximalMunchGrammar | 3.14" | [] | FLOAT("3.14") | ✅ |
| TC22_GetExceptionForSameLengthMatchingTokens_Sequence[] | FailingMaximalMunchGrammar | "3.14" | [] | Exception | ✅ |
| TC23_EdgeCase_GetLastTokenFromInputStrWithNoTrailingSpace_Sequence[] | WordAndDotGrammar | "a " | [] | WORD("a") | ✅ |
| TC24_EdgeCase_GetEndTokenWhenInputStrHasTrailingSpace_Sequence[>] | WordAndDotGrammar | "a " | [>] | END | ✅ |
| TC25_EdgeCase_GetFirstTokenThatDoesNotContainLeadingSpace_Sequence[] | WordAndDotGrammar | "a " | [] | WORD("a") | ✅ |

## Code quality requirements

**Bold** the "rules" used from CC. You can deviate from table format if you want. Create direct links to your code where appropriate.

### Naming

| Name and explanation  | Reflection  |
| -------------------  | ---------------------------------------------|
| setActiveTokenToPrevious: A public method on the Tokenizer class | **Intention revealing name**: This method is one of 2 setters that are available for the activeToken property on the module’s interface. It was important to me that this method had a clear intention revealing name. A certain amount of implicity is used however. I am aware that I do not specify exactly what ‘previous’ refers to, but I am trying to avoid using a very long name such as ‘setActiveTokenToPreviousBestMatchingToken’. I am making an assumption that users of the module will have some understanding that a tokenizer moves to next and previous tokens, and this functionality is well documented in the README.md if they are in any doubt when trying to understand the basics of the module.<br><br>**Avoid disinformation**: I made a decision in the end to not abbreviate ‘Previous’ to ‘Prev’ in this name to avoid disinformation.  Martin [1, p.20] warns against ‘using names which vary in small ways’, and I found multiple sequential calls to this function and its corresponding ‘setActiveTokenToNext’ function looked very similar due to being the exact same length and only having 4 different letters. Simply extending the name to contain ‘Previous’ meant a clear distinction between the 2 due to name length alone name to contain ‘Previous’ meant a clear distinction between the 2 due to name length alone.  |
| getBestMatchingToken: A public method on the Tokenizer class | I feel this is a clear **Intention revealing name**.  |
| strToMatch: an arg on the getBestMatchingToken method | This may be breaking the **Make meaningful distinctions** rule as I've written "str" in the name which Martin considers a noise word, but I find in Javascript that this is more useful than if I were to be using a typed language like C# that would specify this out of necessity. The decision has also been affected by not using comments, which would naturally have specified that this is a string. |
| isForPrevious: an arg on the getBestMatchingToken method | **Method names** using "is" lets the viewer know a boolean is being returned.<br><br>For brevity I did not make this completely follow the rule **Intention revealing name** and in hindsight it needs context to be understood and should probably be changed or extended to something like isToMatchPrviousToken|
| applyMaximalMunch: A public method on the Tokenizer class | I feel this is a clear **Intention revealing name**.|

### Functions

| Method name and explanation (no. lines excl. ws)  | Reflection  |
| -------------------  | ---------------------------------------------|
| setActiveTokenToNext (7) | **Small!**: This method is too long according to Martin’s ‘Small!’ rule.<br><br>I think the function sticks to the **Do one thing** rule and does exactly what the naming suggests.  |
| setActiveTokenToPrevious (7) | **Small!**: Too long according to Martin’s ‘Small!’ rule.<br><br>In contrast to setActiveTokenToNext, I feel that there is code in here that means that this does not apply to the **Do one thing** rule. I had trouble thou pulling the code that is needed to update the currentIndex out of this function without using at least 3 arguments. |
| applyMaximalMunch (6) | **Small!**: Too long according to the ‘Small!’ rule. This however could be fixed by getting rid of the 2 lines used to create pretty strings to represent the tokens. Had I time, I would have overwritten the toString method of the Token class. |
| getMatchingTokens (5) | **Small!**: Too long according to the ‘Small!’ rule. <br><br>This was extracted from the getBestMatchingToken function and I am quite happy with it and feel it sticks to the **Do one thing** rule. I can't really see how to shorten it without making a super wide forEach statement on one line |
| setPreviousTokenRules (5) | **Small!**: Too long according to Martin though I'm very happy with getting it down to 5 lines. I done so by extracting the code for the createPreviousTokenRule function from it. Reads much bettrer too. |

## Laboratory reflection
Reflect on the task from a code quality perspective. Use concepts from the book.

- I’m wring code that is wider and less spacious to reduce line count! The more accurate naming of functions and variables means that these will be better understood without having to consider their context (avoid mental mapping as Martin puts it) but it does lead to writing much wider lines that don’t want to break up as I’m trying to adhere to the rule to not make functions longer that 3 or 4 lines.
- I feel like I’m writing a book at times as the names in general are so long. I have aired on the side of caution and not used many abbreviations to shorten names as I feel that not using comments means that the naming needs to be extra clear.
- I have personally felt that trying to code smaller functions ends up passing more arguments between them. For example, this was a battle I had trying to break up my original GetBestMatchingTokens function which was actually doing at least 2 things: getting the matching tokens first then figuring out which was best. But trying to pull the second function out meant adding 2 arguments which I could not avoid.
- I feel that trying to write smaller functions that don’t have many nested control statements has resulted in writing more lines of code. This partly is due to having more functions, although I can clearly see that using well named functions within functions (even if this does create 3 or 4 more lines of code overall) helps to create a narrative which leads to comments being largely unnecessary.
- I felt forced to use an index.js file as my main file for convention but ended up exporting my Tokenizer class directly from here. After a lot of programming I questioned this and found that it is not really necessary to use index.js as a file name, but renaming the file to the class name seemed quite complicated and I didn’t want to risk losing the file’s git history. Lesson learned: plan ahead a little with file naming. Having the Tokenizer class hidden in the index file now feels weird.
- Overall I am quite happy with the application I have coded. It seems to be quite understandable without comments for the vast majority of the content. Of course it will be interesting to see how it is interpreted by others as I’m sure there is a lot I haven’t thought about, even for such a small app. But the functionality has been kept very simple and I think it provides users with some pretty clear guidance in the README.md.
