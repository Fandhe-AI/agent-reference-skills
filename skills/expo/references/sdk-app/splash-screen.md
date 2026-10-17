---
source: https://docs.expo.dev/versions/v58.0.0/sdk/splash-screen/
---

# SplashScreen

`expo-splash-screen` provides control over the native splash screen. By default it hides automatically when the app is ready; visibility can also be controlled manually.

## Signature / Usage

```sh
npx expo install expo-splash-screen
```

```tsx
// app/_layout.tsx (Expo Router) - delay hiding while resources load
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function doAsyncStuff() {
      try {
        // do something async here
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    doAsyncStuff();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return <Stack />;
}
```

Animation options (optional; fade animation is built in):

```tsx
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
```

Config plugin (recommended method; the other methods are legacy and will be removed):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#232323",
          "image": "./assets/splash-icon.png",
          "dark": {
            "image": "./assets/splash-icon-dark.png",
            "backgroundColor": "#000000"
          },
          "imageWidth": 200
        }
      ]
    ]
  }
}
```

## Options / Props

### Config plugin properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `backgroundColor` | `string` | `"#ffffff"` | Hex color of the splash screen background. |
| `image` | `string` | `undefined` | Path to the image file displayed on the splash screen (app icon or logo). |
| `enableFullScreenImage_legacy` | `boolean` | `false` | Only for: iOS (plugin table). Use a full screen image; transition helper from the legacy configuration, will be removed. |
| `dark` | `{ backgroundColor: string, image: string }` | `undefined` | Properties for dark mode. |
| `imageWidth` | `number` | `100` | Width of the image. |
| `android` | `Partial<AndroidSplashConfig>` | `undefined` | Android specific properties. |
| `ios` | `Partial<IOSSplashConfig>` | `undefined` | iOS specific properties. |
| `resizeMode` | `'contain' \| 'cover' \| 'native'` | `"contain"` per API section (plugin table lists `undefined`) | How the image is scaled to fit the container defined by `imageWidth`. |

### Methods (Android, iOS, tvOS)

| Name | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `SplashScreen.hide()` | — | `void` | Hides the native splash screen immediately. Make sure the app has content ready to avoid a blank screen. |
| `SplashScreen.hideAsync()` | — | `Promise<void>` | Same as `hide()`, provided for backwards compatibility. |
| `SplashScreen.preventAutoHideAsync()` | — | `Promise<boolean>` | Keeps the native splash screen visible until `hideAsync` is called. Call it in global scope without awaiting, not inside components or hooks (it may run too late). |
| `SplashScreen.setOptions(options)` | `options: SplashScreenOptions` | `void` | Configures the default animation behavior. |

### SplashScreenOptions

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | `400` | Duration of the fade out animation in milliseconds. |
| `fade` | `boolean` | `false` | iOS. Whether to hide the splash screen with a fade out animation. |

## Notes

- Platforms: android, ios, tvos. Not included in Expo Go.
- From SDK 52, Expo Go and development builds cannot fully replicate the standalone app splash screen: Expo Go shows the app icon instead, and development builds do not reflect all config plugin properties. Test on a release build.
- Existing React Native app: follow the installation instructions in the `expo-splash-screen` repository (bare React Native projects).
- Custom animation: see the `with-splash-screen` example (`npx create-expo-app --example with-splash-screen`).
- Source: `sdk-58` branch `packages/expo-splash-screen`; modificationDate September 15, 2026.

## Related

- [Font](./font.md)
- [Asset](./asset.md)
- [StatusBar](./status-bar.md)
