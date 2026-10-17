---
source: https://developer.apple.com/documentation/appintents/videocategory
---

# VideoCategory

Constants for the categories of video content an app supports through `PlayVideoIntent` (the page has no abstract).

## Signature / Usage

```swift
enum VideoCategory
```

```swift
case freeform
case movies
case tv
```

## Options / Props

| Case | Description |
| --- | --- |
| `freeform` | The app supports searching for freeform video content like what may uploaded to social media platforms. This should not be used in cases of highly structured content like movies and episodic tv shows. |
| `movies` | The app supports searching for structured movie content. |
| `tv` | The app supports searching for structured tv content including shows, seasons, or episodes. |

## Notes

- iOS 17.2+, iPadOS 17.2+, Mac Catalyst 17.2+, macOS 14.2+, tvOS 17.2+, visionOS (version not listed on the page). No watchOS availability is listed.
- Conforms to `AppEnum`, `AppValue`, `CaseDisplayRepresentable`, `CaseIterable`, `CustomLocalizedStringResourceConvertible`, `Equatable`, `Hashable`, `PersistentlyIdentifiable`, `RawRepresentable`, `Sendable`, `SendableMetatype`, `StaticDisplayRepresentable`, `TypeDisplayRepresentable`.
- Related typealiases on the page (no abstracts): `Specification`, `UnwrappedType`, `ValueType`.
- Search-scope counterpart with a similar shape: `StringSearchScope` (`freeformVideo`, `general`, `movies`, `tv`).

## Related

- [PlayVideoIntent](./playvideointent.md)
- [StringSearchScope](./stringsearchscope.md)
