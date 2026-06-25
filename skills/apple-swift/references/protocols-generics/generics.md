# Generics

Swift's generics enable writing flexible, reusable functions and types that work with any type, subject to requirements you define.

## Signature / Usage

### Generic Functions

```swift
func swapValues<T>(_ a: inout T, _ b: inout T) {
    let temp = a; a = b; b = temp
}
```

### Generic Types

```swift
struct Stack<Element> {
    private var items: [Element] = []

    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element     { items.removeLast() }
    var top: Element?                  { items.last }
}

var stack = Stack<Int>()
stack.push(1); stack.push(2)
print(stack.pop())  // 2
```

### Type Constraints

```swift
func findIndex<T: Equatable>(of value: T, in array: [T]) -> Int? {
    array.firstIndex(where: { $0 == value })
}
```

### Associated Types

```swift
protocol Container {
    associatedtype Item
    var count: Int { get }
    subscript(i: Int) -> Item { get }
    mutating func append(_ item: Item)
}
```

### Where Clauses

```swift
func allItemsMatch<C1: Container, C2: Container>(_ c1: C1, _ c2: C2) -> Bool
    where C1.Item == C2.Item, C1.Item: Equatable
{
    guard c1.count == c2.count else { return false }
    return (0..<c1.count).allSatisfy { c1[$0] == c2[$0] }
}
```

## Notes

- Type parameters (e.g., `<T>`) are resolved at compile time — no runtime overhead versus concrete types
- `associatedtype` declares a placeholder type within a protocol; conforming types provide the concrete type
- Use `where` clauses to express same-type (`==`) and conformance (`:`) requirements on associated types
- Generic extensions can add conditional conformances: `extension Array: Equatable where Element: Equatable`
- Primary associated types (Swift 5.7+) allow constrained existentials: `any Collection<Int>`

## Related

- [some-any-opaque-types](./some-any-opaque-types.md)
- [Sequence](./sequence.md)
- [Collection](./collection.md)
