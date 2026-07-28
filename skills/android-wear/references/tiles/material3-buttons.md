# Material3 buttons (button / textButton / iconButton / imageButton / avatarButton / compactButton / edge buttons)

Opinionated `androidx.wear.protolayout.material3` button components. Each takes one or more content-slot lambdas and applies Material3 spacing, shape, and color defaults.

## Signature / Usage

```kotlin
materialScope(this, requestParams.deviceConfiguration) {
    primaryLayout(
        mainSlot = {
            button(
                onClick = clickable(id = "primary"),
                labelContent = { text("Start".layoutString) },
                iconContent = { icon(Icons.PLAY) },
            )
        },
        bottomSlot = {
            textEdgeButton(
                labelContent = { text("More".layoutString) },
                onClick = clickable(),
            )
        },
    )
}
```

## Options / Props

### `button(onClick, labelContent, modifier, secondaryLabelContent = null, iconContent = null, width = wrapWithMinTapTargetDimension(), height = wrapWithMinTapTargetDimension(), shape = shapes.full, colors = filledButtonColors(), backgroundContent = null, style = defaultButtonStyle(), horizontalAlignment, contentPadding = style.innerPadding)`

Pill-shaped button with up to three slots: vertically stacked `labelContent` + `secondaryLabelContent`, plus an `iconContent` beside them.

### `textButton(onClick, labelContent, modifier, width, height, shape = shapes.full, colors = filledButtonColors(), style = defaultTextButtonStyle(), contentPadding)`

Circular/stadium button holding only short text.

### `iconButton(onClick, iconContent, modifier, width, height, shape = shapes.full, colors = filledButtonColors(), style = defaultIconButtonStyle(), contentPadding)`

Circular/stadium button holding only an icon.

### `imageButton(onClick, backgroundContent, modifier, width = IMAGE_BUTTON_DEFAULT_SIZE_DP.toDp(), height = IMAGE_BUTTON_DEFAULT_SIZE_DP.toDp())`

Fully clickable image, no additional content slots.

### `avatarButton(onClick, labelContent, avatarContent, modifier, secondaryLabelContent = null, height, shape = shapes.full, colors = filledButtonColors(), style = defaultAvatarButtonStyle(), horizontalAlignment = HORIZONTAL_ALIGN_START, contentPadding)`

Pill button with an avatar image instead of an icon, plus label/secondary label.

### `compactButton(onClick, modifier, labelContent = null, iconContent = null, width, shape = shapes.full, colors = filledButtonColors(), horizontalAlignment, contentPadding)`

Horizontally stacked icon + short text in a smaller footprint.

### `textEdgeButton(onClick, modifier, colors = filledButtonColors(), labelContent)` / `iconEdgeButton(onClick, modifier, colors = filledButtonColors(), iconContent)`

Full-width button pinned to the bottom edge of a round display with a curved shape, used as `primaryLayout`'s `bottomSlot`. Not intended for image backgrounds.

| Common parameter | Type | Description |
|-------------------|------|-------------|
| `onClick` | `Clickable` | Required tap action (see `actions-and-interactivity.md`). |
| `modifier` | `LayoutModifier` | Compose-like modifier chain applied to the button container. |
| `colors` | `ButtonColors` | From `filledButtonColors()`, `filledTonalButtonColors()`, `filledVariantButtonColors()`, or a `.copy(...)` override. |
| `shape` | `Corner` | Corner shape, from the scope's `shapes` theme. |
| `contentPadding` | `Padding` | Inner padding, defaults from the resolved `style`. |

## Notes

- This is the Wear OS Tiles / ProtoLayout Material3 API (Kotlin, `androidx.wear.protolayout.material3`) — distinct from Jetpack Compose Material3, SwiftUI, Ark UI, or Chakra UI `Button` components.
- All functions are extension functions on `MaterialScope` and must be called inside `materialScope { ... }`.
- Package/dependency: `androidx.wear.protolayout:protolayout-material3`.

## Related

- [material3-layout](./material3-layout.md)
- [material3-cards-progress](./material3-cards-progress.md)
- [actions-and-interactivity](./actions-and-interactivity.md)
