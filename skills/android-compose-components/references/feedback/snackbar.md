# Snackbar

Implements the Material Design snackbar pattern for brief messages about app processes shown at the screen's bottom. Two overloads exist: a content-based one for custom layouts, and a `SnackbarData`-based one for use with `SnackbarHost`.

## Signature / Usage

```kotlin
@Composable
fun Snackbar(
    modifier: Modifier = Modifier,
    action: @Composable (() -> Unit)? = null,
    dismissAction: @Composable (() -> Unit)? = null,
    actionOnNewLine: Boolean = false,
    shape: Shape = SnackbarDefaults.shape,
    containerColor: Color = SnackbarDefaults.color,
    contentColor: Color = SnackbarDefaults.contentColor,
    actionContentColor: Color = SnackbarDefaults.actionContentColor,
    dismissActionContentColor: Color = SnackbarDefaults.dismissActionContentColor,
    content: @Composable () -> Unit,
)

@Composable
fun Snackbar(
    snackbarData: SnackbarData,
    modifier: Modifier = Modifier,
    actionOnNewLine: Boolean = false,
    shape: Shape = SnackbarDefaults.shape,
    containerColor: Color = SnackbarDefaults.color,
    contentColor: Color = SnackbarDefaults.contentColor,
    actionColor: Color = SnackbarDefaults.actionColor,
    actionContentColor: Color = SnackbarDefaults.actionContentColor,
    dismissActionContentColor: Color = SnackbarDefaults.dismissActionContentColor,
)
```

```kotlin
Scaffold(
    snackbarHost = { SnackbarHost(hostState = snackbarHostState) },
) { contentPadding ->
    // Screen content
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to this snackbar. |
| `action` | `@Composable (() -> Unit)?` | `null` | Action to display, typically a `TextButton`. Content-based overload only. |
| `dismissAction` | `@Composable (() -> Unit)?` | `null` | Dismiss action, typically an `IconButton`. Content-based overload only. |
| `snackbarData` | `SnackbarData` | — | Data driving message, action, and dismiss handling. Data-based overload only. |
| `actionOnNewLine` | `Boolean` | `false` | Whether `action` should be displayed on its own line. |
| `shape` | `Shape` | `SnackbarDefaults.shape` | Shape of the snackbar's container. |
| `containerColor` | `Color` | `SnackbarDefaults.color` | Background color of the container. |
| `contentColor` | `Color` | `SnackbarDefaults.contentColor` | Preferred color for content inside the snackbar. |
| `actionColor` | `Color` | `SnackbarDefaults.actionColor` | Color of the action, data-based overload only. |
| `actionContentColor` | `Color` | `SnackbarDefaults.actionContentColor` | Preferred content color for the action composable. |
| `dismissActionContentColor` | `Color` | `SnackbarDefaults.dismissActionContentColor` | Preferred content color for the dismiss action composable. |
| `content` | `@Composable () -> Unit` | — | Content displayed by this snackbar, typically `Text`. Content-based overload only. |

## Notes

- Provides visual structure only; use `SnackbarHostState.showSnackbar()` with `SnackbarHost` inside `Scaffold` for full show/hide/dismiss behavior.
- Package: `androidx.compose.material3`.

## Related

- [SnackbarHost](./snackbarhost.md)
- [SnackbarHostState](./snackbarhoststate.md)
- [SnackbarData](./snackbardata.md)
