# MusicUnderstandingSession.RangedValue

A structure that pairs a value over a time range.

## Signature / Usage

```swift
struct RangedValue<Value> where Value : Decodable, Value : Encodable, Value : Equatable, Value : Sendable

let range: CMTimeRange
let value: Value

init(from: any Decoder) throws
func encode(to: any Encoder) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `range` | `CMTimeRange` | The time range over which the value applies |
| `value` | `Value` | The value associated with the time range |
| `init(from:)` | initializer | Creates a ranged value by decoding from the given decoder |
| `encode(to:)` | method | Encodes the ranged value into the given encoder |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- A container pairing an analysis value with a `CMTimeRange` segment of media time. Music properties like key and pace change over a track; results are expressed as a sequence of contiguous segments covering the full timeline.
- Conforms to `Decodable`, `Encodable`, `Equatable`, `Sendable`, `SendableMetatype`.

## Related

- [MusicUnderstandingSession.TimedValue](./musicunderstandingsession-timedvalue.md)
- [KeyResult](./keyresult.md)
- [PaceResult](./paceresult.md)
- [AnalysisType](./analysistype.md)
