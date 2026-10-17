---
source: https://v2.tauri.app/develop/configuration-files/
---

# Configuration Files

The files that configure a Tauri project: `tauri.conf.json` (Tauri config), `Cargo.toml` and `package.json`.

## Signature / Usage

Tauri config (`tauri.conf.json`) defines the Web app source, application metadata, bundles, plugin configuration and runtime behavior (windows, tray icons, menus). It is used by the Tauri runtime and the Tauri CLI.

### Supported formats

The default format is JSON. JSON5 or TOML is enabled by adding the `config-json5` or `config-toml` feature flag to the `tauri` and `tauri-build` dependencies.

`Cargo.toml`

```toml
[build-dependencies]
tauri-build = { version = "2.0.0", features = [ "config-json5" ] }

[dependencies]
tauri = { version = "2.0.0", features = [  "config-json5" ] }
```

`tauri.conf.json` or `tauri.conf.json5`

```json5
{
  build: {
    devUrl: 'http://localhost:3000',
    // start the dev server
    beforeDevCommand: 'npm run dev',
  },
  bundle: {
    active: true,
    icon: ['icons/app.png'],
  },
  app: {
    windows: [
      {
        title: 'MyApp',
      },
    ],
  },
  plugins: {
    updater: {
      pubkey: 'updater pub key',
      endpoints: ['https://my.app.updater/{{target}}/{{current_version}}'],
    },
  },
}
```

`Tauri.toml`

```toml
[build]
dev-url = "http://localhost:3000"
# start the dev server
before-dev-command = "npm run dev"

[bundle]
active = true
icon = ["icons/app.png"]

[[app.windows]]
title = "MyApp"

[plugins.updater]
pubkey = "updater pub key"
endpoints = ["https://my.app.updater/{{target}}/{{current_version}}"]
```

JSON5 and TOML support comments, and TOML can use kebab-case for config names. Field names are case-sensitive in all 3 formats.

### Platform-specific configuration

Tauri can additionally read a platform-specific configuration from:

- `tauri.linux.conf.json` or `Tauri.linux.toml` for Linux
- `tauri.windows.conf.json` or `Tauri.windows.toml` for Windows
- `tauri.macos.conf.json` or `Tauri.macos.toml` for macOS
- `tauri.android.conf.json` or `Tauri.android.toml` for Android
- `tauri.ios.conf.json` or `Tauri.ios.toml` for iOS

The platform-specific file is merged with the main configuration following JSON Merge Patch (RFC 7396). Objects are merged key by key, but arrays are replaced as a whole, including arrays nested in objects (`bundle` is merged while `bundle.resources` is replaced). The same holds for arrays of objects such as `app.windows`: a platform-specific entry replaces the base entry, so omitted fields fall back to their defaults instead of the base values.

Base `tauri.conf.json`:

```json
{
  "productName": "MyApp",
  "bundle": {
    "resources": ["./resources", "./shared-assets"]
  },
  "plugins": {
    "deep-link": {}
  }
}
```

`tauri.linux.conf.json`:

```json
{
  "productName": "my-app",
  "bundle": {
    "resources": ["./linux-assets"]
  },
  "plugins": {
    "cli": {
      "description": "My app",
      "subcommands": {
        "update": {}
      }
    },
    "deep-link": {}
  }
}
```

Resolved configuration for Linux:

```json
{
  "productName": "my-app",
  "bundle": {
    "resources": ["./linux-assets"]
  },
  "plugins": {
    "cli": {
      "description": "My app",
      "subcommands": {
        "update": {}
      }
    },
    "deep-link": {}
  }
}
```

### Extending the configuration from the CLI

The CLI extends the configuration for `dev`, `android dev`, `ios dev`, `build`, `android build`, `ios build` and `bundle` through `--config`, given either as a raw JSON string or a path to a JSON file. It is merged with the resolved configuration using JSON Merge Patch (RFC 7396). This is useful for multiple flavours, e.g. an isolated beta application:

`src-tauri/tauri.beta.conf.json`

```json
{
  "productName": "My App Beta",
  "identifier": "com.myorg.myappbeta"
}
```

```sh
npm run tauri build -- --config src-tauri/tauri.beta.conf.json
cargo tauri build --config src-tauri/tauri.beta.conf.json
```

## Cargo.toml

Cargo's manifest declares the Rust crates the app depends on and app metadata. Barebones example for a Tauri project:

```toml
[package]
name = "app"
version = "0.1.0"
description = "A Tauri App"
authors = ["you"]
license = ""
repository = ""
default-run = "app"
edition = "2021"
rust-version = "1.57"

[build-dependencies]
tauri-build = { version = "2.0.0" }

[dependencies]
serde_json = "1.0"
serde = { version = "1.0", features = ["derive"] }
tauri = { version = "2.0.0", features = [ ] }
```

- `tauri-build` and `tauri` should generally be on the same latest minor versions as the Tauri CLI, but this is not strictly required. If the app fails to run, check that `tauri` and `tauri-cli` are on the latest versions of their respective minor releases.
- Cargo uses Semantic Versioning. `cargo update` in `src-tauri` pulls the latest Semver-compatible versions (specifying `2.0.0` can resolve to `2.0.1`). Tauri bumps the major version for breaking changes.
- Use an exact version by prepending `=`:

```
tauri-build = { version = "=2.0.0" }
```

- `tauri dev` and `tauri build` automatically manage which `tauri` features are enabled based on the Tauri configuration.
- The generated `Cargo.lock` ensures the same dependencies across machines; commit it for consistent builds.

## package.json

Used by Node.js-based frontends to configure dependencies and scripts.

```json
{
  "scripts": {
    "dev": "command to start your app development mode",
    "build": "command to build your app frontend",
    "tauri": "tauri"
  },
  "dependencies": {
    "@tauri-apps/api": "^2.0.0",
    "@tauri-apps/cli": "^2.0.0"
  }
}
```

Hook the scripts into the CLI through the Tauri configuration's `beforeDevCommand` and `beforeBuildCommand`:

`tauri.conf.json`

```json
{
  "build": {
    "beforeDevCommand": "yarn dev",
    "beforeBuildCommand": "yarn build"
  }
}
```

## Notes

- The `"tauri"` script in `package.json` is only needed when using `npm`.
- Lockfiles (`yarn.lock`, `pnpm-lock.yaml`, `package-lock.json`) pin the frontend dependency versions, like `Cargo.lock` does for Rust.
- All configuration options are listed in the configuration reference (see the config category).

## Related

- [Config Overview](../config/overview.md)
- [Embedding Additional Files](./resources.md)
- [Environment Variables](./environment-variables.md)
