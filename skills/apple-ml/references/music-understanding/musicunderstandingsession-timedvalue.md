# MusicUnderstandingSession.TimedValue

A structure that pairs a value with a time.

## Signature / Usage

```swift
struct TimedValue<Value> where Value : Decodable, Value : Encodable, Value : Equatable, Value : Sendable

let time: CMTime
let value: Value

init(from: any Decoder) throws
func encode(to: any Encoder) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `time` | `CMTime` | The time at which the value applies |
| `value` | `Value` | The value associated with the time |
| `init(from:)` | initializer | Creates a timed value by decoding from the given decoder |
| `encode(to:)` | method | Encodes the timed value into the given encoder |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Pairs a value with a `CMTime` point: a measurement at a specific instant, as opposed to a span. Properties that hold constant over a span (key, pace) use `RangedValue` with a `CMTimeRange`; instantaneous measurements use `TimedValue` with a `CMTime`.
- Conforms to `Decodable`, `Encodable`, `Equatable`, `Sendable`, `SendableMetatype`.

## Related

- [MusicUnderstandingSession.RangedValue](./musicunderstandingsession-rangedvalue.md)
- [AnalysisType](./analysistype.md)
- [LoudnessResult](./loudnessresult.md)
