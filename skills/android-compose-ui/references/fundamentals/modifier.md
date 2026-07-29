# Modifier

A `Modifier` decorates or augments a composable: size, layout, behavior, appearance, accessibility, input handling, and interactions (`clickable`, `scrollable`, `draggable`, etc.) are all applied by chaining `Modifier` functions.

## Signature / Usage

```kotlin
@Composable
private fun Greeting(name: String) {
    Column(
        modifier = Modifier
            .padding(24.dp)
            .fillMaxWidth()
    ) {
        Text(text = "Hello,")
        Text(text = name)
    }
}
```

## Notes

- This is the Jetpack Compose (Kotlin, `androidx.compose.ui.Modifier`) API — distinct from the same-named SwiftUI view modifier system (e.g. `.animation()`, `.transition()`).
- Each `Modifier` function returns a new `Modifier`; chaining composes them in order.
- **Order matters** — each function wraps the result of the previous one. `Modifier.clickable(onClick).padding(padding)` makes the whole area including padding clickable; `Modifier.padding(padding).clickable(onClick)` makes only the inner content clickable.
- Some modifiers are **scoped** and only compile inside a specific parent's content lambda, enforced by the type system: `matchParentSize()` is only available in `BoxScope`, `weight()` and `align()` vary by parent scope (`RowScope`/`ColumnScope`). This catches misuse at compile time instead of at runtime.
- Package: `androidx.compose.ui`.

## Related

- [Phases of Compose](./phases.md)
- [Custom Modifiers (Modifier.Node)](./custom-modifiers.md)
