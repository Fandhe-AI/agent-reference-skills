# ScrollField

An interactive, scrollable wheel for selecting a numerical value from an index range (e.g. hours/minutes), driven by `ScrollFieldState`.

## Signature / Usage

```kotlin
@Composable
public fun ScrollField(
    state: ScrollFieldState,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    colors: ScrollFieldColors = ScrollFieldDefaults.colors(),
    fieldAccessibilityDescription: (index: Int) -> String = { index -> index.toLocalString() },
    interactionSource: MutableInteractionSource? = null,
    field: @Composable (index: Int, selected: Boolean) -> Unit = { index, selected ->
        ScrollFieldDefaults.Item(index = index, selected = selected, colors = colors)
    },
)
```

```kotlin
val state = rememberScrollFieldState(itemCount = 60, index = 30)
ScrollField(
    state = state,
    contentDescription = "Minutes"
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `ScrollFieldState` | — | Created via `rememberScrollFieldState`; holds the selected index. |
| `contentDescription` | `String?` | — | Accessibility description for the overall field. |
| `modifier` | `Modifier` | `Modifier` | Applied to this scroll field. |
| `colors` | `ScrollFieldColors` | `ScrollFieldDefaults.colors()` | Resolves colors for selected/unselected items. |
| `fieldAccessibilityDescription` | `(index: Int) -> String` | `{ index -> index.toLocalString() }` | Per-item accessibility label. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `field` | `@Composable (index: Int, selected: Boolean) -> Unit` | `ScrollFieldDefaults.Item(index, selected, colors)` | Composable rendering each item in the wheel. |

## Notes

- Supports both touch drag and keyboard navigation.
- Package: `androidx.compose.material3`.

## Related

- [rememberScrollFieldState](./rememberscrollfieldstate.md)
