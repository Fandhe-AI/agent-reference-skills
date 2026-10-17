---
source: https://docs.expo.dev/more/expo-cli/
---

# Expo CLI

Expo CLI (bundled with the `expo` package, `npx expo ...`) commands for development, build, export, and configuration.

## Start the development server

```sh
npx expo start
```

`npx expo` is an alias for `npx expo start`. Defaults to `http://localhost:8081`.

## Pin the launch target

```sh
npx expo start --dev-client
npx expo start --go
```

`--dev-client` always targets a development build; `--go` always targets Expo Go. When neither is given, a development build is used if `expo-dev-client` is installed.

## Localhost only and port selection

```sh
npx expo start --localhost
npx expo start --port 0
```

`--port 0` uses the first available port.

## Tunnel connection

```sh
npm i -g @expo/ngrok
npx expo start --tunnel
```

`@expo/ngrok` must be installed beforehand. The tunnel URL is publicly reachable.

## Start offline

```sh
npx expo start --offline
```

## Build and run locally on iOS / Android

```sh
npx expo run:ios
npx expo run:android
```

If the native directories do not exist, `npx expo prebuild` runs first. `run:ios` requires a Mac and Xcode; `run:android` requires Android Studio and Java.

## Specify a physical device or simulator

```sh
npx expo run:ios --device
```

`--device [device]` accepts a name or an ID. `--device generic` only builds.

## Android variants

```sh
npx expo run:android --variant debug
npx expo run:android --variant debugOptimized
npx expo run:android --variant release
```

`debugOptimized` is available in SDK 54 and later. `release` is unsigned for Google Play submission.

## Android product flavors

```sh
npx expo run:android --variant freeDebug --app-id dev.expo.myapp.free
```

## iOS Release configuration

```sh
npx expo run:ios --configuration Release
```

Not signed for App Store submission.

## Build for iOS Simulator only

```sh
npx expo run:ios --configuration Release --device generic --output ./build
```

`--output` specifies where the built binary is copied.

## Install a prebuilt binary

```sh
npx expo run:ios --binary <path>
```

With `--binary <path>`, the build is skipped and the binary is installed. Other common options: `--no-build-cache` / `--no-install` / `--no-bundler` / `-p, --port`.

## Export JavaScript and assets

```sh
npx expo export
```

The default output directory is `dist`, and the default for `--platform` is `all`.

## Export options

```sh
npx expo export --platform ios --output-dir dist --clear
```

Others: `--dev` / `--max-workers <number>` / `--no-minify` / `--no-bytecode` / `--no-ssg, --api-only`. `--no-bytecode` is for bundle size analysis and is not shipped to native.

## Export with webpack (deprecated)

```sh
npx expo export:web
```

Expo Webpack is deprecated as of SDK 50 (use the universal Metro `npx expo export`). It has no effect when `expo.web.bundler: 'metro'` is set.

## Generate native code (Prebuild)

```sh
npx expo prebuild
```

## Regenerate native directories

> **Warning**: `--clean` regenerates the existing native directories and discards manual changes. Track your changes in git and run it on a throwaway branch or clone. The official docs give `npx expo prebuild -p ios --clean` as the iOS example.

```sh
npx expo prebuild -p ios --clean
```

## Lint

```sh
npx expo lint
```

On first run, it sets up ESLint with the Expo configuration. The default targets are **src** / **app** / **components**.

## Lint auto-fix and target selection

```sh
npx expo lint --fix
npx expo lint ./utils constants.ts
npx expo lint --ext .ts,.tsx
npx expo lint -- --no-error-on-unmatched-pattern
```

Everything after `--` is passed to ESLint.

## Evaluate the app config

```sh
npx expo config
```

## App config output options

```sh
npx expo config --full --json
npx expo config --type public
```

`-t, --type` accepts `public` / `prebuild` / `introspect`.

## Generate configuration files

```sh
npx expo customize
```

Choose from babel.config.js / webpack.config.js / metro.config.js / tsconfig.json.

## Authentication

```sh
npx expo register
npx expo login
npx expo whoami
npx expo logout
```

Credentials are shared between Expo CLI and EAS CLI.

## Environment variables

```sh
EXPO_NO_TELEMETRY=1 npx expo start
```

Main variables: `EXPO_OFFLINE` / `EXPO_NO_TELEMETRY` / `EXPO_DEBUG` / `CI` / `EXPO_EDITOR` / `EXPO_NO_GIT_STATUS` (suppresses the git warning on `prebuild --clean`). For the full list, see the environment variable table in `references/workflow/expo-cli.md`.
