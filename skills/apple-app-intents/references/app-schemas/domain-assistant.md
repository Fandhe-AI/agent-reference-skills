---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-assistant
---

# Assistant domain

Enable people in Japan to launch your voice-based conversational app from the side button of iPhone.

## Signature / Usage

```swift
var activate: some AppSchemaIntent
```

## Options / Props

| Group | Schema | Description |
|-------|--------|-------------|
| Actions (`AppSchema.AssistantIntent`) | `activate` | The app intent conforms to the schema for launching your voice-based conversational app from the side button on iPhone in Japan. |

## Notes

- The `.assistant` domain defines a single app intent schema.
- This schema registers your app as a side button action on iPhone and is available only in Japan.
- The domain page carries no platform metadata; check the member page (`appschema/assistantintent/activate`) for introduction versions.
- Xcode generates a template implementation when you type `assistant_` and select a schema from the suggestions list.
- Essentials article: "Launching your voice-based conversational app from the side button of iPhone" (lets people in Japan configure the side button to launch such an app).
- Listed under "Single-purpose domains" together with the visual intelligence domain. Not the same as the earlier deprecated `AssistantIntent(schema:)` macro / `AssistantSchemas.AssistantIntent` (see assistant-schemas-legacy), nor the Foundation Models framework (`LanguageModelSession` / `Tool`).
- No code listing was fetched for this domain; only the schema declaration is shown.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [App schema base types](./app-schema-base-types.md)
- [Previous schema types](./assistant-schemas-legacy.md)
- Visual intelligence schema domain
