---
source: https://developer.apple.com/documentation/appintents/appentity(schema:)
---

# AppEntity(schema:)

A Swift macro you use to make sure your app entity conforms to a schema.

## Signature / Usage

```swift
@attached(memberAttribute) @attached(extension, conformances: AppEntity, AssistantSchemaEntity, FileEntity, UniqueAppEntity, URLRepresentableEntity, names: named(__appSchemaEntity)) macro AppEntity<T>(schema: T) where T : AppSchemaEntity
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `schema` | `T where T : AppSchemaEntity` | An entity schema selected from a domain, for example an entity property of an `AppSchema.<Domain>Entity` protocol such as `AppSchema.CalendarEntity.event` (see the domain pages in this category). |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- The macro attaches `AppEntity` and `AssistantSchemaEntity` conformances, plus `FileEntity`, `UniqueAppEntity`, and `URLRepresentableEntity` as listed in the declaration, according to the chosen schema.
- The official page carries no code listing. The usage form is the one shown for intents on the domain pages (`@AppIntent(schema: .<domain>.<schema>)`); the entity form is not shown verbatim in the documentation pinned here, so it is not reproduced.
- Mentioned by the articles "Making actions and content discoverable by Apple Intelligence" and "Getting started with the App Intents framework".
- Not related to the Foundation Models framework (`LanguageModelSession` / `Tool`).

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [App schema base types](./app-schema-base-types.md)
- [AppEntity](../entities/appentity.md)
