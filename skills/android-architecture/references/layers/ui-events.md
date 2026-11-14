# UI Events

UI events are actions handled in the UI layer, most commonly user events produced by user interaction. Each event is either handled directly by the UI (UI logic) or delegated to the state holder (business logic), and ViewModel-originated events always result in a UI state update.

## Signature / Usage

```kotlin
@Composable
fun LatestNewsScreen(viewModel: LatestNewsViewModel = viewModel()) {
    var expanded by remember { mutableStateOf(false) }

    Column {
        // UI logic: handled directly in the UI
        Button(onClick = { expanded = !expanded }) {
            Text(if (expanded) "Collapse" else "Expand")
        }

        // Business logic: delegated to the ViewModel
        Button(onClick = { viewModel.refreshNews() }) {
            Text("Refresh data")
        }
    }
}
```

```kotlin
@Composable
fun LoginScreen(
    onHelp: () -> Unit, // Caller navigates to the help screen
    viewModel: LoginViewModel = viewModel()
) {
    // Rest of the UI
    Button(
        onClick = dropUnlessResumed { onHelp() }
    ) {
        Text("Get help")
    }
}
```

## Notes

- Decision tree: event from ViewModel → update UI state; event from UI needing business logic → delegate to ViewModel; event from UI needing only UI logic → modify UI element state directly.
- Naming convention for event callbacks: `on` + verb + target (e.g. `onExpandClicked`, `onValueChange`).
- Don't pass a ViewModel into list item composables; expose an `onItemClick: (Item) -> Unit` callback instead and let the caller invoke the ViewModel.
- Avoid event buses (`Channel`, reactive one-off streams) in ViewModels — they don't guarantee delivery when the producer outlives the consumer; model transient messages (e.g. Snackbar text) as UI state and have the UI notify the ViewModel once shown.
- Frame problems as "how does this event affect UI state?" rather than "what actions does the UI perform?" — keeps events reproducible after configuration change / process death.
- Navigation events triggered by a tap are exposed to the caller composable as a callback (`onHelp`); wrapping the click in `dropUnlessResumed { }` (Lifecycle library) runs the callback only while the lifecycle is at least `RESUMED`.
- Source: https://developer.android.com/topic/architecture/ui-layer/events (fetched 2026-11-14).

## Related

- [ui-layer](./ui-layer.md)
- [ui-state-holders](./ui-state-holders.md)
- [ui-state-production](./ui-state-production.md)
