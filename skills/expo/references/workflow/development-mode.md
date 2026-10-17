---
source: https://docs.expo.dev/workflow/development-mode/
---

# Development and production modes

A project always runs in either development or production mode. `npx expo start` runs in development mode; a published project (`eas update`) or standalone app runs in production mode.

## Signature / Usage

```sh
# Simulate production locally
npx expo start --no-dev --minify
```

## Options / Props

| Flag | Description |
| --- | --- |
| `--no-dev` | Run JavaScript in production mode (Metro sets `__DEV__` to `false`, among other things). |
| `--minify` | Minify the app, eliminating comments, formatting, and unused code. |

## Notes

- Development mode adds warnings (deprecated or missing required props) and access to tools (Developer menu, element inspector, performance monitor), but the app runs slower. Switch modes with Expo CLI, then close and re-open the app. Disable development mode when testing performance.
- Production mode is useful for testing performance and catching bugs that only show up in production.
- In production mode, console logs do not appear in the Expo CLI terminal; view them via native logs.
- To compile fully for production see Compiling Android and Compiling iOS in the Expo CLI reference.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react / react-native skills for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: August 11, 2026).

## Related

- [View logs](./logging.md)
- [Debugging and profiling tools](./debugging-tools.md)
- [Expo CLI](./expo-cli.md)
