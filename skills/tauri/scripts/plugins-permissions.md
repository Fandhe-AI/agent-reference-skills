---
source: https://v2.tauri.app/reference/cli/
---

# Plugins and Permissions

Commands for adding and removing official plugins, scaffolding plugins, and generating and managing Tauri capabilities / permissions (ACL) files.

> **WARNING**: `tauri remove` and `tauri permission rm` rewrite project files, dependencies, and capability references. Always run them under version control and review the diff.

## Add an official plugin

```sh
npm run tauri add fs
```

```sh
cargo tauri add fs
```

The CLI describes it as "Add a tauri plugin to the project". To add only the Rust crate manually, the official plugin pages show this form.

```sh
cargo add tauri-plugin-fs
```

`add` options: `-t, --tag <TAG>` / `-r, --rev <REV>` / `-b, --branch <BRANCH>` (Git selectors) / `--no-fmt` (do not run rustfmt).

## Remove a plugin

```sh
cargo tauri remove fs
```

## Scaffold a plugin

```sh
cargo tauri plugin new test
```

```sh
cargo tauri plugin new <PLUGIN_NAME> --no-api --no-example --android --ios
```

`plugin new` options: `--no-api` (no TypeScript API) / `--no-example` / `-d, --directory` / `-a, --author` / `--android` / `--ios` / `--mobile` (both) / `--ios-framework <spm|xcode>` (default `spm`) / `--github-workflows` / `-t, --tauri-path`.

## Initialize a plugin in an existing directory

```sh
cargo tauri plugin init [PLUGIN_NAME]
```

```sh
cargo tauri plugin android init [PLUGIN_NAME]
cargo tauri plugin ios init [PLUGIN_NAME]
```

If `PLUGIN_NAME` is omitted, it is inferred from the current directory name.

## List permissions

```sh
cargo tauri permission ls
cargo tauri permission ls <PLUGIN>
cargo tauri permission ls --filter <FILTER>
```

Shows the permissions available to the app.

## Create a permission file

```sh
cargo tauri permission new <IDENTIFIER> --description "<DESCRIPTION>" --allow <COMMAND> --deny <COMMAND> --format json --out <FILE>
```

`--format` is `json` (default) or `toml`. `-a, --allow` and `-d, --deny` list the commands to allow / deny.

## Add a permission to a capability

```sh
cargo tauri permission add <IDENTIFIER> [CAPABILITY]
```

## Remove a permission

```sh
cargo tauri permission rm <IDENTIFIER>
```

To remove all permissions of a plugin, pass `<plugin-name>:*` (removes the permission files and the references from every capability).

## Create a capability file

```sh
cargo tauri capability new <IDENTIFIER> --description "<DESCRIPTION>" --windows <WINDOWS> --permission <PERMISSION> --format json --out <FILE>
```

## Notes

- The invocation form (`npm run tauri <cmd>` / `cargo tauri <cmd>`, etc.) depends on how the CLI is installed (see the table in `dev-build.md`).
- `Usage: pnpm-native run build ...` in the source `--help` output comes from the environment that generated the official docs; the actual form is `tauri ...`.
- Keep the plugin's JS package (`@tauri-apps/plugin-*`) and Rust crate (`tauri-plugin-*`) on the same version (see `info-migrate.md`).
