# fileExporter(isPresented:document:contentType:defaultFilename:onCompletion:onCancellation:)

Presents a system dialog for allowing the user to export a `WritableDocument` to a file on disk.

## Signature / Usage

```swift
nonisolated func fileExporter<D>(
    isPresented: Binding<Bool>,
    document: D?,
    contentType: UTType? = nil,
    defaultFilename: String? = nil,
    onCompletion: @escaping (Result<URL, any Error>) -> Void,
    onCancellation: (() -> Void)? = nil
) -> some View where D : WritableDocument, D.Writer.Destination == URL
```

```swift
@MainActor
final class TextDocument: WritableDocument {
    static let writableContentTypes: [UTType] = [.utf8PlainText]

    var text: String = ""

    nonisolated func writer(
        configuration: sending WriteConfiguration
    ) -> sending FileWrapperDocumentWriter<String> {
        FileWrapperDocumentWriter(configuration) { snapshot, _ in
            FileWrapper(regularFileWithContents: Data(snapshot.utf8))
        }
    }

    func snapshot(contentType: UTType) async throws -> String {
        text
    }
}

struct ExportView: View {
    @State private var document = TextDocument()
    @State private var isExporting = false

    var body: some View {
        Button("Export…") { isExporting = true }
            .fileExporter(
                isPresented: $isExporting,
                document: document,
                defaultFilename: "Untitled"
            ) { _ in }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isPresented` | `Binding<Bool>` | A binding to whether the dialog should be shown. |
| `document` | `D?` | The in-memory document to export. |
| `contentType` | `UTType?` | The content type to export to. If not provided, `WritableDocument.writableContentTypes` are used. |
| `defaultFilename` | `String?` | The default name for the exported file, which the user can edit before export. |
| `onCompletion` | `(Result<URL, any Error>) -> Void` | Invoked when the operation has succeeded or failed. |
| `onCancellation` | `(() -> Void)?` | Invoked if the user cancels the operation. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+. This overload is for `WritableDocument`.
- The dialog appears only when `document` is non-nil.
- When the operation finishes, `isPresented` is set to `false` before `onCompletion` is called. On cancel, `isPresented` is set to `false` and `onCancellation` is called.
- Instead of `String`, the snapshot can be `Data` or any other type.
- Source: https://developer.apple.com/documentation/swiftui/view/fileexporter(ispresented:document:contenttype:defaultfilename:oncompletion:oncancellation:)

## Related

- [Document / ReadableDocument / WritableDocument](./document.md)
- [DocumentReader / DocumentWriter](./documentreader-writer.md)
