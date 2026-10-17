---
source: https://r3f.docs.pmnd.rs/getting-started/installation
---

# React Native

Project creation and dependency installation for React Native / Expo. Import from `@react-three/fiber/native`.

## Create an Expo app

```sh
# Create a managed/bare app
npx create-expo-app
cd my-app
```

Both managed and bare apps are created with `npx create-expo-app` (the official docs list it with `# or` alongside the commands in the next section).

## Create a React Native app and add Expo modules

> **Warning**: `npx @react-native-community/cli@latest init` generates a new project, and `npx install-expo-modules@latest` wires Expo modules into the project in the current directory. Do not run them against an existing app; use a throwaway new directory. For manual installation or migration, see the official Expo modules installation guide.

```sh
# Create and link bare app
npx @react-native-community/cli@latest init my-app
cd my-app
npx install-expo-modules@latest
```

The official docs place `cd my-app` last, but `install-expo-modules` must run inside the generated project directory, so the order is swapped here.

## Install dependencies

```sh
# Automatically install
npx expo install expo-gl

# Install NPM dependencies
npm install three @react-three/fiber
```

Loading assets with `useLoader` or drei's `useGLTF` / `useTexture` may require `metro.config.js` settings (see references/getting-started/react-native.md). The iOS simulator has incomplete OpenGL ES support; the official docs recommend testing on a physical device (iOS 16 or later).

## Notes

- Adapted: the official docs (v9.8.2) give `npx react-native init my-app`, but that command was removed as of React Native 0.75; it is replaced here with the current `npx @react-native-community/cli@latest init my-app`.
- Adapted: the official docs give `expo install expo-gl` (assuming a global expo-cli), but the global expo-cli is deprecated; it is replaced here with `npx expo install expo-gl`, which uses the project-local Expo CLI.
