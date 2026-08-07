# Audio Events

Editor-only events that trigger sound effect playback within animations or in response to user interactions, without requiring runtime developer code.

## Signature / Usage

Drag an audio asset (MP3, WAV, or FLAC) from the assets panel directly onto the stage, or activate the event tool (`Shift + E`), click the stage to create a regular event, then set its type to audio in the inspector.

## Options / Props

| Trigger Method | Description |
| --- | --- |
| Timeline | Keying the event reports it, which starts playback of the assigned audio asset |
| Transitions | Add the audio event to a state machine transition, choosing playback at the transition's start or end |
| Listeners | Configure a pointer interaction to trigger playback when the user interacts with a shape |

## Notes

- Audio events are best for short sounds tied to interactions or animation beats; for longer content like background music or voice needing volume/panning changes over time, use Scripting with the `AudioSound` and `AudioSource` APIs instead.
- Audio levels are monitored via the VU meter at the base of the inspector; watch for clipping (red peaks) when multiple sounds overlap and reduce asset volumes accordingly.

## Related

- [Events](./events.md)
- [Listeners](./listeners.md)
- [State Machine](./state-machine.md)
