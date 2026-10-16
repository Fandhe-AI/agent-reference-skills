---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-messages
---

# Messages domain

Make your messaging app's actions available to Apple Intelligence and Siri by adopting schemas for common messaging actions.

## Signature / Usage

```swift
var sendMessage: some AppSchemaIntent
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `draftMessage` | Intent (`AppSchema.MessagesIntent`) | Opens the app to start or continue composing a message via touch. | "Start a message." / "Draft a message." |
| `sendMessage` | Intent (`AppSchema.MessagesIntent`) | Sends a message with the associated parameters. | "Send a message to John asking what time the party starts." / "Text the foodie group and ask, 'What time is dinner again?'" |
| `editSentMessage` | Intent (`AppSchema.MessagesIntent`) | Edits an already sent message with new content. | "Edit my last message." / "Edit my last message to say 'Good morning!' instead of 'Hello!'" |
| `unsendMessage` | Intent (`AppSchema.MessagesIntent`) | Unsends a sent message. | "Unsend my last message." / "Unsend that." |
| `setMessageReadStatus` | Intent (`AppSchema.MessagesIntent`) | Changes the message read status to a given value. | "Mark this message as unread." / "Mark the message from the lawyer as unread." |
| `conversation`, `customAttachment`, `message`, `messagePerson` | Entity (`AppSchema.MessagesEntity`) | Content and parameter types. | — |
| `conversationAttribute`, `customReaction`, `messageAttribute`, `messageEffect`, `messageType` | Enum (`AppSchema.MessagesEnum`) | Types for static parameters. | — |

## Notes

- The `.messages` domain: protocols `AppSchema.MessagesIntent`, `AppSchema.MessagesEntity`, `AppSchema.MessagesEnum`.
- The domain page carries no platform metadata; check the member pages (`appschema/messagesintent/<schema>`) for introduction versions.
- Xcode generates a template implementation when you type `messages_` and select a schema from the suggestions list.
- Use-case group (sending): the `draftMessage` and `sendMessage` schemas form a use-case group. Xcode reports a build warning if your app supports one schema in the group and not the other. To integrate with Apple Intelligence and bring the app to Siri AI, adopt both.
- Related sample article: "Integrating your messaging app with Apple Intelligence".
- No code listing was fetched for this domain; only schema declarations are shown.
- Distinct from the Messages framework / MessageUI and from SiriKit messaging intents (`INSendMessageIntent`); this page only declares App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [Mail domain](./domain-mail.md)
- [Phone domain](./domain-phone.md)
