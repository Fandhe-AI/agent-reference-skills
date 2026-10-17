---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-files
---

# Files domain

Make your app's file-management actions available in the Shortcuts app.

## Signature / Usage

```swift
@AppIntent(schema: .files.openFile)
struct OpenFileIntent: OpenIntent {
    var target: <#FileEntity#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

The `.files` domain defines app schemas that provide a structured representation for common file-management actions your app can do. Xcode generates a template implementation when you type `files_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.FilesIntent`, "Identifies intent schemas in the files domain."):

| Name | Type | Description |
| --- | --- | --- |
| `createFolder` | `var createFolder: some AppSchemaIntent` | An intent schema that creates a new folder. |
| `deleteFiles` | `var deleteFiles: some AppSchemaIntent` | An intent schema that deletes existing files or folders. |
| `moveFiles` | `var moveFiles: some AppSchemaIntent` | An intent schema that moves existing files or folders. |
| `openFile` | `var openFile: some AppSchemaIntent` | An intent schema that opens a selected file or folder. |
| `renameFile` | `var renameFile: some AppSchemaIntent` | An intent schema that renames an existing file or folder. |

Content and parameter types (`AppSchema.FilesEntity`, "Identifies entity schemas in the files domain."):

| Name | Type | Description |
| --- | --- | --- |
| `file` | `var file: some AppSchemaEntity` | An entity schema for a file. |

## Notes

- Platforms (taken from the `openFile` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `openFile` is Shortcuts.
- This is one of the Shortcuts-specific domains; the primary Apple Intelligence / Siri domains live in the `app-schemas` category. The domain has no enum schemas and no deprecated schemas listed.
- The `<#FileEntity#>` placeholder in the snippet stands for an entity type you define for the `file` schema; the source page does not say it is the framework `FileEntity` protocol from the `entities` category.
- Applying a schema: `@AppIntent(schema: .files.openFile)` generates the properties and protocol conformance the schema requires for the intent implementation.
- Snippet source: the example code on the `openFile` action page, reproduced verbatim.

## Related

- [Books domain](./domain-books.md)
- [Reader domain](./domain-reader.md)
- [OpenIntent](../intent-types/openintent.md)
