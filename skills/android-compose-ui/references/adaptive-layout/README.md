# adaptive-layout

| Name | Description | Path |
|------|-------------|------|
| AnimatedPane | Root composable for the content of a single pane inside a `ThreePaneScaffold`, applying default enter/exit and bounds-change motion. | [animated-pane.md](./animated-pane.md) |
| BackNavigationBehavior | Controls how `ThreePaneScaffoldNavigator.navigateBack` / `canNavigateBack` pop the destination backstack in multi-pane layouts. | [back-navigation-behavior.md](./back-navigation-behavior.md) |
| Canonical Layouts & Adaptive Do's and Don'ts | Conceptual guidance tying `WindowSizeClass` and the pane scaffolds together: which canonical layout pattern to pick for a given content shape. | [canonical-layouts.md](./canonical-layouts.md) |
| FoldingFeature | A `DisplayFeature` describing a fold or hinge on a foldable device's display, exposed via `WindowLayoutInfo`. | [folding-feature.md](./folding-feature.md) |
| ListDetailPaneScaffold | Three-pane layout implementing the canonical list-detail pattern: shows list and detail panes side by side on expanded windows. | [list-detail-pane-scaffold.md](./list-detail-pane-scaffold.md) |
| NavigableListDetailPaneScaffold | A version of `ListDetailPaneScaffold` that adds built-in navigation and predictive back handling. | [navigable-list-detail-pane-scaffold.md](./navigable-list-detail-pane-scaffold.md) |
| NavigableSupportingPaneScaffold | A version of `SupportingPaneScaffold` that adds built-in navigation and predictive back handling. | [navigable-supporting-pane-scaffold.md](./navigable-supporting-pane-scaffold.md) |
| NavigationSuiteScaffold | Scaffold that automatically swaps between a navigation bar, navigation rail, and navigation drawer based on the current window size class. | [navigation-suite-scaffold.md](./navigation-suite-scaffold.md) |
| PaneAdaptedValue | Sealed interface describing the adapted state of a single pane within a `ThreePaneScaffoldValue`. | [pane-adapted-value.md](./pane-adapted-value.md) |
| PaneScaffoldDirective | Immutable directive describing how many horizontal/vertical partitions a `ThreePaneScaffold`-based layout should use. | [pane-scaffold-directive.md](./pane-scaffold-directive.md) |
| Posture | Describes the physical folding posture of the current window, exposed as `WindowAdaptiveInfo.windowPosture`. | [posture.md](./posture.md) |
| SupportingPaneScaffold | Three-pane layout implementing the canonical supporting-pane pattern: shows a main content pane alongside a supporting pane on expanded windows. | [supporting-pane-scaffold.md](./supporting-pane-scaffold.md) |
| ThreePaneScaffoldNavigator | Stable interface managing navigation state (current destination, history, and scaffold value) for multi-pane layouts. | [three-pane-scaffold-navigator.md](./three-pane-scaffold-navigator.md) |
| currentWindowAdaptiveInfo | Composable function returning the current `WindowAdaptiveInfo` (window size class + foldable posture). | [window-adaptive-info.md](./window-adaptive-info.md) |
| WindowInfoTracker | Interface providing a `Flow` of `WindowLayoutInfo` (fold/hinge state and other display features) for an `Activity`. | [window-info-tracker.md](./window-info-tracker.md) |
| WindowSizeClass | Represents breakpoints for a viewport's width and height, used to design layouts around different window size buckets. | [window-size-class.md](./window-size-class.md) |
