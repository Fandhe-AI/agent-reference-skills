---
source: https://docs.expo.dev/guides/typescript/
---

# Using TypeScript

Expo supports TypeScript out of the box. New projects from the default template include base TypeScript configuration; existing JavaScript projects can migrate by renaming files and extending `expo/tsconfig.base`.

## Signature / Usage

```sh
npx create-expo-app@latest --template default@sdk-58
npx expo install typescript @types/react --dev
npx expo customize tsconfig.json
```

**tsconfig.json** (strict optional):

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

Path aliases:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Disable path aliases (`tsconfigPaths` is enabled by default):

```json
{
  "expo": {
    "experiments": {
      "tsconfigPaths": false
    }
  }
}
```

In SDK 57 and later, Expo CLI loads **metro.config.ts** without extra setup. Rename **metro.config.js** to **metro.config.ts**, because Expo CLI uses **metro.config.js** when both exist:

```ts
import { getDefaultConfig } from 'expo/metro-config';

const config = getDefaultConfig(import.meta.dirname);

export default config;
```

**app.config.ts** works without extra setup. For external TypeScript modules or **tsconfig.json** customization, install `tsx` and use its `tsx/cjs` require hook in the app config:

```ts
import 'tsx/cjs'; // Add this to import TypeScript files
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'my-app',
  slug: 'my-app',
};

export default config;
```

## Notes

- Use **.tsx** for files with JSX and **.ts** otherwise. `npx expo start` also installs `typescript` and `@types/react`. On Windows use `npx expo install typescript @types/react "--" --dev`. Type-check with `tsc`.
- Path aliases: restart Expo CLI after editing **tsconfig.json** (no Metro cache clear needed). **jsconfig.json** can replace **tsconfig.json** without TypeScript. Aliases add resolution time, are supported only by Metro (including Metro web), not the deprecated `@expo/webpack-config`, and existing React Native projects need extra setup.
- Absolute imports: set `compilerOptions.baseUrl` (for example `"./"`) to import `src/components/Button`. `paths` resolve relative to `baseUrl` if defined, otherwise the project root. `baseUrl` is resolved before node modules (a local `./path.ts` can shadow node module `path`). Restart Expo CLI after changes.
- Type generation: some Expo libraries generate types when the project builds or when running `npx expo customize tsconfig.json`.
- **app.config.ts** is supported by default but not external TypeScript modules or **tsconfig.json** customization; use `tsx` for that. The official guide no longer shows a `tsx`-based **metro.config.js** wrapper (see the **metro.config.ts** snippet above). Install with `npx expo install tsx --dev` (Windows: `npx expo install tsx "--" --dev`).
- Deprecated: **webpack.config.ts** with `@expo/webpack-config`.
- Some language features (for example decorators) require extra options such as `experimentalDecorators`.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).
- Source: https://docs.expo.dev/guides/typescript/ (docs/pages/guides/typescript.mdx at tag expo@58.0.25). Anchors: `#metro-config`, `#app-config`, `#webpack-config`.

## Related

- [Configure with app config](./configuration.md)
- [Metro bundler](./customizing-metro.md)
- [metro.config.js](./metro-config.md)
