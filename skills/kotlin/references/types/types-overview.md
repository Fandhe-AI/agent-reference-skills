---
source: https://kotlinlang.org/docs/types-overview.html
---

# Types overview

In Kotlin, everything is an object in the sense that you can call member functions and properties on any variable. Some types, such as numbers, characters, and booleans, have an optimized internal representation as primitive values at runtime, but they appear and behave like regular classes in Kotlin code.

## Signature / Usage

```kotlin
val name: String = "Kotlin"   // non-nullable by default
val maybe: String? = null     // append ? to allow null
```

## Basic types

| Category | Basic types | Definition |
| --- | --- | --- |
| Integers ([numbers.md](./numbers.md)) | `Byte`, `Short`, `Int`, `Long` | Whole numbers |
| Unsigned integers ([unsigned-integer-types.md](./unsigned-integer-types.md)) | `UByte`, `UShort`, `UInt`, `ULong` | Non-negative whole numbers |
| Floating-point numbers ([numbers.md](./numbers.md)) | `Float`, `Double` | Numbers with a fractional part |
| Booleans ([booleans.md](./booleans.md)) | `Boolean` | Logical values: `true` and `false` |
| Characters ([characters.md](./characters.md)) | `Char` | A single character |
| Strings ([strings.md](./strings.md)) | `String` | A sequence of characters |
| Arrays ([arrays.md](./arrays.md)) | `Array<T>`, primitive-type arrays | A fixed-size sequence of values |

## Non-denotable types

Kotlin also has non-denotable types. They are the types that you can't write directly in the Kotlin code. Instead, the compiler uses them internally, for example, for interoperability with other languages. Kotlin creates non-denotable types to represent type information that is more precise than what Kotlin source syntax allows.

Even though you can't declare non-denotable types yourself, you may encounter them in compiler diagnostics, IDE tooltips, or inferred type displays:

- Platform types (see `../java-interop/java-interop.md`)
- Intersection types ([typecasts.md](./typecasts.md))
- Integer literal types ([numbers.md](./numbers.md))
- Captured types ([generics.md](./generics.md))

## Notes

- By default, every type is non-nullable. To allow `null` values, declare a variable with a `?` sign right after the variable type, for example `String?`.
- Other Kotlin types such as `Nothing` (a type that has no values), `Any` (the root of the Kotlin class hierarchy), and `Unit` (a type with only one value; the compiler infers it as the return type of functions with a block body and no explicit return type) are described in the Kotlin API reference, not on this page.

## Related

- [Type checks and casts](./typecasts.md)
- [Numbers](./numbers.md)
- [Generics](./generics.md)
