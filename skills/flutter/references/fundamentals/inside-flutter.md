---
source: https://docs.flutter.dev/resources/inside-flutter
---

# Inside Flutter

The inner workings of the Flutter toolkit that make Flutter's API possible, written by one of the founding engineers. Because Flutter widgets are built using aggressive composition, user interfaces have a large number of widgets; Flutter uses sublinear algorithms for layout and building widgets, plus data structures that make tree surgery efficient, with a number of constant-factor optimizations. Infinite scrolling lists are built with callbacks that build exactly those widgets that are visible.

## Signature / Usage

The original page contains no code listing; the layout protocol it describes is summarized here:

```text
Layout (RenderBox):  parent --constraints (min/max width, min/max height)--> child
                     child  --geometry (size within the constraints)------> parent
                     parent decides the child's position afterwards
Rules: one layout per frame, single pass; each render object visited at most twice
       (down and up); a child's layout cannot depend on its position.
```

## Aggressive composability

Widgets are built by composing other widgets (for example `Padding` is a widget rather than a property of other widgets). The widget-building recursion bottoms out in `RenderObjectWidgets`, which create nodes in the render tree: a data structure storing the geometry of the UI, computed during _layout_ and used during _painting_ and _hit testing_. Most developers manipulate the render tree through widgets rather than authoring render objects.

### Sublinear layout

Some toolkits use O(N²) or worse layout algorithms. Flutter aims for linear performance for initial layout and _sublinear layout performance_ when updating an existing layout.

Flutter performs one layout per frame, in a single pass. _Constraints_ are passed down by parents calling the layout method on each child; children recursively lay out and return _geometry_ up the tree. Once a render object has returned from its layout method it is not visited again until the next frame's layout (for layout, at least). Each render object is thus visited _at most twice_ during layout (some layouts involving intrinsic dimensions or baseline measurements require an additional walk, mitigated by aggressive caching).

The most common specialization is `RenderBox`, in two-dimensional Cartesian coordinates: constraints are a min and max width and a min and max height; the child chooses a size within these bounds; after the child returns, the parent decides the child's position. A child's layout cannot depend on its position, so the parent can reposition the child without recomputing its layout.

During layout the only information flowing from parent to child is the constraints and from child to parent is the geometry. This allows:

- If the child has not marked its layout dirty and the parent gives the same constraints as in the previous layout, the child can return immediately, cutting off the walk.
- Whenever a parent calls a child's layout method, it indicates whether it uses the returned size. If it does not, it need not recompute its layout when the child selects a new size.
- _Tight_ constraints (satisfiable by exactly one geometry): the parent need not recompute its layout when the child recomputes its own, because the child cannot change size without new constraints.
- A render object can declare that it uses the parent's constraints only to determine its geometry, so the parent need not recompute even with non-tight constraints.

As a result, when the render object tree contains dirty nodes, only those nodes and a limited part of the subtree around them are visited during layout.

### Sublinear widget building

After being built, the widgets are held by the _element tree_, which retains the logical structure of the UI (widgets are immutable and cannot remember parent or child relationships) and holds the _state_ objects of stateful widgets.

An element becomes dirty, for example when `setState()` is called on the associated state object. The framework keeps a list of dirty elements and jumps directly to them during the _build_ phase, skipping clean elements. Information flows _unidirectionally_ down the element tree, so each element is visited at most once during build; once cleaned, an element cannot become dirty again because all its ancestors are clean (one exception: widgets rebuilt as a result of a layout-constraint change, per the build-on-demand section, can be updated twice in a frame; this is limited to the widget itself).

If an element has not marked itself dirty, it can return immediately from build when its parent rebuilds it with an identical widget, comparing only the object identity of the two widget references. Developers exploit this for the _reprojection_ pattern, in which a widget includes a prebuilt child widget stored as a member variable.

Flutter also avoids walking the parent chain with `InheritedWidgets`, which would make the build phase O(N²) in tree depth. The framework maintains a hash table of `InheritedWidget`s at each element, shared among many elements and changing only at elements that introduce a new `InheritedWidget`.

### Linear reconciliation

Flutter does not employ a tree-diffing algorithm. It examines the child list for each element independently with an O(N) algorithm that optimizes for: an empty old child list; identical lists; insertion or removal of widgets in exactly one place; and matching widgets with the same key (an opaque object whose equality operator influences reconciliation).

The beginning and end of both child lists are matched by comparing runtime type and key, possibly leaving a non-empty unmatched range in the middle. The old range is placed into a hash table by key; the new range is walked and queried by key. Unmatched children are discarded and rebuilt from scratch; matched children are rebuilt with their new widgets.

### Tree surgery

Elements own the state for stateful widgets and the underlying render objects, so reusing them preserves state and layout information, often avoiding entire subtree walks. Associating a `GlobalKey` with a widget enables _non-local_ tree mutations: each global key is unique throughout the application and registered with a thread-specific hash table. During build, a widget with a global key can move to an arbitrary location in the element tree; the framework reparents the existing element, preserving the entire subtree. The new parent is marked dirty for layout, but if it passes the child the same constraints, the child can return immediately. Global keys and non-local tree mutations are used for effects such as hero transitions and navigation.

### Constant-factor optimizations

- **Child-model agnostic.** `RenderBox` has an abstract `visitChildren()` method rather than a concrete `firstChild` / `nextSibling` interface. Many subclasses support only a single child (for example `RenderPadding`), giving a simpler, faster layout method.
- **Visual render tree, logical widget tree.** The render tree uses a device-independent visual coordinate system (smaller x is always left, even in right-to-left reading direction); the widget tree typically uses logical coordinates (_start_ and _end_). The conversion happens in the handoff between widget tree and render tree, which is less frequent than render-tree layout and painting.
- **Text handled by a specialized render object.** `RenderParagraph` is a leaf in the render tree; developers incorporate text by composition. It avoids recomputing text layout as long as its parent supplies the same constraints, even during tree surgery.
- **Observable objects.** Flutter uses both model-observation and reactive paradigms. For example, `Animation`s notify an observer list when their value changes, and the render tree observes them directly and invalidates only the appropriate pipeline stage (a change to an `Animation<Color>` might trigger only paint rather than build and paint).

### Separation of the Element and RenderObject trees

The `RenderObject` and `Element` (Widget) trees are isomorphic (strictly, the render tree is a subset of the element tree), yet separate for:

- **Performance.** Only the relevant parts of the layout tree are walked; the element tree frequently has many additional nodes to skip.
- **Clarity.** Widget protocol and render object protocol can each be specialized, simplifying the API surface and lowering bug risk and testing burden.
- **Type safety.** The render object tree can guarantee at runtime that children are of the appropriate type (each coordinate system has its own render object type), while composition widgets stay agnostic about the coordinate system (for example, the same widget can be used in both a box layout and a sliver layout).

## Infinite scrolling

Flutter supports infinite scrolling lists with a simple builder-pattern interface, in which a `ListView` uses a callback to build widgets on demand as they become visible. This requires _viewport-aware layout_ and _building widgets on demand_.

### Viewport-aware layout

The outside of a scrollable widget is a `Viewport`, a box that is "bigger on the inside": children can extend beyond its bounds and scroll into view. Instead of `RenderBox` children, a viewport has `RenderSliver` children (_slivers_) with a viewport-aware layout protocol. As in box layout, parents pass constraints down and receive geometry, but the sliver constraints include information about the viewport such as the visible space remaining, and the geometry enables scroll-linked effects such as collapsible headers and parallax.

Different slivers fill the viewport in different ways: a linear-list sliver lays out each child in order until it runs out of children or space; a grid sliver fills only the visible portion. Since slivers know how much space is visible, they can produce a finite number of children even if they could produce an unbounded number. Slivers compose: a single viewport can have a collapsible header, then a linear list, then a grid, all cooperating to produce only visible children. For accessibility, and to give a few extra milliseconds between build and display, the viewport creates (but does not paint) widgets for a few hundred pixels before and after the visible widgets.

### Building widgets on demand

With a strict build-then-layout-then-paint pipeline, viewport visibility (known only during layout) would arrive too late to build the needed widgets. Flutter interleaves the build and layout phases: at any point in layout, the framework can start building new widgets on demand as long as they are descendants of the render object currently performing layout. This is possible only because of strict controls on information propagation: during build, information propagates only down the tree; when a render object is performing layout, the subtree below it has not been visited, so writes from building there cannot invalidate information already used; and once layout has returned from a render object, it is not visited again during this layout. Linear reconciliation and tree surgery are essential for efficiently updating elements and the render tree as elements scroll in and out of view.

## API Ergonomics

Flutter has been repeatedly tested in extensive UX studies with developers; they confirmed the value of API documentation and highlighted the need specifically for sample code and illustrative diagrams.

### Specializing APIs to match the developer's mindset

The base class for nodes in the `Widget`, `Element`, and `RenderObject` trees does not define a child model, so each node specializes: most widgets expose a single `child`, some expose a `children` list, some have none. Similarly `RenderImage` is a leaf, `RenderPadding` has storage for a single child, and `RenderFlex` manages an arbitrary number of children as a linked list. In rare cases the child model is more complicated (`RenderTable` takes an array of arrays and uses an indexable array). `Chip` widgets and `InputDecoration` have fields matching the slots on the controls instead of positional child semantics. `RenderParagraph` is the most extreme case: its child is a `TextSpan`, so at its boundary the `RenderObject` tree becomes a `TextSpan` tree.

Some trivial widgets exist so developers find them when searching for a solution: searching `space` finds `Spacer` (which uses `Expanded` and `SizedBox`), and `Visibility` wraps hiding a subtree.

### Explicit arguments

Dart named arguments keep build methods with many constructor calls understandable; this is extended to any method with multiple arguments, particularly boolean arguments so isolated `true` / `false` literals are self-documenting. Booleans are always named in the positive form (for example `enabled: true` rather than `disabled: false`).

### Paving over pitfalls

APIs are defined so error conditions do not exist: interpolation functions allow null ends (null to null is null; from or to null is interpolating to the zero analog); `Flex` with infinite space sizes itself to fit the children's desired size; the `PointerDownEvent` constructor has no `down` parameter and always sets it to `true`; the default `Color` constructor takes a single integer defining each bit, so any value is a valid color; `paintImage()` takes eleven mostly-orthogonal arguments with few invalid combinations.

### Reporting error cases aggressively

For remaining errors, debug builds catch them early: asserts are widely used, constructor arguments are spot-checked, lifecycles are monitored. When running unit tests, every aggressively laid-out `RenderBox` subclass checks that its intrinsic sizing methods fulfill the contract. Exceptions include as much information as possible, sometimes probing the stack trace or walking trees, and often include detailed instructions, sample code, or links to documentation.

### Reactive paradigm

Mutable tree-based APIs have a dichotomous access pattern: creating the original tree differs from subsequent updates. The rendering layer uses this paradigm (effective for a persistent tree), so direct interaction is awkward and bug-prone. The widget layer introduces a composition mechanism using the reactive paradigm (first popularized by Facebook's React) that combines tree creation and mutation into a single description (build) step.

### Interpolation

Because the framework encourages describing the interface for the current state, a mechanism exists to implicitly animate between configurations. Each implicitly animatable feature has a stateful widget that records the current value of the input and starts an animation whenever it changes. This uses `lerp` (linear interpolation) functions on immutable objects: start and end values go to the `lerp` function with a _t_ value (0.0 is `start`, 1.0 is `end`; _t_ may extend past 0.0-1.0 for some curves such as elastic ones, and for some types such as colors it is effectively clamped), and a third immutable object is returned for the intermediate stage. This separates state machinery, state-to-configuration mapping, animation machinery, interpolation machinery, and painting logic.

Basic types like `Color` and `Shape` can be interpolated, as can `Decoration`, `TextStyle`, or `Theme`. For class hierarchies such as `ShapeBorder` (`BeveledRectangleBorder`, `BoxBorder`, `CircleBorder`, `RoundedRectangleBorder`, `StadiumBorder`), the interface defines `lerpFrom` and `lerpTo`, which the static `lerp` defers to: B is first asked to `lerpFrom` A, then A is asked to `lerpTo` B; if neither is possible the function returns A for `t` less than 0.5 and B otherwise. This allows the hierarchy to be extended arbitrarily, private intermediate classes (for example between `CircleBorder` and `RoundedRectangleBorder`), and seamless transitions from intermediate stages to new values.

## Conclusion

Flutter's slogan, "everything is a widget," revolves around building UIs by composing widgets that are composed of progressively more basic widgets. The resulting large number of widgets requires carefully designed algorithms and data structures, which also make infinite scrolling lists that build widgets on demand easy.

## Notes

- This whitepaper explains Flutter's own Dart framework internals; it is unrelated to the layout / rendering internals of Jetpack Compose (android-compose-ui), SwiftUI (apple-swiftui) or the web.

## Related

- [Architectural overview](./architectural-overview.md)
- [How Flutter works](./how-flutter-works.md)
- [Declarative UI](./declarative-ui.md)
