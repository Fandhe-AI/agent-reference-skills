# SharedTransitionLayout

The outermost layout required to implement shared element transitions. Provides a `SharedTransitionScope` to its content, exposing `Modifier.sharedElement()` / `Modifier.sharedBounds()` for descendants.

## Signature / Usage

```kotlin
@Composable
fun SharedTransitionLayout(
    modifier: Modifier = Modifier,
    content: @Composable SharedTransitionScope.() -> Unit,
)
```

```kotlin
var showDetails by remember { mutableStateOf(false) }
SharedTransitionLayout {
    AnimatedContent(showDetails, label = "basic_transition") { targetState ->
        if (!targetState) {
            MainContent(
                animatedVisibilityScope = this@AnimatedContent,
                sharedTransitionScope = this@SharedTransitionLayout
            )
        } else {
            DetailsContent(
                animatedVisibilityScope = this@AnimatedContent,
                sharedTransitionScope = this@SharedTransitionLayout
            )
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `content` | `@Composable SharedTransitionScope.() -> Unit` | — | Content that can access shared element modifiers via the receiver `SharedTransitionScope`. |

## Notes

- `@ExperimentalSharedTransitionApi`. Still the officially recommended API for shared element transitions despite the experimental annotation.
- Must be placed at the top-level point of the UI hierarchy that contains all elements participating in the transition; typically wraps an `AnimatedContent`, `AnimatedVisibility`, or `NavHost`.
- To use shared elements with Navigation, wrap the `NavHost` itself in `SharedTransitionLayout`.
- For deeply nested composables, pass `SharedTransitionScope` and `AnimatedVisibilityScope` down as parameters, or expose them via `CompositionLocal`.
- Package: `androidx.compose.animation`.

## Related

- [SharedTransitionScope](./sharedtransitionscope.md)
- [Modifier.sharedElement](./sharedelement.md)
- [Modifier.sharedBounds](./sharedbounds.md)
- [AnimatedContent](../animation-apis/animatedcontent.md)
