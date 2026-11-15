---
source: https://docs.cloud.google.com/rust/docs/override-default-endpoint
---

# Override the default endpoint

The client libraries configure each service's endpoint automatically. Override it with `with_endpoint` on the client builder to use regional endpoints, private access options, or locational endpoints in services that support them.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-secretmanager-v1 google-cloud-gax
```

### Default endpoint

```rust
pub use google_cloud_gax::paginator::ItemPaginator;
pub use google_cloud_secretmanager_v1::client::SecretManagerService;
```

```rust
let client = SecretManagerService::builder().build().await?;
```

```rust
let mut items = client
    .list_secrets()
    .set_parent(format!("projects/{project_id}"))
    .by_item();
println!("listing all secrets in project {project_id}");
while let Some(secret) = items.next().await.transpose()? {
    println!("  {secret:?}");
}
println!("DONE");
```

### Regional endpoint

The sample function takes `project_id` and `region` (for example `us-central1`).

```rust
let client = SecretManagerService::builder()
    .with_endpoint(format!("https://secretmanager.{region}.rep.googleapis.com"))
    .build()
    .await?;
```

```rust
let mut items = client
    .list_secrets()
    .set_parent(format!("projects/{project_id}/locations/{region}"))
    .by_item();
println!("listing all secrets in project {project_id} and region {region}");
while let Some(secret) = items.next().await.transpose()? {
    println!("  {secret:?}");
}
println!("DONE");
```

## Notes

- The code blocks are fragments of one async function (`pub async fn sample(project_id: &str, region: &str) -> anyhow::Result<()>`); the function-signature blocks are omitted.
- The regional example uses Secret Manager's regional endpoint pattern `secretmanager.{region}.rep.googleapis.com`. Other services have their own endpoint hostnames.
- `with_endpoint` is a `ClientBuilder` method (google-cloud-gax 1.15.0). Its doc comment examples use `http://private.googleapis.com`; use `https://` for real endpoints and reserve plain `http://` for a local emulator.
- Related universe-domain setting: see `configure-client.md`.
- Source: https://docs.cloud.google.com/rust/docs/override-default-endpoint (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/client_builder.rs (retrieved 2026-11-16; google-cloud-gax 1.15.0)

## Related

- [configure-client.md](./configure-client.md)
- [initialize-client.md](./initialize-client.md)
