# FoldingFeature

A `DisplayFeature` describing a fold or hinge on a foldable device's display, exposed via `WindowLayoutInfo`.

## Signature / Usage

```kotlin
public interface FoldingFeature : DisplayFeature {
    // bounds: Rect is inherited from DisplayFeature
    public val isSeparating: Boolean
    public val occlusionType: OcclusionType
    public val orientation: Orientation
    public val state: State

    public class OcclusionType private constructor(private val description: String) {
        public companion object {
            @JvmField public val NONE: OcclusionType = OcclusionType("NONE")
            @JvmField public val FULL: OcclusionType = OcclusionType("FULL")
        }
    }

    public class Orientation private constructor(private val description: String) {
        public companion object {
            @JvmField public val VERTICAL: Orientation = Orientation("VERTICAL")
            @JvmField public val HORIZONTAL: Orientation = Orientation("HORIZONTAL")
        }
    }

    public class State private constructor(private val description: String) {
        public companion object {
            @JvmField public val FLAT: State = State("FLAT")
            @JvmField public val HALF_OPENED: State = State("HALF_OPENED")
        }
    }
}
```

```kotlin
fun isTableTopPosture(foldFeature: FoldingFeature?): Boolean {
    return foldFeature?.state == FoldingFeature.State.HALF_OPENED &&
        foldFeature.orientation == FoldingFeature.Orientation.HORIZONTAL
}

fun isBookPosture(foldFeature: FoldingFeature?): Boolean {
    return foldFeature?.state == FoldingFeature.State.HALF_OPENED &&
        foldFeature.orientation == FoldingFeature.Orientation.VERTICAL
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `bounds` | `Rect` | — | (Inherited from `DisplayFeature`.) Bounding rectangle of the fold/hinge within the window. |
| `isSeparating` | `Boolean` | — | Whether the feature splits the window into distinct physical display areas. |
| `occlusionType` | `OcclusionType` | — | `NONE` if content stays visible under the fold, `FULL` if occluded. |
| `orientation` | `Orientation` | — | `HORIZONTAL` if width > height, else `VERTICAL`. |
| `state` | `State` | — | `FLAT` (fully open) or `HALF_OPENED` (hinge at an angle). |

## Notes

- Used from both Compose and View-based Android UIs, not a Compose-only API.
- Obtained from `WindowLayoutInfo.displayFeatures` filtered with `filterIsInstance<FoldingFeature>()`.
- Combine `state == HALF_OPENED` with `orientation` to detect "book" (vertical hinge) vs "tabletop" (horizontal hinge) postures.
- `OcclusionType`, `Orientation`, and `State` are plain classes with a private constructor and `@JvmField` companion constants, not Kotlin `enum class`es.
- Package: `androidx.window.layout`; module: `androidx.window:window`.

## Related

- [WindowInfoTracker](./window-info-tracker.md)
