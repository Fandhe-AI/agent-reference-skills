# PaneScaffoldDirective

Immutable directive describing how many horizontal/vertical partitions a `ThreePaneScaffold`-based layout (`ListDetailPaneScaffold`, `SupportingPaneScaffold`) should use, their spacing/preferred size, and areas to avoid — computed from the current window size class and posture.

## Signature / Usage

```kotlin
@Immutable
public class PaneScaffoldDirective(
    public val maxHorizontalPartitions: Int,
    public val horizontalPartitionSpacerSize: Dp,
    public val maxVerticalPartitions: Int,
    public val verticalPartitionSpacerSize: Dp,
    public val defaultPanePreferredWidth: Dp,
    public val defaultPanePreferredHeight: Dp,
    public val excludedBounds: List<Rect>,
    @get:JvmName("shouldAutoFocusCurrentDestination")
    public val shouldAutoFocusCurrentDestination: Boolean,
)

@ExperimentalMaterial3AdaptiveApi
public fun calculatePaneScaffoldDirective(
    windowAdaptiveInfo: WindowAdaptiveInfo,
    verticalHingePolicy: HingePolicy = HingePolicy.AvoidSeparating,
): PaneScaffoldDirective
```

```kotlin
val navigator = rememberListDetailPaneScaffoldNavigator(
    scaffoldDirective = calculatePaneScaffoldDirective(currentWindowAdaptiveInfo()),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxHorizontalPartitions` | `Int` | — | Max number of partitions along the horizontal axis. |
| `horizontalPartitionSpacerSize` | `Dp` | — | Size of the spacers between horizontal partitions. |
| `maxVerticalPartitions` | `Int` | — | Max number of partitions along the vertical axis. |
| `verticalPartitionSpacerSize` | `Dp` | — | Size of the spacers between vertical partitions. |
| `defaultPanePreferredWidth` | `Dp` | — | Default preferred width of panes used by the scaffold. |
| `defaultPanePreferredHeight` | `Dp` | — | Default preferred height of panes used by the scaffold. |
| `excludedBounds` | `List<Rect>` | — | Bounds of areas in the window that the layout needs to avoid (e.g. a hinge). |
| `shouldAutoFocusCurrentDestination` | `Boolean` | — | If `true`, the scaffold automatically moves focus to the current destination. |
| `windowAdaptiveInfo` | `WindowAdaptiveInfo` | — | (`calculatePaneScaffoldDirective` param) Current window size class and posture, typically from `currentWindowAdaptiveInfo()`. |
| `verticalHingePolicy` | `HingePolicy` | `HingePolicy.AvoidSeparating` | (`calculatePaneScaffoldDirective` param) How a vertical hinge/fold should influence pane placement. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required.
- The default directive used by `rememberListDetailPaneScaffoldNavigator` / `rememberSupportingPaneScaffoldNavigator` is `calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2())`.
- Compact window size classes typically resolve to a single-pane directive (`maxHorizontalPartitions = 1`); expanded (and larger) classes resolve to a two- or three-pane directive.
- Package: `androidx.compose.material3.adaptive.layout`.

## Related

- [ListDetailPaneScaffold](./list-detail-pane-scaffold.md)
- [SupportingPaneScaffold](./supporting-pane-scaffold.md)
- [ThreePaneScaffoldNavigator](./three-pane-scaffold-navigator.md)
