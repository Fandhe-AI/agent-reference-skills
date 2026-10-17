---
source: https://docs.flutter.dev/release/breaking-changes/android-large-screens-restrictions-ignored
---

# Large screen orientation and resizability restrictions ignored on Android 17

For apps targeting Android 17 or higher, orientation, resizability, and aspect ratio restrictions no longer apply on displays 600dp wide or wider, so `SystemChrome.setPreferredOrientations` is ignored there.

## Signature / Usage

The page contains no code listing; the API it names is:

```text
SystemChrome.setPreferredOrientations
Android manifest property (Android 16 opt-out, removed in Android 17): PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY
```

## Notes

- Applies to apps that target Android 17 or higher on screens with width 600dp or greater. If your app supports Android 16 and did not opt out, it behaves the same on Android 17.
- In Android 16 this behavior was a default with a temporary opt-out via the `PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY` manifest property; Android 17 removes the opt-out.
- Migration (Flutter 3.44): if you rely on locking orientation, make the app adaptive to different screen sizes and orientations; see "Adaptive and responsive UI" (`/ui/adaptive-responsive/large-screens`).
- Android platform behavior itself is covered by the android-* skills (for example android-platform-core); this page covers only the Flutter-side effect.

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
- [Migrating to built-in Kotlin](./migrate-to-built-in-kotlin.md)
