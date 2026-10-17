---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-dsl-reference.html#language-settings
---

# Multiplatform Gradle DSL reference — Language settings

The `languageSettings {}` block in a source set defines certain aspects of project analysis and compilation.

## Signature / Usage

```kotlin
kotlin {
    sourceSets.all {
        languageSettings.apply {
            languageVersion = "2.4" // possible values: "2.0", "2.1", "2.2", "2.3", "2.4", "2.5" (EXPERIMENTAL)
            apiVersion = "2.4" // possible values: "2.0", "2.1", "2.2", "2.3", "2.4", "2.5" (EXPERIMENTAL)
            enableLanguageFeature("InlineClasses") // language feature name
            optIn("kotlin.ExperimentalUnsignedTypes") // annotation FQ-name
            progressiveMode = true // false by default
        }
    }
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `languageVersion` | Provides source compatibility with the specified version of Kotlin. |
| `apiVersion` | Allows using declarations only from the specified version of Kotlin bundled libraries. |
| `enableLanguageFeature` | Enables the specified language feature. The available values correspond to the language features that are currently experimental or have been introduced as such at some point. |
| `optIn` | Allows using the specified opt-in annotation. |
| `progressiveMode` | Enables the progressive mode. |

## Notes

- Use `languageSettings {}` only to configure settings that apply specifically to a shared source set. For all other cases, use `compilerOptions {}` at the extension or target level.
- In the docs, `"2.5"` is marked EXPERIMENTAL as a possible value.
- Groovy form: `languageSettings { languageVersion = '2.4' ... }`.

## Related

- [Compiler options](./dsl-compiler-options.md)
- [Source sets](./dsl-source-sets.md)
