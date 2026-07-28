# lint {}

Nested block inside `android { }` that configures the Android Lint task run during the build: which issue IDs are enabled/disabled/checked, report verbosity, and whether the build aborts on error.

## Signature / Usage

```kotlin
android {
    lint {
        // Turns off checks for the issue IDs you specify.
        disable += "TypographyFractions" + "TypographyQuotes"
        // Turns on checks for the issue IDs you specify, in addition to defaults.
        enable += "RtlHardcoded" + "RtlCompat" + "RtlEnabled"
        // Enable checks for only this subset; overrides enable/disable above.
        checkOnly += "NewApi" + "InlinedApi"
        quiet = true
        abortOnError = false
        ignoreWarnings = true
        checkDependencies = true
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `disable` | `MutableSet<String>` | — | Turns off checks for the specified issue IDs. |
| `enable` | `MutableSet<String>` | — | Turns on checks for the specified issue IDs, in addition to the default checks. |
| `checkOnly` | `MutableSet<String>` | — | Restricts checking to only these issue IDs; overrides `enable`/`disable`. |
| `quiet` | `Boolean` | `false` | Turns off analysis progress reporting. |
| `abortOnError` | `Boolean` | `true` | Stops the build if Lint finds errors. |
| `ignoreWarnings` | `Boolean` | `false` | When `true`, Lint reports only errors, not warnings. |
| `checkDependencies` | `Boolean` | `false` | When `true`, Lint also analyzes dependencies (recommended for apps with library modules). |

## Notes

- This page covers only the `lint { }` **DSL surface**; the general Android Lint tool and its individual rule catalog are not owned by this category.
- Older AGP versions used a `lintOptions { }` block name; current AGP guides use `lint { }`.
- Configuration order matters when multiple mechanisms set the severity of the same issue (e.g. a `finalizeDsl()` override takes precedence over the main DSL).

## Related

- [Module build.gradle.kts](./module-build-gradle.md)
