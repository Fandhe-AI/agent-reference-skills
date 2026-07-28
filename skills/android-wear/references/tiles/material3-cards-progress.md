# Material3 cards and progress indicators (card / titleCard / appCard / dataCard variants / circularProgressIndicator)

`androidx.wear.protolayout.material3` card components for multi-slot content, and circular progress indicators with dynamic-value animation support.

## Signature / Usage

```kotlin
materialScope(this, requestParams.deviceConfiguration) {
    primaryLayout(
        mainSlot = {
            titleCard(
                onClick = clickable(),
                title = { text("Meeting".layoutString) },
                content = { text("10:00 - 10:30".layoutString) },
            )
        }
    )
}

circularProgressIndicator(
    staticProgress = 0.4f,
    strokeWidth = 6f,
)
```

## Options / Props

### `card(onClick, modifier, width, height, backgroundContent = null, contentPadding = padding(DEFAULT_CONTENT_PADDING), content)`

Generic clickable card with a single free-form content slot.

### `titleCard(onClick, title, modifier, content = null, time = null, height, shape, colors = filledCardColors(), backgroundContent = null, style = defaultTitleCardStyle(), contentPadding, horizontalAlignment)`

1–3 text-based slots: `title`, optional `content`, optional `time`.

### `appCard(onClick, title, modifier, content = null, avatar = null, label = null, time = null, height, shape, colors = filledCardColors(), backgroundContent = null, style = defaultAppCardStyle(), contentPadding)`

Up to 5 slots with a header row (`avatar`, `label`, `time`) plus `title`/`content`.

### `textDataCard(onClick, title, modifier, content = null, secondaryText = null, width, height, shape = shapes.large, colors = filledCardColors(), backgroundContent = null, style, contentPadding)`

Up to 3 vertically stacked text/numeral slots.

### `iconDataCard(onClick, title, modifier, content = null, secondaryIcon = null, width, height, shape = shapes.large, colors = filledCardColors(), backgroundContent = null, style, titleContentPlacement = TitleContentPlacementInDataCard.Bottom, contentPadding)`

Data card variant with an icon slot alongside stacked text.

### `graphicDataCard(onClick, graphic, title, modifier, content = null, height, shape = shapes.full, colors = filledCardColors(), style = defaultGraphicDataCardStyle(), horizontalAlignment = HORIZONTAL_ALIGN_START, contentPadding)`

Card with a `graphic` slot (e.g. a progress indicator) plus up to 2 stacked text slots.

| Common parameter | Type | Description |
|-------------------|------|-------------|
| `onClick` | `Clickable` | Required tap action. |
| `colors` | `CardColors` | From `filledCardColors()` or a `.copy(...)` override. |
| `shape` | `Corner` | Defaults to `shapes.extraLarge`/`shapes.large` depending on screen breakpoint. |
| `backgroundContent` | `MaterialScope.() -> LayoutElement`? | Optional background image/graphic behind the card content. |

### `circularProgressIndicator(staticProgress = 0f, dynamicProgress = null, modifier, startAngleDegrees = 0f, endAngleDegrees = startAngleDegrees + 360f, strokeWidth = LARGE_STROKE_WIDTH, gapSize = calculateRecommendedGapSize(strokeWidth), colors = filledProgressIndicatorColors(), size = expand()): Box`

Full-circle progress ring; supports animating between values via a `DynamicFloat` passed to `dynamicProgress`. Uses 3 animation quotas when animated. Full feature set requires renderer version 1.403+; degrades below that.

### `segmentedCircularProgressIndicator(segmentCount, staticProgress = 0f, dynamicProgress = null, modifier, startAngleDegrees = 0f, endAngleDegrees = startAngleDegrees + 360f, strokeWidth = LARGE_STROKE_WIDTH, gapSize = calculateRecommendedGapSize(strokeWidth), colors = filledProgressIndicatorColors(), size = expand()): Box`

Same as `circularProgressIndicator` but divided into `segmentCount` equal segments; uses 2 animation quotas when animated; requires renderer 1.403+.

## Notes

- This is the Wear OS Tiles / ProtoLayout Material3 API (Kotlin, `androidx.wear.protolayout.material3`) — distinct from Jetpack Compose Material3, SwiftUI, Ark UI, or Chakra UI `Card` components.
- All functions are extension functions on `MaterialScope`, called inside `materialScope { ... }`.
- Package/dependency: `androidx.wear.protolayout:protolayout-material3`.

## Related

- [material3-layout](./material3-layout.md)
- [material3-buttons](./material3-buttons.md)
- [platform-data](./platform-data.md)
