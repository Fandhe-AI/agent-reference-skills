---
source: https://developer.apple.com/documentation/appintents/deferredproperty()
---

# DeferredProperty() macro (4 overloads)

A macro that adds an asynchronous app entity property with an asynchronous get accessor.

## Signature / Usage

```swift
@attached(peer, names: prefixed(`$`), prefixed(`_`)) @attached(accessor, names: named(get), named(set)) macro DeferredProperty()
```

```swift
struct Restaurant: AppEntity {
    var model: Menu

    @DeferredProperty
    var popularItems: [MenuItem] {
        get async {
            await model.server.popularMenuItems()
        }
    }
}
```

## Options / Props

| Overload | Parameters |
| --- | --- |
| `DeferredProperty()` | none |
| `DeferredProperty(title:)` | `title: LocalizedStringResource` |
| `DeferredProperty(indexingKey:)` | `indexingKey: PartialKeyPath<CSSearchableItemAttributeSet>` |
| `DeferredProperty(title:indexingKey:)` | `title: LocalizedStringResource, indexingKey: PartialKeyPath<CSSearchableItemAttributeSet>` |

## Notes

- The overload parameter lists are as shown in each page's declaration fragments.
- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+
- A deferred property isn't included when the system indexes an `IndexedEntity`.
- `AppEntity` instances have a 10 MB total size limit including child properties; the AppEntity page recommends `@DeferredProperty` to reduce entity size. The value is fetched through an `async` getter when needed.
- The attached-macro attribute line above is the one shown on the `DeferredProperty()` and `DeferredProperty(title:)` pages.

### Overloads with description, authentication policy and visibility (iOS 27.3 beta)

Two further `DeferredProperty` overloads take `description:`, `authenticationPolicy:` and `visibility:` (declarations as published on their pages). They are iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, tvOS 27.3+, visionOS 27.3+, watchOS 27.3+ per page metadata; the iOS 26.0+ note above applies to the overloads listed in the Options / Props table above. Apple states the Siri AI Developer Preview API may change.

| Declaration |
| --- |
| `@attached(peer, names: prefixed(`$`), prefixed(`_`)) @attached(accessor, names: named(get), named(set)) macro DeferredProperty(title: LocalizedStringResource? = nil, description: LocalizedStringResource? = nil, authenticationPolicy: IntentAuthenticationPolicy? = nil, visibility: IntentVisibility? = nil)` |
| `@attached(peer, names: prefixed(`$`), prefixed(`_`)) @attached(accessor, names: named(get), named(set)) macro DeferredProperty(title: LocalizedStringResource? = nil, description: LocalizedStringResource? = nil, authenticationPolicy: IntentAuthenticationPolicy? = nil, visibility: IntentVisibility? = nil, indexingKey: PartialKeyPath<CSSearchableItemAttributeSet>)` |

- Source: https://developer.apple.com/documentation/appintents/deferredproperty(title:description:authenticationpolicy:visibility:) and its `indexingKey` variant (fetched 2026-11-14)

## Related

- [ComputedProperty() macro](./computedproperty.md)
- [EntityProperty](./entityproperty.md)
- [AppEntity](./appentity.md)
- [IndexedEntity](./indexedentity.md)
- [IntentVisibility](../siri-ai-preview/intentvisibility.md)
