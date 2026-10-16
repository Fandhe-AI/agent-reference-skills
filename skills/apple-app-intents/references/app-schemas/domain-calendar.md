---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-calendar
---

# Calendar domain

Make your calendar app's actions available to Apple Intelligence and Siri by adopting schemas for common calendar actions.

## Signature / Usage

```swift
@UnionValue
enum EventLocation {
    case place(GeoToolbox.PlaceDescriptor)
    case address(String)
}
```

```swift
var createEvent: some AppSchemaIntent
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `createEvent` | Intent (`AppSchema.CalendarIntent`) | An intent schema that creates a calendar event. | "Create an event." / "Schedule a meeting with Bill tomorrow at 2 PM." |
| `deleteEvent` | Intent (`AppSchema.CalendarIntent`) | Deletes a calendar event. | "Delete this event." / "Cancel the meeting." |
| `updateEvent` | Intent (`AppSchema.CalendarIntent`) | Updates a calendar event. | "Reschedule the meeting." / "Move the meeting to tomorrow." |
| `attendee` | Entity (`AppSchema.CalendarEntity`) | An entity schema for an attendee. | — |
| `calendar` | Entity (`AppSchema.CalendarEntity`) | An entity schema for a calendar. | — |
| `event` | Entity (`AppSchema.CalendarEntity`) | An entity schema for an event. | — |
| `attendeeStatus` | Enum (`AppSchema.CalendarEnum`) | An enum schema for an attendee status parameter. | — |
| `attendeeType` | Enum (`AppSchema.CalendarEnum`) | An enum schema for an attendee type parameter. | — |
| `eventSpan` | Enum (`AppSchema.CalendarEnum`) | An enum schema for an event span parameter. | — |
| `eventStatus` | Enum (`AppSchema.CalendarEnum`) | An enum schema for an event status parameter. | — |

## Notes

- The `.calendar` domain: protocols `AppSchema.CalendarIntent`, `AppSchema.CalendarEntity`, `AppSchema.CalendarEnum`. Entities are "Content and parameter types"; enums are "Types for static parameters".
- `AppSchema.CalendarIntent` and `createEvent`: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+. Domain page itself carries no platform metadata.
- Xcode generates a template implementation when you type `calendar_` and select a schema from the suggestions list.
- The first listing is the `@UnionValue` sample on the `createEvent` page (`GeoToolbox.PlaceDescriptor` or `String`). The `createEvent` page's own intent listing was not found in the pinned data, so only the schema declaration is shown.
- Related sample article: "Integrating your calendar app with Apple Intelligence".
- Distinct from EventKit and from the Foundation Models framework (`LanguageModelSession` / `Tool`); this page only declares the App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [Reminders domain](./domain-reminders.md)
