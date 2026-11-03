---
source: https://developers.cloudflare.com/workers/runtime-apis/webassembly/
---

# WebAssembly (Wasm)

WebAssembly lets you compile languages like Rust, Go, or C to a binary format that runs in Workers. Use it to execute non-JavaScript code via `WebAssembly.instantiate()`, or to write an entire Worker in Rust using bindings to Workers' JavaScript APIs.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/runtime-apis/webassembly/javascript/#simple-wasm-module.

```sh
wat2wasm src/simple.wat -o src/simple.wasm
```

See [Wasm in JavaScript](./webassembly-javascript.md) for the full example.

## Notes

- `WebAssembly.instantiate()` only supports pre-compiled modules (see Web standards: `WebAssembly.compile`, `compileStreaming`, `instantiate` with a buffer, and `instantiateStreaming` are not allowed).
- Supported proposals: in general Workers supports the same features as Google Chrome. SIMD is supported. Threading is not possible: each Worker runs in a single thread and the Web Worker API is not supported.
- Binary size: Wasm Workers are typically larger than equivalent JavaScript Workers, which can lengthen startup time. Use tools like `wasm-opt` to optimize binary size.
- WASI (WebAssembly System Interface) support is experimental, with only some syscalls implemented (open source implementation: https://github.com/cloudflare/workers-wasi).

## Related

- [Wasm in JavaScript](./webassembly-javascript.md)
- [Web standards](./web-standards.md)
