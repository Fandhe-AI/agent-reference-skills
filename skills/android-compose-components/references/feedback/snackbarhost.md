# SnackbarHost

Host for snackbars to be used in `Scaffold`'s `snackbarHost` slot to properly show, hide, and dismiss items, following Material spec and the given `SnackbarHostState`.

## Signature / Usage

```kotlin
@Composable
fun SnackbarHost(
    hostState: SnackbarHostState,
    modifier: Modifier = Modifier,
    snackbar: @Composable (SnackbarData) -> Unit = { Snackbar(it) },
)
```

```kotlin
val snackbarHostState = remember { SnackbarHostState() }

Scaffold(
    snackbarHost = { SnackbarHost(hostState = snackbarHostState) },
) { contentPadding ->
    // Screen content
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `hostState` | `SnackbarHostState` | — | State that controls which snackbar is currently displayed. |
| `modifier` | `Modifier` | `Modifier` | Applied to this snackbar host. |
| `snackbar` | `@Composable (SnackbarData) -> Unit` | `{ Snackbar(it) }` | Composable used to render each snackbar; override for custom appearance. |

## Notes

- Typically passed to `Scaffold(snackbarHost = { ... })`.
- Package: `androidx.compose.material3`.

## Related

- [Snackbar](./snackbar.md)
- [SnackbarHostState](./snackbarhoststate.md)
