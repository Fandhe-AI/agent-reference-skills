---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-reminders
---

# Reminders domain

Make your reminder app's actions available to Apple Intelligence and Siri by adopting schemas for common reminder actions.

## Signature / Usage

```swift
var createReminder: some AppSchemaIntent
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `createList` | Intent (`AppSchema.RemindersIntent`) | Creates a new reminder list. | "Create a list called shopping." |
| `createReminder` | Intent (`AppSchema.RemindersIntent`) | Creates a new reminder. | "Create a reminder." / "Create a reminder called vote." |
| `createSection` | Intent (`AppSchema.RemindersIntent`) | Creates a new reminder list section. | "Create a section called vegetables." |
| `deleteReminders` | Intent (`AppSchema.RemindersIntent`) | Deletes reminders. | "Delete this reminder." |
| `updateReminder` | Intent (`AppSchema.RemindersIntent`) | Updates a reminder. | "Mark this reminder as completed." / "Set the due date for this reminder to tomorrow." |
| `group`, `list`, `locationTrigger`, `reminder`, `section` | Entity (`AppSchema.RemindersEntity`) | Content and parameter types. | — |
| `listType` | Enum (`AppSchema.RemindersEnum`) | List type parameter. | — |
| `locationTriggerEvent` | Enum (`AppSchema.RemindersEnum`) | Location trigger event parameter. | — |

## Notes

- The `.reminders` domain: protocols `AppSchema.RemindersIntent`, `AppSchema.RemindersEntity`, `AppSchema.RemindersEnum`.
- The domain page carries no platform metadata; check the member pages (`appschema/remindersintent/<schema>`) for introduction versions.
- Xcode generates a template implementation when you type `reminders_` and select a schema from the suggestions list.
- No code listing was fetched for this domain; only a schema declaration is shown.
- Distinct from the EventKit reminders API; this page only declares App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [Calendar domain](./domain-calendar.md)
- [Notes domain](./domain-notes.md)
