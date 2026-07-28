# updateTransition / rememberTransition / Transition

`Transition` manages one or more child animations and runs them in parallel whenever the driving state changes, exposing a shared `currentState` / `targetState` / `isRunning`.

## Signature / Usage

```kotlin
// androidx.compose.animation.core.Transition.kt (module compose.animation:animation-core)
@Composable
public fun <T> updateTransition(targetState: T, label: String? = null): Transition<T>

@Deprecated(
    "Use rememberTransition() instead",
    replaceWith = ReplaceWith("rememberTransition(transitionState, label)"),
)
@Composable
public fun <T> updateTransition(
    transitionState: MutableTransitionState<T>,
    label: String? = null,
): Transition<T>

@Composable
public fun <T> rememberTransition(
    transitionState: TransitionState<T>,
    label: String? = null,
): Transition<T>

// Transition<S> key members
public val currentState: S
    get() = transitionState.currentState
public var targetState: S by mutableStateOf(currentState)
    internal set
public val isRunning: Boolean
    get() = startTimeNanos != AnimationConstants.UnspecifiedTime

// Transition<S> extension functions (same file, defined after the class body)
@Composable
public inline fun <S> Transition<S>.animateFloat(
    noinline transitionSpec: @Composable Transition.Segment<S>.() -> FiniteAnimationSpec<Float> = { spring() },
    label: String = "FloatAnimation",
    targetValueByState: @Composable (state: S) -> Float,
): State<Float>

@Composable
public inline fun <S> Transition<S>.animateDp(
    noinline transitionSpec: @Composable Transition.Segment<S>.() -> FiniteAnimationSpec<Dp> =
        { spring(visibilityThreshold = Dp.VisibilityThreshold) },
    label: String = "DpAnimation",
    targetValueByState: @Composable (state: S) -> Dp,
): State<Dp>

@Composable
public inline fun <S> Transition<S>.animateOffset(
    noinline transitionSpec: @Composable Transition.Segment<S>.() -> FiniteAnimationSpec<Offset> =
        { spring(visibilityThreshold = Offset.VisibilityThreshold) },
    label: String = "OffsetAnimation",
    targetValueByState: @Composable (state: S) -> Offset,
): State<Offset>

@Composable
public inline fun <S> Transition<S>.animateSize(
    noinline transitionSpec: @Composable Transition.Segment<S>.() -> FiniteAnimationSpec<Size> =
        { spring(visibilityThreshold = Size.VisibilityThreshold) },
    label: String = "SizeAnimation",
    targetValueByState: @Composable (state: S) -> Size,
): State<Size>

@Composable
public inline fun <S, T> Transition<S>.createChildTransition(
    label: String = "ChildTransition",
    transformToChildState: @Composable (parentState: S) -> T,
): Transition<T>

// androidx.compose.animation.Transition.kt (module compose.animation:animation — a
// separate, much smaller file from the one above; do not confuse the two)
@Composable
public inline fun <S> Transition<S>.animateColor(
    noinline transitionSpec: @Composable Transition.Segment<S>.() -> FiniteAnimationSpec<Color> = { spring() },
    label: String = "ColorAnimation",
    targetValueByState: @Composable (state: S) -> Color,
): State<Color>
```

`animateRect`, `animateIntOffset`, and the generic `animateValue` extension exist on `Transition<S>` following the same `(transitionSpec, label, targetValueByState)` shape, but their exact default expressions could not be confirmed verbatim — `animation-core/.../Transition.kt` is 106,966 bytes and WebFetch truncates before reaching every extension function in one pass.

```kotlin
enum class BoxState { Collapsed, Expanded }

var currentState by remember { mutableStateOf(BoxState.Collapsed) }
val transition = updateTransition(currentState, label = "box state")
val borderWidth by transition.animateDp(label = "border width") { state ->
    when (state) {
        BoxState.Collapsed -> 1.dp
        BoxState.Expanded -> 0.dp
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targetState` | `T` | — | New state that drives all child animations to their new target values. |
| `label` | `String?` | `null` | Debug label for tooling. |
| `transitionSpec` | `Transition.Segment<S>.() -> FiniteAnimationSpec<T>` | `spring()` (type-specific) | Per-child-animation spec; can branch on `initialState isTransitioningTo targetState`. |
| `targetValueByState` | `@Composable (state: S) -> T` | — | Maps each state to its target value for that child animation. |

## Notes

- `updateTransition(targetState, label)` is the common entry point. `updateTransition(transitionState: MutableTransitionState<T>, label)` is `@Deprecated` in favor of `rememberTransition(transitionState: TransitionState<T>, label)` (a `MutableTransitionState` implements `TransitionState`); using `rememberTransition` with a `MutableTransitionState` lets a transition start already in-flight (e.g. animate in immediately on first composition).
- `createChildTransition` derives a `Transition<T>` from a parent `Transition<S>`, useful for composing sub-components that only need part of the parent state.
- `transition.AnimatedVisibility { ... }` and `transition.AnimatedContent { ... }` extension overloads let a `Transition` drive those composables directly instead of a plain boolean/state.
- Most child-animation extensions (`animateFloat`, `animateDp`, `animateOffset`, `animateSize`, `animateValue`, `createChildTransition`, ...) live in `androidx.compose.animation.core`, but `animateColor` specifically lives in `androidx.compose.animation` (module `compose.animation:animation`) — the same package split as `animateColorAsState` vs. the other `animate*AsState` functions.

## Related

- [AnimatedVisibility](./animatedvisibility.md)
- [AnimatedContent](./animatedcontent.md)
- [rememberInfiniteTransition / InfiniteTransition](./infinitetransition.md)
