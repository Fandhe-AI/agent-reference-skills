# The Rust Reference

Chapter-level reference distilled from [The Rust Reference](https://doc.rust-lang.org/reference/).

| Name | Description | Path |
|------|-------------|------|
| Notation | Grammar notation conventions (BNF-like syntax, hard cut operator, repetitions) | [notation.md](./notation.md) |
| Lexical Structure | Input format, tokens, identifiers, keywords, literals, comments, whitespace | [lexical-structure.md](./lexical-structure.md) |
| Macros | `macro_rules!` (matchers, repetitions, hygiene, export) and procedural macros (function-like, derive, attribute) | [macros.md](./macros.md) |
| Crates and Source Files | Crate definition, `main` function, `Termination`, crate attributes | [crates-and-source-files.md](./crates-and-source-files.md) |
| Conditional Compilation | `#[cfg]`, `cfg!`, `#[cfg_attr]`, `cfg_select!`, compiler-set configuration options | [conditional-compilation.md](./conditional-compilation.md) |
| Items | All item types: modules, functions, structs, enums, traits, impls, statics, consts, extern blocks, use, extern crate | [items.md](./items.md) |
| Attributes | Attribute syntax, inner/outer attributes, all built-in attributes, tool attributes | [attributes.md](./attributes.md) |
| Statements and Expressions | Let statements, expression statements, place/value expressions, operator precedence, move/copy semantics | [statements-and-expressions.md](./statements-and-expressions.md) |
| Patterns | All pattern types: literal, identifier, wildcard, rest, range, reference, struct, tuple, slice, path, or-patterns; refutability | [patterns.md](./patterns.md) |
| Type System | Primitive types, sequences, pointers, traits, type layout (`repr`), subtyping, variance, interior mutability | [type-system.md](./type-system.md) |
| Special Types and Traits | `Box`, `Rc`, `Arc`, `Pin`, `UnsafeCell`, `PhantomData`, `Copy`, `Clone`, `Drop`, `Send`, `Sync`, `Sized`, auto traits | [special-types-and-traits.md](./special-types-and-traits.md) |
| Names | Entities, scopes (item, pattern, generic, lifetime, loop label, prelude), paths, namespaces, visibility | [names.md](./names.md) |
| Memory Model | Abstract bytes, ownership, borrowing rules, aliasing, stack/heap, interior mutability, provenance | [memory-model.md](./memory-model.md) |
| Linkage | Crate types (bin, lib, rlib, dylib, staticlib, cdylib, proc-macro), dependency resolution, native library linking | [linkage.md](./linkage.md) |
| Unsafety | `unsafe fn`, `unsafe {}`, `unsafe trait`, `unsafe impl`, `unsafe extern`, unsafe attributes, unsafe operations | [unsafety.md](./unsafety.md) |
| Constant Evaluation | Const contexts, `const fn`, allowed constant expressions, const generics, compile-time errors | [const-evaluation.md](./const-evaluation.md) |
| Behavior Considered Undefined | Complete UB list: data races, dangling pointers, aliasing violations, invalid values, uninitialized memory, wrong ABI | [behavior-considered-undefined.md](./behavior-considered-undefined.md) |
| ABI | ABI strings (`"C"`, `"Rust"`, etc.), unwinding variants, `no_mangle`, `export_name`, `link_section`, `repr` for FFI | [abi.md](./abi.md) |
| Inline Assembly | `asm!`, `naked_asm!`, `global_asm!`; operand types (in/out/inout/const/sym/label); register classes; options | [inline-assembly.md](./inline-assembly.md) |
| The Rust Runtime | `#[global_allocator]`, `#[panic_handler]`, `Termination`, `no_std`, `#[windows_subsystem]`, panic strategies | [runtime.md](./runtime.md) |
| Influences | Languages that influenced Rust: SML/OCaml, C++, Haskell, Cyclone, Erlang, Scheme, Swift, C#, Ruby | [influences.md](./influences.md) |
