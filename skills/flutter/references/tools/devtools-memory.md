---
source: https://docs.flutter.dev/tools/devtools/memory
---

# Use the Memory view

The memory view provides insights into the application's memory allocation and tools to detect and debug specific issues. The page states it is up to date for DevTools 2.23.0.

## Signature / Usage

Closures and `BuildContext` can leak. Prefer capturing a long-living object (such as the theme) instead of `context`:

```dart
// BAD: DO NOT DO THIS
// This code is leak prone:
@override
Widget build(BuildContext context) {
  final handler = () => apply(Theme.of(context));
  useHandler(handler);
…
```

```dart
// GOOD
@override
Widget build(BuildContext context) {
  final theme = Theme.of(context);
  final handler = () => apply(theme);
  useHandler(handler);
…
```

## When to use it

Use for preemptive memory optimization or when the app: crashes when out of memory, slows down, slows the device, shuts down for exceeding the OS memory limit, exceeds a memory usage limit (which varies by target device), or you suspect a memory leak.

## Basic memory concepts

| Concept | Description |
| --- | --- |
| Heap | Dart objects created via a class constructor live in the heap, managed by the Dart VM, which allocates at creation and releases when no longer used. |
| Disposable object | Any Dart object defining a `dispose()` method; invoke `dispose` when no longer needed. |
| Memory-risky object | An object that might cause a leak if not disposed properly or disposed but not GCed. |
| Root object | Every Dart application creates a root object referencing, directly or indirectly, all other allocated objects. |
| Reachability | When the root object stops referencing an object, it becomes unreachable and the GC deallocates it. |
| Retaining path | The sequence of references from root to an object; one object can have many. Objects with at least one are reachable. |
| Shallow size | Size of the object and its references only. |
| Retained size | Also includes the size of retained objects. The retained size of the root includes all reachable objects. |

In DevTools calculations, if an object has more than one retaining path, its size is assigned as retained only to the members of the shortest retaining path.

```dart
class Child{}

class Parent {
  Child? child;
}

Parent parent1 = Parent();

void myFunction() {

  Child? child = Child();

  // The `child` object was allocated in memory.
  // It's now retained from garbage collection
  // by one retaining path (root …-> myFunction -> child).

  Parent? parent2 = Parent()..child = child;
  parent1.child = child;

  // At this point the `child` object has three retaining paths:
  // root …-> myFunction -> child
  // root …-> myFunction -> parent2 -> child
  // root -> parent1 -> child

  child = null;
  parent1.child = null;
  parent2 = null;

  // At this point, the `child` instance is unreachable
  // and will eventually be garbage collected.

  …
}
```

## Memory leaks in Dart

The garbage collector cannot prevent all leaks: it handles unreachable objects, but the application must ensure unneeded objects are no longer reachable. Objects left referenced (in a global or static variable, or as a field of a long-living object) grow memory until an `out-of-memory` crash.

- Closures: a reference to a short-living `myHugeObject` is implicitly stored in the closure context and won't be collected as long as `handler` is reachable.

```dart
  final handler = () => print(myHugeObject.name);
  setHandler(handler);
```

- `BuildContext` general rule: if the closure doesn't outlive the widget, it's OK to pass the context to it. The build context, owned by the widget, should never be referenced from the state's fields, as the state can significantly outlive the widget.
- Leak vs bloat: a leak progressively uses memory (for example, creating a listener repeatedly without disposing it); bloat uses more memory than necessary (for example, overly large images or streams kept open through their lifetime).

## Memory view guide

| Feature | Description |
| --- | --- |
| Expandable chart | High-level trace of memory allocation, with standard events (like GC) and custom events (like image allocation). |
| Profile Memory tab | Current allocation by class and memory type; download CSV; toggle **Refresh on GC** for real-time allocation. |
| Diff Snapshots tab | Take snapshots before and after interaction and diff them; **Filter classes and packages** narrows data; CSV download. |
| Trace Instances tab | Select classes to trace, interact with the app, tap **Refresh**, select a traced class, review data; switch between bottom-up and call tree views. |

Memory overview chart: polled every 500 ms. Y-axis quantities:

| Quantity | Description |
| --- | --- |
| Dart/Flutter Heap | Objects in the heap. |
| Dart/Flutter Native | Memory outside the heap but part of the total footprint (for example a file read into memory or a decoded image), exposed through a Dart embedder. |
| Timeline | Timestamps of all collected statistics and events. |
| Raster Cache | Size of the Flutter engine's raster cache layer(s) or picture(s) during final rendering after compositing. |
| Allocated | Current total capacity of all Dart heaps; typically slightly larger than the total size of all heap objects. |
| RSS - Resident Set Size | Memory for a process, excluding swapped-out memory; includes loaded shared libraries and all stack and heap memory. |

## Notes

- Flutter DevTools memory view (Dart heap) is distinct from React DevTools (react skill).

## Related

- [Use the Performance view](./devtools-performance.md)
- [Use the CPU profiler view](./devtools-cpu-profiler.md)
- [Flutter and Dart DevTools](./devtools.md)
