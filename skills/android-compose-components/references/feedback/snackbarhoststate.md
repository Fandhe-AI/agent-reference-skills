# SnackbarHostState

State manager for `SnackbarHost`. Guarantees at most one snackbar is shown at a time and controls the queue via its `showSnackbar` suspend functions.

## Signature / Usage

```kotlin
class SnackbarHostState {
    val currentSnackbarData: SnackbarData?

    suspend fun showSnackbar(
        message: String,
        actionLabel: String? = null,
        withDismissAction: Boolean = false,
        duration: SnackbarDuration =
            if (actionLabel == null) SnackbarDuration.Short else SnackbarDuration.Indefinite,
    ): SnackbarResult

    suspend fun showSnackbar(visuals: SnackbarVisuals): SnackbarResult
}
```

```kotlin
val scope = rememberCoroutineScope()
val snackbarHostState = remember { SnackbarHostState() }

scope.launch {
    val result = snackbarHostState.showSnackbar(
        message = "Snackbar",
        actionLabel = "Action",
        duration = SnackbarDuration.Indefinite,
    )
    when (result) {
        SnackbarResult.ActionPerformed -> { /* handle action */ }
        SnackbarResult.Dismissed -> { /* handle dismissal */ }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `currentSnackbarData` | `SnackbarData?` | — | The snackbar currently being shown, if any. |
| `message` | `String` | — | Main snackbar text (first `showSnackbar` overload). |
| `actionLabel` | `String?` | `null` | Optional action button label. |
| `withDismissAction` | `Boolean` | `false` | Whether to show a dismiss action. |
| `duration` | `SnackbarDuration` | `Short` unless `actionLabel` set, then `Indefinite` | How long to display the snackbar. |
| `visuals` | `SnackbarVisuals` | — | Alternative to the discrete parameters, for finer queue control (second overload). |

## Notes

- `showSnackbar` suspends until the snackbar is dismissed or its action is performed; call from `rememberCoroutineScope()`.
- Create with `remember { SnackbarHostState() }`.
- Package: `androidx.compose.material3`.

## Related

- [SnackbarHost](./snackbarhost.md)
- [SnackbarData](./snackbardata.md)
