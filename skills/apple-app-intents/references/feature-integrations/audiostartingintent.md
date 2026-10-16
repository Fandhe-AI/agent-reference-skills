---
source: https://developer.apple.com/documentation/appintents/audiostartingintent
---

# AudioStartingIntent (deprecated)

An App Intent that plays, pauses, or otherwise modifies audio playback state when it executes.

## Signature / Usage

```swift
protocol AudioStartingIntent : SystemIntent
```

Migration: adopt `AudioPlaybackIntent` instead.

```swift
// Before (deprecated)
struct PlayIntent: AudioStartingIntent { /* ... */ }

// After
struct PlayIntent: AudioPlaybackIntent { /* ... */ }
```

## Notes

- Deprecated. Deprecation message: "Please use AudioPlaybackIntent instead."
- Introduced / deprecated: iOS 16.0 / 17.0, iPadOS 16.0 / 17.0, Mac Catalyst 16.0 / 17.0, macOS 13.0 / 14.0, tvOS 16.0 / 17.0, visionOS 1.0 / 1.0, watchOS 9.0 / 10.0.
- Purpose: adopt to indicate to the system that the App Intent plays audio, so the system can avoid dialogue or other experiences that might interrupt that audio.
- Inherits from `SystemIntent`, `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.
- The migration snippet is illustrative; the official page has no code listing.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [AudioPlaybackIntent](../intent-types/audioplaybackintent.md)
- [ForegroundContinuableIntent](./foregroundcontinuableintent.md)
- [LiveActivityStartingIntent](./liveactivitystartingintent.md)
