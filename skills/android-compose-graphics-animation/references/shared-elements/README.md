# shared-elements

| Name | Description | Path |
|------|-------------|------|
| SharedTransitionLayout | Outermost layout required for shared element transitions; provides `SharedTransitionScope`. | [sharedtransitionlayout.md](./sharedtransitionlayout.md) |
| SharedTransitionScope | Scope exposing shared element modifiers (`sharedElement`, `sharedBounds`, etc.) and `isTransitionActive`. | [sharedtransitionscope.md](./sharedtransitionscope.md) |
| Modifier.sharedElement | Matches visually identical content between two states for a hero transition. | [sharedelement.md](./sharedelement.md) |
| Modifier.sharedBounds | Shares bounds between visually different content, e.g. a container transform. | [sharedbounds.md](./sharedbounds.md) |
| Modifier.sharedElementWithCallerManagedVisibility | Shares an element between states with caller-controlled (not `AnimatedVisibility`-driven) visibility. | [sharedelementwithcallermanagedvisibility.md](./sharedelementwithcallermanagedvisibility.md) |
| rememberSharedContentState / SharedContentState | Creates the state object holding the unique key used to match shared elements. | [remembersharedcontentstate.md](./remembersharedcontentstate.md) |
| ResizeMode / ScaleToBounds | Controls how a shared bounds' child resizes (`scaleToBounds` vs `RemeasureToBounds`) as bounds animate. | [resizemode.md](./resizemode.md) |
| BoundsTransform | Customizes the `AnimationSpec<Rect>` used to animate shared element/bounds position and size. | [boundstransform.md](./boundstransform.md) |
| OverlayClip | Clip shape applied to a shared element while rendered in the transition overlay. | [overlayclip.md](./overlayclip.md) |
| Modifier.renderInSharedTransitionScopeOverlay | Keeps a composable rendered above transforming shared elements during a transition. | [renderinsharedtransitionscopeoverlay.md](./renderinsharedtransitionscopeoverlay.md) |
| Modifier.skipToLookaheadSize | Reports final lookahead size immediately to avoid reflow/jumps during a transition. | [skiptolookaheadsize.md](./skiptolookaheadsize.md) |
