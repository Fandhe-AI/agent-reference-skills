# LazyLayoutCacheWindow

Represents an out-of-viewport area of a Lazy Layout where items are cached. Items are prepared in the cache window in advance to improve scroll performance.

## Signature / Usage

```kotlin
@ExperimentalFoundationApi
@Stable
interface LazyLayoutCacheWindow {
    fun Density.calculateAheadWindow(viewport: Int): Int = 0
    fun Density.calculateBehindWindow(viewport: Int): Int = 0
}

// Dp based
@ExperimentalFoundationApi
fun LazyLayoutCacheWindow(ahead: Dp = 0.dp, behind: Dp = 0.dp): LazyLayoutCacheWindow

// Viewport-fraction based
@ExperimentalFoundationApi
fun LazyLayoutCacheWindow(
    @FloatRange(from = 0.0) aheadFraction: Float = 0.0f,
    @FloatRange(from = 0.0) behindFraction: Float = 0.0f,
): LazyLayoutCacheWindow
```

```kotlin
val cacheWindow = LazyLayoutCacheWindow(ahead = 200.dp, behind = 100.dp)
// or: LazyLayoutCacheWindow(aheadFraction = 1f, behindFraction = 0.5f)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Density.calculateAheadWindow(viewport: Int)` | `Int` (member function) | `0` | Prefetch window in pixels in the scroll direction ("ahead window"); items there are prepared so they are ready when they become visible. `viewport` is the viewport size in pixels. |
| `Density.calculateBehindWindow(viewport: Int)` | `Int` (member function) | `0` | Window in pixels in the scroll-counter direction ("behind window"); items there are not disposed and can be accessed more quickly if they become visible again. |
| `ahead` | `Dp` | `0.dp` | Dp factory: size of the ahead window (converted with `roundToPx()`). |
| `behind` | `Dp` | `0.dp` | Dp factory: size of the behind window (converted with `roundToPx()`). |
| `aheadFraction` | `Float` (>= 0.0) | `0.0f` | Fraction factory: fraction of the viewport used for the ahead window (`viewport * aheadFraction`, rounded). |
| `behindFraction` | `Float` (>= 0.0) | `0.0f` | Fraction factory: fraction of the viewport used for the behind window (`viewport * behindFraction`, rounded). |

## Notes

- Annotated `@ExperimentalFoundationApi`; opt-in required.
- Package: `androidx.compose.foundation.lazy.layout`.
- The two factory functions return implementations with value-based `equals` / `hashCode` on their parameters.
- In 1.12.1 a cache window is passed through the experimental `cacheWindow: LazyLayoutCacheWindow` overload of `rememberLazyListState` / `rememberLazyGridState` (see rememberlazyliststate.md).
- Migration (pre-release): Compose Foundation 1.13.0-alpha01 makes `LazyLayoutCacheWindow` stable and deprecates providing it via `LazyGridState`; 1.13.0-alpha03 deprecates the same for `LazyListState`, in favor of providing it to the composable function (`LazyColumn` / `LazyRow`). None of this applies to stable 1.12.1.

- Source: KDoc in the Compose Foundation 1.12.1 sources jar (https://dl.google.com/android/maven2/androidx/compose/foundation/foundation-android/1.12.1/foundation-android-1.12.1-sources.jar, `commonMain/androidx/compose/foundation/lazy/layout/LazyLayoutCacheWindow.kt`); migration notes from https://developer.android.com/jetpack/androidx/releases/compose-foundation (1.13.0-alpha01 / alpha03).

## Related

- [rememberLazyListState](./rememberlazyliststate.md)
- [LazyColumn](./lazycolumn.md)
- [LazyRow](./lazyrow.md)
- [LazyListScope](./lazy-list-scope.md)
