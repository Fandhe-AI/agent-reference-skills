---
source: https://docs.expo.dev/versions/v58.0.0/sdk/fingerprint/
---

# Expo Fingerprint

`@expo/fingerprint` generates a fingerprint (hash) of a React Native project to determine compatibility between the native layer and JavaScript layer. By default it hashes app dependencies, custom native code, native project files, and configuration.

## Signature / Usage

```sh
npx expo install @expo/fingerprint
# CLI
npx @expo/fingerprint --help
```

```js
import * as Fingerprint from '@expo/fingerprint';

const fingerprint = await Fingerprint.createFingerprintAsync('/app');
console.log(fingerprint);
```

`fingerprint.config.js` (project root):

```js
/** @type {import('@expo/fingerprint').Config} */
const config = {
  // Uncomment to switch presets (the default is 'balanced'). See FingerprintPreset for the options.
  // preset: 'strict',
  sourceSkips: [
    'ExpoConfigRuntimeVersionIfString',
    'ExpoConfigVersions',
    'PackageJsonAndroidAndIosScriptsIfNotContainRun',
  ],
};
module.exports = config;
```

`.fingerprintignore` (project root, `.gitignore`-like; uses `minimatch`, relative to project root):

```ignore
# Ignore the entire android directory
android/**/*

# Ignore the entire ios directory but still keep ios/Podfile and ios/Podfile.lock
ios/**/*
!ios/Podfile
!ios/Podfile.lock

# Ignore specific package in node_modules
node_modules/some-package/**/*

# Same as above but having broader scope because packages may be nested
**/node_modules/some-package/**/*
```

## Options / Props

### Methods

All: Node.

| Name | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `Fingerprint.createFingerprintAsync(projectRoot, options)` | `projectRoot: string`, `options?: Options` | `Promise<Fingerprint>` | Creates a fingerprint for a project. |
| `Fingerprint.createProjectHashAsync(projectRoot, options)` | `projectRoot: string`, `options?: Options` | `Promise<string>` | Creates a native hash value for a project. |
| `Fingerprint.diffFingerprintChangesAsync(fingerprint, projectRoot, options)` | `fingerprint: Fingerprint`, `projectRoot: string`, `options?: Options` | `Promise<FingerprintDiffItem[]>` | Diffs the fingerprint with the fingerprint of the provided project. |
| `Fingerprint.diffFingerprints(fingerprint1, fingerprint2)` | `fingerprint1: Fingerprint`, `fingerprint2: Fingerprint` | `FingerprintDiffItem[]` | Diffs two fingerprints; assumes sources are sorted. |

### Constants

| Name | Type |
| --- | --- |
| `Fingerprint.DEFAULT_IGNORE_PATHS` | `string[]` |
| `Fingerprint.DEFAULT_SOURCE_SKIPS` | `SourceSkips` |

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `concurrentIoLimit` | `number` | number of CPU cores | I/O concurrency limit. |
| `configPluginSourceType` | `ConfigPluginSourceType` | from resolved `preset` | How config-plugin modules loaded while evaluating the Expo config are hashed. |
| `debug` | `boolean` | — | Include verbose debug info in source output. |
| `dirExcludes` | `string[]` | `['android/build', 'android/app/build', 'android/app/.cxx', 'ios/Pods']` | Deprecated: use `ignorePaths`. Excludes directories from hashing (`glob()` patterns). |
| `enableReactImportsPatcher` | `boolean` | `true` for Expo SDK 51 and lower | Transforms `#import "RCTBridge.h"` to `#import <React/RCTBridge.h>` for a stable fingerprint, since expo-modules-autolinking changes the import style on iOS. |
| `extraSources` | `HashSource[]` | — | Additional sources for hashing. |
| `fileHookTransform` | `FileHookTransformFunction` | — | Hook to transform file content sources before hashing. |
| `hashAlgorithm` | `string` | `'sha1'` | Algorithm for `crypto.createHash()`. |
| `ignorePaths` | `string[]` | implicit `DEFAULT_IGNORE_PATHS` | Ignore files/directories from hashing (`glob()` pattern, slightly different from gitignore; partial matching unsupported: `build` does not match `android/build`, use `'**' + '/build'`). Override defaults with a `!` prefix. |
| `nativeModuleSourceType` | `NativeModuleSourceType` | from resolved `preset` | How autolinked native modules are hashed. |
| `platforms` | `Platform[]` | `['android', 'ios']` | Limit native files to the specified platforms. |
| `preset` | `FingerprintPreset` | `'balanced'` | Preset to derive defaults from; explicit options take precedence. |
| `silent` | `boolean` | — | Mute all console output (useful when a CLI prints the fingerprint). |
| `sourceSkips` | `SourceSkips` | `DEFAULT_SOURCE_SKIPS` | Skip some sources; bitwise-OR of `SourceSkips` values. |
| `useRNCoreAutolinkingFromExpo` | `boolean` | `true` for Expo SDK 52 and higher | Use react-native core autolinking sources from `expo-modules-autolinking` instead of `@react-native-community/cli`. |

### Types

| Name | Definition |
| --- | --- |
| `Config` | `Pick<Options, 'preset' \| 'concurrentIoLimit' \| 'hashAlgorithm' \| 'ignorePaths' \| 'extraSources' \| 'enableReactImportsPatcher' \| 'useRNCoreAutolinkingFromExpo' \| 'nativeModuleSourceType' \| 'configPluginSourceType' \| 'debug' \| 'fileHookTransform'>` plus `sourceSkips?: SourceSkips \| SourceSkipsKeys[]`. Supported options for `fingerprint.config.js`. |
| `Fingerprint` | `hash: string` (final hash), `sources: FingerprintSource[]` |
| `FingerprintSource` | `HashSource` plus `debugInfo?: DebugInfo`, `hash: string \| null` (null if excluded) |
| `FingerprintDiffItem` | `{ op: 'added', addedSource }` \| `{ op: 'removed', removedSource }` \| `{ op: 'changed', beforeSource, afterSource }` |
| `FingerprintPreset` | `'strict' \| 'balanced' \| 'relaxed'`. `strict`: highest fidelity, even a version bump changes the fingerprint (historical default). `balanced`: the default. `relaxed`: for multiple variants from one native project; on top of `balanced`, ignores app icons and Android `package` / iOS `bundleIdentifier`. |
| `ConfigPluginSourceType` | `'files' \| 'package'`. `files` hashes every loaded module from its files; `package` collapses node_modules modules to `name@version` (in-repo modules still hashed from files). |
| `NativeModuleSourceType` | `'files' \| 'package'`. `files` hashes the module's native directory; `package` hashes `package.json` `name@version`. |
| `FileHookTransformFunction(source, chunk, isEndOfFile, encoding)` | `source: FileHookTransformSource`, `chunk: Buffer \| string \| null`, `isEndOfFile: boolean`, `encoding: BufferEncoding` → `Buffer \| string \| null` |
| `FileHookTransformSource` | `{ filePath: string, type: 'file' }` \| `{ id: string, type: 'contents' }` |
| `HashSource` | `HashSourceFile \| HashSourceDir \| HashSourceContents \| HashSourcePackage` |
| `HashResult` | `HashResultFile \| HashResultDir \| HashResultContents \| HashResultPackage` |
| `DebugInfo` | `DebugInfoFile \| DebugInfoDir \| DebugInfoContents \| DebugInfoPackage` |
| `Platform` | `'android' \| 'ios'` |
| `ProjectWorkflow` | `'generic' \| 'managed' \| 'unknown'` |

### Interfaces

| Name | Properties |
| --- | --- |
| `HashSourceFile` | `filePath: string`, `overrideHashKey?: string`, `reasons: string[]`, `type: 'file'` |
| `HashSourceDir` | `filePath: string`, `overrideHashKey?: string`, `reasons: string[]`, `type: 'dir'` |
| `HashSourceContents` | `contents: string \| Buffer<ArrayBufferLike>`, `id: string`, `reasons: string[]`, `type: 'contents'` |
| `HashSourcePackage` | `filePath: string` (path to the package's `package.json`; not part of the hash), `name: string`, `overrideHashKey?: string` (default key `name@version`), `reasons: string[]`, `type: 'package'`, `version: string` |
| `HashResultFile` / `HashResultDir` / `HashResultContents` / `HashResultPackage` | `debugInfo?`, `hex: string`, `id: string`, `type: 'file' \| 'dir' \| 'contents' \| 'package'` |
| `DebugInfoFile` | `hash: string`, `isTransformed?: boolean`, `path: string` |
| `DebugInfoDir` | `children: (DebugInfoFile \| DebugInfoDir \| undefined)[]`, `hash: string`, `path: string` |
| `DebugInfoContents` | `hash: string`, `isTransformed?: boolean` |
| `DebugInfoPackage` | `hash: string`, `name: string`, `path: string`, `version: string` |

### SourceSkips enum (bitmask)

| Name | Value | Description |
| --- | --- | --- |
| `None` | 0 | Skip nothing. |
| `ExpoConfigVersions` | 1 | `version`, `android.versionCode`, `ios.buildNumber`, and platform-specific `ios.version` / `android.version` in app.json. |
| `ExpoConfigRuntimeVersionIfString` | 2 | `runtimeVersion` in app.json if it is a string. |
| `ExpoConfigNames` | 4 | `name`, `description`, `web.name`, `web.shortName`, `web.description`. |
| `ExpoConfigAndroidPackage` | 8 | Android package name. |
| `ExpoConfigIosBundleIdentifier` | 16 | iOS bundle identifier. |
| `ExpoConfigSchemes` | 32 | Schemes. |
| `ExpoConfigEASProject` | 64 | EAS project information. |
| `ExpoConfigAssets` | 128 | Assets, including icons and splash assets. |
| `ExpoConfigAll` | 256 | Skip the whole ExpoConfig. Prefer the other flags; may ignore native changes such as new config plugins, app icon, or app name. |
| `PackageJsonAndroidAndIosScriptsIfNotContainRun` | 512 | package.json scripts if `android` and `ios` items do not contain "run" (consistent fingerprint before and after prebuild). |
| `PackageJsonScriptsAll` | 1024 | The whole `scripts` section. |
| `GitIgnore` | 2048 | `.gitignore` files. |
| `ExpoConfigExtraSection` | 4096 | The `extra` section in app.json. |
| `EasJson` | 8192 | `eas.json` (some fields do affect native, e.g. `ios.buildConfiguration`, `android.gradleCommand`). |
| `Easignore` | 16384 | `.easignore`. Excluding a file that affects the native build will not change the fingerprint. |
| `AutolinkingConfigPaths` | 32768 | Path fields in the resolved autolinking config from `expo-modules-autolinking` and `react-native-config`; linked module names and `scriptPhases` names remain. |

Customizing sources before hashing (`fileHookTransform`):

```js
/** @type {import('@expo/fingerprint').Config} */
const config = {
  fileHookTransform: (source, chunk, isEndOfFile, encoding) => {
    // Remove the "updates" section from the app config
    if (source.type === 'contents' && source.id === 'expoConfig') {
      const config = JSON.parse(chunk);
      delete config.updates;
      return JSON.stringify(config);
    }
    // For other sources, just return the chunk
    return chunk;
  },
};

module.exports = config;
```

## Notes

- Platforms: node. `@expo/fingerprint` is included with `expo` and `expo-updates` by default; if only transitively installed, import types from `expo/fingerprint` (`@type {import('expo/fingerprint').Config}`).
- Limitation: raw functions in config plugins are not serializable. The library uses `Function.name`, or `withAnonymous` for anonymous functions, as the fingerprint property, so changing the implementation of a raw plugin function does not change the hash. Use named functions with stable names, or local config plugins as separate modules (for example `"plugins": "./plugins/withMyPlugin"`) and rename when the implementation changes.
- Large files in `fileHookTransform` arrive in multiple chunks; buffer all chunks and return the result when `isEndOfFile` is true (return `null` until then).
- Source: `sdk-58` branch `packages/@expo/fingerprint`; modificationDate September 15, 2026.

## Related

- [Expo](./expo.md)
- [DevClient](./dev-client.md)
