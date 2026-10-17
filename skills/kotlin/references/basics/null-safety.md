---
source: https://kotlinlang.org/docs/null-safety.html
---

# Null safety

Kotlin's type system distinguishes nullable and non-nullable types, catching null-related issues at compile time rather than runtime.

## Signature / Usage

```kotlin
var a: String = "abc"
a = null // error: Null can not be a value of a non-null type String

var b: String? = "abc"
b = null // OK
val l = b.length // error: only safe (?.) or non-null asserted (!!.) calls are allowed
```

### Check for null with if

The compiler smart casts `String?` to `String` after the check, provided the value can't change between check and usage.

```kotlin
val b: String? = null
val l = if (b != null) b.length else -1

if (b != null && b.length > 0) {
    print("String of length ${b.length}")
} else {
    print("Empty string")
}
```

### Safe call operator `?.`

Returns `null` instead of throwing an NPE; the type of `b?.length` is `Int?`. Works with `var` and `val`, in chains, and on the left side of an assignment (the assignment and right-hand side are skipped if a receiver is null).

```kotlin
println(a?.length)
bob?.department?.head?.name
person?.department?.head = managersPool.getManager()
```

### Elvis operator `?:`

The right-hand side is evaluated only if the left-hand side is `null`; `throw` and `return` are expressions and can be used on the right.

```kotlin
val l = b?.length ?: 0

fun foo(node: Node): String? {
    // Checks for getParent(). If not null, it's assigned to parent. If null, returns null
    val parent = node.getParent() ?: return null
    // Checks for getName(). If not null, it's assigned to name. If null, throws exception
    val name = node.getName() ?: throw IllegalArgumentException("name expected")
    // ...
}
```

### Not-null assertion operator `!!`

Converts any value to a non-nullable type; throws an NPE if the value is `null`.

```kotlin
val b: String? = "Kotlin"
val l = b!!.length
```

### Nullable receiver

Extension functions can be defined on a nullable receiver type. `toString()` on a `null` returns the string `"null"`; use `?.` to get `null` instead.

```kotlin
val person: Person? = null
println(person.toString())   // null
println(person?.toString())  // null (a real null)
```

### let function

```kotlin
val listWithNulls: List<String?> = listOf("Kotlin", null)
for (item in listWithNulls) {
    item?.let { println(it) }
}
```

### Safe casts `as?`

```kotlin
val a: Any = "Hello, Kotlin!"
val aInt: Int? = a as? Int        // null
val aString: String? = a as? String
```

### Collections of a nullable type

```kotlin
val nullableList: List<Int?> = listOf(1, 2, null, 4)
val intList: List<Int> = nullableList.filterNotNull()
// [1, 2, 4]
```

## Notes

- The only possible causes of an NPE in Kotlin: an explicit `throw NullPointerException()`; the `!!` operator; data inconsistency during initialization (a leaking `this` in a constructor, or a superclass constructor calling an open member whose derived implementation uses uninitialized state); Java interoperation (members of a platform type with `null`, nullability issues with generic types such as Java code adding `null` to a Kotlin `MutableList<String>`, other issues from external Java code).
- `UninitializedPropertyAccessException` is thrown when accessing a property that has not been initialized, typically with `lateinit` properties.
- Related: handling nullability in Java and Kotlin, and definitely non-nullable generic types.

## Related

- [Basic syntax overview](./basic-syntax.md)
- [Exception and error handling](./exceptions.md)
- [Equality](./equality.md)
