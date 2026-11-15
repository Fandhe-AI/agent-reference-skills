---
source: https://docs.cloud.google.com/rust/docs/mocking-lros
---

# Mock long-running operations (Rust)

Simulate LRO behavior in unit tests. A stubbed `batch_recognize` returns a `longrunning::model::Operation` rather than the final response, so pack the expected response into `Operation::result` with `done = true`. For manual polling, additionally stub `get_operation` and return partial operations carrying metadata.

## Signature / Usage

Prerequisites: the long-running operations guide and the mock client guide (`mocking.md`).

### Automatic polling: complete test

The application awaits `lro::Poller::until_done()`, so the mock can return the final result directly.

```rust
use gax::Result;
use gax::response::Response;
use google_cloud_gax as gax;
use google_cloud_longrunning as longrunning;
use google_cloud_speech_v2 as speech;
use google_cloud_wkt as wkt;
use longrunning::model::Operation;
use longrunning::model::operation::Result as OperationResult;
use speech::model::{BatchRecognizeRequest, BatchRecognizeResponse};

// Example application code that is under test
mod my_application {
    use super::*;

    // An example application function that automatically polls.
    //
    // It starts an LRO, awaits the result, and processes it.
    pub async fn my_automatic_poller(
        client: &speech::client::Speech,
        project_id: &str,
    ) -> Result<Option<wkt::Duration>> {
        use google_cloud_lro::Poller;
        client
            .batch_recognize()
            .set_recognizer(format!(
                "projects/{project_id}/locations/global/recognizers/_"
            ))
            .poller()
            .until_done()
            .await
            .map(|r| r.total_billed_duration)
    }
}

#[cfg(test)]
mod tests {
    use super::my_application::*;
    use super::*;

    mockall::mock! {
        #[derive(Debug)]
        Speech {}
        impl speech::stub::Speech for Speech {
            async fn batch_recognize(&self, req: BatchRecognizeRequest, _options: gax::options::RequestOptions) -> Result<Response<Operation>>;
        }
    }

    fn expected_duration() -> Option<wkt::Duration> {
        Some(wkt::Duration::clamp(100, 0))
    }

    fn expected_response() -> BatchRecognizeResponse {
        BatchRecognizeResponse::new().set_or_clear_total_billed_duration(expected_duration())
    }

    fn make_finished_operation(response: &BatchRecognizeResponse) -> Result<Response<Operation>> {
        let any = wkt::Any::from_msg(response).expect("test message should succeed");
        let operation = Operation::new()
            .set_done(true)
            .set_result(OperationResult::Response(any.into()));
        Ok(Response::from(operation))
    }

    #[tokio::test]
    async fn automatic_polling() -> Result<()> {
        // Create a mock, and set expectations on it.
        let mut mock = MockSpeech::new();
        mock.expect_batch_recognize()
            .return_once(|_, _| make_finished_operation(&expected_response()));

        // Create a client, implemented by our mock.
        let client = speech::client::Speech::from_stub(mock);

        // Call our function which automatically polls.
        let billed_duration = my_automatic_poller(&client, "my-project").await?;

        // Verify the final result of the LRO.
        assert_eq!(billed_duration, expected_duration());

        Ok(())
    }
}
```

### Manual polling: partial operations in sequence

Stub both `batch_recognize` and `get_operation` (add `GetOperationRequest` to the imports) and register expectations in a `mockall::Sequence`.

```rust
mockall::mock! {
    #[derive(Debug)]
    Speech {}
    impl speech::stub::Speech for Speech {
        async fn batch_recognize(&self, req: BatchRecognizeRequest, _options: gax::options::RequestOptions) -> Result<Response<Operation>>;
        async fn get_operation(&self, req: GetOperationRequest, _options: gax::options::RequestOptions) -> Result<Response<Operation>>;
    }
}
```

```rust
fn make_partial_operation(progress: i32) -> Result<Response<Operation>> {
    let metadata = OperationMetadata::new().set_progress_percent(progress);
    let any = wkt::Any::from_msg(&metadata).expect("test message should succeed");
    let operation = Operation::new().set_metadata(any);
    Ok(Response::from(operation))
}
```

```rust
let mut seq = mockall::Sequence::new();
let mut mock = MockSpeech::new();
mock.expect_batch_recognize()
    .once()
    .in_sequence(&mut seq)
    .returning(|_, _| make_partial_operation(25));
mock.expect_get_operation()
    .once()
    .in_sequence(&mut seq)
    .returning(|_, _| make_partial_operation(50));
mock.expect_get_operation()
    .once()
    .in_sequence(&mut seq)
    .returning(|_, _| make_partial_operation(75));
mock.expect_get_operation()
    .once()
    .in_sequence(&mut seq)
    .returning(|_, _| make_finished_operation(&expected_response()));
```

### Simulate errors

Error starting the LRO (fail the initial request): same pattern as the error block in `mocking.md`, set on `mock.expect_batch_recognize()` with `Code::Aborted` (the source's message string is "Resource exhausted").

LRO that finishes with an error (return it in the final `Operation`):

```rust
fn make_failed_operation(status: rpc::model::Status) -> Result<Response<Operation>> {
    let operation = Operation::new()
        .set_done(true)
        .set_result(OperationResult::Error(status.into()));
    Ok(Response::from(operation))
}
```

## Notes

- A client created from a stub does not have a retry or polling policy. In all cases, the polling loop terminates on the first error, even if the error is normally considered transient.
- The initial `BatchRecognize` RPC starts the LRO and returns an operation identifier in `name` (omitted in the test code). Afterwards the library polls with the `GetOperation` RPC, so the first expectation is on `batch_recognize()` and all later ones on `get_operation()`.
- `mockall::Sequence` verifies call order and determines which `expect_get_operation` expectation matches each poll.
- With automatic polling, `until_done()` returns the error in the `Result` regardless of origin, so "error starting an LRO" is the simplest test. With manual polling, errors from starting the LRO and LRO-ending errors arrive in the `PollingResult::Completed` branch; a polling error arrives in `PollingResult::PollingError`.
- Polling loops can also exit when the polling policy is exhausted, in which case the library cannot tell whether the LRO completed. Test custom handling by returning an error directly from the `get_operation` expectation.
- Fragments: all blocks except the first are partial and refer to items defined in the complete test or in the manual-polling application function (`my_manual_poller`, `BatchRecognizeResult`, `OperationMetadata`, `rpc` = `google_cloud_rpc`).
- Omitted to save space (see the source page): the full `my_manual_poller` application function using `PollingResult::{Completed, InProgress, PollingError}` with a 500 ms sleep; the full manual-polling test (`manual_polling_with_metadata`, asserting progress `[25, 50, 75]`); the full error tests (`error_starting_lro`, `lro_ending_in_error` with `Code::AlreadyExists`, `polling_loop_error` with `Code::Aborted`); and the sequence variants that end in a failed or erroring `get_operation`.
- Dependencies are not listed by the source; the imports need `google-cloud-gax`, `google-cloud-longrunning`, `google-cloud-wkt`, `google-cloud-speech-v2`, `google-cloud-lro`, `google-cloud-rpc` (error tests) and the dev-dependencies `mockall` and `tokio` (for `#[tokio::test]`). Derived from the `use` lines, not stated in the source.
- Applies to `google-cloud-gax` 1.15.0, `google-cloud-lro` 1.12.0, `google-cloud-longrunning` 1.14.0, `google-cloud-wkt` 1.11.0 (`rust_version` 1.91.0); `google-cloud-speech-v2` is not pinned in the page.
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill). For LRO usage and polling policies, see the `rust-calls` category.
- Source: https://docs.cloud.google.com/rust/docs/mocking-lros (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [mocking.md](./mocking.md)
