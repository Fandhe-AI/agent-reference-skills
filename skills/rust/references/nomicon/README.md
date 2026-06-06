# The Rustonomicon (Unsafe Rust)

Reference distilled from [The Rustonomicon](https://doc.rust-lang.org/nomicon/) — the dark arts of Unsafe Rust.

| Name | Description | Path |
|------|-------------|------|
| Atomics | Rust's atomic types provide lock-free, thread-safe operations. | [atomics.md](./atomics.md) |
| Beneath std | Building Rust programs that do not depend on the standard library (`#![no_std]`). | [beneath-std.md](./beneath-std.md) |
| Concurrency and Races | Rust's ownership system prevents data races at compile time. | [concurrency.md](./concurrency.md) |
| Data Layout | Covers how Rust represents types in memory. | [data-layout.md](./data-layout.md) |
| Foreign Function Interface (FFI) | FFI enables calling C libraries from Rust and exposing Rust functions to C… | [ffi.md](./ffi.md) |
| Implementing Arc and Mutex | A guided implementation of `Arc<T>` demonstrating how to combine raw… | [implementing-arc-and-mutex.md](./implementing-arc-and-mutex.md) |
| Implementing Vec | A guided walk-through of building `Vec<T>` from scratch using stable Rust. | [implementing-vec.md](./implementing-vec.md) |
| Meet Safe and Unsafe | Rust contains two programming languages: Safe Rust and Unsafe Rust. | [meet-safe-and-unsafe.md](./meet-safe-and-unsafe.md) |
| Other reprs | Alternative `#[repr(...)]` attributes beyond the default `repr(Rust)`. | [other-reprs.md](./other-reprs.md) |
| Ownership | Rust's ownership system provides complete memory safety without a garbage… | [ownership.md](./ownership.md) |
| Ownership Based Resource Management (OBRM / RAII) | OBRM is the Rust pattern where acquiring a resource means creating an… | [ownership-based-resource-management.md](./ownership-based-resource-management.md) |
| Type Conversions | Rust provides multiple mechanisms for converting between types. | [conversions.md](./conversions.md) |
| Unwinding | When Rust code panics, the thread unwinds: it walks back through the call… | [unwinding.md](./unwinding.md) |
| Working with Uninitialized Memory | All runtime-allocated memory begins life as uninitialized. | [uninitialized.md](./uninitialized.md) |
