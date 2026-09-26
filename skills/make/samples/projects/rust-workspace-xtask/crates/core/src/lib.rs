//! `wsx-core`: minimal library crate for the rust-workspace-xtask sample.
//!
//! Deliberately tiny — this sample exists to show a *workspace + xtask*
//! shape, not to demonstrate library design. Real logic here would live
//! wherever the workspace's actual product code lives.

/// Adds two `i64` values.
///
/// Kept trivial and overflow-checked in debug builds only (standard `+`
/// semantics) so the unit test below has something real to assert on.
pub fn add(a: i64, b: i64) -> i64 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_adds() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn add_handles_negatives() {
        assert_eq!(add(-2, 2), 0);
    }
}
