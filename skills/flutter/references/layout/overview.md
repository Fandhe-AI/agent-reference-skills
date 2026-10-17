---
source: https://docs.flutter.dev/ui/layout
---

# Layouts in Flutter

Layouts in Flutter are built by composing widgets. Even layout models (rows, columns, grids) are widgets, and you compose simple widgets into complex ones.

## Signature / Usage

Lay out a single widget: pick a layout widget, create a visible widget, add the visible widget as `child` (single child) or `children` (list), then return the layout widget from `build()`.

```dart
const Center(
  child: Text('Hello World'),
),
```

Material app (a `Scaffold` provides a default banner, background color, and slots for drawers, snack bars, and bottom sheets):

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const String appTitle = 'Flutter layout demo';
    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(appTitle)),
        body: const Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

Standard (non-Material) app:

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(color: Colors.white),
      child: const Center(
        child: Text(
          'Hello World',
          textDirection: TextDirection.ltr,
          style: TextStyle(fontSize: 32, color: Colors.black87),
        ),
      ),
    );
  }
}
```

Cupertino app (`CupertinoApp` + `CupertinoPageScaffold`; no default banner or background color):

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'Flutter layout demo',
      theme: CupertinoThemeData(
        brightness: Brightness.light,
        primaryColor: CupertinoColors.systemBlue,
      ),
      home: CupertinoPageScaffold(
        navigationBar: CupertinoNavigationBar(
          backgroundColor: CupertinoColors.systemGrey,
          middle: Text('Flutter layout demo'),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [Text('Hello World')],
          ),
        ),
      ),
    );
  }
}
```

### Lay out multiple widgets vertically and horizontally

Use `Row` for horizontal and `Column` for vertical arrangement. Each takes a list of children, which can themselves be rows or columns. Control alignment with `mainAxisAlignment` and `crossAxisAlignment` (for a row the main axis is horizontal; for a column it is vertical).

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Image.asset('images/pic1.jpg'),
    Image.asset('images/pic2.jpg'),
    Image.asset('images/pic3.jpg'),
  ],
);
```

Size children with `Expanded` (flex factor defaults to 1):

```dart
Row(
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Expanded(child: Image.asset('images/pic1.jpg')),
    Expanded(flex: 2, child: Image.asset('images/pic2.jpg')),
    Expanded(child: Image.asset('images/pic3.jpg')),
  ],
);
```

Pack children with `mainAxisSize: MainAxisSize.min`:

```dart
Row(
  mainAxisSize: MainAxisSize.min,
  children: [
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    const Icon(Icons.star, color: Colors.black),
    const Icon(Icons.star, color: Colors.black),
  ],
)
```

Nested rows and columns (ratings row from the Pavlova example):

```dart
final stars = Row(
  mainAxisSize: MainAxisSize.min,
  children: [
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    Icon(Icons.star, color: Colors.green[500]),
    const Icon(Icons.star, color: Colors.black),
    const Icon(Icons.star, color: Colors.black),
  ],
);

final ratings = Container(
  padding: const EdgeInsets.all(20),
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      stars,
      const Text(
        '170 Reviews',
        style: TextStyle(
          color: Colors.black,
          fontWeight: FontWeight.w800,
          fontFamily: 'Roboto',
          letterSpacing: 0.5,
          fontSize: 20,
        ),
      ),
    ],
  ),
);
```

`DefaultTextStyle.merge()` creates a default text style inherited by the child and all descendants:

```dart
const descTextStyle = TextStyle(
  color: Colors.black,
  fontWeight: FontWeight.w800,
  fontFamily: 'Roboto',
  letterSpacing: 0.5,
  fontSize: 18,
  height: 2,
);

final iconList = DefaultTextStyle.merge(
  style: descTextStyle,
  child: Container(
    padding: const EdgeInsets.all(20),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Column(
          children: [
            Icon(Icons.kitchen, color: Colors.green[500]),
            const Text('PREP:'),
            const Text('25 min'),
          ],
        ),
        Column(
          children: [
            Icon(Icons.timer, color: Colors.green[500]),
            const Text('COOK:'),
            const Text('1 hr'),
          ],
        ),
        Column(
          children: [
            Icon(Icons.restaurant, color: Colors.green[500]),
            const Text('FEEDS:'),
            const Text('4-6'),
          ],
        ),
      ],
    ),
  ),
);
```

```dart
final leftColumn = Container(
  padding: const EdgeInsets.fromLTRB(20, 30, 20, 20),
  child: Column(children: [titleText, subTitle, ratings, iconList]),
);
```

```dart
body: Center(
  child: Container(
    margin: const EdgeInsets.fromLTRB(0, 40, 0, 30),
    height: 600,
    child: Card(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 440, child: leftColumn),
          mainImage,
        ],
      ),
    ),
  ),
),
```

### Common layout widgets

| Group | Widget | Purpose |
|-------|--------|---------|
| Standard | `Container` | Adds padding, margins, borders, background color, or other decorations to a widget |
| Standard | `GridView` | Lays widgets out as a scrollable grid |
| Standard | `ListView` | Lays widgets out as a scrollable list |
| Standard | `Stack` | Overlaps a widget on top of another |
| Material | `Scaffold` | Structured layout framework with slots for common Material Design app elements |
| Material | `AppBar` | Horizontal bar typically displayed at the top of a screen |
| Material | `Card` | Organizes related info into a box with rounded corners and a drop shadow |
| Material | `ListTile` | Up to 3 lines of text and optional leading and trailing icons in a row |
| Cupertino | `CupertinoPageScaffold` | Basic layout structure for an iOS-style page |
| Cupertino | `CupertinoNavigationBar` | iOS-style navigation bar at the top of the screen |
| Cupertino | `CupertinoSegmentedControl` | Segmented control for selecting |
| Cupertino | `CupertinoTabBar` and `CupertinoTabScaffold` | Characteristic iOS bottom tab bar |

Container (adds a rounded border and margins to each image):

```dart
Widget _buildDecoratedImage(int imageIndex) => Expanded(
  child: Container(
    decoration: BoxDecoration(
      border: Border.all(width: 10, color: Colors.black38),
      borderRadius: const BorderRadius.all(Radius.circular(8)),
    ),
    margin: const EdgeInsets.all(4),
    child: Image.asset('images/pic$imageIndex.jpg'),
  ),
);

Widget _buildImageRow(int imageIndex) => Row(
  children: [
    _buildDecoratedImage(imageIndex),
    _buildDecoratedImage(imageIndex + 1),
  ],
);
```

GridView (`GridView.count` sets the number of columns; `GridView.extent` sets the maximum tile width in pixels):

```dart
Widget _buildGrid() => GridView.extent(
  maxCrossAxisExtent: 150,
  padding: const EdgeInsets.all(4),
  mainAxisSpacing: 4,
  crossAxisSpacing: 4,
  children: _buildGridTileList(30),
);

// The images are saved with names pic0.jpg, pic1.jpg...pic29.jpg.
// The List.generate() constructor allows an easy way to create
// a list when objects have a predictable naming pattern.
List<Widget> _buildGridTileList(int count) =>
    List.generate(count, (i) => Image.asset('images/pic$i.jpg'));
```

ListView:

```dart
Widget _buildList() {
  return ListView(
    children: [
      _tile('CineArts at the Empire', '85 W Portal Ave', Icons.theaters),
      _tile('The Castro Theater', '429 Castro St', Icons.theaters),
      const Divider(),
      _tile('K\'s Kitchen', '757 Monterey Blvd', Icons.restaurant),
      _tile('La Ciccia', '291 30th St', Icons.restaurant),
    ],
  );
}

ListTile _tile(String title, String subtitle, IconData icon) {
  return ListTile(
    title: Text(
      title,
      style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 20),
    ),
    subtitle: Text(subtitle),
    leading: Icon(icon, color: Colors.blue[500]),
  );
}
```

Stack (the first child is the base widget; later children overlay it; content can't scroll):

```dart
Widget _buildStack() {
  return Stack(
    alignment: const Alignment(0.6, 0.6),
    children: [
      const CircleAvatar(
        backgroundImage: AssetImage('images/pic.jpg'),
        radius: 100,
      ),
      Container(
        decoration: const BoxDecoration(color: Colors.black45),
        child: const Text(
          'Mia B',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    ],
  );
}
```

Card (shrinks to 0 by 0 pixels by default; constrain with `SizedBox`):

```dart
Widget _buildCard() {
  return SizedBox(
    height: 210,
    child: Card(
      child: Column(
        children: [
          ListTile(
            title: const Text(
              '1625 Main Street',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: const Text('My City, CA 99984'),
            leading: Icon(Icons.restaurant_menu, color: Colors.blue[500]),
          ),
          const Divider(),
          ListTile(
            title: const Text('costa@example.com'),
            leading: Icon(Icons.contact_mail, color: Colors.blue[500]),
          ),
        ],
      ),
    ),
  );
}
```

## Notes

- Flutter widget layout (Dart, `package:flutter/widgets.dart`) is distinct from Jetpack Compose (android-compose-ui, android-compose-components), SwiftUI (apple-swiftui), WinUI (windows-winui-controls), Ark UI, Chakra UI, and fandhe-frontend, even where names such as `Row`, `Column`, `Stack`, `Text`, `Image`, and `ListView` coincide.
- `Row` and `Column` are low-level primitives; higher-level alternatives are `ListTile` (instead of `Row`) and `ListView` (instead of `Column`, scrolls automatically when content is too long).
- When a layout is too large for the device, a yellow and black striped pattern appears along the affected edge; wrap children in `Expanded` to fit.
- When displaying a two-dimensional list where the row and column a cell occupies matters, use `Table` or `DataTable` rather than `GridView`.
- To minimize visual confusion in heavily nested layout code, implement pieces of the UI in variables and functions.
- A general (non-Material) app has no `AppBar`, title, or background color by default; the Cupertino app type also provides no default banner or background color.
- The Material library and the Cupertino library can be mixed with the standard widgets library.
- Images added to the project must be declared in `pubspec.yaml` (`Image.asset`); `Image.network` needs no asset declaration.
- Screenshots in the original page use `debugPaintSizeEnabled = true` to show visual layout. The widgets library, Material (`Scaffold`, `AppBar`, `Card`, `ListTile`), and Cupertino widgets listed here are referenced on the original page through api.flutter.dev, material_ui, and cupertino_ui.
- Flutter 3.47 allows opting in to the standalone material_ui / cupertino_ui packages; in-framework Material and Cupertino are not yet deprecated in 3.47.7 (see the release category).

## Related

- [Understanding constraints](./constraints.md)
- [Scrolling](./scrolling.md)
- [Adaptive and responsive design](./adaptive-responsive.md)
- Row
- Column
- Stack
- Container
- ListView
