# Custom Modifiers (Modifier.Node)

`Modifier.Node` is the low-level, high-performance API for authoring custom modifiers — the same API Compose's own built-in modifiers are implemented with. `composed {}` is no longer recommended due to the performance issues it created; a `Modifier.Node` instance survives across recompositions and is updated in place instead of being recreated, avoiding per-frame allocation and recomposition overhead.

## Signature / Usage

```kotlin
// 1. Modifier.Node — holds state/logic, survives recompositions.
private class CircleNode(var color: Color) : Modifier.Node(), DrawModifierNode {
    override fun ContentDrawScope.draw() {
        drawCircle(color)
        drawContent()
    }
}

// 2. ModifierNodeElement — immutable, creates/updates the node.
private data class CircleElement(val color: Color) : ModifierNodeElement<CircleNode>() {
    override fun create() = CircleNode(color)
    override fun update(node: CircleNode) {
        node.color = color
    }
}

// 3. Modifier factory — the public API.
fun Modifier.circle(color: Color) = this then CircleElement(color)
```

## Options / Props

| Node interface | Role |
| --- | --- |
| `LayoutModifierNode` | Changes how the wrapped content is measured/laid out (`measure()`) |
| `DrawModifierNode` | Draws into the layout's space (`ContentDrawScope.draw()`) |
| `PointerInputModifierNode` | Receives raw pointer input events |
| `SemanticsModifierNode` | Contributes semantics for testing/accessibility |
| `ParentDataModifierNode` | Passes data up to the parent layout |
| `LayoutAwareModifierNode` | `onPlaced(LayoutCoordinates)` / `onRemeasured(IntSize)` callbacks |
| `GlobalPositionAwareModifierNode` | `onGloballyPositioned()` callback |
| `CompositionLocalConsumerModifierNode` | Reads `CompositionLocal`s at the usage site via `currentValueOf()` |
| `ObserverModifierNode` | Reacts to snapshot-state reads outside a scope via `onObservedReadsChanged()` (pair with `observeReads {}` in `onAttach()`) |
| `DelegatingNode` | Composes several child nodes together, sharing state between them (`delegate(...)`) |
| `TraversableNode` | Walks up/down the node tree |

## Notes

- Three parts are required: the `Modifier.Node` subclass (state), a `ModifierNodeElement<N>` (creates/diffs the node — implement `equals()`/`hashCode()`, typically a `data class`), and a public extension-function factory (`fun Modifier.xxx(...) = this then XxxElement(...)`).
- `update(node)` must mutate the **existing** node's fields rather than replacing it — this is what lets the node persist across recompositions.
- Lifecycle callbacks: `onAttach()` (node enters the tree — start coroutines/register observers here), `onDetach()` (node leaves), `onReset()` (node instance is reused for a different call site — reset internal state).
- `coroutineScope` is available inside a node body for launching coroutines scoped to the node's lifetime (e.g. driving an `Animatable`).
- By default a node auto-invalidates (draw/layout/etc.) on every relevant field change; set `override val shouldAutoInvalidate = false` and call `invalidateDraw()` / `invalidateMeasurement()` selectively for finer control.
- Prefer `Modifier.Node` over the composable-factory pattern (`@Composable fun Modifier.foo(): Modifier`) whenever the modifier needs to read/hold state or animate — the composable-factory form is never skipped and reads `CompositionLocal`s at the modifier's call site rather than its usage site.

## Related

- [Modifier](./modifier.md)
- [Composition and Recomposition](./recomposition.md)
