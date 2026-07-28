# Scaffold / TitleBar

Material3 slot components for structuring a widget's top-level layout. Package: `androidx.glance.appwidget.components`.

## Signature / Usage

```kotlin
@Composable
public fun Scaffold(
    modifier: GlanceModifier = GlanceModifier,
    titleBar: @Composable (() -> Unit)? = null,
    backgroundColor: ColorProvider = GlanceTheme.colors.widgetBackground,
    horizontalPadding: Dp = 12.dp,
    content: @Composable () -> Unit,
)

@Composable
public fun TitleBar(
    startIcon: ImageProvider,
    title: String,
    iconColor: ColorProvider? = GlanceTheme.colors.onSurface,
    textColor: ColorProvider = GlanceTheme.colors.onSurface,
    modifier: GlanceModifier = GlanceModifier,
    fontFamily: FontFamily? = null,
    actions: @Composable RowScope.() -> Unit = {},
)
```

```kotlin
Scaffold(
    titleBar = {
        TitleBar(
            startIcon = ImageProvider(R.drawable.ic_logo),
            title = "My Widget",
        )
    },
) {
    Text("Widget content")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `GlanceModifier` | `GlanceModifier` | Applied to the outer container. |
| `titleBar` (Scaffold) | `@Composable (() -> Unit)?` | `null` | Slot rendered at the top, typically a `TitleBar`. |
| `backgroundColor` (Scaffold) | `ColorProvider` | `GlanceTheme.colors.widgetBackground` | Root background color. |
| `horizontalPadding` (Scaffold) | `Dp` | `12.dp` | Horizontal padding applied to content. |
| `startIcon` (TitleBar) | `ImageProvider` | — | Tintable icon representing the app/brand. |
| `title` (TitleBar) | `String` | — | Widget/app name; keep short for narrow widths. |
| `iconColor` / `textColor` (TitleBar) | `ColorProvider?` / `ColorProvider` | `GlanceTheme.colors.onSurface` | Tint colors. |
| `fontFamily` (TitleBar) | `FontFamily?` | `null` | Title font override. |
| `actions` (TitleBar) | `@Composable RowScope.() -> Unit` | `{}` | Trailing action buttons, typically `CircleIconButton` with no background. |

## Notes

- `Scaffold` sets the background to `GlanceTheme.colors.widgetBackground` and applies padding automatically; `content` fills the remaining space below `titleBar`.
- Requires `androidx.glance:glance-appwidget` plus a Material component artifact: `androidx.glance:glance-material` (Material 2) or `androidx.glance:glance-material3` (Material 3) for `GlanceTheme.colors`.
- Distinct from the mobile Jetpack Compose Material3 `Scaffold`/`TopAppBar` and from SwiftUI/Ark UI/Chakra UI equivalents — this is a Glance-only, `RemoteViews`-backed slot API.

## Related

- [glance-theme](./glance-theme.md)
