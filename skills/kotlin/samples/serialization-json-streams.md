---
source: https://kotlinlang.org/docs/serialization-json-io-sources.html
---

# Serialization: JSON with JVM Streams

Write and read JSON directly through JVM `OutputStream` / `InputStream` without intermediate strings.

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

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*
import java.io.FileInputStream

@Serializable
data class Project(val name: String, val stars: Int)

fun main() {
    // Opens an InputStream for the projects.json file containing a JSON array of Project objects
    FileInputStream("projects.json").use { input ->

        // Lazily deserializes each Project from the InputStream
        val projects = Json.decodeToSequence<Project>(input)

        // Processes elements one by one
        for (project in projects) {
            println(project)
        }
    }
}
```

## Notes

- Use `.use()` so the stream is closed automatically; invalid JSON throws `SerializationException`, I/O failures throw `IOException`.
- Sequences from `.decodeToSequence()` can be iterated only once and fail if the underlying stream is closed before they are fully evaluated.
- `kotlinx.io` (`encodeToSink` / `decodeFromSource`, dependency `kotlinx-serialization-json-io:1.11.0`) and Okio variants exist; the source marks kotlinx-io as Alpha and the examples need `@OptIn(ExperimentalSerializationApi::class)`.
