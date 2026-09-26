//! Minimal library crate used by the `make` skill's rust-crate sample
//! (skills/make/samples/projects/rust-crate/).
//!
//! It exists only so that `scripts/check.sh` (fmt + clippy) and
//! `scripts/verify.sh` (unit test + integration test + doctest) have a
//! real, small crate to run against.
//!
//! ```
//! assert_eq!(make_skill_sample::add(2, 3), 5);
//! ```

/// Adds two `i32` values, wrapping on overflow like `+` would panic in
/// debug builds; kept intentionally trivial for the sample.
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::add;

    #[test]
    fn add_works() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn add_handles_negatives() {
        assert_eq!(add(-1, 1), 0);
    }
}
