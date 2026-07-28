# MediaTimelineController

Provides information about and control over the rate, position, and state of one or more `MediaPlayer` instances. Makes it possible to synchronize multiple media players from a single controller and simplifies building custom transport controls.

## Signature / Usage

```csharp
var controller = new MediaTimelineController();
mediaPlayerA.TimelineController = controller;
mediaPlayerB.TimelineController = controller;
controller.Start();
controller.ClockRate = 1.0;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ClockRate | Double | Speed at which the controller's position changes, as a ratio of normal speed. |
| Duration | TimeSpan | Duration of the timeline; the clock stops progressing after this elapses. |
| IsLoopingEnabled | Boolean | Whether the timeline loops back to zero at the end of `Duration`. |
| Position | TimeSpan | Current position of the controller. |
| State | MediaTimelineControllerState | Current state (running or paused). |
| Start() | method | Starts playback from position 0. |
| Pause() / Resume() | methods | Pause / resume from the paused position. |
| Ended / Failed / PositionChanged / StateChanged | events | Lifecycle and state-change notifications. |

## Notes

- Namespace: `Windows.Media`. Assign to `MediaPlayer.TimelineController` to synchronize that player's playback with the controller's clock; use `TimelineControllerPositionOffset` on the `MediaPlayer` to offset an individual player from the shared timeline.

## Related

- [MediaPlayer](./media-player.md)
