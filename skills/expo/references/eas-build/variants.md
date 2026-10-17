---
source: https://docs.expo.dev/build-reference/variants/
---

# Install app variants on the same device

Learn how to install multiple variants of an app on the same device.

## Signature / Usage

Each variant must have a unique Application ID (Android, `android.package`) or Bundle Identifier (iOS, `ios.bundleIdentifier`). Rename **app.json** to **app.config.js** and switch values with an environment variable:

```js
const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'MyApp (Dev)' : 'MyApp',
  slug: 'my-app',
  ios: {
    bundleIdentifier: IS_DEV ? 'com.myapp.dev' : 'com.myapp',
  },
  android: {
    package: IS_DEV ? 'com.myapp.dev' : 'com.myapp',
  }
};
```

Set `APP_VARIANT` in the build profile in **eas.json**:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "env": {
        "APP_VARIANT": "development"
      }
    },
    "production": {}
  }
}
```

Dev server shortcut in **package.json**:

```json
{
  "scripts": {
    "dev": "APP_VARIANT=development npx expo start"
  }
}
```

Local builds (set the variable on the `expo run` command):

```sh
APP_VARIANT=development npx expo run:ios
```

Switching variants locally requires regenerating native directories, with `APP_VARIANT` set on both commands. The official example switches from `development` to another debug variant `test`; `test` needs its own branch in **app.config.js** (the config above only distinguishes `development`), otherwise it builds with production identifiers:

```sh
APP_VARIANT=test npx expo prebuild --clean
APP_VARIANT=test npx expo run:ios
```

### Existing React Native projects: Android flavors and iOS schemes

Android: create a flavor per build profile in **android/app/build.gradle** and assign it with `gradleCommand`:

```groovy
android {
    flavorDimensions "env"
    productFlavors {
        production {
            dimension "env"
            applicationId 'com.myapp'
        }
        development {
            dimension "env"
            applicationId 'com.myapp.dev'
        }
    }
}
```

```json
{
  "build": {
    "development": {
      "android": { "gradleCommand": ":app:assembleDevelopmentDebug" }
    },
    "production": {
      "android": { "gradleCommand": ":app:bundleProductionRelease" }
    }
  }
}
```

iOS: assign a different `scheme` per profile.

```json
{
  "build": {
    "development": {
      "ios": { "buildConfiguration": "Debug", "scheme": "myapp-dev" }
    },
    "production": {
      "ios": { "buildConfiguration": "Release", "scheme": "myapp" }
    }
  }
}
```

The Podfile must use an `abstract_target 'common'` containing a `target` per variant (for example `myapp` and `myapp-dev`); duplicate the Xcode target, rename it and its scheme, and share one **Info.plist**.

## Notes

- Extra per-variant customizations: separate configuration for services tied to the application ID (Google Maps, FCM); with development builds, set the `expo-dev-client` plugin option `addGeneratedScheme: !!IS_DEV` so QR-code URLs always launch the development build.
- `APP_VARIANT` changes only the app name, Android package name and iOS bundle identifier; it does not affect compilation. If a native directory is present, `expo run` skips regenerating it, so run `prebuild --clean` when switching variants. Regenerating is safe when the directories are in **.gitignore** (Continuous Native Generation).
- With EAS Update, set the correct environment variables for the variant being published when running `eas update`.
- In an existing React Native project, migrate to Continuous Native Generation and add `android` and `ios` to **.gitignore** if the app config should be the source of truth; otherwise the wrong variant may run or development builds may not be detected.
- Android: EAS CLI supports only the `applicationId` field; `applicationIdSuffix` in `productFlavors` or `buildTypes` is not detected correctly.
- Flavor extras: per-flavor `strings.xml` (`android/app/src/development/res/values/strings.xml`), `mipmap-*` icons, `google-services.json` in `android/app/src/{flavor}/`, Sentry `flavorAware: true` with `android/sentry-{flavor}-{buildType}.properties`. iOS display name via `$(DISPLAY_NAME)` user-defined build setting and app icon via `Primary App Icon Set Name`.
- Source modificationDate: September 25, 2026 (fetched 2026-10-17).

## Related

- [Configure EAS Build with eas.json](./build-eas-json.md)
- [Build APKs for Android Emulators and devices](./apk.md)
- [iOS App Extensions](./app-extensions.md)
