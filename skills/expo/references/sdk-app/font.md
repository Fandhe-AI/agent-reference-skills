---
source: https://docs.expo.dev/versions/v58.0.0/sdk/font/
---

# Font

`expo-font` loads fonts from the web (or embeds them at build time) and uses them in React Native components.

## Signature / Usage

```sh
npx expo install expo-font
```

```tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  // Use `useFonts` only if you can't use the config plugin.
  const [loaded, error] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Inter-Black', fontSize: 30 }}>Inter Black</Text>
      <Text style={{ fontSize: 30 }}>Platform Default</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

Config plugin (recommended on Android and iOS; embeds fonts at build time, more efficient than `useFonts` / `loadAsync`; run prebuild afterwards):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": ["./path/to/file.ttf"],
          "android": {
            "fonts": [
              {
                "fontFamily": "Source Serif 4",
                "fontDefinitions": [
                  {
                    "path": "./path/to/SourceSerif4-ExtraBold.ttf",
                    "weight": 800
                  }
                ]
              },
              {
                "fontFamily": "Roboto Flex",
                "path": "./path/to/RobotoFlex.ttf",
                "fontDefinitions": [
                  { "weight": 400 },
                  { "weight": 700 },
                  { "weight": 400, "style": "italic", "axes": { "slnt": -10 } }
                ]
              }
            ]
          },
          "ios": {
            "fonts": ["./path/to/SourceSerif4-ExtraBold.ttf"]
          }
        }
      ]
    ]
  }
}
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| `fonts` | `[]` | Font definitions to link to the native project; paths relative to the project root. On Android the file name becomes the font family name. On iOS the family name is always taken from the font file and may differ from the file name; use `getLoadedFonts` to see what is available. |
| `android` | `{}` | Object with a `fonts` array. Use the object syntax within `fonts` to embed XML fonts with a custom family name. |
| `ios` | `{}` | Object with a `fonts` array of font file paths. The family name is taken from the font file. |

### Exports

| Name | Signature | Platforms | Description |
| --- | --- | --- | --- |
| `useFonts` | `UseFontHook` → `[loaded: boolean, error: Error \| null]` | Android, iOS, tvOS, Web | Loads a map of fonts at runtime with `loadAsync`. Returns `true` when fonts are loaded, plus an error for development. Fonts are not reloaded when the font map changes dynamically. A `fontFamily` loads once; declare all of its faces in the same call. |
| `getLoadedFonts()` | `string[]` | Android, iOS, tvOS, Web | Synchronously returns all loaded fonts (build-time config-plugin fonts and runtime `loadAsync` fonts), usable as `fontFamily` style prop. |
| `isLoaded(fontFamily)` | `fontFamily: string` → `boolean` | Android, iOS, tvOS, Web | Synchronously detects whether the font finished loading. |
| `isLoading(fontFamily)` | `fontFamily: string` → `boolean` | Android, iOS, tvOS, Web | Synchronously detects whether the font is still loading. |
| `loadAsync(fontFamilyOrFontMap, source)` | `fontFamilyOrFontMap: FontMap`, `source?: FontSource` → `Promise<void>` | Android, iOS, tvOS, Web | Loads fonts from static or remote resources. In the browser, generates a `@font-face` block in a shared style sheet. If the `fontFamily` is already loaded it resolves without replacing it. Wrap in `try/catch/finally` so the app continues if loading fails. |
| `renderToImageAsync(glyphs, options)` | `glyphs: string`, `options?: RenderToImageOptions` → `Promise<RenderToImageResult>` | Android, iOS | Creates an image with the provided text. |

Loading multiple weights/styles on web (fragment; call inside a function component):

```tsx
const [loaded, error] = useFonts([
  {
    fontFamily: 'Inter',
    fontDefinitions: [
      { path: require('./assets/fonts/Inter-Regular.otf'), weight: 400 },
      { path: require('./assets/fonts/Inter-Italic.otf'), weight: 400, style: 'italic' },
      { path: require('./assets/fonts/Inter-Bold.otf'), weight: 700 },
    ],
  },
]);
```

### RenderToImageOptions

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `string` | `'black'` | Font color. |
| `fontFamily` | `string` | system default | Font family name. |
| `lineHeight` | `number` | — | Line height in dp. |
| `size` | `number` | `24` | Font size. |

### RenderToImageResult

| Property | Type | Description |
| --- | --- | --- |
| `height` | `number` | Image height in dp. |
| `scale` | `number` | Scale factor; multiply dp dimensions by this for pixels. |
| `uri` | `string` | File uri to the image. |
| `width` | `number` | Image width in dp. |

### Types

| Name | Definition |
| --- | --- |
| `FontFaceDefinition` | A face belonging to a `FontFamilyDefinition`: `path: FontSource`, `display?: FontDisplay` (Web), `style?: 'normal' \| 'italic' \| 'oblique'`, `weight?: number \| string`. On Android, `style` / `weight` select the face (unset: read from the font file; a weight on a variable font pins it to one instance; below API 29 only the default face is loaded). On iOS they are not used (embedded metadata applies). On web they map to CSS `font-style` / `font-weight`; a variable font can declare a range such as `'100 900'` (ignored on Android and iOS). |
| `FontFamilyDefinition` | `fontFamily: string`, `fontDefinitions: FontFaceDefinition[]` |
| `FontMap` | `string \| Record<string, FontSource>` (plus an array of `FontFamilyDefinition`s for multiple faces per family) |
| `FontResource` | `default?: string`, `display?: FontDisplay` (Web), `style?: 'normal' \| 'italic' \| 'oblique'`, `uri?: string \| number`, `weight?: number \| string` |
| `FontSource` | `string \| number \| Asset \| FontResource` (URI, module ID, or Expo Asset) |
| `ServerFontResourceDescriptor` | `{ css: string, id: string, type: 'style' }` or `{ as: 'font', crossOrigin?: 'anonymous' \| 'use-credentials' \| undefined, href: string, rel: 'preload', type: 'link' }` |

### FontDisplay (Web)

Sets `font-display`; default on web is `AUTO`. Setting it does nothing on native platforms. The value is set in the generated `@font-face` block, not as a style property.

| Value | Description |
| --- | --- |
| `FontDisplay.AUTO = "auto"` | (Default) Defined by the user agent or platform; usually text is invisible until the font loads. |
| `FontDisplay.BLOCK = "block"` | Text invisible until the font loads; nothing appears if loading fails. |
| `FontDisplay.FALLBACK = "fallback"` | 100ms invisible period, then swap or show unstyled text while loading continues. |
| `FontDisplay.OPTIONAL = "optional"` | Like `FALLBACK`, but the browser may decide not to load the font based on slow connection or resource demand. |
| `FontDisplay.SWAP = "swap"` | Fallback text rendered immediately with a default font while the desired font loads. |

### Error codes

| Code | Description |
| --- | --- |
| `ERR_FONT_API` | The arguments passed to `loadAsync` are invalid. |
| `ERR_FONT_SOURCE` | The provided resource was of an incorrect type. |
| `ERR_WEB_ENVIRONMENT` | The browser's `document` element doesn't support injecting fonts. |
| `ERR_DOWNLOAD` | Failed to download the provided resource. |
| `ERR_FONT_FAMILY` | Invalid font family name was provided. |
| `ERR_UNLOAD` | Attempting to unload fonts that haven't finished loading. |

## Notes

- Platforms: android, ios, tvos, web, expo-go.
- A `fontFamily` loads once. A later `useFonts` / `loadAsync` call for an already-loaded `fontFamily` adds none of its faces, even if it lists more.
- Variable fonts: select a face with the `fontWeight` and `fontStyle` style props; works with `useFonts` as well.
- Existing React Native app: install `expo` first. Android: copy font files to `android/app/src/main/assets/fonts`. iOS: see Apple's "Adding a Custom Font to Your App".
- Source: `sdk-58` branch `packages/expo-font`; modificationDate October 02, 2026.

## Related

- [SplashScreen](./splash-screen.md)
- [Asset](./asset.md)
