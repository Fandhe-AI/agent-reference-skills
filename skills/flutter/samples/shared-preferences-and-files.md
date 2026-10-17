---
source: https://docs.flutter.dev/cookbook/persistence/key-value
---

# Key-Value Storage and File Persistence

Persist small values with `shared_preferences`, and persist data in a file with `path_provider` plus `dart:io`.

```console
flutter pub add shared_preferences path_provider material_ui
```

```dart
import 'package:material_ui/material_ui.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Shared preferences demo',
      home: MyHomePage(title: 'Shared preferences demo'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    _loadCounter();
  }

  /// Load the initial counter value from persistent storage on start,
  /// or fallback to 0 if it doesn't exist.
  Future<void> _loadCounter() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = prefs.getInt('counter') ?? 0;
    });
  }

  /// After a click, increment the counter state and
  /// asynchronously save it to persistent storage.
  Future<void> _incrementCounter() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = (prefs.getInt('counter') ?? 0) + 1;
      prefs.setInt('counter', _counter);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('You have pushed the button this many times: '),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

File-based persistence (from https://docs.flutter.dev/cookbook/persistence/reading-writing-files):

```dart
import 'dart:async';
import 'dart:io';

import 'package:path_provider/path_provider.dart';

class CounterStorage {
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();

    return directory.path;
  }

  Future<File> get _localFile async {
    final path = await _localPath;
    return File('$path/counter.txt');
  }

  Future<int> readCounter() async {
    try {
      final file = await _localFile;

      // Read the contents of the local file.
      final contents = await file.readAsString();

      return int.parse(contents);
    } catch (_) {
      // If an error was encountered, return 0.
      return 0;
    }
  }

  Future<File> writeCounter(int counter) async {
    final file = await _localFile;

    // Write the counter as a string to the file.
    return file.writeAsString('$counter');
  }
}
```

## Notes

- `shared_preferences` supports only `int`, `double`, `bool`, `String`, and `List<String>`; it is not designed for large data, and getters throw if the stored type differs.
- In tests, call `SharedPreferences.setMockInitialValues(<String, Object>{'counter': 2});` in `setUpAll()` to use the in-memory mock.
- The file recipe does not work with web apps at this time (flutter/flutter issue #45296). The documents directory is cleared only when the app is deleted; the temporary directory can be cleared by the system at any time.
- Added `flutter pub add material_ui`: the official recipe imports package:material_ui but never adds the dependency; alternatively import package:flutter/material.dart.
- Added `flutter pub add path_provider`: the official file recipe imports it but shows no install step.
- To compare storage options, see the choose-a-database reference page.
