---
source: https://docs.expo.dev/workflow/configuration/
---

# Configure with app config

The app config (**app.json**, **app.config.js**, **app.config.ts**) configures Expo Prebuild generation, how a project loads in Expo Go, and the OTA update manifest. It must be located at the project root next to **package.json**.

## Signature / Usage

```json
{
  "name": "My app",
  "slug": "my-app"
}
```

Dynamic config (**app.config.js**) can export an object or a function that receives the static config:

```js
module.exports = ({ config }) => {
  console.log(config.name); // prints 'My App'
  return {
    ...config,
  };
};
```

TypeScript config:

```ts
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'my-app',
  name: 'My App',
});
```

Switching by environment:

```js
module.exports = () => {
  if (process.env.MY_ENVIRONMENT === 'production') {
    return {
      /* your production config */
    };
  } else {
    return {
      /* your development config */
    };
  }
};
```

```sh
MY_ENVIRONMENT=production eas update
```

Reading values at runtime (`extra` passes arbitrary data):

```js
import Constants from 'expo-constants';

Constants.expoConfig.extra.fact === 'kittens are cool';
```

## Notes

- If the config has a top-level `expo: {}` object, it is used in place of the root object and all other keys are ignored.
- Most config is readable at runtime via `Constants.expoConfig`. Do not put sensitive information in the app config. Verify what is embedded with `npx expo config --type public`.
- Fields filtered out of the public app config (not on `Constants.expoConfig`): `ios.config`, `android.config`, `updates.codeSigningCertificate`, `updates.codeSigningMetadata`.
- Avoid importing **app.json** / **app.config.js** directly in JavaScript; use `Constants.expoConfig`.
- Dynamic config (**app.config.js** / **app.config.ts**) supports comments, variables, single quotes, ESM `import` syntax, TypeScript (nullish coalescing, optional chaining), is updated whenever Metro reloads, can provide environment information, and does not support Promises. Importing other TypeScript files or customizing language features requires `tsx`.
- **app.config.mts**, **app.config.cts**, **app.config.mjs**, **app.config.cjs** are also discovered. By default the config is transpiled to CommonJS and `.js` / `.ts` files can mix ESM and CommonJS; use an explicit extension to lock the module format.
- Resolution rules: (1) static config is read if **app.config.json** exists (falls back to **app.json**); with no static config, defaults are inferred from **package.json** and dependencies. (2) dynamic config is read if **app.config.ts** or **app.config.js** exists; TypeScript wins if both exist. (3) if the dynamic config returns a function, the static config is passed as `({ config }) => ({})` (middleware-like). (4) the returned value is the final config and cannot contain promises. (5) all functions are evaluated and serialized before any Expo tool uses the config; the config must be a JSON manifest when hosted. (6) a top-level `expo: {}` object replaces the root.
- `npx expo config` prints the final resolved configuration.
- Library authors extend the app config via config plugins (mostly used by `npx expo prebuild`).
- Source modificationDate: July 28, 2026 (unversioned guide, fetched 2026-10-17).

## Related

- [app.json / app.config.js](./app-config.md)
- [Introduction to config plugins](./config-plugins-introduction.md)
- [Environment variables in Expo](./environment-variables.md)
- [Using TypeScript](./typescript.md)
