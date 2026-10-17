---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-visual-intelligence
---

# Visual intelligence schema domain (semanticContentSearch)

Display search results from your app when people point the camera at relevant content.

## Signature / Usage

```swift
protocol AppSchema.VisualIntelligenceIntent
```

```swift
var semanticContentSearch: some AppSchemaIntent { get }
```

```swift
@AppIntent(schema: .visualIntelligence.semanticContentSearch)
struct ShowVisualSearchResultsInAppIntent {
    var semanticContent: VisualIntelligence.SceneDescriptor

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

## Options / Props

| Name | Kind | Description |
|------|------|-------------|
| `semanticContentSearch` | Actions | An intent schema that shows more and richer visual search results in the app. |
| `AppSchema.VisualIntelligenceIntent` | Actions | Identifies intent schemas in the visual intelligence domain. |

## Notes

- Domain: `.visualIntelligence`. It defines app schemas that connect your app to the camera control. Apply the `semanticContentSearch` schema to make your app appear as a search destination in Visual Intelligence. Your app implements an `IntentValueQuery` to receive the types from the Visual Intelligence framework, find matching content, and return app entities.
- `semanticContentSearch`: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 27.0+. The `@AppIntent( .visualIntelligence.semanticContentSearch)` macro generates the properties and protocol conformance the schema requires. Supported system experiences: Shortcuts, Visual Intelligence.
- Xcode generates a template implementation when you type `visualIntelligence_` and select a schema from the suggestions list.
- Use it for the "More results" flow: in `perform()`, navigate to the app's search experience and pass the information the `SemanticContentDescriptor` provides to show the full result list.
- Source discrepancy: the verbatim code listing above (from the `semanticContentSearch` page) declares `semanticContent` as `VisualIntelligence.SceneDescriptor`, while the Visual Intelligence framework page lists only `SemanticContentDescriptor`. The official docs do not explain this; verify the property type against Xcode's generated template.
- The "Integrating your app with visual intelligence" article refers to the same schema as `AssistantSchemas.VisualIntelligenceIntent.semanticContentSearch` (the previous schema types, see the legacy page); the current page is `AppSchema.VisualIntelligenceIntent.semanticContentSearch`.
- Part of the app schema domains (see "Apple Intelligence and Siri AI"); the single-purpose sibling domain listed alongside is Assistant.
- App schemas here are unrelated to Foundation Models `LanguageModelSession` / `Tool`, and Vision framework requests (apple-ml).

## Related

- [Visual Intelligence (framework overview)](./visualintelligence-overview.md)
- [SemanticContentDescriptor](./semanticcontentdescriptor.md)
- [IntentValueQuery](./intentvaluequery.md)
- [AppIntent(schema:)](../app-schemas/appintent-schema-macro.md)
- [App schema base types](../app-schemas/app-schema-base-types.md)
- [Assistant domain](../app-schemas/domain-assistant.md)
- [Previous schema types](../app-schemas/assistant-schemas-legacy.md)
