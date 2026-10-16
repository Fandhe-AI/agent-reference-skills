# Panic

Rust provides a mechanism to prevent a function from returning normally, and instead "panic," which is a response to an error condition that is typically not expected to be recoverable within the context in which the error is encountered. Some language constructs, such as out-of-bounds array indexing, panic automatically. The standard library can panic explicitly via the `panic!` macro.

## Signature / Usage

The `panic_handler` attribute can only be applied to a function with signature `fn(&PanicInfo) -> !`. There must be a single `panic_handler` function in the dependency graph.

```rust
#![no_std]

use core::fmt::{self, Write};
use core::panic::PanicInfo;

struct Sink {
    // ..
}

#[panic_handler]
fn panic(info: &PanicInfo) -> ! {
    let mut sink = Sink::new();

    // logs "panicked at '$reason', src/main.rs:27:4" to some `sink`
    let _ = writeln!(sink, "{}", info);

    loop {}
}
```

(`Sink` and its `fmt::Write` impl are elided here; the original example hides them with `#` lines.)

## Notes

- Source: https://doc.rust-lang.org/reference/panic.html (pinned: https://raw.githubusercontent.com/rust-lang/reference/82da570bafd9efed421bdbae0f8603ede8dd308b/src/panic.md)
- With the `abort` strategy the optimizer may assume unwinding across Rust frames is impossible, which can improve code size and speed.
- Crates built with the `unwind` strategy can use the `abort` panic handler, but the `abort` strategy cannot use the `unwind` panic handler.
- Rust code linked against a different instance of the standard library counts as a "foreign exception".

### Standard behavior

`std` provides two different panic handlers:

- `unwind` — unwinds the stack and is potentially recoverable.
- `abort` — aborts the process and is non-recoverable.

Not all targets may provide the `unwind` handler. The handler used when linking with `std` can be set with the `-C panic` CLI flag (default for most targets is `unwind`). Runtime behavior can be modified with `std::panic::set_hook`. Linking a `no_std` binary, dylib, cdylib, or staticlib requires specifying your own panic handler.

### Panic strategy

The panic strategy defines the kind of panic behavior that a crate is built to support, chosen with `-C panic`. When generating a binary, dylib, cdylib, or staticlib and linking with `std`, the flag also influences which panic handler is used.

### Unwinding

- The `unwind` handler unwinds Rust frames until the panic reaches the point of recovery (e.g. a thread boundary); live objects implementing `Drop` have their `drop` methods called.
- `unwind` does not guarantee all panics are recoverable, only that panicking via `panic!` and similar standard library mechanisms is.
- The standard library provides `std::panic::catch_unwind` (recovery within the panicking thread) and `std::thread::spawn` (sets up panic recovery for the spawned thread).

#### Unwinding across FFI boundaries

Unwinding across FFI boundaries is possible with an appropriate ABI declaration (e.g. `extern "C-unwind"`). Unwinding with the wrong ABI is undefined behavior:

- Causing an unwind into Rust code from a foreign function called via a declaration or pointer with a non-unwinding ABI such as `"C"` or `"system"`.
- Calling a Rust `extern` function that unwinds from code that does not support unwinding (e.g. GCC/Clang with `-fno-exceptions`).

Catching a foreign unwinding operation (e.g. a C++ exception) with `catch_unwind`, `JoinHandle::join`, or by letting it propagate beyond `main()` or the thread root either aborts the process or returns a `Result::Err` containing an opaque type; which one is unspecified. There are no guarantees about a foreign runtime disposing of or rethrowing a Rust panic payload.

## Related

- [runtime.md](./runtime.md)
- [abi.md](./abi.md)
- [unsafety.md](./unsafety.md)
- [behavior-considered-undefined.md](./behavior-considered-undefined.md)
