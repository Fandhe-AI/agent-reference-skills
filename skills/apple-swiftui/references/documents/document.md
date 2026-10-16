# Document / ReadableDocument / WritableDocument

Protocols that define a document model: `ReadableDocument` reads from file, `WritableDocument` writes to file, and `Document` combines both.

## Signature / Usage

```swift
protocol Document : ReadableDocument, WritableDocument
protocol ReadableDocument : AnyObject
protocol WritableDocument : AnyObject
```

```swift
@Observable
final class TextDocument: Document {
    static let readableContentTypes = [UTType.plainText]

    var text: String = ""

    func reader(configuration: sending ReadConfiguration) -> sending FileWrapperDocumentReader<String> {
        FileWrapperDocumentReader(configuration) { fileWrapper in
            guard let data =
                fileWrapper.regularFileContents else {
                throw CocoaError(.fileReadCorruptFile)
            }
            guard let string = String(data: data, encoding: .utf8) else {
                throw CocoaError(.fileReadCorruptFile)
            }
            return string
        }
    }

    func writer(configuration: sending WriteConfiguration) -> sending FileWrapperDocumentWriter<String> {
        FileWrapperDocumentWriter(configuration) { snapshot, _ in
            FileWrapper(
                regularFileWithContents: Data(snapshot.utf8)
            )
        }
    }

    @MainActor
    func snapshot(contentType: UTType) async throws -> sending String { text }

    @MainActor
    func apply(snapshot: sending String, previous: sending String?) async throws {
        text = snapshot
    }
}
```

## Options / Props

| Member | Protocol | Signature | Description |
|--------|----------|-----------|-------------|
| `readableContentTypes` | ReadableDocument | `static` | Content types the document can read. |
| `ReadConfiguration` | ReadableDocument | `typealias ReadConfiguration = DocumentReadConfiguration` | The configuration for reading document contents. |
| `reader(configuration:)` | ReadableDocument | `func reader(configuration: sending Self.ReadConfiguration) -> sending Self.Reader` | Creates a reader to load this document from disk. |
| `apply(snapshot:previous:)` | ReadableDocument | `@MainActor func apply(snapshot: sending Self.Reader.Snapshot, previous: sending Self.Reader.Snapshot?) async throws` | Applies a loaded snapshot to the document model. `previous` is `nil` on the first read. |
| `writableContentTypes` | WritableDocument | `static` | Content types the document can write. |
| `WriteConfiguration` | WritableDocument | `typealias WriteConfiguration = DocumentWriteConfiguration` | The configuration for writing document contents. |
| `writer(configuration:)` | WritableDocument | `func writer(configuration: sending Self.WriteConfiguration) -> sending Self.Writer` | Creates a writer to save this document to disk. |
| `snapshot(contentType:)` | WritableDocument | `@MainActor func snapshot(contentType: UTType) async throws -> sending Self.Writer.Snapshot` | Captures the document's current state for saving. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+.
- A readable document is a reference type so SwiftUI can keep a stable identity across updates; use `@Observable` for per-property change tracking.
- `reader(configuration:)` is called each time SwiftUI needs to read or re-read the document (on open, or when another process changes the file). Return a `FileWrapperDocumentReader` for simple cases or a `DocumentReader` for direct URL access.
- Saving has three steps: SwiftUI calls `snapshot(contentType:)` on the main actor, then `writer(configuration:)` to get a writer, then the writer's `write` runs in the background with coordinated file access.
- Keep `snapshot(contentType:)` and `apply(snapshot:previous:)` lightweight; do deserialization in the reader and serialization in the writer.
- Without registered undo actions, SwiftUI won't trigger autosave. Register undo actions with the `UndoManager` from the `View` environment for every user-facing change.
- For a read-only document, conform only to `ReadableDocument` and use the `viewer` / `makeReadableDocument` initializer of `DocumentGroup`. Set `CFBundleTypeRole` to `Viewer` in Info.plist.
- The document can be `@MainActor` or nonisolated, `Sendable` or not.
- `DocumentGroup` opts the app into autosaving, file coordination, undo management, and conflict resolution.
- Apple's original example uses `String(decoding:as:)`, which replaces invalid UTF-8 with U+FFFD instead of throwing; the example above keeps a failable decode so invalid files are rejected rather than silently rewritten on save.
- Source: https://developer.apple.com/documentation/swiftui/document

## Related

- [DocumentGroup](./documentgroup.md)
- [DocumentReader / DocumentWriter](./documentreader-writer.md)
- [Updating your document-based app](./updating-document-based-app.md)
