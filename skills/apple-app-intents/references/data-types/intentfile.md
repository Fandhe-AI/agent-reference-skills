---
source: https://developer.apple.com/documentation/appintents/intentfile
---

# IntentFile

An interface for providing an app entity that represents an on-disk file or file-based resource.

## Signature / Usage

```swift
struct IntentFile
```

```swift
init(data: Data, filename: String, type: UTType?)
init(fileURL: URL, filename: String?, type: UTType?)
```

Provide an intent file entity implementation to describe data you store in a file on disk or in memory by providing its associated name and uniform type identifier.

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `filename` | `var filename: String` | The human-readable name of the file, which will be displayed to the user. |
| `fileURL` | `var fileURL: URL?` | URL to the file on disk, if any. If the file isn't stored on disk, access the contents using the `data` property. |
| `type` | `var type: UTType?` | The uniform type identifier of the file (i.e. "public.json", "public.png", or any custom type). |
| `data` | `var data: Data` | The contents of the file. If the file was created with a URL, accessing this property will memory map the file contents. |
| `removedOnCompletion` | `var removedOnCompletion: Bool` | Indicates whether the file should be automatically deleted from disk when the Shortcut is done running. `false` by default. |
| `availableContentTypes` | `var availableContentTypes: [UTType]` | Valid content types the `IntentFile` can possibly be converted to. |
| `data(contentType:)` | `func data(contentType: UTType) async throws -> Data` | Requests an `IntentFile` representation as binary data of the requested content type if possible. |
| `file(contentType:destinationDirectory:)` | `func file(contentType: UTType, destinationDirectory: URL?) async throws -> (fileURL: URL, openedInPlace: Bool)` | Requests an `IntentFile` representation as a file url. |
| `withFile(contentType:allowOpenInPlace:fileHandler:)` | `func withFile<Result>(contentType: UTType, allowOpenInPlace: Bool, fileHandler: (URL, Bool) async throws -> Result) async throws -> Result` | Requests an `IntentFile` representation as a file url. |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: some ResolverSpecification` | Type property. |
| `IntentFileError` | `enum IntentFileError` | Nested error enumeration (cases not fetched). |
| `Specification`, `UnwrappedType`, `ValueType` | Type aliases | — |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS (no `introducedAt` value in the source JSON)
- Conforms to `Copyable`, `CustomLocalizedStringResourceConvertible`, `Decodable`, `DisplayRepresentable`, `Encodable`, `Equatable`, `Escapable`, `Hashable`, `InstanceDisplayRepresentable`, `IntentValueConvertible`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`, `TypeDisplayRepresentable`.
- Mentioned in the articles "Adding parameters to an app intent" and "Defining app entities for your custom data types".

## Related

- [IntentValueConvertible](./intentvalueconvertible.md)
- [IntentPerson](./intentperson.md)
