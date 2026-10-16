---
source: https://v2.tauri.app/reference/config/#buildconfig
---

# BuildConfig

The Build configuration object (`build` in `tauri.conf.json`), plus `RunnerConfig`, `FrontendDist`, `BeforeDevCommand`, `HookCommand` and `WindowsBuildConfig`.

## Signature / Usage

```json
{
  "build": {
    "beforeBuildCommand": "",
    "beforeDevCommand": "",
    "devUrl": "http://localhost:3000",
    "frontendDist": "../dist"
  }
}
```

## Options / Props

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `runner` | RunnerConfig \| null | — | The binary used to build and run the application. |
| `devUrl` | string (uri) \| null | — | The URL to load in development. Usually a dev server URL serving assets with hot-reload / HMR. If you don't have a dev server, ignore this option and use `frontendDist` pointing to a web assets directory; the Tauri CLI will run its built-in dev server with a simple hot-reload experience. |
| `frontendDist` | FrontendDist \| null | — | The path to the application assets (usually the `dist` folder of your JavaScript bundler), or a URL (a custom protocol registered in the app, e.g. `myprotocol://`, or a remote URL, e.g. `https://site.com/app`). A path relative to the configuration file is read recursively and all files are embedded in the application binary; Tauri looks for an `index.html` as the default entry point. A list of paths allows granular control (all files are added to the root). When a URL is provided, the app has no bundled assets and loads that URL by default. |
| `beforeDevCommand` | BeforeDevCommand \| null | — | A shell command to run before `tauri dev` kicks in. |
| `beforeBuildCommand` | HookCommand \| null | — | A shell command to run before `tauri build` kicks in. |
| `beforeBundleCommand` | HookCommand \| null | — | A shell command to run before the bundling phase in `tauri build` kicks in. |
| `features` | string[] \| null | — | Features passed to `cargo` commands. |
| `removeUnusedCommands` | boolean | `false` | Try to remove unused commands registered from plugins based on the ACL list during `tauri build`. |
| `additionalWatchFolders` | string[] | `[]` | Additional paths to watch for changes when running `tauri dev`. |
| `windows` | WindowsBuildConfig | `{"staticVCRuntime": true}` | Windows-specific build configuration. |

### Supporting types

| Type | Definition |
| --- | --- |
| RunnerConfig | `string` (the binary to run) or object `{ cmd: string (required), cwd?: string \| null, args?: string[] \| null }`. |
| FrontendDist | One of: an external URL (string uri; no assets are embedded); a path to a directory containing the frontend dist assets (string); an array of files to embed in the app (string[]). |
| BeforeDevCommand | `string` (run with default options) or object `{ script: string (required), cwd?: string \| null, wait?: boolean }`. `wait` defaults to `false` and controls whether `tauri dev` should wait for the command to finish. |
| HookCommand | `string` (run with default options) or object `{ script: string (required), cwd?: string \| null }`. |
| WindowsBuildConfig | `{ staticVCRuntime?: boolean (default true) }` : whether to statically link the Visual C++ runtime into the application binary on Windows MSVC targets. |

## Notes

- The `beforeDevCommand`, `beforeBuildCommand` and `beforeBundleCommand` commands receive the environment variables `TAURI_ENV_PLATFORM`, `TAURI_ENV_ARCH`, `TAURI_ENV_FAMILY`, `TAURI_ENV_PLATFORM_VERSION` and `TAURI_ENV_TARGET_TRIPLE` so they can adapt to the target being built. `TAURI_ENV_DEBUG` is set to `true` for debug builds and is not set otherwise.
- `removeUnusedCommands`: tauri-cli reads this and sets environment variables for the build script and macros, which try to get all the allowed commands and remove the rest. It does not account for dynamically added ACLs when using the `dynamic-acl` feature flag (currently enabled by default). Requires tauri-plugin 2.1 and tauri 2.4.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.BuildConfig` and referenced types).

## Related

- [Configuration (root Config)](./overview.md)
- [BundleConfig](./bundle-config.md)
