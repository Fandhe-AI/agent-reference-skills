# SnackbarData

Data types passed through `SnackbarHost`: `SnackbarData` encapsulates one snackbar instance, `SnackbarVisuals` describes its content, `SnackbarResult` reports how it was dismissed, and `SnackbarDuration` configures how long it stays visible.

## Signature / Usage

```kotlin
@Stable
interface SnackbarData {
    val visuals: SnackbarVisuals
    fun performAction()
    fun dismiss()
}

@Stable
interface SnackbarVisuals {
    val message: String
    val actionLabel: String?
    val withDismissAction: Boolean
    val duration: SnackbarDuration
}

enum class SnackbarResult {
    Dismissed,
    ActionPerformed,
}

enum class SnackbarDuration {
    Short,
    Long,
    Indefinite,
}
```

```kotlin
SnackbarHost(hostState = snackbarHostState) { data ->
    Snackbar(
        snackbarData = data,
        actionOnNewLine = true,
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `visuals` | `SnackbarVisuals` | — | Visual configuration of the snackbar. |
| `message` | `String` | — | Main text shown in the snackbar. |
| `actionLabel` | `String?` | `null` | Optional label for the action button. |
| `withDismissAction` | `Boolean` | `false` | Whether a dismiss action is shown. |
| `duration` | `SnackbarDuration` | — | `Short`, `Long`, or `Indefinite` display duration. |

## Notes

- `performAction()` / `dismiss()` are called by `Snackbar` internally when the user interacts; `SnackbarResult.ActionPerformed` / `Dismissed` are what `SnackbarHostState.showSnackbar()` returns.
- Package: `androidx.compose.material3`.

## Related

- [SnackbarHostState](./snackbarhoststate.md)
- [SnackbarHost](./snackbarhost.md)
- [Snackbar](./snackbar.md)
