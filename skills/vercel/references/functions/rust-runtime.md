# Rust Runtime

Rust runtime (Beta, all plans) for high-performance, memory-safe functions. Runs on Fluid compute. Each file in `api/` becomes a function.

## Signature / Usage

```toml
# Cargo.toml
[package]
name = "rust-hello-world"
version = "0.1.0"
edition = "2024"

[dependencies]
tokio = { version = "1", features = ["full"] } # async runtime
vercel_runtime = { version = "2" } # handles communicating with Vercel's function bridge
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# Each handler has to be specified as [[bin]]
# Note that you need to provide unique names for each binary
[[bin]]
name = "hello"
path = "api/hello.rs"

# This section configures settings for the release profile, which optimizes the build for performance.
[profile.release]
codegen-units = 1
lto = "fat"
opt-level = 3
```

```rust
// api/hello.rs
use serde_json::{Value, json};
use vercel_runtime::{Error, Request, run, service_fn};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let service = service_fn(handler);
    run(service).await
}

async fn handler(_req: Request) -> Result<Value, Error> {
    Ok(json!({
        "message": "Hello, world!",
    }))
}
```

## Deployment

```bash
vercel deploy
```

For prebuilt deployments, optimize `.vercelignore`:

```bash
# Ignore everything in the target directory except for release binaries
target/**
!target/release
!target/x86_64-unknown-linux-gnu/release/**
!target/aarch64-unknown-linux-gnu/release/**
```

## Notes

- Place `Cargo.toml` in the project root; each handler must be declared as a uniquely named `[[bin]]`
- Deploy by pushing to a connected GitHub repository or with the Vercel CLI
- Templates: Rust Hello World, Rust Axum, and `vercel/examples` (`main/rust`)

## Related

- [go-runtime.md](./go-runtime.md)
- [wasm-runtime.md](./wasm-runtime.md)
- [fluid-compute.md](./fluid-compute.md)
- [runtimes.md](./runtimes.md)
