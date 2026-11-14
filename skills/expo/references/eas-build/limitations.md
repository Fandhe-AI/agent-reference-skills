---
source: https://docs.expo.dev/build-reference/limitations/
---

# Expo Build limitations

Learn about the current limitations of Expo Build.

## Signature / Usage

Expo Build is designed to work for any React Native project. Use a larger resource class in **eas.json** when the build needs more memory:

```json
{
  "build": {
    "production": {
      "ios": { "resourceClass": "large" }
    }
  }
}
```

The `large` resource class is referenced in the source as `resourceClass` in **eas.json** (see Android-specific and iOS-specific resource class sections of the Server infrastructure reference, which is not included in this skill).

### Limitations

| Limitation | Details |
| --- | --- |
| Fixed memory and CPU limits on build worker servers | Resources may be insufficient for builds needing significant memory; consider a `large` resource class in **eas.json**. |
| Limited dependency caching | Android jobs install npm and Maven dependencies from a local cache. iOS jobs install npm dependencies from a local cache and CocoaPods artifacts from a cache server. Intermediate artifacts like **node_modules** are not cached and restored (e.g. based on **package-lock.json** or **yarn.lock**), but if committed to Git they are uploaded to build servers. |
| Maximum build duration | A build exceeding the maximum duration allowed for the plan is canceled. See Expo pricing for the timeout per plan (subject to change). |
| Maximum pending builds | 50 per platform per account. New builds are rejected until pending builds drop below the limit. |
| Package managers with workspaces support | Monorepos managed with workspaces-capable package managers are supported; third-party monorepo or workspaces tooling may not work as expected or may require additional setup. Official guidance for package managers other than Bun, npm, pnpm, and Yarn is limited. |

## Notes

- Source: https://docs.expo.dev/build-reference/limitations/ (docs/pages/build-reference/limitations.mdx at tag expo@58.0.25).

## Related

- [Cache dependencies](./caching.md)
- [Set up Expo Build with a monorepo](./build-with-monorepos.md)
- [Configure Expo Build with eas.json](./build-eas-json.md)
