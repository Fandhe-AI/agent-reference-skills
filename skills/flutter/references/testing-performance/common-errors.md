---
source: https://docs.flutter.dev/testing/common-errors
---

# Common Flutter errors

How to recognize and resolve common Flutter framework errors, including layout errors.

## Signature / Usage

```dart
Widget build(BuildContext context) {
  return Row(
    children: [
      const Icon(Icons.message),
      Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Title', style: Theme.of(context).textTheme.headlineMedium),
          const Text(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed '
            'do eiusmod tempor incididunt ut labore et dolore magna '
            'aliqua. Ut enim ad minim veniam, quis nostrud '
            'exercitation ullamco laboris nisi ut aliquip ex ea '
            'commodo consequat.',
          ),
        ],
      ),
    ],
  );
}
```

This snippet is the problem case for "A RenderFlex overflowed" (see below).

## A solid red or grey screen when running your app

Typically called a "red (or grey) screen of death", this is sometimes how Flutter lets you know that there's an error. The red screen can appear when the app runs in debug or profile mode. The grey screen can appear when the app runs in release mode. Generally, these errors occur when there's an uncaught exception (and you might need another try-catch block), or when there is some rendering error, such as an overflow error.

## 'A RenderFlex overflowed...'

RenderFlex overflow is one of the most frequently encountered Flutter framework errors. When it happens, yellow and black stripes appear, indicating the area of overflow in the app UI. In addition, an error message displays in the debug console:

```plaintext
The following assertion was thrown during layout:
A RenderFlex overflowed by 1146 pixels on the right.

The relevant error-causing widget was

    Row      lib/errors/renderflex_overflow_column.dart:23

The overflowing RenderFlex has an orientation of Axis.horizontal.
The edge of the RenderFlex that is overflowing has been marked in the rendering
with a yellow and black striped pattern. This is usually caused by the contents
being too big for the RenderFlex.
(Additional lines of this message omitted)
```

The error often occurs when a `Column` or `Row` has a child widget that isn't constrained in its size. In the snippet above, the `Column` tries to be wider than the space the `Row` (its parent) can allocate to it. The `Row` widget doesn't constrain the size of its children, nor does the `Column` widget. Lacking constraints from its parent widget, the second `Text` widget tries to be as wide as all the characters it needs to display. The self-determined width of the `Text` widget then gets adopted by the `Column`, which clashes with the maximum amount of horizontal space its parent, the `Row` widget, can provide.

How to fix it: constrain the `Column` width, for example by wrapping it in an `Expanded` widget:

```dart
return const Row(
  children: [
    Icon(Icons.message),
    Expanded(
      child: Column(
        // code omitted
      ),
    ),
  ],
);
```

Another way is to wrap the `Column` in a `Flexible` widget and specify a `flex` factor. The `Expanded` widget is equivalent to the `Flexible` widget with a `flex` factor of 1.0.

## 'RenderBox was not laid out'

While this error is pretty common, it's often a side effect of a primary error occurring earlier in the rendering pipeline.

```plaintext
RenderBox was not laid out:
RenderViewport#5a477 NEEDS-LAYOUT NEEDS-PAINT NEEDS-COMPOSITING-BITS-UPDATE
```

Usually, the issue is related to violation of box constraints, and it needs to be solved by providing more information to Flutter about how you'd like to constrain the widgets in question. It is often caused by one of two other errors:

- 'Vertical viewport was given unbounded height'
- 'An InputDecorator...cannot have an unbounded width'

## 'Vertical viewport was given unbounded height'

```plaintext
The following assertion was thrown during performResize():
Vertical viewport was given unbounded height.

Viewports expand in the scrolling direction to fill their container.
In this case, a vertical viewport was given an unlimited amount of
vertical space in which to expand. This situation typically happens when a
scrollable widget is nested inside another scrollable widget.
(Additional lines of this message omitted)
```

The error is often caused when a `ListView` (or other kinds of scrollable widgets such as `GridView`) is placed inside a `Column`. A `ListView` takes all the vertical space available to it, unless it's constrained by its parent widget. However, a `Column` doesn't impose any constraint on its children's height by default.

Problem:

```dart
Widget build(BuildContext context) {
  return Center(
    child: Column(
      children: <Widget>[
        const Text('Header'),
        ListView(
          children: const <Widget>[
            ListTile(leading: Icon(Icons.map), title: Text('Map')),
            ListTile(leading: Icon(Icons.subway), title: Text('Subway')),
          ],
        ),
      ],
    ),
  );
}
```

To fix this error, specify how tall the `ListView` should be. To make it as tall as the remaining space in the `Column`, wrap it using an `Expanded` widget. Otherwise, specify an absolute height using a `SizedBox` widget or a relative height using a `Flexible` widget.

```dart
Widget build(BuildContext context) {
  return Center(
    child: Column(
      children: <Widget>[
        const Text('Header'),
        Expanded(
          child: ListView(
            children: const <Widget>[
              ListTile(leading: Icon(Icons.map), title: Text('Map')),
              ListTile(leading: Icon(Icons.subway), title: Text('Subway')),
            ],
          ),
        ),
      ],
    ),
  );
}
```

## 'An InputDecorator...cannot have an unbounded width'

```plaintext
The following assertion was thrown during performLayout():
An InputDecorator, which is typically created by a TextField, cannot have an
unbounded width.
This happens when the parent widget does not provide a finite width constraint.
For example, if the InputDecorator is contained by a `Row`, then its width must
be constrained. An `Expanded` widget or a SizedBox can be used to constrain the
width of the InputDecorator or the TextField that contains it.
(Additional lines of this message omitted)
```

This error occurs, for example, when a `Row` contains a `TextFormField` or a `TextField` but the latter has no width constraint.

Problem:

```dart
Widget build(BuildContext context) {
  return MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('Unbounded Width of the TextField')),
      body: const Row(children: [TextField()]),
    ),
  );
}
```

Fix: constrain the text field using either an `Expanded` or `SizedBox` widget:

```dart
Widget build(BuildContext context) {
  return MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('Unbounded Width of the TextField')),
      body: Row(children: [Expanded(child: TextFormField())]),
    ),
  );
}
```

## 'Incorrect use of ParentData widget'

```plaintext
The following assertion was thrown while looking for parent data:
Incorrect use of ParentDataWidget.
(Some lines of this message omitted)
Usually, this indicates that at least one of the offending ParentDataWidgets
listed above is not placed directly inside a compatible ancestor widget.
```

A small subset of Flutter widgets expect specific parent widgets. When this expectation can't be satisfied in your widget tree, you're likely to encounter this error. This is an _incomplete_ list:

| Widget                                |  Expected parent widget(s) |
|:--------------------------------------|---------------------------:|
| `Flexible`                            | `Row`, `Column`, or `Flex` |
| `Expanded` (a specialized `Flexible`) | `Row`, `Column`, or `Flex` |
| `Positioned`                          |                    `Stack` |
| `TableCell`                           |                    `Table` |

## 'setState called during build'

The `build` method isn't a good place to call `setState`, either directly or indirectly.

```plaintext
The following assertion was thrown building DialogPage(dirty, dependencies:
[_InheritedTheme, _LocalizationsScope-[GlobalKey#59a8e]],
state: _DialogPageState#f121e):
setState() or markNeedsBuild() called during build.

This Overlay widget cannot be marked as needing to build because the framework
is already in the process of building widgets.
(Additional lines of this message omitted)
```

A common scenario is attempting to trigger a `Dialog` from within the `build` method. The snippet doesn't make an explicit call to `setState`, but it's called by `showDialog`:

```dart
Widget build(BuildContext context) {
  // Don't do this.
  showDialog<void>(
    context: context,
    builder: (context) {
      return const AlertDialog(title: Text('Alert Dialog'));
    },
  );

  return const Center(
    child: Column(children: <Widget>[Text('Show Material Dialog')]),
  );
}
```

One way to avoid this error is to use the `Navigator` API to trigger the dialog as a route. The `Navigator` pushes two routes, one for the second page and another for the dialog:

```dart
class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Screen')),
      body: Center(
        child: ElevatedButton(
          child: const Text('Launch screen'),
          onPressed: () {
            // Navigate to the second screen using a named route.
            Navigator.pushNamed(context, '/second');
            // Immediately show a dialog upon loading the second screen.
            Navigator.push(
              context,
              PageRouteBuilder<void>(
                barrierDismissible: true,
                opaque: false,
                pageBuilder: (_, anim1, anim2) => const MyDialog(),
              ),
            );
          },
        ),
      ),
    );
  }
}
```

## The ScrollController is attached to multiple scroll views

This error can occur when multiple scrolling widgets (such as `ListView`) appear on the screen at the same time. It's more likely for this error to occur on a web or desktop app, than a mobile app since it's rare to encounter this scenario on mobile. The page points to the `PrimaryScrollController` API documentation (`https://api.flutter.dev/flutter/widgets/PrimaryScrollController-class.html`) for how to fix.

## Notes

- Constraints flow down the render tree and sizes flow up; most layout errors above are box-constraint violations. See the "Understanding constraints" page for the underlying model.
- Distance line: `Row` / `Column` / `Expanded` / `ListView` / `Text` here are Flutter widgets (Dart), not same-named components in Jetpack Compose, SwiftUI, Ark UI, Chakra UI, or fandhe-frontend.
- The sample snippets use `Scaffold` / `MaterialApp` from the Material library; see the `material_ui` opt-in note for Flutter 3.47 in design-animation pages.

## Related

- [Debug Flutter apps from code](./code-debugging.md)
- [Handling errors in Flutter](./error-handling.md)
