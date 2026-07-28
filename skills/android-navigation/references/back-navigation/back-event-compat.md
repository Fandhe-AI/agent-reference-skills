# BackEventCompat

Compat data class describing an in-progress predictive back gesture: touch position, progress, and swipe edge. Emitted by `PredictiveBackHandler`'s `Flow` and passed to `OnBackPressedCallback.handleOnBackStarted/Progressed`.

## Signature / Usage

```kotlin
public class BackEventCompat
constructor(
    public val touchX: Float,
    public val touchY: Float,
    @FloatRange(from = 0.0, to = 1.0) public val progress: Float,
    public val swipeEdge: @SwipeEdge Int,
    public val frameTimeMillis: Long = 0,
) {
    public companion object {
        public const val EDGE_LEFT: Int = 0
        public const val EDGE_RIGHT: Int = 1
        public const val EDGE_NONE: Int = 2
    }

    @RequiresApi(34)
    public fun toBackEvent(): BackEvent

    public fun toNavigationEvent(): NavigationEvent
}
```

```kotlin
PredictiveBackHandler { progress ->
    progress.collect { backEvent: BackEventCompat ->
        scale = 1f - backEvent.progress
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `touchX` | `Float` | — | Absolute X of the touch point, in the coordinate space of the view that received the event. |
| `touchY` | `Float` | — | Absolute Y of the touch point, in the coordinate space of the view that received the event. |
| `progress` | `Float` (0.0–1.0) | — | How far along the back gesture is. |
| `swipeEdge` | `Int` (`EDGE_LEFT` / `EDGE_RIGHT` / `EDGE_NONE`) | — | Edge the swipe started from. |
| `frameTimeMillis` | `Long` | `0` | Frame time associated with the event. |

## Notes

- Package: `androidx.activity`. Backward-compatible wrapper around the platform `android.window.BackEvent` (API 34+), usable on all supported API levels via `PredictiveBackHandler` / `OnBackPressedCallback`.
- `toBackEvent()` requires API 34+; `toNavigationEvent()` bridges to the newer `NavigationEvent` type.

## Related

- [PredictiveBackHandler](./predictive-back-handler.md)
- [OnBackPressedCallback](./on-back-pressed-callback.md)
- [Predictive back animations](./predictive-back-animations.md)
