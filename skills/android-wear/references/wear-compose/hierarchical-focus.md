# HierarchicalFocus

`Modifier.hierarchicalFocusGroup` marks which branch of a composition is currently "active" (e.g. the current page of a custom pager, or the selected tab), forming a focus tree so that `Modifier.requestFocusOnHierarchyActive()` on a focusable descendant (typically a `rotaryScrollable`) automatically requests focus when its branch becomes active. Most built-in components (`BasicSwipeToDismissBox`, `HorizontalPager`/`VerticalPager`, `PickerGroup`) already wire this up — use it directly only when building a custom component that must direct focus to one of several children.

## Signature / Usage

```kotlin
public fun Modifier.hierarchicalFocusGroup(active: Boolean): Modifier
```

```kotlin
public fun Modifier.requestFocusOnHierarchyActive(): Modifier
```

```kotlin
@Composable
fun CustomTabLayout(selectedTab: Int, tabs: List<@Composable () -> Unit>) {
    tabs.forEachIndexed { index, tabContent ->
        Box(Modifier.hierarchicalFocusGroup(active = index == selectedTab)) {
            if (index == selectedTab) tabContent()
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `active` (`hierarchicalFocusGroup`) | `Boolean` | — | Whether this subtree is the currently active branch of the focus tree. Among sibling focus groups, only one should be `true` at a time. |

## Notes

- Place `Modifier.requestFocusOnHierarchyActive()` directly before the actual focusable element in the modifier chain (usually a `rotaryScrollable`); `ScalingLazyColumn` / `TransformingLazyColumn` already apply it internally.
- The older `HierarchicalFocusCoordinator(requiresFocus, content)` composable and `rememberActiveFocusRequester()` are deprecated in favor of `Modifier.hierarchicalFocusGroup` / `Modifier.requestFocusOnHierarchyActive()`.
- Don't combine with manual `FocusRequester.requestFocus()` calls inside a `LaunchedEffect` — the two mechanisms conflict.
- Package: `androidx.wear.compose.foundation` (artifact `androidx.wear.compose:compose-foundation`).

## Related

- [HorizontalPager / VerticalPager (Wear)](./pager.md)
- [Rotary input](./rotary-input.md)
