---
source: https://docs.flutter.dev/ui/dot-shorthands
---

# Dot shorthands in Flutter

The dot shorthands feature lets you omit the explicit type when accessing static members, constructors, or enum values, provided the compiler can infer the type from the surrounding context.

## Signature / Usage

Without dot shorthands:

```dart
Container(
  alignment: Alignment.center,
  padding: const EdgeInsets.all(16.0),
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        'Hello World',
        style: TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
    ],
  ),
);
```

With dot shorthands:

```dart
Container(
  alignment: .center, // Instead of Alignment.center,
  padding: const .all(16.0), // Instead of EdgeInsets.all(16.0)
  child: Column(
    mainAxisAlignment: .center, // Instead of MainAxisAlignment.center
    crossAxisAlignment: .start, // Instead of CrossAxisAlignment.start
    children: [
      Text(
        'Hello World',
        style: TextStyle(
          fontWeight: .bold, // Instead of FontWeight.bold
        ),
      ),
    ],
  ),
);
```

## Where to use dot shorthands

Dot shorthands work anywhere the Dart compiler has a clear "context type". In Flutter this is almost everywhere inside a widget's property list. Common targets:

- **Enums**: `MainAxisAlignment`, `CrossAxisAlignment`, `BoxFit`, `TextDirection`.
- **Static properties and methods**: `FontWeight` (constants like `.bold`).
- **Constructors**: `EdgeInsets.all()`, `BorderRadius.circular()`.

### Enums

```dart
Row(
  mainAxisAlignment: .spaceEvenly, // Infers MainAxisAlignment.spaceEvenly
  children: [ /* ... */ ],
)
```

### Static properties

Static properties work when the context type is exactly the class that defines the property:

```dart
Text(
  'Feature highlights',
  style: TextStyle(
    fontWeight: .bold, // Infers FontWeight.bold
  ),
)
```

### Constructors

Many Flutter layout properties accept a base class like `EdgeInsetsGeometry`. To support dot shorthands, Flutter adds redirecting constructors to these base classes that point to the appropriate subclasses.

```dart
Padding(
  padding: .symmetric(horizontal: 16.0, vertical: 8.0), // Infers EdgeInsetsGeometry.symmetric
  child: Text('Spaced out text'),
)
```

`.new` calls an unnamed constructor (less common in standard widget trees):

```dart
class _MyState extends State<MyWidget> {
  final ScrollController _scrollController = .new(); // Infers ScrollController()
  // ...
}
```

## Notes

- For a technical overview of the feature, see the Dot Shorthands guide in the Dart documentation (https://dart.dev/language/dot-shorthands).

## Related

- [Building user interfaces](./building-user-interfaces.md)
