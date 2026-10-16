# Library Crate (google-workspace)

Core Rust library for interacting with Google Workspace APIs via the Discovery Service. It provides the foundational types and utilities used by the `google-workspace-cli` (`gws`) command-line tool, and can be used independently for programmatic access.

## Signature / Usage

```rust
use google_workspace::discovery::fetch_discovery_document;
use google_workspace::services::resolve_service;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let (api, version) = resolve_service("drive").unwrap();
    let doc = fetch_discovery_document(api, version, None).await?;

    println!("{} {} — {} resources",
        doc.name, doc.version,
        doc.resources.len(),
    );
    Ok(())
}
```

## Options / Props

| Module | Description |
|---|---|
| `discovery` | Discovery Document types (`RestDescription`, `RestMethod`, etc.) and async fetch with optional disk caching |
| `services` | Service registry mapping aliases (e.g., `drive`) to API name/version pairs |
| `error` | Structured `GwsError` enum with exit codes and JSON serialization |
| `validate` | Input validation: path safety, resource name checks, URL encoding |
| `client` | HTTP client builder with automatic retry logic |

## Notes

- Dynamic Discovery: the library fetches Google's Discovery Documents at runtime rather than relying on generated client crates. When Google adds or updates an API endpoint, your code picks it up automatically.
- Licensed under Apache-2.0.
- Source: https://github.com/googleworkspace/cli/blob/v0.22.5/crates/google-workspace/README.md

## Related

- [discovery-cache.md](./discovery-cache.md)
- [command-structure.md](./command-structure.md)
