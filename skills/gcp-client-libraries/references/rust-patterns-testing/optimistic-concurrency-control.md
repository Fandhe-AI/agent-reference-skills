---
source: https://docs.cloud.google.com/rust/docs/optimistic-concurrency-control
---

# Optimistic concurrency control with etags (Rust)

Optimistic concurrency control (OCC) prevents lost updates when several processes modify the same resource. The server returns an `etag` (a fingerprint that changes on every modification) on read, and you send it back on write. If it no longer matches, the write fails and you re-read, re-apply and retry.

## Signature / Usage

### Dependency

```bash
cargo add google-cloud-secretmanager-v1
```

### OCC loop updating an IAM policy on a secret

Grants `member` the `roles/secretmanager.secretAccessor` role.

```rust
use google_cloud_gax::error::rpc::Code;
use google_cloud_iam_v1::model::Binding;
use google_cloud_iam_v1::model::Policy;
use google_cloud_secretmanager_v1::client::SecretManagerService;
use google_cloud_wkt::FieldMask;

/// Executes an Optimistic Concurrency Control (OCC) loop to safely update a resource.
///
/// This function demonstrates the core Read-Modify-Write-Retry pattern. It uses the secret manager
/// service and a hard-coded role. The principles apply to any other service or role.
///
/// # Parameters
/// * `project_id` The Google Cloud Project ID (e.g., "my-project-123").
/// * `secret_id` The Google Cloud Project ID (e.g., "my-secret").
/// * `member` The member to add (e.g., "user:user@example.com").
///
/// # Returns
/// The new IAM policy.
pub async fn sample(project_id: &str, secret_id: &str, member: &str) -> anyhow::Result<Policy> {
    const ROLE: &str = "roles/secretmanager.secretAccessor";
    const ATTEMPTS: u32 = 5;

    let secret_name = format!("projects/{project_id}/secrets/{secret_id}");
    let client = SecretManagerService::builder().build().await?;
    for _attempt in 0..ATTEMPTS {
        let mut current = client
            .get_iam_policy()
            .set_resource(&secret_name)
            .send()
            .await?;

        match current.bindings.iter_mut().find(|b| b.role == ROLE) {
            None => current
                .bindings
                .push(Binding::new().set_role(ROLE).set_members([member])),
            Some(b) => {
                if b.members.iter().any(|m| m == member) {
                    return Ok(current);
                }
                b.members.push(member.to_string());
            }
        };
        let updated = client
            .set_iam_policy()
            .set_resource(&secret_name)
            .set_policy(current)
            .set_update_mask(FieldMask::default().set_paths(["bindings"]))
            .send()
            .await;
        match updated {
            Ok(p) => return Ok(p),
            Err(e)
                if e.status().is_some_and(|s| {
                    s.code == Code::Aborted || s.code == Code::FailedPrecondition
                }) =>
            {
                continue;
            }
            Err(e) => return Err(e.into()),
        }
    }
    anyhow::bail!("could not set IAM policy after {ATTEMPTS} attempts")
}
```

## Notes

- Loop steps: Read (fetch the resource including its `etag`), Modify (change the local struct), Write and check (save with the existing `etag`; check for concurrency error codes), Success or retry (exit on success; on a concurrency error increment the counter and restart from Read).
- If the stored `etag` differs from the one you sent, the write fails with `ABORTED` or `FAILED_PRECONDITION`. The example retries only on `Code::Aborted` and `Code::FailedPrecondition`; every other error is returned.
- Bound the loop (the example uses `ATTEMPTS = 5`) to avoid infinite loops under high contention.
- The same pattern applies to any service that implements versioned updates, not only Secret Manager / IAM.
- The page also shows the loop body as a bare fragment and a step table with inline snippets; both duplicate the complete function above and are omitted.
- Source inconsistency: the doc comment describes `secret_id` as "The Google Cloud Project ID (e.g., "my-secret")"; it is the secret ID. Kept verbatim.
- The source's `cargo add` lists only `google-cloud-secretmanager-v1`; the sample's imports also need `google-cloud-gax`, `google-cloud-iam-v1`, `google-cloud-wkt` and `anyhow` (derived from the `use` lines, not stated in the source).
- Applies to `google-cloud-gax` 1.15.0 / `google-cloud-wkt` 1.11.0 (`rust_version` 1.91.0). The `google-cloud-iam-v1` and `google-cloud-secretmanager-v1` versions are not pinned in the page.
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://docs.cloud.google.com/rust/docs/optimistic-concurrency-control (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [update-field-mask.md](./update-field-mask.md)
- [mocking.md](./mocking.md)
