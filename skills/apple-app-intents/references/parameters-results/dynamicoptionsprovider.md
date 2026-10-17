---
source: https://developer.apple.com/documentation/appintents/dynamicoptionsprovider
---

# DynamicOptionsProvider

An interface for providing a dynamic list of options for a parameter of your app intent.

## Signature / Usage

```swift
protocol DynamicOptionsProvider : _SupportsAppDependencies
```

Implement this protocol in a type that provides a set of possible values for an intent parameter. When configuring the parameter, specify your custom type as the options provider for that parameter. Return an array of items to display a list of values, or an array of item sections to divide values into sections or configure other presentation options. Example from the page (an options provider offering two suggestions for an author name):

```swift
struct CreateBook: AppIntent {
    @Parameter(title: "Author Name",
               optionsProvider: AuthorNamesOptionsProvider())
    var authorName: String

    // Other properties and the perform() implementation.

    private struct AuthorNamesOptionsProvider: DynamicOptionsProvider {
        func results() async throws -> [String] {
            ["Juan Chavez", "Anne Johnson"]
        }
    }
}
```

## Options / Props

| Name | Declaration | Description |
|------|-------------|-------------|
| DefaultValue | `associatedtype DefaultValue : _IntentValue = Self.Result.Result` | Type of the default value |
| Result | `associatedtype Result : ResultsCollection` | Type of the returned options |
| Item / ItemCollection / ItemSection / ParameterDependency | `typealias` | Convenience aliases |
| defaultResult() | `func defaultResult() async -> Self.DefaultValue?` | The default value for parameters using this provider when no value is provided by the user |
| results() | `func results() async throws -> Self.Result` | The options |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- Entity query protocols (`EntityQuery`, `EntityStringQuery`, `EntityPropertyQuery`, `EnumerableEntityQuery`) also appear under "Conforming Types" on the page.

## Related

- [IntentParameter](./intentparameter.md)
- [IntentParameterDependency](./intentparameterdependency.md)
- [ResultsCollection](./resultscollection.md)
