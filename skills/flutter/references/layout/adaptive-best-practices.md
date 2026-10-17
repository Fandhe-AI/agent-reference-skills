---
source: https://docs.flutter.dev/ui/adaptive-responsive/best-practices
---

# Best practices for adaptive design

Recommended design considerations and implementation details for adaptive Flutter apps.

## Signature / Usage

The page contains no code listing; these are the APIs it recommends or warns about.

```text
MediaQuery.sizeOf
LayoutBuilder
OrientationBuilder
Display
PageStorageKey
SingleChildScrollView
```

### Design considerations

- **Break down your widgets**: many small `const` widgets improve rebuild times (Flutter can reuse `const` widget instances), reduce the complexity of adopting an adaptive UI by sharing core code, and keep each widget readable and easier to refactor.
- **Design to the strengths of each form factor**: it isn't always ideal to offer identical functionality everywhere. For example, focus on capturing and tagging content on mobile, and on organizing or manipulating it on tablet or desktop. For web, decide which deep links to support.
- **Solve touch first**: building a great touch UI is often harder than a desktop UI. Test mostly on the desktop target for iteration speed but switch frequently to a mobile device. After touch is polished, tweak visual density for mouse users, then layer on additional inputs as accelerators.

### Implementation details

- **Don't lock the orientation of your app.** Multi-window and foldables make portrait-only assumptions unreliable. If you absolutely must lock to portrait, use the `Display` API rather than `MediaQuery` to get the physical dimensions. Locked screens can be an accessibility issue; Android large format tiers require portrait and landscape support at the lowest level; Android devices can override a locked screen; Apple guidelines say to aim to support both orientations.
- **Avoid device orientation-based layouts**: don't use `MediaQuery`'s orientation field or `OrientationBuilder` near the top of the widget tree to switch layouts. Use `MediaQuery.sizeOf` or `LayoutBuilder` with adaptive breakpoints such as those Material recommends.
- **Don't gobble up all of the horizontal space**: apps using the full window width for boxes or text fields don't play well on large screens (see Layout with GridView in the large-screens page).
- **Avoid checking for hardware types**: don't check whether the device is a "phone" or "tablet" for layout. The app may run in a resizeable window on ChromeOS, side by side in multi-window mode on tablets, or picture-in-picture on phones. Use `MediaQuery` to get the window size.
- **Support a variety of input devices**: support basic mice, trackpads, and keyboard shortcuts; the most common flows should support keyboard navigation.
- **Restore list state**: use `PageStorageKey` to persist and restore the scroll position of a list that doesn't change layout on orientation change. If the layout changes on rotation you may need to compute the scroll position.

### Save app state

Apps should retain or restore app state as the device rotates, changes window size, or folds and unfolds. If state is lost on configuration changes, verify that the plugins and native extensions the app uses support the device type (some may lose state when the device changes position). See "Problem: Folding/unfolding causes state loss" in the Flutter blog article "Developing Flutter apps for Large screens".

## Notes

- Flutter adaptive guidance (Dart) parallels, but is distinct from, Android adaptive layout guidance in the android-* skills and Apple multitasking guidance in apple-uikit / apple-swiftui.

## Related

- [General approach to adaptive apps](./adaptive-general.md)
- [Large screen devices](./large-screens.md)
- [User input & accessibility](./adaptive-input.md)
- [Capabilities & policies](./adaptive-capabilities.md)
