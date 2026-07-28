# AnimatedContent

Animates between different content for a given `targetState`, replacing the initial content with the target content using a customizable `ContentTransform`.

## Signature / Usage

```kotlin
@Composable
fun <S> AnimatedContent(
    targetState: S,
    modifier: Modifier = Modifier,
    transitionSpec: AnimatedContentTransitionScope<S>.() -> ContentTransform = {
        (fadeIn(animationSpec = tween(220, delayMillis = 90)) +
            scaleIn(initialScale = 0.92f, animationSpec = tween(220, delayMillis = 90)))
            .togetherWith(fadeOut(animationSpec = tween(90)))
    },
    contentAlignment: Alignment = Alignment.TopStart,
    label: String = "AnimatedContent",
    contentKey: (targetState: S) -> Any? = { it },
    content: @Composable AnimatedContentScope.(targetState: S) -> Unit,
)
```

```kotlin
var count by remember { mutableIntStateOf(0) }
AnimatedContent(
    targetState = count,
    transitionSpec = {
        if (targetState > initialState) {
            slideInVertically { it } + fadeIn() togetherWith slideOutVertically { -it } + fadeOut()
        } else {
            slideInVertically { -it } + fadeIn() togetherWith slideOutVertically { it } + fadeOut()
        }.using(SizeTransform(clip = false))
    },
    label = "count",
) { targetCount ->
    Text(text = "$targetCount")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targetState` | `S` | — | State whose value change triggers the transition; also used as the content key. |
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `transitionSpec` | `AnimatedContentTransitionScope<S>.() -> ContentTransform` | fade-through | Returns the `ContentTransform` (enter/exit/size) to use for the current state change. |
| `contentAlignment` | `Alignment` | `Alignment.TopStart` | Alignment of initial and target content during the transition. |
| `label` | `String` | `"AnimatedContent"` | Debug label for tooling. |
| `contentKey` | `(targetState: S) -> Any?` | `{ it }` | Key identifying content; when unchanged across state updates, no transition runs. |
| `content` | `@Composable AnimatedContentScope.(targetState: S) -> Unit` | — | Content lambda; always read `targetState` here rather than the outer state to select the correct content for each transition frame. |

### ContentTransform / togetherWith / SizeTransform

```kotlin
class ContentTransform(
    val targetContentEnter: EnterTransition,
    val initialContentExit: ExitTransition,
    targetContentZIndex: Float = 0f,
    sizeTransform: SizeTransform? = SizeTransform(),
)

infix fun EnterTransition.togetherWith(exit: ExitTransition): ContentTransform

fun SizeTransform(
    clip: Boolean = true,
    sizeAnimationSpec: (initialSize: IntSize, targetSize: IntSize) -> FiniteAnimationSpec<IntSize> =
        { _, _ -> spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntSize.VisibilityThreshold) },
): SizeTransform
```

### AnimatedContentTransitionScope

| Name | Type | Description |
|------|------|-------------|
| `slideIntoContainer(towards, animationSpec, initialOffset)` | `EnterTransition` | Slides content in based on the container's size, in a `SlideDirection`. |
| `slideOutOfContainer(towards, animationSpec, targetOffset)` | `ExitTransition` | Slides content out based on the container's size. |
| `ContentTransform.using(sizeTransform)` | infix fun | Attaches a `SizeTransform` to a `ContentTransform`. |
| `contentAlignment` | `Alignment` | Alignment used for the transition. |

## Notes

- Default transition is a fade-through (fade out old content, fade + scale in new content).
- `slideIntoContainer` / `slideOutOfContainer` are unique to `AnimatedContentTransitionScope` (not available on plain `AnimatedVisibility`), since they need the container's size to compute the offset.
- `AnimatedContentScope` exposes `Modifier.animateEnterExit()` for children, similar to `AnimatedVisibilityScope`.
- Package: `androidx.compose.animation`.

## Related

- [Crossfade](./crossfade.md)
- [EnterTransition / ExitTransition](./enterexittransition.md)
- [AnimatedVisibility](./animatedvisibility.md)
