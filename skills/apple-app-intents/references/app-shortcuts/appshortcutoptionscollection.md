---
source: https://developer.apple.com/documentation/appintents/appshortcutoptionscollection
---

# AppShortcutOptionsCollection (Protocol / Specification / Builder)

Represents a collection of options for parameters of an App Shortcut. This page also covers `AppShortcutOptionsCollectionProtocol`, `AppShortcutOptionsCollectionSpecification` and `AppShortcutOptionsCollectionSpecificationBuilder`.

## Signature / Usage

```swift
struct AppShortcutOptionsCollection<Provider> where Provider : DynamicOptionsProvider

init(_: Provider, title: LocalizedStringResource, systemImageName: String?)
```

```swift
protocol AppShortcutOptionsCollectionProtocol {
    associatedtype Provider : DynamicOptionsProvider
    var dynamicOptionsProvider: Self.Provider { get }
    var systemImageName: String? { get }
    var title: LocalizedStringResource { get }
}
```

```swift
protocol AppShortcutOptionsCollectionSpecification<Value> : Sendable, Sequence where Self.Element == any AppShortcutOptionsCollectionProtocol
// associatedtype Value : _IntentValue
```

```swift
@resultBuilder enum AppShortcutOptionsCollectionSpecificationBuilder<Value> where Value : _IntentValue
// static func buildBlock<C0>(C0) -> some AppShortcutOptionsCollectionSpecification<Value>
// ... overloads taking 2 to 15 arguments (buildBlock(_:_:) through buildBlock(_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Provider (init first argument) | Provider : DynamicOptionsProvider | Source of the dynamic options |
| title | LocalizedStringResource | Title of the options collection |
| systemImageName | String? | Optional system image name |

## Notes

- All four types: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+; visionOS is listed without an introduced version.
- `AppShortcutOptionsCollection` conforms to `AppShortcutOptionsCollectionProtocol`. The init abstract: initializes a collection of options for App Shortcuts with the specified parameters.
- The protocol, specification and builder pages have no abstract or overview text. The builder’s `buildBlock` overloads are available when `Value` conforms to `_IntentValue`.
- This collection is the third argument of `AppShortcutParameterPresentation.init(for:summary:optionsCollections:)`.

## Related

- [AppShortcutParameterPresentation](./appshortcutparameterpresentation.md)
- [AppShortcut](./appshortcut.md)
