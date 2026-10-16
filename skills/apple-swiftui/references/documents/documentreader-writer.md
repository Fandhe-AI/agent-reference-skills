# DocumentReader / DocumentWriter / FileWrapperDocumentReader / FileWrapperDocumentWriter

Types that read a document's content from a file and write it back, used by `ReadableDocument.reader(configuration:)` and `WritableDocument.writer(configuration:)`.

## Signature / Usage

```swift
protocol DocumentReader<Snapshot>
protocol DocumentWriter<Snapshot>
struct FileWrapperDocumentReader<Snapshot>   // conforms to DocumentReader
struct FileWrapperDocumentWriter<Snapshot>   // conforms to DocumentWriter
```

```swift
// Recommended for most documents
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
        FileWrapper(regularFileWithContents: Data(snapshot.utf8))
    }
}
```

Custom reader with direct URL access:

```swift
struct ImageReader: DocumentReader {
    @concurrent
    func read(from source: URL, progress: consuming Subprogress)
        async throws -> sending CGImage {
        guard let provider =
            CGDataProvider(url: source as CFURL),
              let image = CGImage(
                  jpegDataProviderSource: provider,
                  decode: nil, shouldInterpolate: true,
                  intent: .defaultIntent
              ) else {
            throw CocoaError(.fileReadCorruptFile)
        }
        return image
    }
}
```

## Options / Props

| Member | Signature | Description |
|--------|-----------|-------------|
| `DocumentReader.read(from:progress:)` | `@concurrent func read(from source: sending Self.Source, progress: consuming Subprogress) async throws -> sending Self.Snapshot` | Reads the document's content from disk. Returns a snapshot. |
| `DocumentWriter.write(snapshot:to:previous:progress:)` | `@concurrent func write(snapshot: sending Self.Snapshot, to destination: sending Self.Destination, previous: sending Self.Snapshot?, progress: consuming Subprogress) async throws` | Writes the document content to disk. |
| `FileWrapperDocumentReader.init(_:makeSnapshot:)` | closure converts a `FileWrapper` into a snapshot | Creates a reader. |
| `FileWrapperDocumentWriter.init(_:makeFileWrapper:)` | closure converts the snapshot (and the previous `FileWrapper`, when available) into a `FileWrapper` | Creates a writer. |

Parameters of `read` / `write`:

| Name | Description |
|------|-------------|
| `source` | The file URL to read from. |
| `destination` | The file URL to write to. |
| `snapshot` | The snapshot to write to disk. |
| `previous` | The last successfully written snapshot, or `nil` on the first save. Compare to `snapshot` to write only what changed in package documents. |
| `progress` | A `Subprogress` value. Consume it once with `reporter(totalCount:)` and call `complete(count:)` as units finish. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+.
- SwiftUI invokes `read` / `write` in the background with coordinated file access. The snapshot returned by `read` is delivered to `apply(snapshot:previous:)` on the main actor; the snapshot passed to `write` comes from `snapshot(contentType:)`.
- Use `FileWrapperDocumentReader` / `FileWrapperDocumentWriter` unless you need direct URL access (Core Graphics, AVFoundation, PDFKit) or streaming writes.
- For package documents, navigate the `FileWrapper` hierarchy in the reader closure. `FileWrapper` loads file contents on demand, so a child file may be gone by the time you call `regularFileContents`; always handle errors when reading children of a package.
- The `FileWrapperDocumentReader` closure does not receive a `Subprogress`. To report progress during reads, use a custom `DocumentReader`.
- For single-file documents, `FileWrapperDocumentWriter` can ignore the `previous` argument and return a freshly built wrapper.
- Apple's original example uses `String(decoding:as:)`, which replaces invalid UTF-8 with U+FFFD instead of throwing; the example above keeps a failable decode so invalid files are rejected rather than silently rewritten on save.
- Source: https://developer.apple.com/documentation/swiftui/documentreader
- Source: https://developer.apple.com/documentation/swiftui/documentwriter

## Related

- [Document / ReadableDocument / WritableDocument](./document.md)
- [URLDocumentConfiguration / DocumentCreationContext](./urldocumentconfiguration.md)
