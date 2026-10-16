---
source: https://developer.apple.com/documentation/appintents/appenum(schema:)
---

# AppEnum(schema:)

A Swift macro you use to make sure your app enum conforms to a schema.

## Signature / Usage

```swift
@attached(extension, conformances: AppEnum, AssistantSchemaEnum, names: named(__appSchemaEnum)) macro AppEnum<T>(schema: T) where T : AppSchemaEnum
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `schema` | `T where T : AppSchemaEnum` | An enum schema selected from a domain, for example a property of an `AppSchema.<Domain>Enum` protocol such as `AppSchema.CalendarEnum.eventStatus` (see the domain pages in this category). |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Attaches `AppEnum` and `AssistantSchemaEnum` conformances (`@attached(extension)`); unlike the intent and entity macros it has no `memberAttribute` role.
- The official page carries no code listing, so none is shown beyond the declaration.
- Not related to the Foundation Models framework (`LanguageModelSession` / `Tool`).

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [App schema base types](./app-schema-base-types.md)
- [AppEnum](../entities/appenum.md)
