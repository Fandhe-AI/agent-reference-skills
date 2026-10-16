---
source: https://kotlinlang.org/docs/packages.html
---

# Packages and imports

Code is organized using packages and imports: a package is a container for one or more Kotlin files, linked by a `package` header; an import makes entities from other packages available in the current file.

## Signature / Usage

```kotlin
package org.example

fun printMessage() { /*...*/ }
class Message(val text: String) { /*...*/ }
```

All contents of the source file belong to this package. Fully qualified names are `org.example.printMessage` and `org.example.Message`. If a file has no package header, its contents belong to the root package.

### Import a single entity

```kotlin
// Message is accessible without qualification
import org.example.Message

fun main() {
    val message = Message("Hello")
    println(message.text)
}
```

### Import the contents of a scope (star import)

```kotlin
// Everything in org.example is accessible
import org.example.*

fun main() {
    printMessage()
    val message = Message("Hi")
}
```

If you import an entity with both a star import and an explicit import, the explicit import takes priority during overload resolution.

### Resolve name clashes with aliases

```kotlin
// Message refers to org.example.Message
import org.example.Message

// TestMessage refers to org.test.Message
import org.test.Message as TestMessage
```

### What you can import

```kotlin
import org.example.printMessage           // Top-level function
import org.example.VERSION                // Top-level property
import org.example.Config.DEFAULT_TIMEOUT // Property from an object
import org.example.Config.loadSettings    // Function from an object
import org.example.MyClass.create         // Refers to MyClass.Companion.create
import org.example.Color.RED              // Enum constant
import org.example.Outer.Nested           // Nested class
```

## Options / Props

### Default imports

| Package | Platform |
|---------|----------|
| `kotlin.*` | all |
| `kotlin.annotation.*` | all |
| `kotlin.collections.*` | all |
| `kotlin.comparisons.*` | all |
| `kotlin.io.*` | all |
| `kotlin.ranges.*` | all |
| `kotlin.sequences.*` | all |
| `kotlin.text.*` | all |
| `kotlin.math.*` | all |
| `java.lang.*`, `kotlin.jvm.*` | JVM |
| `kotlin.js.*` | JS |

### Visibility and imports

| Visibility | Importable |
|------------|------------|
| `public` | anywhere |
| `internal` | only within the same module |
| `protected` | cannot be imported |
| top-level `private` | only accessible within its declaring file |
| other `private` | cannot be imported |

## Related

- [Visibility modifiers](./visibility-modifiers.md)
- [Basic syntax overview](./basic-syntax.md)
- [Keywords and operators](./keyword-reference.md)
