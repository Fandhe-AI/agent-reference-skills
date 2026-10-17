---
source: https://developer.apple.com/documentation/appintents/stringsearchscope
---

# StringSearchScope

Constants that describe the types of content your app includes in search results when the search criteria is a string.

## Signature / Usage

```swift
enum StringSearchScope
```

```swift
case freeformVideo
case general
case movies
case tv
```

## Options / Props

| Case | Description |
| --- | --- |
| `general` | The app offers a general search functionality that's exposed to the system. |
| `freeformVideo` | The app supports searching for free-form video content like videos people upload to social media platforms. |
| `movies` | The app supports searching for structured movie content. |
| `tv` | The app supports searching for structured TV content including shows, seasons, or episodes. |

## Notes

- iOS 17.2+, iPadOS 17.2+, Mac Catalyst 17.2+, macOS 14.2+, tvOS 17.2+, visionOS (version not listed on the page), watchOS 10.2+
- Conforms to `AppEnum`, `AppValue`, `CaseDisplayRepresentable`, `CaseIterable`, `CustomLocalizedStringResourceConvertible`, `Equatable`, `Hashable`, `PersistentlyIdentifiable`, `RawRepresentable`, `Sendable`, `SendableMetatype`, `StaticDisplayRepresentable`, `TypeDisplayRepresentable`.
- Use with `StringSearchCriteria`. For most content use `general`, which covers a broad range of content; if the app also searches media types, specify one or more of the other options.
- Related typealiases on the page (no abstracts): `Specification`, `UnwrappedType`, `ValueType`.

## Related

- [ShowInAppSearchResultsIntent](./showinappsearchresultsintent.md)
- [StringSearchCriteria](./stringsearchcriteria.md)
