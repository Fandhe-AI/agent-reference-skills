---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-maps
---

# Maps domain

Make your navigation app's actions available to Apple Intelligence and Siri by adopting schemas for common navigation actions.

## Signature / Usage

```swift
var startNavigation: some AppSchemaIntent
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `startNavigation` | Intent (`AppSchema.MapsIntent`) | Starts navigation. | "Navigate to work." / "Take me home." |
| `updateNavigationWaypoints` | Intent (`AppSchema.MapsIntent`) | Updates the list of waypoints for a navigation session. | "Add a stop." / "Update my route to include my office." |
| `stopNavigation` | Intent (`AppSchema.MapsIntent`) | Ends navigation. | "Stop navigation." / "Cancel directions." |
| `shareETA` | Intent (`AppSchema.MapsIntent`) | Shares ETA to a contact while navigating. | "Share my ETA." / "Send my ETA to Anne." |
| `stopShareETA` | Intent (`AppSchema.MapsIntent`) | Stops sharing ETA. | "Stop sharing my ETA." |
| `reportIncident` | Intent (`AppSchema.MapsIntent`) | Reports a traffic incident on the route. | "Report an accident." / "There's a crash ahead." |
| `currentLocation`, `navigationSession`, `operatingHours`, `operatingTimeRange`, `place`, `rating` | Entity (`AppSchema.MapsEntity`) | Content and parameter types. | — |
| `amenity`, `incident`, `navigationPreferences`, `operatingStatus`, `priceRange`, `ratingDescriptor`, `transportType` | Enum (`AppSchema.MapsEnum`) | Types for static parameters. | — |

## Notes

- The `.maps` domain: protocols `AppSchema.MapsIntent`, `AppSchema.MapsEntity`, `AppSchema.MapsEnum`.
- The domain page carries no platform metadata; check the member pages (`appschema/mapsintent/<schema>`) for introduction versions.
- Xcode generates a template implementation when you type `maps_` and select a schema from the suggestions list.
- Use-case group (navigation): the `startNavigation` schema and an `IntentValueQuery` that imports `AppSchema.MapsEntity.place` values form a use-case group. Xcode reports a build warning if your app supports one without the other. To integrate with Apple Intelligence and bring the app to Siri AI, adopt both parts.
- No code listing was fetched for this domain; only schema declarations are shown.
- Distinct from MapKit and Core Location APIs; this page only declares App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [IntentValueQuery](../visual-intelligence/intentvaluequery.md)
- [System and in-app search domain](./domain-system-and-in-app-search.md)
