---
source: https://developer.apple.com/documentation/foundationmodels/generatedcontent, https://developer.apple.com/documentation/foundationmodels/generatedcontent/kind-swift.enum, https://developer.apple.com/documentation/foundationmodels/generatedcontent/parsingerror
---

# GeneratedContent

A type that represents structured, generated content. Generated content may contain a single value, an array, or key-value pairs with unique keys.

## Signature / Usage

```swift
struct GeneratedContent
```

Initializers:

```swift
init(_ content: GeneratedContent) throws
init(_ value: some ConvertibleToGeneratedContent, id: GenerationID)
init<S>(elements: S, id: GenerationID? = nil) where S : Sequence, S.Element == any ConvertibleToGeneratedContent
init(properties: KeyValuePairs<String, any ConvertibleToGeneratedContent>, id: GenerationID? = nil)
init<S>(properties: S, id: GenerationID? = nil, uniquingKeysWith combine: (GeneratedContent, GeneratedContent) throws -> some ConvertibleToGeneratedContent) rethrows where S : Sequence, S.Element == (String, any ConvertibleToGeneratedContent)
init(json: String) throws
init(kind: GeneratedContent.Kind, id: GenerationID? = nil)
```

Reading content:

```swift
var kind: GeneratedContent.Kind { get }
func value<Value>(_ type: Value.Type = Value.self) throws -> Value where Value : ConvertibleFromGeneratedContent
func value<Value>(_ type: Value.Type = Value.self, forProperty property: String) throws -> Value where Value : ConvertibleFromGeneratedContent
var isComplete: Bool { get }
var generatedContent: GeneratedContent { get }
var jsonString: String { get }
var debugDescription: String { get }
var id: GenerationID?
```

## Options / Props

| Name | Description |
| --- | --- |
| init(_:) | Creates generated content from another value. |
| init(_:id:) | Creates content that contains a single value with a custom generation identifier. |
| init(elements:id:) | Creates content representing an array of elements you specify. |
| init(properties:id:) | Creates generated content representing a structure with the properties you specify. |
| init(properties:id:uniquingKeysWith:) | Creates generated content from key-value pairs, resolving duplicate keys with a combining closure. |
| init(json:) | Creates equivalent content from a JSON string. |
| init(kind:id:) | Creates content with the specified kind and generation identifier. |
| kind | The representation of the generated content. |
| value(_:) | Reads a top level, concrete partially generable type from a named property. |
| value(_:forProperty:) | Reads a concrete generable type from a named property. |
| isComplete | A Boolean value that indicates whether the generated content is complete. |
| generatedContent | A representation of this instance. |
| jsonString | A JSON string representation of the generated content. |
| debugDescription | A string representation for the debug description. |
| id | A unique id that is stable for the duration of a generated response. |

### GeneratedContent.Kind

```swift
enum Kind
```

`Kind` represents the various types of JSON-compatible data that can be held within a `GeneratedContent` instance, including primitive types, arrays, and structured objects.

| Case | Description |
| --- | --- |
| array(_:) | An array of generated content elements. |
| bool(_:) | A boolean value. |
| null | A null value. |
| number(_:) | A numeric value. |
| string(_:) | A string value. |
| structure(properties:orderedKeys:) | A structured object with key-value pairs. |

### GeneratedContent.ParsingError

```swift
struct ParsingError
```

A failure that occurs when a string cannot be parsed into generated content. Members: `init(rawContent:underlyingError:debugDescription:)` (creates a parsing failure value), `rawContent` (the raw content that could not be parsed), `underlyingError` (the underlying error that caused the parsing failure, if any), `debugDescription` (a debug description of what failed to parse).

## Notes

- Availability: `GeneratedContent` and `Kind` are iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+. `GeneratedContent.ParsingError` is iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- `GeneratedContent` has default implementations of `ConvertibleFromGeneratedContent`, `ConvertibleToGeneratedContent` and `CustomDebugStringConvertible`.
- Source fetched 2026-10-16 (no version in URL).

## Related

- [GenerationID](./generation-id.md)
- [ConvertibleToGeneratedContent / ConvertibleFromGeneratedContent](./convertible-generated-content.md)
- [Generable](./generable.md)
- [GenerationSchema](./generation-schema.md)
