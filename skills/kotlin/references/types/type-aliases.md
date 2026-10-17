---
source: https://kotlinlang.org/docs/type-aliases.html
---

# Type aliases

Type aliases provide alternative names for existing types. They can make long or frequently used type expressions shorter and easier to understand.

## Signature / Usage

```kotlin
// Generic types
typealias UserIndex = Map<Long, User>
typealias FileTable<K> = MutableMap<K, MutableList<File>>

// Function types
typealias RequestHandler = (Request) -> Response
typealias Predicate<T> = (T) -> Boolean

// Inner and nested classes
class Database {
    inner class Transaction
}
typealias DatabaseTransaction = Database.Transaction
```

A type alias doesn't create a new type. The alias and its underlying type are interchangeable; the compiler expands `Predicate<Int>` to `(Int) -> Boolean`:

```kotlin
typealias Predicate<T> = (T) -> Boolean

fun evaluate(predicate: Predicate<Int>) = predicate(42)

fun main() {
    val isPositive: (Int) -> Boolean = { it > 0 }
    println(evaluate(isPositive))
    // true

    val isValid: Predicate<Int> = { it > 0 }
    println(listOf(1, -2).filter(isValid))
    // [1]
}
```

## Declare type aliases

You can declare a type alias at the top level of a file, or inside a class, interface, or object (nested type alias). You can't declare a type alias in a local scope, such as inside a function or lambda expression.

The declaration location determines the scope; its visibility determines which code can access it. By default, a type alias is `public`. A nested type alias is accessible only where its containing declaration is accessible. A type alias can't expose an underlying type with more restrictive visibility than its own (a `public` alias can't refer to a `private` class).

### Top-level type aliases

Within the same package, refer to an alias by its unqualified name. From another package, import the alias or use its qualified name:

```kotlin
// UserId.kt
package org.example.users

typealias UserId = Long

// UserService.kt
package org.example.services

import org.example.users.UserId

fun findUser(id: UserId) {
    // ...
}

// Uses the fully qualified name
fun deleteUser(id: org.example.users.UserId) {
    // ...
}
```

### Nested type aliases

Nested type aliases follow the same scope and name-resolution rules as nested classes. Inside the containing declaration use the unqualified name; outside, qualify the alias with the name of its containing declaration:

```kotlin
class UserRepository {
    typealias UserIndex = Map<UserId, User>

    fun saveAll(users: UserIndex) {
        // ...
    }
}

// Refers to the alias by its qualified name outside UserRepository
fun synchronizeUsers(users: UserRepository.UserIndex) {
    // ...
}
```

To use type parameters in a nested type alias, add them to the alias declaration. A nested alias can't refer to a type parameter declared by its containing class:

```kotlin
class Graph<Node> {
    typealias Path<T> = List<T>
}

val cityPath: Graph.Path<String> = listOf("London", "Berlin")

class Graph2<Node> {
    typealias Path = List<Node>
    // Unresolved reference 'Node'.
}
```

## Notes

- Nested type aliases aren't supported in Kotlin Multiplatform expect/actual declarations.

## Related

- [Generics](./generics.md)
- [Types overview](./types-overview.md)
