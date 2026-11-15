---
source: https://docs.cloud.google.com/rust/docs/quickstart
---

# Get started with Rust (quickstart)

Set up a local Rust environment, add the Secret Manager client library and list the secrets in a project with a small binary crate.

## Signature / Usage

### Prerequisites

- Rust installed (verify with `cargo --version`) and an editor or IDE.
- A Google Cloud project with billing enabled.
- The Google Cloud CLI installed and initialized (active account and default project).

```bash
cargo --version
```

### Create the project

```bash
cargo new my-project
cd my-project
```

### Enable the API and add crates

```bash
gcloud services enable secretmanager.googleapis.com
cargo add google-cloud-secretmanager-v1
cargo add google-cloud-gax
cargo add tokio --features macros,rt-multi-thread
```

`google-cloud-gax` supplies the pagination helpers; `tokio` is the async runtime.

### `src/main.rs`

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    use google_cloud_gax::paginator::ItemPaginator as _;
    use google_cloud_secretmanager_v1::client::SecretManagerService;
    let project_id = std::env::args().nth(1).unwrap();
    let client = SecretManagerService::builder().build().await?;

    let mut items = client
        .list_secrets()
        .set_parent(format!("projects/{project_id}"))
        .by_item();
    while let Some(item) = items.next().await {
        println!("{}", item?.name);
    }
    Ok(())
}
```

### Build and run

```bash
cargo build
gcloud auth application-default login
PROJECT_ID=$(gcloud config get project)
cargo run -- "${PROJECT_ID}"
```

The program prints the names of the secrets (names only, not payloads). If the project has none, create a secret and run again.

## Notes

- `gcloud auth application-default login` configures Application Default Credentials for local development. ADC setup with gcloud is covered by `gcp-foundation`; the `gcloud` commands by `gcp-cli`.
- Clean up: delete test secrets and remove the local `my-project` directory.
- The same pattern applies to other services; product-specific usage is in `gcp-run` and `gcp-storage`.
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://docs.cloud.google.com/rust/docs/quickstart (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart-cloudshell.md](./quickstart-cloudshell.md)
- [initialize-client.md](./initialize-client.md)
- [supported-rust-versions.md](./supported-rust-versions.md)
