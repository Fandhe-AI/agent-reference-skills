---
source: https://v2.tauri.app/concept/size/
---

# App Size

Tips for reducing Tauri binary size: a Cargo release profile and the `removeUnusedCommands` build option.

## Signature / Usage

Stable toolchain (recommended unless you are an advanced user):

```toml
# src-tauri/Cargo.toml
[profile.dev]
incremental = true # Compile your binary in smaller steps.

[profile.release]
codegen-units = 1 # Allows LLVM to perform better optimization.
lto = true # Enables link-time-optimizations.
opt-level = "s" # Prioritizes small binary size. Use `3` if you prefer speed.
panic = "abort" # Higher performance by disabling panic handlers.
strip = true # Ensures debug symbols are removed.
```

Nightly toolchain (run with `cargo +nightly build`; `cargo-features` must be a top-level key of the package manifest, placed before `[package]`):

```toml
# src-tauri/Cargo.toml
cargo-features = ["profile-rustflags", "trim-paths"]

[profile.dev]
incremental = true # Compile your binary in smaller steps.
rustflags = ["-Zthreads=8"] # Better compile performance.

[profile.release]
codegen-units = 1 # Allows LLVM to perform better optimization.
lto = true # Enables link-time-optimizations.
opt-level = "s" # Prioritizes small binary size. Use `3` if you prefer speed.
panic = "abort" # Higher performance by disabling panic handlers.
strip = true # Ensures debug symbols are removed.
trim-paths = "all" # Removes potentially privileged information from your binaries.
rustflags = ["-Cdebuginfo=0", "-Zthreads=8"] # Better compile performance.
```

Remove commands never allowed in your capability files:

```json
{
  "build": {
    "removeUnusedCommands": true
  }
}
```

## Options / Props

Cargo profile options highlighted by the page (not a complete reference):

| Name | Description |
|------|-------------|
| incremental | Compile your binary in smaller steps. |
| codegen-units | Speeds up compile times at the cost of compile time optimizations. |
| lto | Enables link time optimizations. |
| opt-level | Determines the focus of the compiler. Use `3` to optimize performance, `z` to optimize for size, and `s` for something in-between. |
| panic | Reduce size by removing panic unwinding. |
| strip | Strip either symbols or debuginfo from a binary. |
| rpath | Assists in finding the dynamic libraries the binary requires by hard coding information into the binary. |
| trim-paths | Removes potentially privileged information from binaries. |
| rustflags | Sets Rust compiler flags on a profile by profile basis (`-Cdebuginfo=0`: whether debuginfo symbols are included; `-Zthreads=8`: more compilation threads). |

## Notes

- `removeUnusedCommands` (added in PR #12890) removes commands never allowed in your capability files (ACL). To maximize the benefit, include only the commands you use in the ACL instead of using `default`s.
- Requires `tauri@2.4`, `tauri-build@2.1`, `tauri-plugin@2.1` and `tauri-cli@2.4`.
- It does not account for ACLs added dynamically at runtime.
- Under the hood, `tauri-cli` communicates with `tauri-build` and the build scripts of `tauri` and `tauri-plugin` through the environment variable `REMOVE_UNUSED_COMMANDS` (set to the project directory, usually `src-tauri`) so they generate a list of allowed commands from the ACL, which the `generate_handler` macro uses. This is an implementation detail with no stability guarantee.
- The source omits the `cargo-features = ["profile-rustflags", "trim-paths"]` declaration that nightly Cargo requires for these profile keys.
- Tauri capabilities / permissions (ACL) are Tauri's own system, unrelated to Claude Code permissions (anthropic-claude-code-admin) or MCP capabilities (mcp-spec). Cargo profiles themselves are covered by the rust skill.

## Related

- [Overview](./overview.md)
- [Project Structure](./project-structure.md)
