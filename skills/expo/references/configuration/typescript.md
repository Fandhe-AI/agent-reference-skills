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

TypeScript config files via `tsx`:

```js
require('tsx/cjs'); // Add this to import TypeScript files
module.exports = require('./metro.config.ts');
```

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
- **app.config.ts** is supported by default but not external TypeScript modules or **tsconfig.json** customization; use `tsx` for that. Install with `npx expo install tsx --dev` (Windows: `npx expo install tsx "--" --dev`).
- Deprecated: **webpack.config.ts** with `@expo/webpack-config`.
- Some language features (for example decorators) require extra options such as `experimentalDecorators`.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Configure with app config](./configuration.md)
- [Metro bundler](./customizing-metro.md)
- [metro.config.js](./metro-config.md)
