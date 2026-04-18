# Rust by Example

Reference files distilled from [Rust by Example](https://doc.rust-lang.org/rust-by-example/). One file per top-level section.

| Name | Description | Path |
|------|-------------|------|
| Hello World | Entry point, `println!` macro, compilation | [01-hello-world.md](./01-hello-world.md) |
| Primitives | Scalar types, arrays, tuples, type inference | [02-primitives.md](./02-primitives.md) |
| Custom Types | `struct`, `enum`, `const`, `static` | [03-custom-types.md](./03-custom-types.md) |
| Variable Bindings | `let`, mutability, shadowing, scope, freezing | [04-variable-bindings.md](./04-variable-bindings.md) |
| Types | Casting (`as`), literals, inference, type aliasing | [05-types.md](./05-types.md) |
| Conversion | `From`/`Into`, `TryFrom`/`TryInto`, `ToString`/`FromStr` | [06-conversion.md](./06-conversion.md) |
| Expressions | Statements vs expressions, blocks as expressions | [07-expressions.md](./07-expressions.md) |
| Flow of Control | `if/else`, `loop`, `while`, `for`, `match`, `if let`, `let else` | [08-flow-of-control.md](./08-flow-of-control.md) |
| Functions | Functions, closures, methods, HOFs, diverging functions | [09-functions.md](./09-functions.md) |
| Modules | `mod`, visibility, `use`, `super`/`self`, file hierarchy | [10-modules.md](./10-modules.md) |
| Crates | Compilation unit, library vs binary, `--crate-type` | [11-crates.md](./11-crates.md) |
| Cargo | Package manager, `Cargo.toml`, dependencies, build scripts | [12-cargo.md](./12-cargo.md) |
| Attributes | `#[...]`, `derive`, `cfg`, `dead_code`, crate attributes | [13-attributes.md](./13-attributes.md) |
| Generics | Type parameters, bounds, `where`, associated types, PhantomData | [14-generics.md](./14-generics.md) |
| Scoping Rules | RAII, ownership/moves, borrowing, lifetimes | [15-scoping-rules.md](./15-scoping-rules.md) |
| Traits | Trait definition, `derive`, operator overloading, `impl Trait`, supertraits | [16-traits.md](./16-traits.md) |
| macro_rules! | Declarative macros, designators, overloading, repetition | [17-macros.md](./17-macros.md) |
| Error Handling | `panic!`, `Option`, `Result`, `?`, `Box<dyn Error>`, custom errors | [18-error-handling.md](./18-error-handling.md) |
| Std Library Types | `Box`, `Vec`, `String`, `HashMap`, `HashSet`, `Rc`, `Arc` | [19-std-library-types.md](./19-std-library-types.md) |
| Std Misc | Threads, channels, file I/O, child processes, filesystem | [20-std-misc.md](./20-std-misc.md) |
| Testing | Unit tests, integration tests, doc tests, assert macros | [21-testing.md](./21-testing.md) |
| Unsafe Operations | Raw pointers, unsafe functions, mutable statics, FFI | [22-unsafe-operations.md](./22-unsafe-operations.md) |
| Compatibility | Editions, raw identifiers (`r#`), `cargo fix --edition` | [23-compatibility.md](./23-compatibility.md) |
| Meta | `rustdoc`, doc comments, benchmarking, Playground integration | [24-meta.md](./24-meta.md) |
