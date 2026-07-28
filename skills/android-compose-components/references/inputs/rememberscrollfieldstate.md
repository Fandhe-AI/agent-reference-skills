# rememberScrollFieldState

Creates and remembers a `ScrollFieldState` for use with `ScrollField`, tracking the selected index across recompositions.

## Signature / Usage

```kotlin
@Composable
public fun rememberScrollFieldState(
    itemCount: Int,
    index: Int = 0,
): ScrollFieldState
```

```kotlin
val state = rememberScrollFieldState(itemCount = 60, index = 30)
ScrollField(state = state, contentDescription = "Minutes")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `itemCount` | `Int` | — | Total number of selectable items in the wheel. |
| `index` | `Int` | `0` | Initially selected index. |

## Notes

- Returns a `ScrollFieldState` holding the currently selected index.
- Package: `androidx.compose.material3`.

## Related

- [ScrollField](./scrollfield.md)
