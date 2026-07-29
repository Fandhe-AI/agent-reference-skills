# Expandable

Animated expand/collapse of content driven by an `ExpandableState`: either a variable number of `ScalingLazyColumn` items (`expandableItems`) or a single item's content (`expandableItem`), typically toggled by an `expandableButton` ("Show more" / "Show less").

## Signature / Usage

```kotlin
@Composable
public fun rememberExpandableState(
    initiallyExpanded: Boolean = false,
    expandAnimationSpec: AnimationSpec<Float> = ExpandableItemsDefaults.expandAnimationSpec,
    collapseAnimationSpec: AnimationSpec<Float> = ExpandableItemsDefaults.collapseAnimationSpec,
): ExpandableState
```

```kotlin
public fun ScalingLazyListScope.expandableItems(
    state: ExpandableState,
    count: Int,
    key: ((index: Int) -> Any)? = null,
    itemContent: @Composable BoxScope.(index: Int) -> Unit,
)
```

```kotlin
val expandableState = rememberExpandableState()

ScalingLazyColumn {
    expandableItems(state = expandableState, count = items.size) { index ->
        Text(items[index])
    }
    expandableButton(state = expandableState) {
        Text(if (expandableState.expanded) "Show less" else "Show more")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initiallyExpanded` | `Boolean` | `false` | Starting expanded/collapsed state. |
| `expandAnimationSpec` / `collapseAnimationSpec` | `AnimationSpec<Float>` | `ExpandableItemsDefaults.expandAnimationSpec` / `collapseAnimationSpec` | Animation used when revealing/hiding the extra content. |
| `state` (expandableItems/expandableItem/expandableButton) | `ExpandableState` | — | Shared state controlling whether the item(s) are shown; toggle via `state.expanded = !state.expanded`. |
| `count` (expandableItems) | `Int` | — | Number of items to show when expanded. |

## Notes

- `expandableItem` (singular) expands/collapses one item's content in place instead of adding/removing a variable count of items.
- `rememberExpandableStateMapping<T>()` (marked `@ExperimentalWearFoundationApi`) manages a keyed collection of `ExpandableState`s, for a variable number of independently expandable sections (e.g. one per `ScalingLazyColumn` group).
- All of `expandableItems` / `expandableItem` / `expandableButton` are extension functions on `ScalingLazyListScope`, so they're only usable inside a `ScalingLazyColumn { ... }` block.
- Package: `androidx.wear.compose.foundation` (artifact `androidx.wear.compose:compose-foundation`).

## Related

- [TransformingLazyColumn / ScalingLazyColumn](./lists.md)
