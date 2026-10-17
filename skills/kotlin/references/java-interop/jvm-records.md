---
source: https://kotlinlang.org/docs/jvm-records.html
---

# Using Java records in Kotlin

Use Java records from Kotlin like classes with properties, and declare JVM records in Kotlin with `@JvmRecord` on data classes.

## Signature / Usage

```java
// Java
public record Person (String name, int age) {}
```

The compiler generates a final class inheriting `java.lang.Record` with: a private final field per component, a public constructor for all fields, `equals()` / `hashCode()` / `toString()`, and a public reader method per component. Records are very similar to Kotlin data classes.

Using a Java record from Kotlin:

```kotlin
val newPerson = Person("Kotlin", 10)
val firstName = newPerson.name
```

Declaring a record in Kotlin (data classes only):

```kotlin
@JvmRecord
data class Person(val name: String, val age: Int)
```

The annotation enables generating the record components in the class file and property accessors named per the Java record convention. The data class provides `equals()`, `hashCode()`, `toString()`.

### Requirements

- The module must target JVM 16 bytecode (or 15 if `-Xjvm-enable-preview` is enabled).
- The class cannot explicitly inherit any other class (including `Any`), since JVM records implicitly inherit `java.lang.Record`; it can implement interfaces.
- No properties with backing fields except those initialized from the corresponding primary constructor parameters.
- No mutable properties with backing fields.
- The class cannot be local.
- The primary constructor must be as visible as the class itself.

### Enable JVM records

Requires JVM bytecode target `16` or higher; set the `jvmTarget` compiler option in Gradle (`gradle-compiler-options`, attributes specific to JVM) or Maven (`maven-kotlin-compiler`).

### Annotate record components

In Java, annotations on a record component propagate to the backing field, getter, setter, and constructor parameter. Replicate with the `all` use-site target:

```kotlin
@JvmRecord
data class Person(val name: String, @all:Positive val age: Int)
```

With `@JvmRecord` and `@all:`, Kotlin propagates the annotation to the property, backing field, constructor parameter, getter, and setter, and applies it to the record component if the annotation supports Java's `RECORD_COMPONENT`.

To make an annotation available for both Kotlin properties and Java record components, add both `@Target` (Kotlin) and `@java.lang.annotation.Target` (Java):

```kotlin
@Target(AnnotationTarget.CLASS, AnnotationTarget.PROPERTY)
@java.lang.annotation.Target(ElementType.CLASS, ElementType.RECORD_COMPONENT)
annotation class ExampleClass
```

## Notes

- Applying `@JvmRecord` to an existing class is not a binary compatible change: it alters the naming convention of the class property accessors.
- Technical details: language proposal KEEP `jvm-records`.

## Related

- [Data classes](../classes-objects/data-classes.md)
- [Annotations](../basics/annotations.md)
- [Gradle compiler options](../build-tools/gradle-compiler-options.md)
- [Maven Kotlin compiler](../build-tools/maven-kotlin-compiler.md)
- [Calling Kotlin from Java](./java-to-kotlin-interop.md)
