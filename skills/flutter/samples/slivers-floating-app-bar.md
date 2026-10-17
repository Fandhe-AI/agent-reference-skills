---
source: https://docs.flutter.dev/cookbook/lists/floating-app-bar
---

# Slivers with a Floating App Bar

Put a `SliverAppBar` and a `SliverList` inside a `CustomScrollView` so the app bar shrinks as the list scrolls.

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Floating App Bar';

    return MaterialApp(
      title: title,
      home: Scaffold(
        // No app bar provided to Scaffold, only a body with a
        // CustomScrollView.
        body: CustomScrollView(
          slivers: [
            // Add the app bar to the CustomScrollView.
            const SliverAppBar(
              // Provide a standard title.
              title: Text(title),
              // Pin the app bar when scrolling
              pinned: true,
              // Display a placeholder widget to visualize the shrinking size.
              flexibleSpace: Placeholder(),
              // Make the initial height of the SliverAppBar larger than normal.
              expandedHeight: 200,
            ),
            // Next, create a SliverList
            SliverList.builder(
              // The builder function returns a ListTile with a title that
              // displays the index of the current item.
              itemBuilder: (context, index) =>
                  ListTile(title: Text('Item #$index')),
              // Builds 50 ListTiles
              itemCount: 50,
            ),
          ],
        ),
      ),
    );
  }
}
```

## Notes

- `ListView` and `GridView` are built on `SliverList` and `SliverGrid`; `CustomScrollView` lets you mix slivers.
- The source also provides a Cupertino variant using `CupertinoApp`, `CupertinoPageScaffold`, and `CupertinoSliverNavigationBar(largeTitle: ...)` with `CupertinoListTile`.
- Migration (Flutter 3.44): `cacheExtent` / `cacheExtentStyle` are deprecated; see the scroll-cache-extent breaking change in the reference.
