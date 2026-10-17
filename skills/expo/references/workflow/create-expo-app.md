---
source: https://docs.expo.dev/more/create-expo/
---

# create-expo-app

Command-line tool to create and set up a new Expo and React Native project, with templates.

## Signature / Usage

```sh
# npm
npx create-expo-app@latest --template default@sdk-58

# yarn
yarn create expo-app --template default@sdk-58

# pnpm
pnpm create expo-app --template default@sdk-58

# bun
bun create expo --template default@sdk-58
```

## Options / Props

| Option | Description |
| --- | --- |
| `--yes` | Uses the default options to create a new project. |
| `--no-install` | Skips installing npm dependencies or CocoaPods. |
| `--no-agents-md` | Skips generating **AGENTS.md** and **.claude/settings.json**. By default **AGENTS.md** is generated (pointing to versioned Expo docs matching the project's SDK); when Claude Code is installed, **.claude/settings.json** is also generated. |
| `--template` | Select a template (e.g. `--template default`). |
| `--example` | Initialize from an example in `expo/examples`. `npx create-expo-app --example` lists examples; `--example with-router`; `--example with-react-navigation`. |
| `--version` | Prints the version number and exits. |
| `--help` | Prints the list of available options and exits. |

Templates:

| Template | Description |
| --- | --- |
| `default` | Default template for multi-screen apps. Includes Expo CLI, Expo Router, TypeScript configuration. |
| `blank` | Minimum required npm dependencies without navigation. |
| `blank-typescript` | Blank template with TypeScript. |
| `tabs` | File-based routing with Expo Router and TypeScript. |
| `bare-minimum` | Blank template with native directories (**android**, **ios**) generated; runs `npx expo prebuild` during setup. |

## Notes

- During the SDK 58 transition period, `create-expo-app@latest` without `--template` creates an SDK 57 project. For Expo Go on a physical device use an SDK 57 project; otherwise use `--template default@sdk-58`.
- The app name entered at the prompt is also used as the app config `name`.
- Package managers: npm (EAS default if **package-lock.json**), Yarn 1 (**yarn.lock**), Yarn 2+ (uses `nodeLinker: node-modules` in **.yarnrc.yml**; on EAS set `corepack: true` in the build profile of **eas.json** and pin `packageManager` in **package.json**), pnpm (`nodeLinker: hoisted` by default in **pnpm-workspace.yaml**; SDK 54 and later support isolated installations, so the setting can be deleted), Bun (see the Using Bun guide).
- Migrating between package managers requires manually carrying out the extra configuration, including for EAS.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react skill and a future react-native skill for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: October 16, 2026); `create-expo-app` 5.0.0.

```yaml
nodeLinker: node-modules
```

## Related

- [Expo CLI](./expo-cli.md)
- [Develop an app with Expo](./workflow-overview.md)
