---
source: https://developer.apple.com/documentation/appintents/resultscollection
---

# ResultsCollection

A protocol representing a collection of returned items with support for sectioning.

## Signature / Usage

```swift
protocol ResultsCollection<Result>
```

## Options / Props

| Name | Declaration | Description |
|------|-------------|-------------|
| Result | `associatedtype Result : _IntentValue` | Item value type |
| empty | `static var empty: Self` | An empty result. |
| items | `var items: [Self.Result.ValueType]` | All result items. |
| promptLabel | `var promptLabel: LocalizedStringResource?` | A text prompt shown at the top of the view that presents the options. |
| usesIndexedCollation | `var usesIndexedCollation: Bool` | If set to true, presents the list of options with an alphabetical index on the right side of the screen (table view section index titles). |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- `IntentItemCollection` ("Return this object to provide an advanced list of options, optionally divided in sections") is the concrete type listed under conforming types; it is covered in the data-types category.
- Used as `DynamicOptionsProvider.Result`.

## Related

- [DynamicOptionsProvider](./dynamicoptionsprovider.md)
- [IntentResult](./intentresult.md)
