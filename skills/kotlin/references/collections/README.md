# collections

| Name | Description | Path |
|------|-------------|------|
| Aggregate operations | Functions returning a single value based on the collection content: min / max, average, sum, count, and fold / reduce. | [collection-aggregate.md](./collection-aggregate.md) |
| Retrieve single elements | Functions for retrieving single elements from lists and sets: by position, by condition, with a selector, randomly, and existence checks. | [collection-elements.md](./collection-elements.md) |
| Filtering collections | Extension functions that filter collections by predicates (lambdas returning a boolean). | [collection-filtering.md](./collection-filtering.md) |
| Grouping | Extension functions for grouping collection elements: `groupBy()` returns a `Map`; `groupingBy()` returns a lazy `Grouping` for applying operations to all groups. | [collection-grouping.md](./collection-grouping.md) |
| Collection operations overview | Collection operations are declared as member functions of collection interfaces or as extension functions. | [collection-operations.md](./collection-operations.md) |
| Ordering | Natural and custom orders (`Comparable`, `Comparator`, `compareBy()`, `thenBy()`) and the functions that sort, check order, reverse, and shuffle read-only collections (results are new collections). | [collection-ordering.md](./collection-ordering.md) |
| Retrieve collection parts | Extension functions for retrieving parts of a collection: by explicit positions, by result size, or by predicate. | [collection-parts.md](./collection-parts.md) |
| Plus and minus operators | `plus` (`+`) and `minus` (`-`) take a collection as the first operand and an element or another collection as the second; they return a new read-only collection. | [collection-plus-minus.md](./collection-plus-minus.md) |
| Collection transformation operations | Extension functions that build new collections from existing ones: map, zip, associate, flatten, and string representation. | [collection-transformations.md](./collection-transformations.md) |
| Collection write operations | Write operations available for all implementations of `MutableCollection`: adding, removing, and (for lists and maps) updating elements. | [collection-write.md](./collection-write.md) |
| Collections overview | The Kotlin standard library provides generic interfaces, classes, and functions (package `kotlin.collections`) for creating, populating, and managing collections of any type: List, Set, Map, and ArrayDeque. | [collections-overview.md](./collections-overview.md) |
| Constructing collections | Ways to create collections: from elements, builder functions, empty collections, list initializer functions, concrete constructors, copies, and results of other operations. | [constructing-collections.md](./constructing-collections.md) |
| Iterators | Iterators give sequential access to collection elements without exposing the underlying structure. | [iterators.md](./iterators.md) |
| List-specific operations | Index-based operations for lists: retrieving by index, sublists, searching positions (linear and binary search), and list write operations (add, set, fill, removeAt, in-place sort). | [list-operations.md](./list-operations.md) |
| Map-specific operations | Key-based operations for maps: retrieving values, filtering by keys / values, plus and minus operators, and write operations on mutable maps. | [map-operations.md](./map-operations.md) |
| Ranges and progressions | Ranges and progressions define sequences of values: range operators, iteration, custom step values, and arithmetic progressions (`IntProgression`, `LongProgression`, `CharProgression`). | [ranges.md](./ranges.md) |
| Sequences | `Sequence<T>` produces elements while iterating instead of containing them. | [sequences.md](./sequences.md) |
| Set-specific operations | Extension functions for set operations: `union()`, `intersect()`, `subtract()` (also infix), applicable to sets and lists. | [set-operations.md](./set-operations.md) |
