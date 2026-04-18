# Embedded Rust (The Embedded Rust Book)

Reference for bare-metal embedded development with Rust. Source: https://doc.rust-lang.org/embedded-book/

| Name | Description | Path |
|------|-------------|------|
| Introduction | Book overview, target audience, prerequisites, related resources | [./intro.md](./intro.md) |
| Installation | Rust targets, cargo-binutils, cargo-generate, OS-specific setup | [./installation.md](./installation.md) |
| no_std Environment | bare-metal vs hosted, libcore vs libstd, constraints and capabilities | [./no-std.md](./no-std.md) |
| Memory-Mapped Registers | PAC read/write/modify, micro-architecture crate, HAL crate abstraction layers | [./memory-mapped-registers.md](./memory-mapped-registers.md) |
| Peripherals | Memory-mapped peripheral model, aliasing problem, singleton pattern | [./peripherals.md](./peripherals.md) |
| Static Guarantees | Typestate programming, design contracts, zero-cost compile-time safety | [./static-guarantees.md](./static-guarantees.md) |
| Portability | embedded-hal traits, M+N complexity reduction, HAL/driver/application roles | [./portability.md](./portability.md) |
| Concurrency | Interrupts, static mut races, critical sections, atomics, mutexes, RTIC | [./concurrency.md](./concurrency.md) |
| Collections | alloc crate (heap) vs heapless (fixed-capacity), trade-offs for real-time | [./collections.md](./collections.md) |
| Design Patterns | HAL design checklist, typestate/builder, pin erasure, C-FREE destructor | [./design-patterns.md](./design-patterns.md) |
| Tips for Embedded C Developers | Cargo features vs #ifdef, iterators, volatile, repr(C/packed), inline | [./tips-for-embedded-c-devs.md](./tips-for-embedded-c-devs.md) |
| Interoperability | FFI with C, bindgen, cc crate, #[no_mangle] extern "C", cbindgen | [./interoperability.md](./interoperability.md) |
| Unsorted Topics | Speed vs size optimization, opt-level profiles, inline threshold tuning | [./unsorted.md](./unsorted.md) |
| Appendix | Glossary, target triple reference, key crates, further reading | [./appendix.md](./appendix.md) |
