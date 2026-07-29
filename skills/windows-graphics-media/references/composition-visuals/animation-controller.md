# AnimationController

Provides playback controls (pause, resume, playback-rate change, progress scrubbing) for a running `KeyFrameAnimation`.

## Signature / Usage

```csharp
ScalarKeyFrameAnimation animation = compositor.CreateScalarKeyFrameAnimation();
animation.InsertKeyFrame(0.0f, 0.0f);
animation.InsertKeyFrame(1.0f, 1.0f);
animation.Duration = TimeSpan.FromSeconds(2);

visual.StartAnimation("Opacity", animation);

AnimationController controller = visual.TryGetAnimationController("Opacity");
controller.Pause();
controller.Progress = 0.5f; // scrub to the midpoint
controller.PlaybackRate = 2.0f;
controller.Resume();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Pause() | method | Pauses playback of the animation. |
| Resume() | method | Starts playback of an animation that was previously paused. |
| Progress | float | Current playback position of the animation, as a normalized value; settable to scrub to an arbitrary point. |
| ProgressBehavior | `AnimationControllerProgressBehavior` | Whether `Progress` includes delay time (`Default` vs `IncludesDelayTime`). Default is `Default`. |
| PlaybackRate | float | Rate at which the animation plays; 1.0 is normal speed, settable to speed up/slow down/reverse (negative) playback. |
| MinPlaybackRate / MaxPlaybackRate | float (read-only) | The minimum and maximum values allowed for `PlaybackRate`. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). `AnimationController` inherits directly from `CompositionObject` (not from `CompositionAnimation`); it is `sealed`. The UWP equivalent is `Windows.UI.Composition.AnimationController`.
- Obtained via `CompositionObject.TryGetAnimationController(string propertyName)`, which returns the controller for the animation currently running on that property, or `null` if no animation is found on it — see [KeyFrameAnimation](./key-frame-animation.md).
- Also accepted as a third parameter to the inherited `StartAnimation(string, CompositionAnimation, AnimationController)` overload, to start an animation already under an existing controller's playback control.
- Controls playback of `KeyFrameAnimation`s; not applicable to [ExpressionAnimation](./expression-animation.md), which has no fixed timeline to pause/scrub.

## Related

- [KeyFrameAnimation](./key-frame-animation.md)
- [ExpressionAnimation](./expression-animation.md)
- [Compositor](./compositor.md)
