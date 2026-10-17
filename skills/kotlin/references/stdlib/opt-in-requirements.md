---
source: https://kotlinlang.org/docs/opt-in-requirements.html
---

# Opt-in requirements

The standard library mechanism for requiring and giving explicit consent to use certain API elements (for example experimental APIs likely to change). The compiler warns about such usage and requires opt-in.

## Signature / Usage

```kotlin
// Library code
@RequiresOptIn(message = "This API is experimental. It could change in the future without notice.")
@Retention(AnnotationRetention.BINARY)
@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION)
annotation class MyDateTime

@MyDateTime
// A class requiring opt-in
class DateProvider
```

```kotlin
// Client code
@OptIn(MyDateTime::class)

// Uses DateProvider
fun getDate(): Date {
    val dateProvider: DateProvider
    // ...
}
```

## Ways to opt in

| Approach | How |
| --- | --- |
| Locally | `@OptIn(MyDateTime::class)` on the using declaration. The requirement is not propagated to callers. |
| Propagate | Annotate your declaration with the same opt-in annotation (`@MyDateTime`). Required if the signature includes a type that requires opt-in. |
| Multiple APIs | `@OptIn(ExperimentalCoroutinesApi::class, FlowPreview::class)` or annotate with each marker. |
| File | `@file:OptIn(MyDateTime::class)` before the package specification and imports. |
| Module | Compiler argument `-opt-in=org.mylibrary.OptInAnnotation` (same effect as `@OptIn` on every declaration). |
| Inherit | `@SubclassOptInRequired(UnstableApi::class)` on the subclass or interface. |

```kotlin
tasks.named<KotlinCompilationTask<*>>("compileKotlin").configure {
    compilerOptions.optIn.add("org.mylibrary.OptInAnnotation")
}
```

For a multiplatform Gradle module use `kotlin { compilerOptions { optIn.add("org.mylibrary.OptInAnnotation") } }`. For Maven pass `<arg>-opt-in=org.mylibrary.OptInAnnotation</arg>` in `kotlin-maven-plugin` `<args>`.

## Require opt-in (library authors)

An opt-in requirement annotation must be annotated with `@RequiresOptIn` and must have:

- `BINARY` or `RUNTIME` retention.
- No `EXPRESSION`, `FILE`, `TYPE`, or `TYPE_PARAMETER` as a target.
- No parameters.

| Level | Behavior |
| --- | --- |
| `RequiresOptIn.Level.ERROR` | Opt-in is mandatory; code won't compile otherwise. Default level. |
| `RequiresOptIn.Level.WARNING` | Opt-in is advisable; the compiler raises a warning without it. |

```kotlin
@RequiresOptIn(level = RequiresOptIn.Level.WARNING, message = "This API is experimental. It can be incompatibly changed in the future.")
@Retention(AnnotationRetention.BINARY)
@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION)
annotation class ExperimentalDateTime
```

To require opt-in only to extend an API (open / abstract classes and non-functional interfaces), use `@SubclassOptInRequired`:

```kotlin
@RequiresOptIn(
 level = RequiresOptIn.Level.WARNING,
 message = "Interfaces in this library are experimental"
)
annotation class UnstableApi()

@SubclassOptInRequired(UnstableApi::class)
// An interface requiring opt-in to extend
interface CoreLibraryApi
```

## Notes

- The `-opt-in` compiler option is available since Kotlin 1.6.0; earlier versions use `-Xopt-in`.
- Opt-in requirements are not propagated by `@OptIn`; if an API element becomes stable, elements that still carry the annotation remain experimental until the annotation is removed.
- Not applicable: backing fields or getters of a property (annotate the property), local variables, value parameters.
- `@SubclassOptInRequired` is not propagated to inner or nested classes.
- When an API graduates to stable, remove the annotations from declarations but keep the annotation class, marked `@Deprecated` with an explanation.

## Related

- [Scope functions](./scope-functions.md)
- [UUIDs](./uuids.md)
