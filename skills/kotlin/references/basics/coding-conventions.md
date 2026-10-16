---
source: https://kotlinlang.org/docs/coding-conventions.html
---

# Coding conventions

Guidelines on code style and code organization for projects that use Kotlin: source organization, naming, formatting, documentation comments, redundant constructs, idiomatic language use, and extra rules for libraries.

## Signature / Usage

```kotlin
/** License, copyright and whatever */
@file:JvmName("FooBar")

package foo.bar

class Person(
    id: Int,
    name: String,
    surname: String
) : Human(id, name) { /*...*/ }

fun longMethodName(
    argument: ArgumentType = defaultValue,
    argument2: AnotherArgumentType,
): ReturnType {
    // body
}
```

### Source code organization

- Directory structure follows the package structure with the common root package omitted (`org.example.kotlin.network.socket` goes in `network/socket`). On JVM, Kotlin files sit in the same source root as Java files with the same directory structure.
- A file with a single class or interface (plus related top-level declarations) is named after the class with the `.kt` extension; otherwise choose a descriptive upper camel case name (`ProcessDeclarations.kt`); avoid meaningless words such as `Util`.
- In multiplatform projects, top-level declarations in platform-specific source sets take a suffix (`Platform.jvm.kt`, `Platform.android.kt`, `Platform.ios.kt`); the common source set has no suffix (`Platform.kt`). Reason: the JVM compiler creates "file facades" named after the file, and two `Platform.kt` in the same package produce the "Duplicate JVM classes" error.
- Class layout order: property declarations and initializer blocks; secondary constructors; method declarations; companion object. Do not sort methods alphabetically or by visibility. Keep overloads next to each other. Keep interface implementations in the interface's member order.

### Naming rules

```kotlin
open class DeclarationProcessor { /*...*/ }

object EmptyDeclarationProcessor : DeclarationProcessor() { /*...*/ }

fun processDeclarations() { /*...*/ }
var declarationCount = 1

const val MAX_COUNT = 8
val USER_NAME_FIELD = "UserName"

val mutableCollection: MutableSet<String> = HashSet()

val PersonComparator: Comparator<Person> = /*...*/

class C {
    private val _elementList = mutableListOf<Element>()

    val elementList: List<Element>
        get() = _elementList
}
```

- Packages: lowercase, no underscores (`org.example.project`). Classes and objects: upper camel case. Functions, properties, local variables: lower camel case.
- Class-like function names: factory functions may share the abstract return type's name; `@Composable` functions that return `Unit`.
- In tests only, backticked method names with spaces are allowed (supported by Android runtime from API level 30); underscores are also allowed.
- Acronyms: two letters uppercase (`IOStream`); longer than two letters capitalize only the first (`XmlFormatter`, `HttpInputStream`).

### Formatting

- Four spaces for indentation, no tabs; opening brace at end of the line where the construct begins. Semicolons are optional, so line breaks are significant.
- Spaces around binary operators except `..`; none around unary operators, `.`, `?.`, `::`, angle brackets, or before `?` in nullable types; space after `//`.
- Colon: space before `:` when separating a type and supertype, when delegating to a constructor, and after `object`; no space before `:` between a declaration and its type; always a space after.
- Modifiers order:

```kotlin
public / protected / private / internal
expect / actual
final / open / abstract / sealed / const
external
override
lateinit
tailrec
vararg
suspend
inner
enum / annotation / fun // as a modifier in `fun interface`
companion
inline / value
infix
operator
data
```

- Annotations go before modifiers, on separate lines (annotations without arguments may share a line; a single argument-less annotation may share the declaration's line). File annotations go before `package`, separated by a blank line.
- Prefer expression bodies for single-expression functions; for very simple read-only properties use `val isEmpty: Boolean get() = size == 0`.
- Multiline `if`/`when` conditions always use braces. `else`, `catch`, `finally`, and `while` of do-while go on the same line as the preceding brace. Short `when` branches go on the same line as the condition without braces.
- Chained calls: put `.` or `?.` on the next line with a single indent.
- Lambdas: spaces around braces and the arrow; pass a single lambda outside parentheses.

```kotlin
list.filter { it > 10 }

val anchor = owner
    ?.firstChild!!
    .siblings(forward = true)
    .dropWhile { it is PsiComment || it is PsiWhiteSpace }

drawSquare(
    x = 10, y = 10,
    width = 100, height = 100,
    fill = true
)
```

### Trailing commas

Encouraged at the declaration site, optional at the call site.

```kotlin
class Person(
    val firstName: String,
    val lastName: String,
    val age: Int, // trailing comma
)

enum class Direction {
    NORTH,
    SOUTH,
    WEST,
    EAST, // trailing comma
}
```

### Documentation comments

```kotlin
/**
 * Returns the absolute value of the given [number].
 */
fun abs(number: Int): Int { /*...*/ }
```

Generally avoid `@param` and `@return`; incorporate descriptions into the comment text with links, unless a lengthy description is required.

### Avoid redundant constructs

Omit `: Unit` return types and semicolons; omit braces for simple variables in string templates.

```kotlin
println("$name has ${children.size} children")
```

### Idiomatic use of language features

```kotlin
// Immutability: val over var; read-only collection interfaces
fun validateValue(actualValue: String, allowedValues: Set<String>) { ... }
val allowedValues = listOf("a", "b", "c")

// Default parameter values over overloads
fun foo(a: String = "a") { /*...*/ }

// Type aliases for repeated functional or generic types
typealias MouseClickHandler = (Any, MouseEvent) -> Unit
typealias PersonIndex = Map<String, Person>

// Named arguments for same-typed or Boolean parameters
drawSquare(x = 10, y = 10, width = 100, height = 100, fill = true)

// Expression form of try, if, when
return if (x) foo() else bar()
return when(x) {
    0 -> "zero"
    else -> "nonzero"
}

// Range loops
for (i in 0..<n) { /*...*/ }  // good

// Multi-dollar interpolation and multiline strings
val a = """Trimmed to margin text:
        |if(a > 1) {
        |    return a
        |}""".trimMargin()
```

- Prefer `if` for binary conditions; prefer `when` for three or more options.
- With guard conditions in `when`, use parentheses when combining boolean expressions:

```kotlin
when (status) {
    is Status.Ok if (status.info.isEmpty() || status.info.id == null) -> "no information"
}
```

- Nullable `Boolean` in conditions: `if (value == true)` or `if (value == false)`.
- Prefer higher-order functions (`filter`, `map`) to loops; exception: prefer a regular `for` loop to `forEach` unless the receiver is nullable or it is part of a longer call chain.
- Prefer a property over a function when the algorithm does not throw, is cheap (or cached on first run), and returns the same result while object state is unchanged.
- Use extension functions liberally but restrict their visibility. Declare `infix` only for functions on two objects playing a similar role (`and`, `to`, `zip`; not `add`) and never when mutating the receiver.
- Factory functions: avoid the class's own name; prefer a distinct name (for example `Point.fromPolar`) unless there are no special semantics.
- Platform types: a public function or property initialized with a platform-type expression must declare its Kotlin type explicitly.

```kotlin
fun apiCall(): String = MyJavaApi.getProperty("name")

class Person {
    val name: String = MyJavaApi.getProperty("name")
}
```

### Coding conventions for libraries

- Always explicitly specify member visibility.
- Always explicitly specify function return types and property types.
- Provide KDoc comments for all public members, except overrides that need no new documentation.

## Notes

- To apply the style guide in IntelliJ IDEA / Android Studio: Settings/Preferences | Editor | Code Style | Kotlin | Set from... | Kotlin style guide. To check: Editor | Inspections | General | Incorrect formatting.
- Unless you are working on a library, omit redundant modifiers (for example, `public`).
- Scope function selection guidance lives in the Scope Functions page of the official docs.

## Related

- [Visibility modifiers](./visibility-modifiers.md)
- [Document Kotlin code: KDoc](./kotlin-doc.md)
- [Idioms](./idioms.md)
- [Annotations](./annotations.md)
