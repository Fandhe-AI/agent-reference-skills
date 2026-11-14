# collections

| Name | Description | Path |
|------|-------------|------|
| Aggregate collections | Functions returning a single value based on the collection content: min / max, average, sum, count, and fold / reduce. | [collection-aggregate.md](./collection-aggregate.md) |
| Combine collections | Operators and functions for adding and removing collection elements and combining collections: `plus` / `minus`, `union()`, `intersect()`, `subtract()`; each returns a new read-only collection and leaves the originals unchanged. | [collection-combine.md](./collection-combine.md) |
| Retrieve single elements | Functions for retrieving single elements from lists and sets: by position, by condition, with a selector, randomly, and existence checks. | [collection-elements.md](./collection-elements.md) |
| Filter collections | Extension functions that filter collections by predicates (lambdas returning a boolean). | [collection-filtering.md](./collection-filtering.md) |
| Group collections | Extension functions for grouping collection elements: `groupBy()` returns a `Map`; `groupingBy()` returns a lazy `Grouping` for applying operations to all groups. | [collection-grouping.md](./collection-grouping.md) |
| Collection operations overview | Collection operations are declared as member functions of collection interfaces or as extension functions. | [collection-operations.md](./collection-operations.md) |
| Order collections | Natural and custom orders (`Comparable`, `Comparator`, `compareBy()`, `thenBy()`) and the functions that sort, check order, reverse, and shuffle read-only collections (results are new collections). | [collection-ordering.md](./collection-ordering.md) |
| Retrieve collection parts | Extension functions for retrieving parts of a collection: by explicit positions, by result size, or by predicate. | [collection-parts.md](./collection-parts.md) |
| Transform collections | Extension functions that build new collections from existing ones: map, zip, associate, flatten, and string representation. | [collection-transformations.md](./collection-transformations.md) |
| Collection types | Kotlin's three main collection types, List, Set, and Map, plus `ArrayDeque`: how each stores elements, equality rules, and default implementations. | [collection-types.md](./collection-types.md) |
| Change collections | Write operations available for all implementations of `MutableCollection`: adding, removing, and (for lists and maps) updating elements. | [collection-write.md](./collection-write.md) |
| Collections overview | The Kotlin standard library provides tools for working with collections: groups of items of the same type or its subtypes (elements), with generic interfaces and functions in the `kotlin.collections` package. Main collection types: List, Set, Map, plus ArrayDeque. | [collections-overview.md](./collections-overview.md) |
| Create collections | Ways to create collections: from elements, builder functions, empty collections, list initializer functions, concrete constructors, copies, and results of other operations. | [constructing-collections.md](./constructing-collections.md) |
| Iterate collections | Iterators give sequential access to collection elements without exposing the underlying structure. | [iterators.md](./iterators.md) |
| List-specific operations | Index-based operations for lists: retrieving by index, sublists, searching positions (linear and binary search), and list write operations (add, set, fill, removeAt, in-place sort). | [list-operations.md](./list-operations.md) |
| Map-specific operations | Key-based operations for maps: retrieving values, filtering by keys / values, plus and minus operators, and write operations on mutable maps. | [map-operations.md](./map-operations.md) |
| Ranges | Ranges and progressions define sequences of values: range operators, iteration, custom step values, and arithmetic progressions (`IntProgression`, `LongProgression`, `CharProgression`). | [ranges.md](./ranges.md) |
| Sequences | `Sequence<T>` produces elements while iterating instead of containing them. | [sequences.md](./sequences.md) |
