---
source: https://kotlinlang.org/docs/serialization-get-started.html
---

# Get started with Kotlin serialization

Add the serialization compiler plugin and the JSON library, mark a class `@Serializable`, and encode/decode it with `Json`.

## Signature / Usage

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
}
```

Deserialize with `Json.decodeFromString<Book>("""{"yearPublished":1937, "title": "The Hobbit"}""")`. A collection can be serialized in a single call: `Json.encodeToString(listOf(Book(1937, "The Hobbit"), Book(1867, "War and Peace")))`.

## Add plugins and dependencies

Gradle (Kotlin DSL):

```kotlin
// build.gradle.kts
plugins {
    kotlin("plugin.serialization") version "2.4.21"
}

dependencies { 
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.11.0")
}
```

Gradle (Groovy):

```groovy
// build.gradle
plugins {
    id 'org.jetbrains.kotlin.plugin.serialization' version '2.4.21'  
}

dependencies {
    implementation 'org.jetbrains.kotlinx:kotlinx-serialization-json:1.11.0'
}
```

Maven:

```xml
<!-- pom.xml -->
<properties>
    <kotlin.version>2.4.21</kotlin.version>
    <serialization.version>1.11.0</serialization.version>
</properties>

<build>
    <plugins>
        <plugin>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-plugin</artifactId>
            <version>${kotlin.version}</version>
            <executions>
                <execution>
                    <id>compile</id>
                    <phase>compile</phase>
                    <goals>
                        <goal>compile</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <compilerPlugins>
                    <plugin>kotlinx-serialization</plugin>
                </compilerPlugins>
            </configuration>
            <dependencies>
                <dependency>
                    <groupId>org.jetbrains.kotlin</groupId>
                    <artifactId>kotlin-maven-serialization</artifactId>
                    <version>${kotlin.version}</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>

<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlinx</groupId>
        <artifactId>kotlinx-serialization-json</artifactId>
        <version>${serialization.version}</version>
    </dependency>
</dependencies>
```

Multiplatform projects: add the JSON library to the common source set (it includes the core library automatically):

```kotlin
commonMain {
    dependencies {
        implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.11.0")
    }
}
```

## Configure R8 for Android projects

Kotlin serialization includes default ProGuard rules, so serializers for serializable classes are kept after shrinking. These rules do not apply to classes with named companion objects. Add rules to `proguard-rules.pro` based on the R8 mode.

R8 compatibility mode:

```bash
# Serializer for classes with named companion objects are retrieved using getDeclaredClasses
# If you have any such classes, replace the examples below with your own
-keepattributes InnerClasses # Required for getDeclaredClasses

-if @kotlinx.serialization.Serializable class
com.example.myapplication.HasNamedCompanion, # <-- List serializable classes with named companions
com.example.myapplication.HasNamedCompanion2
{
    static **$* *;
}
-keepnames class <1>$$serializer { # Using -keepnames is enough for the serializer() call to reference the class correctly
    static <1>$$serializer INSTANCE;
}
```

R8 full mode uses the same rules plus:

```bash
# Keep both serializer and serializable classes to save the attribute InnerClasses
-keepclasseswithmembers, allowshrinking, allowobfuscation, allowaccessmodification class
com.example.myapplication.HasNamedCompanion, # <-- List serializable classes with named companions
com.example.myapplication.HasNamedCompanion2
{
    *;
}
```

## Notes

- Bazel is not officially supported by the Kotlin team; for the compiler plugin, follow the example in the `rules_kotlin` repository (maintained independently).
- Serializable classes that are never serialized at runtime can be excluded with custom ProGuard rules using narrower class specifications.
- Kotlin serialization (kotlinx.serialization) is unrelated to JS schema validation such as zod. For Retrofit converters on Android, see android-data.

## Related

- [Serialization](./serialization.md)
- [Serialize built-in types](./serialization-serialize-builtin-types.md)
- [Serialize classes](./serialization-customization-options.md)
- [JSON serialization overview](./serialization-configure-json-serialization.md)
