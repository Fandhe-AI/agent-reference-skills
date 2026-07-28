# Modifier.drawWithCache

Caches expensive drawing objects (`Brush`, `Shader`, `Path`, measured text, etc.) across recompositions, only recreating them when size or read state changes.

## Signature / Usage

```kotlin
fun Modifier.drawWithCache(block: CacheDrawScope.() -> DrawResult): Modifier
```

```kotlin
Text(
    "Hello Compose!",
    modifier = Modifier
        .drawWithCache {
            val brush = Brush.linearGradient(
                listOf(Color(0xFF9E82F0), Color(0xFF42A5F5))
            )
            onDrawBehind {
                drawRoundRect(brush, cornerRadius = CornerRadius(10.dp.toPx()))
            }
        }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `block` | `CacheDrawScope.() -> DrawResult` | — | Runs on size/state change; must return a `DrawResult` built via `onDrawBehind { ... }` or `onDrawWithContent { ... }`. |

## Notes

- The `block` itself is not a `DrawScope`; only the trailing `onDrawBehind`/`onDrawWithContent` lambda draws.
- Reading state (e.g. `remember`/animated values) inside `block` invalidates the cache on change; reading it only inside the draw lambda avoids unnecessary recreation.
- Preferred over `drawBehind`/`drawWithContent` when constructing objects like `Brush`, `Path`, or `RuntimeShader` that are expensive to allocate per frame.
- Package: `androidx.compose.ui.draw`.

## Related

- [Modifier.drawBehind](./modifier-draw-behind.md)
- [Modifier.drawWithContent](./modifier-draw-with-content.md)
- [Brush](./brush.md)
