---
source: https://developer.apple.com/documentation/appintents/computedproperty()
---

# ComputedProperty() macro (6 overloads)

A macro that adds a computed app entity property with a get accessor and an optional set accessor.

## Signature / Usage

```swift
@attached(peer, names: prefixed(`$`), prefixed(`_`)) @attached(accessor, names: named(get), named(set)) macro ComputedProperty()
```

```swift
struct Restaurant: AppEntity {
    var model: Menu

    @ComputedProperty
    var menuItems: [MenuItem] {
        model.menuItems
    }
}
```

## Options / Props

| Overload | Parameters | Abstract |
| --- | --- | --- |
| `ComputedProperty()` | none | A macro that adds a computed app entity property with a get accessor and an optional set accessor. |
| `ComputedProperty(title:)` | `title: LocalizedStringResource` | Same as above. |
| `ComputedProperty(indexingKey:)` | `indexingKey: PartialKeyPath<CSSearchableItemAttributeSet>` | A macro that adds a computed app entity property with get and set accessors. |
| `ComputedProperty(customIndexingKey:)` | `customIndexingKey: CSCustomAttributeKey` | A macro that adds a computed app entity property with a get accessor and an optional set accessor. |
| `ComputedProperty(title:customIndexingKey:)` | `title: LocalizedStringResource, customIndexingKey: CSCustomAttributeKey` | Same as above. |
| `ComputedProperty(title:indexingKey:)` | `title: LocalizedStringResource, indexingKey: PartialKeyPath<CSSearchableItemAttributeSet>` | Same as above. |

## Notes

- The overload parameter lists are as shown in each page's declaration fragments.
- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+ (read from the `()`, `(title:)` and `(indexingKey:)` pages; the attached-macro attribute line above was read from those same three pages)
- Use inside an `AppEntity` to expose a property that is computed on access, instead of stored. The property is exposed to the system like an `@Property`-wrapped property.
- `indexingKey` / `customIndexingKey` associate the property with a Core Spotlight attribute (`CSSearchableItemAttributeSet` key path or `CSCustomAttributeKey`); Core Spotlight itself is outside this skill. See the IndexedEntity page.
- Same "Property declarations" group: `DeferredProperty()` overloads, `EntityProperty`, `EntityPropertyModifiers`, Property comparators.

### Overloads with description, authentication policy and visibility (iOS 27.3 beta)

Three further `ComputedProperty` overloads take `description:`, `authenticationPolicy:` and `visibility:` (declarations as published on their pages). They are iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, tvOS 27.3+, visionOS 27.3+, watchOS 27.3+ per page metadata; the earlier iOS 26.0+ note above applies to the overloads listed in the Options / Props table above. Apple states the Siri AI Developer Preview API may change.

| Declaration |
| --- |
| `@attached(peer, names: prefixed(`$`), prefixed(`_`)) @attached(accessor, names: named(get), named(set)) macro ComputedProperty(title: LocalizedStringResource? = nil, description: LocalizedStringResource? = nil, authenticationPolicy: IntentAuthenticationPolicy? = nil, visibility: IntentVisibility? = nil)` |
| `@attached(peer, names: prefixed(`$`), prefixed(`_`)) @attached(accessor, names: named(get), named(set)) macro ComputedProperty(title: LocalizedStringResource? = nil, description: LocalizedStringResource? = nil, authenticationPolicy: IntentAuthenticationPolicy? = nil, visibility: IntentVisibility? = nil, customIndexingKey: CSCustomAttributeKey)` |
| `@attached(peer, names: prefixed(`$`), prefixed(`_`)) @attached(accessor, names: named(get), named(set)) macro ComputedProperty(title: LocalizedStringResource? = nil, description: LocalizedStringResource? = nil, authenticationPolicy: IntentAuthenticationPolicy? = nil, visibility: IntentVisibility? = nil, indexingKey: PartialKeyPath<CSSearchableItemAttributeSet>)` |

- Pass a `description` to each `@ComputedProperty` of entities Siri uses; `visibility: .internal` keeps the property to the app and its extensions (see IntentVisibility in siri-ai-preview).
- Source: https://developer.apple.com/documentation/appintents/computedproperty(title:description:authenticationpolicy:visibility:) and its `customIndexingKey` / `indexingKey` variants (fetched 2026-11-14)

## Related

- [DeferredProperty() macro](./deferredproperty.md)
- [EntityProperty](./entityproperty.md)
- [AppEntity](./appentity.md)
- [IndexedEntity](./indexedentity.md)
- [IntentVisibility](../siri-ai-preview/intentvisibility.md)
