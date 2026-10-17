---
source: https://developer.apple.com/documentation/appintents/app-schema-base-types
---

# App schema base types (AppSchema / AppSchemaIntent / Entity / Enum)

Types that provide the underlying functionality for app schemas.

## Signature / Usage

```swift
struct AppSchema
```

```swift
protocol AppSchemaIntent
protocol AppSchemaEntity
protocol AppSchemaEnum
```

```swift
init(_: some AppSchemaIntent)
init(_: some AppSchemaEnum)
init(_: some AppSchemaEntity)
```

## Options / Props

| Type | Kind | Description |
|------|------|-------------|
| `AppSchema` | struct | Namespace for the system-defined schema domains (`AppSchema.AudioIntent`, `AppSchema.CalendarEntity`, `AppSchema.MailEnum`, and so on). Conforms to `Sendable` and `SendableMetatype`. Nested: `AppSchema.Intent`, `AppSchema.Entity`, `AppSchema.Enum` (structs), `AppSchema.Kind` (protocol). |
| `AppSchemaIntent` | protocol | Constraint for the `schema` argument of `AppIntent(schema:)`. |
| `AppSchemaEntity` | protocol | Constraint for the `schema` argument of `AppEntity(schema:)`. |
| `AppSchemaEnum` | protocol | Constraint for the `schema` argument of `AppEnum(schema:)`. |
| `AppSchema.<Domain>Intent` / `<Domain>Entity` / `<Domain>Enum` | protocols | Domain protocols from the `AppSchema` topics list: Assistant (`AssistantIntent`), Audio, Books, Browser, Calendar, Camera (`CameraIntent`, `CameraEnum`), Clock, Files, Journal, Mail, Maps, Messages, Notes (`NotesIntent`, `NotesEntity`), Phone, Photos, Presentation, Reader, Reminders, Spreadsheet, `SystemIntent`, `VisualIntelligenceIntent`, Whiteboard, WordProcessor. |

## Notes

- `AppSchema`: iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+. The `AppSchemaIntent` / `AppSchemaEntity` / `AppSchemaEnum` protocol pages have no abstract in the documentation.
- The page is an API collection with two groups: "Schema types" (`AppSchema`, `AppSchemaEnum`, `AppSchemaEntity`, `AppSchemaIntent`) and "Previous schema types" (`AssistantEnum`, `AssistantEntity`, `AssistantIntent`, `AssistantSchemaEnum`, `AssistantSchemaEntity`, `AssistantSchemaIntent`, `AssistantSchema` (deprecated), `AssistantSchemas`).
- You normally do not conform to these protocols yourself. Pick a schema from a domain and apply it with `AppIntent(schema:)`, `AppEntity(schema:)`, or `AppEnum(schema:)`.
- These base types belong to App Intents app schemas, not to the Foundation Models framework (`LanguageModelSession` / `Tool`).

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [Previous schema types](./assistant-schemas-legacy.md)
