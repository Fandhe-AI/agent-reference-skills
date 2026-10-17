---
source: https://docs.flutter.dev/cookbook/networking/fetch-data
---

# Fetch and Parse JSON

Fetch JSON with the `http` package, convert it to a Dart object, show it with `FutureBuilder`, and parse large payloads in a background isolate with `compute`.

```console
$ flutter pub add http material_ui
```

```dart
import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:material_ui/material_ui.dart';

Future<Album> fetchAlbum() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
    headers: {'Accept': 'application/json'},
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}

class Album {
  final int userId;
  final int id;
  final String title;

  const Album({required this.userId, required this.id, required this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'userId': int userId, 'id': int id, 'title': String title} => Album(
        userId: userId,
        id: id,
        title: title,
      ),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late Future<Album> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fetch Data Example',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('Fetch Data Example')),
        body: Center(
          child: FutureBuilder<Album>(
            future: futureAlbum,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data!.title);
              } else if (snapshot.hasError) {
                return Text('${snapshot.error}');
              }

              // By default, show a loading spinner.
              return const CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}
```

Background parsing (from https://docs.flutter.dev/cookbook/networking/background-parsing):

```dart
Future<List<Photo>> fetchPhotos(http.Client client) async {
  final response = await client.get(
    Uri.parse('https://jsonplaceholder.typicode.com/photos'),
  );

  // Use the compute function to run parsePhotos in a separate isolate.
  return compute(parsePhotos, response.body);
}

// A function that converts a response body into a List<Photo>.
List<Photo> parsePhotos(String responseBody) {
  final parsed = (jsonDecode(responseBody) as List<Object?>)
      .cast<Map<String, Object?>>();

  return parsed.map<Photo>(Photo.fromJson).toList();
}
```

## Notes

- This source imports `package:material_ui/material_ui.dart`, the standalone Material package that Flutter 3.47 lets you opt in to; other recipes import `package:flutter/material.dart` (in-framework Material).
- Added `flutter pub add material_ui`: the official recipe imports package:material_ui but never adds the dependency; alternatively import package:flutter/material.dart.
- Android requires `<uses-permission android:name="android.permission.INTERNET" />` in `AndroidManifest.xml`; macOS requires the `com.apple.security.network.client` entitlement (`<true/>`) in `DebugProfile.entitlements` and `Release.entitlements`.
- Call `fetchAlbum()` in `initState()` or `didChangeDependencies()`, never inside `build()`, which runs repeatedly.
- Throw an exception on non-200 responses instead of returning `null`; otherwise `snapshot.hasData` never becomes true.
- `compute()` messages must be simple (primitives, `List<Photo>`); passing a `Future` or `http.Response` between isolates can fail.
