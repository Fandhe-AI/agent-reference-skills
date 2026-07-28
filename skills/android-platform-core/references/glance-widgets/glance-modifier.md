# GlanceModifier

Ordered, immutable collection of modifier elements for Glance composables. Package: `androidx.glance` (extensions also in `androidx.glance.layout` and `androidx.glance.appwidget`).

## Signature / Usage

```kotlin
@Stable
public interface GlanceModifier {
    public fun <R> foldIn(initial: R, operation: (R, Element) -> R): R
    public fun <R> foldOut(initial: R, operation: (Element, R) -> R): R
    public fun any(predicate: (Element) -> Boolean): Boolean
    public fun all(predicate: (Element) -> Boolean): Boolean
    public infix fun then(other: GlanceModifier): GlanceModifier
    public companion object : GlanceModifier
}
```

```kotlin
Column(
    modifier = GlanceModifier
        .fillMaxSize()
        .background(Color.White)
        .padding(16.dp)
        .cornerRadius(12.dp)
        .clickable(actionStartActivity<MyActivity>())
) { /* content */ }
```

## Options / Props

Common extension functions chained onto `GlanceModifier`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fillMaxSize()` | `GlanceModifier` | — | Expand width and height to the maximum available space. |
| `fillMaxWidth()` / `fillMaxHeight()` | `GlanceModifier` | — | Expand only width / only height to the parent's size. |
| `wrapContentWidth()` / `wrapContentHeight()` / `wrapContentSize()` | `GlanceModifier` | — | Size to fit content. |
| `width(width: Dp)` / `height(height: Dp)` / `size(width: Dp, height: Dp)` | `GlanceModifier` | — | Set absolute dimensions (also available as `@DimenRes` overloads). |
| `padding(start, top, end, bottom: Dp = 0.dp)` | `GlanceModifier` | `0.dp` each | Add space along each edge; also has `all`, `horizontal`/`vertical`, and `@DimenRes` overloads. |
| `absolutePadding(left, top, right, bottom: Dp = 0.dp)` | `GlanceModifier` | `0.dp` each | Same as `padding` but ignores layout direction (LTR/RTL). |
| `background(color: Color \| ColorProvider \| @ColorRes Int)` | `GlanceModifier` | — | Solid background color. |
| `background(imageProvider: ImageProvider, contentScale: ContentScale = ContentScale.FillBounds, colorFilter: ColorFilter? = null)` | `GlanceModifier` | `ContentScale.FillBounds` | Background image, optionally tinted. |
| `cornerRadius(radius: Dp)` | `GlanceModifier` | — | Rounds the view's corners; Android 12 (S)+ only. |
| `clickable(onClick: Action)` / `clickable(block: () -> Unit)` | `GlanceModifier` | — | Attach a click action (`Action`-based or a suspend lambda run in a `WorkManager` worker). |

## Notes

- Plays the same role as `androidx.compose.ui.Modifier` but is a **separate type** — `androidx.glance.GlanceModifier`, not interoperable with mobile Compose `Modifier`.
- `clickable(block: () -> Unit)` lambdas execute in a `WorkManager` worker context; on Android 12+, prefer `actionStartActivity` over starting activities from a lambda.
- Extension functions live across multiple files/packages (`androidx.glance.layout.SizeModifiers`, `androidx.glance.layout.Padding`, `androidx.glance.Background`, `androidx.glance.appwidget.CornerRadius`, `androidx.glance.action.Action`), but are all applied via the same chained `GlanceModifier` API.
- Artifact: `androidx.glance:glance`.

## Related

- [layout-containers](./layout-containers.md)
- [actions](./actions.md)
