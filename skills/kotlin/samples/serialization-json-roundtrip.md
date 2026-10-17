---
source: https://kotlinlang.org/docs/serialization-get-started.html
---

# Serialization: JSON Round Trip

Add the serialization plugin and JSON library, then encode an object to JSON and decode it back.

```kotlin
// build.gradle.kts
plugins {
    kotlin("plugin.serialization") version "2.4.21"
}

dependencies { 
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.11.0")
}
```

```kotlin
// Imports declarations from the serialization and JSON handling libraries
import kotlinx.serialization.*
import kotlinx.serialization.json.*

// Marks the Book class as serializable
@Serializable
data class Book(val yearPublished: Int, val title: String)

fun main() {
    // Serializes an instance of the Book class into a JSON string
    val json = Json.encodeToString(Book(1937, "The Hobbit"))
    println(json)
    // {"yearPublished":1937,"title":"The Hobbit"}

    // Deserializes a JSON string into an instance of the Book class
    val obj = Json.decodeFromString<Book>("""{"yearPublished":1937, "title": "The Hobbit"}""")
    println(obj)
    // Book(yearPublished=1937, title=The Hobbit)
}
```

## Notes

- `@Serializable` makes the compiler plugin generate serializers; all properties with backing fields are serialized by default.
- A collection can be encoded in one call: `Json.encodeToString(listOf(Book(1937, "The Hobbit"), Book(1867, "War and Peace")))`.
- This is the Kotlin library `kotlinx.serialization`, not JS schema validation such as zod; Retrofit converter setup belongs to android-data.
