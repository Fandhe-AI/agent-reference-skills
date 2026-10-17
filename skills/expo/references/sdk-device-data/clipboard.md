---
source: https://docs.expo.dev/versions/v58.0.0/sdk/clipboard/
---

# Clipboard

`expo-clipboard` provides an interface for getting and setting Clipboard content on Android, iOS, and Web.

## Signature / Usage

```sh
npx expo install expo-clipboard
```

```tsx
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('hello world');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <View style={styles.container}>
      <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
      <Button title="View copied text" onPress={fetchCopiedText} />
      <Text style={styles.copiedText}>{copiedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
});
```

Mark clipboard content as sensitive (Android) when copying passwords, OTPs, access tokens, payment details or PII:

```ts
import * as Clipboard from 'expo-clipboard';

// Sensitive text
await Clipboard.setStringAsync('my-secret-token', {
  android: { isSensitive: true },
});

// Sensitive image
await Clipboard.setImageAsync(base64Image, {
  android: { isSensitive: true },
});
```

## Options / Props

Methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `getImageAsync(options: GetImageOptions)` | Android, iOS, Web | `Promise<ClipboardImage \| null>` | Image from the clipboard in the specified format; `null` if none or permission denied. On web prompts for permission to "see text and images copied to the clipboard". On iOS 16+ a denied paste permission returns `null` (indistinguishable from no image). |
| `getStringAsync(options?: GetStringOptions)` | Android, iOS, Web | `Promise<string>` | Clipboard content; empty string if empty or permission denied. `options` default `{}`. Same web prompt and iOS 16+ limitation. |
| `getUrlAsync()` | iOS, macOS | `Promise<string \| null>` | URL in the clipboard; `null` if none or permission denied (iOS 16+). |
| `hasImageAsync()` | Android, iOS, Web | `Promise<boolean>` | Whether the clipboard has image content. On web requires the user's permission. |
| `hasStringAsync()` | Android, iOS, Web | `Promise<boolean>` | Whether the clipboard has text content (plain and rich text such as HTML). On web requires the user's permission. |
| `hasUrlAsync()` | iOS, macOS | `Promise<boolean>` | Whether the clipboard has URL content. |
| `setImageAsync(base64Image: string, options?: SetImageOptions)` | Android, iOS, Web | `Promise<void>` | Sets an image (base64 string, without MIME type). `options` default `{}`. |
| `setStringAsync(text: string, options?: SetStringOptions)` | Android, iOS, Web | `Promise<boolean>` | Sets the clipboard text. On web fulfills to a boolean for whether it was saved; on iOS and Android always `true`. |
| `setUrlAsync(url: string)` | iOS, macOS | `Promise<void>` | Sets a URL; like `setStringAsync()` but sets the content type to URL. |
| `addClipboardListener(listener: (event: ClipboardEvent) => void)` | Android, iOS, Web | `EventSubscription` | Fires whenever clipboard content changes. No-op on Web and macOS. |
| `removeClipboardListener(subscription)` | Android, iOS, Web | `void` | Removes a listener added by `addClipboardListener`. No-op on Web. Marked deprecated in the source: use `subscription.remove()` instead. |

Constant: `isPasteButtonAvailable` (`boolean`) — whether `ClipboardPasteButton` is available; requires at least iOS 16.

`ClipboardPasteButton` component (displays the `UIPasteControl` button; pasting without a permission prompt). Render only if `Clipboard.isPasteButtonAvailable` is `true`; otherwise it renders nothing and warns in development. Extends `ViewProps`; do not set `backgroundColor`, `color` or `borderRadius` in `style`. Attach height and width via `style` or the button will not appear.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| acceptedContentTypes (optional) | `AcceptedContentType[]` | `['plain-text', 'image']` | Content types that make the button active. Do not include `plain-text` and `html` together (all text would be treated as `html`). |
| backgroundColor (optional) | `string \| null` | — | Background color; default adjusts to the system theme. |
| cornerStyle (optional) | `CornerStyleType \| null` | `'capsule'` | Corner style of the button. |
| displayMode (optional) | `DisplayModeType \| null` | `'iconAndLabel'` | Appearance of icon and label. |
| foregroundColor (optional) | `string \| null` | `'white'` | Foreground color. |
| imageOptions (optional) | `GetImageOptions \| null` | — | Options when pasting an image. |
| onPress | `(data: PasteEventPayload) => void` | — | Called with the paste result; inspect `type` (`text` or `image`). |
| style (optional) | `StyleProp<Omit<ViewStyle, 'backgroundColor' \| 'borderRadius' \| 'color'>>` | — | Custom style. |

Types:

| Type | Definition |
| --- | --- |
| `AcceptedContentType` | `'plain-text' \| 'image' \| 'url' \| 'html'` |
| `CornerStyleType` | `'dynamic' \| 'fixed' \| 'capsule' \| 'large' \| 'medium' \| 'small'` |
| `DisplayModeType` | `'iconAndLabel' \| 'iconOnly' \| 'labelOnly'` |
| `ClipboardEvent` | `{ contentTypes: ContentType[] }` |
| `ClipboardImage` | `{ data: string, size: { height: number, width: number } }` — `data` is base64 already prefixed with `data:image/png;base64,` or `data:image/jpeg;base64,`; usable directly as an `Image` source. |
| `GetImageOptions` | `{ format: 'png' \| 'jpeg', jpegQuality?: number }` — `jpegQuality` between `0` and `1`, default `1`, applies only to `jpeg`. |
| `GetStringOptions` | `{ preferredFormat?: StringFormat }` — default `StringFormat.PLAIN_TEXT`. |
| `SetStringOptions` | `{ android?: SetStringAndroidOptions, inputFormat?: StringFormat }` — `inputFormat` default `StringFormat.PLAIN_TEXT`. |
| `SetImageOptions` | `{ android?: SetImageAndroidOptions }` |
| `SetStringAndroidOptions` / `SetImageAndroidOptions` | `{ isSensitive?: boolean }` (Android, default `false`). When `true`, sets `ClipDescription.EXTRA_IS_SENSITIVE`; on Android 13+ prevents the clipboard preview overlay and signals keyboards to avoid showing previews. Older versions: compatibility flag where supported. |
| `PasteEventPayload` | `TextPasteEvent \| ImagePasteEvent` |
| `TextPasteEvent` | `{ text: string, type: 'text' }` |
| `ImagePasteEvent` | `ClipboardImage` plus `{ type: 'image' }` |

Enums:

| Enum | Values |
| --- | --- |
| `ContentType` | `HTML = "html"`, `IMAGE = "image"`, `PLAIN_TEXT = "plain-text"`, `URL = "url"` (iOS) |
| `StringFormat` | `HTML = "html"`, `PLAIN_TEXT = "plainText"` |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Web, Included in Expo Go.
- On Web the module uses the `AsyncClipboard` API, which may behave differently between browsers or be partly unsupported. On WebKit there is a known issue that makes it unusable in asynchronous code (https://bugs.webkit.org/show_bug.cgi?id=222262).
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-clipboard

## Related

- [Sharing](./sharing.md)
