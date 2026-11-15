---
source: https://docs.cloud.google.com/rust/docs/update-field-mask
---

# Update resources with field masks (Rust)

A `FieldMask` (from the `google-cloud-wkt` crate) lists the field paths an update operation modifies, so the Cloud Client Libraries for Rust can change specific fields without replacing the whole resource. The guide uses Secret Manager, but the same concepts apply to other services.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-secretmanager-v1 google-cloud-wkt anyhow
cargo add tokio --features macros,rt-multi-thread
```

### Create a secret, then update `labels` and `annotations`

```rust
use google_cloud_secretmanager_v1::client::SecretManagerService;
use google_cloud_secretmanager_v1::model::replication::Automatic;
use google_cloud_secretmanager_v1::model::{Replication, Secret};
use google_cloud_wkt::FieldMask;
use std::collections::HashMap;

pub async fn sample(project_id: &str) -> anyhow::Result<()> {
    let client = SecretManagerService::builder().build().await?;

    let secret = client
        .create_secret()
        .set_parent(format!("projects/{project_id}"))
        .set_secret_id("your-secret")
        .set_secret(
            Secret::new().set_replication(Replication::new().set_automatic(Automatic::new())),
        )
        .send()
        .await?;
    println!("CREATE = {secret:?}");

    let tag = |mut labels: HashMap<_, _>, msg: &str| {
        labels.insert("updated".to_string(), msg.to_string());
        labels
    };

    let update = client
        .update_secret()
        .set_secret(
            Secret::new()
                .set_name(&secret.name)
                .set_etag(secret.etag)
                .set_labels(tag(secret.labels, "your-label"))
                .set_annotations(tag(secret.annotations, "your-annotations")),
        )
        .set_update_mask(FieldMask::default().set_paths(["annotations", "labels"]))
        .send()
        .await?;
    println!("UPDATE = {update:?}");

    Ok(())
}
```

### The mask itself

```rust
.set_update_mask(FieldMask::default().set_paths(["annotations", "labels"]))
```

Expected output confirms both fields changed:

```text
labels: {"updated": "your-label"},
...
annotations: {"updated": "your-annotations"},
```

## Notes

- A `FieldMask` holds symbolic field paths that identify which fields an update modifies or a read returns.
- On update, the service changes only the listed fields and ignores values on unlisted fields in the request message.
- If you omit the field mask on an update request, the operation applies to all mutable fields.
- To reset a field to its default value, include its path in the mask and leave that field at its default value on the resource struct.
- The example passes the current `etag` (`set_etag(secret.etag)`) to prevent overwriting concurrent updates; see `optimistic-concurrency-control.md`.
- Prerequisites: set up a Rust environment (`rust/docs/quickstart`), and enable the Secret Manager API and configure authentication (`secret-manager/docs/create-secret-quickstart`).
- Clean up: delete `your-secret` afterwards to avoid charges and `ALREADY_EXISTS` errors on later runs (`secret-manager/docs/delete-secrets`).
- Applies to the Rust crates at the pinned release (`google-cloud-wkt` 1.11.0, `rust_version` 1.91.0). The `google-cloud-secretmanager-v1` version is not pinned in the page.
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill). Product-specific Secret Manager usage is outside this skill.
- Source: https://docs.cloud.google.com/rust/docs/update-field-mask (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [optimistic-concurrency-control.md](./optimistic-concurrency-control.md)
- [mocking.md](./mocking.md)
