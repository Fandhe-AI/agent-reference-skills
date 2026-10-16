# USDToken

An interned, efficiently compared string that names prims, properties, and other scene-description identifiers.

## Signature / Usage

```swift
struct USDToken

init()
init(_: String)
init(namespaceComponents: [USDToken])      // joins components with ":"
static func isValidIdentifier(_: String, namespaced: Bool) -> Bool
func strippingLeadingNamespace() -> USDToken
func strippingNamespacePrefix(_: USDToken) -> USDToken?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `string` | `String` | The token's string value |
| `isEmpty` | `Bool` | Whether the token is empty |
| `namespaceComponents` | `[USDToken]` | The token split into namespace components separated by `:` |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit.
- Conforms to `Comparable`, `Copyable`, `CustomDebugStringConvertible`, `CustomStringConvertible`, `Decodable`, `Encodable`, `Equatable`, `Escapable`, `ExpressibleByStringLiteral` (and its grapheme-cluster / unicode-scalar literal parents), `Hashable`, `Sendable`, `SendableMetatype`, `USDValueProtocol`, `USDPrim.Attribute.Value`, and `USDStage.Object.MetadataValue`.
- `isValidIdentifier(_:namespaced:)` returns whether the given string is a valid USD identifier.

## Related

- [USDValue](./usdvalue.md)
- [USDPrim](./usdprim.md)
