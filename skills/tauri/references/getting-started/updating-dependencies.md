---
source: https://v2.tauri.app/develop/updating-dependencies/
---

# Updating Dependencies

How to update the npm packages and Cargo crates of a Tauri app, and keep their versions in sync.

## Signature / Usage

Update npm packages:

```sh
npm install @tauri-apps/cli@latest @tauri-apps/api@latest
# yarn
yarn up @tauri-apps/cli @tauri-apps/api
# pnpm
pnpm update @tauri-apps/cli @tauri-apps/api --latest
```

Detect the latest version:

```sh
npm outdated @tauri-apps/cli
```

Update Cargo packages in `src-tauri/Cargo.toml` (`%version%` is the corresponding version number from crates.io):

```toml
[build-dependencies]
tauri-build = "%version%"

[dependencies]
tauri = { version = "%version%" }
```

```shell
cd src-tauri
cargo update
```

Alternatively, `cargo upgrade` from cargo-edit does all of this automatically. Check for outdated packages with `cargo outdated` or on the crates.io pages for `tauri` and `tauri-build`.

## Notes

- Keep the same minor version of the npm package `@tauri-apps/api` and the cargo crate `tauri` in sync, since the JavaScript APIs rely on Rust code in the backend.
- For plugins, such changes may be introduced in patch releases, so the npm package and cargo crate versions are bumped together; keep the exact versions synced (for example `2.2.1` of both `@tauri-apps/plugin-fs` and `tauri-plugin-fs`).
- Cargo itself is covered by the rust skill.

## Related

- [Upgrade from Tauri 1.0](./migrate-from-tauri-1.md)
- [Project Structure](./project-structure.md)
