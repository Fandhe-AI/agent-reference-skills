# SubcomposeLayout

An analogue of `Layout` that allows subcomposing content during the measuring stage, e.g. to use values calculated during measurement as parameters for composing further children.

## Signature / Usage

```kotlin
@Composable
public fun SubcomposeLayout(
    state: SubcomposeLayoutState,
    modifier: Modifier = Modifier,
    measurePolicy: SubcomposeMeasureScope.(Constraints) -> MeasureResult,
)

public fun SubcomposeMeasureScope.subcompose(
    slotId: Any?,
    content: @Composable () -> Unit,
): List<Measurable>
```

```kotlin
@Composable
fun MatchParentDivider() {
    SubcomposeLayout { constraints ->
        val mainPlaceable = subcompose("main") { MainContent() }
            .first().measure(constraints)
        val dividerPlaceable = subcompose("divider") { Divider() }
            .first().measure(Constraints.fixedWidth(mainPlaceable.width))
        layout(mainPlaceable.width, mainPlaceable.height) {
            mainPlaceable.placeRelative(0, 0)
            dividerPlaceable.placeRelative(0, mainPlaceable.height - dividerPlaceable.height)
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `SubcomposeLayoutState` | — | Holds subcomposition state across recompositions/remeasures. |
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `measurePolicy` | `SubcomposeMeasureScope.(Constraints) -> MeasureResult` | — | Receives constraints; calls `subcompose(slotId, content)` to compose+measure slots on demand. |
| `subcompose(slotId, content)` | function | — | Subcomposes `content` under a stable `slotId` (consistent across remeasures); returns the resulting `Measurable`s. |

## Notes

- Typical uses: sizing one child based on another's measured size, lazily composing children only when needed (basis for `LazyColumn`/`LazyRow`), or using constraint info during composition (basis for `BoxWithConstraints`).
- Inside a `LookaheadScope`, subcomposition happens only during the lookahead pass; the main pass reuses the lookahead-subcomposed `Measurable`s.
- Package: `androidx.compose.ui.layout`.

## Related

- [Layout](./layout.md)
- [BoxWithConstraints](./boxwithconstraints.md)
