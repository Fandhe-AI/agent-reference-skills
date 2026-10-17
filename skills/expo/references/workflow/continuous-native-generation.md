---
source: https://docs.expo.dev/workflow/continuous-native-generation/
---

# Continuous Native Generation (CNG)

Short-lived native projects (**android** and **ios**) are generated on demand from a template plus configuration (app config, config plugins), instead of being maintained for the lifetime of the codebase. Expo implements CNG with Prebuild (`npx expo prebuild`).

## Signature / Usage

```sh
npx expo prebuild
npx expo prebuild --clean
npx expo prebuild --platform ios
npx expo prebuild --skip-dependency-update react-native,react
npx expo prebuild --template /path/to/template.tgz
```

## Options / Props

| Option | Description |
| --- | --- |
| `--clean` | Delete existing native directories before generating. Warns about uncommitted git changes (skipped in CI); disable the check with `EXPO_NO_GIT_STATUS=1`. Without it, changes are layered on existing files (faster, may differ). |
| `--platform <platform>` | Run prebuild for individual platforms. Supports Android and iOS only (web has no native project). |
| `--skip-dependency-update <list>` | Skip changing npm package versions, for example `react-native,react`. |
| `--npm` / `--yarn` / `--pnpm` | Force a package manager. Default is inferred from the lockfile. |
| `--no-install` | Skip all installations (useful for testing generation quickly). |
| `--template <path>` | Use a custom template. Not generally recommended: base modifiers in `@expo/prebuild-config` make undocumented assumptions about template files. |

## Notes

- Expo enables CNG by combining: app config, `npx expo prebuild` arguments, the installed `expo` version and its prebuild template, Autolinking, native subscribers, and EAS Credentials.
- Do not edit generated directories manually; use config plugins (functions that modify native projects during prebuild). Non-idempotent plugins (for example multiple "dangerous modifiers") are why `--clean` is the safest option.
- EAS Build runs Prebuild only if the project has no **android** and **ios** directories (default for `create-expo-app` projects). To force it, add `/android` and `/ios` to **.gitignore** or **.easignore**.
- `npx expo run:android|ios` runs prebuild once for the platform if native directories are absent; re-run `npx expo prebuild --clean` on later runs to resync.
- Templates come from the npm package `expo-template-bare-minimum`, per Expo SDK version. A warning is shown when React / React Native versions differ from the template's `dependencies`. Private-registry environments must pass a locally available template.
- Side effects outside **android** / **ios**: replaces `expo start --android` / `--ios` with `expo run:android` / `expo run:ios` in `package.json` `scripts`, and modifies `dependencies`.
- Prebuild is optional; for existing React Native projects with manually managed native code do not run it (it may overwrite customizations). CNG is not intended for existing brownfield projects.
- Library authors can adopt CNG via config plugins, Autolinking, or Expo Modules lifecycle listeners (Android lifecycle listeners / AppDelegate subscribers). Out-of-tree plugins live in `expo/config-plugins`.
- The terms "ejecting" and "managed vs bare workflow" are deprecated; the page presents CNG (Prebuild) as the current model, while projects with manually managed native directories can still opt out (see above).
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react / react-native skills for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: September 25, 2026).

## Related

- [Adopt Prebuild](./adopting-prebuild.md)
- [Add custom native code](./customizing-native-code.md)
- [Expo CLI](./expo-cli.md)
- [Create a debug build locally](./local-app-development.md)
