# Modifier.animateBounds

Animates a layout's position and/or size whenever they change within a `LookaheadScope`, using the target bounds computed by the lookahead pass instead of jumping to them.

## Signature / Usage

```kotlin
fun Modifier.animateBounds(
    lookaheadScope: LookaheadScope,
    modifier: Modifier = Modifier,
    boundsTransform: BoundsTransform = DefaultBoundsTransform,
    animateMotionFrameOfReference: Boolean = false,
): Modifier
```

```kotlin
LookaheadScope {
    Box(
        Modifier
            .animateBounds(lookaheadScope = this)
            .then(if (expanded) Modifier.size(200.dp) else Modifier.size(80.dp))
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `lookaheadScope` | `LookaheadScope` | — | The enclosing scope whose lookahead pass supplies the target bounds to animate towards. |
| `modifier` | `Modifier` | `Modifier` | Optional intermediate modifier applied between the returned modifier and layout, useful for resolving edge cases with chained layout modifiers. |
| `boundsTransform` | `BoundsTransform` | `DefaultBoundsTransform` | Produces the `FiniteAnimationSpec<Rect>` used to animate from the initial to the target bounds. |
| `animateMotionFrameOfReference` | `Boolean` | `false` | When `true`, also animates positional changes introduced by a motion frame of reference (e.g. scrolling); by default such continuous positional changes are applied immediately without animation. |

## Notes

- Must be used inside a `LookaheadScope`, and `lookaheadScope` is typically `this` from that scope's content lambda.
- Any layout change (position or size) visible within the `LookaheadScope` triggers an animation; where the scope is placed in the hierarchy determines what counts as "visible".
- Uses the same `BoundsTransform` type as the shared-elements APIs (`Modifier.sharedElement` / `Modifier.sharedBounds`), so a spec can be shared between container-transform and shared-element use cases.
- Package: `androidx.compose.animation`.

## Related

- [LookaheadScope](./lookaheadscope.md)
- [BoundsTransform](../shared-elements/boundstransform.md)
- [Modifier.animateContentSize](./animatecontentsize.md)
- [Modifier.animateItem](./animateitem.md)
