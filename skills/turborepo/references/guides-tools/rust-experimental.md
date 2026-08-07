# Rust (experimental support)

Native detection of Cargo workspaces. Recognizes Rust crates as Turborepo packages and maps tasks to Cargo commands.

## Usage

Enable:

```json
{
  "futureFlags": {
    "experimentalCargoWorkspaces": true
  }
}
```

Prerequisites:

- `turbo` / `cargo` / `rustc` must be resolvable on `PATH`
- Root `Cargo.toml` with a virtual workspace configuration
- A unique `[workspace.metadata] name` field
- A `Cargo.lock` at the root

Crate kinds:

- Entrypoint crate (has `bin` / `cdylib` / `staticlib` targets)
- Library crate (included in dependency computation)
- Root workspace package (runs whole-workspace validation)

Built-in tasks: `build` / `test` / `check` / `lint` / `format` are auto-registered and mapped to the corresponding Cargo commands (`--locked` is applied where applicable). `experimentalTaskCommand` can define custom tasks or override the built-in mappings.

Filtering:

```bash
turbo run build --filter=my-cargo-binary
turbo run test --affected
```

## Notes

- Automatic output caching only stores final artifacts for `bin` / `cdylib` / `staticlib`; library builds are non-cached by default unless explicitly enabled.
- This is an experimental feature and may change; keep the `turbo` version consistent across environments.
- Only the root virtual workspace is detected; nested workspaces are not processed individually.
- If the output layout cannot be resolved, automatic caching is disabled.
- Synthesized workspace packages cannot be pruned.

## Related

- [Python (experimental support)](./python-experimental.md)
