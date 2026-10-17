---
source: https://v2.tauri.app/reference/cli/
---

# Info and Migrate

Commands for environment diagnostics (`tauri info`), migration from v1 / v2 beta (`tauri migrate`), shell completions, checking the WiX Upgrade Code, and updating dependencies.

> **WARNING**: `tauri migrate` rewrites the project's config and code to the v2 format. Always run it under version control and review the diff.

## Show environment information

```sh
npm run tauri info
```

```sh
cargo tauri info
```

Prints a concise summary of the OS, Rust, Node.js and their versions, and the relevant project config. Option: `--interactive` (interactive mode that applies automatic fixes).

## Migrate from v1 / v2 beta

```sh
npm run tauri migrate
```

```sh
pnpm tauri migrate
```

```sh
cargo tauri migrate
```

The command documented on the Tauri v1 to v2 and v2 beta to v2 stable migration pages.

## Generate shell completions

```sh
cargo tauri completions --shell zsh
cargo tauri completions --shell bash --output <OUTPUT>
```

`-s, --shell` accepts `bash` / `elvish` / `fish` / `powershell` / `zsh`. Without `-o, --output`, the script is printed to stdout.

## Check the MSI Upgrade Code

```sh
cargo tauri inspect wix-upgrade-code
```

Prints the default Upgrade Code of the MSI installer, derived from `productName`.

## Update npm packages

```sh
npm install @tauri-apps/cli@latest @tauri-apps/api@latest
```

```sh
yarn up @tauri-apps/cli @tauri-apps/api
```

```sh
pnpm update @tauri-apps/cli @tauri-apps/api --latest
```

## Check the latest version

```sh
npm outdated @tauri-apps/cli
```

```sh
yarn outdated @tauri-apps/cli
```

```sh
pnpm outdated @tauri-apps/cli
```

## Update Cargo packages

Run after changing the `tauri` and `tauri-build` versions in `src-tauri/Cargo.toml`.

```sh
cd src-tauri
cargo update
```

The official docs say `cargo outdated` or cargo-edit's `cargo upgrade` can also be used (see each tool's README for command details).

## Keeping versions in sync

- Keep the npm `@tauri-apps/api` and the cargo `tauri` on the same minor version.
- Plugins can change even in patch releases, so match the full version (for example `2.2.1`) of the npm package and the crate, such as `@tauri-apps/plugin-fs` and `tauri-plugin-fs`.

## Install the CLI

```sh
npm install --save-dev @tauri-apps/cli@latest
```

```sh
pnpm add -D @tauri-apps/cli@latest
```

```sh
deno add -D npm:@tauri-apps/cli@latest
```

```sh
cargo install tauri-cli --version "^2.0.0" --locked
```

## Notes

- The invocation form depends on how the CLI is installed (see the table in `dev-build.md`).
- `Usage: pnpm-native run build ...` in the source `--help` output comes from the environment that generated the official docs; the actual form is `tauri ...`.
