---
source: https://docs.expo.dev/versions/v58.0.0/sdk/document-picker/
---

# DocumentPicker

`expo-document-picker` provides access to the system's UI for selecting documents from the available providers on the user's device.

## Signature / Usage

```sh
npx expo install expo-document-picker
```

```js
import * as DocumentPicker from 'expo-document-picker';
```

Config plugin (app.json), needed only for iCloud-related entitlements on iOS:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-document-picker",
        {
          "iCloudContainerEnvironment": "Production"
        }
      ]
    ]
  }
}
```

## Options / Props

`getDocumentAsync` (Android, iOS, Web): type `React.Element<DocumentPickerOptions>`. Displays the system UI for choosing a document. By default the chosen file is copied to the app's internal cache directory.

`DocumentPickerOptions`:

| Property | Type | Description |
| --- | --- | --- |
| base64 (optional) | `boolean` | Web only. If `true`, asset url is base64 from the file; if `false`, it is the file url. Default: `true` |
| copyToCacheDirectory (optional) | `boolean` | Android, iOS. If `true`, the picked file is copied to `FileSystem.CacheDirectory`, allowing other Expo APIs to read it immediately. May impact performance for large files. Default: `true` |
| multiple (optional) | `boolean` | Allows multiple files to be selected. Default: `false` |
| type (optional) | `string \| string[]` | MIME type(s) available to pick; wildcards like `'image/*'` supported; `'*/*'` for any. Default: `'*/*'` |

`DocumentPickerResult` = `DocumentPickerSuccessResult | DocumentPickerCanceledResult`.

`DocumentPickerSuccessResult`:

| Property | Type | Description |
| --- | --- | --- |
| assets | `DocumentPickerAsset[]` | Picked assets. |
| canceled | `false` | Always `false` when asset data has been returned. |
| output (optional) | `FileList` | Web only. `FileList` for parity with the web File API. |

`DocumentPickerCanceledResult`:

| Property | Type | Description |
| --- | --- | --- |
| assets | `null` | Always `null` when canceled. |
| canceled | `true` | Always `true` when canceled. |
| output (optional) | `null` | Web only. Always `null` when canceled. |

`DocumentPickerAsset`:

| Property | Type | Description |
| --- | --- | --- |
| base64 (optional) | `string` | Web only. Base64 string of the file. |
| file (optional) | `File` | Web only. `File` object for parity with the web File API. |
| lastModified | `number` | Timestamp of last modification (ms since Unix epoch). Files without a known date return the current date. |
| mimeType (optional) | `string` | Document MIME type. |
| name | `string` | Original name. |
| size (optional) | `number` | Size in bytes. |
| uri | `string` | URI to the local document file. |

Config plugin properties:

| Name | Default | Description |
| --- | --- | --- |
| `iCloudContainerEnvironment` | `undefined` | iOS only. Sets the `com.apple.developer.icloud-container-environment` entitlement used for AdHoc iOS builds. Values: `Development`, `Production`. |
| `kvStoreIdentifier` | `undefined` | iOS only. Overrides the default `com.apple.developer.ubiquity-kvstore-identifier` entitlement (Apple Team ID + bundle identifier). May be needed if the app was transferred to another Apple Team after enabling iCloud storage. |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Web, Included in Expo Go.
- To enable iCloud storage features set `expo.ios.usesIcloudStorage` to `true` in app config. Running EAS Build locally uses iOS capabilities signing to enable the required capabilities. Apps without EAS Build must manually configure the iCloud service with CloudKit support for their bundle identifier.
- Using with `expo-file-system`: the file system may not be able to read a file immediately after it is picked, so keep `copyToCacheDirectory` set to `true`.
- Web: the system UI can only be shown after user activation (e.g. a button press), so calling `getDocumentAsync` in `componentDidMount` will not work. The `cancel` event is not returned in the browser.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-document-picker

## Related

- [FileSystem](./filesystem.md)
