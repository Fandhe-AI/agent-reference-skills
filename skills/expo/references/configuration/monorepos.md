---
source: https://docs.expo.dev/guides/monorepos/
---

# Work with monorepos

Expo has first-class support for monorepos managed with package managers that support workspaces: Bun, npm, pnpm, and Yarn (v1 Classic and Berry). Expo detects monorepos from the workspace configuration and configures new app projects automatically.

## Signature / Usage

Root **package.json**:

```json
{
  "name": "monorepo",
  "private": true,
  "version": "0.0.0",
  "workspaces": ["apps/*", "packages/*"]
}
```

pnpm uses **pnpm-workspace.yaml**:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

Create an app in the monorepo:

```sh
npx create-expo-app@latest --template default@sdk-58 apps/cool-app
```

Depend on a workspace package (`"workspace:*"` is also supported by Bun, npm, and pnpm):

```json
{
  "dependencies": {
    "cool-package": "*"
  }
}
```

## Notes

- SDK 52+: Metro is configured automatically via `expo/metro-config`. If an older **metro.config.js** modifies `watchFolders`, `resolver.nodeModulesPath`, `resolver.extraNodeModules`, or `resolver.disableHierarchicalLookup`, delete them and run `npx expo start --clear` once. Before SDK 52, `watchFolders` and `resolver.nodeModulesPaths` had to be set manually.
- Isolated dependencies (Bun, pnpm default): supported from SDK 54; with SDK 53 disabling isolated dependencies is recommended. If libraries break, set `nodeLinker: hoisted` in **pnpm-workspace.yaml**.
- Duplicates: multiple React Native versions in one monorepo are unsupported; duplicate React versions cause runtime errors; duplicate Turbo / Expo modules may cause runtime or build errors. Inspect with `npm why react-native`, `yarn why react-native`, `pnpm why --depth=10 react-native`, `bun pm why react-native`.
- Force a single version via `resolutions` in root **package.json** (npm uses `overrides`):

```json
{
  "resolutions": {
    "react": "^19.3.0"
  }
}
```

- Native modules must never be duplicated. From SDK 54 set `experiments.autolinkingModuleResolution` to `true`; from SDK 55 it is enabled automatically for apps in monorepos.
- TV projects in monorepos have special `react-native` dependency requirements (see the Building for TV guide).
- "Script '...' does not exist": avoid hard-coded `node_modules` paths in native build files; resolve with Node (`require.resolve('react-native/package.json')`) in Gradle and Podfile. Expo SDK modules and templates already do; patch third-party hardcoded paths with `patch-package`.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Metro bundler](./customizing-metro.md)
- [package.json](./package-json.md)
