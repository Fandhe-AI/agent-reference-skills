---
source: https://kotlinlang.org/docs/annotations.html
---

# Annotations

Annotations attach metadata to elements in code; tools and frameworks process it at compile time and runtime. Annotation classes are declared with the `annotation` keyword.

## Signature / Usage

```kotlin
@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION,
        AnnotationTarget.TYPE_PARAMETER, AnnotationTarget.VALUE_PARAMETER,
        AnnotationTarget.EXPRESSION)
@Retention(AnnotationRetention.SOURCE)
@MustBeDocumented
annotation class Fancy

@Fancy class Foo {
    @Fancy fun baz(@Fancy foo: Int): Int {
        return (@Fancy 1)
    }
}
```

Annotate a primary constructor with an explicit `constructor` keyword, and property accessors directly:

```kotlin
class Foo @Inject constructor(dependency: MyDependency) { ... }

class Foo {
    var x: MyDependency? = null
        @Inject set
}
```

### Constructors

```kotlin
annotation class Special(val why: String)

@Special("example") class Foo {}
```

Allowed parameter types: types corresponding to Java primitive types, strings, classes (`Foo::class`), enums, other annotations, and arrays of these. Annotation parameters cannot have nullable types. If an annotation is used as a parameter of another annotation, its name is not prefixed with `@`.

```kotlin
annotation class ReplaceWith(val expression: String)

annotation class Deprecated(
        val message: String,
        val replaceWith: ReplaceWith = ReplaceWith(""))

@Deprecated("This function is deprecated, use === instead", ReplaceWith("this === other"))
```

To pass a class, use `KClass`; the compiler converts it to a Java class:

```kotlin
import kotlin.reflect.KClass

annotation class Ann(val arg1: KClass<*>, val arg2: KClass<out Any>)

@Ann(String::class, Int::class) class MyClass
```

### Instantiation

An annotation class constructor can be called in arbitrary code:

```kotlin
annotation class InfoMarker(val info: String)

fun processInfo(marker: InfoMarker): Unit = TODO()

processInfo(InfoMarker("default"))
```

### Lambdas

Annotations on lambdas are applied to the `invoke()` method into which the body is generated:

```kotlin
annotation class Suspendable

val f = @Suspendable { Fiber.sleep(10) }
```

### Annotation use-site targets

```kotlin
class Example(@field:Ann val foo,    // annotate only the Java field
              @get:Ann val bar,      // annotate only the Java getter
              @param:Ann val quux)   // annotate only the Java constructor parameter
```

File annotations go before the package directive:

```kotlin
@file:JvmName("Foo")

package org.jetbrains.demo
```

Multiple annotations with the same target can share brackets (except for the `all` meta-target):

```kotlin
class Example {
     @set:[Inject VisibleForTesting]
     var collaborator: Collaborator
}
```

Receiver of an extension function:

```kotlin
fun @receiver:Fancy String.myExtension() { ... }
```

### Defaults when no use-site target is specified

If there are multiple applicable targets, the compiler chooses one or more of them according to `@Target`, in this order: constructor parameter (`param`), property (`property`), field (`field`). If none applies, the annotation is invalid and a use-site target must be given.

```kotlin
data class User(val username: String,
                // @Email is now equivalent to @param:Email @field:Email
                @Email val email: String) {
    // @Email is still equivalent to @field:Email
    @Email val secondaryEmail: String? = null
}
```

`email` is declared in the primary constructor and has a backing field, so `@Email` applies to both `param` and `field`. `secondaryEmail` is not a constructor parameter, so `@Email` applies to `field` only.

### `all` meta-target

`all` propagates the annotation, if applicable, to: the constructor parameter (`param`, if the property is in the primary constructor), the property, the backing field (if any), the getter, the setter parameter (`setparam`, if `var`), and the Java-only target `RECORD_COMPONENT` if the class has `@JvmRecord`.

```kotlin
data class User(
    val username: String,
    // Applies @Email to param, field, and get
    @all:Email val email: String,
    // Applies @Email to param, field, get, and setparam
    @all:Email var name: String,
) {
    // Applies @Email to field and getter (not param since it's not in the constructor)
    @all:Email val secondaryEmail: String? = null
}
```

### Java annotations

Java annotations are 100% compatible with Kotlin. Because the parameter order of a Java annotation is not defined, use named arguments; the `value` parameter can be unnamed, and a Java array `value` becomes a `vararg`.

```kotlin
@Ann(intValue = 1, stringValue = "abc") class C

@AnnWithValue("abc") class C

@AnnWithArrayValue("abc", "foo", "bar") class C

@AnnWithArrayMethod(names = ["abc", "foo", "bar"])
class C
```

Annotation values are exposed as properties:

```kotlin
fun foo(ann: Ann) {
    val i = ann.value
}
```

### Repeatable annotations

```kotlin
@Repeatable
annotation class Tag(val name: String)

// The compiler generates the @Tag.Container containing annotation
```

Custom container name with `@kotlin.jvm.JvmRepeatable`:

```kotlin
@JvmRepeatable(Tags::class)
annotation class Tag(val name: String)

annotation class Tags(val value: Array<Tag>)
```

## Options / Props

| Meta-annotation | Description |
|-----------------|-------------|
| `@Target` | possible kinds of elements which can be annotated (classes, functions, properties, expressions) |
| `@Retention` | whether the annotation is stored in compiled class files and visible through reflection at runtime (by default, both are true) |
| `@Repeatable` | allows using the same annotation on a single element multiple times |
| `@MustBeDocumented` | the annotation is part of the public API and should be included in generated API documentation |

Supported use-site targets: `file`, `field`, `property` (not visible to Java), `get`, `set`, `all`, `receiver`, `param`, `setparam`, `delegate`.

## Notes

- `all` limitations: it does not propagate an annotation to types, potential extension receivers, or context receivers or parameters; it cannot be used with multiple annotations (`@all:[A B]` is forbidden, use `@all:A @all:B`); it cannot be used with delegated properties.
- If a Kotlin annotation has `TYPE` among its Kotlin targets, it maps to `ElementType.TYPE_USE` (and `TYPE_PARAMETER` to `ElementType.TYPE_PARAMETER`), which is an issue for Android clients with API levels below 26. Use the compiler argument `-Xno-new-java-annotation-targets` to avoid generating these targets.
- To extract repeatable annotations via reflection, use `KAnnotatedElement.findAnnotations()`.
- To develop your own annotation processors, the source page points to the Kotlin Symbol Processing (KSP) API. Annotation processing configuration for Android apps is covered by android-build-gradle, not here.

## Related

- [Keywords and operators](./keyword-reference.md)
- [Coding conventions](./coding-conventions.md)
