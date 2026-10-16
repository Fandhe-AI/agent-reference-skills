# LayoutElementBuilders (Box / Column / Row / Text / Image / Spacer / Arc)

Low-level ProtoLayout layout primitives used to compose a tile's UI tree. Material3 components (see `material3-layout.md`, `material3-buttons.md`, `material3-cards-progress.md`) are built on top of these and are the recommended starting point; use these primitives directly for custom layouts.

## Signature / Usage

```kotlin
LayoutElementBuilders.Box.Builder()
    .setWidth(expand())
    .setHeight(wrap())
    .setHorizontalAlignment(LayoutElementBuilders.HORIZONTAL_ALIGN_CENTER)
    .addContent(
        LayoutElementBuilders.Text.Builder()
            .setText("Hello, World!")
            .build()
    )
    .build()

LayoutElementBuilders.Image.Builder()
    .setResourceId("image_id")
    .setWidth(dp(24f))
    .setHeight(dp(24f))
    .build()

LayoutElementBuilders.Spacer.Builder()
    .setWidth(dp(8f))
    .build()
```

## Options / Props

### Box

Stacks all children on top of one another.

| Name | Type | Description |
|------|------|-------------|
| `addContent` | `LayoutElement` | Adds a child; call multiple times to stack children. |
| `setWidth` / `setHeight` | `ContainerDimension` | Container sizing (`dp()`, `expand()`, `wrap()`). |
| `setHorizontalAlignment` | `Int` (`HORIZONTAL_ALIGN_*`) | Horizontal alignment of children within the box. |
| `setVerticalAlignment` | `Int` (`VERTICAL_ALIGN_*`) | Vertical alignment of children within the box. |
| `setModifiers` | `Modifiers` | Background, border, padding, clickable, semantics. |

### Text

| Name | Type | Description |
|------|------|-------------|
| `setText` | `String` / `StringProp` | Text content, optionally bound to a dynamic value. |
| `setFontStyle` | `FontStyle` | Font size, weight, italic, color. |
| `setMaxLines` | `Int` / `Int32Prop` | Maximum number of lines before truncation. |
| `setMultilineAlignment` | `Int` (`TEXT_ALIGN_*`) | Alignment of wrapped lines. |
| `setOverflow` | `Int` (`TEXT_OVERFLOW_*`) | Truncation/ellipsize behavior. |
| `setLineHeight` | `SpProp` | Line height. |
| `setModifiers` | `Modifiers` | Standard modifiers. |

### Image

| Name | Type | Description |
|------|------|-------------|
| `setResourceId` | `String` / `StringProp` | ID registered via `Resources.Builder().addIdToImageMapping(id, image)`. |
| `setWidth` / `setHeight` | `ImageDimension` | Rendered image size. |
| `setContentScaleMode` | `Int` (`CONTENT_SCALE_MODE_*`) | How the image is scaled/cropped to its bounds. |
| `setColorFilter` | `ColorFilter` | Optional tint applied to the image. |
| `setModifiers` | `Modifiers` | Standard modifiers. |

### Spacer

Provides padding/space between adjacent elements.

| Name | Type | Description |
|------|------|-------------|
| `setWidth` / `setHeight` | `SpacerDimension` | Space reserved on each axis. |
| `setModifiers` | `Modifiers` | Standard modifiers. |

### Spannable / Span / SpanText / SpanImage

A `Spannable` lays out elements similarly to text, so one substring in a larger block of text can have its own style (not possible with a single `Text`). It is filled with `Span` children only.

| Name | Type | Description |
|------|------|-------------|
| `Spannable.Builder().addSpan` | `Span` | Adds a child span. Other children and nested `Spannable` instances are not allowed. |
| `Span` | base type | Child of `Spannable`; two kinds: `SpanText` and `SpanImage`. |
| `SpanText.Builder()` (`setText`, `setFontStyle`) | `SpanText` | Renders text with a specific style (e.g. `FontStyle.Builder().setItalic(true)`). |
| `SpanImage.Builder()` (`setWidth`, `setHeight`, `setResourceId`) | `SpanImage` | Renders an image inline with text; the resource ID is registered like an `Image`. |

### Column / Row

Linear layout containers that arrange children vertically (`Column`) or horizontally (`Row`), analogous to `Box` but along one axis.

| Name | Type | Description |
|------|------|-------------|
| `Column.Builder().addContent` / `Row.Builder().addContent` | `LayoutElement` | Adds a child in order along the container's axis. |
| `Column.Builder().setHorizontalAlignment` | `Int` (`HORIZONTAL_ALIGN_*`) / `HorizontalAlignmentProp` | Horizontal alignment of children within the column. |
| `Row.Builder().setVerticalAlignment` | `Int` (`VERTICAL_ALIGN_*`) / `VerticalAlignmentProp` | Vertical alignment of children within the row. |
| `setWidth` / `setHeight` | `ContainerDimension` | Container sizing (`dp()`, `expand()`, `wrap()`). |
| `setModifiers` | `Modifiers` | Standard modifiers. |

### Arc / ArcLine

Draws content along a circular arc — used for radial progress indicators and decorative rings.

```kotlin
LayoutElementBuilders.Arc.Builder()
    .setArcDirection(LayoutElementBuilders.ARC_DIRECTION_CLOCKWISE)
    .addContent(
        LayoutElementBuilders.ArcLine.Builder()
            .setArcDirection(LayoutElementBuilders.ARC_DIRECTION_CLOCKWISE)
            .setLength(degrees(270f))
            .setThickness(dp(8f))
            .build()
    )
    .build()
```

| Name | Type | Description |
|------|------|-------------|
| `Arc.Builder().setArcDirection` | `Int` (`ARC_DIRECTION_*`) | Growth direction of the arc's children. |
| `Arc.Builder().addContent` | `ArcLayoutElement` | Adds arc content (e.g. `ArcLine`, `ArcText`). |
| `ArcLine.Builder().setLength` | `DegreesProp` | Sweep angle of the line, via `degrees()`. |
| `ArcLine.Builder().setThickness` | `DpProp` | Stroke thickness, via `dp()`. |
| `DashedArcLine.Builder()...setLinePattern` | `DashedLinePattern` | Dashed variant; requires renderer schema `1.500+` (`@RequiresSchemaVersion(major = 1, minor = 500)`). |

## Notes

- This is the Wear OS Tiles / ProtoLayout API (Kotlin, `androidx.wear.tiles` / `androidx.wear.protolayout`) — distinct from the same-named Jetpack Compose, SwiftUI, Ark UI, or Chakra UI components.
- Prefer the `material3` DSL functions (`text()`, `button()`, `card()`, etc.) over raw `LayoutElementBuilders` where an equivalent exists — they set correct spacing, accessibility, and layout constraints automatically.
- Package: `androidx.wear.protolayout.LayoutElementBuilders` (older tiles-material era: `androidx.wear.tiles.LayoutElementBuilders`).

## Related

- [modifiers](./modifiers.md)
- [dimensions](./dimensions.md)
- [material3-layout](./material3-layout.md)
