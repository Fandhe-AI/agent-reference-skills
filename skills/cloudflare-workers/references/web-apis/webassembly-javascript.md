---
source: https://developers.cloudflare.com/workers/runtime-apis/webassembly/javascript/
---

# Wasm in JavaScript

Wasm can be used from a JavaScript or TypeScript Worker by importing a Wasm module and instantiating it with `WebAssembly.instantiate()`. Useful for computationally intensive operations that do not involve significant I/O.

## Signature / Usage

Example WebAssembly Text Format module (`;;` denotes a comment):

```txt
;; src/simple.wat
(module
  ;; Import a function from JavaScript named `imported_func`
  ;; which takes a single i32 argument and assign to
  ;; variable $i
  (func $i (import "imports" "imported_func") (param i32))
  ;; Export a function named `exported_func` which takes a
  ;; single i32 argument and returns an i32
  (func (export "exported_func") (param $input i32) (result i32)
    ;; Invoke `imported_func` with $input as argument
    local.get $input
    call $i
    ;; Return $input
    local.get $input
    return
  )
)
```

Convert with `wat2wasm`:

```sh
wat2wasm src/simple.wat -o src/simple.wasm
```

Use from JavaScript:

```typescript
import mod from "./simple.wasm";

// Define imports available to Wasm instance.
const importObject = {
	imports: {
		imported_func: (arg: number) => {
			console.log(`Hello from JavaScript: ${arg}`);
		},
	},
};

// Create instance of WebAssembly Module `mod`, supplying
// the expected imports in `importObject`. This should be
// done at the top level of the script to avoid instantiation on every request.
const instance = await WebAssembly.instantiate(mod, importObject);

export default {
	async fetch() {
		// Invoke the `exported_func` from our Wasm Instance with
		// an argument.
		const retval = instance.exports.exported_func(42);
		// Return the return value!
		return new Response(`Success: ${retval}`);
	},
};
```

## Notes

- In practice you would compile a language of your choice directly to the WebAssembly Binary Format (`.wasm`), not write WAT.
- Wrangler bundles any Wasm module ending in `.wasm` or `.wasm?module` using a default bundling rule customizable in the Wrangler configuration file.
- When invoked, the Worker logs `Hello from JavaScript: 42` and returns `Success: 42`.
- Many languages provide a `bindgen` (for example Rust `wasm-bindgen`) to simplify JS/Wasm interaction. To write an entire Worker in Rust, use the `workers-rs` crate.

## Related

- [WebAssembly (Wasm)](./webassembly.md)
- [Web standards](./web-standards.md)
