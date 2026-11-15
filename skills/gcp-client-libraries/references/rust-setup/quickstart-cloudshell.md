---
source: https://docs.cloud.google.com/rust/docs/quickstart-cloudshell
---

# Set up Rust on Cloud Shell

Configure the Rust toolchain in Cloud Shell and run a Secret Manager sample with the Cloud Client Libraries for Rust.

## Signature / Usage

### Start Cloud Shell

In the Google Cloud console select or create a project (billing enabled), then click **Activate Cloud Shell**. Authorize Cloud Shell if prompted.

### Configure Rust

Cloud Shell includes `rustup` preinstalled.

```bash
rustup default stable
cargo --version
```

### Enable the API, create the crate, add dependencies

```bash
gcloud services enable secretmanager.googleapis.com
cargo new my-project
cd my-project
cargo add google-cloud-secretmanager-v1 google-cloud-gax
cargo add tokio --features macros,rt-multi-thread
```

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

### Run

```bash
PROJECT_ID=$(gcloud config get project)
cargo run -- "${PROJECT_ID}"
```

The program prints the names of the secrets in the project.

## Notes

- Unlike the local quickstart, no `gcloud auth application-default login` step appears here; Cloud Shell credentials are used after you authorize Cloud Shell.
- Clean up: delete test secrets and remove `my-project` from the Cloud Shell home directory.
- Source: https://docs.cloud.google.com/rust/docs/quickstart-cloudshell (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart.md](./quickstart.md)
- [initialize-client.md](./initialize-client.md)
