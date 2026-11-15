---
source: https://docs.cloud.google.com/rust/docs/pagination
---

# Pagination (Rust)

Services return large lists in pages with a continuation token. The Rust client libraries provide adapters, `ItemPaginator` (`by_item`) and `Paginator` (`by_page`), that turn list RPCs into asynchronous iterators. They can also be converted to `futures::Stream`.

## Signature / Usage

### Dependencies

```bash
cargo add google-cloud-secretmanager-v1
```

### Iterate items

Bring `ItemPaginator` into scope, then call `by_item`.

```rust
use google_cloud_gax::paginator::ItemPaginator as _;
```

```rust
let mut list = client
    .list_secrets()
    .set_parent(format!("projects/{project_id}"))
    .by_item();
while let Some(secret) = list.next().await {
    let secret = secret?;
    println!("  secret={}", secret.name)
}
```

### Iterate pages

Use pages when you need extra page information or need to checkpoint progress across processes. Bring `Paginator` into scope, then call `by_page`.

```rust
use google_cloud_gax::paginator::Paginator as _;
```

```rust
let mut list = client
    .list_secrets()
    .set_parent(format!("projects/{project_id}"))
    .by_page();
while let Some(page) = list.next().await {
    let page = page?;
    println!("  next_page_token={}", page.next_page_token);
    page.secrets
        .into_iter()
        .for_each(|secret| println!("    secret={}", secret.name));
}
```

### Convert to `futures::Stream`

Enable the `unstable-stream` feature of `google-cloud-gax` and add `futures`. The feature name signals that these APIs are unstable; use them only if you can deal with breaks from incompatible changes to the `futures::Stream` trait.

```bash
cargo add google-cloud-gax --features unstable-stream
```

```bash
cargo add futures
```

```rust
use futures::stream::StreamExt;
use google_cloud_gax::paginator::ItemPaginator as _;
```

```rust
let list = client
    .list_secrets()
    .set_parent(format!("projects/{project_id}"))
    .by_item()
    .into_stream();
list.map(|secret| -> gax::Result<()> {
    println!("  secret={}", secret?.name);
    Ok(())
})
.fold(Ok(()), async |acc, result| -> gax::Result<()> {
    acc.and(result)
})
.await?;
```

`Paginator` converts the same way: `by_page().into_stream()`, then `list.enumerate().map(|(index, page)| ...)` as in the source.

### Resume by setting the next page token

After an interrupted list, set the page token to resume from a specific page.

```rust
let page = client
    .list_secrets()
    .set_parent(format!("projects/{project_id}"))
    .send()
    .await;
let page = page?;
let mut next_page_token = page.next_page_token.clone();
page.secrets
    .into_iter()
    .for_each(|secret| println!("    secret={}", secret.name));

while !next_page_token.is_empty() {
    println!("  next_page_token={next_page_token}");

    let page = client
        .list_secrets()
        .set_parent(format!("projects/{project_id}"))
        .set_page_token(next_page_token)
        .send()
        .await;
    let page = page?;
    next_page_token = page.next_page_token.clone();

    page.secrets
        .into_iter()
        .for_each(|secret| println!("    secret={}", secret.name));
}
```

## Notes

- The adapters exist for list RPCs defined by AIP-4233 whose method follows AIP-158 (each call returns a page of resource items and a token for the next page). Most Google Cloud services do; if a service does not, you must implement your own adapter.
- Source inconsistency: the twin's prose says the `unstable-streams` feature, but its `cargo add` command and the crate (`google-cloud-gax` 1.15.0, `paginator.rs`) use `unstable-stream`. This page follows the crate.
- Source inconsistency: the twin links its setup guide at the legacy path `rust/quickstart`; the current page is `rust/docs/quickstart` (see the `rust-setup` category).
- Fragments: the code blocks above are fragments that assume a `client` (`SecretManagerService`) and `project_id` inside an `async` function returning a `Result`; the stream blocks use an undeclared `gax::` alias (the source's alias for the `google_cloud_gax` crate).
- The "Prerequisites" of the source: enable Secret Manager, log in, and have the required permissions.
- The `use google_cloud_gax::…` lines need `google-cloud-gax` as a direct dependency (`cargo add google-cloud-gax`); the source adds it only in the stream section (derived from the imports).
- Applies to google-cloud-gax 1.15.0 (`rust_version` 1.91.0).
- Source: https://docs.cloud.google.com/rust/docs/pagination (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-gax/1.15.0/source/src/paginator.rs (retrieved 2026-11-16; pinned at google-cloud-gax 1.15.0)

## Related

- [error-handling.md](./error-handling.md)
- [configure-retry-policies.md](./configure-retry-policies.md)
