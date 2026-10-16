# InstrumentActivityResult

A structure containing the activity levels and detected time ranges for instruments in a song.

## Signature / Usage

```swift
struct InstrumentActivityResult

let activity: [InstrumentActivityResult.Instrument : [MusicUnderstandingSession.TimedValue<Float>]]
let ranges: [InstrumentActivityResult.Instrument : [CMTimeRange]]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `activity` | `[Instrument : [TimedValue<Float>]]` | The activity level of each instrument over time, as values from 0.0 to 1.0 |
| `ranges` | `[Instrument : [CMTimeRange]]` | The time ranges during which the framework detects each instrument |
| `Instrument` | `struct` | A type that identifies a specific instrument category |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- `activity` is a continuous signal per instrument: `0.0` means the instrument isn't present, `1.0` means it is fully active. `ranges` gives discrete time windows of detection. Use both together to determine when an instrument is present and how prominently it features.
- Individual `Instrument` categories are not enumerated in the source used for this page.
- Conforms to `Decodable`, `Encodable`, `Sendable`, `SendableMetatype`.

## Related

- [MusicUnderstandingSession.TimedValue](./musicunderstandingsession-timedvalue.md)
- [MusicUnderstandingSession.SessionResult](./musicunderstandingsession-sessionresult.md)
