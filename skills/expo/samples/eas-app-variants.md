---
source: https://docs.expo.dev/tutorial/eas/multiple-app-variants/
---

# Multiple App Variants on One Device

Give development and preview builds unique identifiers with `app.config.js` and an `APP_VARIANT` environment variable so they install side by side.

```js app.config.js
const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.yourname.stickersmash.dev';
  }

  if (IS_PREVIEW) {
    return 'com.yourname.stickersmash.preview';
  }

  return 'com.yourname.stickersmash';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'StickerSmash (Dev)';
  }

  if (IS_PREVIEW) {
    return 'StickerSmash (Preview)';
  }

  return 'StickerSmash: Emoji Stickers';
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});
```

```json eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "APP_VARIANT": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "APP_VARIANT": "preview"
      }
    }
  }
}
```

```json package.json
{
  "scripts": {
    "dev": "APP_VARIANT=development npx expo start"
  }
}
```

## Notes

- Each variant needs a unique Android Application ID (`android.package`) and iOS Bundle Identifier (`ios.bundleIdentifier`) to be installed simultaneously.
- Changing the identifiers makes EAS CLI prompt for a new Android keystore and a new iOS provisioning profile.
- The `ios-simulator` build profile in the tutorial extends `development`, so it inherits `APP_VARIANT`.
- Start the dev server with `npm run dev` so the local **app.config.js** evaluation sees `APP_VARIANT=development`.
- Keep static values in **app.json** and put only dynamic values in **app.config.js**.
- Source: https://docs.expo.dev/tutorial/eas/multiple-app-variants/ (fetched 2026-10-17).
