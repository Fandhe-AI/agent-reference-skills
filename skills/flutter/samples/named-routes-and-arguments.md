---
source: https://docs.flutter.dev/cookbook/navigation/navigate-with-arguments
---

# Named Routes and Arguments

Declare a `routes` table with `initialRoute`, push by name with `Navigator.pushNamed`, and pass arguments read through `ModalRoute.of` or `onGenerateRoute`.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      title: 'Named Routes Demo',
      // Start the app with the "/" named route. In this case, the app starts
      // on the FirstScreen widget.
      initialRoute: '/',
      routes: {
        // When navigating to the "/" route, build the FirstScreen widget.
        '/': (context) => const FirstScreen(),
        // When navigating to the "/second" route, build the SecondScreen widget.
        '/second': (context) => const SecondScreen(),
      },
    ),
  );
}

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Screen')),
      body: Center(
        child: ElevatedButton(
          // Within the `FirstScreen` widget
          onPressed: () {
            // Navigate to the second screen using a named route.
            Navigator.pushNamed(context, '/second');
          },
          child: const Text('Launch screen'),
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Screen')),
      body: Center(
        child: ElevatedButton(
          // Within the SecondScreen widget
          onPressed: () {
            // Navigate back to the first screen by popping the current route
            // off the stack.
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

Passing arguments (from https://docs.flutter.dev/cookbook/navigation/navigate-with-arguments):

```dart
// You can pass any object to the arguments parameter.
// In this example, create a class that contains both
// a customizable title and message.
class ScreenArguments {
  final String title;
  final String message;

  ScreenArguments(this.title, this.message);
}

// A Widget that extracts the necessary arguments from
// the ModalRoute.
class ExtractArgumentsScreen extends StatelessWidget {
  const ExtractArgumentsScreen({super.key});

  static const routeName = '/extractArguments';

  @override
  Widget build(BuildContext context) {
    // Extract the arguments from the current ModalRoute
    // settings and cast them as ScreenArguments.
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;

    return Scaffold(
      appBar: AppBar(title: Text(args.title)),
      body: Center(child: Text(args.message)),
    );
  }
}

// Register the route:
MaterialApp(
  routes: {
    ExtractArgumentsScreen.routeName: (context) =>
        const ExtractArgumentsScreen(),
  },
)

// Navigate with arguments:
Navigator.pushNamed(
  context,
  ExtractArgumentsScreen.routeName,
  arguments: ScreenArguments(
    'Extract Arguments Screen',
    'This message is extracted in the build method.',
  ),
);
```

## Notes

- The source states that named routes are no longer recommended for most applications; see the Limitations section of the navigation overview (https://docs.flutter.dev/ui/navigation#limitations).
- The arguments example requires registering ExtractArgumentsScreen.routeName in MaterialApp.routes (or handling it in onGenerateRoute).
- When using `initialRoute`, do not define a `home` property.
- Arguments can alternatively be extracted in `onGenerateRoute: (settings) { ... settings.arguments as ScreenArguments ... }` and passed to the screen through its constructor.
- Flutter `Navigator` named routes (Dart) are distinct from React Router / TanStack Router route definitions and Jetpack Navigation graphs.
