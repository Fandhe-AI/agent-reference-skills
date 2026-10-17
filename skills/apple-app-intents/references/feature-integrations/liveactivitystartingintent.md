---
source: https://developer.apple.com/documentation/appintents/liveactivitystartingintent
---

# LiveActivityStartingIntent (deprecated)

An intent that starts, pauses, or otherwise modifies a Live Activity.

## Signature / Usage

```swift
protocol LiveActivityStartingIntent : SystemIntent
```

Migration: use `LiveActivityIntent` instead.

```swift
// Before (deprecated)
struct StartActivityIntent: LiveActivityStartingIntent { /* ... */ }

// After
struct StartActivityIntent: LiveActivityIntent { /* ... */ }
```

## Notes

- Deprecated. Deprecation message: "Use LiveActivityIntent instead."
- Introduced / deprecated: iOS 16.1 / 17.0, iPadOS 16.1 / 17.0, Mac Catalyst 16.1 / 17.0. visionOS: no version data in the source JSON.
- Inherits from `SystemIntent`, `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.
- The migration snippet is illustrative; the official page has no code listing.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [LiveActivityIntent](./liveactivityintent.md)
- [AudioStartingIntent](./audiostartingintent.md)
- [ForegroundContinuableIntent](./foregroundcontinuableintent.md)
