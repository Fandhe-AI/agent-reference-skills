# URLDocumentConfiguration / DocumentCreationContext

`URLDocumentConfiguration` is the configuration of an open document (file URL, last modification date, related metadata). `DocumentCreationContext` describes how a document was created. Both are passed to the `makeDocument` closure of `DocumentGroup`.

## Signature / Usage

```swift
@MainActor final class URLDocumentConfiguration
struct DocumentCreationContext
```

```swift
DocumentGroup { document in
    EditorView(document: document)
} makeDocument: { configuration, context in
    let document = NotesDocument()
    if context.creationSource == .checklist {
        document.template = .checklist
    }
    return document
}
```

Coordinated access outside the normal read/write flow:

```swift
let coordinator = configuration.makeFileCoordinator()
var error: NSError?
coordinator.coordinate(
    readingItemAt: pageURL, options: [], error: &error
) { url in
    let data = try? Data(contentsOf: url)
    // ...
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `URLDocumentConfiguration.fileURL` | property | The document's file URL. |
| `URLDocumentConfiguration.lastContentModificationDate` | property | Last content modification date. |
| `URLDocumentConfiguration.creationSource` | property | How the document was created. |
| `URLDocumentConfiguration.makeFileCoordinator()` | `@MainActor final func makeFileCoordinator() -> sending NSFileCoordinator` | Creates a file coordinator for coordinated disk access outside the normal read/write flow. |
| `DocumentCreationContext.creationSource` | property | Identifies which `NewDocumentButton` the person tapped. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+.
- `URLDocumentConfiguration` is `@Observable`; views can track changes to `fileURL` and other properties. It conforms to `Observable`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- Inside `read(from:progress:)` and `DocumentWriter.write`, use the `source` / `destination` URL parameter, not `fileURL`. The configuration's URL reflects current state and may differ from the operation's URL after Save As or rename.
- Call `makeFileCoordinator()` every time to get a new coordinator for each separate read or write; do not reuse coordinators across operations because `NSFileCoordinator` is not `Sendable`. SwiftUI coordinates access for `read` / `write` automatically.
- Source: https://developer.apple.com/documentation/swiftui/urldocumentconfiguration

## Related

- [DocumentGroup](./documentgroup.md)
- [DocumentReader / DocumentWriter](./documentreader-writer.md)
