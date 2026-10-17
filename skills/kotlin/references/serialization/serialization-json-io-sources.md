---
source: https://kotlinlang.org/docs/serialization-json-io-sources.html
---

# Serialize JSON with I/O sources

Serialize and deserialize JSON directly to and from JVM streams, kotlinx-io, and Okio types without intermediate strings. These APIs use UTF-8, throw `SerializationException` for invalid JSON and `IOException` for I/O failures.

## Signature / Usage

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*
import java.io.FileOutputStream

@Serializable
data class Project(val name: String, val stars: Int)

fun main() {
    val project = Project("kotlinx.serialization", 9000)
    
    // Creates an OutputStream for the project.json file
    FileOutputStream("project.json").use { output ->
        
        // Serializes the project instance into the OutputStream
        Json.encodeToStream(project, output)
    }
}
```

## Functions

| Target | Encode | Decode | Lazy sequence |
| --- | --- | --- | --- |
| JVM `OutputStream` / `InputStream` | `encodeToStream()` | `decodeFromStream()` | `decodeToSequence()` |
| `kotlinx.io.Sink` / `Source` | `encodeToSink()` | `decodeFromSource()` | `decodeSourceToSequence()` |
| `okio.BufferedSink` / `BufferedSource` | `encodeToBufferedSink()` | `decodeFromBufferedSource()` | `decodeBufferedSourceToSequence()` |

Close resources with `.use()`.

```kotlin
FileInputStream("projects.json").use { input ->

    // Lazily deserializes each Project from the InputStream
    val projects = Json.decodeToSequence<Project>(input)

    // Processes elements one by one
    for (project in projects) {
        println(project)
    }
}
```

`kotlinx-io` Sink and Source (imports: `kotlinx.serialization.json.io.*`, `kotlinx.io.*`, `kotlinx.io.files.*`):

```kotlin
@OptIn(ExperimentalSerializationApi::class)
fun main() {
    val project = Project("kotlinx.serialization", 9000)

    // Creates a Sink for the project.json file
    val path = Path("project.json")
    SystemFileSystem.sink(path).buffered().use { sink: Sink ->

        // Serializes the Project instance directly into a Sink
        Json.encodeToSink(project, sink)
    }
}
```

## Dependencies

kotlinx-io:

```kotlin
// build.gradle(.kts)
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json-io:1.11.0")
    implementation("org.jetbrains.kotlinx:kotlinx-io-core:0.9.1")
}
```

Okio:

```kotlin
// build.gradle(.kts)
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json-okio:1.11.0")
    implementation("com.squareup.okio:okio:3.16.2")
}
```

Maven uses the same coordinates (`org.jetbrains.kotlinx:kotlinx-serialization-json-io:1.11.0` with `kotlinx-io-core:0.9.1`; `kotlinx-serialization-json-okio:1.11.0` with `com.squareup.okio:okio:3.16.2`).

## Notes

- These extension functions are Experimental; the kotlinx-io variants need `@OptIn(ExperimentalSerializationApi::class)`. kotlinx-io is currently in Alpha.
- A sequence returned by `decodeToSequence()` / `decodeSourceToSequence()` can be iterated only once because it is tied to the underlying stream or source, and may throw if the stream is closed before the sequence is fully evaluated.
- `decodeToSequence()` handles multiple JSON objects in a top-level array or as whitespace-separated objects.
- The `-json-io` / `-json-okio` artifacts are separate from `kotlinx-serialization-json`.

## Related

- [JSON serialization overview](./serialization-configure-json-serialization.md)
- [Customize the Json instance](./serialization-json-configuration.md)
- [JSON elements](./serialization-json-elements.md)
