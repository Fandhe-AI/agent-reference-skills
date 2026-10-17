---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-expect-actual.html
---

# Expected and actual declarations

The Kotlin language mechanism for accessing platform-specific APIs from Kotlin Multiplatform modules while providing platform-agnostic APIs in common code.

## Signature / Usage

```kotlin
package identity

class Identity(val userName: String, val processID: Long)

expect fun buildIdentity(): Identity
```

```kotlin
package identity

import java.lang.System
import java.lang.ProcessHandle

actual fun buildIdentity() = Identity(
    System.getProperty("user.name") ?: "None",
    ProcessHandle.current().pid()
)
```

```kotlin
package identity

import kotlinx.cinterop.toKString
import platform.posix.getlogin
import platform.posix.getpid

actual fun buildIdentity() = Identity(
    getlogin()?.toKString() ?: "None",
    getpid().toLong()
)
```

Other forms shown in the source:

```kotlin
// Expected property
expect val identity: Identity

// Expected object
expect object IdentityBuilder {
    fun build(): Identity
}

// Expected class (Beta)
expect class Identity() {
    val userName: String
    val processID: Int
}

// Type alias to satisfy an actual declaration
actual typealias Month = java.time.Month
actual typealias MyDate = java.time.LocalDate

// Optional expectation for annotations
@OptIn(ExperimentalMultiplatform::class)
@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@OptionalExpectation
expect annotation class XmlSerializable()
```

Suppress the Beta warning for expected and actual classes:

```kotlin
kotlin {
    compilerOptions {
        // Common compiler options applied to all Kotlin source sets
        freeCompilerArgs.add("-Xexpect-actual-classes")
    }
}
```

## Options / Props

| Name | Where | Description |
|------|-------|-------------|
| `expect` | common source set | Marks the expected declaration; must not contain implementation |
| `actual` | platform source sets | Marks the actual declaration in the same package as the expected one |
| `-Xexpect-actual-classes` | `freeCompilerArgs` | Suppresses the Beta warning for expected and actual classes |
| `@OptionalExpectation` | expected annotation | An `actual` is needed only on platforms where the annotation is used; requires `@OptIn(ExperimentalMultiplatform::class)` |

## Notes

- Rules: declare a standard Kotlin construct (function, property, class, interface, enumeration, annotation) in common code with `expect`; declare the same construct in the same package in each platform source set with `actual`. The compiler checks that every expected declaration has an actual in every platform source set, that expected declarations have no implementation, and that each actual shares the package of its expected declaration.
- Actual declarations may live in an intermediate source set such as `iosMain` rather than in `iosArm64Main` / `iosSimulatorArm64Main`.
- The IDE flags missing declarations, expected declarations with implementations, mismatched signatures, and declarations in different packages, and can navigate from expected to actual.
- Expected and actual classes are in Beta: almost stable, but migration steps may be required in the future. Using classes where interfaces would suffice is not recommended; interfaces allow multiple implementations per platform and easier fakes in tests. As a general rule, rely on standard language constructs wherever possible.
- With a DI framework, expected and actual declarations are only needed in the framework configuration.
- Expected classes can be useful when inheriting from existing platform classes (for example `actual class CommonIdentity : Identity()` on the JVM), including `expect abstract class` for framework authors.
- Starting with Kotlin 1.9.0, using the POSIX `getlogin()` and `getpid()` functions requires the `@OptIn` annotation.
- Type aliases: define the `typealias` in the same package as the expected declaration. Since `LocalDate` uses the `Month` enum, both must be declared as expected classes in common code.
- Expanded visibility: an actual may be more visible than its expected declaration; the compiler currently errors, suppressible with `@Suppress("ACTUAL_WITHOUT_EXPECT")` on the actual type alias. The source says that starting with Kotlin 2.0 this limitation will not apply.
- Additional enum entries: an actual enum may add constants beyond the expected ones, but then a `when` over the expected enum requires an `else` clause.
- Distance line: this page documents the language mechanism as presented in the multiplatform docs; Kotlin language reference and stdlib belong to the kotlin skill.

## Related

- [platform-specific-apis.md](./platform-specific-apis.md)
- [hierarchy.md](./hierarchy.md)
- [advanced-project-structure.md](./advanced-project-structure.md)
