---
source: https://docs.expo.dev/guides/environment-variables/
---

# Environment variables in Expo

Expo CLI automatically loads `EXPO_PUBLIC_`-prefixed variables from **.env** files for use in JavaScript whenever the CLI is used (for example `npx expo start`).

## Signature / Usage

```bash
EXPO_PUBLIC_API_URL=https://staging.example.com
EXPO_PUBLIC_API_KEY=abc123
```

```tsx
import { Button } from 'react-native';

function Post() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  async function onPress() {
    await fetch(apiUrl, { ... })
  }

  return <Button onPress={onPress} title="Post" />;
}
```

## Options / Props

.env files loaded per mode (files listed first take priority):

| Mode | Files |
| --- | --- |
| Development | **.env.development.local**, **.env.local**, **.env.development**, **.env** |
| Production | **.env.production.local**, **.env.local**, **.env.production**, **.env** |

Mode per command (SDK 58 and later, each command sets `NODE_ENV` to its mode and replaces any value you set):

| Command | Mode |
| --- | --- |
| `npx expo start` | Development. Production with `--no-dev`. |
| `npx expo export` | Production. Development with `--dev`. |
| `npx expo run:android` | Development for the `debug` and `debugOptimized` variants. Production otherwise. |
| `npx expo run:ios` | Development for configurations with `Debug` in their name. Production otherwise. |
| `npx expo config`, `npx expo prebuild`, `npx expo-doctor` | Development. Production on EAS Build. |

Disabling:

| Variable | Effect |
| --- | --- |
| `EXPO_NO_DOTENV=1` | Do not load **.env** files into the global process. |
| `EXPO_NO_CLIENT_ENV_VARS=1` | Do not inline environment variables into the client bundle (Metro config). |

## Notes

- `process.env.EXPO_PUBLIC_API_URL` is replaced in the bundle. Updates apply as you edit without restarting Expo CLI or clearing the cache, but a full reload is needed to see the new value. Code inside **node_modules** is not affected.
- Each variable must be statically referenced with dot notation (`process.env.EXPO_PUBLIC_KEY`). `process.env['EXPO_PUBLIC_KEY']` and `const {EXPO_PUBLIC_X} = process.env` are not inlined.
- Never store secrets in `EXPO_PUBLIC_` variables; they are plain text in the compiled app.
- In SDK 58 and later, Expo commands do not load other **.env** files such as **.env.staging** or **.env.test**. Add `.env*.local` to **.gitignore**.
- `NODE_ENV=production npx expo start` still runs in development mode and loads **.env.development**. `eas update` calls `npx expo export`, so `NODE_ENV=test eas update` runs with `production`. With EAS, `eas env:pull` swaps **.env.local** with a chosen environment.
- EAS Build uses **.env** files uploaded with the build job and also supports variables in **eas.json** build profiles and EAS secrets. EAS Update inlines variables from local or CI **.env** files.
- Migration from react-native-config: prefix variables with `EXPO_PUBLIC_` and replace `Config.API_URL` with `process.env.EXPO_PUBLIC_API_URL`. From `babel-plugin-transform-inline-environment-variables`: rename variables, remove the plugin from the Babel config, run `npx expo start --clear`. From direnv: move variables from **.envrc** to **.env** with the prefix and drop the `Constants.expoConfig.extra` indirection.
- Source modificationDate not recorded in this extract (unversioned guide, fetched 2026-10-17).

## Related

- [Configure with app config](./configuration.md)
- [babel.config.js](./babel-config.md)
