# Canonical Layouts & Adaptive Do's and Don'ts

Conceptual guidance tying `WindowSizeClass` and the pane scaffolds together: which canonical layout pattern to pick for a given content shape, and the do's/don'ts for making an app resizable and adaptive across compact/medium/expanded windows.

## Signature / Usage

```kotlin
// List-detail: content where list items reveal independently meaningful detail
val navigator = rememberListDetailPaneScaffoldNavigator()
ListDetailPaneScaffold(
    directive = navigator.scaffoldDirective,
    value = navigator.scaffoldValue,
    listPane = { /* list of items */ },
    detailPane = { /* selected item detail */ },
)

// Supporting pane: primary content plus a pane that is only meaningful *in relation* to it
val supportingNavigator = rememberSupportingPaneScaffoldNavigator()
SupportingPaneScaffold(
    directive = supportingNavigator.scaffoldDirective,
    value = supportingNavigator.scaffoldValue,
    mainPane = { /* primary content, e.g. video player */ },
    supportingPane = { /* related videos, comments, tool palette */ },
)

// Feed: many equivalent items in a size-adaptive grid (no pane scaffold involved)
LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 180.dp)) {
    items(posts) { post -> PostCard(post) }
}
```

## Options / Props

| Canonical layout | Content shape | Scaffold | Compact/medium behavior | Expanded behavior |
| --- | --- | --- | --- | --- |
| List-detail | List items that are independently meaningful (messages, contacts, products) | `ListDetailPaneScaffold` / `NavigableListDetailPaneScaffold` | Shows list OR detail, one at a time | Shows list AND detail side-by-side |
| Supporting pane | Primary content plus a pane only meaningful in relation to it (comments, tool palette, related media) | `SupportingPaneScaffold` / `NavigableSupportingPaneScaffold` | Compact: supporting content in a sheet/below main; medium: 50/50 split | ~70% main pane / 30% supporting pane |
| Feed | Many equivalent content elements (posts, cards, media tiles) | `LazyVerticalGrid` with `GridCells.Adaptive` (no `ThreePaneScaffold`) | Single scrolling column | Multiple columns, count derived from `minSize` |

## Notes

- Choosing between list-detail and supporting pane hinges on whether the secondary pane's content stands on its own: if a user could understand it without the primary content, it is list-detail; if it only makes sense alongside the primary content, it is supporting pane.
- All canonical layouts key off `WindowSizeClass` (via `currentWindowAdaptiveInfo()`), not raw pixel/dp checks — don't hand-roll breakpoints.
- Do: keep `resizeableActivity` at its default `true`, drop manifest `screenOrientation` / `minAspectRatio` / `maxAspectRatio` restrictions, and use `WindowMetrics`/`currentWindowAdaptiveInfo()` instead of the deprecated `Display.getSize()` / `getMetrics()` / `getRealSize()` / `getRealMetrics()`.
- Don't: just stretch a compact layout with `Modifier.fillMaxWidth` to fill an expanded window — swap components instead (bottom navigation bar → `NavigationSuiteScaffold` rail, single pane → multi-pane scaffold), reposition dialogs so they stay reachable, and avoid unbounded line lengths in stretched text.
- Configuration changes from resizing, fold-posture changes, or density/font changes recreate the activity by default; persist UI state via `ViewModel` / `onSaveInstanceState` so panes don't reset.
- These patterns originate from Material Design's canonical layout guidance (m3.material.io) and are implemented for Compose by the `androidx.compose.material3.adaptive` library.

## Related

- [WindowSizeClass](./window-size-class.md)
- [ListDetailPaneScaffold](./list-detail-pane-scaffold.md)
- [SupportingPaneScaffold](./supporting-pane-scaffold.md)
- [NavigationSuiteScaffold](./navigation-suite-scaffold.md)
