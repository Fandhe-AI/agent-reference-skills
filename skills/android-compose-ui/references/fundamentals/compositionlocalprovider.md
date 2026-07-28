# CompositionLocalProvider

Binds values to `CompositionLocal` keys for a given hierarchy using the `provides` infix function, so descendants can read them through `.current` without an explicit parameter.

## Signature / Usage

```kotlin
@Composable
fun CompositionLocalProvider(
    vararg values: ProvidedValue<*>,
    content: @Composable () -> Unit,
)

@Composable
fun CompositionLocalProvider(
    value: ProvidedValue<*>,
    content: @Composable () -> Unit,
)

@Composable
fun CompositionLocalProvider(
    context: CompositionLocalContext,
    content: @Composable () -> Unit,
)
```

```kotlin
CompositionLocalProvider(LocalElevations provides elevations) {
    MyScreen()
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `values` | `vararg ProvidedValue<*>` | — | One or more `local provides value` bindings, produced with the `provides` infix function. |
| `value` | `ProvidedValue<*>` | — | Single-binding overload. |
| `context` | `CompositionLocalContext` | — | Rebinds a captured set of `CompositionLocal` values, e.g. across a `Composition` boundary (dialogs, popups). |
| `content` | `@Composable () -> Unit` | — | Subtree that can read the provided value(s) via `.current`. |

## Notes

- Bindings only apply to `content` and its descendants; values revert outside that scope.
- Package: `androidx.compose.runtime`.

## Related

- [compositionLocalOf](./compositionlocalof.md)
- [staticCompositionLocalOf](./staticcompositionlocalof.md)
