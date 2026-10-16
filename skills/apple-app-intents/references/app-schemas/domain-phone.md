---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-phone
---

# Phone domain

Make your phone app's actions available to Apple Intelligence and Siri by adopting schemas for calling actions.

## Signature / Usage

```swift
var startCall: some AppSchemaIntent
```

## Options / Props

| Group | Schema | Description |
|-------|--------|-------------|
| Actions (`PhoneIntent`) | `startCall` | An intent schema that starts a call to a person, handle, or named group. Example phrases: "Make a call to Bill." / "Video call Bill and Maria." |
| Content and parameter types (`PhoneEntity`) | `phonePerson` | An entity schema for a phone person. |
| Types for static parameters (`PhoneEnum`) | `audioVisualMode` | An enum schema for an audio visual mode parameter. |

## Notes

- The `.phone` domain: protocols `AppSchema.PhoneIntent`, `AppSchema.PhoneEntity`, `AppSchema.PhoneEnum`.
- The domain page carries no platform metadata; check the member page (`appschema/phoneintent/startcall`) for introduction versions.
- Xcode generates a template implementation when you type `phone_` and select a schema from the suggestions list.
- No code listing was fetched for this domain; only the schema declaration is shown.
- Distinct from CallKit and from SiriKit call intents (`INStartCallIntent`); this page only declares App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [Messages domain](./domain-messages.md)
