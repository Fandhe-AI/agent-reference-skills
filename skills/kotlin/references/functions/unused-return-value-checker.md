---
source: https://kotlinlang.org/docs/unused-return-value-checker.html
---

# Unused return value checker

Compiler check that detects ignored results: values of expressions other than `Unit`, `Nothing`, `Nothing?` that are silently dropped.

## Signature / Usage

```kotlin
// build.gradle(.kts)
kotlin {
    compilerOptions {
        freeCompilerArgs.add("-Xreturn-value-checker=check")
    }
}
```

```xml
<!-- pom.xml -->
<plugin>
    <groupId>org.jetbrains.kotlin</groupId>
    ..
    <configuration>
        <args>
            <arg>-Xreturn-value-checker=check</arg>
        </args>
    </configuration>
</plugin>
```

A result counts as used when it is stored in a variable or property, returned or thrown, passed as an argument, used as a receiver in a call or safe call, checked in `if` / `when` / `while`, or is the last statement of a lambda.

```kotlin
fun formatGreeting(name: String): String {
    if (name.isBlank()) return "Hello, anonymous user!"
    if (!name.contains(' ')) {
        // The checker reports a warning that this result is ignored:
        // "Unused return value of 'plus'."
        "Hello, " + name.replaceFirstChar(Char::titlecase) + "!"
    }
    val (first, last) = name.split(' ')
    return "Hello, $first! Or should I call you Dr. $last?"
}
```

### Mark your own code

```kotlin
// Marks all functions and classes in this file so the checker reports unused return values
@file:MustUseReturnValues

package my.project

fun someFunction(): String
```

```kotlin
// Marks all functions in this class so the checker reports unused return values
@MustUseReturnValues
class Greeter {
    fun greet(name: String): String = "Hello, $name"
}
```

### Suppress reports

```kotlin
@IgnorableReturnValue
fun <T> MutableList<T>.addAndIgnoreResult(element: T): Boolean {
    return add(element)
}

fun main() {
    // Reports a warning: result is ignored
    computeValue()

    // Suppresses the warning only at this call site with a special unused variable
    val _ = computeValue()
}
```

### Higher-order functions

Add the Experimental `returnsResultOf()` contract to check lambda results:

```kotlin
import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.contract

@OptIn(ExperimentalContracts::class)
inline fun <T, R> T.customLet(block: (T) -> R): R {
    contract {
        returnsResultOf(block)
    }
    return block(this)
}
```

Requires the compiler option `-Xallow-returns-result-of` (`freeCompilerArgs.add("-Xallow-returns-result-of")` in Gradle; `<arg>-Xallow-returns-result-of</arg>` in Maven).

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `-Xreturn-value-checker=disable` | compiler option | Disables the checker (default) |
| `-Xreturn-value-checker=check` | compiler option | Enables the checker; reports ignored results from marked functions only |
| `-Xreturn-value-checker=full` | compiler option | Enables the checker and treats all functions in the project as marked |
| `@MustUseReturnValues` | annotation | Marks a file, class or function whose results must be used |
| `@IgnorableReturnValue` | annotation | Suppresses reports for a function whose result may be ignored |

## Notes

- The official page notes the feature is planned to be stabilized and improved in future Kotlin releases and asks for feedback on YouTrack (KT-12719); KEEP-0412 is the related proposal.
- Not reported: `++` / `--` increments, and boolean shortcuts whose right-hand side exits the function (e.g. `condition || return`).
- Marked functions propagate: projects that depend on your code also report ignored results if the checker is enabled there. Most functions in the Kotlin standard library are marked.
- Overrides inherit the reporting rules of the base declaration (including library bases such as `Any.hashCode()`). A function marked `@IgnorableReturnValue` can't be overridden by one that requires its result to be used; an override inside a `@MustUseReturnValues` class or interface may be annotated `@IgnorableReturnValue`.
- Kotlin contracts are Experimental (`@OptIn(ExperimentalContracts::class)`). Using `returnsResultOf()` produces pre-release binaries that Kotlin compiler versions earlier than 2.4.0 can't read.
- Treated as equivalent to `@MustUseReturnValues`: `CheckReturnValue` from `com.google.errorprone.annotations`, `edu.umd.cs.findbugs.annotations`, `org.jetbrains.annotations`, `org.springframework.lang`, `org.jooq`. `com.google.errorprone.annotations.CanIgnoreReturnValue` is treated as `@IgnorableReturnValue`.

## Related

- [Functions](./functions.md)
- [Higher-order functions and lambdas](./lambdas.md)
