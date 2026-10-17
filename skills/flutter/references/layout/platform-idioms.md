---
source: https://docs.flutter.dev/ui/adaptive-responsive/idioms
---

# Platform idioms

Each platform has its own idioms and norms; reflecting them reduces cognitive load and builds trust. This page covers how to approach several common idioms in Flutter.

## Signature / Usage

Scrollbar: toggle thumb visibility on desktop platforms.

```dart
return Scrollbar(
  thumbVisibility: DeviceType.isDesktop,
  controller: _scrollController,
  child: GridView.count(
    controller: _scrollController,
    padding: const EdgeInsets.all(Insets.extraLarge),
    childAspectRatio: 1,
    crossAxisCount: colCount,
    children: listChildren,
  ),
);
```

Multi-select (platform-aware modifier checks):

```dart
static bool get isSpanSelectModifierDown =>
    isKeyDown({LogicalKeyboardKey.shiftLeft, LogicalKeyboardKey.shiftRight});
```

```dart
static bool get isMultiSelectModifierDown {
  bool isDown = false;
  if (Platform.isMacOS) {
    isDown = isKeyDown({
      LogicalKeyboardKey.metaLeft,
      LogicalKeyboardKey.metaRight,
    });
  } else {
    isDown = isKeyDown({
      LogicalKeyboardKey.controlLeft,
      LogicalKeyboardKey.controlRight,
    });
  }
  return isDown;
}
```

Selectable text:

```dart
return const SelectableText('Select me!');
```

```dart
return const SelectableText.rich(
  TextSpan(
    children: [
      TextSpan(text: 'Hello'),
      TextSpan(
        text: 'Bold',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    ],
  ),
);
```

Tooltip:

```dart
return const Tooltip(
  message: 'I am a Tooltip',
  child: Text('Hover over the text to show a tooltip.'),
);
```

Horizontal button order (confirmation button first on Windows, last elsewhere):

```dart
TextDirection btnDirection = DeviceType.isWindows
    ? TextDirection.rtl
    : TextDirection.ltr;
return Row(
  children: [
    const Spacer(),
    Row(
      textDirection: btnDirection,
      children: [
        DialogButton(
          label: 'Cancel',
          onPressed: () => Navigator.pop(context, false),
        ),
        DialogButton(
          label: 'Ok',
          onPressed: () => Navigator.pop(context, true),
        ),
      ],
    ),
  ],
);
```

### Common idioms

| Idiom | Guidance |
|-------|----------|
| Scrollbar | Mobile: smaller scrollbars that appear only while scrolling; desktop: larger omnipresent scrollbars users click or drag. The built-in `Scrollbar` adapts colors and sizes per platform. |
| Multi-select | Desktop: Shift for span select, Control (or Command on macOS) for multi-select, `Control+A` for Select All. Touch: single tap selects/deselects, plus a Select All or Clear button. |
| Selectable text | Web (and to a lesser extent desktop) users expect visible text to be selectable; use `SelectableText` / `SelectableText.rich`. |
| Title bars | Not directly supported in Flutter; the `bits_dojo` package can disable native title bars and replace them with pure Flutter widgets. |
| Context menus and tooltips | Context menu: right-click, near the mouse. Tooltip: hover for 200-400ms, anchored to a widget, dismissed when the cursor leaves. Popup panel (flyout): anchored, shown on tap, dismissed by clicking outside or Close/Submit. Use `Tooltip` for basic tooltips; for advanced ones build with `Stack` or `Overlay` or use a package (`context_menus`, `anchored_popups`, `flutter_portal`, `super_tooltip`, `custom_pop_up_menu`). |
| Horizontal button order | Windows: confirmation button at the start (left); other platforms: at the end (right). Handle with `Row.textDirection`. |
| Menu bar | Windows and Linux: part of the Chrome title bar; macOS: along the top of the primary screen. Custom entries are possible via a prototype plugin, expected to be integrated into the SDK eventually. On Windows and Linux you can't combine a custom title bar with a native menu bar; implement both in Flutter. |
| Drag and drop | Touch users expect drag handles or long press to start a drag (one finger for both scroll and drag); mouse users can just select and drag. Options: `Draggable` and `DragTarget`, `onPan` gesture events within a `Stack`, or pre-made list packages on pub.dev. |

## Notes

- Find a platform advocate for each platform (combine roles, for example Windows and Android, Linux and web, Mac and iOS); advocates may be designers, stakeholders, or external testers.
- Stay unique: conforming to platform norms doesn't require default components or styling.
- The `DeviceType`, `Insets`, `DialogButton`, and `Logo` identifiers in the snippets come from the page's demo project, not from the Flutter SDK.
- Platform-specific interaction conventions for Android, Apple, and Windows themselves are covered by the android-*, apple-*, and windows-* skills; this page is the Flutter-side approach.

## Related

- [Automatic platform adaptations](./platform-adaptations.md)
- [User input & accessibility](./adaptive-input.md)
- [Capabilities & policies](./adaptive-capabilities.md)
