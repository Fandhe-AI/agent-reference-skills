# ModifiersBuilders

Composable modifiers attached to a `LayoutElement` via `setModifiers(Modifiers)` to control interaction, accessibility, spacing, and drawing (background, border) without changing the element's own content.

## Signature / Usage

```kotlin
LayoutElementBuilders.Image.Builder()
    .setWidth(dp(24f))
    .setHeight(dp(24f))
    .setResourceId("image_id")
    .setModifiers(
        ModifiersBuilders.Modifiers.Builder()
            .setClickable(
                ModifiersBuilders.Clickable.Builder()
                    .setId("foo")
                    .setOnClick(ActionBuilders.LoadAction.Builder().build())
                    .build()
            )
            .setBackground(
                ModifiersBuilders.Background.Builder()
                    .setColor(argb(0xFFFF0000.toInt()))
                    .build()
            )
            .setPadding(
                ModifiersBuilders.Padding.Builder().setStart(dp(12f)).build()
            )
            .setSemantics(
                ModifiersBuilders.Semantics.Builder()
                    .setContentDescription("Image description")
                    .build()
            )
            .build()
    )
    .build()
```

## Options / Props

### Modifiers.Builder

| Name | Type | Description |
|------|------|-------------|
| `setClickable` | `Clickable` | Makes the element tappable. |
| `setSemantics` | `Semantics` | Accessibility metadata. |
| `setPadding` | `Padding` | Spacing inside the element's bounds. |
| `setBorder` | `Border` | Border stroke around the element. |
| `setBackground` | `Background` | Fill color and corner radius. |
| `setMetadata` | `ElementMetadata` | Opaque metadata payload. |

### Clickable.Builder

| Name | Type | Description |
|------|------|-------------|
| `setId` | `String` | Identifies which element was tapped; read back via `TileRequest.currentState.lastClickableId`. |
| `setOnClick` | `Action` (`LaunchAction` / `LoadAction`) | Action to run when tapped. |

### Background.Builder

| Name | Type | Description |
|------|------|-------------|
| `setColor` | `ColorProp` | Fill color (defaults to transparent). |
| `setCorner` | `Corner` | Corner radius (defaults to square). |

### Padding.Builder

| Name | Type | Description |
|------|------|-------------|
| `setStart` / `setEnd` / `setTop` / `setBottom` | `DpProp` | Per-edge padding. |
| `setAll` | `DpProp` | Sets all four edges at once. |
| `setRtlAware` | `BoolProp` / `Boolean` | Whether start/end respect layout direction. |

### Border.Builder

| Name | Type | Description |
|------|------|-------------|
| `setWidth` | `DpProp` | Border stroke width. |
| `setColor` | `ColorProp` | Border stroke color. |

### Semantics.Builder

| Name | Type | Description |
|------|------|-------------|
| `setContentDescription` | `String` | Screen-reader description of the element. |

## Notes

- This is the Wear OS Tiles / ProtoLayout API (Kotlin, `androidx.wear.tiles` / `androidx.wear.protolayout`) — distinct from the same-named Jetpack Compose, SwiftUI, Ark UI, or Chakra UI components.
- `Modifiers.Builder().setContentUpdateAnimation(AnimatedVisibility)` (from the animations guide) drives fade/slide transitions when an element's content changes between `onTileRequest` calls.
- The system enforces a minimum 48dp x 48dp tappable area around `Clickable` elements for accessibility.
- Package: `androidx.wear.protolayout.ModifiersBuilders` (formerly `androidx.wear.tiles.ModifiersBuilders`).

## Related

- [layout-elements](./layout-elements.md)
- [actions-and-interactivity](./actions-and-interactivity.md)
