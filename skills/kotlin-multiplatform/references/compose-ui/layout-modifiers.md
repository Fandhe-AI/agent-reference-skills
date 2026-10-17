---
source: https://kotlinlang.org/docs/multiplatform/compose-layout-modifiers.html
---

# Working with modifiers

Modifiers decorate or augment a composable: change size, layout, behavior and appearance, add information such as accessibility labels, handle user input, and add high-level interactions (clickable, scrollable, draggable, zoomable).

## Signature / Usage

Chaining modifiers:

```kotlin
@Composable
private fun Greeting(name: String) {
    Column(
        // Chained `Modifier` functions:
        modifier = Modifier
            // `Modifier.padding(24.dp)` adds padding around the column
            .padding(24.dp)
            // `Modifier.fillMaxWidth()` makes the column expand to fill the available width
            .fillMaxWidth()
    ) {
        Text(text = "Hello,")
        Text(text = name)
    }
}
```

Built-in modifiers named on the page: `size`, `requiredSize` (overrides constraints), `padding`, `paddingFromBaseline`, `offset`.

```kotlin
Row(modifier = Modifier.size(width = 400.dp, height = 100.dp)) {
    Image(
        // Sets the required size to 150x150 dp and overrides the parent`s 100 dp limit
        modifier = Modifier.requiredSize(150.dp)
    )
}
```

Scoped (parent data) modifiers notify the parent layout of requirements for a child, for example `matchParentSize` in `Box`, and `weight` within `RowScope` / `ColumnScope`:

```kotlin
Box {
    // Takes size of its parent Box
    Spacer(
        Modifier
            .matchParentSize()
            .background(Color.LightGray)
    )
    // The largest child, determines the Box size
    Card()
}
```

Extract a chain into a variable or function for reuse:

```kotlin
val commonModifier = Modifier
    .padding(16.dp)
    .background(Color.LightGray)

@Composable
fun Example() {
    // Applies the reusable modifier with padding and background color
    Text("Reusable modifier", modifier = commonModifier)
}
```

## Notes

- The order of modifier functions in the chain is significant: each function changes the `Modifier` returned by the previous one.
- Reusing modifier instances improves readability and may enhance performance.
- Custom modifiers: chaining existing modifiers, a composable modifier factory, or the lower-level `Modifier.Node` API (the page links to the Jetpack Compose custom modifiers guide).
- Distance line: modifier semantics are those of the common androidx.compose API, documented by android-compose-ui; this page only covers them in the multiplatform context.

## Related

- [Layout basics](./layout-basics.md)
- [Adaptive layouts](./adaptive-layouts.md)
