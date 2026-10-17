---
source: https://docs.expo.dev/more/create-expo-module/
---

# create-expo-module

Command-line tool to create a new Expo module or add platform support to an existing one. It can create a local module inside an Expo app, or a standalone module with an example app.

## Signature / Usage

```sh
# local module (run in the Expo project directory)
npx create-expo-module@latest --local

# standalone module
npx create-expo-module@latest my-module

# add platform support (run from the module root)
npx create-expo-module@latest add-platform-support
```

Yarn, pnpm and bun equivalents: `yarn create expo-module`, `pnpm create expo-module`, `bun create expo-module`.

Non-interactive example:

```sh
npx create-expo-module@latest my-module --name MyModule --package expo.modules.mymodule --platform android apple --features Function AsyncFunction --description "My module" --license MIT --module-version 0.1.0
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `[path]` | string | Creates the module at the provided path. If omitted, the name from the prompt is used. |
| `--local` | flag | Creates a local module inside the current Expo project. Skips installing module dependencies and does not create an example app. |
| `--platform` | `android` / `apple` / `web` | Platforms the module should support. Local modules: prompt preselects from app config `platforms`. Standalone: all preselected. Non-interactive: all unless provided. |
| `--features` | list | Feature examples to include: `Constant`, `Function`, `AsyncFunction`, `Event`, `View`, `ViewEvent` (also includes `View`), `SharedObject`. Use `all` for every example. None selected gives a minimal module. |
| `--full-example` | flag | All feature examples; same as `--features all`. |
| `--package-manager` | `npm` / `pnpm` / `yarn` / `bun` | Package manager for standalone modules. Detected if omitted. |
| `--no-example` | flag | Skips creating the **example** app for a standalone module. |
| `--barrel` | flag | Generates an **index.ts** barrel file for local modules (only with `--local`). By default none is generated. |
| `--source` | path | Local template directory (root of an **expo-module-template** package) instead of downloading from npm. |
| `--with-readme` | flag | Includes README.md in a standalone module. |
| `--with-changelog` | flag | Includes CHANGELOG.md in a standalone module. |
| `--name` | string | Native module name, e.g. `MyModule`. Renamed if it conflicts with an Apple framework. |
| `--description` | string | Module description for package metadata. |
| `--package` | string | Android package name, e.g. `expo.modules.mymodule`. |
| `--author-name` | string | Package author name. |
| `--author-email` | string | Package author email. |
| `--author-url` | string | Package author profile URL. |
| `--repo` | string | Package repository URL. |
| `--license` | string | Package license. Default `MIT`. |
| `--module-version` | string | Initial package version. Default `0.1.0`. |
| `--version` | flag | Prints the version and exits. |
| `--help` | flag | Prints available options and exits. |

`add-platform-support` options:

| Name | Description |
| --- | --- |
| `--platform` | Platforms to add: `apple`, `android`, `web`. Required in non-interactive mode. |
| `--features` | Overrides detected feature examples for the new platform files. With none detected or provided, a minimal scaffold is generated. |
| `--source` | Local template directory instead of downloading **expo-module-template**. |

Standalone module scripts:

| Script | Description |
| --- | --- |
| `build` | Compiles TypeScript source files. |
| `clean` | Removes generated build output. |
| `test` | Runs module tests. |
| `prepare` | Builds package targets before publishing or packing. |
| `open:ios` | Opens the generated iOS example project. |
| `open:android` | Opens the generated Android example project. |

Environment variables: `EXPO_BETA` (use the next version of module and example app templates, e.g. `EXPO_BETA=1 npx create-expo-module@latest my-module`), `EXPO_DEBUG` (debug logs), `EXPO_NO_TELEMETRY` (disable telemetry), `EXPO_NONINTERACTIVE` (skip prompts).

## Notes

- Local modules live in **modules** by default, or in `expo.autolinking.nativeModulesDir` if set in package.json; they are discovered by Expo Autolinking and use the app's dependencies.
- Standalone modules include package metadata, TypeScript configuration, native files, `src`, an **example** app, and **expo-module.config.json**. If not inside a Git repository, a new repository and initial commit are created. With the example app, dependencies are installed and Prebuild runs; on macOS CocoaPods is installed.
- `open:ios` requires macOS and Xcode; on Windows open the **android** directory in Android Studio. Rebuild the example app after native changes; JS/TS changes are picked up by the dev server (`cd example && npx expo start`).
- Non-interactive mode applies in CI, with `EXPO_NONINTERACTIVE`, and when stdin is not a TTY; unspecified values take defaults and print warnings.
- `add-platform-support` only adds platforms not already in expo-module.config.json and never overwrites existing **android** / **ios** directories. It needs the Expo Modules API DSL to find the module definition (older module formats unsupported); feature detection is best effort, override with `--features`. Optional path argument: `npx create-expo-module@latest add-platform-support ./packages/my-module`.
- Template: **expo-module-template** from npm. Standalone modules use the latest template; local modules try the version matching the project's Expo SDK and fall back to latest.
- Distinct from apple-swift and android-architecture.
- Source modificationDate: September 17, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Get started](./get-started.md)
- [expo-module.config.json](./module-config.md)
- [Additional platform support](./additional-platform-support.md)
- [Autolinking](./autolinking.md)
