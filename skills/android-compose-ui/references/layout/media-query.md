# mediaQuery / derivedMediaQuery / UiMediaScope

Experimental, declarative API for adapting UI to its environment (window size, foldable posture, keyboard, pointer precision, camera/microphone availability, viewing distance), evaluated inside a `UiMediaScope` receiver so recomposition happens only when the queried signal actually changes.

## Signature / Usage

```kotlin
@Composable
fun mediaQuery(query: UiMediaScope.() -> Boolean): Boolean

@Composable
fun <T> derivedMediaQuery(query: UiMediaScope.() -> T): State<T>

val LocalUiMediaScope: ProvidableCompositionLocal<UiMediaScope>
```

```kotlin
// enable the experimental flag once, e.g. in Application.onCreate()
ComposeUiFlags.isMediaQueryIntegrationEnabled = true

@Composable
fun VideoPlayer() {
    if (mediaQuery { windowPosture == UiMediaScope.Posture.Tabletop }) {
        TabletopLayout()
    } else {
        FlatLayout()
    }
}

// prefer derivedMediaQuery for frequently-changing signals like window size
val narrowerThanMedium by derivedMediaQuery {
    windowWidth < WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND.dp
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UiMediaScope.windowWidth` / `windowHeight` | `Dp` | Current window size; updates frequently, use `derivedMediaQuery`. |
| `UiMediaScope.windowPosture` | `UiMediaScope.Posture` (`Tabletop`, `Book`, `Flat`) | Current foldable device posture. |
| `UiMediaScope.pointerPrecision` | `UiMediaScope.PointerPrecision` (`Fine`, `Coarse`, `Blunt`, `None`) | Highest precision among available pointing devices. |
| `UiMediaScope.keyboardKind` | `UiMediaScope.KeyboardKind` (`Physical`, `Virtual`, `None`) | Type of the available keyboard; physical takes precedence over virtual. |
| `UiMediaScope.hasCamera` / `hasMicrophone` | `Boolean` | Whether the device exposes a camera / microphone. |
| `UiMediaScope.viewingDistance` | `UiMediaScope.ViewingDistance` (`Near`, `Medium`, `Far`) | Estimated distance between user and screen. |

## Notes

- Experimental API guarded by `ComposeUiFlags.isMediaQueryIntegrationEnabled`; must be set to `true` before use (e.g. in `Application.onCreate()`), subject to change.
- Use `derivedMediaQuery` instead of `mediaQuery` for high-frequency signals (`windowWidth`, `windowHeight`) — it wraps the result in `derivedStateOf` so recomposition is skipped unless the derived boolean/value actually flips.
- `UiMediaScope` is sourced from `LocalUiMediaScope.current` and updates dynamically as device state changes.
- For Preview/testing, override `LocalUiMediaScope` with a `CompositionLocalProvider` wrapping an object that delegates to the current scope via `by currentUiMediaScope` and overrides individual properties (e.g. forcing `windowPosture = UiMediaScope.Posture.Tabletop`).
- Complements `WindowSizeClass`-based adaptive layout: window-size queries are typically expressed against `WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND` / `WIDTH_DP_EXPANDED_LOWER_BOUND` breakpoints rather than raw pixel thresholds.
- Package: `androidx.compose.ui`.

## Related

- [BoxWithConstraints](./boxwithconstraints.md)
- [Styles API](./styles.md)
