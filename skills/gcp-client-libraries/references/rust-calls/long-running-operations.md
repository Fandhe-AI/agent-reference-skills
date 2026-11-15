---
source: https://docs.cloud.google.com/rust/docs/long-running-operations
---

# Long-running operations (Rust)

Some Google Cloud API methods return an `Operation` resource instead of blocking. The Cloud Client Libraries for Rust provide the `Poller` trait (crate `google-cloud-lro`) to poll automatically until completion, to inspect intermediate progress, or you can poll manually with `get_operation`.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-storage google-cloud-lro google-cloud-longrunning anyhow
cargo add tokio --features full
```

The examples call the Cloud Storage rename folder operation and share these declarations:

```rust
use anyhow::anyhow;
use google_cloud_longrunning as longrunning;
use google_cloud_storage::client::StorageControl;
```

### Automatically poll until done

Call `poller()` then `until_done()` on the request builder. The poller starts the LRO, polls according to the client's backoff and error policies, and resolves to the final response.

```rust
pub async fn automatic(bucket: &str, folder: &str, dest: &str) -> anyhow::Result<()> {
    use google_cloud_lro::Poller;

    let client = StorageControl::builder().build().await?;

    let response = client
        .rename_folder()
        .set_name(format!("projects/_/buckets/{bucket}/folders/{folder}"))
        .set_destination_folder_id(dest)
        .poller()
        .until_done()
        .await?;

    println!("LRO completed, response={response:?}");

    Ok(())
}
```

### Poll with intermediate results

`until_done` omits intermediate metadata. To see progress, call `poll` in a loop; the loop controls the delay between polling attempts, so choose one suited to the expected duration.

Adapted (not in the official docs): the completed result is propagated with `?` so a failed operation is returned to the caller instead of ending in `Ok(())`.

```rust
pub async fn polling(bucket: &str, folder: &str, dest: &str) -> anyhow::Result<()> {
    use google_cloud_lro::{Poller, PollingResult};

    let client = StorageControl::builder().build().await?;

    let mut poller = client
        .rename_folder()
        .set_name(format!("projects/_/buckets/{bucket}/folders/{folder}"))
        .set_destination_folder_id(dest)
        .poller();

    while let Some(p) = poller.poll().await {
        match p {
            PollingResult::Completed(r) => {
                let response = r?;
                println!("LRO completed, response={response:?}");
            }
            PollingResult::InProgress(m) => {
                println!("LRO in progress, metadata={m:?}");
            }
            PollingResult::PollingError(e) => {
                println!("Transient error polling the LRO: {e}");
            }
        }
        tokio::time::sleep(std::time::Duration::from_millis(500)).await;
    }

    Ok(())
}
```

### Poll manually

Start the LRO with `send` to obtain the initial `Operation`, then loop: check `operation.done`; inspect `operation.result` (an `Option`, because some operations such as deletions return no payload); handle `longrunning::model::operation::Result::Error(Status)`; unpack `Response(any)` with `any.to_msg::<Folder>()`; add a wildcard arm because enums are `#[non_exhaustive]`; while not done, optionally unpack `operation.metadata`; sleep; refresh with `get_operation().set_name(&operation.name)`.

For brevity, the source's loop sleeps a fixed 500 ms and ignores `get_operation` errors. In production code, use truncated exponential backoff, distinguish unrecoverable errors from transient ones, and enforce a maximum attempt or time limit (the source's own note).

Adapted (not in the official docs): the loop's `anyhow::Result<Folder>` is propagated with `?` so a failed operation is returned to the caller instead of ending in `Ok(())`.

```rust
pub async fn manual(bucket: &str, folder: &str, dest: &str) -> anyhow::Result<()> {
    use google_cloud_storage::model::Folder;
    use google_cloud_storage::model::RenameFolderMetadata;

    let client = StorageControl::builder().build().await?;

    let operation = client
        .rename_folder()
        .set_name(format!("projects/_/buckets/{bucket}/folders/{folder}"))
        .set_destination_folder_id(dest)
        .send()
        .await?;
    println!("LRO started, response={operation:?}");

    let mut operation = operation;
    let response: anyhow::Result<Folder> = loop {
        if operation.done {
            match &operation.result {
                None => {
                    break Err(anyhow!("missing result for finished operation"));
                }
                Some(r) => {
                    break match r {
                        longrunning::model::operation::Result::Error(s) => {
                            Err(anyhow!("operation completed with error {s:?}"))
                        }
                        longrunning::model::operation::Result::Response(any) => {
                            let response = any.to_msg::<Folder>()?;
                            Ok(response)
                        }
                        _ => Err(anyhow!("unexpected result branch {r:?}")),
                    };
                }
            }
        }
        if let Some(any) = &operation.metadata {
            let metadata = any.to_msg::<RenameFolderMetadata>()?;
            println!("LRO in progress, metadata={metadata:?}");
        }
        tokio::time::sleep(std::time::Duration::from_millis(500)).await;
        if let Ok(attempt) = client
            .get_operation()
            .set_name(&operation.name)
            .send()
            .await
        {
            operation = attempt;
        }
    };
    let response = response?;
    println!("LRO completed, response={response:?}");

    Ok(())
}
```

## Options / Props

`google_cloud_lro` items (google-cloud-lro 1.12.0).

| Name | Kind | Description |
| --- | --- | --- |
| `Poller<ResponseType, MetadataType>` | trait | `poll()` queries the current status and returns `Option<PollingResult<..>>`; `until_done(self)` polls until completion and returns `Result<ResponseType>`; `into_stream(self)` requires the `unstable-stream` feature of `google-cloud-lro` (`cargo add google-cloud-lro --features unstable-stream`), separate from the `google-cloud-gax` feature of the same name used by the paginators. |
| `PollingResult::InProgress(Option<MetadataType>)` | enum variant | Operation still in progress; may carry progress metadata. |
| `PollingResult::Completed(Result<ResponseType>)` | enum variant | Operation completed, with its result. |
| `PollingResult::PollingError(Error)` | enum variant | Error while polling. Some are transient (for example no connection); others never recover, such as `NOT_FOUND`, `ABORTED` or `PERMISSION_DENIED`. |

## Notes

- Prerequisites in the source: a billing-enabled project, a Cloud Storage bucket with hierarchical namespace enabled, a source folder, and a role such as Storage Admin (`roles/storage.admin`). Product specifics belong to `gcp-storage`.
- Corrected from the official docs: in the polling example the source's `PollingResult::Completed(r)` arm only runs `println!("LRO completed, response={r:?}");`, and the manual example prints `response` and then returns `Ok(())`; both report success to the caller even when the operation failed.
- The `Status` in `operation::Result::Error` can be converted to a client error with `Error::service` (`google_cloud_gax::error::Error`).
- Fragments: the function blocks rely on the declarations block above (`anyhow::anyhow`, `longrunning`, `StorageControl`).
- `Poller::into_stream` is gated on the `unstable-stream` feature declared in the `google-cloud-lro` 1.12.0 `Cargo.toml` (it enables the optional `futures` and `pin-project` dependencies); the `cargo add … --features unstable-stream` command is derived from that `Cargo.toml`, not stated in the docs.
- Applies to google-cloud-lro 1.12.0 and google-cloud-gax 1.15.0 (`rust_version` 1.91.0).
- Source: https://docs.cloud.google.com/rust/docs/long-running-operations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-lro/1.12.0/source/src/lib.rs (retrieved 2026-11-16; pinned at google-cloud-lro 1.12.0)
- Source: https://docs.rs/crate/google-cloud-lro/1.12.0/source/Cargo.toml (retrieved 2026-11-16; pinned at google-cloud-lro 1.12.0)

## Related

- [configure-polling-policies.md](./configure-polling-policies.md)
- [configure-retry-policies.md](./configure-retry-policies.md)
- [error-handling.md](./error-handling.md)
