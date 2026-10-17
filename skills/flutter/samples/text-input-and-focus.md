---
source: https://docs.flutter.dev/cookbook/forms/focus
---

# Text Input and Focus

Move focus to a text field programmatically with a `FocusNode`, and read a field's value with a `TextEditingController`.

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Text Field Focus', home: MyCustomForm());
  }
}

// Define a custom Form widget.
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds data related to the form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Define the focus node. To manage the lifecycle, create the FocusNode in
  // the initState method, and clean it up in the dispose method.
  late final FocusNode myFocusNode;

  @override
  void initState() {
    super.initState();

    myFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    myFocusNode.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Text Field Focus')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // The first text field is focused on as soon as the app starts.
            const TextField(autofocus: true),
            // The second text field is focused on when a user taps the
            // FloatingActionButton.
            TextField(focusNode: myFocusNode),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // When the button is pressed,
        // give focus to the text field using myFocusNode.
        onPressed: () => myFocusNode.requestFocus(),
        tooltip: 'Focus Second Text Field',
        child: const Icon(Icons.edit),
      ),
    );
  }
}
```

Read the entered text with a controller (from the "Retrieve the value of a text field" recipe, https://docs.flutter.dev/cookbook/forms/retrieve-input):

```dart
final myController = TextEditingController();

@override
void dispose() {
  // Clean up the controller when the widget is disposed.
  myController.dispose();
  super.dispose();
}

// In build:
TextField(controller: myController);
// Read the value:
Text(myController.text);
```

## Notes

- Use `autofocus: true` to focus a field as soon as it is visible; use `FocusNode.requestFocus()` to focus later (for example after an API call or validation error).
- `FocusNode` and `TextEditingController` are long-lived; create them in `State` and call `dispose()`.
