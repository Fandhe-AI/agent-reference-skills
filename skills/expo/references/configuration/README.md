# configuration

| Name | Description | Path |
|------|-------------|------|
| app.json / app.config.js | A reference of available properties in Expo app config. | [app-config.md](./app-config.md) |
| Privacy manifests | Configure iOS privacy manifests (PrivacyInfo.xcprivacy) to declare required-reason API usage. | [apple-privacy.md](./apple-privacy.md) |
| babel.config.js | Babel transforms modern JavaScript (ES6+) into a version compatible with the JavaScript engine on mobile devices. | [babel-config.md](./babel-config.md) |
| BuildProperties | `expo-build-properties` is a config plugin for customizing native Android and iOS build properties. | [build-properties.md](./build-properties.md) |
| Introduction to config plugins | With Continuous Native Generation (CNG), native project changes are made through config plugins. | [config-plugins-introduction.md](./config-plugins-introduction.md) |
| Create and use config plugins | How to create a config plugin, pass parameters, chain plugins, and use a plugin from an Expo library. | [config-plugins.md](./config-plugins.md) |
| Configure with app config | The app config (app.json, app.config.js, app.config.ts) configures Expo Prebuild generation, how a project loads in Expo Go, and the OTA update manifest. | [configuration.md](./configuration.md) |
| Metro bundler | Customize Metro by creating metro.config.js at the project root, extending `expo/metro-config`. | [customizing-metro.md](./customizing-metro.md) |
| Using a dangerous mod | Dangerous mods give direct access to native project files through string manipulation and regular expressions. | [dangerous-mods.md](./dangerous-mods.md) |
| Environment variables in Expo | Expo CLI automatically loads `EXPO_PUBLIC_`-prefixed variables from .env files whenever the CLI is used. | [environment-variables.md](./environment-variables.md) |
| metro.config.js | A reference of available configurations in Metro. | [metro-config.md](./metro-config.md) |
| Mods | Mods (modifiers) are asynchronous functions that modify native project files during the syncing phase of `npx expo prebuild`. | [mods.md](./mods.md) |
| Work with monorepos | Expo has first-class support for monorepos managed with Bun, npm, pnpm, and Yarn workspaces. | [monorepos.md](./monorepos.md) |
| React Native's New Architecture | SDK 55 and later run entirely on the New Architecture, which is always enabled. | [new-architecture.md](./new-architecture.md) |
| package.json | Reference for Expo-specific properties, set by adding an `expo` field in package.json. | [package-json.md](./package-json.md) |
| Using patch-project | `patch-project` is a config plugin and CLI that generates and applies Git-inspired patches to preserve native changes after `npx expo prebuild`. | [patch-project.md](./patch-project.md) |
| Permissions | Apps must request user permission for sensitive data (location, contacts, media library). | [permissions.md](./permissions.md) |
| Developing and debugging a plugin | Best practices for developing, scaffolding, safely modifying native files, and debugging Expo config plugins. | [plugin-development-debugging.md](./plugin-development-debugging.md) |
| Plugin development for libraries | How to ship a config plugin inside a React Native library so users get automated native configuration. | [plugins-for-libraries.md](./plugins-for-libraries.md) |
| React Compiler | React Compiler automatically memoizes components and hooks for fine-grained reactivity. | [react-compiler.md](./react-compiler.md) |
| Tree shaking and code removal | Expo CLI removes unused code from production bundles through platform shaking, dead-code conditionals, `EXPO_PUBLIC_` inlining, and server-code removal. | [tree-shaking.md](./tree-shaking.md) |
| Using TypeScript | Expo supports TypeScript out of the box; new projects include base TypeScript configuration. | [typescript.md](./typescript.md) |
