# UniqueArray

A dynamically self-resizing, heap allocated, noncopyable array of potentially noncopyable elements.

## Signature / Usage

```swift
@frozen struct UniqueArray<Element> where Element : ~Copyable
```

Adapted (not in the official docs): minimal usage composed from the member declarations below (compiled and run with Swift 6.4.2 against the macOS 27.2 SDK).

```swift
@available(macOS 27.0, *)
func demo() {
    var a = UniqueArray<Int>(capacity: 4)
    a.append(1)
    a.append(2)
    a.insert(0, at: 0)
    print(a.count, a.capacity, a[0])
    let removed = a.remove(at: 0)
    print(removed, a.span.count)
}
```

## Options / Props

| Member | Signature | Description |
|--------|-----------|-------------|
| `init()` | `init()` | Initializes a new unique array with no elements. |
| `init(capacity:)` | `init(capacity: Int)` | Initializes a new unique array with the specified capacity and no elements. |
| `init(capacity:copying:)` | `init(capacity: Int? = nil, copying contents: some Sequence<Element>)` | Creates a new array with the specified initial capacity, holding a copy of the contents of a given sequence. Requires `Element: Copyable`. |
| `init(capacity:initializingWith:)` | `init<E>(capacity: Int, initializingWith body: @_lifetime(0: copy 0) (inout OutputSpan<Element>) throws(E) -> Void) throws(E) where E : Error` | Creates a new array, directly initializing its storage using an output span. |
| `init(repeating:count:)` | `init(repeating repeatedValue: Element, count: Int)` | Creates a new array containing the specified number of a single, repeated value. Requires `Element: Copyable`. |
| `count` / `capacity` / `freeCapacity` | `var count: Int { get }` etc. | Number of elements / maximum elements without reallocating / additional elements that fit without reallocating. |
| `isEmpty` | `var isEmpty: Bool { get }` | Whether the array contains no elements. |
| `span` | `var span: Span<Element> { get }` | A span over the elements, providing read-only access. |
| `mutableSpan` | `var mutableSpan: MutableSpan<Element> { mutating get }` | A mutable span over the elements. |
| `subscript(_:)` | `subscript(position: Int) -> Element { borrow mutate }` | Accesses the element at the specified position. |
| `append(_:)` | `mutating func append(_ item: consuming Element)` | Adds an element to the end of the array (amortized O(1), geometric growth). |
| `append(addingCount:initializingWith:)` | `mutating func append<E>(addingCount newItemCount: Int, initializingWith initializer: @_lifetime(0: copy 0) (inout OutputSpan<Element>) throws(E) -> Void) throws(E) where E : Error` | Appends items by populating an output span. |
| `append(copying:)` | `mutating func append(copying newElements: UnsafeBufferPointer<Element>)` | Copies the elements of a buffer to the end (overloads exist for span and sequence). Requires `Element: Copyable`. |
| `insert(_:at:)` | `mutating func insert(_ item: consuming Element, at index: Int)` | Inserts a new element at the specified position. |
| `remove(at:)` | `@discardableResult mutating func remove(at index: Int) -> Element` | Removes and returns the element at the specified position. |
| `removeLast()` / `popLast()` | `mutating func popLast() -> Element?` | Removes the last element (`popLast()` returns `nil` when empty). |
| `removeAll()` | `mutating func removeAll()` | Removes all elements, preserving allocated capacity. |
| `reserveCapacity(_:)` | `mutating func reserveCapacity(_ n: Int)` | Ensures capacity for the specified number of elements. |
| `setCapacity(_:)` | `mutating func setCapacity(_ newCapacity: Int)` | Grows or shrinks the capacity without discarding contents. |
| `edit(_:)` | `mutating func edit<E, R>(_ body: @_lifetime(0: copy 0) (inout OutputSpan<Element>) throws(E) -> R) throws(E) -> R where E : Error, R : ~Copyable` | Edits the underlying storage through a mutable `OutputSpan` view. |
| `clone()` | `func clone() -> UniqueArray<Element>` | Copies the contents into a new array with just enough capacity. Requires `Element: Copyable`. |
| `swapAt(_:_:)` | `mutating func swapAt(_ i: Int, _ j: Int)` | Exchanges the values at the specified indices. |
| `Index` | `typealias Index = Int` | An integer offset from the start. |

## Notes

- Available on iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Storage grows automatically on a geometric curve, so an individual `append` can occasionally cost O(n); Apple states this makes the type less suitable where every operation needs predictable cost.
- Apple's overview points to `RigidArray` for a fixed-capacity variant and to the copy-on-write `Array` for copyable elements. A `RigidArray` documentation page was not available at the pinned fetch date (404), so it is not covered here.
- Conforms to `Equatable`, `Hashable`, `Iterable`, `Sendable`, `SendableMetatype`. It is not implicitly copyable; when `Element` is `Copyable`, use `clone()` for an explicit copy.
- The `Element: Copyable` requirement on the copying members is not shown in the DocC declarations; it was confirmed with `swiftc` 6.4.2 (macOS 27.2 SDK), which rejects `clone()`, `init(repeating:count:)` and `append(copying:)` for a noncopyable `Element`. Other `copying:` overloads (`init(capacity:copying:)`, `insert(copying:at:)`, `replaceSubrange(_:copying:)`) were not individually compiled and are assumed to share the requirement.
- Only commonly used members are listed. The full member list (index offsetting, `insert(copying:at:)`, `replaceSubrange` overloads, `removeSubrange`, `isTriviallyIdentical(to:)` etc.) is on the official page.
- Source: https://developer.apple.com/documentation/swift/uniquearray (fetched 2026-11-14)

## Related

- [Array](./array.md)
- [InlineArray](./inlinearray.md)
- [Span](./span.md)
- [MutableSpan](./mutablespan.md)
- [OutputSpan](./outputspan.md)
- [Iterable](../protocols-generics/iterable.md)
