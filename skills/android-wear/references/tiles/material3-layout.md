# materialScope / primaryLayout / text / buttonGroup

The `androidx.wear.protolayout.material3` Kotlin DSL is the recommended entry point for building tile UIs. All Material3 components must be created inside a `materialScope { ... }` lambda, and `primaryLayout()` is the standard full-screen root.

## Signature / Usage

```kotlin
fun myLayout(
    context: Context,
    deviceConfiguration: DeviceParametersBuilders.DeviceParameters,
) = materialScope(context, deviceConfiguration) {
    primaryLayout(
        titleSlot = { text("Title".layoutString) },
        mainSlot = { text("Main Content".layoutString) },
        bottomSlot = {
            textEdgeButton(
                labelContent = { text("Action".layoutString) },
                onClick = clickable(),
            )
        },
    )
}
```

## Options / Props

### `materialScope(context, deviceConfiguration, allowDynamicTheme = true, defaultColorScheme = ColorScheme(), layout: MaterialScope.() -> LayoutElement): LayoutElement`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `Context` | — | Android context for the tile service. |
| `deviceConfiguration` | `DeviceParameters` | — | Pass `requestParams.deviceConfiguration` from `onTileRequest`. |
| `allowDynamicTheme` | `Boolean` | `true` | Whether to use the device's dynamic (wallpaper-derived) color theme when available. |
| `defaultColorScheme` | `ColorScheme` | `ColorScheme()` | Fallback color scheme when dynamic theming is unavailable/disallowed. |
| `layout` | `MaterialScope.() -> LayoutElement` | — | Lambda building the tile's root `LayoutElement`. |

`MaterialScope` exposes `context`, `deviceConfiguration`, `colorScheme`, `shapes`, and `protoLayoutScope` to nested component builders.

### `MaterialScope.primaryLayout(mainSlot, titleSlot = null, bottomSlot = null, labelForBottomSlot = null, onClick = null, margins = DEFAULT_PRIMARY_LAYOUT_MARGIN): LayoutElement`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mainSlot` | `MaterialScope.() -> LayoutElement` | — | Required. Core content — typically rows/columns of text, buttons, or a `buttonGroup`. |
| `titleSlot` | `MaterialScope.() -> LayoutElement`? | `null` | Optional title/header above `mainSlot`. |
| `bottomSlot` | `MaterialScope.() -> LayoutElement`? | `null` | Optional bottom content, typically an edge button. |
| `labelForBottomSlot` | `MaterialScope.() -> LayoutElement`? | `null` | Optional label rendered above `bottomSlot`. |
| `onClick` | `Clickable?` | `null` | Makes the whole layout tappable. |
| `margins` | `PrimaryLayoutMargins` | `DEFAULT_PRIMARY_LAYOUT_MARGIN` | Layout margin override. |

### `MaterialScope.text(text: LayoutString, ...): LayoutElement`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `LayoutString` | — | Content, e.g. `"Hello".layoutString`; may carry a dynamic value. |
| `typography` | `@TypographyToken Int` | scope default | Typography role, e.g. `BODY_LARGE`, `TITLE_MEDIUM`, `DISPLAY_SMALL`. |
| `color` | `LayoutColor` | scope default | Text color, following the color scheme. |
| `italic` / `underline` | `Boolean` | scope default | Style flags. |
| `maxLines` | `Int` | scope default | Maximum lines before overflow handling. |
| `alignment` | `@TextAlignment Int` | scope default | Multiline alignment. |
| `overflow` | `@TextOverflow Int` | scope default | Truncation behavior. |
| `settings` | `List<FontSetting>` | `emptyList()` | Variable-font axes (`weight()`, `width()`, `roundness()`); requires renderer schema 1.400+. |

### `MaterialScope.buttonGroup(width = expand(), height = expand(), spacing = DEFAULT_SPACER_SIZE_DP, content: ButtonGroupScope.() -> Unit): LayoutElement`

Arranges children in a horizontal sequence filling available width; combine multiple `buttonGroup`s inside a `Column` with spacers to build multiple rows. Children are added with `buttonGroupItem { ... }`, typically wrapping icon/text buttons or data cards.

## Notes

- This is the Wear OS Tiles / ProtoLayout Material3 API (Kotlin, `androidx.wear.protolayout.material3`) — distinct from Jetpack Compose Material3, SwiftUI, Ark UI, or Chakra UI.
- M3 replaces the older Builder-based `PrimaryLayout.Builder(...)` / `Text.Builder(...)` (Tiles 1.2 / ProtoLayout 1.0 era, package `androidx.wear.protolayout.material`) — do not mix M2.5 and M3 components in the same tile.
- Package/dependency: `androidx.wear.protolayout:protolayout-material3`.

## Related

- [tile-service](./tile-service.md)
- [material3-buttons](./material3-buttons.md)
- [material3-cards-progress](./material3-cards-progress.md)
