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

## Related

- [DeferredProperty() macro](./deferredproperty.md)
- [EntityProperty](./entityproperty.md)
- [AppEntity](./appentity.md)
- [IndexedEntity](./indexedentity.md)
