---
source: https://docs.flutter.dev/learn/pathway/how-flutter-works
---

# How Flutter works

A six-part video series that explores what happens to your Dart code after you hand it off to the Flutter framework. This page is a stepper of episode summaries (the videos themselves are not reproduced here).

## Signature / Usage

```text
1. Flutter's architecture                      (#architecture)
2. Widgets and the three trees                 (#three-trees)      Widget / Element / RenderObject
3. State objects and their lifecycle           (#state)            initState ... dispose
4. The widgets that actually render            (#render-object-widgets)  RenderObjectWidget
5. A day in the life of a render object        (#render-objects)   layout / paint / hit testing / semantics
6. The Flutter engine and embedders            (#engine)
```

## Episodes

### Flutter's architecture

A high-level look at Flutter's architecture, covering declarative code, multi-platform frameworks, and the role of Dart. Aimed at anyone beginning to research Flutter who wants the big picture.

### Widgets and the three trees

Explores Flutter's three primary trees: `Widget`, `Element`, and `RenderObject`. Widgets provide the declarative API, elements glue widgets to the rendering layer, and render objects translate widget values into painting calls.

### State objects and their lifecycle

Covers the `State` class behind every `StatefulWidget`: the full lifecycle from `initState` (initialize resources) to `dispose` (clean up), including `didChangeDependencies`, `didUpdateWidget`, and `build`. It also explains how Flutter recurses down the widget tree after a `setState` call, building only the parts that need to change, why `const` constructors matter for performance, why `setState` closures must be synchronous, and how elements (not widgets themselves) manage the actual rebuild.

### The widgets that actually render

`RenderObjectWidget` is the only type of widget in Flutter that creates something visual. Covers how Flutter builds the `Widget`, `Element`, and `RenderObject` trees, why many common widgets do not directly render anything, and how `RenderObjectWidget` creates and updates render objects.

### A day in the life of a render object

The core responsibilities of render objects: layout, painting, hit testing, and accessibility. Constraints flow down the render tree, sizes come back up, and parent render objects set their children's positions. Key methods: `layout`, `paint`, and `describeSemanticsConfiguration`.

### The Flutter engine and embedders

How Flutter mobile apps rely on native Android and iOS code to launch and operate, how the engine connects Dart code to the host platform, and how embedders facilitate communication between the two. Also covers the structure of a newly generated Flutter project, thread management, platform channels and the Pigeon package, why the engine is written in C++ rather than Dart, how it evolved from a fork of Chrome, and how it uses Skia or Impeller to render each frame. It closes with future architecture improvements aimed at simplifying native interop.

## Related

- [Architectural overview](./architectural-overview.md)
- [Inside Flutter](./inside-flutter.md)
- [Declarative UI](./declarative-ui.md)
