---
source: https://kotlinlang.org/docs/uuids.html
---

# UUIDs

The `kotlin.uuid.Uuid` class represents a 128-bit Universally Unique Identifier (UUID / GUID), useful for identifying entities without a central ID-assigning system.

## Signature / Usage

```kotlin
import kotlin.uuid.Uuid

fun main() {
    val id = Uuid.random()
    println(id)
}
```

### API

| Task | API |
| --- | --- |
| Random version 4 | `Uuid.random()` |
| Version-specific (Experimental) | `Uuid.generateV4()`, `Uuid.generateV7()` (timestamp, sortable), `Uuid.generateV7NonMonotonicAt(instant)` |
| Parse (throws `IllegalArgumentException` if invalid) | `Uuid.parse()` (hex-and-dash or hex without dashes), `Uuid.parseHexDash()`, `Uuid.parseHex()` |
| Parse safely (returns `null`) | `Uuid.parseOrNull()`, `Uuid.parseHexDashOrNull()`, `Uuid.parseHexOrNull()` |
| To string | `toString()`, `toHexDashString()`, `toHexString()` |
| Binary | `toByteArray()` / `Uuid.fromByteArray()`; `Uuid.fromLongs(mostSignificantBits, leastSignificantBits)` / `toLongs { msb, lsb -> }` |
| JVM interop | `.toKotlinUuid()`, `.toJavaUuid()`, `ByteBuffer.getUuid()` / `.putUuid()` |

```kotlin
import kotlin.time.Instant
import kotlin.uuid.Uuid

@OptIn(kotlin.uuid.ExperimentalUuidApi::class)
fun main() {
    // Generates a version 4 UUID
    val idVersion4 = Uuid.generateV4()
    println(idVersion4)

    // Generates a version 7 UUID
    val idVersion7 = Uuid.generateV7()
    println(idVersion7)

    // Generates a version 7 UUID for the specified timestamp
    val timestamp = Instant.fromEpochMilliseconds(1757440583000L)
    val idVersion7SpecificTime = Uuid.generateV7NonMonotonicAt(timestamp)
    println(idVersion7SpecificTime)
}
```

```kotlin
import kotlin.uuid.Uuid

fun main() {
    val standard = Uuid.parseHexDash("de2bc56c-ea73-4f3c-8a37-5a46fdb2d79a")
    val compact = Uuid.parseHex("de2bc56cea734f3c8a375a46fdb2d79a")

    println(standard)
    println(compact)
}
```

Serialization with kotlinx.serialization uses the hex-and-dash format:

```kotlin
import kotlin.uuid.Uuid
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class User(
    val id: Uuid,
    val name: String
)

fun main() {
    val user = User(
        id = Uuid.parse("de2bc56cea734f3c8a375a46fdb2d79a"),
        name = "Kotlin"
    )

    println(Json.encodeToString(user))
    // {"id":"de2bc56c-ea73-4f3c-8a37-5a46fdb2d79a","name":"Kotlin"}
}
```

## Notes

- `generateV4()`, `generateV7()` and `generateV7NonMonotonicAt()` are Experimental (see "Stability levels explained" in components-stability): opt in with `@OptIn(ExperimentalUuidApi::class)` or the compiler option `-opt-in=kotlin.uuid.ExperimentalUuidApi` (Gradle: `kotlin { compilerOptions { freeCompilerArgs.add("-opt-in=kotlin.uuid.ExperimentalUuidApi") } }`).
- `kotlin.time.Instant` is stable since Kotlin 2.3.0, so the `ExperimentalTime` opt-in shown in the official sample is no longer required.
- `==` compares the 128-bit value, not the textual form, so the hex-and-dash and compact forms of the same UUID are equal.
- `Uuid` implements `Comparable<Uuid>` (lexicographic from most to least significant bit).
- `java.util.UUID` and `kotlin.uuid.Uuid` are distinct types and must be converted explicitly; their ordering may differ, so check ordering-dependent code before migrating.

## Related

- [Opt-in requirements](./opt-in-requirements.md)
- [Time measurement](./time-measurement.md)
