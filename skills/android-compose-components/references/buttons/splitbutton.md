# SplitButton

Layout component that groups two buttons: a leading button for the primary action and a trailing button for a secondary, contextually-related action (e.g. opening a dropdown menu).

## Signature / Usage

```kotlin
@Composable
fun SplitButton(
    leadingButton: @Composable () -> Unit,
    trailingButton: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    spacing: Dp = SplitButtonDefaults.Spacing,
)
```

```kotlin
SplitButton(
    leadingButton = {
        SplitButtonDefaults.LeadingButton(onClick = { /* primary action */ }) {
            Text("Split Button")
        }
    },
    trailingButton = {
        SplitButtonDefaults.TrailingButton(
            checked = expanded,
            onCheckedChange = { expanded = it },
        ) {
            Icon(Icons.Filled.ArrowDropDown, contentDescription = null)
        }
    },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `leadingButton` | `@Composable () -> Unit` | — | Leading button content. May be a custom composable or built with `SplitButtonDefaults.LeadingButton`. |
| `trailingButton` | `@Composable () -> Unit` | — | Trailing button content. May be a custom composable or built with `SplitButtonDefaults.TrailingButton`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this split button container. |
| `spacing` | `Dp` | `SplitButtonDefaults.Spacing` | Horizontal distance separating the leading and trailing buttons. |

## Notes

- `SplitButtonDefaults` provides pre-built style variants for each slot: `LeadingButton`/`TrailingButton` (filled), `TonalLeadingButton`/`TonalTrailingButton`, `OutlinedLeadingButton`/`OutlinedTrailingButton`, `ElevatedLeadingButton`/`ElevatedTrailingButton`.
- Not experimental — no `@ExperimentalMaterial3Api` / `@ExperimentalMaterial3ExpressiveApi` annotation on the public `SplitButton` composable.
- Package: `androidx.compose.material3`.

## Related

- [Button](./button.md)
