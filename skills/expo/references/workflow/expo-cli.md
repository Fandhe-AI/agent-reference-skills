---
source: https://docs.expo.dev/more/expo-cli/
---

# Expo CLI

The `expo` package provides the `npx expo` CLI for app development: dev server, prebuild, native builds, exports, installs, lint, config, and authentication. Included in the `expo` package.

## Signature / Usage

```sh
npx expo -h

Usage
  $ npx expo <command>

Commands
  start, export
  run:ios, run:android, prebuild
  install, customize, config
  login, logout, whoami, register

Options
  --version, -v   Version number
  --help, -h      Usage info
```

## Options / Props

Commands:

| Command | Description |
| --- | --- |
| `npx expo start` (alias `npx expo`) | Start a dev server (default `http://localhost:8081`, Metro bundler) with Terminal UI. |
| `npx expo run:ios` / `run:android` | Compile and run the native app locally (runs prebuild once if native directories are absent). |
| `npx expo export` | Export JS and assets (static **dist** directory). |
| `npx expo prebuild` | Generate native **android** / **ios** directories. |
| `npx expo lint` | Set up ESLint with Expo settings and run `npx eslint` (defaults to **src**, **app**, **components**; `--fix`, `--ext`; extra args after `--`). |
| `npx expo config` | Evaluate app config; `--full`, `--json`, `-t, --type` (`public`, `prebuild`, `introspect`). |
| `npx expo install <pkg>` | Install packages at versions compatible with the project's `react-native`. `--check` (non-zero exit in CI), `--fix`, `--bun/--npm/--pnpm/--yarn`, pass-through args after `--`. |
| `npx expo customize` | Generate default config files: **babel.config.js**, **webpack.config.js**, **metro.config.js**, **tsconfig.json**. |
| `register` / `login` / `whoami` / `logout` | Authentication, shared with EAS CLI; used to code-sign manifests. |

`start` options: `--dev-client`, `--go`, `--localhost`, `--port` (default 8081; `0` for first available), `--https` (deprecated in favor of `--tunnel`), `--tunnel` (needs `@expo/ngrok`), `--offline`.

Terminal UI shortcuts: A / Shift+A (Android), I / Shift+I (iOS Simulator), W (web), R (reload), S (switch Expo Go / development build), M (dev menu), Shift+M (more commands), J (React Native DevTools, Hermes), O (open in editor; `EXPO_EDITOR`, `EDITOR`), E (QR code), ? (all commands).

`run` options:

| Option | Description |
| --- | --- |
| `--no-build-cache` | Clear native cache (iOS derived data). |
| `--no-install` | Skip installing dependencies (and `npx pod-install` on iOS). |
| `--no-bundler` | Skip starting the dev server. |
| `-d, --device [device]` | Device name or ID; `--device generic` for build-only workflow. |
| `-o, --output <path>` | Copy the built binary to a directory. |
| `-p, --port <port>` | Dev server port (default 8081). |
| `--binary <path>` | Install a prebuilt binary and skip the build. |
| `--variant <v>` / `--app-id <id>` | Android variant (`debug`, `debugOptimized` SDK 54+, `release`, flavor) and application ID. |
| `--scheme <s>` / `--configuration Release` | iOS scheme and build configuration. |

`export` options: `--platform <platform>` (`ios`, `android`, `all` default; `web` if configured), `--dev`, `--output-dir <dir>` (default `dist`), `--max-workers <number>`, `-c, --clear`, `--no-minify`, `--no-bytecode`, `--no-ssg, --api-only`.

Environment variables (selected; page lists more):

| Name | Type | Description |
| --- | --- | --- |
| `EXPO_OFFLINE` | boolean | Skip all network requests when applicable. |
| `EXPO_NO_GIT_STATUS` | boolean | Skip the git status warning for `npx expo prebuild --clean`. |
| `EXPO_NO_DEV_MENU` | boolean | SDK 58+. Keep the developer menu closed, hide the tools button, skip onboarding. Defaults to `1` when Expo CLI is not interactive (CI, no TTY); set `0` to keep the menu. |
| `EXPO_PUBLIC_FOLDER` | string | Public directory path for Metro web. Default `public`. |
| `EXPO_NO_CLIENT_ENV_VARS` | boolean | Prevent inlining `EXPO_PUBLIC_` variables in client bundles. |
| `EXPO_NO_DOTENV` | boolean | Prevent all `.env` file loading across Expo CLI. |
| `EXPO_ATLAS` | boolean | SDK 53+. Gather Metro bundle information in dev or export (`EXPO_UNSTABLE_ATLAS` deprecated). |
| `EXPO_NO_DEPENDENCY_VALIDATION` | boolean | SDK 52+. Disable dependency validation in `install` and `start`. |
| `EXPO_NO_TELEMETRY` | boolean | Disable anonymous usage collection. |
| `CI` | boolean | Disable interactive functionality; `CI=1 npx expo install --check` fails if packages are outdated. |
| `EXPO_UNSTABLE_LOG_BOX` | boolean | Experimental, SDK 55+. Experimental LogBox overlay for native apps. |
| `EXPO_NO_REACT_NATIVE_WEB` | boolean | Deprecated, SDK 56+. |
| ~`EXPO_NO_INSPECTOR_PROXY`~, ~`EXPO_METRO_UNSTABLE_ERRORS`~, ~`EXPO_USE_METRO_WORKSPACE_ROOT`~, ~`EXPO_USE_UNSTABLE_DEBUGGER`~ | boolean | Deprecated. |

## Notes

- Launch target: `start` launches a development build if `expo-dev-client` is installed, otherwise Expo Go. `--dev-client` / `--go` force it.
- Tunneling requires `npm i -g @expo/ngrok`; slower than local, public URLs, not usable with `--offline`. `EXPO_TUNNEL_SUBDOMAIN` is Experimental.
- `EXPO_PACKAGER_PROXY_URL` forces the served URL (for example `exp://expo.dev:80`).
- **.expo** directory (**devices.json**, **settings.json**) is local to your machine and in **.gitignore** by default.
- Open endpoint: the dev server exposes `/_expo/open` (GET is a safe dry run that returns the deep link JSON; POST opens the project locally, same-origin only; responses 200 / 403 / 501 / 500). Query params: `platform` (`ios`, `android`, `web`), `runtime` (`default`, `expo`, `custom`, `unknown`). In SDK 58 and later the development-build deep link is `<scheme>://?__expo_url=…`, in SDK 57 and earlier `<scheme>://expo-development-client/?url=…`.
- `export:web` (webpack) is Deprecated: since SDK 50 use universal Metro (`npx expo export`). `experiments.baseUrl` (sub-path hosting) is Experimental and production-only.
- Android `debugOptimized` variant: C++ debugging is disabled. iOS `run` pipes simulator native error logs to the terminal (not physical devices).
- `expo.install.exclude` in **package.json** excludes packages from version checking.
- Telemetry is anonymous and opt-out with `EXPO_NO_TELEMETRY=1`.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react skill and a future react-native skill for those.
- Source pinned by fetch date 2026-10-17; `@expo/cli` 58.1.10.

```sh
npx expo install expo-camera
npx expo install --check
npx expo run:ios --configuration Release --device generic --output ./build
```

## Related

- [Continuous Native Generation (CNG)](./continuous-native-generation.md)
- [Create a debug build locally](./local-app-development.md)
- [Development and production modes](./development-mode.md)
- [Release statuses](./release-statuses.md)
