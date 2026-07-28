# InteractionTracker

A state machine that handles the logic of pointer/touch input for use as targets in [ExpressionAnimation](./expression-animation.md)s, typically to drive visual motion (panning, zooming, custom swipe/transition experiences) from active input.

## Signature / Usage

```csharp
InteractionTracker tracker = InteractionTracker.Create(compositor);
tracker.MaxPosition = new Vector3(
  contentVisual.Size.X - viewportVisual.Size.X,
  contentVisual.Size.Y - viewportVisual.Size.Y, 0.0f);
tracker.MinScale = 0.5f;
tracker.MaxScale = 4.0f;

var interactionSource = VisualInteractionSource.Create(viewportVisual);
interactionSource.PositionXSourceMode = InteractionSourceMode.EnabledWithInertia;
interactionSource.PositionYSourceMode = InteractionSourceMode.EnabledWithInertia;
tracker.InteractionSources.Add(interactionSource);

var positionExpression = compositor.CreateExpressionAnimation("-tracker.Position");
positionExpression.SetReferenceParameter("tracker", tracker);
contentVisual.StartAnimation("Offset", positionExpression);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Create(Compositor) | static method | Creates an `InteractionTracker` instance. |
| CreateWithOwner(Compositor, IInteractionTrackerOwner) | static method | Creates an instance with an owner that receives state-change/value callbacks. |
| InteractionSources | CompositionCollection | Collection of [VisualInteractionSource](./visual-interaction-source.md)s that feed input to the tracker. |
| Position | Vector3, readable via expression | Output position calculated by the tracker; clamped to `MinPosition`/`MaxPosition` while Idle/CustomAnimation, may briefly exceed range during Interacting/Inertia (overpan). |
| Scale | float, readable via expression | Output scale, clamped to `MinScale`/`MaxScale`. |
| MinPosition / MaxPosition | Vector3 | Bounds for `Position`. Both default to 0. |
| MinScale / MaxScale | float | Bounds for `Scale`. Both default to 1. |
| PositionInertiaDecayRate / ScaleInertiaDecayRate | Vector3 / float | Rate (0–1) at which the tracker slows to a stop during inertia. |
| TryUpdatePosition / TryUpdatePositionBy / TryUpdatePositionWithAnimation / TryUpdatePositionWithAdditionalVelocity | method | Programmatically drive `Position` (declaratively, by delta, via animation, or by adding velocity). |
| TryUpdateScale / TryUpdateScaleWithAnimation / TryUpdateScaleWithAdditionalVelocity | method | Equivalent programmatic control for `Scale`. |

## Notes

- Namespace: `Windows.UI.Composition.Interactions` (UWP-origin WinRT API, also usable from Windows App SDK / WinUI 3 desktop apps). Inherits from `CompositionObject`.
- Four states: **Idle**, **Interacting** (active user input), **Inertia** (post-release momentum), **CustomAnimation** (driven by an explicit `TryUpdate*WithAnimation` call). Runs in a separate process from the app, so all method calls and callbacks are asynchronous.
- Must be paired with one or more [VisualInteractionSource](./visual-interaction-source.md)s and, for touch, `VisualInteractionSource.TryRedirectForManipulation` to actually receive input.
- `Position` increases with up/left motion (screen-coordinate convention); commonly negated when driving a `Visual.Offset`.

## Related

- [VisualInteractionSource](./visual-interaction-source.md)
- [ExpressionAnimation](./expression-animation.md)
- [Visual](./visual.md)
