---
source: https://docs.cloud.google.com/rust/docs/mocking
---

# Write tests using a mock client (Rust)

Stub a real client implementation and inject a mock for unit tests that make no network calls and incur no billing. Define a mock struct implementing the client's `stub` trait, set expectations, and build the client with `from_stub`. The guide uses `mockall` and the `Speech` client, but the concepts apply to all clients.

## Signature / Usage

### Dependencies

```bash
cargo add --dev mockall
cargo add google-cloud-speech-v2 google-cloud-lro
```

### Imports and the function under test

```rust
use google_cloud_gax as gax;
use google_cloud_speech_v2 as speech;

// An example application function.
//
// It makes an RPC, setting some field. In this case, it is the `GetRecognizer`
// RPC, setting the name field.
//
// It processes the response from the server. In this case, it extracts the
// display name of the recognizer.
async fn my_application_function(client: &speech::client::Speech) -> gax::Result<String> {
    client
        .get_recognizer()
        .set_name("invalid-test-recognizer")
        .send()
        .await
        .map(|r| r.display_name)
}
```

### Define the mock, set expectations, build the client

The mock implements the `speech::stub::Speech` trait. `mockall::mock!` prepends `Mock` to the struct name.

```rust
mockall::mock! {
    #[derive(Debug)]
    Speech {}
    impl speech::stub::Speech for Speech {
        async fn get_recognizer(&self, req: speech::model::GetRecognizerRequest, _options: gax::options::RequestOptions) -> gax::Result<gax::response::Response<speech::model::Recognizer>>;
    }
}
```

```rust
let mut mock = MockSpeech::new();
mock.expect_get_recognizer()
    .withf(move |r, _|
        // Optionally, verify fields in the request.
        r.name == "invalid-test-recognizer")
    .return_once(|_, _| {
        Ok(gax::response::Response::from(
            speech::model::Recognizer::new().set_display_name("test-display-name"),
        ))
    });

let client = speech::client::Speech::from_stub(mock);
let display_name = my_application_function(&client).await?;
assert_eq!(display_name, "test-display-name");
```

### Simulate errors

Return an error from the mock instead of a response.

```rust
mock.expect_get_recognizer().return_once(|_, _| {
    // This time, return an error.
    use gax::error::Error;
    use gax::error::rpc::{Code, Status};
    let status = Status::default()
        .set_code(Code::NotFound)
        .set_message("Resource not found");
    Err(Error::service(status))
});
```

## Notes

- A client built with `from_stub()` does not have an internal retry loop; it returns all errors from the stub directly to the application.
- Several mocking frameworks exist for Rust; this guide uses `mockall` as a development dependency.
- The blocks above are fragments of one test; the full source file is `guide/samples/tests/mocking.rs` in `google-cloud-rust` on GitHub (not fetched here).
- The `use google_cloud_gax as gax` line needs `google-cloud-gax` as a direct dependency (derived from the imports; not in the source's `cargo add`).
- Applies to `google-cloud-gax` 1.15.0 (`rust_version` 1.91.0); the `google-cloud-speech-v2` version is not pinned in the page.
- The twin shows these snippets as indented blocks; consecutive snippets are joined into single fences here, with their lines unchanged.
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill). The Storage-specific mocking guide belongs to `gcp-storage`.
- Source: https://docs.cloud.google.com/rust/docs/mocking (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [mocking-lros.md](./mocking-lros.md)
- [update-field-mask.md](./update-field-mask.md)
