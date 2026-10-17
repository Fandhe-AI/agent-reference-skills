---
source: https://docs.flutter.dev/ui/adaptive-responsive/platform-adaptations
---

# Automatic platform adaptations

Flutter's automatic adaptation to Android and iOS behaviors, plus preliminary recommendations for adapting Material widgets on iOS.

## Signature / Usage

Widgets with `.adaptive()` constructors substitute the corresponding Cupertino component when the app runs on iOS:

| Material widget | Cupertino widget | Adaptive constructor |
|-----------------|------------------|----------------------|
| `Switch` | `CupertinoSwitch` | `Switch.adaptive()` |
| `Slider` | `CupertinoSlider` | `Slider.adaptive()` |
| `CircularProgressIndicator` | `CupertinoActivityIndicator` | `CircularProgressIndicator.adaptive()` |
| `RefreshProgressIndicator` | `CupertinoActivityIndicator` | `RefreshIndicator.adaptive()` |
| `Checkbox` | `CupertinoCheckbox` | `Checkbox.adaptive()` |
| `Radio` | `CupertinoRadio` | `Radio.adaptive()` |
| `AlertDialog` | `CupertinoAlertDialog` | `AlertDialog.adaptive()` |

Adapting the top app bar styling on iOS:

```dart
// Map the text theme to iOS styles
TextTheme cupertinoTextTheme = TextTheme(
    headlineMedium: CupertinoThemeData()
        .textTheme
        .navLargeTitleTextStyle
         // fixes a small bug with spacing
        .copyWith(letterSpacing: -1.5),
    titleLarge: CupertinoThemeData().textTheme.navTitleTextStyle)
...

// Use iOS text theme on iOS devices
ThemeData(
      textTheme: Platform.isIOS ? cupertinoTextTheme : null,
      ...
)
...

// Modify AppBar properties
AppBar(
        surfaceTintColor: Platform.isIOS ? Colors.transparent : null,
        shadowColor: Platform.isIOS ? CupertinoColors.darkBackgroundGray : null,
        scrolledUnderElevation: Platform.isIOS ? .1 : null,
        toolbarHeight: Platform.isIOS ? 44 : null,
        ...
      ),
```

Platform-specific bottom navigation (`NavigationBar` on Android, `CupertinoTabBar` on iOS):

```dart
final Map<String, Icon> _navigationItems = {
    'Menu': Platform.isIOS ? Icon(CupertinoIcons.house_fill) : Icon(Icons.home),
    'Order': Icon(Icons.adaptive.share),
  };

...

Scaffold(
  body: _currentWidget,
  bottomNavigationBar: Platform.isIOS
          ? CupertinoTabBar(
              currentIndex: _currentIndex,
              onTap: (index) {
                setState(() => _currentIndex = index);
                _loadScreen();
              },
              items: _navigationItems.entries
                  .map<BottomNavigationBarItem>(
                      (entry) => BottomNavigationBarItem(
                            icon: entry.value,
                            label: entry.key,
                          ))
                  .toList(),
            )
          : NavigationBar(
              selectedIndex: _currentIndex,
              onDestinationSelected: (index) {
                setState(() => _currentIndex = index);
                _loadScreen();
              },
              destinations: _navigationItems.entries
                  .map<Widget>((entry) => NavigationDestination(
                        icon: entry.value,
                        label: entry.key,
                      ))
                  .toList(),
            ));
```

Platform-specific text field (adapt the Material `TextField` styling):

```dart
Widget _createAdaptiveTextField() {
  final _border = OutlineInputBorder(
    borderSide: BorderSide(color: CupertinoColors.lightBackgroundGray),
  );

  final iOSDecoration = InputDecoration(
    border: _border,
    enabledBorder: _border,
    focusedBorder: _border,
    filled: true,
    fillColor: CupertinoColors.white,
    hoverColor: CupertinoColors.white,
    contentPadding: EdgeInsets.fromLTRB(10, 0, 0, 0),
  );

  return Platform.isIOS
      ? SizedBox(
          height: 36.0,
          child: TextField(
            decoration: iOSDecoration,
          ),
        )
      : TextField();
}
```

### Adaptation philosophy

Two cases of platform adaptiveness exist:

1. Behaviors of the OS environment (such as text editing and scrolling) that would be "wrong" if a different behavior took place. Flutter adapts these automatically on Android and iOS.
2. Things conventionally implemented in apps using the OEM's SDKs (such as parallel tabs on iOS or an `android.app.AlertDialog` on Android). Flutter bundles the means to produce the effects but doesn't adapt automatically when app design choices are needed.

### Automatic adaptations

| Area | Android | iOS |
|------|---------|-----|
| Navigation transition | Default `Navigator.push()` is modeled after `startActivity()` (bottom-up); uses `ZoomPageTransitionsBuilder` | `Navigator.push()` produces an end-to-start push transition (RTL-aware) with parallax of the page behind; `PageRoute.fullscreenDialog` true gives a bottom-up present transition; `CupertinoNavigationBar` and `CupertinoSliverNavigationBar` animate subcomponents between pages |
| Back navigation | OS back button pops the top route of the `WidgetsApp`'s Navigator | Edge swipe gesture pops the top route |
| Scroll physics | More static friction | More weight and dynamic friction: gains speed more gradually, stops less abruptly, slipperier at slow speeds |
| Overscroll | Material 3 (default): stretch effect (`StretchingOverscrollIndicator`); Material 2 (`useMaterial3: false`): glow indicator (`GlowingOverscrollIndicator`, based on the Material theme color) | Overscrolls with increasing resistance and snaps back (`BouncingScrollPhysics`) |
| Scrollbars | Material-based platforms (Android, web): typically visible during scrolling | Cupertino-based: minimal, appear briefly while scrolling and fade out |
| Momentum | No equivalent | Repeated flings in the same direction stack momentum |
| Return to top | No equivalent | Tapping the status bar scrolls the primary scroll controller to top |
| Typography | Material defaults to Roboto | Material and Cupertino default to San Francisco |
| Iconography | Overflow button three dots vertical; back button has a stem/shaft | Three dots horizontal; back button is a simple chevron |
| Haptic feedback | Word selection by text field long-press triggers a "buzz" | Scrolling picker items triggers a "light impact" knock |

Typography detail: the San Francisco font license limits its usage to iOS, macOS, or tvOS software, so a fallback font is used when running on Android with the platform debug-overridden to iOS or with the default Cupertino theme. The Material library also provides platform-adaptive icons through `Icons.adaptive`.

Text editing: both Material and Cupertino text fields support spellcheck configured for the platform. Platform differences:

| Gesture | Material on Android | Material on iOS / Cupertino |
|---------|---------------------|-----------------------------|
| Keyboard gesture navigation | Horizontal swipes on the soft keyboard's space key move the cursor | Force-press-drag on the soft keyboard (3D Touch devices) moves the cursor in 2D via a floating cursor |
| Text selection toolbar | Android style | iOS style |
| Single tap | Cursor at the tap location; collapsed selection shows a draggable handle | Cursor at the nearest edge of the tapped word; no draggable handles |
| Long press | Selects the word; toolbar shown on release | Places the cursor at the location; toolbar shown on release |
| Long-press drag | Expands the selected words | Moves the cursor |
| Double tap | Selects the word and shows the toolbar (both platforms) | Selects the word and shows the toolbar (both platforms) |

## Notes

- Since Android 12 the default UI for top app bars, bottom navigation bars, and text fields follows Material 3; iOS equivalents are "Navigation Bars", "Tab Bars", and text fields in Apple's Human Interface Guidelines. App bar system icons and page transitions are already adapted by Material `AppBar` and `SliverAppBar`.
- Only adapt styling of app bars if it stays cohesive with the rest of the app; tab bars persist across the app, so they should match your own branding.
- The page notes that preliminary guides for case 2 are being added to the UI components section, and feedback is requested on issue #8427 (Flutter website repository).
- The source page describes only the Android glow indicator (`GlowingOverscrollIndicator`); with Material 3, the default since Flutter 3.16, `MaterialScrollBehavior` uses `StretchingOverscrollIndicator` instead, so the Overscroll row was updated here.
- The code snippets are verbatim from the page and partly abbreviated with `...`.
- This is Flutter's cross-platform adaptation layer (Dart); native iOS and Android behavior is documented in apple-uikit / apple-swiftui and the android-* skills. Flutter's Material / Cupertino widget libraries are distinct from Compose Material3 (android-compose-components) and UIKit / SwiftUI components.
- Flutter 3.47 allows opting in to the standalone material_ui / cupertino_ui packages (the page's API links point at them); in-framework Material and Cupertino are not yet deprecated in 3.47.7. See the release category.

## Related

- [Platform idioms](./platform-idioms.md)
- [General approach to adaptive apps](./adaptive-general.md)
- Navigator
