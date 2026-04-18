# The Rustonomicon (Unsafe Rust)

Reference distilled from [The Rustonomicon](https://doc.rust-lang.org/nomicon/) — the dark arts of Unsafe Rust.

| Name | Description | Path |
|------|-------------|------|
| Meet Safe and Unsafe | The two Rust languages, the five unsafe superpowers, and the safe/unsafe boundary | [meet-safe-and-unsafe.md](./meet-safe-and-unsafe.md) |
| Data Layout | Memory representation: alignment, padding, `repr` attributes, niche optimization | [data-layout.md](./data-layout.md) |
| Ownership | Ownership, moves, borrows, lifetimes, borrow-checker rules, variance | [ownership.md](./ownership.md) |
| Type Conversions | Coercions, `as` casts, and `mem::transmute` — safety rules and UB risks | [conversions.md](./conversions.md) |
| Working with Uninitialized Memory | `MaybeUninit`, `ptr::write`/`ptr::read`, safe initialization patterns | [uninitialized.md](./uninitialized.md) |
| Ownership Based Resource Management | RAII/OBRM, `Drop` semantics, drop order, `mem::forget`, leaking | [ownership-based-resource-management.md](./ownership-based-resource-management.md) |
| Unwinding | Panics, exception safety, RAII guards, `catch_unwind`, FFI boundary rules | [unwinding.md](./unwinding.md) |
| Concurrency and Races | Data races vs. race conditions, `Send`/`Sync`, `Mutex` poisoning | [concurrency.md](./concurrency.md) |
| Implementing Vec | End-to-end `Vec<T>`: allocation, push/pop, `Drop`, iterators, ZSTs | [implementing-vec.md](./implementing-vec.md) |
| Implementing Arc and Mutex | `Arc<T>` with atomic ref-counting; `UnsafeCell` for `Mutex<T>` | [implementing-arc-and-mutex.md](./implementing-arc-and-mutex.md) |
| Foreign Function Interface | `extern "C"`, callbacks, `repr(C)`, linking, calling conventions, unwinding | [ffi.md](./ffi.md) |
| Beneath std | `#![no_std]`, panic handler, `eh_personality`, custom allocators | [beneath-std.md](./beneath-std.md) |
| Other reprs | `repr(C)`, `repr(u*)`, `repr(transparent)`, `repr(packed)`, `repr(align(n))` | [other-reprs.md](./other-reprs.md) |
| Atomics | Memory orderings (Relaxed/Acquire/Release/SeqCst), happens-before, C++20 model | [atomics.md](./atomics.md) |
