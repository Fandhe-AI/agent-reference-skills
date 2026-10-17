---
source: https://docs.flutter.dev/ui/adaptive-responsive/capabilities
---

# Capabilities & policies

How to adapt an app to the capabilities and policies required by the platform, app store, or your company. Flutter's recommended pattern is a set of `Capability` and `Policy` classes for your app.

## Signature / Usage

Avoid `Platform.isAndroid` and similar checks for layout decisions or assumptions about what a device can do. Describe what you want to branch on in a method, and put it in a class so tests can mock it.

```dart
bool shouldAllowPurchaseClick() {
  // Banned by Apple App Store guidelines.
  return !Platform.isIOS;
}

...
TextSpan(
  text: 'Buy in browser',
  style: new TextStyle(color: Colors.blue),
  recognizer: shouldAllowPurchaseClick ? TapGestureRecognizer()
    ..onTap = () { launch('<some url>') : null;
  } : null,
```

```dart
class Policy {

  bool shouldAllowPurchaseClick() {
    // Banned by Apple App Store guidelines.
    return !Platform.isIOS;
  }
}
```

### Definitions

| Concept | Meaning | Examples |
|---------|---------|----------|
| Capability | What the code or device _can_ do | Existence of an API; OS-enforced restrictions; physical hardware requirements (like a camera) |
| Policy | What the code _should_ do | App store guidelines; design preferences; assets or copy referring to the host device; features enabled on the server side |

- Capabilities usually involve compile or runtime checks. Policies can be a mix of compile, runtime, or RPC checks.
- Separating the two helps larger products respond to changes in what platforms can do or require. Example: a capability `requirePermissionDialogFlow` created for platform 1 can later check the API level and return true for platform 2.
- Start with a `Policy` class even if you expect few policy decisions; split it by feature or other criteria as it grows.
- Compile-time policy checks suit platforms where the preference is unlikely to change and an accidental change has large consequences (for example, not linking to the Play store, or a required payment provider). Runtime checks suit things like detecting a touch screen (an Android feature check, or max touch points on web). RPC-backed policy changes suit incremental feature rollout or decisions that might change later.

## Notes

- `Platform.isAndroid`, `Platform.isIOS`, and `kIsWeb` mechanically tell where the code runs but have problems as the app expands to more platforms and host platforms add functionality.
- A widget test can mock `Policy().shouldAllowPurchaseClick` and verify behavior independent of where the device runs.
- Name the methods in capability and policy classes after what they branch on, not device type.
- The snippets above are reproduced verbatim from the original page and are illustrative only (the first listing is not complete, compilable code).
- If deploying a web app, decide what deep links to support and design navigation routes with those in mind.

## Related

- [Best practices for adaptive design](./adaptive-best-practices.md)
- [Platform idioms](./platform-idioms.md)
- [Deep linking](../interaction-navigation/deep-linking.md)
