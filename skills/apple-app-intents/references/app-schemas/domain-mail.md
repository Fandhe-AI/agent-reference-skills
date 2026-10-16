---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-mail
---

# Mail domain

Make your email app's actions available to Apple Intelligence and Siri by adopting schemas for common email actions.

## Signature / Usage

```swift
var createDraft: some AppSchemaIntent
```

```swift
@AppIntent(schema: .mail.createDraft)
```

## Options / Props

| Schema | Kind | Description | Example phrases | Use-case groups |
|--------|------|-------------|-----------------|-----------------|
| `createDraft` | Intent (`AppSchema.MailIntent`) | Opens an email composer to draft an email. | "Compose a mail." / "Write an email to example@example.com about photos from team dinner." | composing |
| `updateDraft` | Intent (`AppSchema.MailIntent`) | Makes updates to an email draft. | "Add example@example.com to recipients." / "Set subject to coffee session." | composing, forwarding, replying |
| `saveDraft` | Intent (`AppSchema.MailIntent`) | Saves an email draft. | "Draft this email for later." / "Save it." | composing, forwarding, replying |
| `openDraft` | Intent (`AppSchema.MailIntent`) | Opens an email draft. | "Open the draft email to John and James." | — |
| `deleteDraft` | Intent (`AppSchema.MailIntent`) | Deletes one or more email drafts. | "Delete this draft." / "Trash my most recent draft." | — |
| `sendDraft` | Intent (`AppSchema.MailIntent`) | Sends an email draft or schedules it to be sent later. | "Send this email." / "Send this email tomorrow at 9 PM." | composing, forwarding, replying |
| `openMessage` | Intent (`AppSchema.MailIntent`) | Opens an email message. | "Open the email about team offsite instructions." | — |
| `replyMail` | Intent (`AppSchema.MailIntent`) | Opens an email composer to reply to an email. | "Reply to an email." / "Reply to mail thread with my manager." | replying |
| `forwardMail` | Intent (`AppSchema.MailIntent`) | Opens an email composer to forward an email. | "Forward an email." / "Forward the email about the baseball schedule to John Appleseed." | forwarding |
| `updateMail` | Intent (`AppSchema.MailIntent`) | Updates one or more existing messages by modifying the status, flags, and location. | "Mark this email as read." / "Flag this email." | — |
| `archiveMail` | Intent (`AppSchema.MailIntent`) | Archives one or more email messages. | "Archive book club emails." / "Archive emails from Nancy." | — |
| `deleteMail` | Intent (`AppSchema.MailIntent`) | Deletes one or more email messages. | "Delete emails from Julian." / "Trash all mail messages from Example Store." | — |
| `account` | Entity (`AppSchema.MailEntity`) | — | — | — |
| `draft` | Entity (`AppSchema.MailEntity`) | — | — | composing, forwarding, replying |
| `mailbox` | Entity (`AppSchema.MailEntity`) | — | — | — |
| `message` | Entity (`AppSchema.MailEntity`) | — | — | forwarding, replying |
| `thread` | Entity (`AppSchema.MailEntity`) | — | — | — |

## Notes

- The `.mail` domain exposes protocols `AppSchema.MailIntent` and `AppSchema.MailEntity` (there is no mail enum group listed on the domain page). The "Use-case groups" column lists the groups named on the domain page; "—" means none listed.
- `AppSchema.MailIntent` and `createDraft`: iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+. Domain page itself carries no platform metadata.
- Xcode generates a template implementation when you type `mail_` and select a schema from the suggestions list.
- The domain has three use-case groups: composing, forwarding, and replying. Xcode reports a build warning for each missing schema in a group your app partially supports. To integrate with Apple Intelligence and bring the app to Siri AI, adopt all the schemas in a use-case group.
- No code listing exists on the pinned `createDraft` page; the second snippet is the usage form documented for other domains (`@AppIntent(schema: .<domain>.<schema>)`) applied to the Mail names and is not a copied sample.
- Distinct from MessageUI / Mail extension APIs; this page only declares App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [Messages domain](./domain-messages.md)
