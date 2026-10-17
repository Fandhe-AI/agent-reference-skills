---
source: https://docs.flutter.dev/ui/accessibility/web-accessibility
---

# Web accessibility

Flutter supports web accessibility by translating its internal Semantics tree into an accessible HTML DOM structure that screen readers can understand. Because Flutter renders its UI on a single canvas, it needs a special layer to expose the UI's meaning and structure to browsers.

## Signature / Usage

Turn on accessibility mode in code:

```dart
import 'package:flutter/semantics.dart';

void main() {
  runApp(const MyApp());
  if (kIsWeb) {
    SemanticsBinding.instance.ensureSemantics();
  }
}
```

Explicitly assign roles with the `Semantics` widget and the `SemanticsRole` enum:

```dart
import 'package:material_ui/material_ui.dart';
import 'package:flutter/semantics.dart';


class MyCustomListWidget extends StatelessWidget {
  const MyCustomListWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // This example shows how to explicitly assign list and listitem roles
    // when building a custom list structure.
    return Semantics(
      role: SemanticsRole.list,
      explicitChildNodes: true,
      child: Column(
        children: <Widget>[
          Semantics(
            role: SemanticsRole.listItem,
            child: const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Content of the first custom list item.'),
            ),
          ),
          Semantics(
            role: SemanticsRole.listItem,
            child: const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Content of the second custom list item.'),
            ),
          ),
        ],
      ),
    );
  }
}
```

### Opt-in web accessibility

For performance reasons, Flutter's web accessibility is not on by default. The user presses an invisible button with `aria-label="Enable accessibility"`; after that the DOM tree reflects all accessibility information for the widgets. Alternatively, enable it in code as shown above.

### Semantic roles

Semantic roles define the purpose of a UI element (for example a button, a link, a heading, a slider, or part of a table), helping screen readers and other assistive tools interpret and present your application. Flutter provides the `Semantics` widget with the `SemanticsRole` enum; when your Flutter web app is rendered, these roles are translated into corresponding ARIA roles in the page's HTML.

- Automatic semantics from standard widgets: many standard widgets, like `TabBar`, `MenuAnchor`, and `Table`, automatically include semantic information along with their roles. Prefer these whenever possible.
- Explicitly adding or overriding roles: for custom components, or when the default semantics aren't sufficient, use `Semantics` to define the role.

## Notes

- A custom component without a clearly defined role can be incomprehensible to a screen reader user.
- Assigning appropriate roles lets screen readers announce the type and purpose of elements, helps users navigate more effectively with assistive technologies, and helps adhere to web accessibility standards.
- Flutter web accessibility (Semantics tree to ARIA, Dart); distinct from authoring ARIA attributes by hand in React, Next.js, or Vercel-hosted web apps in the other skills.
- The `kIsWeb` check in the first snippet is as written on the source page.

## Related

- [Accessibility technologies](./assistive-technologies.md)
- [Accessibility testing](./accessibility-testing.md)
