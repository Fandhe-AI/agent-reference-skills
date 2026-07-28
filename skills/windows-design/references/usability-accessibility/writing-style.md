# Writing style

Voice, tone, and style conventions for UI text: error messages, dialogs, buttons, and spoken experiences.

## Signature / Usage

Three voice and tone principles applied across all Microsoft content (part of Fluent design):

- **Be warm and relaxed** — informal, casual, don't blame the user; the app takes responsibility and offers welcoming guidance.
- **Be ready to lend a hand** — show empathy, explain what's happening, provide a solution when possible.
- **Be crisp and clear** — lead with what's important, use language familiar to the audience, don't assume users read every word.

```text
Do:    Restart the app to see your changes.
Don't: The changes will be applied when the app is restarted.
```

## Options / Props

| Convention | Guidance |
|------|-------------|
| Addressing the user | Always "you"; use "we" for the app's own voice; never "I"/"me" |
| Abbreviations | Define on first use; avoid if localizing or targeting non-native English speakers; avoid near-duplicate abbreviations |
| Contractions | Use when natural; avoid unnatural ones used only to save space |
| Periods | End full sentences (tooltips, error messages, dialogs) with a period; omit for buttons, radio buttons, labels, checkboxes |
| Capitalization | Capitalize proper nouns and the start of every sentence, label, and title |
| Buttons | A couple of short words at most; use active voice representing an action (e.g. "Install now", "Share") |

## Notes

- Error messages should never blame the user, should explain what happened and what will happen next, and should offer a realistic solution — while eliminating extraneous information.
- Dialog titles and their buttons form a "call and response" — buttons should read as clear answers to the dialog title's question, with consistent formatting across the app.
- Spoken experiences (e.g. Cortana) apply the same three principles even more strictly, since there is no supplemental visual design to lean on.
- Straightforward, accessibility-minded language is also easier to localize; avoid idioms and assumptions that don't translate across cultures. See [Globalization and localization](./globalization-localization.md).
- For non-writers: imagine explaining the app to a friend, contrast it against how you'd describe an unrelated app, or look at similar apps for inspiration.

## Related

- [Globalization and localization](./globalization-localization.md)
- [Guidelines for app settings](./app-settings.md)
