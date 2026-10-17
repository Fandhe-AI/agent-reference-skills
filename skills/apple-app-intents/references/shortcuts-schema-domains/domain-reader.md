---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-reader
---

# Reader domain

Make your document reader's actions available in the Shortcuts app by adopting schemas for document viewing and manipulation.

## Signature / Usage

```swift
@AppIntent(schema: .reader.openDocument)
struct ReaderOpenDocumentsIntent {
    var files: [IntentFile]

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

The `.reader` domain defines app schemas that provide a structured representation for common document reading actions and content. Xcode generates a template implementation when you type `reader_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.ReaderIntent`, "Identifies intent schemas in the reader domain."):

| Name | Type | Description |
| --- | --- | --- |
| `deletePages` | `var deletePages: some AppSchemaIntent` | An intent schema that deletes the specified pages. |
| `enhanceDocuments` | `var enhanceDocuments: some AppSchemaIntent` | An intent schema that enhances the documents. |
| `insertPages` | `var insertPages: some AppSchemaIntent` | An intent schema that inserts pages from the specified files. |
| `openDocument` | `var openDocument: some AppSchemaIntent` | An intent schema that opens the specified files in the reader. |
| `openPage` | `var openPage: some AppSchemaIntent` | An intent schema that opens the app to the specified document page. |
| `resizeDocuments` | `var resizeDocuments: some AppSchemaIntent` | An intent schema that resizes the documents to a particular width and height. |
| `rotateDocuments` | `var rotateDocuments: some AppSchemaIntent` | An intent schema that rotates the documents in the specified direction. |
| `rotatePages` | `var rotatePages: some AppSchemaIntent` | An intent schema that rotates the pages in the specified direction. |
| `searchDocuments` | `var searchDocuments: some AppSchemaIntent` | An intent schema that searches for text in the documents. |

Content and parameter types (`AppSchema.ReaderEntity`, "Identifies entity schemas in the reader domain."):

| Name | Type | Description |
| --- | --- | --- |
| `document` | `var document: some AppSchemaEntity` | An entity schema for a document. |
| `page` | `var page: some AppSchemaEntity` | An entity schema for a page. |

Types for static parameters (`AppSchema.ReaderEnum`, "Identifies enum schemas in the reader domain."):

| Name | Type | Description |
| --- | --- | --- |
| `documentKind` | `var documentKind: some AppSchemaEnum` | An enum schema for a document kind parameter. |

## Notes

- Platforms (taken from the `openDocument` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `openDocument` is Shortcuts.
- This is one of the Shortcuts-specific domains; the primary Apple Intelligence / Siri domains live in the `app-schemas` category. No deprecated schemas are listed.
- Applying a schema: `@AppIntent(schema: .reader.openDocument)` generates the properties and protocol conformance the schema requires for the intent implementation.
- Snippet source: the example code on the `openDocument` action page, reproduced verbatim.

## Related

- [Books domain](./domain-books.md)
- [Files domain](./domain-files.md)
- [Word processor domain](./domain-word-processor.md)
