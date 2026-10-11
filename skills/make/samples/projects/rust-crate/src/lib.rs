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

/// Adds two `i32` values, wrapping on overflow in every build profile
/// (plain `+` would panic when overflow checks are enabled, e.g. debug
/// builds); kept intentionally trivial for the sample.
pub fn add(a: i32, b: i32) -> i32 {
    a.wrapping_add(b)
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

    #[test]
    fn add_wraps_on_overflow() {
        assert_eq!(add(i32::MAX, 1), i32::MIN);
    }
}
