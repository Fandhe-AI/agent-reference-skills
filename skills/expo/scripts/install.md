---
source: https://docs.expo.dev/more/expo-cli/
---

# Install

Commands to create a new project, install packages, and validate package versions.

## Create a new project (SDK 58)

```sh
npx create-expo-app@latest --template default@sdk-58
```

Source: `https://docs.expo.dev/more/create-expo/`. During the SDK 58 transition period, `create-expo-app@latest` without `--template` creates an SDK 57 project (use SDK 57 if you test with Expo Go on a physical device). Forms for other package managers: yarn `yarn create expo-app --template default@sdk-58`, pnpm `pnpm create expo-app --template default@sdk-58`, bun `bun create expo --template default@sdk-58`.

## Create with default options

```sh
npx create-expo-app@latest --yes --template default@sdk-58
```

`--yes` creates the project with the default options.

## Create without installing dependencies

```sh
npx create-expo-app@latest --no-install --template default@sdk-58
```

Skips installing npm dependencies and CocoaPods.

## Create without generating AGENTS.md

```sh
npx create-expo-app@latest --no-agents-md --template default@sdk-58
```

By default, AGENTS.md is generated (and .claude/settings.json as well when Claude Code is detected).

## Create from an example project

```sh
npx create-expo-app --example with-router
```

With `--example` alone, you choose interactively from the list in expo/examples.

## Install a library

```sh
npx expo install expo-camera
```

Replacement for `npm install`. Picks the version compatible with your `react-native` version. To install several at once: `npx expo install typescript expo-sms`.

## Pass arguments to the package manager

```sh
yarn expo install typescript -- -D
```

Everything after `--` is passed to the underlying package manager (the above is equivalent to `yarn add typescript -D`).

## Specify the package manager explicitly

```sh
npx expo install expo-camera --npm
```

Use `--bun` / `--npm` / `--pnpm` / `--yarn`. When omitted, the package manager is detected from the lockfile.

## Validate installed package versions

```sh
npx expo install --check
```

Lists packages with mismatched versions and, locally, prompts you to fix them. In CI, it exits with a non-zero code.

## Validate specific packages only

```sh
npx expo install react-native expo-sms --check
```

## Automatically fix mismatches

> **Warning**: This rewrites `package.json` and the lockfile. Commit or stash your working tree first, and run it on a throwaway branch.

```sh
npx expo install --fix
```

Unlike `--check`, it always fixes mismatches regardless of the environment.

## Validate in CI

```sh
CI=1 npx expo install --check
```

Fails if there are outdated packages (official example).
