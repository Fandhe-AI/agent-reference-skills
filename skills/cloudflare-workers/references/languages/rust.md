---
source: https://developers.cloudflare.com/workers/languages/rust/
---

# Rust

Write Workers in 100% Rust with the `workers-rs` crate, which exposes Runtime APIs and bindings (KV, R2, Queues, etc.) to Rust code. This page also covers the "Supported crates" page (see Notes).

## Signature / Usage

Prerequisites: a recent Rust, `npm`, the `wasm32-unknown-unknown` target, and `cargo-generate`.

```sh
rustup target add wasm32-unknown-unknown
cargo install cargo-generate
cargo generate cloudflare/workers-rs
npx wrangler dev
npx wrangler deploy
```

Entrypoint in `src/lib.rs`:

```rust
use worker::*;

#[event(fetch)]
async fn main(req: Request, env: Env, ctx: Context) -> Result<Response> {
    Response::ok("Hello, World!")
}
```

Release profile pre-configured by the template for binary size:

```toml
[profile.release]
lto = true
strip = true
codegen-units = 1
```

## Options / Props

`event` macro events:

| Name | Type | Description |
|------|------|-------------|
| `fetch` | event | Invoked by an incoming HTTP request. |
| `scheduled` | event | Invoked by Cron Triggers. |
| `queue` | event | Invoked by incoming message batches from Queues (requires the `queue` feature in `Cargo.toml`; see the `workers-rs` GitHub repository and `queues` feature flag). |
| `start` | event | Invoked when the Worker is first launched (for example, to install panic hooks). |

`fetch` handler arguments (API docs at `docs.rs/worker`):

| Name | Type | Description |
|------|------|-------------|
| `Request` | `worker::Request` | Incoming request: headers, method, path, Cloudflare properties, body (async streaming, JSON via Serde). |
| `Env` | `worker::Env` | Access to bindings (see below). |
| `Context` | `worker::Context` | Access to `waitUntil` and `passThroughOnException`. |

Binding types available from `Env`:

| Name | Type | Description |
|------|------|-------------|
| Secret | `worker::Secret` | Secret from the dashboard or `wrangler secret put`. |
| Var | `worker::Var` | Environment variable defined in `wrangler.toml`. |
| KvStore | `worker::kv::KvStore` | Workers KV namespace binding. |
| ObjectNamespace | `worker::durable::ObjectNamespace` | Durable Object binding. |
| Fetcher | `worker::Fetcher` | Service binding to another Worker. |
| Bucket | `worker::Bucket` | R2 bucket binding. |
| D1Database | `worker::d1::D1Database` | D1 database binding. |
| Queue | `worker::Queue` | Queues producer binding. |
| Ai | `worker::Ai` | Workers AI binding. |
| Hyperdrive | `worker::Hyperdrive` | Hyperdrive binding. |
| AnalyticsEngineDataset | `worker::AnalyticsEngineDataset` | Analytics Engine binding. |
| DynamicDispatcher | `worker::DynamicDispatcher` | Dynamic Dispatch binding. |
| SecretStore | `worker::SecretStore` | Secrets Store binding. |
| RateLimiter | `worker::RateLimiter` | Rate Limiting binding. |

## Notes

- `workers-rs` provides an `event` macro expecting a handler signature identical to JavaScript Workers. `async` is not generally supported by Wasm but works in `workers-rs` via `wasm-bindgen-futures`.
- `Response` is the `fetch` return type and also the return type of subrequests; it supports streaming and Serde JSON deserialization. `Router` provides a routing API to serve multiple paths from one Worker (see the `Router` example in the `workers-rs` repository).
- Project layout from the template: `Cargo.toml` (best-practice Wasm settings), `wrangler.toml` (custom build command invoking `worker-build`), `src` (Hello World Worker).
- How it works: Wasm Workers are invoked from an auto-generated JavaScript entrypoint. `wasm-bindgen` (with `js-sys`) provides the JS interop glue; `wasm-bindgen-futures` converts Rust Futures to JS Promises (the whole handler runs via `spawn_local`); `worker-build` creates the JS entrypoint, bundles/minifies it, and outputs a directory Wrangler can bundle and deploy; `wasm-opt` further reduces binary size.
- Using `wasm-bindgen` without `workers-rs` / `worker-build`: importing a `.wasm` file in Workers gives a `WebAssembly.Module` rather than a `WebAssembly.Instance`, so the emitted JavaScript must be patched. Run `wasm-pack build --target bundler`, then patch the output (assuming `mywasmlib.js`):

```js
import * as imports from "./mywasmlib_bg.js";

// switch between both syntax for node and for workerd
import wkmod from "./mywasmlib_bg.wasm";
import * as nodemod from "./mywasmlib_bg.wasm";
if (typeof process !== "undefined" && process.release.name === "node") {
	imports.__wbg_set_wasm(nodemod);
} else {
	const instance = new WebAssembly.Instance(wkmod, {
		"./mywasmlib_bg.js": imports,
	});
	imports.__wbg_set_wasm(instance.exports);
}

export * from "./mywasmlib_bg.js";
```

  Then import the function in the Worker entrypoint: `import { myFunction } from "path/to/mylib.js";`.
- Unoptimized Rust Wasm binaries can exceed Worker bundle size limits or have long startup times.
- First deploy to `*.workers.dev` may show `523` errors while DNS propagates; they resolve after about a minute.
- Source inconsistencies: the page says "`worker-bundle` automatically invokes `wasm-opt`" (the tool described elsewhere on the page is `worker-build`), and "invokes `web-pack`" (likely webpack/bundler). Reproduced as stated in the docs; the page's examples use `wrangler.toml`.
- Supported crates page (`https://developers.cloudflare.com/workers/languages/rust/crates/`): not exhaustive; many crates compile to `wasm32-unknown-unknown`, sometimes requiring default features disabled or a Wasm-specific feature. New dependencies can significantly increase Worker size.
  - `time`: enable the `wasm-bindgen` feature to obtain timing from JavaScript.
  - `tracing`: use the `tracing-web` crate and the `time` feature of `tracing-subscriber`. Due to timing limitations on Workers, spans have identical start and end times unless they encompass I/O (example: `workers-rs/examples/tracing`).
  - `reqwest`: compiles to Wasm and hooks into JavaScript `fetch` automatically through `wasm-bindgen`.
  - `tokio-postgres`: compiles to Wasm; must be configured to use a `Socket` from `workers-rs` (example: `workers-rs/examples/tokio-postgres`).
  - `hyper`: the lower-level `conn` module works with Workers `Socket`; the higher-level `Client` needs timing dependencies that are not yet Wasm friendly (example: `workers-rs/examples/hyper`).
- Rust language itself: see the rust skill.

## Related

- [typescript.md](./typescript.md)
- [python.md](./python.md)
