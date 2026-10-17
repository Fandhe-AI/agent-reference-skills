---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-journaling
---

# Journaling domain

Make your journaling app's actions available in the Shortcuts app by adopting schemas for journal-entry management.

## Signature / Usage

```swift
@AppIntent(schema: .journal.createEntry)
struct CreateJournalEntryIntent {
    var message: AttributedString
    var title: String?
    var location: GeoToolbox.PlaceDescriptor?
    var mediaItems: [IntentFile]
    var entryDate: Date?

    func perform() async throws -> some ReturnsValue<<#JournalEntity#>> {
        <#code#>
    }
}
```

The domain accessor is `.journal` (the page title is "Journaling"). It defines app schemas that provide a structured representation for common journaling actions and content. Xcode generates a template implementation when you type `journal_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.JournalIntent`, "Identifies intent schemas in the journal domain."):

| Name | Type | Description |
| --- | --- | --- |
| `createAudioEntry` | `var createAudioEntry: some AppSchemaIntent` | An intent schema that creates a new audio journal entry. |
| `createEntry` | `var createEntry: some AppSchemaIntent` | An intent schema that creates a new journal entry. |
| `deleteEntry` | `var deleteEntry: some AppSchemaIntent` | An intent schema that deletes the specified journal entries. |
| `updateEntry` | `var updateEntry: some AppSchemaIntent` | An intent schema that updates journal entry. |

Content and parameter types (`AppSchema.JournalEntity`, "Identifies entity schemas in the journal domain."):

| Name | Type | Description |
| --- | --- | --- |
| `entry` | `var entry: some AppSchemaEntity` | An entity schema for an entry. |

Deprecated schemas (marked deprecated in the domain's topic list; no replacement stated on the page):

| Name | Type | Description |
| --- | --- | --- |
| `search` | `var search: some AppSchemaIntent` | An intent schema that searches journal entries. |

## Notes

- Platforms (taken from the `createEntry` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `createEntry` is Shortcuts.
- This is one of the Shortcuts-specific domains; the primary Apple Intelligence / Siri domains live in the `app-schemas` category. The domain has no enum schemas.
- The `location` parameter in the snippet uses `GeoToolbox.PlaceDescriptor` exactly as written in the source example.
- Snippet source: the example code on the `createEntry` action page, reproduced verbatim.

## Related

- [Books domain](./domain-books.md)
- [Word processor domain](./domain-word-processor.md)
