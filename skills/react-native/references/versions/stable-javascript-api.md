---
source: https://reactnative.dev/blog/2025/06/12/moving-towards-a-stable-javascript-api
---

# Moving Towards a Stable JavaScript API (New Changes in 0.80)

Announcement (dated 2025-06-12): React Native 0.80 deprecates deep imports from `react-native` and introduces an opt-in Strict TypeScript API, generated from source and restricted to the package's index exports.

## Signature / Usage

Deep import to root import:

```js
// Before - import from subpath
import {Alert} from 'react-native/Libraries/Alert/Alert';

// After - import from `react-native`
import {Alert} from 'react-native';
```

Opt in to the Strict TypeScript API (0.80 form):

```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    ...
    "customConditions": ["react-native-strict-api"]
  }
}
```

## Options / Props

| Topic | Detail |
| --- | --- |
| Deep imports deprecation | Warnings in ESLint and the JS console from 0.80; removal of these import paths targeted in 0.82 |
| ESLint opt-out | Disable `@react-native/no-deep-imports` (set to `0`) via `overrides` |
| Console warnings opt-out | Pass `disableDeepImportWarnings: true` to `@react-native/babel-preset` (or `babel-preset-expo` for Expo); restart with `--reset-cache` (Expo: `--clear`) |
| Strict API types | Generated directly from source; restricted to `react-native`'s index file; resolved from `types_generated/` instead of manually maintained `types/` |
| Breaking: deep imports | Types resolvable only from the main `'react-native'` import path |
| Breaking: type names/shapes | Intentionally updated; e.g. `Linking` is a single `interface` rather than `Linking` + `LinkingStatic`; `Dimensions.get().densityDpi` is `number \| undefined` |
| Rollout | `"react-native-strict-api"` opt-in stable in 0.80; for at least the next two releases the Strict API remains opt-in; later it becomes the default and legacy types are removed |

## Notes

- The 0.82 removal target did not land as stated: deep imports into `Libraries/` became inaccessible by default only in 0.87, with the legacy opt-out available through 0.88 (see the 0.87 page).
- Opt-in affects TypeScript analysis only; nothing changes at runtime. Apps and libraries opt in independently since `tsconfig.json` only affects the immediate codebase.
- Since 0.87 the Strict TypeScript API is the default and the opt-out condition is `"react-native-legacy-deep-imports"`; the 0.80 condition `"react-native-strict-api"` is the superseded opt-in form. See the 0.87 page.
- React Native is authored in Flow; types are generated from Flow to TypeScript.
- Distinct from the typescript skill (TypeScript language itself).

## Related

- [react-native-0.87.md](./react-native-0.87.md)
- ../workflow/strict-typescript-api.md
- ../workflow/typescript.md
