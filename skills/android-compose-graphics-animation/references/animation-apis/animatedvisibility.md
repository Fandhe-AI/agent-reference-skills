# AnimatedVisibility

Animates the appearance and disappearance of its content based on a `visible` boolean. The content is removed from composition once the exit animation finishes.

## Signature / Usage

```kotlin
@Composable
fun AnimatedVisibility(
    visible: Boolean,
    modifier: Modifier = Modifier,
    enter: EnterTransition = fadeIn() + expandIn(),
    exit: ExitTransition = shrinkOut() + fadeOut(),
    label: String = "AnimatedVisibility",
    content: @Composable AnimatedVisibilityScope.() -> Unit,
)

// Overload driven by a MutableTransitionState, useful to trigger the enter
// animation immediately on first composition.
@Composable
fun AnimatedVisibility(
    visibleState: MutableTransitionState<Boolean>,
    modifier: Modifier = Modifier,
    enter: EnterTransition = fadeIn() + expandIn(),
    exit: ExitTransition = fadeOut() + shrinkOut(),
    label: String = "AnimatedVisibility",
    content: @Composable AnimatedVisibilityScope.() -> Unit,
)

// Extension member for driving visibility from an existing Transition<T>.
@Composable
fun <T> Transition<T>.AnimatedVisibility(
    visible: (T) -> Boolean,
    modifier: Modifier = Modifier,
    enter: EnterTransition = fadeIn() + expandIn(),
    exit: ExitTransition = shrinkOut() + fadeOut(),
    content: @Composable AnimatedVisibilityScope.() -> Unit,
)
```

```kotlin
var visible by remember { mutableStateOf(true) }
AnimatedVisibility(
    visible = visible,
    enter = slideInVertically { -40 } + expandVertically(expandFrom = Alignment.Top) + fadeIn(),
    exit = slideOutVertically() + shrinkVertically() + fadeOut(),
) {
    Text("Hello")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `Boolean` | — | Whether the content is shown. |
| `visibleState` | `MutableTransitionState<Boolean>` | — | Alternative to `visible`; also exposes `isIdle` / `currentState` to check whether the animation has finished. |
| `modifier` | `Modifier` | `Modifier` | Applied to the layout wrapping the content. |
| `enter` | `EnterTransition` | `fadeIn() + expandIn()` | Transition used when `visible` becomes `true`. |
| `exit` | `ExitTransition` | `shrinkOut() + fadeOut()` | Transition used when `visible` becomes `false`. |
| `label` | `String` | `"AnimatedVisibility"` | Debug label shown in Android Studio animation tooling. |
| `content` | `@Composable AnimatedVisibilityScope.() -> Unit` | — | Content to show/hide. Runs in `AnimatedVisibilityScope`. |

There are also `RowScope.AnimatedVisibility` and `ColumnScope.AnimatedVisibility` overloads with horizontal/vertical defaults for `enter` / `exit` respectively.

## Notes

- Child composables can call `Modifier.animateEnterExit(enter, exit)` (available inside `AnimatedVisibilityScope`) to run a different transition than the parent.
- `AnimatedVisibilityScope` also exposes a `transition: Transition<EnterExitState>` property for building fully custom child animations keyed on `EnterExitState.Visible` / `PreEnter` / `PostExit`.
- Package: `androidx.compose.animation`.

## Related

- [EnterTransition / ExitTransition](./enterexittransition.md)
- [AnimatedContent](./animatedcontent.md)
- [Transition](./transition.md)
