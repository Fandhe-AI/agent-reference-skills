---
source: https://api.flutter.dev/flutter/material/Scaffold-class.html
---

# Scaffold

Implements the basic Material Design visual layout structure (`package:flutter/material.dart`). It provides APIs for showing drawers and bottom sheets. To display a persistent bottom sheet, obtain the `ScaffoldState` for the current `BuildContext` via `Scaffold.of` and use `ScaffoldState.showBottomSheet`.

## Signature / Usage

```dart
Scaffold({
  Key? key,
  PreferredSizeWidget? appBar,
  Widget? body,
  Widget? floatingActionButton,
  FloatingActionButtonLocation? floatingActionButtonLocation,
  FloatingActionButtonAnimator? floatingActionButtonAnimator,
  List<Widget>? persistentFooterButtons,
  AlignmentDirectional persistentFooterAlignment = AlignmentDirectional.centerEnd,
  BoxDecoration? persistentFooterDecoration,
  Widget? drawer,
  DrawerCallback? onDrawerChanged,
  Widget? endDrawer,
  DrawerCallback? onEndDrawerChanged,
  Widget? bottomNavigationBar,
  Widget? bottomSheet,
  Color? backgroundColor,
  bool? resizeToAvoidBottomInset,
  bool primary = true,
  DragStartBehavior drawerDragStartBehavior = DragStartBehavior.start,
  bool extendBody = false,
  bool drawerBarrierDismissible = true,
  bool extendBodyBehindAppBar = false,
  Color? drawerScrimColor,
  Widget? bottomSheetScrimBuilder(BuildContext, Animation<double>) = _defaultBottomSheetScrimBuilder,
  double? drawerEdgeDragWidth,
  bool drawerEnableOpenDragGesture = true,
  bool endDrawerEnableOpenDragGesture = true,
  String? restorationId,
})
```

Listening to a tab controller so a single Scaffold's `AppBar` title updates (from the API docs):

```dart
TabController(vsync: tickerProvider, length: tabCount)..addListener(() {
  if (!tabController.indexIsChanging) {
    setState(() {
      // Rebuild the enclosing scaffold with a new AppBar title
      appBarTitle = 'Tab ${tabController.index}';
    });
  }
})
```

## Options / Props

Selected constructor parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appBar | PreferredSizeWidget? | — | Horizontal bar typically shown at the top (e.g. `AppBar`) |
| body | Widget? | — | Primary content |
| floatingActionButton | Widget? | — | Circular button typically at the bottom right |
| floatingActionButtonLocation | FloatingActionButtonLocation? | — | Where the FAB is placed (e.g. `FloatingActionButtonLocation.centerDocked`) |
| drawer / endDrawer | Widget? | — | Vertical panels at the start / end side |
| bottomNavigationBar | Widget? | — | Horizontal bar typically along the bottom |
| bottomSheet | Widget? | — | Persistent bottom sheet |
| persistentFooterButtons | List<Widget>? | — | Buttons at the bottom of the scaffold |
| backgroundColor | Color? | — | Background color of the Scaffold |
| resizeToAvoidBottomInset | bool? | — | Resize the body when the keyboard appears |
| primary | bool | true | Whether the Scaffold is displayed at the top of the screen |
| extendBody | bool | false | Extend the body behind the bottom bar |
| extendBodyBehindAppBar | bool | false | Extend the body behind the app bar |
| drawerScrimColor | Color? | — | Color of the drawer scrim |
| drawerEdgeDragWidth | double? | — | Area of the edge that responds to the open drag gesture |
| drawerEnableOpenDragGesture / endDrawerEnableOpenDragGesture | bool | true | Allow drag-to-open |
| restorationId | String? | — | State restoration id |

Static methods: `Scaffold.of(BuildContext context) -> ScaffoldState`, `Scaffold.maybeOf(BuildContext context) -> ScaffoldState?`, `Scaffold.hasDrawer(BuildContext context, {bool registerForUpdates = true}) -> bool`, `Scaffold.geometryOf(BuildContext context) -> ValueListenable<ScaffoldGeometry>`.

## Notes

- The scaffold expands to fill the available space. When the keyboard appears, the ancestor `MediaQuery`'s `viewInsets` change and the Scaffold is rebuilt; by default the body is resized to make room. Set `resizeToAvoidBottomInset` to false to prevent the resize. In either case the focused widget is scrolled into view if it is in a scrollable container.
- `MediaQueryData.padding` defines areas that might not be completely visible, like the display "notch". The scaffold's body is not inset by this padding, although an `appBar` or `bottomNavigationBar` typically causes the body to avoid it. Use `SafeArea` within the body to avoid such areas.
- If `Scaffold.bottomSheet` is a `DraggableScrollableSheet`, `floatingActionButton` is set, and the sheet is dragged to cover more than 70% of the Scaffold's height, the Scaffold shows a scrim and scales down the FAB with `Curves.easeIn` (it disappears when the sheet covers the entire Scaffold). Below 70% the scrim disappears and the FAB animates back.
- The Scaffold is designed to be a top-level container for a `MaterialApp`; adding a Scaffold to each route gives the app Material's basic visual layout structure. It is typically not necessary to nest Scaffolds (for tabbed UI, add a listener to the `TabController` that updates the `AppBar` instead); it is best to avoid nesting.
- Opt-in (Flutter 3.47): the Material library is also available as the standalone `material_ui` package (1.0). This page documents the in-framework `package:flutter/material.dart` surface of the 3.47 stable SDK, which is scheduled for formal deprecation in an upcoming stable release.
- Flutter `Scaffold` (Dart). Distinct from the Jetpack Compose Material3 `Scaffold` / `MaterialTheme` in the android-compose-components skill and from SwiftUI / UIKit screen structure in apple-swiftui and apple-uikit.

## Related

- [MaterialApp](./MaterialApp.md)
- [ThemeData](./ThemeData.md)
- [material](./material.md)
