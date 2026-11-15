---
source: https://github.com/googleapis/google-cloud-rust/blob/release-20261111/guide/src/working_with_enums.md
---

# Working with enums (Rust)

Google Cloud services use enumerations for fields with a discrete set of values, and that set can grow over time. The Rust client libraries send and receive enums and support values introduced after the library release. The enums are `#[non_exhaustive]`, so a `match` must include a wildcard arm.

## Signature / Usage

### Dependencies

This guide makes no calls to Google Cloud services, so it needs no project or account. It uses the Secret Manager library.

```bash
cargo add google-cloud-secretmanager-v1 serde_json
```

### Known values

```rust
use google_cloud_secretmanager_v1::model::secret_version::State;
let enabled = State::Enabled;
println!("State::Enabled = {enabled}");
assert_eq!(enabled.value(), Some(1));
assert_eq!(enabled.name(), Some("ENABLED"));

let state = State::from(1);
println!("state = {state}");
assert_eq!(state.value(), Some(1));
assert_eq!(state.name(), Some("ENABLED"));

let state = State::from("ENABLED");
println!("state = {state}");
assert_eq!(state.value(), Some(1));
assert_eq!(state.name(), Some("ENABLED"));
println!("json = {}", serde_json::to_value(&state)?);
```

### Unknown string values

For an unknown string, `.value()` returns `None`; everything else works as normal.

```rust
use google_cloud_secretmanager_v1::model::secret_version::State;
use serde_json::json;
let state = State::from("STATE_NAME_FROM_THE_FUTURE");
println!("state = {state}");
assert_eq!(state.value(), None);
assert_eq!(state.name(), Some("STATE_NAME_FROM_THE_FUTURE"));
println!("json = {}", serde_json::to_value(&state)?);
let u = serde_json::from_value::<State>(json!("STATE_NAME_FROM_THE_FUTURE"))?;
assert_eq!(state, u);
```

### Unknown integer values

The same principle applies; here `.name()` returns `None`.

```rust
use google_cloud_secretmanager_v1::model::secret_version::State;
use serde_json::json;
const MAGIC_INT_FROM_THE_FUTURE: i32 = 17;
let state = State::from(MAGIC_INT_FROM_THE_FUTURE);
println!("state = {state}");
assert_eq!(state.value(), Some(17));
assert_eq!(state.name(), None);
println!("json = {}", serde_json::to_value(&state)?);
let s2 = serde_json::from_value::<State>(json!(17))?;
assert_eq!(state, s2);
```

### Preparing for upgrades

Include the wildcard pattern in a `match` over these enums; this keeps your code compiling when new variants are added.

```rust
use google_cloud_secretmanager_v1::model::secret_version::State;
fn match_with_wildcard(state: State) -> anyhow::Result<()> {
    use anyhow::Error;
    match state {
        State::Unspecified => {
            return Err(Error::msg("the documentation says this is never used"));
        }
        State::Enabled => println!("the secret is enabled and can be accessed"),
        State::Disabled => {
            println!("the secret version is not accessible until it is enabled")
        }
        State::Destroyed => {
            println!("the secret is destroyed, the data is no longer accessible")
        }
        State::UnknownValue(u) => {
            println!("unknown State variant ({u:?}) time to update the library")
        }
        _ => return Err(Error::msg("unexpected value, update this code")),
    };
    Ok(())
}
```

To get a warning when new variants appear, use the `wildcard_enum_match_arm` clippy lint:

```rust
use google_cloud_secretmanager_v1::model::secret_version::State;
fn match_with_warnings(state: State) -> anyhow::Result<()> {
    use anyhow::Error;
    #[warn(clippy::wildcard_enum_match_arm)]
    match state {
        State::Unspecified => {
            return Err(Error::msg("the documentation says this is never used"));
        }
        State::Enabled => println!("the secret is enabled and can be accessed"),
        State::Disabled => {
            println!("the secret version is not accessible until it is enabled")
        }
        State::Destroyed => {
            println!("the secret is destroyed, the data is no longer accessible")
        }
        State::UnknownValue(u) => {
            println!("unknown State variant ({u:?}) time to update the library")
        }
        _ => {
            // *If* your CI includes treating clippy warnings as errors,
            // consider using `unreachable!()`.
            return Err(Error::msg("unexpected value, update this code"));
        }
    };
    Ok(())
}
```

## Notes

- You may also consider the (currently unstable) `non_exhaustive_omitted_patterns` lint (https://github.com/rust-lang/rust/issues/89554); clippy lint reference: https://rust-lang.github.io/rust-clippy/master/#wildcard_enum_match_arm.
- The guide's `{{#include ../samples/tests/enums.rs:<anchor>}}` directives were resolved by copying the regions between the ANCHOR markers (`known`, `unknown_string`, `unknown_integer`, `use`, `match_with_wildcard`, `match_with_warnings`) from `guide/samples/tests/enums.rs`; the only change is removing the common leading indentation (8 spaces for the first three, 4 for the rest). The `use` anchor is prepended to both match examples, as the guide does.
- Fragments: the `known`, `unknown_string` and `unknown_integer` blocks use `?` and are meant to sit inside a function returning `Result<(), Box<dyn std::error::Error>>`; the match functions need the `anyhow` crate.
- `from_value::<State>` in the samples relies on the `serde_json` dependency added above.
- Applies to the guide at google-cloud-rust tag `release-20261111` (`rust_version` 1.91.0 for the crates).
- Source: https://github.com/googleapis/google-cloud-rust/blob/release-20261111/guide/src/working_with_enums.md (retrieved 2026-11-16; pinned at tag release-20261111; code samples Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-rust/blob/release-20261111/guide/samples/tests/enums.rs (retrieved 2026-11-16; pinned at tag release-20261111; Apache 2.0)

## Related

- [error-handling.md](./error-handling.md)
- [long-running-operations.md](./long-running-operations.md)
