---
source: https://developer.apple.com/documentation/imageplayground/imageplaygroundpersonalizationpolicy
---

# ImagePlaygroundPersonalizationPolicy

An option for enabling or disabling personalization in the system interface. Deprecated.

## Signature / Usage

```swift
enum ImagePlaygroundPersonalizationPolicy
```

```swift
// ImagePlaygroundViewController
@MainActor @preconcurrency var personalizationPolicy: ImagePlaygroundPersonalizationPolicy { get set }
```

## Options / Props

| Name | Description |
|------|-------------|
| automatic | Chooses the most appropriate personalization behavior (deprecated). |
| enabled | Enables personalization features in the view controller (deprecated). |
| disabled | Disables personalization features in the view controller (deprecated). |

## Notes

- Availability: iOS 18.4+, iPadOS 18.4+, Mac Catalyst 18.4+, macOS 15.4+, visionOS 2.4+. Deprecated at 26.4 on all platforms.
- Deprecation message: "Use the ImagePlaygroundOptions.Personalization type."
- `ImagePlaygroundViewController.personalizationPolicy` is deprecated in favor of `options` that takes an `ImagePlaygroundOptions.Personalization`. The default `.automatic` corresponds to `.enabled`.
- When enabled, the view controller can include a person from the Photos library or a character represented by an appearance and a skin tone.

## Related

- [ImagePlaygroundOptions](./image-playground-options.md)
- [ImagePlaygroundViewController](./image-playground-view-controller.md)
