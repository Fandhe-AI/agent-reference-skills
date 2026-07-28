# BackNavigationBehavior

Controls how `ThreePaneScaffoldNavigator.navigateBack` / `canNavigateBack` pop the destination backstack in multi-pane layouts.

## Signature / Usage

```kotlin
@JvmInline
public value class BackNavigationBehavior private constructor(private val description: String) {
    override fun toString(): String = this.description

    public companion object {
        public val PopLatest: BackNavigationBehavior = BackNavigationBehavior("PopLatest")

        public val PopUntilScaffoldValueChange: BackNavigationBehavior =
            BackNavigationBehavior("PopUntilScaffoldValueChange")

        public val PopUntilCurrentDestinationChange: BackNavigationBehavior =
            BackNavigationBehavior("PopUntilCurrentDestinationChange")

        public val PopUntilContentChange: BackNavigationBehavior =
            BackNavigationBehavior("PopUntilContentChange")
    }
}
```

```kotlin
scope.launch {
    navigator.navigateBack(
        backNavigationBehavior = BackNavigationBehavior.PopUntilContentChange,
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PopLatest` | `BackNavigationBehavior` | — | Pop only the latest destination from the backstack. |
| `PopUntilScaffoldValueChange` | `BackNavigationBehavior` | default for `navigateBack` / `NavigableListDetailPaneScaffold` | Pop destinations until there is a change in the scaffold value. |
| `PopUntilCurrentDestinationChange` | `BackNavigationBehavior` | — | Pop destinations until there is a change in the current destination pane. |
| `PopUntilContentChange` | `BackNavigationBehavior` | — | Pop destinations until the content key of the current destination changes, or the scaffold value changes. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required. Module: `androidx.compose.material3.adaptive:adaptive-navigation`.
- `PopLatest` and `PopUntilContentChange` can produce non-intuitive results in multi-pane layouts if the device size class changes mid-navigation, since they don't guarantee a visible layout change.
- Package: `androidx.compose.material3.adaptive.navigation`.

## Related

- [ThreePaneScaffoldNavigator](./three-pane-scaffold-navigator.md)
- [NavigableListDetailPaneScaffold](./navigable-list-detail-pane-scaffold.md)
