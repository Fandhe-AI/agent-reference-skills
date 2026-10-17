---
source: https://docs.flutter.dev/cookbook/design/themes
---

# Theme and Custom Fonts

Share colors and text styles with `ThemeData`, override a theme for one subtree, and declare custom fonts in `pubspec.yaml`.

```dart
import 'package:flutter/material.dart';
// Include the Google Fonts package to provide more text format options
// https://pub.dev/packages/google_fonts
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appName = 'Custom Themes';

    return MaterialApp(
      title: appName,
      theme: ThemeData(
        // Define the default brightness and colors.
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.purple,
          brightness: Brightness.dark,
        ),

        // Define the default `TextTheme`. Use this to specify the default
        // text styling for headlines, titles, bodies of text, and more.
        textTheme: TextTheme(
          displayLarge: const TextStyle(
            fontSize: 72,
            fontWeight: FontWeight.bold,
          ),
          titleLarge: GoogleFonts.oswald(
            fontSize: 30,
            fontStyle: FontStyle.italic,
          ),
          bodyMedium: GoogleFonts.merriweather(),
          displaySmall: GoogleFonts.pacifico(),
        ),
      ),
      home: const MyHomePage(title: appName),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  const MyHomePage({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          title,
          style: Theme.of(context).textTheme.titleLarge!
              .copyWith(color: Theme.of(context).colorScheme.onSecondary),
        ),
        backgroundColor: Theme.of(context).colorScheme.secondary,
      ),
      body: Center(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
          color: Theme.of(context).colorScheme.primary,
          child: Text(
            'Text with a background color',
            style: Theme.of(context).textTheme.bodyMedium!
                .copyWith(color: Theme.of(context).colorScheme.onPrimary),
          ),
        ),
      ),
      floatingActionButton: Theme(
        data: Theme.of(context).copyWith(
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.pink,
            brightness: Brightness.dark,
          ),
        ),
        child: FloatingActionButton(
          onPressed: () {},
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
```

Custom fonts from files (from https://docs.flutter.dev/cookbook/design/fonts). Declare them in `pubspec.yaml`:

```yaml
flutter:
  fonts:
    - family: Raleway
      fonts:
        - asset: fonts/Raleway-Regular.ttf
        - asset: fonts/Raleway-Italic.ttf
          style: italic
    - family: RobotoMono
      fonts:
        - asset: fonts/RobotoMono-Regular.ttf
        - asset: fonts/RobotoMono-Bold.ttf
          weight: 700
  uses-material-design: true
```

Then set the default font and a per-widget font:

```dart
MaterialApp(
  title: 'Custom Fonts',
  // Set Raleway as the default app font.
  theme: ThemeData(fontFamily: 'Raleway'),
  home: const MyHomePage(title: 'Custom Fonts'),
);

Text(
  'Roboto Mono sample',
  style: TextStyle(fontFamily: 'RobotoMono'),
),
```

## Notes

- Styling precedence: styles on the specific widget, then a nearer `Theme` override, then the app theme; `Theme.of(context)` returns the nearest `Theme`.
- Extend rather than replace a parent theme with `Theme.of(context).copyWith(...)`.
- Supported font formats are `.ttc`, `.ttf`, `.otf`; `.woff` / `.woff2` are not supported on desktop platforms.
- Flutter does not infer weight or style from file names; declare `weight` / `style` in `pubspec.yaml`, otherwise the engine only simulates them. `google_fonts` is a pub.dev package that requires `flutter pub add google_fonts`.
- Flutter `ThemeData` / `MaterialApp` (`package:flutter/material.dart`, Dart) is distinct from Compose Material3 `MaterialTheme` and SwiftUI / UIKit theming. `package:material_ui/material_ui.dart` is the standalone opt-in package in Flutter 3.47.
- Passed title: to MyHomePage in the fonts snippet; the official fonts recipe uses a different MyHomePage without a title parameter.
- Migration (Flutter 3.44): see the decouple-page-transition-builders breaking change for `ThemeData` page transitions.
