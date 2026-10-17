---
source: https://kotlinlang.org/docs/multiplatform/compose-layout.html
---

# Layout basics

Key concepts of layout construction in Compose Multiplatform: composable functions, `Column` / `Row` / `Box`, flow layouts and modifiers.

## Signature / Usage

A composable function takes data and emits UI; the `@Composable` annotation tells the Compose compiler the function converts data into a UI.

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}
```

Building blocks:

- `Column` places items vertically.
- `Row` places items horizontally.
- `Box` stacks elements on top of each other.
- `FlowRow` / `FlowColumn` are versions of `Row` / `Column` for responsive layouts; items flow into the next line when the container runs out of space.

```kotlin
@Composable
fun ResponsiveLayout() {
    FlowRow {
        Text(text = "Item 1")
        Text(text = "Item 2")
        Text(text = "Item 3")
    }
}
```

Modifiers decorate or adjust composables declaratively (dimensions, alignment, padding, interaction behaviors):

```kotlin
@Composable
fun ModifierExample() {
    Text(
        text = "Hello with padding",
        modifier = Modifier.padding(16.dp)
    )
}
```

## Notes

- For a deep dive on layouts the page points to the Jetpack Compose documentation.
- Distance line: the common androidx.compose layout API (`Column`, `Row`, `Box`, `Modifier`) is documented in detail by android-compose-ui; this page only introduces it for the multiplatform context.

## Related

- [Working with modifiers](./layout-modifiers.md)
- [Adaptive layouts](./adaptive-layouts.md)
- [Lifecycle](../compose-architecture/lifecycle.md)
