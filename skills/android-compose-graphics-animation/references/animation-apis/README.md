# animation-apis

> This is the Jetpack Compose (Kotlin, `androidx.compose.animation`) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend animation APIs.

| Name | Description | Path |
|------|-------------|------|
| AnimatedVisibility | Shows/hides a composable with enter/exit transitions, removing it from composition when hidden. | [animatedvisibility.md](./animatedvisibility.md) |
| AnimatedContent | Animates between different content based on a target state, with a customizable ContentTransform. | [animatedcontent.md](./animatedcontent.md) |
| Crossfade | Simple fade-only transition between two pieces of content based on a target state. | [crossfade.md](./crossfade.md) |
| Modifier.animateContentSize | Modifier that automatically animates a composable's size when it changes. | [animatecontentsize.md](./animatecontentsize.md) |
| animate*AsState | Family of composable functions (`animateFloatAsState`, `animateDpAsState`, `animateColorAsState`, etc.) that animate a single value to a target. | [animateasstate.md](./animateasstate.md) |
| Animatable | Coroutine-based, suspend-driven animatable value holder with `animateTo` / `snapTo` / `animateDecay`. | [animatable.md](./animatable.md) |
| rememberInfiniteTransition / InfiniteTransition | Holds child animations that repeat indefinitely until removed from composition. | [infinitetransition.md](./infinitetransition.md) |
| updateTransition / rememberTransition / Transition | Coordinates multiple child animations driven by a single state change. | [transition.md](./transition.md) |
| EnterTransition / ExitTransition | Composable building blocks (`fadeIn`, `slideIn*`, `expandIn`, `scaleIn`, etc.) used by `AnimatedVisibility` and `AnimatedContent`. | [enterexittransition.md](./enterexittransition.md) |
| LookaheadScope | Provides lookahead-measured target layout info used to build custom layout-change animations. | [lookaheadscope.md](./lookaheadscope.md) |
| Modifier.animateItem | Modifier for lazy list/grid items that animates appearance, disappearance, and reordering. | [animateitem.md](./animateitem.md) |
| AnimationVector / TwoWayConverter | Low-level vector representation and converter types used to animate arbitrary value types. | [animationvector.md](./animationvector.md) |
