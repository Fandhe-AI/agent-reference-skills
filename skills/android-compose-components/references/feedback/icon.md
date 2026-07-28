# Icon

Material Design icon component that draws an `ImageVector`, `ImageBitmap`, or `Painter` using a tint color, defaulting to `LocalContentColor`.

## Signature / Usage

```kotlin
@Composable
fun Icon(
    imageVector: ImageVector,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    tint: Color = LocalContentColor.current,
)

@Composable
fun Icon(
    bitmap: ImageBitmap,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    tint: Color = LocalContentColor.current,
)

@Composable
fun Icon(
    painter: Painter,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    tint: Color = LocalContentColor.current,
)

@Composable
fun Icon(
    painter: Painter,
    tint: ColorProducer?,
    contentDescription: String?,
    modifier: Modifier = Modifier,
)
```

```kotlin
Icon(
    imageVector = Icons.Filled.Mail,
    contentDescription = "Email",
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `imageVector` / `bitmap` / `painter` | `ImageVector` / `ImageBitmap` / `Painter` | — | Source drawn by the icon, one per overload. |
| `contentDescription` | `String?` | — | Accessibility description; pass `null` if purely decorative. |
| `modifier` | `Modifier` | `Modifier` | Applied to this icon. |
| `tint` | `Color` / `ColorProducer?` | `LocalContentColor.current` | Tint applied when drawing; the `ColorProducer` overload allows deferred/animated tint without recomposition. |

## Notes

- If `painter` has no intrinsic size, the component uses a recommended default size.
- Package: `androidx.compose.material3`.

## Related

- [BadgedBox](./badgedbox.md)
