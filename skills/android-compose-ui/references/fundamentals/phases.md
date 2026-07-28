# Phases of Compose

Compose renders each frame through three phases: **Composition** (what UI to show), **Layout** (where to place it — measurement then placement), and **Drawing** (how it renders). Reading state in the latest phase that needs it minimizes the work triggered by a state change.

## Signature / Usage

```kotlin
// Composition-phase read: every scroll event reruns composition, layout, and drawing.
Image(
    Modifier.offset(
        with(LocalDensity.current) {
            (listState.firstVisibleItemScrollOffset / 2).toDp()
        }
    )
)

// Layout-phase read (deferred lambda): only layout and drawing rerun.
Image(
    Modifier.offset {
        IntOffset(x = 0, y = listState.firstVisibleItemScrollOffset / 2)
    }
)
```

## Notes

- Composition executes composable functions and builds the UI tree; state reads here trigger a full recomposition when their value changes.
- Layout has two independent restart scopes: measurement (a node measures children and decides its own size) and placement (a node places children at x,y); the tree is traversed once per step in linear time.
- Drawing traverses the tree top-to-bottom and paints each node; state reads here (`Canvas`, `drawBehind`, `drawWithContent`) only trigger redrawing, not recomposition.
- Deferring a state read into a layout/placement lambda (e.g. `Modifier.offset { ... }`) or a drawing lambda skips the more expensive earlier phases on every update — read state in the latest phase where it is actually needed.
- Avoid using layout callbacks (e.g. `onSizeChanged`) to update state that is then read back in a layout modifier of a sibling — this creates a multi-frame recomposition loop and visible UI jump. Prefer a layout primitive (`Column`) or a custom layout with a single source of truth instead.
- Package: `androidx.compose.ui`.

## Related

- [Recomposition](./recomposition.md)
- [Modifier](./modifier.md)
