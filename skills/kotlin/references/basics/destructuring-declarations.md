---
source: https://kotlinlang.org/docs/destructuring-declarations.html
---

# Destructuring declarations

A destructuring declaration creates multiple variables at once from an object, based on the `componentN()` convention.

## Signature / Usage

```kotlin
val (name, age) = person

// compiled down to:
val name = person.component1()
val age = person.component2()

for ((a, b) in collection) { ... }
```

`componentN()` functions must be marked `operator`. Data classes declare them automatically.

### Returning two values from a function

```kotlin
data class Result(val result: Int, val status: Status)
fun function(...): Result {
    // computations

    return Result(result, status)
}

// Now, to use this function:
val (result, status) = function(...)
```

### Maps

```kotlin
for ((key, value) in map) {
   // do something with the key and the value
}
```

The standard library provides:

```kotlin
operator fun <K, V> Map<K, V>.iterator(): Iterator<Map.Entry<K, V>> = entries.iterator()
operator fun <K, V> Map.Entry<K, V>.component1() = key
operator fun <K, V> Map.Entry<K, V>.component2() = value
```

### Underscore for unused variables

```kotlin
val (_, status) = getResult()
```

`componentN()` is not called for skipped components.

### Destructuring in lambdas

```kotlin
map.mapValues { entry -> "${entry.value}!" }
map.mapValues { (key, value) -> "$value!" }

{ a -> ... } // one parameter
{ a, b -> ... } // two parameters
{ (a, b) -> ... } // a destructured pair
{ (a, b), c -> ... } // a destructured pair and another parameter

map.mapValues { (_, value) -> "$value!" }

map.mapValues { (_, value): Map.Entry<Int, String> -> "$value!" }
map.mapValues { (_, value: String) -> "$value!" }
```

### Name-based destructuring (Experimental)

Variables match properties by name instead of the position of `componentN()` functions.

```kotlin
data class User(val username: String, val email: String)

val user = User("alice", "alice@example.com")

// Position-based: email receives username's value
val (email, username) = user

// Name-based, explicit form
(val mail = email, val name = username) = user

// Position-based destructuring with square brackets (when the feature is enabled)
val point = Pair(10, 20)
val [x, y] = point
```

## Options / Props

Compiler option `-Xname-based-destructuring`:

| Mode | Description |
|------|-------------|
| `only-syntax` | enables the explicit form of name-based destructuring without changing existing destructuring declarations |
| `name-mismatch` | reports warnings when position-based destructuring in data classes uses variable names that don't match the property names |
| `complete` | enables short-form name-based destructuring with parentheses and keeps position-based destructuring with square brackets |

Gradle:

```kotlin
kotlin {
    compilerOptions {
        freeCompilerArgs.add("-Xname-based-destructuring=only-syntax")
    }
}
```

Maven:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-plugin</artifactId>
            <configuration>
                <args>
                    <arg>-Xname-based-destructuring=only-syntax</arg>
                </args>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## Notes

- Name-based destructuring is Experimental (see components stability levels). Review and resolve warnings reported in `name-mismatch` mode before enabling `complete`; they show which declarations the compiler interprets differently.
- The official page (kotlin-web-site 0b10373) writes the `Map` operators with `entrySet()` / `getKey()` / `getValue()`; kotlinc 2.4.21 rejects them (unresolved reference), so this page uses the Kotlin `entries` / `key` / `value` properties.
- You could also return a `Pair<Int, Status>`, but a named data class is often better.

## Related

- [Idioms](./idioms.md)
- [Keywords and operators](./keyword-reference.md)
