---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-notes
---

# Notes domain

Make your note-taking app's actions available to Apple Intelligence and Siri by adopting schemas for common note actions.

## Signature / Usage

```swift
var createNote: some AppSchemaIntent
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `createNote` | Intent (`AppSchema.NotesIntent`) | Creates a new note. | "Create a note called meeting notes." |
| `updateNote` | Intent (`AppSchema.NotesIntent`) | Updates a note. | "Rename this note to taxes." / "Move this note to my work folder." |
| `appendText` | Intent (`AppSchema.NotesIntent`) | Adds text to the end of an existing note. | "Add this item to the wishlist note." |
| `account` | Entity (`AppSchema.NotesEntity`) | An entity schema for an account. | — |
| `folder` | Entity (`AppSchema.NotesEntity`) | A folder. | — |
| `note` | Entity (`AppSchema.NotesEntity`) | A note. | — |

## Notes

- The `.notes` domain: protocols `AppSchema.NotesIntent`, `AppSchema.NotesEntity` (no enum group listed). Entities are "Content and parameter types".
- The domain page carries no platform metadata; check the member pages (`appschema/notesintent/<schema>`) for introduction versions.
- Xcode generates a template implementation when you type `notes_` and select a schema from the suggestions list.
- No code listing was fetched for this domain; only the schema declaration is shown.
- Distinct from Foundation Models (`LanguageModelSession` / `Tool`); this page only declares App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [Reminders domain](./domain-reminders.md)
