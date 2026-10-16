# DocumentGroup

A scene that enables support for opening, creating, and saving documents.

## Signature / Usage

```swift
@main
struct MyApp: App {
    var body: some Scene {
        DocumentGroup { document in
            TextEditorView(document: document)
        } makeDocument: { configuration, context in
            TextDocument()
        }
    }
}
```

```swift
nonisolated struct DocumentGroup<Document, Content> where Content : View
```

## Options / Props

Initializers (iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+):

| Initializer | Description |
|-------------|-------------|
| `init(allowCreating: Bool = true, @ContentBuilder editor: @escaping (Document) -> Content, makeDocument: @escaping @MainActor (URLDocumentConfiguration, DocumentCreationContext) async throws -> Document)` | Creates a document group capable of creating, viewing, and editing documents. |
| `init(@ContentBuilder viewer: @escaping (Document) -> Content, makeReadableDocument: @escaping @MainActor (URLDocumentConfiguration, DocumentCreationContext) async throws -> Document)` | Creates a document group capable of opening and viewing read-only documents. |

Parameters:

| Name | Description |
|------|-------------|
| `allowCreating` | Whether the document group supports creating new documents in addition to opening and editing existing ones. |
| `editor` | The editing UI for the provided document. |
| `viewer` | The viewing UI for the provided document. |
| `makeDocument` | A closure that creates the document instance. Throw `CancellationError` to indicate that document creation was cancelled. |
| `makeReadableDocument` | A closure that creates the document instance. Throw `CancellationError` to indicate that document opening was cancelled. |

Other initializers (names only):

| Group | Initializers |
|-------|--------------|
| Editing a document backed by a persistent store | `init(editing:contentType:editor:prepareDocument:)`, `init(editing:migrationPlan:editor:prepareDocument:)` |
| Viewing a document backed by a persistent store | `init(viewing:contentType:viewer:)`, `init(viewing:migrationPlan:viewer:)` |
| Deprecated | `init(newDocument:editor:)`, `init(viewing:viewer:)` |

## Notes

- `DocumentGroup` itself: iOS 14.0+, iPadOS 14.0+, Mac Catalyst 14.0+, macOS 11.0+, visionOS 1.0+. Not available on tvOS or watchOS.
- The two closure-based initializers above are 27.0+. They take `Document` types (see `document.md`).
- `init(newDocument:editor:)` (for a `FileDocument`, `editor` receives `FileDocumentConfiguration<Document>`; for a `ReferenceFileDocument`, `editor` receives `ReferenceFileDocumentConfiguration<Document>`) is deprecated at 27.2: "Conform your type to Document instead." Existing code such as `DocumentGroup(newDocument: TextFile()) { configuration in ContentView(document: configuration.$document) }` still compiles but is no longer the recommended path.
- Every document-based app must include `CFBundleDocumentTypes` in its Info.plist. Declare custom types with `UTExportedTypeDeclarations`; register another app's type with `UTImportedTypeDeclarations`. Types the OS defines (e.g. `UTType.utf8PlainText`) need no declaration. Regular files must conform to `UTType/data`, packages to `UTType/package`.
- SwiftUI checks each `DocumentGroup` in the scene body from top to bottom and uses the first one whose document's `readableContentTypes` includes a type the file conforms to. Content types are hierarchical; a group matches files whose type conforms to one of its `readableContentTypes`. Declare more specific types first.
- When creating a new document, the configuration's `fileURL` is `nil`. Do not access the document's contents or metadata through the URL; it can conflict with SwiftUI's file management.
- Value-type documents are tracked through the document binding; reference-type documents are tracked through changes registered with `EnvironmentValues.undoManager`.
- Source: https://developer.apple.com/documentation/swiftui/documentgroup

## Related

- [Document / ReadableDocument / WritableDocument](./document.md)
- [URLDocumentConfiguration / DocumentCreationContext](./urldocumentconfiguration.md)
- [Updating your document-based app](./updating-document-based-app.md)
