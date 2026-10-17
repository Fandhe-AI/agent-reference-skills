---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-system-and-in-app-search
---

# System and in-app search domain

Make your app's actions available to Apple Intelligence and Siri by adopting schemas for in-app search and content access.

## Signature / Usage

```swift
var searchInApp: some AppSchemaIntent
var open: some AppSchemaIntent
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `searchInApp` | Intent (`AppSchema.SystemIntent`) | An intent schema that navigates to search results. | "Find bicycle." / "Search for bicycle." |
| `open` | Intent (`AppSchema.SystemIntent`) | An intent schema that opens an item in the application. | "Open my screenshot.png file." |

## Notes

- The `.system` domain: protocol `AppSchema.SystemIntent` (actions only). Unlike domains that target a specific app category, it applies broadly: any app that enables searching or opening content can adopt it.
- The domain page carries no platform metadata; check the member pages (`appschema/systemintent/<schema>`) for introduction versions.
- Xcode generates a template implementation when you type `system_` and select a schema from the suggestions list.
- No code listing was fetched for this domain; only schema declarations are shown.
- The system-defined intent protocols `ShowInAppSearchResultsIntent` and `OpenIntent` (in intent-types) are what these schemas attach through `AppIntent(schema:)`. The photos domain's `search` and `openAsset` schemas are deprecated.
- Distinct from Core Spotlight indexing and from SwiftUI `searchable`; this page only declares App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [Photos domain](./domain-photos.md)
- [ShowInAppSearchResultsIntent](../intent-types/showinappsearchresultsintent.md)
- [OpenIntent](../intent-types/openintent.md)
