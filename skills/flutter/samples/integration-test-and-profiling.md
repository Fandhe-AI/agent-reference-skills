---
source: https://docs.flutter.dev/cookbook/testing/integration/profiling
---

# Integration Test and Performance Profiling

Record a performance timeline during an `integration_test` scroll test and write a summary with `flutter drive --profile`.

```console
flutter pub add "dev:integration_test:{sdk: flutter}" "dev:flutter_driver:{sdk: flutter}"
flutter pub add material_ui
```

`integration_test/scrolling_test.dart`:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:material_ui/material_ui.dart';
import 'package:your_package/main.dart';

void main() {
  final binding = IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Counter increments smoke test', (tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      MyApp(items: List<String>.generate(10000, (i) => 'Item $i')),
    );

    final listFinder = find.byType(Scrollable);
    final itemFinder = find.byKey(const ValueKey('item_50_text'));

    await binding.traceAction(() async {
      // Scroll until the item to be found appears.
      await tester.scrollUntilVisible(
        itemFinder,
        500.0,
        scrollable: listFinder,
      );
    }, reportKey: 'scrolling_timeline');
  });
}
```

`test_driver/perf_driver.dart`:

```dart
import 'package:flutter_driver/flutter_driver.dart' as driver;
import 'package:integration_test/integration_test_driver.dart';

Future<void> main() {
  return integrationDriver(
    responseDataCallback: (data) async {
      if (data != null) {
        final timeline = driver.Timeline.fromJson(
          data['scrolling_timeline'] as Map<String, dynamic>,
        );

        // Convert the Timeline into a TimelineSummary that's easier to
        // read and understand.
        final summary = driver.TimelineSummary.summarize(timeline);

        // Then, write the entire timeline to disk in a json format.
        // This file can be opened in the Chrome browser's tracing tools
        // found by navigating to chrome://tracing.
        // Optionally, save the summary to disk by setting includeSummary
        // to true
        await summary.writeTimelineToFile(
          'scrolling_timeline',
          pretty: true,
          includeSummary: true,
        );
      }
    },
  );
}
```

Run in profile mode:

```console
flutter drive \
  --driver=test_driver/perf_driver.dart \
  --target=integration_test/scrolling_test.dart \
  --profile
```

## Notes

- `your_package` stands for your app's package name (the source rewrites `your_integration_test` to it); `MyApp(items: ...)` is the list app from the widget-test scrolling recipe.
- Added `flutter pub add material_ui`: the official recipe imports package:material_ui but never adds the dependency; alternatively import package:flutter/material.dart.
- Added the dev-dependency step: the profiling recipe assumes the integration-test setup and does not list it.
- Add `--no-dds` when running on a mobile device or emulator, because the Dart Development Service is not reachable from the computer.
- Results land in `build/`: `scrolling_timeline.timeline_summary.json` and `scrolling_timeline.timeline.json` (open the latter at `chrome://tracing`).
- The source names the summary `scrolling_summary.timeline_summary.json`, but with `writeTimelineToFile('scrolling_timeline', ...)` the file is `scrolling_timeline.timeline_summary.json`.
- Recording performance timelines is not supported on web.
- `integration_test` cannot interact with native platform UI; the source names the third-party `patrol` package for that.
- This is Flutter `integration_test` / `flutter drive` (Dart), distinct from Playwright end-to-end tests, Vitest, and Android instrumented testing.
