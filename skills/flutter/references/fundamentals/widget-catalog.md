---
source: https://docs.flutter.dev/ui/widgets
---

# Widget catalog

A catalog of some of Flutter's rich set of widgets: visual, structural, platform, and interactive. Widgets can be browsed by category here, or in the full widget index (https://docs.flutter.dev/reference/widgets). The category and membership data below come from the site's catalog data files `sites/docs/src/data/catalog/index.yml` (categories) and `widgets.yml` (each entry with `categories`, `subcategories`, and an API `link`).

## Signature / Usage

Category definition format in `index.yml` (first entries, verbatim):

```yaml
- name: Basics
  description: >-
    Widgets to know before building your first Flutter app.
  priority: high
  id: basics
- name: Material components
  description: >-
    Visual, behavioral, and motion-rich widgets implementing the
    Material 3 design specification.
  subcategories:
    - name: 'Actions'
      color: '#D9E7CB'
    - name: 'Communication'
      color: '#F9DBDA'
    - name: 'Containment'
      color: '#F9DBDA'
    - name: 'Navigation'
      color: '#E5E4C2'
    - name: 'Selection'
      color: '#D9E7CB'
    - name: 'Text inputs'
      color: '#E5E4C2'
  id: material
```

### Design systems

The style-neutral `widgets` library (`package:flutter/widgets.dart`) ships with the Flutter SDK. Two UI design packages, `material_ui` and `cupertino_ui`, are built on top of `widgets` and are available on pub.dev.

- **Cupertino** (`/ui/widgets/cupertino`): beautiful, high-fidelity widgets that align with Apple's Human Interface Guidelines for iOS and macOS.
- **Material design** (`/ui/widgets/material`): visual, behavioral, and motion-rich widgets implementing the Material 3 design specification.

Community design systems on pub.dev include the Windows-inspired `fluent_ui`, the macOS-inspired `macos_ui`, and the Ubuntu-inspired `yaru`.

### Catalog categories (`index.yml`)

| id | Name | Description |
| --- | --- | --- |
| basics | Basics | Widgets to know before building your first Flutter app. |
| material | Material components | Visual, behavioral, and motion-rich widgets implementing the Material 3 design specification. Subcategories: Actions, Communication, Containment, Navigation, Selection, Text inputs. |
| material2 | Material 2 components | Widgets implementing the Material 2 design guidelines. Subcategories: App structure and navigation, Buttons, Input and selections, Dialogs, alerts, and panels, Information displays, Layout. |
| cupertino | Cupertino | Beautiful and high-fidelity widgets that align with Apple's Human Interface Guidelines for iOS and macOS. |
| layout | Layout | Arrange other widgets columns, rows, grids, and many other layouts. Subcategories: Single-child layout widgets, Multi-child layout widgets, Sliver widgets. |
| text | Text | Display and style text. |
| assets | Assets, images, and icons | Manage assets, display images, and show icons. |
| input | Input | Take user input in addition to input widgets in Material components and Cupertino. |
| animation | Animation and motion | Bring animations to your app. |
| interaction | Interaction models | Respond to touch events and route users to different views. Subcategories: Touch interactions, Routing. |
| styling | Styling | Manage the theme of your app, make your app responsive to screen sizes, or add padding. |
| painting | Painting and effects | These widgets apply visual effects to the children without changing their layout, size, or position. |
| async | Async | Widgets supporting async patterns in your Flutter apps. |
| scrolling | Scrolling | Scroll multiple widgets as children of the parent. Subcategory: Sliver widgets. |
| accessibility | Accessibility | Make your app accessible. |

### Widgets by category (`widgets.yml`)

Entries carry a `categories` list and/or a `subcategories` list; a widget can appear under several. Names are the catalog entry names (some are not class names, e.g. `Common buttons`, `Bottom sheet`, `Menu`, `Navigation rail`, `Bottom app bar`, `Extended FloatingActionButton`).

#### Basics

AppBar, Column, Container, ElevatedButton, FlutterLogo, Icon, Image, Placeholder, Row, Scaffold, Text.

#### Animation and motion

AlignTransition, AnimatedAlign, AnimatedBuilder, AnimatedContainer, AnimatedCrossFade, AnimatedDefaultTextStyle, AnimatedList, AnimatedListState, AnimatedModalBarrier, AnimatedOpacity, AnimatedPhysicalModel, AnimatedPositioned, AnimatedScale, AnimatedSize, AnimatedWidget, ImplicitlyAnimatedWidget, DecoratedBoxTransition, DefaultTextStyleTransition, FadeTransition, Hero, MatrixTransition, PositionedTransition, RelativePositionedTransition, RepeatingAnimationBuilder, RotationTransition, ScaleTransition, SizeTransition, SlideTransition, SliverFadeTransition.

#### Assets, images, and icons

AssetBundle, Icon, Image, RawImage.

#### Input

Autocomplete, Form, FormField, KeyboardListener.

#### Painting and effects

BackdropFilter, ClipOval, ClipPath, ClipRect, CustomPaint, DecoratedBox, FractionalTranslation, Opacity, RotatedBox, Transform.

#### Scrolling

CarouselView, CustomScrollView, DraggableScrollableSheet, GridView, ListView, NestedScrollView, NotificationListener, PageView, RefreshIndicator, ReorderableListView, ScrollConfiguration, Scrollable, Scrollbar, SingleChildScrollView.

#### Text

DefaultTextStyle, RichText, Text.

#### Styling

MediaQuery, Padding, Theme.

#### Accessibility

ExcludeSemantics, MergeSemantics, Semantics.

#### Async

FutureBuilder, StreamBuilder.

#### Cupertino

CupertinoActionSheet, CupertinoActionSheetAction, CupertinoActivityIndicator, CupertinoAdaptiveTextSelectionToolbar, CupertinoAlertDialog, CupertinoApp, CupertinoButton, CupertinoCheckBox, CupertinoColors, CupertinoContextMenu, CupertinoContextMenuAction, CupertinoDatePicker, CupertinoDesktopTextSelectionControls, CupertinoDesktopTextSelectionToolbar, CupertinoDesktopTextSelectionToolbarButton, CupertinoDialogAction, CupertinoDialogRoute, CupertinoDynamicColor, CupertinoFormRow, CupertinoFormSection, CupertinoFullscreenDialogTransition, CupertinoThemeData, CupertinoListSection, CupertinoListTile, CupertinoListTileChevron, CupertinoLocalizations, CupertinoMagnifier, CupertinoModalPopupRoute, CupertinoNavigationBar, CupertinoNavigationBarBackButton, CupertinoPage, CupertinoPageRoute, CupertinoPageScaffold, CupertinoPageTransition, CupertinoPicker, CupertinoPickerDefaultSelectionOverlay, CupertinoPopupSurface, CupertinoRadio, CupertinoScrollbar, CupertinoScrollBehavior, CupertinoSearchTextField, CupertinoSlider, CupertinoSlidingSegmentedControl, CupertinoSliverNavigationBar, CupertinoSliverRefreshControl, CupertinoSpellCheckSuggestionsToolbar, CupertinoSwitch, CupertinoTabBar, CupertinoTabController, CupertinoTabScaffold, CupertinoTabView, CupertinoTextField, CupertinoTextFormFieldRow, CupertinoTextMagnifier, CupertinoTextSelectionControls, CupertinoTextSelectionToolbar, CupertinoTextSelectionToolbarButton, CupertinoTextThemeData, CupertinoTheme, CupertinoThumbPainter, CupertinoTimerPicker.

#### Layout: Single-child layout widgets

Align, AspectRatio, Baseline, Center, ConstrainedBox, Container, CustomSingleChildLayout, Expanded, FittedBox, FractionallySizedBox, IntrinsicHeight, IntrinsicWidth, LimitedBox, Offstage, OverflowBox, Padding, SizedBox, SizedOverflowBox, Transform.

#### Layout: Multi-child layout widgets

CarouselView, Column, CustomMultiChildLayout, Flow, GridView, IndexedStack, LayoutBuilder, ListBody, ListView, OverflowBar, Row, Stack, Table, Wrap.

#### Layout / Scrolling: Sliver widgets

CupertinoSliverNavigationBar, CupertinoSliverRefreshControl, CustomScrollView, SliverAppBar, SliverChildBuilderDelegate, SliverChildListDelegate, SliverFillRemaining, SliverFixedExtentList, SliverGrid, SliverList, SliverPadding, SliverToBoxAdapter, SliverPersistentHeader.

#### Interaction models: Touch interactions

AbsorbPointer, Dismissible, DragTarget, Draggable, DraggableScrollableSheet, GestureDetector, IgnorePointer, InteractiveViewer, LongPressDraggable, Scrollable.

#### Interaction models: Routing

Hero, Navigator.

#### Material components (Material 3)

- Actions: Common buttons, FloatingActionButton, Extended FloatingActionButton, IconButton, SegmentedButton.
- Communication: Badge, LinearProgressIndicator, SnackBar.
- Containment: AlertDialog, Bottom sheet, Card, Divider, ListTile.
- Navigation: AppBar, Bottom app bar, NavigationBar, NavigationDrawer, Navigation rail, TabBar.
- Selection: Checkbox, Chip, DatePicker, Menu, Radio, Slider, Switch, TimePicker.
- Text inputs: TextField.

#### Material 2 components

- App structure and navigation: AppBar, BottomNavigationBar, Drawer, MaterialApp, Scaffold, SliverAppBar, TabBar, TabBarView, TabController, TabPageSelector, WidgetsApp.
- Buttons: DropdownButton, ElevatedButton, FloatingActionButton, Extended FloatingActionButton, IconButton, OutlinedButton, PopupMenuButton, TextButton.
- Input and selections: Checkbox, DatePicker, Radio, Slider, Switch, TextField.
- Dialogs, alerts, and panels: AlertDialog, ExpansionPanel, SimpleDialog, SnackBar.
- Information displays: Card, Chip, CircularProgressIndicator, DataTable, GridView, Icon, Image, LinearProgressIndicator, Tooltip.
- Layout: Divider, ListTile, Stepper.

### Widget of the Week

100+ short, 1-minute explainer videos to help you quickly get started with Flutter widgets.

## Notes

- Catalog quirk kept as in the data: the `Stack` entry has `categories: ['Stack']`, which is not one of the categories defined in `index.yml`, and `Text`, `Icon`, and `Image` appear in two categories.
- Catalog `link` values for Material widgets point at `pub.dev/documentation/material_ui/latest/material_ui/<Widget>-class.html`, while the widgets-layer widgets point at `api.flutter.dev/flutter/widgets/<Widget>-class.html`. The standalone `material_ui` / `cupertino_ui` packages are available to opt in to in Flutter 3.47; in-framework Material / Cupertino is not yet deprecated at 3.47.7.
- These are Flutter (Dart) widgets; same-named components in Jetpack Compose (android-compose-ui / android-compose-components), SwiftUI (apple-swiftui), WinUI (windows-winui-controls), Ark UI / Chakra UI (ark-ui / chakra-ui) and fandhe-frontend are different APIs.

## Related

- [Building user interfaces](./building-user-interfaces.md)
- [Declarative UI](./declarative-ui.md)
