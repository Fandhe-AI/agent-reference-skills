---
source: https://docs.expo.dev/versions/v58.0.0/sdk/sharing/
---

# Sharing

`expo-sharing` shares files with other compatible applications and receives compatible data shared from other apps.

## Signature / Usage

```sh
npx expo install expo-sharing
```

```js
import * as Sharing from 'expo-sharing';
```

Config plugin allowing sharing of single or multiple images into the app on Android and iOS:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-sharing",
        {
          "ios": {
            "enabled": true,
            "activationRule": {
              "supportsImageWithMaxCount": 5
            }
          },
          "android": {
            "enabled": true,
            "singleShareMimeTypes": ["image/*"],
            "multipleShareMimeTypes": ["image/*"]
          }
        }
      ]
    ]
  }
}
```

Redirect an incoming share with Expo Router (`app/+native-intent.ts`):

```tsx
import { getSharedPayloads } from 'expo-sharing';

export async function redirectSystemPath({ path, initial }: { path: string; initial: boolean }) {
  try {
    // Check if the URL is from the share extension/intent
    if (new URL(path).hostname === 'expo-sharing') {
      return '/handle-share';
    }
    return path;
  } catch {
    // Fallback to the root path on error
    return '/';
  }
}
```

Display shared content in the handler screen:

```tsx
import { Image } from 'expo-image';
import { useIncomingShare } from 'expo-sharing';
import { View, ActivityIndicator } from 'react-native';

export default function ShareReceived() {
  const { resolvedSharedPayloads, isResolving } = useIncomingShare();

  if (isResolving) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      {resolvedSharedPayloads.map((payload, index) => {
        if (payload.contentType === 'image') {
          return <Image source={{ uri: payload.contentUri }} style={{ width: 300, height: 300 }} key={index} />;
        }
        return null;
      })}
    </View>
  );
}
```

## Options / Props

Hook:

| Name | Returns | Description |
| --- | --- | --- |
| `useIncomingShare()` | `UseIncomingShareResult` | Returns the data shared with the app; updates when the shared payload changes. (Android, iOS, Web) |

Methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Sharing.shareAsync(url: string, options?: SharingOptions)` | Android, iOS, Web | `Promise<void>` | Opens the action sheet to share a local file URL. `options` default `{}`. |
| `Sharing.isAvailableAsync()` | Android, iOS, Web | `Promise<boolean>` | Whether the sharing API can be used. |
| `Sharing.getSharedPayloads()` | Android, iOS | `SharePayload[]` | Raw data shared with the app; empty array if none. |
| `Sharing.getResolvedSharedPayloadsAsync()` | Android, iOS | `Promise<ResolvedSharePayload[]>` | Shared data with extra info for reading/displaying (e.g. URL contents). May require a network connection. |
| `Sharing.clearSharedPayloads()` | Android, iOS, Web | `void` | Clears the data shared with the app. |

`SharingOptions`:

| Property | Type | Description |
| --- | --- | --- |
| anchor (optional) | `{ height: number, width: number, x: number, y: number }` | iOS. Anchor point for iPad. |
| dialogTitle (optional) | `string` | Android, Web. Share dialog title. |
| mimeType (optional) | `string` | Android, iOS. MIME type of the target file, e.g. `image/jpeg`. On Android sets the `mimeType` of the sharing `Intent`. On iOS determines the shared file's type when `UTI` cannot provide a filename extension; it is not attached as metadata, only used to give the file the matching extension. When used it takes precedence over the file's existing extension (the preferred extension is appended: `image.pdf` with `image/jpeg` is shared as `image.pdf.jpeg`). Not verified against file contents. |
| UTI (optional) | `string` | iOS. Uniform Type Identifier of the target file. When iOS can map it to a canonical filename extension, it takes precedence over `mimeType`; otherwise ignored. Only types registered by the system or an installed app resolve. Not verified against file contents. |

`UseIncomingShareResult`:

| Property | Type | Description |
| --- | --- | --- |
| clearSharedPayloads | `() => void` | Clears payloads shared with the app. |
| error | `Error \| null` | Error encountered while resolving; null on success. |
| isResolving | `boolean` | Whether current shared payloads are being resolved. |
| refreshSharePayloads | `() => void` | Forces a refresh of the shared payloads. |
| resolvedSharedPayloads | `ResolvedSharePayload[]` | Resolved payloads; empty while resolving or on failure. |
| sharedPayloads | `SharePayload[]` | Unresolved payloads; synchronous, available immediately. |

`SharePayload`:

| Property | Type | Description |
| --- | --- | --- |
| mimeType (optional) | `string` | MIME type of `value`. Default: `'text/plain'` |
| shareType (optional) | `ShareType` | Type of shared content. Default: `'text'` |
| value (optional) | `string` | Primary value: message body for `text`, URL string for `url`, typically the file URI for `file`, `image`, `video`, `audio`. Default: `""` |

`ShareType`: `'text' | 'url' | 'audio' | 'image' | 'video' | 'file'`.

`ContentType` (Android, iOS): `'text' | 'audio' | 'image' | 'video' | 'file' | 'website'`.

`ResolvedSharePayload` = `UriBasedResolvedSharePayload | TextBasedResolvedSharePayload`. Both extend `BaseResolvedSharePayload` (`SharePayload` plus the fields below).

| Property (BaseResolvedSharePayload) | Type | Description |
| --- | --- | --- |
| contentMimeType | `string \| null` | MIME type of the content accessible via `contentUri`. |
| contentSize | `number \| null` | Size of the content accessible via `contentUri`. |
| contentType | `ContentType \| null` | Type of the content. |
| contentUri | `string \| null` | URI to access the shared content; for URLs with redirects, the redirect target. Null for a `text` `ShareType`. |
| originalName | `string \| null` | `suggestedFilename` HTTP header value if applicable, otherwise the last path component of `contentUri`. |

`UriBasedResolvedSharePayload` adds `contentType: 'audio' | 'file' | 'video' | 'image' | 'website'` and `contentUri: string`. `TextBasedResolvedSharePayload` adds `contentType?: 'text'`.

Config plugin properties:

| Name | Default | Description |
| --- | --- | --- |
| `ios.enabled` | `false` | Enables the iOS Share Extension; adds a share extension target to the project. |
| `ios.extensionBundleIdentifier` | `{appBundleIdentifier}.ShareExtension` | Bundle identifier of the Share Extension. |
| `ios.appGroupId` | `group.{appBundleIdentifier}` | App Group ID for sharing data between app and extension. |
| `ios.activationRule` | `{}` | `NSExtensionActivationRule` in Info.plist. Either an `ActivationRuleOptions` object (standard predicate) or a raw predicate string (e.g. `SUBQUERY(...)`). |
| `android.enabled` | `false` | Enables Android share intent handling; adds the `intent-filter` to AndroidManifest.xml. |
| `android.singleShareMimeTypes` | `[]` | MIME types accepted for single sharing (`ACTION_SEND`). |
| `android.multipleShareMimeTypes` | `[]` | MIME types accepted for multiple sharing (`ACTION_SEND_MULTIPLE`). |

`ActivationRuleOptions` (iOS; all optional):

| Property | Type | Description |
| --- | --- | --- |
| supportsAttachmentsWithMaxCount | `number` | Max attachments; `0` means not accepted. Default: `0` |
| supportsFileWithMaxCount | `number` | Max files. Default: `0` |
| supportsImageWithMaxCount | `number` | Max images. Default: `0` |
| supportsMovieWithMaxCount | `number` | Max videos. Default: `0` |
| supportsText | `boolean` | Accept shared text. Default: `false` |
| supportsWebPageWithMaxCount | `number` | Max webpages. Default: `0` |
| supportsWebUrlWithMaxCount | `number` | Max web URLs. Default: `0` |

Other config plugin types: `ActivationRule` = `ActivationRuleOptions | string`; `IntentFilter` (`action: ShareAction`, `category: 'android.intent.category.DEFAULT'`, `data`, `filters: string[]`); `SingleIntentFilter` / `MultiIntentFilter` (`action: SingleShareAction` / `MultiShareAction`); `ShareAction` = `SingleShareAction | MultiShareAction`.

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Web, Included in Expo Go.
- Web limits: built on the Web Share API (very limited browser support) — check `Sharing.isAvailableAsync()` first; HTTPS required (use `npx expo start --tunnel`); sharing local files by URI works on Android and iOS but not on web.
- Receiving shared content ("Sharing to your app from other apps") is experimental. On iOS the share extension opens the main target instead of processing the share in a sharing `ViewController`, which Apple does not officially support and may stop working in a future iOS release.
- Incoming shares arrive as a deep link whose hostname is `expo-sharing`; handle it in Expo Router via `+native-intent.ts`, in React Navigation via the `linking` prop (`getInitialURL` / `subscribe`), or on the main screen if no navigation library is used.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-sharing

## Related

- [DocumentPicker](./document-picker.md)
- [FileSystem](./filesystem.md)
