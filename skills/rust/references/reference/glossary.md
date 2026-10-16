# Glossary

Definitions of terms used throughout the Rust Reference.

## Signature / Usage

Turbofish: paths with generic parameters in expressions must prefix the opening brackets with `::`.

```rust
let ok_num = Ok::<_, ()>(5);
let vec = [1, 2, 3].iter().map(|n| n * 2).collect::<Vec<_>>();
```

## Options / Props

| Term | Definition |
|------|------------|
| Abstract syntax tree (AST) | Intermediate representation of the program structure while compiling. |
| Alignment | What addresses values are preferred to start at; always a power of two. References to a value must be aligned. |
| Application binary interface (ABI) | Defines how compiled code interacts with other compiled code. ABI strings on `extern` blocks / `extern fn` affect calling convention and unwinding (`"C-unwind"` allows unwinding across FFI, `"C"` does not). |
| Arity | Number of arguments a function or operator takes. |
| Array | Fixed-size / inline collection of elements selected by a runtime-computable index; occupies a contiguous region of memory. |
| Associated item | Item associated with another item; defined in implementations and declared in traits. Only functions, constants, and type aliases. Contrast with free item. |
| Blanket implementation | Any implementation where a type appears uncovered, e.g. `impl<T> Foo for T`. `impl<T> Bar<Vec<T>> for Vec<T>` is not blanket. |
| Bound | Constraint on a type or trait. |
| Combinator | Higher-order function applying only functions and earlier defined combinators to produce a result. |
| Crate | Unit of compilation and linking (library or executable) with a self-contained module tree starting at the crate root. |
| Dispatch | Mechanism to determine which specific code runs under polymorphism (static or dynamic). Rust supports dynamic dispatch via trait objects. |
| Dynamically sized type (DST) | Type without a statically known size or alignment. |
| Entity | Language construct that can be referred to in source, usually via a path: types, items, generic parameters, variable bindings, loop labels, lifetimes, fields, attributes, lints. |
| Expression | Combination of values, constants, variables, operators and functions that evaluate to a single value. |
| Free item | Item that is not a member of an implementation (free function, free const). |
| Fundamental traits | Adding an impl for an existing type is a breaking change. `Fn` traits and `Sized`. |
| Fundamental type constructors | Implementing a blanket implementation over it is a breaking change. `&`, `&mut`, `Box`, `Pin`. |
| Inhabited | Type has constructors and can be instantiated. Opposite of uninhabited. |
| Inherent implementation | Implementation applying to a nominal type, not to a trait-type pair. |
| Inherent method | Method defined in an inherent implementation. |
| Initialized | Variable that has been assigned a value and not since moved from. |
| Local trait | Trait defined in the current crate, independent of applied type arguments. |
| Local type | `struct`, `enum`, or `union` defined in the current crate; `struct Foo` is local, `Vec<Foo>` is not, `LocalType<ForeignType>` is local. Type aliases do not affect locality. |
| Module | Container for zero or more items, organized in a tree from the crate root. |
| Name | Identifier or lifetime/loop label that refers to an entity. |
| Name resolution | Compile-time process of tying paths, identifiers, and labels to entity declarations. |
| Namespace | Logical grouping of declared names by kind of entity. |
| Nominal types | Types referred to by a path directly: enums, structs, unions, trait object types. |
| Dyn-compatible traits | Traits usable in `dyn Trait`; formerly known as object safe traits. |
| Path | Sequence of one or more path segments referring to an entity. |
| Prelude | Small collection of items (mostly traits) imported into every module of every crate. |
| Scope | Region of source text where a named entity may be referenced with that name. |
| Scrutinee | Expression matched on in `match` and similar constructs. |
| Size | Memory required to store a value; also the byte offset between successive array elements. Multiple of the alignment, including zero. |
| Slice | Dynamically-sized view into a contiguous sequence, `[T]`; borrowed as `&[T]` / `&mut [T]`. |
| Statement | Smallest standalone element that commands a computer to perform an action. |
| String literal | String stored in the final binary; type `&'static str`. |
| String slice | `str`; borrowed as `&str` / `&mut str`; always valid UTF-8. |
| Trait | Language item describing functionalities a type must provide. |
| Turbofish | `::<>` syntax for generic paths in expressions. |
| Uncovered type | Type that does not appear as an argument to another type (`T` is uncovered; `T` in `Vec<T>` is covered). |
| Undefined behavior | Compile-time or run-time behavior that is not specified. |
| Uninhabited | Type with no constructors, e.g. `!` or `enum Never { }`. |
| Zero-sized type (ZST) | Type whose size is 0; has at most one possible value (unit type, function items, tuple-like struct/variant constructors, field-less or all-ZST-field structs, zero-length arrays, arrays and unions of ZSTs, etc.). |

## Notes

- The original page's ZST section includes a long `assert_eq!(0, size_of::<...>())` example covering each ZST category; it is not reproduced here.
- Source: https://doc.rust-lang.org/reference/glossary.html (pinned: https://raw.githubusercontent.com/rust-lang/reference/82da570bafd9efed421bdbae0f8603ede8dd308b/src/glossary.md)

## Related

- [names.md](./names.md)
- [type-system.md](./type-system.md)
- [memory-model.md](./memory-model.md)
- [behavior-considered-undefined.md](./behavior-considered-undefined.md)
