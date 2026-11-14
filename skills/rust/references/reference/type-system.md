# Type System

Every value in Rust has a type that defines how memory is interpreted and which operations are valid. Types are checked at compile time.

## Type Categories

### Primitive Types

| Type | Description |
|------|-------------|
| `bool` | Boolean: `true` or `false` |
| `char` | Unicode scalar value (4 bytes) |
| `i8`, `i16`, `i32`, `i64`, `i128`, `isize` | Signed integers |
| `u8`, `u16`, `u32`, `u64`, `u128`, `usize` | Unsigned integers |
| `f32`, `f64` | IEEE 754 floating-point |
| `str` | UTF-8 string slice (DST) |
| `!` | Never type — no values; for diverging computations; stable since 1.100 (`Infallible` is now an alias for `!`) |

### Sequence Types

| Type | Description |
|------|-------------|
| `(T, U, ...)` | Tuple — fixed-size, mixed types |
| `[T; N]` | Array — fixed-size, same type, N known at compile time |
| `[T]` | Slice — dynamically sized view into a sequence |

### User-Defined Types

| Type | Description |
|------|-------------|
| `struct` | Named product type |
| `enum` | Sum type with variants |
| `union` | Overlapping fields (C-compatible) |

Nominal types can be recursive if the recursion chain includes a pointer:

```rust
enum List<T> {
    Nil,
    Cons(T, Box<List<T>>),
}
```

### Function Types

| Type | Description |
|------|-------------|
| Function item | Zero-sized type of a specific function |
| Function pointer `fn(T) -> U` | Coercion target for function items and non-capturing closures |
| Closure | Unique anonymous type capturing its environment |

### Pointer Types

| Type | Description |
|------|-------------|
| `&T` | Shared reference — non-null, aligned, valid |
| `&mut T` | Exclusive (mutable) reference |
| `*const T` | Raw const pointer — no safety guarantees |
| `*mut T` | Raw mutable pointer |
| `Box<T>` | Owned heap pointer with unique ownership |

### Trait Types

| Type | Description |
|------|-------------|
| `dyn Trait` | Trait object — dynamic dispatch via vtable |
| `impl Trait` | Opaque type satisfying a trait (position-dependent) |

## Type Layout

### Primitives

| Type | Size (bytes) |
|------|-------------|
| `bool`, `i8`, `u8` | 1 |
| `i16`, `u16` | 2 |
| `i32`, `u32`, `f32`, `char` | 4 |
| `i64`, `u64`, `f64` | 8 |
| `i128`, `u128` | 16 |
| `isize`, `usize`, pointers | Platform (4 or 8) |

### `#[repr]` Attribute

Controls type layout:

| Repr | Effect |
|------|--------|
| `#[repr(Rust)]` | Default — compiler may reorder fields |
| `#[repr(C)]` | C-compatible layout, fields in declaration order |
| `#[repr(u8)]` / `#[repr(i32)]` / etc. | Primitive discriminant for enums |
| `#[repr(transparent)]` | Single-field wrapper has same layout as the field |
| `#[repr(packed)]` | Remove inter-field padding (alignment = 1) |
| `#[repr(packed(N))]` | Reduce alignment to N |
| `#[repr(align(N))]` | Raise alignment to N (power of 2) |

```rust
#[repr(C)]
struct ThreeInts {
    first: i16,   // offset 0
    second: i8,   // offset 2
    third: i32,   // offset 4 (padded)
}                 // size = 8

#[repr(transparent)]
struct Wrapper(u32);  // same layout as u32

#[repr(u8)]
enum Status { OK = 0, Error = 1 }
```

## Subtyping and Variance

Subtyping in Rust is restricted to **lifetimes** and **higher-ranked types**.

`'long: 'short` means `'long` outlives `'short`, so `&'long T` is a subtype of `&'short T`.

### Variance Rules

| Type | Variance in `'a` | Variance in `T` |
|------|-----------------|----------------|
| `&'a T` | covariant | covariant |
| `&'a mut T` | covariant | **invariant** |
| `*const T` | — | covariant |
| `*mut T` | — | **invariant** |
| `[T]`, `[T; N]` | — | covariant |
| `fn(T) -> U` | — | T contravariant, U covariant |
| `UnsafeCell<T>` | — | **invariant** |
| `PhantomData<T>` | — | covariant |
| `dyn Trait<T> + 'a` | covariant | **invariant** |

For user-defined types (struct/enum/union), variance is derived from field positions. If a parameter appears in positions with conflicting variances, it becomes invariant.

## Interior Mutability

**Interior mutability** allows mutating data through a shared reference (`&T`). The only sound foundation is `UnsafeCell<T>`, which opts the contained value out of the compiler's aliasing assumptions.

Safe abstractions over `UnsafeCell<T>`:

| Type | Mechanism |
|------|-----------|
| `Cell<T>` | Copy-in/copy-out, single-threaded |
| `RefCell<T>` | Runtime borrow checks, single-threaded |
| `Mutex<T>` / `RwLock<T>` | OS locking, multi-threaded |
| `Atomic*` types | Atomic operations, multi-threaded |

```rust
use std::cell::RefCell;

let data = RefCell::new(vec![1, 2, 3]);
data.borrow_mut().push(4);  // mutation through shared ref
```

## Dynamically Sized Types (DSTs)

Types whose size is not known at compile time. Cannot be used directly in most positions — must be behind a pointer.

DSTs: `str`, `[T]`, `dyn Trait`, structs whose last field is a DST.

The `Sized` trait is automatically implemented for all types with known compile-time size. Use `?Sized` to relax this bound:

```rust
fn print_len<T: ?Sized>(val: &T) where T: std::fmt::Debug {
    println!("{:?}", val);
}
```

## Type Inference

Rust infers types from context. Use `_` to ask the compiler to infer a specific type:

```rust
let v: Vec<_> = iter.collect();
let x = "hello".parse::<i32>();
```

## Notes

### Never type (stable in 1.100)

The never type `!` can be used in any type position (before 1.100 it could only appear as a function return type). Expressions of type `!` can be coerced into any type. The standard library type `Infallible` is a type alias for `!`. The never type fallback is `!` on all editions.

```rust
fn always_ok() -> Result<u32, !> {
    Ok(42)
}
```

- Source: https://doc.rust-lang.org/reference/types/never.html (pinned: https://raw.githubusercontent.com/rust-lang/reference/e24eecf97b0c9a6dbac67191098204dc8a190aaa/src/types/never.md, reference@e24eecf, retrieved 2026-11-14)
- Release note: https://github.com/rust-lang/rust/blob/1.100.0/RELEASES.md ("Stabilize never type", `Infallible` is now a type alias to `!`, never type fallback changed to `!` on all editions)

## Related

- [special-types-and-traits.md](./special-types-and-traits.md)
- [items.md](./items.md)
- [memory-model.md](./memory-model.md)
- [unsafety.md](./unsafety.md)
