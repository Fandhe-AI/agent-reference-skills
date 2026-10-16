---
source: https://docs.expo.dev/config-plugins/dangerous-mods/
---

# Using a dangerous mod

Dangerous mods give direct access to native project files through string manipulation and regular expressions. Existing mod plugins are recommended; dangerous mods are an escape hatch.

## Signature / Usage

```tsx
import { ConfigPlugin, withDangerousMod } from 'expo/config-plugins';
import fs from 'fs/promises';
import path from 'path';

const myPlugin: ConfigPlugin = config => {
  return withDangerousMod(config, [
    'platform', // 1. "ios" | "android"
    async config => {
      // 2. Async modification function
      // 3. Build file paths
      const filePath = path.join(
        config.modRequest.platformProjectRoot, // Native project root
        'path/to/file' // Relative path to target file
      );

      try {
        // 4. Read existing file, modify its contents, and write back to the file
        let contents = await fs.readFile(filePath, 'utf8');
        contents = modifyContents(contents);
        await fs.writeFile(filePath, contents);

        // 5. Log success and failure states
        console.log('✅ Successfully modified file');
      } catch (error) {
        console.warn('⚠️ File modification failed:', error);
      }

      return config;
    },
  ]);
};
```

## Options / Props

Paths on `config.modRequest`:

| Path | Type | Description |
| --- | --- | --- |
| `projectRoot` | `string` | Universal app project root where **package.json** is located. |
| `platformProjectRoot` | `string` | Platform-specific root (**projectRoot/android** or **projectRoot/ios**). |
| `projectName` | `string` | iOS only. Project name for building paths like **projectRoot/ios/[projectName]/**. |
| `introspect` | `boolean` | Introspection mode; when `true`, only read and analyze, do not write. |
| `ignoreExistingNativeFiles` | `boolean` | Whether to ignore existing native files (template-based operations, entitlements, etc.). |

## Notes

- Dangerous mods are rarely idempotent, run before other modifiers (order can be unreliable), compose poorly with other text-manipulating mods, and are experimental and subject to change. Test with each SDK release.
- Use when no standard mod (`withAndroidManifest`, `withPodfile`, `withPodfileProperties`, ...) exists, for legacy SDKs lacking a mod plugin, or for regex / replace-based edits.
- Do not assume a file exists; check the native directory and path first (`npx expo prebuild` generates them).
- The official page demonstrates a `withCustomPodfile` plugin that inserts `pod 'Alamofire', '~> 5.6'` after `use_expo_modules!` in **ios/Podfile** using `IOSConfig.XcodeUtils.getProjectName`; the page notes `withPodfile` makes this unnecessary in practice.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Mods](./mods.md)
- [Create and use config plugins](./config-plugins.md)
