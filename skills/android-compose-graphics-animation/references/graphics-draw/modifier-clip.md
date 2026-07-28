# Modifier.clip

Clips the content of the modified composable to a given `Shape`.

## Signature / Usage

```kotlin
fun Modifier.clip(shape: Shape): Modifier
fun Modifier.clipToBounds(): Modifier
```

```kotlin
Box(
    modifier = Modifier
        .size(200.dp)
        .clip(CircleShape)
        .background(Color(0xFFF06292)),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `Shape` | — | Shape the content will be clipped to. |

## Notes

- `clipToBounds()` clips to the modifier's rectangular layer bounds without needing a `Shape`.
- `Modifier.graphicsLayer { clip = true; shape = ... }` achieves the same clipping while also allowing other layer transformations in the same layer.
- Package: `androidx.compose.ui.draw`.

## Related

- [Shape](./shape.md)
- [Modifier.graphicsLayer](./modifier-graphics-layer.md)
