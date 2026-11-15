---
source: https://docs.cloud.google.com/rust/docs/override-default-authentication
---

# Override the default authentication method

Clients authenticate with Application Default Credentials (ADC) unless told otherwise. Pass an explicit credentials object to `with_credentials` on the client builder to use an API key or service account impersonation.

## Signature / Usage

### Dependencies

The twin uses the Cloud Natural Language API.

```bash
cargo add google-cloud-language-v2 google-cloud-auth
```

### Default credentials (ADC)

```rust
use google_cloud_language_v2::client::LanguageService;
use google_cloud_language_v2::model::{Document, document::Type};
```

```rust
let client = LanguageService::builder().build().await?;
```

```rust
let response = client
    .analyze_sentiment()
    .set_document(
        Document::new()
            .set_content("Hello World!")
            .set_type(Type::PlainText),
    )
    .send()
    .await?;
println!("response={response:?}");
```

### API keys

The sample function takes the key as `key: &str`. Read it from an environment variable or Secret Manager; do not hard-code it.

```rust
use google_cloud_auth::credentials::api_key_credentials::Builder as ApiKeyCredentialsBuilder;
use google_cloud_language_v2::client::LanguageService;
use google_cloud_language_v2::model::{Document, document::Type};
```

```rust
let credentials = ApiKeyCredentialsBuilder::new(key).build();
```

```rust
let client = LanguageService::builder()
    .with_credentials(credentials)
    .build()
    .await?;
```

### Service account impersonation

The sample function takes `target_principal: &str`, the service account email (for example `my-service-account@my-project.iam.gserviceaccount.com`) or unique numeric ID.

```rust
use google_cloud_auth::credentials::Builder as AdcCredentialsBuilder;
use google_cloud_auth::credentials::impersonated::Builder as ImpersonatedCredentialsBuilder;
use google_cloud_language_v2::client::LanguageService;
use google_cloud_language_v2::model::{Document, document::Type};
```

```rust
let credentials = ImpersonatedCredentialsBuilder::from_source_credentials(
    AdcCredentialsBuilder::default().build()?,
)
.with_target_principal(target_principal)
.build()?;
```

```rust
let client = LanguageService::builder()
    .with_credentials(credentials)
    .build()
    .await?;
```

After either override, call the client as in the default case (`analyze_sentiment()` above).

## Notes

- All code blocks other than the `use` blocks are fragments of an async function returning `anyhow::Result<()>`.
- API keys: only some Cloud APIs support them; the rest require full credentials. An API key associates the request with a project for billing and quota. Keep keys secure in storage and transmission. Read the API key best practices before using them.
- From the source of `api_key_credentials.rs` (not stated in a doc comment): the public `Builder` is `#[derive(Debug)]` and holds the key as `api_key: String`, so the `Debug` output (`{:?}`) of the API key builder can contain the key. Do not log or print the builder.
- Impersonation: you start with an authenticated principal (user or service account) and request short-lived credentials for the target service account. It is more secure than downloading a key for the target account, since no key is held on disk or in memory. The `Builder` also has `with_delegates`, `with_scopes`, `with_quota_project_id` and `with_lifetime` (google-cloud-auth 1.19.0 source).
- Other credential types in `google_cloud_auth::credentials`: `anonymous::Builder` (no authentication needed), `external_account::Builder` (Workload Identity Federation), `service_account` (initialize from a service account key).
- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- Source inconsistency: in the twin's "More Information" list, the "Service Accounts" link points to the impersonated `Builder` docs page, not a service-account page.
- Applies to google-cloud-auth 1.19.0 (crates.io), whose `Cargo.toml` requires Rust 1.91.0.
- Source: https://docs.cloud.google.com/rust/docs/override-default-authentication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.rs/crate/google-cloud-auth/1.19.0/source/src/credentials/impersonated.rs (retrieved 2026-11-16; google-cloud-auth 1.19.0)
- Source: https://docs.rs/crate/google-cloud-auth/1.19.0/source/src/credentials/api_key_credentials.rs (retrieved 2026-11-16; google-cloud-auth 1.19.0)
- Source: https://docs.rs/crate/google-cloud-auth/1.19.0/source/Cargo.toml (retrieved 2026-11-16; google-cloud-auth 1.19.0)

## Related

- [configure-client.md](./configure-client.md)
- [initialize-client.md](./initialize-client.md)
