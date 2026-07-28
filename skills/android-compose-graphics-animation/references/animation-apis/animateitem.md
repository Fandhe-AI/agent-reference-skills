# Modifier.animateItem

Modifier for items inside `LazyColumn` / `LazyRow` / `LazyVerticalGrid` / `LazyHorizontalGrid` (and staggered grids) that animates appearance (fade in), disappearance (fade out), and reordering (placement).

## Signature / Usage

```kotlin
fun Modifier.animateItem(
    fadeInSpec: FiniteAnimationSpec<Float>? = spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = Spring.DefaultDisplacementThreshold),
    placementSpec: FiniteAnimationSpec<IntOffset>? = spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntOffset.VisibilityThreshold),
    fadeOutSpec: FiniteAnimationSpec<Float>? = spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = Spring.DefaultDisplacementThreshold),
): Modifier
```

```kotlin
LazyColumn {
    // A stable key is required for animateItem() to correctly track items.
    items(books, key = { it.id }) { book ->
        Row(Modifier.animateItem()) {
            Text(book.title)
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fadeInSpec` | `FiniteAnimationSpec<Float>?` | `spring(...)` | Animation used when the item appears; `null` disables the fade-in. |
| `placementSpec` | `FiniteAnimationSpec<IntOffset>?` | `spring(...)` | Animation used when the item's position changes (reordering); `null` disables placement animation. |
| `fadeOutSpec` | `FiniteAnimationSpec<Float>?` | `spring(...)` | Animation used when the item is removed; `null` disables the fade-out. |

## Notes

- Requires a stable `key` on each item (via `items(items, key = { ... })`); without a key, `animateItem()` cannot correctly track item identity across recompositions.
- Animations only play on insertion/removal/reorder — not while the list is simply scrolling.
- Supersedes the deprecated `Modifier.animateItemPlacement()`, which only animated placement.
- Package: `androidx.compose.foundation.lazy`.

## Related

- [Transition](./transition.md)
