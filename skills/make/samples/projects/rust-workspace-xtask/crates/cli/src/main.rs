//! `wsx-cli`: minimal binary crate for the rust-workspace-xtask sample.
//!
//! Depends on `wsx-core` (path dependency, same workspace) purely to
//! demonstrate a multi-crate workspace. `cargo xtask build/test/check`
//! (see ../../../xtask/src/main.rs, i.e. `xtask/src/main.rs` at the
//! workspace root) exercises this crate along with `wsx-core` via
//! `--workspace --exclude xtask`.

use wsx_core::add;

fn main() {
    let a = 2;
    let b = 3;
    println!("wsx-cli: add({a}, {b}) = {}", add(a, b));
}

#[cfg(test)]
mod tests {
    // Integration-style smoke test exercised by `cargo test -p wsx-cli`
    // (and, in turn, by `cargo xtask test`).
    use wsx_core::add;

    #[test]
    fn cli_depends_on_core_correctly() {
        assert_eq!(add(10, 32), 42);
    }
}
