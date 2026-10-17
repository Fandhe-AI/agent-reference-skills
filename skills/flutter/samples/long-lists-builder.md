---
source: https://docs.flutter.dev/cookbook/lists/long-lists
---

# Long Lists with ListView.builder

Render a large list lazily; items are created only as they scroll onto the screen.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MyApp(
      items: List<String>.generate(10000, (i) => 'Item $i'),
    ),
  );
}

class MyApp extends StatelessWidget {
  final List<String> items;

  const MyApp({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    const title = 'Long List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: ListView.builder(
          itemCount: items.length,
          prototypeItem: ListTile(title: Text(items.first)),
          itemBuilder: (context, index) {
            return ListTile(title: Text(items[index]));
          },
        ),
      ),
    );
  }
}
```

## Notes

- Specify item extent with `prototypeItem`, `itemExtent`, or `itemExtentBuilder`; it is more efficient than letting each child determine its own extent.
- Use `prototypeItem` or `itemExtent` for fixed-size items, `itemExtentBuilder` for items of different sizes.
- Migration (Flutter 3.44): `cacheExtent` / `cacheExtentStyle` on scrollables are deprecated; see the scroll-cache-extent breaking change in the reference.
