---
source: https://docs.flutter.dev/ui/adaptive-responsive/safearea-mediaquery
---

# SafeArea & MediaQuery

How and when to use the `SafeArea` and `MediaQuery` widgets to create an adaptive app.

## Signature / Usage

The page contains no code listing; these are the APIs it describes.

```text
SafeArea
MediaQuery
MediaQueryData.padding
Scaffold
```

### SafeArea

- `SafeArea` insets its child to avoid intrusions (notches and camera cutouts), operating system UI (such as the Android status bar), and rounded corners of the physical display.
- All four sides are enabled by default; it allows disabling padding on any of its four sides.
- It is generally recommended to wrap the body of a `Scaffold` in `SafeArea`, but it doesn't have to be this high in the widget tree. To stretch under the cutouts on purpose, wrap only the content that needs protection.
- Behind the scenes it uses the `MediaQuery` object.

### MediaQuery

- Provides the app's current window size, accessibility settings (high contrast mode, text scaling, whether a service like TalkBack or VoiceOver is in use), and info about display features such as a hinge or a fold.
- `SafeArea` uses the `MediaQuery` `padding` property: the amount of the display partially obscured by system UI, display notches, or the status bar.
- `SafeArea` modifies the `MediaQuery` exposed to its children so the padding it added appears not to exist. Nested `SafeArea`s therefore apply the padding only once (the topmost one), whereas using `MediaQueryData.padding` directly would apply too much padding.

## Notes

- `AppBar` goes underneath the system status bar by default, which is why wrapping the body of a `Scaffold` in `SafeArea` is recommended instead of wrapping the whole `Scaffold`.
- Flutter `SafeArea` / `MediaQuery` (Dart) are distinct from Android window insets in Jetpack Compose (android-compose-ui) and SwiftUI safe area (apple-swiftui).

## Related

- [General approach to adaptive apps](./adaptive-general.md)
- [Large screen devices](./large-screens.md)
- MediaQuery
