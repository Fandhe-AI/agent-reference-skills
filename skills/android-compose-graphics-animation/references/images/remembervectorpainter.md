# rememberVectorPainter

Creates and remembers a `VectorPainter`, either from an existing `ImageVector` or from a manually-defined `Group`/`Path` sub-composition.

## Signature / Usage

```kotlin
@Composable
fun rememberVectorPainter(image: ImageVector): VectorPainter

@Composable
fun rememberVectorPainter(
    defaultWidth: Dp,
    defaultHeight: Dp,
    viewportWidth: Float = Float.NaN,
    viewportHeight: Float = Float.NaN,
    name: String = RootGroupName,
    tintColor: Color = Color.Unspecified,
    tintBlendMode: BlendMode = BlendMode.SrcIn,
    autoMirror: Boolean = false,
    content: @Composable (viewportWidth: Float, viewportHeight: Float) -> Unit,
): VectorPainter
```

```kotlin
val painter = rememberVectorPainter(image = Icons.Filled.Favorite)
Image(painter = painter, contentDescription = "Favorite")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `ImageVector` | — | Existing vector to wrap (single-argument overload). |
| `defaultWidth` / `defaultHeight` | `Dp` | — | Intrinsic size of the vector (manual-composition overload). |
| `viewportWidth` / `viewportHeight` | `Float` | `Float.NaN` (uses width/height in px) | Size of the virtual canvas paths are drawn on. |
| `name` | `String` | `RootGroupName` | Identifier for the root group. |
| `tintColor` | `Color` | `Color.Unspecified` | Color tinting the root group. |
| `tintBlendMode` | `BlendMode` | `BlendMode.SrcIn` | Blend mode used with `tintColor`. |
| `autoMirror` | `Boolean` | `false` | Mirror the vector's contents for right-to-left layouts. |
| `content` | `@Composable (Float, Float) -> Unit` | — | Sub-composition defining `Group`/`Path` nodes (manual-composition overload). |

## Notes

- Package: `androidx.compose.ui.graphics.vector`.
- `painterResource()` calls this internally for `VectorDrawable` resources; call it directly only when building a vector from an in-memory `ImageVector` or a hand-authored path tree.

## Related

- [ImageVector](./imagevector.md)
- [Painter](./painter.md)
