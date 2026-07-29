# Card (Wear)

Base level container that holds content and actions about a single subject. Rectangular with rounded corners and a gradient background by default; single content slot. See Notes for `AppCard` / `TitleCard` variants.

## Signature / Usage

```kotlin
@Composable
public fun Card(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    onLongClick: (() -> Unit)? = null,
    onLongClickLabel: String? = null,
    enabled: Boolean = true,
    shape: Shape = CardDefaults.shape,
    colors: CardColors = CardDefaults.cardColors(),
    border: BorderStroke? = null,
    contentPadding: PaddingValues = CardDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    transformation: SurfaceTransformation? = null,
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
Card(onClick = { /* open */ }) {
    Text("Card content")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called on click. |
| `onLongClick` | `(() -> Unit)?` | `null` | Optional long-click handler. |
| `enabled` | `Boolean` | `true` | Disables interaction when `false`. |
| `shape` | `Shape` | `CardDefaults.shape` | Container shape. |
| `colors` | `CardColors` | `CardDefaults.cardColors()` | Background/content colors; use `CardDefaults.cardWithContainerPainterColors()` for the image-background overload. |
| `border` | `BorderStroke?` | `null` | Optional border. |
| `contentPadding` | `PaddingValues` | `CardDefaults.ContentPadding` | Padding around content. |
| `transformation` | `SurfaceTransformation?` | `null` | Scale/morph transformation inside `TransformingLazyColumn`. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Card content. |

## Notes

- `AppCard` is a 5-slot variant for showing interactive elements from an app: `appName`, `title` (both `RowScope`, required), optional `appImage`, optional `time`, plus a `content` column — used e.g. for message/notification-style cards.
- `TitleCard` is a 3+-slot variant with required `title`, optional `time`, optional `subtitle`, and optional `content`; both `Card` and `TitleCard` have an overload taking a `containerPainter: Painter` to draw a background image (`CardDefaults.cardWithContainerPainterColors()` / `CardWithContainerPainterContentPadding`).
- Recommended max height is ~60% of screen height (round displays may clip up to 20% at top/bottom beyond that).
- `NonClickableCard` (non-interactive, no `onClick`) is available in the same package for purely informational cards.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [ListHeader](./list-header.md)
- [ButtonGroup](./button-group.md)
