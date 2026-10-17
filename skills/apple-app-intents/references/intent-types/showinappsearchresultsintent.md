---
source: https://developer.apple.com/documentation/appintents/showinappsearchresultsintent
---

# ShowInAppSearchResultsIntent

An app intent that displays a set of search results in the app's interface.

## Signature / Usage

```swift
protocol ShowInAppSearchResultsIntent : SystemIntent
```

```swift
struct MySearchIntent: ShowInAppSearchResultsIntent {
    static let title: LocalizedStringResource = "Search my entities."

    static let searchScopes: [StringSearchScope] = [.general]
    @Parameter var criteria: StringSearchCriteria

    @Dependency var searchManager: SearchManager    // A custom app object.

     func perform() async throws -> some IntentResult {
        let searchTerm = criteria.term       // Get the string value to match against.
        searchManager.displayResults(searchTerm)
        return .result()
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `Criteria` | `associatedtype Criteria : SearchCriteria` | The criteria type (no abstract on the page). |
| `criteria` | `var criteria: Self.Criteria` | The information to use when performing the search. |
| `searchScopes` | `static var searchScopes: Self.Criteria.SearchScopes` | The scope of the search in your app's content (two default implementations exist). |

## Notes

- iOS 17.2+, iPadOS 17.2+, Mac Catalyst 17.2+, macOS 14.2+, tvOS 17.2+, visionOS (version not listed on the page), watchOS 10.2+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- The system uses this protocol to route search requests for the app's entities to the app. If the app supports multiple entity types that display results differently, provide separate implementations for each entity.
- For most implementations use `StringSearchCriteria`; for most entity types include `StringSearchScope.general` in `searchScopes`. If content includes media, update the scopes to reflect the content type.
- This intent must run from the app, not an app extension. If the code lives in a shared framework, make sure `allowedExecutionTargets` includes the app. The protocol provides a default `supportedModes` that includes the foreground runtime.
- To support Apple Intelligence, define the type using the `search` schema (`AppSchema.SystemIntent.search`), which adds this protocol automatically. That schema member is marked deprecated in the source reference.
- Source pages mentioning this type: "Configuring the runtime behavior of your app intents", "Making app entities available in Spotlight", "Creating your first app intent", "Directing app intents to your app's scenes".

## Related

- [StringSearchCriteria](./stringsearchcriteria.md)
- [StringSearchScope](./stringsearchscope.md)
- [SystemIntent](./systemintent.md)
