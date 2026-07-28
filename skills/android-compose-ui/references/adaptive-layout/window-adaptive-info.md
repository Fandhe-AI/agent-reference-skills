# currentWindowAdaptiveInfo

Composable function returning the current `WindowAdaptiveInfo` (window size class + foldable posture), used to drive adaptive layout decisions.

## Signature / Usage

```kotlin
@Composable
public fun currentWindowAdaptiveInfoV2(): WindowAdaptiveInfo

@Deprecated(
    message = "Please use V2 version of this function to support L and XL width size classes.",
    replaceWith = ReplaceWith("currentWindowAdaptiveInfoV2"),
)
@Composable
public fun currentWindowAdaptiveInfo(
    supportLargeAndXLargeWidth: Boolean = false,
): WindowAdaptiveInfo

@Immutable
public class WindowAdaptiveInfo(
    public val windowSizeClass: WindowSizeClass,
    public val windowPosture: Posture,
)
```

```kotlin
val windowSizeClass = currentWindowAdaptiveInfo().windowSizeClass
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `supportLargeAndXLargeWidth` | `Boolean` | `false` | (Deprecated overload only) Whether to also report large/extra-large width breakpoints. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required (module: `androidx.compose.material3.adaptive:adaptive`).
- `currentWindowAdaptiveInfo()` is deprecated in favor of `currentWindowAdaptiveInfoV2()`, which always supports large/extra-large width breakpoints without an opt-in flag; official guide examples still show the deprecated overload as of this writing.
- `WindowAdaptiveInfo.windowPosture` reports foldable device posture (see `Posture`), independent of `windowSizeClass`.
- Package: `androidx.compose.material3.adaptive`.

## Related

- [WindowSizeClass](./window-size-class.md)
- [PaneScaffoldDirective](./pane-scaffold-directive.md)
