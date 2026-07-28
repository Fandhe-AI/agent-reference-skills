# Modifier.skipToLookaheadSize

Reports the final (lookahead) size of a composable immediately, instead of the size at the current point in the animation. Used to prevent text reflow or layout jumps of ancestors while a shared element transition is in progress.

## Signature / Usage

```kotlin
fun Modifier.skipToLookaheadSize(enabled: () -> Boolean = { isTransitionActive }): Modifier
fun Modifier.skipToLookahedPosition(enabled: () -> Boolean = { isTransitionActive }): Modifier
```

```kotlin
Text(
    text = title,
    modifier = Modifier.skipToLookaheadSize()
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `() -> Boolean` | `{ isTransitionActive }` | Whether the modifier is active; when disabled, normal (animated) sizing/position is used. |

## Notes

- `@ExperimentalSharedTransitionApi`. Must be called on a `SharedTransitionScope` receiver.
- This is an exception to normal modifier-ordering guidance: it affects how the element reports size to its parent for layout purposes, independent of chain order relative to other size modifiers.
- Primarily used to keep sibling text/layout from reflowing while an ancestor's bounds are still animating.
- `skipToLookahedPosition` is the position-only counterpart, reporting the final layout position immediately.
- Package: `androidx.compose.animation` (member of `SharedTransitionScope`).

## Related

- [SharedTransitionScope](./sharedtransitionscope.md)
- [Modifier.sharedBounds](./sharedbounds.md)
