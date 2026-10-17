---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-spreadsheet
---

# Spreadsheet domain

Make your spreadsheet app's actions available in the Shortcuts app by adopting schemas for spreadsheet management.

## Signature / Usage

```swift
@AppIntent(schema: .spreadsheet.open)
struct OpenSpreadsheetIntent: OpenIntent {
    var target: <#SpreadsheetEntity#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

The `.spreadsheet` domain defines app schemas that provide a structured representation for common spreadsheet actions and content. Xcode generates a template implementation when you type `spreadsheet_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.SpreadsheetIntent`, "Identifies intent schemas in the spreadsheet domain."):

| Name | Type | Description |
| --- | --- | --- |
| `addAudioToSheet` | `var addAudioToSheet: some AppSchemaIntent` | An intent schema that adds an audio clip to a sheet. |
| `addCommentToSheet` | `var addCommentToSheet: some AppSchemaIntent` | An intent schema that adds a comment to a sheet. |
| `addImageToSheet` | `var addImageToSheet: some AppSchemaIntent` | An intent schema that adds an image to a sheet. |
| `addTextBoxToSheet` | `var addTextBoxToSheet: some AppSchemaIntent` | An intent schema that adds text to a sheet. |
| `addVideoToSheet` | `var addVideoToSheet: some AppSchemaIntent` | An intent schema that adds a video to a sheet. |
| `addWebVideoToSheet` | `var addWebVideoToSheet: some AppSchemaIntent` | An intent schema that adds a web video to a sheet. |
| `create` | `var create: some AppSchemaIntent` | An intent schema that opens the app for composing a new spreadsheet. |
| `createSheet` | `var createSheet: some AppSchemaIntent` | An intent schema that creates a new sheet in a spreadsheet. |
| `delete` | `var delete: some AppSchemaIntent` | An intent schema that deletes existing spreadsheets. |
| `deleteSheet` | `var deleteSheet: some AppSchemaIntent` | An intent schema that deletes sheets in a spreadsheet. |
| `open` | `var open: some AppSchemaIntent` | An intent schema that opens the app into an existing spreadsheet. |
| `openSheet` | `var openSheet: some AppSchemaIntent` | An intent schema that opens a sheet. |
| `update` | `var update: some AppSchemaIntent` | An intent schema that renames an existing spreadsheet. |
| `updateSheet` | `var updateSheet: some AppSchemaIntent` | An intent schema that updates an existing sheet. |

Content and parameter types (`AppSchema.SpreadsheetEntity`, "Identifies entity schemas in the spreadsheet domain."):

| Name | Type | Description |
| --- | --- | --- |
| `document` | `var document: some AppSchemaEntity` | An entity schema for a document. |
| `sheet` | `var sheet: some AppSchemaEntity` | An entity schema for a sheet. |
| `template` | `var template: some AppSchemaEntity` | An entity schema for a template. |

## Notes

- Platforms (taken from the `open` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `open` is Shortcuts.
- This is one of the Shortcuts-specific domains; the primary Apple Intelligence / Siri domains live in the `app-schemas` category. The domain has no enum schemas and no deprecated schemas listed.
- Applying a schema: `@AppIntent(schema: .spreadsheet.open)` generates the properties and protocol conformance the schema requires for the intent implementation.
- Snippet source: the example code on the `open` action page, reproduced verbatim.

## Related

- [Presentation domain](./domain-presentation.md)
- [Word processor domain](./domain-word-processor.md)
- [OpenIntent](../intent-types/openintent.md)
