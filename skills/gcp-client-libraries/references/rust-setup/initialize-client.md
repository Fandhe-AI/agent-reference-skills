---
source: https://docs.cloud.google.com/rust/docs/initialize-client
---

# Initialize a client

Client structs are the main interface to Google Cloud services, with one method per RPC. To initialize one, call `builder()` on the client struct to obtain a `ClientBuilder` and then call `build()`.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-secretmanager-v1 google-cloud-gax anyhow
cargo add tokio --features macros,rt-multi-thread
```

### Import the client type

```rust
use google_cloud_secretmanager_v1::client::SecretManagerService;
```

### Build with the default configuration

```rust
let client = SecretManagerService::builder().build().await?;
```

### Complete program

```rust
pub async fn initialize_client(project_id: &str) -> anyhow::Result<()> {
    use google_cloud_secretmanager_v1::client::SecretManagerService;

    // Initialize a client with the default configuration. This is an
    // asynchronous operation that may fail, as it requires acquiring an an
    // access token.
    let client = SecretManagerService::builder().build().await?;

    // Once initialized, use the client to make requests.
    use google_cloud_gax::paginator::Paginator as _;
    let mut items = client
        .list_locations()
        .set_name(format!("projects/{project_id}"))
        .by_page();
    while let Some(page) = items.next().await {
        let page = page?;
        for location in page.locations {
            println!("{}", location.name);
        }
    }

    Ok(())
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let project_id = std::env::args().nth(1).unwrap();

    initialize_client(&project_id).await
}
```

Output resembles `projects/PROJECT_NUMBER/locations/europe-west8`, one line per supported location.

## Notes

- Prerequisites: a project with the Secret Manager API enabled and Application Default Credentials configured locally (`gcp-foundation` covers ADC setup with gcloud).
- `build()` is async and fallible: it acquires credentials (default credentials, or an access token). `google_cloud_gax::client_builder::Error` exposes `is_default_credentials()`, `is_transport()` and `is_universe_domain_mismatch()` to tell the failure kinds apart.
- `ClientBuilder` is `google_cloud_gax::client_builder::ClientBuilder` (google-cloud-gax 1.15.0). Applications should not create builders directly; use `<Client>::builder()`.
- The twin's step 3 (the `list_locations` loop) is the same code as in the complete program and is omitted.
- Applies to google-cloud-gax 1.15.0 (crates.io).
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://docs.cloud.google.com/rust/docs/initialize-client (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/client_builder.rs (retrieved 2026-11-16; google-cloud-gax 1.15.0)

## Related

- [configure-client.md](./configure-client.md)
- [override-default-authentication.md](./override-default-authentication.md)
- [quickstart.md](./quickstart.md)
