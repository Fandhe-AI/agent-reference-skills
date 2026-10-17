---
source: https://kotlinlang.org/docs/java-to-kotlin-nullability-guide.html
---

# Nullability in Java and Kotlin

Differences between Java's and Kotlin's approaches to possibly nullable variables, with migration-oriented examples.

## Signature / Usage

```kotlin
// Alternative 1: non-nullable parameter
fun stringLengthNonNull(a: String) = a.length  // non-nullable: null is a compile-time error
// Alternative 2: nullable parameter
fun stringLengthOrZero(a: String?): Int = a?.length ?: 0  // nullable with safe call + Elvis
```

### Support for nullable types

Kotlin explicitly supports nullable types (`String?`); regular types are non-nullable by default. Calls on possibly-null values are prohibited at compile time. At runtime nullable and non-nullable objects are treated the same (a nullable type isn't a wrapper); intrinsic checks are generated with minimal overhead.

Java without null checks throws `NullPointerException`:

```java
// Java
int stringLength(String a) {
    return a.length();
}

void main() {
    stringLength(null); // Throws a `NullPointerException`
}
```

Passing `null` to `stringLength(a: String)` gives the compile-time error "Null can not be a value of a non-null type String". For a nullable parameter:

```kotlin
fun stringLength(a: String?): Int = if (a != null) a.length else 0
```

After the check the compiler treats `a` as non-nullable in that scope. Without it: "Only safe (?.) or non-nullable asserted (!!.) calls are allowed on a nullable receiver of type String?". Shorter form:

```kotlin
fun stringLength(a: String?): Int = a?.length ?: 0
```

### Platform types

Java nullability annotations (JetBrains `org.jetbrains.annotations`, JSpecify `org.jspecify.annotations`, Eclipse `org.eclipse.jdt.annotation`) are recognized by Kotlin. Without them Java types are platform types: all operations are allowed, you get `NullPointerException` on null just as in Java, and the compiler doesn't highlight redundant null checks.

### Definitely non-nullable types

To override a Java method with `@NotNull` argument you need definitely non-nullable types (`T1 & Any`):

```java
import org.jetbrains.annotations.*;

public interface Game<T> {
  public T save(T x);
  @NotNull
  public T load(@NotNull T x);
}
```

```kotlin
interface ArcadeGame<T1> : Game<T1> {
  override fun save(x: T1): T1
  // T1 is definitely non-nullable
  override fun load(x: T1 & Any): T1 & Any
}
```

### Checking the result of a function call

```kotlin
data class Order(val customer: Customer)

data class Customer(val name: String)

val order = findOrder()

// Direct conversion
if (order != null){
    processCustomer(order.customer)
}

// Idiomatic: safe call + scope function
order?.let {
    processCustomer(it.customer)
}

// Shorter
findOrder()?.customer?.let(::processCustomer)
```

### Default values instead of null

```kotlin
val order = findOrder() ?: Order(Customer("Antonio"))
```

### Functions returning a value or null

Kotlin stdlib names indicate nullable results (especially in the collections API):

```kotlin
val numbers = listOf(1, 2)

println(numbers[0])  // Can throw IndexOutOfBoundsException if the collection is empty
//numbers.get(5)     // Exception!

// More abilities:
println(numbers.firstOrNull())
println(numbers.getOrNull(5)) // null
```

### Aggregate operations

Java: `numbers.stream().max(Comparator.naturalOrder()).orElse(null)`. Kotlin:

```kotlin
val numbers = listOf<Int>()
println("Max: ${numbers.maxOrNull()}")
```

### Casting types safely

Use the safe cast operator `as?`, which returns `null` on failure:

```kotlin
fun main() {
    println(getStringLength(1)) // Prints `-1`
}

fun getStringLength(y: Any): Int {
    val x: String? = y as? String // null
    return x?.length ?: -1 // Returns -1 because `x` is null
}
```

When migrating `return (String) profile.data;` you may first use `as String?` to preserve semantics, but `as?` is recommended (returns `null` instead of throwing `ClassCastException`):

```kotlin
class UserProfile(var data: Any? = null)

fun getUsername(profile: UserProfile?): String? =
  profile?.data as? String
```

## Notes

- The official docs show `Game<T>` methods with `{}` bodies, which is invalid Java for non-default interface methods; they are written here as abstract declarations.
- In the Java `getStringLength()` example the result is primitive `int`; making it return `null` needs boxed `Integer`, but returning a negative value and checking it avoids boxing.

## Related

- [Null safety](../basics/null-safety.md)
- [Calling Java from Kotlin](./java-interop.md) (platform types, nullability annotations)
- [Strings in Java and Kotlin](./java-to-kotlin-idioms-strings.md)
- [Collections in Java and Kotlin](./java-to-kotlin-collections-guide.md)
