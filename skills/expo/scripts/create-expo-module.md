---
source: https://docs.expo.dev/more/create-expo-module/
---

# create-expo-module

Commands to generate modules (local and standalone) for the Expo Modules API.

## Create a local module

```sh
npx create-expo-module@latest --local
```

Run it in the directory of an existing Expo project. By default the module is created in the **modules** directory; if `expo.autolinking.nativeModulesDir` is defined in `package.json`, it is created in that directory. yarn: `yarn create expo-module --local`, pnpm: `pnpm create expo-module --local`, bun: `bun create expo-module --local`.

## Create a standalone module

```sh
npx create-expo-module@latest my-module
```

Generated with an example app. Outside a Git repository, it initializes a new repository and creates an initial commit.

## Specify platforms

```sh
npx create-expo-module@latest my-module --platform android apple
```

Allowed values: `android` / `apple` / `web`.

## Specify example features

```sh
npx create-expo-module@latest my-module --features Function AsyncFunction
npx create-expo-module@latest my-module --features all
```

Allowed values: `Constant` / `Function` / `AsyncFunction` / `Event` / `View` / `ViewEvent` / `SharedObject` / `all`. `--full-example` is equivalent to `--features all`.

## Create without an example app

```sh
npx create-expo-module@latest my-module --no-example
```

## Create non-interactively

```sh
npx create-expo-module@latest my-module --name MyModule --package expo.modules.mymodule --platform android apple --features Function AsyncFunction --description "My module" --license MIT --module-version 0.1.0
```

In CI or when stdin is not a TTY, interactive prompts are skipped. Values you do not specify are filled with defaults and a warning is shown.

## Add platform support to an existing module

```sh
npx create-expo-module@latest add-platform-support
npx create-expo-module@latest add-platform-support ./packages/my-module
npx create-expo-module@latest add-platform-support --platform android --features Function Event
```

Run it in the module root (a path can also be given). In non-interactive mode, `--platform` is required. Existing native directories (android / ios, etc.) are not overwritten.

## Develop a standalone module

```sh
cd my-module
npm run open:android
npm run open:ios
cd example
npx expo start
```

`open:ios` requires macOS and Xcode. Rebuild the example app after changing native code.

## Use the beta template

```sh
EXPO_BETA=1 npx create-expo-module@latest my-module
```
