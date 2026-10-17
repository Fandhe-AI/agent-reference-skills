---
source: https://docs.expo.dev/tutorial/eas/configure-development-build/
---

# Configure a Development Build with EAS

Install `expo-dev-client`, link the project to EAS, and generate `eas.json` with development, preview and production build profiles.

```sh
npx expo install expo-dev-client
npx expo start
npm install --global eas-cli
eas login
eas init
eas build:configure
```

`eas build:configure` (platform **All**) creates this `eas.json`:

```json eas.json
{
  "cli": {
    "version": ">= 24.12.1",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

`eas init` adds the project ID to the app config:

```json
{
  "extra": {
    "eas": {
      "projectId": "0cd3da2d-xxx-xxx-xxx-xxxxxxxxxx"
    }
  }
}
```

## Notes

- `developmentClient: true` produces a debug build that loads the app through `expo-dev-client`; `distribution: "internal"` shares it outside the app stores.
- `eas init` writes `extra.eas.projectId` and `owner` into **app.json**, and uploads the app `icon` as the project icon if none exists.
- After installing a new library, stop the dev server, run the install command, then start it again with `npx expo start`.
- The tutorial installs EAS CLI globally; the package manager tabs (yarn / pnpm / bun) are available on the source page.
- Source: https://docs.expo.dev/tutorial/eas/configure-development-build/ (fetched 2026-10-17). Next chapter: https://docs.expo.dev/tutorial/eas/android-development-build/
