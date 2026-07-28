# adaptive-layout

| Name | Description | Path |
|------|-------------|------|
| WindowSizeClass | Breakpoints for a viewport's width and height (compact/medium/expanded/large/extra-large). | [window-size-class.md](./window-size-class.md) |
| currentWindowAdaptiveInfo | Composable returning the current window size class and foldable posture. | [window-adaptive-info.md](./window-adaptive-info.md) |
| Posture | Physical folding posture of the current window, part of `WindowAdaptiveInfo`. | [posture.md](./posture.md) |
| PaneScaffoldDirective | Directive computing how many panes to show and how to arrange them. | [pane-scaffold-directive.md](./pane-scaffold-directive.md) |
| ListDetailPaneScaffold | Three-pane list-detail canonical layout. | [list-detail-pane-scaffold.md](./list-detail-pane-scaffold.md) |
| NavigableListDetailPaneScaffold | `ListDetailPaneScaffold` with built-in navigation and predictive back. | [navigable-list-detail-pane-scaffold.md](./navigable-list-detail-pane-scaffold.md) |
| SupportingPaneScaffold | Three-pane supporting-pane canonical layout. | [supporting-pane-scaffold.md](./supporting-pane-scaffold.md) |
| NavigableSupportingPaneScaffold | `SupportingPaneScaffold` with built-in navigation and predictive back. | [navigable-supporting-pane-scaffold.md](./navigable-supporting-pane-scaffold.md) |
| ThreePaneScaffoldNavigator | Navigator interface + `rememberListDetailPaneScaffoldNavigator` / `rememberSupportingPaneScaffoldNavigator`. | [three-pane-scaffold-navigator.md](./three-pane-scaffold-navigator.md) |
| BackNavigationBehavior | Controls how `navigateBack` pops the pane destination backstack. | [back-navigation-behavior.md](./back-navigation-behavior.md) |
| AnimatedPane | Root pane content composable with default switch/resize motion. | [animated-pane.md](./animated-pane.md) |
| PaneAdaptedValue | Adapted state of a pane: Expanded, Hidden, Reflowed, or Levitated. | [pane-adapted-value.md](./pane-adapted-value.md) |
| NavigationSuiteScaffold | Adaptive scaffold switching between navigation bar/rail/drawer. | [navigation-suite-scaffold.md](./navigation-suite-scaffold.md) |
| FoldingFeature | Fold/hinge display feature of a foldable device. | [folding-feature.md](./folding-feature.md) |
| WindowInfoTracker | Flow-based tracker for `WindowLayoutInfo` (fold state) per Activity. | [window-info-tracker.md](./window-info-tracker.md) |
