---
source: https://developer.apple.com/documentation/appintents/assistantschemas
---

# Previous schema types (Assistant* / AssistantSchemas, deprecated macros included)

The earlier assistant-schema API: `AssistantSchemas` and the `AssistantIntent(schema:)` / `AssistantEntity(schema:)` / `AssistantEnum(schema:)` macros. The documentation lists these under "Previous schema types" and "Deprecated macros".

## Signature / Usage

```swift
enum AssistantSchemas
```

```swift
@attached(memberAttribute) @attached(extension, conformances: AssistantSchemaIntent, ShowInAppSearchResultsIntent, names: named(__assistantSchemaIntent)) macro AssistantIntent<T>(schema: T) where T : AssistantSchemas.Intent
```

```swift
@attached(memberAttribute) @attached(extension, conformances: AppEntity, AssistantSchemaEntity, names: named(__assistantSchemaEntity)) macro AssistantEntity<T>(schema: T) where T : AssistantSchemas.Entity
```

```swift
@attached(extension, conformances: AssistantSchemaEnum, names: named(__assistantSchemaEnum)) macro AssistantEnum<T>(schema: T) where T : AssistantSchemas.Enum
```

## Options / Props

| Member of `AssistantSchemas` | Kind | Description |
|------|------|-------------|
| `Intent`, `Entity`, `Enum`, `Model` | protocol | Base protocols (no abstract in the documentation). |
| `IntentSchema`, `EntitySchema`, `EnumSchema` | struct | Schema value types. |
| `AssistantIntent` | protocol | Assistant schema conformance for types you use for assistant functionality. |
| `BooksIntent` / `BooksEntity` / `BooksEnum` | protocol | Ebook and audiobook schemas. |
| `BrowserIntent` / `BrowserEntity` / `BrowserEnum` | protocol | Web browsing schemas. |
| `CameraIntent` / `CameraEnum` | protocol | Camera schemas. |
| `FilesIntent` / `FilesEntity` | protocol | File management schemas. |
| `JournalIntent` / `JournalEntity` | protocol | Journaling schemas. |
| `MailIntent` / `MailEntity` | protocol | Email schemas. |
| `PhotosIntent` / `PhotosEntity` / `PhotosEnum` | protocol | Photo and video schemas. |
| `PresentationIntent` / `PresentationEntity` | protocol | Presentation schemas. |
| `ReaderIntent` / `ReaderEntity` / `ReaderEnum` | protocol | Document viewing and editing schemas. |
| `SpreadsheetIntent` / `SpreadsheetEntity` | protocol | Spreadsheet schemas. |
| `SystemIntent` | protocol | Assistant schema conformance for types you use for system functionality. |
| `VisualIntelligenceIntent` | protocol | App intents that match visual intelligence intents. |
| `WhiteboardIntent` / `WhiteboardEntity` / `WhiteboardEnum` | protocol | Whiteboard schemas. |
| `WordProcessorIntent` / `WordProcessorEntity` | protocol | Word processing / text document schemas. |

## Notes

- `AssistantSchemas`, `AssistantIntent(schema:)`, `AssistantEntity(schema:)`, `AssistantEnum(schema:)`: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS 1.0+, watchOS 9.0+.
- Deprecated: the three macros are flagged `deprecated` in the documentation index (section "Deprecated macros"), as are the `AssistantSchemas` member protocols and structs and `AssistantSchema`. The `AssistantSchemas` enum page itself is not flagged. No `deprecationSummary` or replacement is stated on these pages; the current API is the `AppSchema` family (see app-schema-base-types) with `AppIntent(schema:)`, `AppEntity(schema:)`, and `AppEnum(schema:)`.
- Only the macro pages and the `AssistantSchemas` page were fetched; per-member details of `AssistantSchemas.*` are not reproduced here beyond the abstracts.
- Unrelated to the Foundation Models framework (`LanguageModelSession` / `Tool`).

## Related

- [App schema base types](./app-schema-base-types.md)
- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
