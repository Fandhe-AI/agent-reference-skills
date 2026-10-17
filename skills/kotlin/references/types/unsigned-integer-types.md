---
source: https://kotlinlang.org/docs/unsigned-integer-types.html
---

# Unsigned integer types

In addition to integer types, Kotlin provides `UByte`, `UShort`, `UInt`, and `ULong` for unsigned integer numbers. Unsigned types support most of the operations of their signed counterparts.

## Signature / Usage

```kotlin
val b: UByte = 1u // UByte, expected type provided
val s: UShort = 1u // UShort, expected type provided
val l: ULong = 1u // ULong, expected type provided
val a1 = 42u // UInt: no expected type provided, constant fits in UInt
val a2 = 0xFFFF_FFFF_FFFFu // ULong: no expected type provided, constant doesn't fit in UInt
val a = 1UL // ULong, even though no expected type provided and the constant fits into UInt
```

### Types

| Type | Size (bits) | Min value | Max value |
| --- | --- | --- | --- |
| `UByte` | 8 | 0 | 255 |
| `UShort` | 16 | 0 | 65,535 |
| `UInt` | 32 | 0 | 4,294,967,295 (2^32 - 1) |
| `ULong` | 64 | 0 | 18,446,744,073,709,551,615 (2^64 - 1) |

### Unsigned arrays and ranges

Each unsigned type has a corresponding array type: `UByteArray`, `UShortArray`, `UIntArray`, `ULongArray`. They provide a similar API to the `Array` class without boxing overhead.

Using unsigned arrays produces a warning that the feature is not stable yet. To remove the warning, opt in with the `@ExperimentalUnsignedTypes` annotation. It's up to you to decide whether your clients have to explicitly opt in, but an API that uses unsigned arrays can be broken by changes in the language.

Ranges and progressions are supported for `UInt` and `ULong` by classes `UIntRange`, `UIntProgression`, `ULongRange`, and `ULongProgression`. Together with the unsigned integer types, these classes are stable.

### Literals

- `u` and `U` signify unsigned literals without specifying the exact type. If no expected type is provided, the compiler uses `UInt` or `ULong` depending on the size of the literal.
- `uL` and `UL` explicitly specify that the literal should be an unsigned long.

### Use cases

Utilize the full bit range of an integer to represent positive values, for example a 32-bit `AARRGGBB` color constant, or initialize byte arrays without explicit `toByte()` casts:

```kotlin
data class Color(val representation: UInt)

val yellow = Color(0xFFCC00CCu)

val byteOrderMarkUtf8 = ubyteArrayOf(0xEFu, 0xBBu, 0xBFu)
```

Another use case is interoperability with native APIs: native declarations that contain unsigned types in the signature are represented without substituting signed integers.

## Notes

- Unsigned numbers are implemented as inline classes with a single storage property that contains the corresponding signed counterpart type of the same width. When converting between unsigned and signed integer types, update function calls and operations so they support the new type.
- Stability: Unsigned integer types (UByte/UShort/UInt/ULong) and their ranges/progressions are stable (since Kotlin 1.5.0); only unsigned arrays and operations on them are Beta and need `@ExperimentalUnsignedTypes`.
- The numbers page still calls unsigned integer types a Beta feature; this is outdated and contradicts this page.
- Non-goal: unsigned integers are not meant for domains that merely require non-negative integers, such as collection size or index. Signed integers help detect accidental overflows and signal error conditions (for example `List.lastIndex` being -1 for an empty list), and the unsigned range is not a subset of the signed range; neither is a subtype of the other.

## Related

- [Numbers](./numbers.md)
- [Arrays](./arrays.md)
