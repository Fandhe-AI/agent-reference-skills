# Protocols & Generics

| Name | Description | Path |
|------|-------------|------|
| Equatable | Value equality via `==` and `!=`; automatic synthesis for structs/enums | [equatable.md](./equatable.md) |
| Hashable | Hashable values usable in `Set` and as `Dictionary` keys; refines `Equatable` | [hashable.md](./hashable.md) |
| Comparable | Ordered comparison via `<`; enables `sorted()`, `min()`, `max()` | [comparable.md](./comparable.md) |
| Identifiable | Stable identity via an `id` property; used heavily in SwiftUI | [identifiable.md](./identifiable.md) |
| Codable | Typealias for `Encodable & Decodable`; JSON/property-list serialization | [codable.md](./codable.md) |
| Encodable | Encode a type to an external representation | [encodable.md](./encodable.md) |
| Decodable | Decode a type from an external representation | [decodable.md](./decodable.md) |
| CaseIterable | Provides `allCases` collection for enums without associated values | [caseiterable.md](./caseiterable.md) |
| RawRepresentable | Conversion between a type and its raw value (`rawValue`, `init?(rawValue:)`) | [rawrepresentable.md](./rawrepresentable.md) |
| Sequence | Sequential, single-pass iteration; foundation for `map`, `filter`, `reduce` | [sequence.md](./sequence.md) |
| Collection | Multi-pass, index-based sequence; foundation for `Array`, `Set`, `Dictionary` | [collection.md](./collection.md) |
| IteratorProtocol | One-at-a-time element supply via `next() -> Element?` | [iteratorprotocol.md](./iteratorprotocol.md) |
| CustomStringConvertible | Custom `description` string used by `print` and `String(describing:)` | [customstringconvertible.md](./customstringconvertible.md) |
| Error | Marker protocol for throwable error values; pairs with `throw`/`catch` | [error.md](./error.md) |
| ExpressibleByLiteral | Family of protocols enabling literal initialization (`42`, `"str"`, `[…]`) | [expressiblebyliteral.md](./expressiblebyliteral.md) |
| Generics | Generic functions, types, `associatedtype`, type constraints, `where` clauses | [generics.md](./generics.md) |
| some / any — Opaque and Existential Types | `some` for opaque return types; `any` for existential (heterogeneous) types | [some-any-opaque-types.md](./some-any-opaque-types.md) |
