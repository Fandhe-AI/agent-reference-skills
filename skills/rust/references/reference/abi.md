# Application Binary Interface (ABI)

The ABI governs how functions are called at the binary level: calling conventions, symbol names, and data layout for cross-language interoperability.

## ABI Strings

Specify the calling convention on `extern` functions and blocks:

| ABI String | Description |
|------------|-------------|
| `"Rust"` | Default Rust ABI (unstable, may change between compiler versions) |
| `"C"` | Platform default C calling convention |
| `"C-unwind"` | C calling convention that allows Rust panics to unwind through |
| `"system"` | Platform system calling convention (= `"stdcall"` on x86 Windows, `"C"` elsewhere) |
| `"cdecl"` | x86 C declaration convention |
| `"stdcall"` | x86 Windows stdcall |
| `"fastcall"` | x86 fastcall |
| `"win64"` | x86-64 Windows calling convention |
| `"sysv64"` | x86-64 System V AMD64 ABI |
| `"aapcs"` | ARM calling convention |
| `"efiapi"` | UEFI calling convention |
| `"custom"` | Unknown custom ABI (`unsafe extern "custom"`); stable since 1.100; only callable via inline assembly |

```rust
extern "C" fn c_function(x: i32) -> i32 { x }

unsafe extern "C" {
    fn puts(s: *const i8) -> i32;
}
```

`extern fn` without an ABI string defaults to `"C"`.

## Unwinding ABIs

ABIs come in **unwinding** and **non-unwinding** variants:
- **Unwinding**: `"Rust"`, `"C-unwind"`, `"system-unwind"`, etc. — permit Rust panics to cross the boundary.
- **Non-unwinding**: `"C"`, `"system"`, etc. — if a Rust panic reaches this boundary with `panic=unwind`, the process **aborts**.

Use `"C-unwind"` (and similar `-unwind` variants) when calling foreign code that may propagate unwinding back into Rust.

## ABI-Related Attributes

### `#[unsafe(no_mangle)]`

Disables symbol name mangling. The exported name equals the function/static identifier.

```rust
#[unsafe(no_mangle)]
pub extern "C" fn my_function() {}
```

Requires `unsafe(...)` in the 2024 edition. Implies `pub`-like visibility for linking.

### `#[unsafe(export_name = "name")]`

Sets the exported symbol name to an arbitrary string.

```rust
#[unsafe(export_name = "my_exported_sym")]
pub fn internal_name() {}
```

### `#[unsafe(link_section = "section")]`

Places the function or static in the specified object file section.

```rust
#[unsafe(link_section = ".my_section")]
pub static DATA: u32 = 42;
```

### `#[used]`

Prevents the linker from removing a `static` item, even if it appears unreferenced.

```rust
#[used]
static CALLBACK_TABLE: [fn(); 4] = [f, g, h, k];
```

## `repr` and Data Layout for FFI

Use `#[repr(C)]` to give structs and enums a stable, C-compatible layout:

```rust
#[repr(C)]
struct Point { x: f64, y: f64 }

#[repr(C)]
enum Status { Ok = 0, Err = 1 }
```

Use `#[repr(transparent)]` for newtype wrappers that must be ABI-compatible with the inner type:

```rust
#[repr(transparent)]
struct Fd(i32);  // same ABI as i32
```

Use `#[repr(u8)]` / `#[repr(i32)]` etc. to specify the discriminant type for enums in FFI.

## Function Pointers

Function pointer types encode the ABI:

```rust
let fp: extern "C" fn(i32) -> i32 = c_function;
```

Calling a function through a pointer of the wrong type or ABI is **undefined behavior**.

## Symbol Visibility

By default, Rust symbols are mangled and not exported to C. To export:
- `#[unsafe(no_mangle)]` — export with the unmangled name
- `#[unsafe(export_name = "...")]` — export with a custom name
- `pub extern "C" fn ...` — make callable from C with the right ABI

## Notes

- The `"Rust"` ABI is **not stable** across compiler versions; never rely on it for FFI.
- Symbol collisions caused by `no_mangle` or `export_name` produce undefined behavior.
- `link_section` requires the programmer to ensure the section name is valid on all target platforms.

### `repr(C)` field-less enums

For a field-less enum with the `C` representation, the discriminant values must either all be representable by the `int` type in the target platform's C ABI or all by its `unsigned int` type; it has the same size and alignment as a C enum with the same discriminant values and no fixed underlying type. `rustc` accepts enums that do not meet this requirement but lints against them (this will become an error in the future). For maximum portability, prefer a primitive representation (such as `repr(u8)`) on the Rust side and a fixed underlying type (introduced in C23) on the C side. A field-less enum with a primitive representation has the same size and alignment as that primitive type. `repr(Rust)` enums with no variants are zero sized (and uninhabited).

- Source: https://doc.rust-lang.org/reference/type-layout.html (pinned: https://raw.githubusercontent.com/rust-lang/reference/e24eecf97b0c9a6dbac67191098204dc8a190aaa/src/type-layout.md, reference@e24eecf, retrieved 2026-11-14)

### `extern "custom"` (stable in 1.100)

An `extern "custom"` function has an unknown, custom ABI; the only way to call it is via inline assembly. It must be `unsafe`, have no parameters, and return the unit type (return type omitted or written explicitly as `()`; a type alias is rejected). Its definition must be a naked function. The `safe` qualifier is rejected in `extern "custom"` blocks, and the `cold` attribute may not be applied to an `extern "custom"` function.

Adapted (not in the official docs): the fence below is the `increment` function of the official example, without the calling `asm!` block and doc comment.

```rust
# #[cfg(target_arch = "x86_64")] {
# use core::arch::naked_asm;
#[unsafe(naked)]
unsafe extern "custom" fn increment() {
    naked_asm!(
        "add rax, 1",
        "ret",
    )
}
# }
```

- The example above is shortened from the official one (calling `asm!` block and doc comment omitted).
- Source: https://doc.rust-lang.org/reference/items/functions.html#extern-custom (pinned: https://raw.githubusercontent.com/rust-lang/reference/e24eecf97b0c9a6dbac67191098204dc8a190aaa/src/items/functions.md, reference@e24eecf, retrieved 2026-11-14)
- Source: https://doc.rust-lang.org/reference/items/external-blocks.html (pinned: https://raw.githubusercontent.com/rust-lang/reference/e24eecf97b0c9a6dbac67191098204dc8a190aaa/src/items/external-blocks.md)

## Related

- [linkage.md](./linkage.md)
- [items.md](./items.md)
- [unsafety.md](./unsafety.md)
- [inline-assembly.md](./inline-assembly.md)
