---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-word-processor
---

# Word processor domain

Make your word processor's actions available in the Shortcuts app by adopting schemas for document editing.

## Signature / Usage

```swift
@AppIntent(schema: .wordProcessor.open)
struct OpenWordProcessorDocumentIntent: OpenIntent {
    var target: <#WordProcessorDocumentEntity#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

The `.wordProcessor` domain defines app schemas that provide a structured representation for common document editing actions and content. Xcode generates a template implementation when you type `wordProcessor_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.WordProcessorIntent`, "Identifies intent schemas in the word processor domain."):

| Name | Type | Description |
| --- | --- | --- |
| `addAudioToPage` | `var addAudioToPage: some AppSchemaIntent` | An intent schema that adds an audio clip to a page. |
| `addImageToPage` | `var addImageToPage: some AppSchemaIntent` | An intent schema that adds an image to a page. |
| `addTextBoxToPage` | `var addTextBoxToPage: some AppSchemaIntent` | An intent schema that adds a textbox to a page. |
| `addVideoToPage` | `var addVideoToPage: some AppSchemaIntent` | An intent schema that adds a video to a page. |
| `addWebVideoToPage` | `var addWebVideoToPage: some AppSchemaIntent` | An intent schema that adds a web video to a page. |
| `create` | `var create: some AppSchemaIntent` | An intent schema that opens the app for composing a new text document. |
| `createPage` | `var createPage: some AppSchemaIntent` | An intent schema that creates a new page in an editor document. |
| `open` | `var open: some AppSchemaIntent` | An intent schema that opens the app to an editor. |
| `openPage` | `var openPage: some AppSchemaIntent` | An intent schema that opens an editor document page. |

Content and parameter types (`AppSchema.WordProcessorEntity`, "Identifies entity schemas in the word processor domain."):

| Name | Type | Description |
| --- | --- | --- |
| `document` | `var document: some AppSchemaEntity` | An entity schema for a document. |
| `page` | `var page: some AppSchemaEntity` | An entity schema for a page. |
| `template` | `var template: some AppSchemaEntity` | An entity schema for a template. |

## Notes

- Platforms (taken from the `open` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `open` is Shortcuts.
- This is one of the Shortcuts-specific domains; the primary Apple Intelligence / Siri domains live in the `app-schemas` category. The domain has no enum schemas and no deprecated schemas listed.
- The domain accessor is camel-cased: `.wordProcessor` (macro argument `.wordProcessor.open`, Xcode prefix `wordProcessor_`).
- Snippet source: the example code on the `open` action page, reproduced verbatim.

## Related

- [Presentation domain](./domain-presentation.md)
- [Spreadsheet domain](./domain-spreadsheet.md)
- [Reader domain](./domain-reader.md)
- [OpenIntent](../intent-types/openintent.md)
