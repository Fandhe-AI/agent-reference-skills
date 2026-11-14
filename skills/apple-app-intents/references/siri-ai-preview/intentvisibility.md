---
source: https://developer.apple.com/documentation/appintents/intentvisibility
---

# IntentVisibility

A value that configures how a property is available to system features, such as Siri and Shortcuts, if at all.

## Signature / Usage

```swift
struct IntentVisibility
```

```swift
struct Contact: AppEntity {
    @Property(title: "Tax ID", visibility: .internal)
    var taxID: String
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `default` | `static var `default`: IntentVisibility { get }` | Makes the property available to your app and to system features, such as Siri and Shortcuts. |
| `internal` | `static var `internal`: IntentVisibility { get }` | Limits the property to your app and its extensions. |

## Notes

- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, tvOS 27.3+, visionOS 27.3+, watchOS 27.3+. Conforms to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.
- With the default option, system features such as Siri and Shortcuts list an entity's properties to people and to the model. Apps typically apply `internal` to properties with sensitive information.
- Pass it through the `visibility:` parameter of `@Property` (`EntityProperty` initializers), `@ComputedProperty` and `@DeferredProperty`; a `nil` visibility applies the default.
- Do not combine `internal` with a Spotlight indexing key such as `indexingKey` or `customIndexingKey`, because the keys make the property discoverable from Spotlight.
- Apple states that during the Siri AI Developer Preview the App Intents API and Siri functionality may change.
- Source: https://developer.apple.com/documentation/appintents/intentvisibility, https://developer.apple.com/documentation/appintents/intentvisibility/default and https://developer.apple.com/documentation/appintents/intentvisibility/internal (fetched 2026-11-14)

## Related

- [ToolIntent](./toolintent.md)
- [Bringing custom actions and content to Siri](./bringing-custom-actions-and-content-to-siri.md)
- [EntityProperty](../entities/entityproperty.md)
