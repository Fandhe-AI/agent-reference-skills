---
source: https://docs.flutter.dev/cookbook/testing/unit/mocking
---

# Mocking with Mockito

Inject an `http.Client`, generate a mock with `mockito`, and unit test success and failure paths.

```console
$ flutter pub add http dev:mockito dev:build_runner
```

Code under test (`lib/main.dart`, excerpt):

```dart
Future<Album> fetchAlbum(http.Client client) async {
  final response = await client.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
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
```

`test/fetch_album_test.dart`:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mocking/main.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'fetch_album_test.mocks.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
// Note: Naming the generated mock `MockHttpClient` to avoid confusion with
// `MockClient` from `package:http/testing.dart`.
@GenerateMocks([], customMocks: [MockSpec<http.Client>(as: #MockHttpClient)])
void main() {
  group('fetchAlbum', () {
    test('returns an Album if the http call completes successfully', () async {
      final client = MockHttpClient();

      // Use Mockito to return a successful response when it calls the
      // provided http.Client.
      when(
        client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')),
      ).thenAnswer(
        (_) async =>
            http.Response('{"userId": 1, "id": 2, "title": "mock"}', 200),
      );

      expect(await fetchAlbum(client), isA<Album>());
    });

    test('throws an exception if the http call completes with an error', () {
      final client = MockHttpClient();

      // Use Mockito to return an unsuccessful response when it calls the
      // provided http.Client.
      when(
        client.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')),
      ).thenAnswer((_) async => http.Response('Not Found', 404));

      expect(fetchAlbum(client), throwsException);
    });
  });
}
```

Generate the mocks, then run the tests:

```console
$ dart run build_runner build
$ flutter test test/fetch_album_test.dart
```

## Notes

- Pass an `http.Client` into the function instead of calling the static `http.get()`, which is hard to mock; the app passes `http.Client()`.
- The generated mock is written to `fetch_album_test.mocks.dart`; `mocking` in `package:mocking/main.dart` is the example project's package name.
- Mocking removes slow, flaky live-service calls and lets you test both success and failure scenarios.
- Flutter `flutter_test` / `mockito` unit testing (Dart), not Vitest mocks, Playwright, or Android testing APIs.
