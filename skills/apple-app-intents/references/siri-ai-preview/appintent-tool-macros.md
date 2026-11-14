---
source: https://developer.apple.com/documentation/appintents/appintent(_:)
---

# AppIntent(_:) macro, AppIntent(_:schema:) macro and AppIntentTraits

Makes an existing app intent available to Siri as a tool; the schema overload does the same for an app intent that conforms to a schema.

## Signature / Usage

```swift
@attached(extension, conformances: ToolIntent) macro AppIntent(_ traits: AppIntentTraits)
```

```swift
@attached(memberAttribute) @attached(extension, conformances: ToolIntent, AppIntent, AssistantSchemaIntent, ShowInAppSearchResultsIntent, OpenIntent, DeleteIntent, AudioPlaybackIntent, AudioRecordingIntent, LiveActivityIntent, URLRepresentableIntent, names: named(__appSchemaIntent)) macro AppIntent<T>(_ traits: AppIntentTraits, schema: T) where T : AppSchemaIntent
```

```swift
struct AppIntentTraits
```

Example from the `AppIntent(_:)` page:

```swift
@AppIntent(.tool)
struct SearchFlights { ... }
```

Example from the `AppIntent(_:schema:)` page:

```swift
@AppIntent(.tool, schema: .journal.createEntry)
struct CreateEntryIntent {
    var title: String?
    var message: AttributedString
    // ...
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `AppIntent(_:)` | `macro AppIntent(_ traits: AppIntentTraits)` | Apply to a structure or class that conforms to `AppIntent`. Adds a `ToolIntent` conformance, using the availability declared on the type, or the availability of `ToolIntent` when the type declares none. Parameter `traits`: the intent's roles, such as `.tool` or `[.tool]`. |
| `AppIntent(_:schema:)` | `macro AppIntent<T>(_ traits: AppIntentTraits, schema: T) where T : AppSchemaIntent` | Use in place of `@AppIntent(schema:)`; adds everything that macro adds, plus `ToolIntent`. Parameters: `traits`, and `schema` (the schema the intent conforms to). |
| `AppIntentTraits` | `struct AppIntentTraits` | The roles an app intent takes on, passed to `@AppIntent`. Conforms to `Equatable`, `ExpressibleByArrayLiteral`, `SetAlgebra`, `Sendable`, `SendableMetatype`. |
| `AppIntentTraits.tool` | `static let tool: AppIntentTraits` | Siri can call the intent as a tool; adds a `ToolIntent` conformance. |

## Notes

- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, visionOS 27.3+
- Only schemas available exclusively in Shortcuts are supported by `@AppIntent(_:schema:)`. Schemas in primary domains, such as `.messages.sendMessage`, are already handled by Siri, and using one here is an error.
- `AppIntentTraits` is read by the macro as written, so list traits directly rather than computing them. A set holds each trait at most once, and traits that take a value are compared by trait alone.
- Not the same as the older `AppIntent(schema:)` macro without a traits argument; see app-schemas/appintent-schema-macro.
- Apple states that during the Siri AI Developer Preview the App Intents API and Siri functionality may change.
- Source: https://developer.apple.com/documentation/appintents/appintent(_:) , https://developer.apple.com/documentation/appintents/appintent(_:schema:) , https://developer.apple.com/documentation/appintents/appintenttraits and https://developer.apple.com/documentation/appintents/appintenttraits/tool (fetched 2026-11-14)

## Related

- [ToolIntent](./toolintent.md)
- [IntentVisibility](./intentvisibility.md)
- [AppEntity(_:) / AppEntity(_:schema:) / AppEntityTraits](./appentity-generable-macros.md)
- [AppIntent(schema:)](../app-schemas/appintent-schema-macro.md)
