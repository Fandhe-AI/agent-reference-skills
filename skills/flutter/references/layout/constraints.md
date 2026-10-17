---
source: https://docs.flutter.dev/ui/layout/constraints
---

# Understanding constraints

Flutter's model for widget constraints, sizing, and positioning. The rule to memorize: **Constraints go down. Sizes go up. Parent sets position.**

## Signature / Usage

- A widget gets its own **constraints** from its **parent**. A constraint is a set of 4 doubles: a minimum and maximum width, and a minimum and maximum height.
- The widget goes through its **children** one by one, tells each its constraints (which can differ per child), and asks each child what size it wants to be.
- The widget then positions its children (x axis, y axis), one by one.
- Finally the widget tells its parent its own **size** (within the original constraints).

Negotiation example (a composed widget with a column and 5 pixels of padding): parent says 0-300 wide and 0-85 tall; the widget passes 0-290 wide and 0-75 tall to the first child, which picks 290 x 20; the second child gets 0-290 wide and 0-55 tall and picks 140 x 30; positions are `x: 5, y: 5` and `x: 80, y: 25`; the widget reports its size as 300 x 60.

Tight constraint (`BoxConstraints.tight` from `box.dart`):

```dart
BoxConstraints.tight(Size size)
   : minWidth = size.width,
     maxWidth = size.width,
     minHeight = size.height,
     maxHeight = size.height;
```

### Limitations

Flutter's layout engine is a one-pass process: efficient, but with limits.

- A widget can decide its own size only within the constraints given by its parent; it usually can't have any size it wants.
- A widget can't know and doesn't decide its own position on the screen; the parent decides.
- A widget's size and position depend on its parent, so they can't be defined precisely without considering the whole tree.
- If a child wants a different size from its parent and the parent lacks information to align it, the child's size might be ignored. Be specific when defining alignment.

Widgets are rendered by their underlying `RenderBox` objects. There are three kinds of boxes in terms of how they handle constraints:

- Those that try to be as big as possible (the boxes used by `Center` and `ListView`).
- Those that try to be the same size as their children (`Transform`, `Opacity`).
- Those that try to be a particular size (`Image`, `Text`).

Some widgets, such as `Container`, vary based on constructor arguments: it defaults to as big as possible, but honors a given `width`. `Row` and `Column` (flex boxes) vary based on the constraints they are given (see Flex).

### Examples

The original page has a DartPad with 29 examples. Each is shown below as the widget expression plus the explanation. Every example assumes the screen gives the root widget tight constraints of the screen size (`red`, `green`, `blue` are `Colors.red` / `Colors.green` / `Colors.blue`; `big` is `TextStyle(fontSize: 30)`).

#### Example 1 - Container fills the screen

```dart
Container(color: red)
```

The screen forces the `Container` to be exactly the same size as the screen, so it fills the screen and paints it red.

#### Example 2 - Tight constraint overrides width/height

```dart
Container(width: 100, height: 100, color: red)
```

The red `Container` wants to be 100 x 100 but can't, because the screen forces it to be exactly the screen size.

#### Example 3 - Center loosens constraints

```dart
Center(child: Container(width: 100, height: 100, color: red))
```

The screen forces the `Center` to fill the screen. The `Center` tells the `Container` it can be any size up to the screen, so it can be 100 x 100.

#### Example 4 - Align

```dart
Align(
  alignment: Alignment.bottomRight,
  child: Container(width: 100, height: 100, color: red),
)
```

`Align` also tells the `Container` it can be any size, but if there is empty space it aligns the container to the bottom-right instead of centering.

#### Example 5 - Infinite size is capped by the screen

```dart
Center(
  child: Container(
    width: double.infinity,
    height: double.infinity,
    color: red,
  ),
)
```

The `Container` wants infinite size, but it can't be bigger than the screen, so it fills the screen.

#### Example 6 - Container with no child and no size

```dart
Center(child: Container(color: red))
```

Since the `Container` has no child and no fixed size, it decides it wants to be as big as possible, so it fills the whole screen. This is a design decision of the `Container` widget; read the widget's API documentation to learn its behavior.

#### Example 7 - Container sizes to its child

```dart
Center(
  child: Container(
    color: red,
    child: Container(color: green, width: 30, height: 30),
  ),
)
```

The red `Container` has no size but has a child, so it is the same size as its child (30 x 30). The red color isn't visible because the green `Container` covers it.

#### Example 8 - Padding

```dart
Center(
  child: Container(
    padding: const EdgeInsets.all(20),
    color: red,
    child: Container(color: green, width: 30, height: 30),
  ),
)
```

The red `Container` sizes itself to its child's size plus its own padding, so the red color is visible.

#### Example 9 - ConstrainedBox under tight constraints

```dart
ConstrainedBox(
  constraints: const BoxConstraints(
    minWidth: 70,
    minHeight: 70,
    maxWidth: 150,
    maxHeight: 150,
  ),
  child: Container(color: red, width: 10, height: 10),
)
```

`ConstrainedBox` only imposes **additional** constraints from those it receives from its parent. Here the screen forces it to the screen size, so its `constraints` parameter is ignored.

#### Example 10 - ConstrainedBox minimum

```dart
Center(
  child: ConstrainedBox(
    constraints: const BoxConstraints(
      minWidth: 70,
      minHeight: 70,
      maxWidth: 150,
      maxHeight: 150,
    ),
    child: Container(color: red, width: 10, height: 10),
  ),
)
```

The `Container` must be between 70 and 150 pixels. It wants 10, so it ends up 70 (the minimum).

#### Example 11 - ConstrainedBox maximum

```dart
Center(
  child: ConstrainedBox(
    constraints: const BoxConstraints(
      minWidth: 70,
      minHeight: 70,
      maxWidth: 150,
      maxHeight: 150,
    ),
    child: Container(color: red, width: 1000, height: 1000),
  ),
)
```

It wants 1000 pixels, so it ends up 150 (the maximum).

#### Example 12 - ConstrainedBox in range

```dart
Center(
  child: ConstrainedBox(
    constraints: const BoxConstraints(
      minWidth: 70,
      minHeight: 70,
      maxWidth: 150,
      maxHeight: 150,
    ),
    child: Container(color: red, width: 100, height: 100),
  ),
)
```

It wants 100 pixels, which is between 70 and 150, so it is 100.

#### Example 13 - UnconstrainedBox

```dart
UnconstrainedBox(
  child: Container(color: red, width: 20, height: 50),
)
```

The `UnconstrainedBox` fills the screen but lets its child `Container` be any size it wants.

#### Example 14 - UnconstrainedBox overflow

```dart
UnconstrainedBox(
  child: Container(color: red, width: 4000, height: 50),
)
```

The `Container` is 4000 pixels wide and too big to fit, so `UnconstrainedBox` displays the "overflow warning".

#### Example 15 - OverflowBox

```dart
OverflowBox(
  minWidth: 0,
  minHeight: 0,
  maxWidth: double.infinity,
  maxHeight: double.infinity,
  child: Container(color: red, width: 4000, height: 50),
)
```

`OverflowBox` is similar to `UnconstrainedBox`, but it won't display any warnings if the child doesn't fit; it shows as much as it can.

#### Example 16 - Infinite size error

```dart
UnconstrainedBox(
  child: Container(color: Colors.red, width: double.infinity, height: 100),
)
```

This won't render anything. Flutter can't render infinite sizes and throws: `BoxConstraints forces an infinite width.`

#### Example 17 - LimitedBox

```dart
UnconstrainedBox(
  child: LimitedBox(
    maxWidth: 100,
    child: Container(
      color: Colors.red,
      width: double.infinity,
      height: 100,
    ),
  ),
)
```

No error here: when `LimitedBox` is given an infinite size by the `UnconstrainedBox`, it passes a maximum width of 100 down. Swapped for `Center`, the limit would not apply (a `LimitedBox` limit applies only when it gets infinite constraints). This is the difference between `LimitedBox` and `ConstrainedBox`.

#### Example 18 - FittedBox

```dart
const FittedBox(child: Text('Some Example Text.'))
```

`FittedBox` lets the `Text` be any size, then scales the `Text` until it fills all available width.

#### Example 19 - FittedBox inside Center

```dart
const Center(child: FittedBox(child: Text('Some Example Text.')))
```

`Center` lets `FittedBox` be any size up to the screen; it sizes itself to the `Text`, so no scaling happens.

#### Example 20 - FittedBox with text too large

```dart
const Center(
  child: FittedBox(
    child: Text(
      'This is some very very very large text that is too big to fit a regular screen in a single line.',
    ),
  ),
)
```

`FittedBox` can't be bigger than the screen; it assumes the screen size and resizes `Text` to fit.

#### Example 21 - Text without FittedBox

```dart
const Center(
  child: Text(
    'This is some very very very large text that is too big to fit a regular screen in a single line.',
  ),
)
```

Without `FittedBox`, the `Text` gets its maximum width from the screen and breaks the line so that it fits.

#### Example 22 - FittedBox needs a bounded child

```dart
FittedBox(
  child: Container(height: 20, width: double.infinity, color: Colors.red),
)
```

`FittedBox` can only scale a widget that is bounded (has non-infinite width and height). Otherwise it renders nothing and logs an error.

#### Example 23 - Row

```dart
Row(
  children: [
    Container(
      color: red,
      child: const Text('Hello!', style: big),
    ),
    Container(
      color: green,
      child: const Text('Goodbye!', style: big),
    ),
  ],
)
```

Like an `UnconstrainedBox`, the `Row` won't impose any constraints onto its children. It puts them side by side and any extra space remains empty.

#### Example 24 - Row overflow

```dart
Row(
  children: [
    Container(
      color: red,
      child: const Text(
        'This is a very long text that '
        'won\'t fit the line.',
        style: big,
      ),
    ),
    Container(
      color: green,
      child: const Text('Goodbye!', style: big),
    ),
  ],
)
```

Children may be too big for the `Row`, which then displays the "overflow warning".

#### Example 25 - Expanded

```dart
Row(
  children: [
    Expanded(
      child: Center(
        child: Container(
          color: red,
          child: const Text(
            'This is a very long text that won\'t fit the line.',
            style: big,
          ),
        ),
      ),
    ),
    Container(
      color: green,
      child: const Text('Goodbye!', style: big),
    ),
  ],
)
```

Once a child is wrapped in `Expanded`, the `Row` won't let it define its own width. It defines the `Expanded` width from the other children, then `Expanded` forces the original child to that width; the child's own width is ignored.

#### Example 26 - All children Expanded

```dart
Row(
  children: [
    Expanded(
      child: Container(
        color: red,
        child: const Text(
          'This is a very long text that won\'t fit the line.',
          style: big,
        ),
      ),
    ),
    Expanded(
      child: Container(
        color: green,
        child: const Text('Goodbye!', style: big),
      ),
    ),
  ],
)
```

Each `Expanded` has a size proportional to its `flex` parameter and ignores the preferred width of its children.

#### Example 27 - Flexible

```dart
Row(
  children: [
    Flexible(
      child: Container(
        color: red,
        child: const Text(
          'This is a very long text that won\'t fit the line.',
          style: big,
        ),
      ),
    ),
    Flexible(
      child: Container(
        color: green,
        child: const Text('Goodbye!', style: big),
      ),
    ),
  ],
)
```

`Flexible` lets its child have the same or smaller width than the `Flexible` itself, while `Expanded` forces the exact width. Both ignore their children's width when sizing themselves, so it is impossible to expand `Row` children proportionally to their sizes.

#### Example 28 - Scaffold gives loose constraints

```dart
Scaffold(
  body: Container(
    color: blue,
    child: const Column(children: [Text('Hello!'), Text('Goodbye!')]),
  ),
)
```

The `Scaffold` fills the screen and tells the `Container` it can be any size up to the screen. When a widget tells its child it can be smaller than a certain size, it supplies **loose** constraints.

#### Example 29 - SizedBox.expand gives tight constraints

```dart
Scaffold(
  body: SizedBox.expand(
    child: Container(
      color: blue,
      child: const Column(children: [Text('Hello!'), Text('Goodbye!')]),
    ),
  ),
)
```

To make the `Scaffold`'s child exactly the same size as the `Scaffold`, wrap it with `SizedBox.expand`.

### Tight vs loose constraints

- **Tight**: offers a single possibility, an exact size (maximum width equals minimum width, and maximum height equals minimum height). The `App` widget, contained by `RenderView`, forces the child returned by the app's `build` to exactly fill the content area. The screen passes tight constraints to the root `Container` (Example 2).
- **Loose**: minimum of zero and a non-zero maximum. Some boxes loosen incoming constraints (the maximum is kept, the minimum removed). `Center` transforms the tight constraints from its parent (the screen) into loose constraints for its child (Example 3).

### Unbounded constraints

A box's constraint is unbounded (infinite) when either maximum width or maximum height is `double.infinity`. A box that tries to be as big as possible doesn't function usefully with an unbounded constraint and, in debug mode, throws an exception.

The most common case is within a flex box (`Row` or `Column`) and within a scrollable region (such as `ListView` and other `ScrollView` subclasses). Nesting a vertically scrolling `ListView` inside a horizontally scrolling `ListView` makes the inner list try to be as wide as possible, which is infinitely wide.

### Flex

A flex box (`Row` and `Column`) behaves differently depending on whether its constraint is bounded or unbounded in its primary direction.

- Bounded in the primary direction: tries to be as big as possible.
- Unbounded in the primary direction: tries to fit its children in that space. Each child's `flex` value must be zero, so `Expanded` can't be used when the flex box is inside another flex box or a scrollable; otherwise it throws an exception.
- The cross direction (width for `Column`, height for `Row`) must never be unbounded, or it can't reasonably align its children.

### Learning the layout rules for specific widgets

Each widget has a lot of freedom in applying the general rule, so read its documentation or study its source. For example, `Column` extends `Flex` (in `basic.dart`); `Flex.createRenderObject()` returns a `RenderFlex` (in `flex.dart`), whose `performLayout()` does the layout for the `Column`.

## Notes

- Flutter layout is very different from HTML layout.
- Flutter widget layout (Dart) uses the constraints model described here; it is distinct from Jetpack Compose constraints (android-compose-ui), SwiftUI layout (apple-swiftui), and CSS-based layout in web frameworks, even where `Row`, `Column`, `Stack`, `Text`, and `Image` share names.
- For specific layout errors see the common errors page (testing-performance category).
- The article is by Marcelo Glasberg, originally published on Medium as "Flutter: The Advanced Layout Rule Even Beginners Must Know".

## Related

- [Layouts in Flutter](./overview.md)
- [Scrolling](./scrolling.md)
- LayoutBuilder
- Common errors
