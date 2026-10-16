# Updating your document-based app (FileDocument → Document)

Migrate an existing app to adopt URL-based document reading and writing with Swift concurrency.

## Signature / Usage

Before (`FileDocument`) and after (`Document`):

```swift
// Before
struct TextDocument: FileDocument {
    static let readableContentTypes: [UTType] = [.plainText]

    var text: String

    init(text: String = "") {
        self.text = text
    }

    init(configuration: ReadConfiguration) throws {
        guard let data = configuration.file.regularFileContents,
              let string = String(data: data, encoding: .utf8)
        else {
            throw CocoaError(.fileReadCorruptFile)
        }
        text = string
    }

    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        let data = Data(text.utf8)
        return FileWrapper(regularFileWithContents: data)
    }
}

DocumentGroup(newDocument: TextDocument()) { file in
    TextEditor(text: file.$document.text)
}
```

```swift
// After
@Observable
final class TextDocument: Document {
    static let readableContentTypes: [UTType] = [.plainText]

    var text: String

    init(text: String = "") {
        self.text = text
    }

    func reader(configuration: sending ReadConfiguration) -> sending FileWrapperDocumentReader<String> {
        FileWrapperDocumentReader(configuration) { fileWrapper in
            guard let data = fileWrapper.regularFileContents else {
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
    func setText(_ newValue: String, undoManager: UndoManager?) {
        let oldValue = text
        guard oldValue != newValue else { return }
        undoManager?.registerUndo(withTarget: self) { document in
            document.setText(oldValue, undoManager: undoManager)
        }
        text = newValue
    }

    @MainActor
    func snapshot(contentType: UTType) async throws -> sending String {
        text
    }

    @MainActor
    func apply(snapshot: sending String, previous: sending String?) async throws {
        text = snapshot
    }
}

DocumentGroup { document in
    TextDocumentView(document: document)
} makeDocument: { _, _ in
    TextDocument()
}

struct TextDocumentView: View {
    var document: TextDocument
    @Environment(\.undoManager) private var undoManager

    var body: some View {
        TextEditor(
            text: Binding(
                get: { document.text },
                set: { document.setText($0, undoManager: undoManager) }
            )
        )
    }
}
```

## Options / Props

Protocol comparison:

| | FileDocument | ReferenceFileDocument | Document |
|---|---|---|---|
| Type | Value (`struct`) | Reference (`class`) | Reference (`class`) |
| Reading | `init(configuration:)` | `init(configuration:)` | `reader(configuration:)` + `apply(snapshot:previous:)` |
| Writing | `fileWrapper(configuration:)` | `fileWrapper(snapshot:configuration:)` | `writer(configuration:)` + `snapshot(contentType:)` |
| Reading and writing execution | Synchronous | Synchronous | `async`/`sending` with explicit actor boundaries |
| File access | `FileWrapper` only | `FileWrapper` only | URL or `FileWrapper` |
| Undo | Automatic (value semantics) | Manual (`UndoManager`) | Manual (`UndoManager`) |
| Observation | N/A (value type) | `ObservableObject` | `@Observable` |

Before / After (from `FileDocument`):

| Before | After |
|--------|-------|
| `FileDocument` | `Document` |
| `struct` (value type) | `@Observable` `final class` (reference type) |
| `init(configuration:)` | Separate `DocumentReader` |
| `fileWrapper(configuration:)` | Separate `DocumentWriter` |
| Implicit snapshot (value semantics) | Explicit `snapshot(contentType:)` method |
| Automatic undo via `Binding` | Manual undo registration with `UndoManager` |
| `DocumentGroup(newDocument:)` | `DocumentGroup` closure-based initializer |

Before / After (from `ReferenceFileDocument`):

| Before | After |
|--------|-------|
| `ReferenceFileDocument` | `Document` |
| `init(configuration:)` | Separate `DocumentReader` |
| `fileWrapper(snapshot:configuration:)` | Separate `DocumentWriter` |
| `FileWrapper` only | `FileWrapper` and URL access through `DocumentReader` and `DocumentWriter` |
| Single `Snapshot` type on `ReferenceFileDocument` | Separate `Snapshot` types on `DocumentWriter` and `DocumentReader` |

## Notes

- In releases before iOS 27, iPadOS 27, macOS 27, and visionOS 27, document types conform to `FileDocument` or `ReferenceFileDocument`. In these and later releases, conform to `Document`, or to `ReadableDocument` / `WritableDocument` depending on what the app does.
- Official text: "Although `FileDocument` and `ReferenceFileDocument` remain available, they're no longer supported for new document types."
- `FileDocument` (iOS / iPadOS / Mac Catalyst 14.0+, macOS 11.0+, visionOS 1.0+) is deprecated at 27.2: "Conform your type to Document instead."
- `ReferenceFileDocument` (same introduced versions) is deprecated at 27.2 on iOS / iPadOS / Mac Catalyst / macOS: "Use Document protocol instead." The source data shows no deprecation version for visionOS.
- `DocumentGroup(newDocument:editor:)` is deprecated at 27.2 as well; replace it with the closure-based initializer that receives `URLDocumentConfiguration` and `DocumentCreationContext`.
- `FileDocument` checklist: convert the struct to an `@Observable` final class; split reading into a `FileWrapperDocumentReader` and implement `apply(snapshot:previous:)`; split writing into a `FileWrapperDocumentWriter` and implement `snapshot(contentType:)` (`async throws`, `sending` return); add manual undo registration; update the `DocumentGroup` initializer; replace `@Binding var document` with a direct reference and use `@Bindable`.
- `ReferenceFileDocument` checklist: mark the class `@Observable` and remove `ObservableObject` / `@Published`; same reader / writer / `apply` / `snapshot` split; update the `DocumentGroup` initializer; audit undo registration.
- The undo manager from the environment in your content view is already connected to the document.
- Official wording of the "After" `FileWrapperDocumentWriter` closure in the `FileDocument` example omits the second (`previous`) closure parameter, while the `Document` page and the `ReferenceFileDocument` example use two parameters (`snapshot, _` / `snapshot, previous`). The code above uses the two-parameter form.
- The Before example adds `init(text:)` relative to Apple's original, which calls `TextDocument()` without a no-argument initializer.
- Apple's original example uses `String(decoding:as:)`, which replaces invalid UTF-8 with U+FFFD instead of throwing; the example above keeps a failable decode so invalid files are rejected rather than silently rewritten on save.
- Apple's original registers undo in `onChange(of:)`; that runs after an undo completes, so it records a new undo instead of a redo and clears the redo stack. The example above registers the inverse synchronously from the binding setter.
- Source: https://developer.apple.com/documentation/swiftui/updating-your-document-based-app

## Related

- [Document / ReadableDocument / WritableDocument](./document.md)
- [DocumentGroup](./documentgroup.md)
- [DocumentReader / DocumentWriter](./documentreader-writer.md)
- [URLDocumentConfiguration / DocumentCreationContext](./urldocumentconfiguration.md)
