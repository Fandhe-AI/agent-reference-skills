# ThreePaneScaffoldNavigator

Stable interface managing navigation state (current destination, history, and scaffold value) for `ListDetailPaneScaffold` / `SupportingPaneScaffold`. Created with `rememberListDetailPaneScaffoldNavigator` or `rememberSupportingPaneScaffoldNavigator`.

## Signature / Usage

```kotlin
@Composable
public fun <T> rememberListDetailPaneScaffoldNavigator(
    scaffoldDirective: PaneScaffoldDirective = calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2()),
    adaptStrategies: ThreePaneScaffoldAdaptStrategies = ListDetailPaneScaffoldDefaults.adaptStrategies(),
    isDestinationHistoryAware: Boolean = true,
    initialDestinationHistory: List<ThreePaneScaffoldDestinationItem<T>> = DefaultListDetailPaneHistory,
): ThreePaneScaffoldNavigator<T>

@Composable
public fun rememberListDetailPaneScaffoldNavigator(
    scaffoldDirective: PaneScaffoldDirective = calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2()),
    adaptStrategies: ThreePaneScaffoldAdaptStrategies = ListDetailPaneScaffoldDefaults.adaptStrategies(),
    isDestinationHistoryAware: Boolean = true,
): ThreePaneScaffoldNavigator<Any>

@Composable
public fun <T> rememberSupportingPaneScaffoldNavigator(
    scaffoldDirective: PaneScaffoldDirective = calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2()),
    adaptStrategies: ThreePaneScaffoldAdaptStrategies = SupportingPaneScaffoldDefaults.adaptStrategies(),
    isDestinationHistoryAware: Boolean = true,
    initialDestinationHistory: List<ThreePaneScaffoldDestinationItem<T>> = DefaultSupportingPaneHistory,
): ThreePaneScaffoldNavigator<T>

@Composable
public fun rememberSupportingPaneScaffoldNavigator(
    scaffoldDirective: PaneScaffoldDirective = calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2()),
    adaptStrategies: ThreePaneScaffoldAdaptStrategies = SupportingPaneScaffoldDefaults.adaptStrategies(),
    isDestinationHistoryAware: Boolean = true,
): ThreePaneScaffoldNavigator<Any>

// Interface members
public interface ThreePaneScaffoldNavigator<T> {
    public val scaffoldDirective: PaneScaffoldDirective
    public val scaffoldState: ThreePaneScaffoldState
    public val scaffoldValue: ThreePaneScaffoldValue
    public val currentDestination: ThreePaneScaffoldDestinationItem<T>?
    public var isDestinationHistoryAware: Boolean

    public suspend fun navigateTo(pane: ThreePaneScaffoldRole, contentKey: T? = null)
    public suspend fun navigateBack(
        backNavigationBehavior: BackNavigationBehavior = BackNavigationBehavior.PopUntilScaffoldValueChange,
    ): Boolean
    public fun canNavigateBack(
        backNavigationBehavior: BackNavigationBehavior = BackNavigationBehavior.PopUntilScaffoldValueChange,
    ): Boolean
    public suspend fun seekBack(
        backNavigationBehavior: BackNavigationBehavior = BackNavigationBehavior.PopUntilScaffoldValueChange,
        fraction: Float = 1.0f,
    )
    public fun peekPreviousScaffoldValue(
        backNavigationBehavior: BackNavigationBehavior = BackNavigationBehavior.PopUntilScaffoldValueChange,
    ): ThreePaneScaffoldValue
}
```

```kotlin
val navigator = rememberListDetailPaneScaffoldNavigator<MyItem>()
val scope = rememberCoroutineScope()

scope.launch {
    navigator.navigateTo(ListDetailPaneScaffoldRole.Detail, selectedItem)
}
scope.launch {
    navigator.navigateBack(BackNavigationBehavior.PopUntilScaffoldValueChange)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scaffoldDirective` | `PaneScaffoldDirective` | `calculatePaneScaffoldDirective(currentWindowAdaptiveInfoV2())` | How many panes to show and how to size them. |
| `adaptStrategies` | `ThreePaneScaffoldAdaptStrategies` | `ListDetailPaneScaffoldDefaults.adaptStrategies()` / `SupportingPaneScaffoldDefaults.adaptStrategies()` | How each pane adapts when hidden (hide, reflow, levitate). |
| `isDestinationHistoryAware` | `Boolean` | `true` | Whether navigation considers destination history when adapting. |
| `initialDestinationHistory` | `List<ThreePaneScaffoldDestinationItem<T>>` | library default per scaffold type | Seed navigation history for the generic (`<T>`) overload. |

## Notes

- `@ExperimentalMaterial3AdaptiveApi` `@Stable` — opt-in required. Module: `androidx.compose.material3.adaptive:adaptive-navigation`.
- The generic `<T>` overloads carry a typed `contentKey` through navigation (e.g. the selected list item); the non-generic overloads use `Any`.
- Feed `navigator.scaffoldDirective` / `navigator.scaffoldValue` directly into `ListDetailPaneScaffold` / `SupportingPaneScaffold`, or pass `navigator` straight to `NavigableListDetailPaneScaffold` / `NavigableSupportingPaneScaffold` for built-in wiring.
- Package: `androidx.compose.material3.adaptive.navigation`.

## Related

- [ListDetailPaneScaffold](./list-detail-pane-scaffold.md)
- [SupportingPaneScaffold](./supporting-pane-scaffold.md)
- [NavigableListDetailPaneScaffold](./navigable-list-detail-pane-scaffold.md)
- [BackNavigationBehavior](./back-navigation-behavior.md)
- [PaneScaffoldDirective](./pane-scaffold-directive.md)
