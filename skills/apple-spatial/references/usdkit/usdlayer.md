# USDLayer

A single USD document that stores scene description in a file or in memory.

## Signature / Usage

```swift
struct USDLayer

init(displayName: String?) throws                       // anonymous, in-memory layer
static func find(identifier: String) -> USDLayer?       // already-loaded layer; does no I/O
static func open(_: String, options: USDLayer.OpenOptions) throws -> USDLayer
func save() throws
func export(to: URL) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `identifier` | `String` | File path, URL, or anonymous identifier; identifies the layer in OpenUSD's global registry |
| `resolvedPath` | `FilePath?` | Resolved filesystem location of the source; `nil` for anonymous layers |
| `displayName` | `String` | Human-readable name derived from the identifier |
| `isAnonymous` | `Bool` | In-memory, no file backing |
| `isValid` | `Bool` | `false` if the underlying data has been released |
| `isDirty` | `Bool` | Has unsaved changes |
| `isMuted` | `Bool` | Muted from composition |
| `defaultPrim` | `USDToken?` | Name of the default prim; `nil` if not authored |
| `subLayerPaths` | `[USDLayer.AssetPath]` | Sublayer asset paths, strongest to weakest opinion |
| `startTimeCode` / `endTimeCode` | `USDLayer.TimeCode?` | Animation range; `nil` if not authored |
| `timeCodesPerSecond` | `Double?` | Time codes per second; `nil` if not authored |
| `allTimeSamples` | `Set<USDLayer.TimeCode>` | All time codes with an authored time sample |

### Methods by topic

| Topic | Members |
|-------|---------|
| Saving and reloading | `save()`, `reload()` (discards unsaved changes), `clear()` (removes in-memory content; file unaffected until `save()`) |
| Exporting / importing | `export(to:)` (`URL` / `FilePath`), `importContents(from:)` (`FilePath` file or `String` USDA) |
| Access by path | `prim(at:)` -> `USDPrim.Spec?`, `property(at:)`, `attribute(at:)`, `relationship(at:)`, `spec(at:)`, `specType(at:)`, `traverse(at:_:)` |
| Fields | `field(at:name:)` -> `USDValue?`, `fields(at:)` -> `[USDToken]`, `setField(at:name:value:)` (`USDValue` or generic `T`) |
| Time samples | `timeSample(at:time:)`, `timeSamples(at:)`, `setTimeSample(at:time:value:)` (`USDValue` or generic `T`), `eraseTimeSample(at:time:)` |
| Editing | `copy(from:to:in:)` -> `Bool` |
| Nested types | `OpenOptions`, `Permission`, `AssetPath`, `Path`, `PathExpression`, `Spec`, `SpecType`, `TimeCode`, `TimeOffset`, `ListOperation`, `ListOperationType`, `Relocate`, `RelocatesMap`, `ChangeList` |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit.
- Conforms to `Copyable`, `CustomStringConvertible`, `Equatable`, `Escapable`, `Hashable`.
- `open(_:options:)` returns an already-loaded layer at the identifier, or opens it from the resolved asset path.
- Modifying values on a `USDStage` authors changes into the stage's edit-target layer.
- Source: https://developer.apple.com/documentation/usdkit/usdlayer (fetched 2026-10 from the DocC JSON).

## Related

- [USDStage](./usdstage.md)
- [USDPrim](./usdprim.md)
- [USDValue](./usdvalue.md)
- [USDToken](./usdtoken.md)
