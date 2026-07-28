# PaneAdaptedValue

Sealed interface describing the adapted state of a single pane within a `ThreePaneScaffoldValue` — whether it should be composed, and how (full size, reflowed under another pane, or levitated above).

## Signature / Usage

```kotlin
@ExperimentalMaterial3AdaptiveApi
@Stable
public sealed interface PaneAdaptedValue {
    public companion object {
        public val Expanded: PaneAdaptedValue
        public val Hidden: PaneAdaptedValue
    }

    @Immutable
    public class Reflowed(internal val reflowUnder: PaneScaffoldRole) : PaneAdaptedValue

    @Immutable
    public class Levitated(
        internal val alignment: Alignment,
        internal val scrim: (@Composable () -> Unit)? = null,
        internal val dragToResizeState: DragToResizeState? = null,
    ) : PaneAdaptedValue
}
```

```kotlin
if (navigator.scaffoldValue[SupportingPaneScaffoldRole.Supporting] == PaneAdaptedValue.Hidden) {
    Button(onClick = { scope.launch { navigator.navigateTo(SupportingPaneScaffoldRole.Supporting) } }) {
        Text("Show supporting pane")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Expanded` | `PaneAdaptedValue` | — | Pane is displayed at full width/height. |
| `Hidden` | `PaneAdaptedValue` | — | Pane is not composed/displayed. |
| `Reflowed` | `PaneAdaptedValue` | — | Pane is displayed under another pane's role (`reflowUnder`). |
| `Levitated` | `PaneAdaptedValue` | — | Pane floats above other panes with the given `alignment`, optional `scrim`, and optional `dragToResizeState`. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required.
- Read via `scaffoldValue[role]` (e.g. `navigator.scaffoldValue[SupportingPaneScaffoldRole.Supporting]`) to conditionally render UI based on whether a pane is currently visible.
- Package: `androidx.compose.material3.adaptive.layout`.

## Related

- [ThreePaneScaffoldNavigator](./three-pane-scaffold-navigator.md)
- [AnimatedPane](./animated-pane.md)
