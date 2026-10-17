---
source: https://docs.flutter.dev/cookbook/lists/grid-lists
---

# List and Grid

Show a short list with `ListView` and `ListTile`, and a grid with `GridView.count`.

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Basic List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: ListView(
          children: const <Widget>[
            ListTile(leading: Icon(Icons.map), title: Text('Map')),
            ListTile(leading: Icon(Icons.photo_album), title: Text('Album')),
            ListTile(leading: Icon(Icons.phone), title: Text('Phone')),
          ],
        ),
      ),
    );
  }
}
```

Replace the `body` with a grid:

```dart
GridView.count(
  // Create a grid with 2 columns.
  // If you change the scrollDirection to horizontal,
  // this produces 2 rows.
  crossAxisCount: 2,
  // Generate 100 widgets that display their index in the list.
  children: List.generate(100, (index) {
    return Center(
      child: Text(
        'Item $index',
        style: TextTheme.of(context).headlineSmall,
      ),
    );
  }),
),
```

## Notes

- Sources: cookbook "Use lists" (https://docs.flutter.dev/cookbook/lists/basic-list) and "Create a grid list".
- The default `ListView` constructor builds every child at once; use `ListView.builder` for long lists (see long-lists-builder).
- Flutter `ListView` (Dart) is distinct from Compose `LazyColumn` / SwiftUI `List` / WinUI `ListView`.
