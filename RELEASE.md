# Template for submission laboratory 1, 1dv610

## Checklist
  - [✅*] In my tokenizer there are no token types or reg-exp. These are in my test project because they are created by the user. 
  - [✅] I have written all the code and reflections myself. I have not used other people's code to solve the task.
  - [✅] My test results are written based on testing performed (and not theoretically, it should work :))
  - [✅] The only static methods or functions outside of classes that I have are to start my test application ex main (java).
  - [✅] The only libraries and ready-made classes used are those that must be used (or used to test the module).

*The END token (incl. regexp) is created in my app. This had to be done to handle the token in a controlled way.

## Self-assessment and goals
  - [ ] I'm not done because I know I'm missing something. Then do not submit!
  - [ ] I strive with this submission approved grade (E-D)
    - [✅] Most test cases work
    - [✅] The code is ready for reuse
    - [✅] All code and history are in git
    - [✅] The code quality requirements are met
    - [✅] Reflection is written
  - [] With this submission, I strive for higher grades (C-B) and consider myself to meet all the additional requirements for this.
    - [✅] All test cases are written
    - [✅] Own test cases for Maximum munch and edge cases
    - [✅] Test cases are automated
    - [✅] There is a clear description of how to use the module (in git)
    - [✅] The code quality requirements are varied
  - [✅] I strive for the highest grade (A) with this submission

Clarification: The examiner will give grades regardless of what you think.

## Reuse
Describe how you adapted your code and instructions for another programmer to use your tokenizer. If you have written instructions for your user link to these. If not, describe here what someone should do to use your code with their own grammar.

- First and foremost I have tried to use intention revealing names for methods and properties that are accessible through the modules public interface.
- I have also provided detailed information in the [README.md file](https://gitlab.lnu.se/1dv610/student/nt222fc/l1/-/blob/master/README.md) in the root directory of the project.

## Description of my code
Describe your code at a high level of abstraction. A brief description of your most important classes and methods. Feel free to create a class diagram as an image.

My module consists of 5 classes:

- **Tokenizer**: this is the class that is exported through the index.js file. It's public methods constitute the module's public interface: getActiveToken, setActiveTokenToNext and setActiveTokenToPrevious.
- **Grammar**: the *grammar* argument used when instanciating a Tokenizer object is used by the Tokenizer constructer to create an instance of the Grammar class. This has one public method which means the class can assess what the best next or previous match is in the input string.
- **Rules**: generates 2 arrays of Rule instances using the grammar argument: one for next token rules and one for previous token rules.
- **Rule**: rules are used to check if matching tokens can be identified in strings.
- **Token**: instances are created by the app to represent best matches and can be got by users accessing the activeToken property, or set using the setActiveTokenToNext and setActiveTokenToPrevious methods on the Tokenizer class.

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
| TC25_EdgeCase_GetFirstTokenThatDoesNotContainLeadingSpace_Sequence[] | WordAndDotGrammar | " a" | [] | WORD("a") | ✅ |

## Code quality requirements

**Bold** the "rules" used from CC. You can deviate from table format if you want. Create direct links to your code where appropriate.

### Naming

| Name and explanation  | Reflection  |
| -------------------  | ---------------------------------------------|
| setActiveTokenToPrevious: A public method of the Tokenizer class | **Intention revealing name**: AS this is one of the main functions of my app, it was important to me that this method has a name that clearly states what it will do. <br><br>However, a certain amount of implicity is used and thus I’m breaking Martins **avoid mental mapping** rule a little as I do not specify exactly what ‘previous’ refers to, but I am trying to avoid using a very long name such as ‘setActiveTokenToPreviousBestMatchingToken’ for the sake of accuracy. I am making an assumption that users of the module will have a good understanding that a tokenizer moves to next and previous tokens, and this functionality is well documented in the README.md. <br><br>**Pick one word per concept**: I was tempted to use the term ‘preceding’ instead of ‘previous’ in certain places where it seemed it would be more accurate, e.g. when talking about the previous active token it could be that this is after the current active token as we are moving backwards in the string. I decided however to be consistent and use the term previous. <br><br>**I also resisted the urge to use ‘preceding’ because ‘previous’ is still technically correct and I believe it is more commonly used terminology in the **solution domain names**. <br><br>**Avoid disinformation**: I made a decision in the end to not abbreviate ‘Previous’ to ‘Prev’ in this name because Martin warns against ‘using names which vary in small ways’, and I found that multiple sequential calls to this function and its partnering function ‘setActiveTokenToNext’ looked very similar due to being the exact same length and only having 4 different letters. Simply extending the name to contain ‘Previous’ made a considerable visible distinction between the names of the two functions. |
| getBestMatchingToken: A public method of the Tokenizer class | **Intention revealing name**: I think the name explains exactly what the purpose of the method is. <br><br>**Problem domain names**: The terms ‘match’ and ‘token’ seem to be important problem domain names, while ‘match’ is also familiar in the solution domain and, most importantly, is a common method used on the RegExp object that is a fundamental part of the app. ‘Best’ clearly indicates that some calculation is done to ensure that one token is returned. ‘get’ is a familiar term to programmers, e.g. in the javabean standard for **method names**, although I am aware that the function itself is not a getter of a class property as is the intended use in the standard. |
| strToMatch: a parameter of the getBestMatchingToken method | This may be breaking the **Make meaningful distinctions** rule as I've written "str" in the name which Martin considers a noise word, but I find in JavaScript that this is more useful than if I were to be using a typed language like C# that would specify ‘String’ as the parameter’s type out of necessity. The decision has also been affected by the fact that I’m avoiding using comments, which would naturally have specified that this is a string. <br><br>**Intention revealing name**: I’m still not completely convinced about this name as it seems a bit odd when I read it out of context. But when it is viewed within its function, the only function where it is used, it seems to reveal the complete intent of the parameter. This is important to me as it will be part of the public interface. |
| isPreviousToken:  a parameter of the getBestMatchingToken method | **Method names**: I believe using "is" lets my intended audience (other programmers) know a boolean is being returned. <br><br>**Intention revealing name**: I find that this is a difficult name to make complete sense of when not in context. But as it is only part of this one method, I feel it is much better understood when read after the method name in the signature. <br><br>**Avoid mental mapping**: I did consider using just ‘isPrevious’ or even ‘isPrev’ as I think it would still be fairly clear in context when reading the code, but as it is part of the public interface, I decided to add ‘Token’ to try to remove any doubt about the name’s meaning and to remove some need for mental mapping. |
| inputStrCurrentIndex: A public (pseudo) property of the Tokenizer class that is a getter for the value of the private #currentIndex field | **Solution domain names**: I’m not sure if the term ‘input string’ is considered a problem domain term but it (or usually just ‘string’) is the only term that I found in the few sites I researched. Regardless, it is certainly a clear name in the solution domain. I feel that ‘current index’ should also be quite clear in the solution domain. <br><br>**Intention revealing name**: I was however weary that simply using ‘currentIndex’ as a public property would not reveal enough - users might for example think that it refers to an index of Tokens. <br><br>The inclusion of ‘str’ may be breaking Martins **Make meaningful distinctions** rule as ‘string’ is considered a noise word, but ‘input’ simply wouldn’t be enough by itself and I simply can’t find anything that is close to being as revealing as this term.  |

### Functions

| Method name and explanation (no. lines excl. ws)  | Reflection |
| -------------------  | ---------------------------------------------|
| #getMatchingTokens: A private method of the Tokenizer class that returns an array of tokens. Called within the getBestMatchingToken method that analyzes the array of Tokens to determine which is the best match (6) | **Small**: Too long according to Martin! I can see ways to shorten it: the if condition and statement could be on one line, the if condition could have some very hard to read code instead of the ‘match’ variable, I even tried returning a grammarRules.map().filter() version to remove a line. Either which way, all these things just made it much harder to read. In this instance, I chose readability over reducing line count. The rule is broken further as I have 3 indentations. I’m not really sure how to avoid this as I have an if statement within a forEach function. I could pull the whole if statement out to a separate function, but then it would require 3 parameters, which according to the **Function Arguments** rule should be avoided. So I decided to avoid it! <br><br>Perhaps the indentation is a sign that the function does not **Do one thing**. Perhaps there should be a ‘matchRuleToString’ function within this, but it seems too fine grained to me and will suffer again from passing many arguments. |
| setActiveTokenToNext: A public method of the Tokenizer class (5) | This function does not just **Do one thing** as it sets the activeToken AND sets the currentIndex. I have deliberately chosen not to mention this in the naming of the public method as I want to focus users on the core purpose of the method. <br><br>**Have no side-effects**: The current index must change as a knock-on effect of the token changing. It’s fundamental to how my app knows where to do next or previous matches in the input string. I don’t really know how to remove this as a side effect. Even if I create a separate ‘setCurrentIndex’ method, it still needs to be called within the setActiveTokenToNext method and is still a side effect. I also don’t want to create a separate method for this as I think it would just be restating code without changing abstraction level. |
| setActiveTokenToPrevious: A public method of the Tokenizer class (5) | As with setActiveTokenToNext, there is code in this function dedicated to updating the *currentIndex* so I don’t think it conforms to the **Do one thing** rule. <br><br>I think that moving this into a separate private setter function would just add unnecessary complexity and would not change the fact that the function breaks the **Have no side effects** rule. |
| getBestMatchingToken: A public method of the Tokenizer class. (4) | **Function arguments (dyadic function with flag argument)**: I get that the more arguments that are added, the more difficult it is to read the exact purpose of a method. I also get that adding flag arguments can be ‘ugly’ as this essentially means a function will do one of at least 2 things, so just by having a flag argument is a simple indication that you are breaking the ‘Do one thing’ rule. However, in the case of this function, I don’t think much extra effort is required to understand its purpose (when reading the function signature at least) given that there are 2 arguments. It will get a best match for either a next or previous token. Good naming helps to reveal the added complexity. The major downside of using this flag in my opinion is that function calls have a true or false argument that does not reveal any meaning as to its purpose without commentsm, and the viewer must refer to the method signature to understand what the Boolean means, a ‘double-take’ according to Martin that should be avoided. I admit it’s not a perfect solution but I feel it is acceptable in my small app. <br><br>**Don’t repeat yourself**: If I didn’t use the *isPreviousToken* flag argument, I would end up with 2 slightly differently named methods that have nearly the exact same code, with the exception of one variable. This in itself would break the DRY rule and this is the main reason for me not dividing this method into 2. |
| #getLongestMatch: A private method of the Tokenizer class (4) | **Use descriptive names**: I originally called this function ‘#applyMaximalMunch’. However, this problem domain name did not really describe exactly what the method done. I found on Wikipedia that another name used in the problem domain is ‘longest match’ and this works equally well in the solution domain, with the advantage that using ‘get’ is now suitable and explains that the method returns something, more specifically, a single matched token based on length. The ‘token’ part is implicit if we look at the name alone, but I have used a ‘tokens’ parameter that helps complete the description when looking at the code. |

## Laboratory reflection
Reflect on the task from a code quality perspective. Use concepts from the book.

- In terms of naming, I would say that my main takeaway from this laboratory is that there is a real struggle between reducing gratuitous content while revealing intention at the same time. I always want to write names that are short as I have been kind of brainwashed into thinking that less code = a better programmer. In the end, I always feel that my naming is too long, yet I struggle to remove content as everything seems justified. Perhaps I need to give my audience some more credit, or at least learn to abbreviate better!
- For this lab I have written code that is much wider than I normally write. There are 2 main factors for this: tying to stick to the **small** rule (i.e. reducing line count) and trying to use **intention revealing names** that mean I have probably added more info in the names than I normally would.
- I feel like I’m writing a book at times as the names in general are so long. I have aired on the side of caution and not used many abbreviations to shorten names as I feel that not using comments means that the naming needs to be extra clear.
- I have personally felt that trying to code smaller functions ends up passing more arguments between them. For example, this was a battle I had trying to break up my original GetBestMatchingTokens function which was actually doing at least 2 things: getting the matching tokens first then figuring out which was best. But trying to pull the second function out meant adding 2 arguments which I could not avoid.
- I feel that trying to write smaller functions that don’t have many nested control statements has resulted in writing more lines of code. This partly is due to having more functions, although I can clearly see that using well named functions within functions (even if this does create 3 or 4 more lines of code overall) helps to create a narrative which leads to comments being largely unnecessary.
- I felt forced to use an index.js file as my main file for convention but ended up exporting my Tokenizer class directly from it. After a lot of programming I questioned this and found that it is not really necessary to use index.js as a file name, but renaming the file to the class name seemed quite complicated and I didn’t want to risk losing the file’s git history. Lesson learned: plan ahead a little with file naming. Having the Tokenizer class hidden in the index file now feels weird.

- It’s tough to follow the rules because it often feels like following one means you break another.

- It is really nice to have a test suite set up when refactoring. This has made me much more confident in making changes, big and small.
- Overall, I am quite happy with the application I have coded. It seems to be quite understandable without comments for the majority of the content. Of course it will be interesting to see how it is interpreted by others as I’m sure there is a lot I haven’t thought about, even for such a small app. But I think I have kept the functionality simple and I think it provides users with some pretty clear guidance in the README.md if they are in doubt about elements of the code.
