---
source: https://kotlinlang.org/docs/keyword-reference.html
---

# Keywords and operators

Reference of Kotlin hard keywords, soft keywords, modifier keywords, special identifiers, and operators and special symbols.

## Signature / Usage

```kotlin
// Hard keywords cannot be used as identifiers; soft keywords and modifiers can be used as identifiers elsewhere
val x = person?.name ?: return   // ?. safe call, ?: elvis, return
val len = text!!.length          // !! not-null assertion
val r = 1..10                    // .. range; ..< open-ended range
```

## Options / Props

### Hard keywords

Always interpreted as keywords; cannot be used as identifiers.

| Keyword | Description |
|---------|-------------|
| `as` | type cast; specifies an alias for an import |
| `as?` | safe type cast |
| `break` | terminates the execution of a loop |
| `class` | declares a class |
| `continue` | proceeds to the next step of the nearest enclosing loop |
| `do` | begins a do/while loop (postcondition) |
| `else` | branch of an if expression executed when the condition is false |
| `false` | the 'false' value of Boolean |
| `for` | begins a for loop |
| `fun` | declares a function |
| `if` | begins an if expression |
| `in` | object iterated in a for loop; infix operator to check membership in a range, collection, or entity that defines a 'contains' method; same in `when`; marks a type parameter as contravariant |
| `!in` | checks that a value does NOT belong to a range, collection, etc.; also in `when` |
| `interface` | declares an interface |
| `is` | checks that a value has a certain type; also in `when` |
| `!is` | checks that a value does NOT have a certain type; also in `when` |
| `null` | constant representing an object reference that doesn't point to any object |
| `object` | declares a class and its instance at the same time |
| `package` | specifies the package for the current file |
| `return` | returns from the nearest enclosing function or anonymous function |
| `super` | refers to the superclass implementation of a method or property; calls the superclass constructor from a secondary constructor |
| `this` | refers to the current receiver; calls another constructor of the same class from a secondary constructor |
| `throw` | throws an exception |
| `true` | the 'true' value of Boolean |
| `try` | begins an exception-handling block |
| `typealias` | declares a type alias |
| `typeof` | reserved for future use |
| `val` | declares a read-only property or local variable |
| `var` | declares a mutable property or local variable |
| `when` | begins a when expression |
| `while` | begins a while loop (precondition) |

### Soft keywords

Act as keywords in the context in which they are applicable; can be used as identifiers in other contexts.

| Keyword | Description |
|---------|-------------|
| `by` | delegates the implementation of an interface or of property accessors to another object |
| `catch` | begins a block that handles a specific exception type |
| `constructor` | declares a primary or secondary constructor |
| `context` | declares context parameters for functions and properties |
| `delegate` | annotation use-site target |
| `dynamic` | references a dynamic type in Kotlin/JS code |
| `field` | declares an explicit backing field; annotation use-site target |
| `file` | annotation use-site target |
| `finally` | begins a block that is always executed when a try block exits |
| `get` | declares the getter of a property; annotation use-site target |
| `import` | imports a declaration from another package into the current file |
| `init` | begins an initializer block |
| `param` | annotation use-site target |
| `property` | annotation use-site target |
| `receiver` | annotation use-site target |
| `set` | declares the setter of a property; annotation use-site target |
| `setparam` | annotation use-site target |
| `value` | with the `class` keyword declares an inline class |
| `where` | specifies the constraints for a generic type parameter |

### Modifier keywords

Act as keywords in modifier lists of declarations; can be used as identifiers in other contexts.

| Keyword | Description |
|---------|-------------|
| `abstract` | marks a class or member as abstract |
| `actual` | platform-specific implementation in multiplatform projects |
| `annotation` | declares an annotation class |
| `companion` | declares a companion object |
| `const` | marks a property as a compile-time constant |
| `crossinline` | forbids non-local returns in a lambda passed to an inline function |
| `data` | instructs the compiler to generate canonical members for a class |
| `enum` | declares an enumeration |
| `expect` | marks a declaration as platform-specific, expecting an implementation in platform modules |
| `external` | marks a declaration as implemented outside of Kotlin (accessible through JNI or in JavaScript) |
| `final` | forbids overriding a member |
| `infix` | allows calling a function using infix notation |
| `inline` | tells the compiler to inline a function and the lambdas passed to it at the call site |
| `inner` | allows referring to an outer class instance from a nested class |
| `internal` | marks a declaration as visible in the current module |
| `lateinit` | allows initializing a non-nullable property outside of a constructor |
| `noinline` | turns off inlining of a lambda passed to an inline function |
| `open` | allows subclassing a class or overriding a member |
| `operator` | marks a function as overloading an operator or implementing a convention |
| `out` | marks a type parameter as covariant |
| `override` | marks a member as an override of a superclass member |
| `private` | visible in the current class or file |
| `protected` | visible in the current class and its subclasses |
| `public` | visible anywhere |
| `reified` | marks a type parameter of an inline function as accessible at runtime |
| `sealed` | declares a sealed class (restricted subclassing) |
| `suspend` | marks a function or lambda as suspending (usable as a coroutine) |
| `tailrec` | marks a function as tail-recursive |
| `vararg` | allows passing a variable number of arguments for a parameter |

### Special identifiers

Defined by the compiler in specific contexts; can be used as regular identifiers in other contexts.

| Identifier | Description |
|------------|-------------|
| `field` | inside a property accessor, refers to the backing field of the property |
| `it` | inside a lambda, refers to its parameter implicitly |

### Operators and special symbols

| Symbol | Description |
|--------|-------------|
| `+`, `-`, `*`, `/`, `%` | mathematical operators; `*` is also used to pass an array to a vararg parameter |
| `=` | assignment operator; specifies default values for parameters |
| `+=`, `-=`, `*=`, `/=`, `%=` | augmented assignment operators |
| `++`, `--` | increment and decrement operators |
| `&&`, `\|\|`, `!` | logical 'and', 'or', 'not' (for bitwise operations, use the corresponding infix functions) |
| `==`, `!=` | equality operators (translated to calls of `equals()` for non-primitive types) |
| `===`, `!==` | referential equality operators |
| `<`, `>`, `<=`, `>=` | comparison operators (translated to calls of `compareTo()` for non-primitive types) |
| `[`, `]` | indexed access operator (translated to calls of `get` and `set`) |
| `!!` | asserts that an expression is non-nullable |
| `?.` | safe call |
| `?:` | elvis operator: takes the right-hand value if the left-hand value is null |
| `::` | creates a member reference or a class reference |
| `.` | accesses members; defines and calls extensions; qualifies names and packages; separates integer and fractional parts of a floating-point literal |
| `..`, `..<` | create ranges |
| `:` | separates a name from a type in a declaration |
| `?` | marks a type as nullable |
| `->` | separates lambda parameters and body; separates parameters and return type in a function type; separates condition and body of a `when` branch |
| `@` | introduces an annotation; introduces or references a loop label or lambda label; references a `this` expression from an outer scope; references an outer superclass |
| `;` | separates multiple statements on the same line |
| `$` | references a variable or expression in a string template |
| `_` | substitutes an unused parameter in a lambda expression or in a destructuring declaration |

## Notes

- For operator precedence, the source page refers to the Kotlin grammar (kotlinlang.org/grammar).
- `typeof` is reserved for future use.

## Related

- [Visibility modifiers](./visibility-modifiers.md)
- [Annotations](./annotations.md)
- [Null safety](./null-safety.md)
- [Equality](./equality.md)
- [Destructuring declarations](./destructuring-declarations.md)
