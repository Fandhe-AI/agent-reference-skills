# WindowInfoTracker

Interface providing a `Flow` of `WindowLayoutInfo` (fold/hinge state and other display features) for an `Activity`.

## Signature / Usage

```kotlin
public interface WindowInfoTracker {
    public fun windowLayoutInfo(activity: Activity): Flow<WindowLayoutInfo>

    public companion object {
        @JvmStatic
        public fun getOrCreate(context: Context): WindowInfoTracker
    }
}

public class WindowLayoutInfo(
    public val displayFeatures: List<DisplayFeature>,
)
```

```kotlin
class DisplayFeaturesActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        lifecycleScope.launch(Dispatchers.Main) {
            lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
                WindowInfoTracker.getOrCreate(this@DisplayFeaturesActivity)
                    .windowLayoutInfo(this@DisplayFeaturesActivity)
                    .collect { layoutInfo ->
                        val foldingFeature = layoutInfo.displayFeatures
                            .filterIsInstance<FoldingFeature>()
                            .firstOrNull()
                    }
            }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `windowLayoutInfo(activity)` | `(Activity) -> Flow<WindowLayoutInfo>` | — | Stream of layout info; first emission occurs only after `Activity.onStart()` completes. |
| `getOrCreate(context)` | `(Context) -> WindowInfoTracker` | — | Returns a `WindowInfoTracker` instance, safe to retain globally. |
| `displayFeatures` | `List<DisplayFeature>` | — | (`WindowLayoutInfo` property) Display features (e.g. `FoldingFeature`) intersecting the current window bounds. |

## Notes

- Used from both Compose and View-based Android UIs, not a Compose-only API.
- Do not retain the `Flow` across Activity recreation; re-collect from the new Activity instance to avoid leaks or stale values.
- On Android 15+ with `WindowSdkExtensions` version 6+, `WindowInfoTracker.getOrCreate(context).supportedPostures` reports device-supported postures (e.g. `SupportedPosture.TABLETOP`).
- Package: `androidx.window.layout`; module: `androidx.window:window` (Java callbacks via `androidx.window:window-java`, RxJava via `window-rxjava2`/`window-rxjava3`).

## Related

- [FoldingFeature](./folding-feature.md)
