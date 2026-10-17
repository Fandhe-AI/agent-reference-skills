---
source: https://docs.flutter.dev/ui/adaptive-responsive/large-screens
---

# Large screen devices

Guidance for optimizing an app on large screens. Flutter, like Android, defines large screens as tablets, foldables, and ChromeOS devices running Android; Flutter also defines large screen devices as web, desktop, and iPads.

## Signature / Usage

Retrieve the physical `Display` of the view you care about (one of the few cases where physical display dimensions, not window dimensions, are appropriate):

```dart
/// AppState object.
ui.FlutterView? _view;

@override
void didChangeDependencies() {
  super.didChangeDependencies();
  _view = View.maybeOf(context);
}

void didChangeMetrics() {
  final ui.Display? display = _view?.display;
}
```

### Layout with GridView

Neither text nor boxes should take up the full screen width (Android Large Screen App Quality Guidelines and the iOS equivalent). A common solution is to swap `ListView` for `GridView`.

- The `ListView` default constructor maps to `GridView.count`; `ListView.builder` is similar to `GridView.builder`. Use the builder constructor for many items so only visible item widgets are built.
- Set `gridDelegate` with one of the premade delegates:

| Delegate | Description |
|----------|-------------|
| `SliverGridDelegateWithFixedCrossAxisCount` | Assign a specific number of columns to your grid |
| `SliverGridDelegateWithMaxCrossAxisExtent` | Define a max item width |

- Don't hardcode the column count based on device type (tablet or otherwise). The number of columns should depend on the window size, not the physical device size, because many devices support multi-window mode and Flutter apps can run on web and desktop. Use `MediaQuery` to get the app window size.

Other solutions: wrap the `GridView` in a `ConstrainedBox` with a `BoxConstraints` that sets a maximum width (`maxWidth`), or use a `Container` if you also need background color. Consider the maximum widths recommended by Material 3 in the Applying layout guide.

### Foldables

Android and Flutter both recommend not locking screen orientation. When a locked app runs on a foldable, it may look fine folded but be letterboxed when unfolded: `setPreferredOrientations` causes Android to use a portrait compatibility mode, and `MediaQuery` never receives the larger window size.

Two solutions:

- Support all orientations.
- Use the dimensions of the physical display via the `Display` API, which contains the size, pixel ratio, and refresh rate of the physical device.

### Adaptive input

Android guidelines describe three tiers of large format device support; tier 3, the lowest, includes mouse and stylus input. Material 3 buttons and selectors have built-in support for additional input states; for custom widgets see the User input page.

### Navigation

Generally switch between a `BottomNavigationBar` and a `NavigationRail` depending on available screen space. See "Problem: Navigation rail" in the Flutter blog article "Developing Flutter apps for Large screens".

## Notes

- Migration (Flutter 3.44): for apps targeting Android 17 or higher, orientation, resizability, and aspect ratio restrictions no longer apply on displays 600dp or wider, so `SystemChrome.setPreferredOrientations` is ignored on those devices. If your app relies on locking orientation, make it adaptive. See the release category.
- As of January 2024, according to the page: more than 270 million active large screen and foldable devices run Android, and more than 14.9 million iPad users. Supporting large screens improves engagement metrics, Play Store visibility, and iPadOS App Store acceptance.
- Android platform behavior itself (large-screen compatibility mode, window size classes) is covered by the android-* skills; this page is the Flutter-side guidance.

## Related

- [General approach to adaptive apps](./adaptive-general.md)
- [SafeArea & MediaQuery](./safearea-mediaquery.md)
- [User input & accessibility](./adaptive-input.md)
- [Best practices for adaptive design](./adaptive-best-practices.md)
- [Large screen orientation and resizability restrictions ignored on Android 17](../release/android-large-screens-restrictions-ignored.md)
