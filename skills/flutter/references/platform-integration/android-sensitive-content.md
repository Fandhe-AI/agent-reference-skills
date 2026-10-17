---
source: https://docs.flutter.dev/platform-integration/android/sensitive-content
---

# Protect your app's sensitive content

The `SensitiveContent` widget prevents screens that contain sensitive content (such as passwords) from being projected.

## Signature / Usage

```dart
class MyWidget extends StatelessWidget {
  ...
  Widget build(BuildContext context) {
    return SensitiveContent(
      sensitivity: ContentSensitivity.sensitive,
      child: MySensitiveContent(),
    );
  }
}
```

## Options / Props

`ContentSensitivity` values for a child widget:

| Value | Description |
| --- | --- |
| `notSensitive` | Content is not sensitive. |
| `sensitive` | The device screen is obscured (blacked out) during media projection. |
| `autoSensitive` | Not supported as of Flutter 3.35; behaves the same as `notSensitive` (see issue #160879). |

## Notes

- You can have many `SensitiveContent` widgets, but if any one of them has a `sensitive` value, the entire screen is obscured during media projection. For most use cases, multiple widgets provide no advantage over one in the widget tree.
- Available on Android API 35+; no effect on lower API versions or other platforms. On Android API 34 and below the widget exists in the tree with no other effect, so you do not need to avoid it on unsupported platforms.
- API docs: `SensitiveContent` (widgets library) and `ContentSensitivity` (services library).
- This is a Flutter widget (Dart), distinct from native Android window-flag APIs documented in the android-* skills.

## Related

- [android-predictive-back](./android-predictive-back.md)
