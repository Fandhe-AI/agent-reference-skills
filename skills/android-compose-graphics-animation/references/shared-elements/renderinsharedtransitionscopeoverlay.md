# Modifier.renderInSharedTransitionScopeOverlay

Renders a composable in the shared transition overlay (above the rest of the UI) for the duration of a transition, independent of any `sharedElement`/`sharedBounds` matching. Useful for keeping persistent UI, like a bottom bar or FAB, visually on top while other elements transform underneath.

## Signature / Usage

```kotlin
fun Modifier.renderInSharedTransitionScopeOverlay(
    zIndexInOverlay: Float = 0f,
    renderInOverlay: () -> Boolean = { isTransitionActive },
): Modifier
```

```kotlin
JetsnackBottomBar(
    modifier = Modifier
        .renderInSharedTransitionScopeOverlay(zIndexInOverlay = 1f)
        .animateEnterExit(
            enter = fadeIn() + slideInVertically { it },
            exit = fadeOut() + slideOutVertically { it }
        )
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `zIndexInOverlay` | `Float` | `0f` | Layering order relative to other content rendered in the overlay (including shared elements). |
| `renderInOverlay` | `() -> Boolean` | `{ isTransitionActive }` | Predicate controlling whether the element is currently rendered in the overlay. |

## Notes

- `@ExperimentalSharedTransitionApi`. Must be called on a `SharedTransitionScope` receiver (i.e. within `SharedTransitionLayout` content or `with(sharedTransitionScope) { ... }`).
- Combine with `Modifier.animateEnterExit()` to animate the element's own enter/exit while it stays above transforming shared elements.
- Package: `androidx.compose.animation` (member of `SharedTransitionScope`).

## Related

- [SharedTransitionScope](./sharedtransitionscope.md)
- [OverlayClip](./overlayclip.md)
- [Modifier.sharedElement](./sharedelement.md)
