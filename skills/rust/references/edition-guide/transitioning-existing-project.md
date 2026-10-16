# Transitioning an Existing Project to a New Edition

Rust provides `cargo fix --edition` to automate most of the work. Follow the steps below in order.

## Signature / Usage

```bash
# Full migration workflow
cargo update                # 1. Update dependencies
cargo fix --edition         # 2. Auto-fix source code
# Edit Cargo.toml: set edition = "2021"  (step 3)
cargo build && cargo test   # 4. Verify
cargo fmt                   # 5. Reformat with new style rules
```

## Notes

- Step 1: some dependencies (especially proc-macros) may have edition-related issues in old versions. Update and run tests before proceeding.
- Step 2: `cargo fix` rewrites source files to be compatible with the target edition. If a change cannot be automated, it prints a warning requiring manual intervention.
- Step 3: set `edition` in the `[package]` table of `Cargo.toml` (e.g. `edition = "2021"`).
- Step 4: run `cargo fix` again (without `--edition`) if new warnings appear after enabling the edition.
- Step 5: the new edition may have updated rustfmt style rules. Commit formatting changes separately from logic changes.
- `cargo fix` does **not** automatically update doctests or code generated at build time — these require manual review.
- For macros, multiple configurations, workspaces, and non-Cargo projects, see "Advanced migration strategies" in the Edition Guide (`advanced-migrations.md`).
- To test an unstable (nightly) edition:
  ```bash
  rustup update nightly
  cargo +nightly fix --edition
  # Add to Cargo.toml:
  # cargo-features = ["edition20xx"]
  # edition = "20xx"
  cargo +nightly check
  ```
- File bug reports at https://github.com/rust-lang/rust/issues/new/choose if migration is unusually difficult.

## Related

- [What are Editions?](./what-is-edition.md)
- [Rust 2018](./rust-2018.md)
- [Rust 2021](./rust-2021.md)
- [Rust 2024](./rust-2024.md)
- [Advanced migration strategies](./advanced-migrations.md)
