---
source: https://docs.expo.dev/eas-update/bundle-diffing/
---

# Bundle diffing for EAS Update

Enable your project to accept bundle diffs when available.

## Signature / Usage

With bundle diffing, EAS Update delivers a **bundle patch** when possible: a smaller file containing only the differences between the bundle currently running on the device and the new bundle. Requires Expo SDK 55 or later.

```json
{
  "expo": {
    "updates": {
      "enableBsdiffPatchSupport": true
    }
  }
}
```

### Enable bundle diffing

Devices already running a published update get a patch when a newer one is available (enabled by default in SDK 56 and later). Devices on a fresh install can also get a patch on the first update check when the embedded bundle from the build has been uploaded (enabled by default in SDK 58 and later).

- **Patches between updates**: enabled by default in SDK 56 and later. On SDK 55, set `updates.enableBsdiffPatchSupport` to `true` to opt in. To disable on SDK 56 and later, set it to `false`.
- **Patches from the embedded bundle, SDK 58 and later**: EAS Build uploads the embedded bundle when the build completes; no configuration is required. To disable the upload, set `EAS_UPDATE_UPLOAD_EMBEDDED_BUNDLE` to `0` under `env` in a build profile:

```json
{
  "build": {
    "production": {
      "env": {
        "EAS_UPDATE_UPLOAD_EMBEDDED_BUNDLE": "0"
      }
    }
  }
}
```

- **Patches from the embedded bundle, SDK 57 and earlier**: experimental and opt-in. Set `EAS_UPDATE_EXPERIMENTAL_UPLOAD_EMBEDDED_BUNDLE` to `1` under `env` in a build profile:

```json
{
  "build": {
    "production": {
      "env": {
        "EAS_UPDATE_EXPERIMENTAL_UPLOAD_EMBEDDED_BUNDLE": "1"
      }
    }
  }
}
```

EAS Build uploads the bundle only when EAS Update is configured and the build profile sets a `channel`. It skips development builds and iOS Simulator builds. Custom builds that use `eas/build` upload the same way; with separate steps, add the `eas/upload_embedded_bundle` step. Without EAS Build, upload yourself:

```sh
eas update:embedded:upload --platform [platform] --bundle [path] --manifest [path] --channel [name]
```

### Manage uploaded embedded bundles

```sh
eas update:embedded:list
eas update:embedded:view [id]
eas update:embedded:delete [id]
```

Find ids with `eas update:embedded:list`, then pass them to view or delete. The delete command is safe to retry.

### Verify bundle diffs are being served

- Expo website: the Update Details page for the Update Group and platform.
- Updates API: inspect `Updates.readLogEntriesAsync()`; a received patch shows an entry such as "patch successfully applied".

## Notes

- EAS Update uses the bsdiff algorithm. A patch is served only when it is meaningfully smaller than the full bundle and can be computed efficiently; otherwise the full bundle is served.
- Fresh installs receive the full bundle on their first update unless the build's embedded bundle was uploaded.
- When an update is published, a patch is precomputed only against the second-newest update on the channel. A device running a different published update initially receives the full bundle; a patch for that base is then generated on demand.
- Patches are generated shortly after publishing; it can take a few minutes, and devices may receive the full bundle in the meantime.
- On SDK 57 and below, the embedded-bundle mode is experimental; the flag and behavior may change.
- Source modificationDate: October 07, 2026 (fetched 2026-10-17).

## Related

- [Deploy updates](./deployment.md)
- [Updates](./updates.md)
- [Downloading updates](./download-updates.md)
