# Supporting Immutable Static Assets (Adapters)

When `config.supportsImmutableAssets` is enabled, Next.js outputs immutable content-addressed static assets under `/_next/static/immutable/*`, which lets an adapter distinguish them from non-immutable static assets at the CDN level.

## Signature / Usage

```js
/** @type {import('next').NextAdapter} */
const adapter = {
  name: 'my-custom-adapter',

  async modifyConfig(config, { phase }) {
    if (phase === 'phase-production-build') {
      config.supportsImmutableAssets =
        // Default to true, but allow users to opt-out
        config.supportsImmutableAssets ?? true

      // Optionally, pass a salt for the content hashes
      // config.outputHashSalt = getSaltForCurrentProject()
    }
    return config
  },

  async onBuildComplete({ outputs }) {
    for (const output of outputs.staticFiles) {
      if (output.immutableHash != null) {
        // This has to be requestable at `output.pathname`
        // even without the `?dpl` query parameter.
        uploadOrVerifyImmutableStaticAsset(
          output.filePath,
          output.pathname,
          output.immutableHash
        )
      } else {
        // This is a non-immutable static asset and will be requested with
        // the `?dpl` query parameter, scoped to the deployment.
        uploadStaticAsset(output.filePath, output.pathname)
      }
    }

    // Process other outputs....
  },
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| config.supportsImmutableAssets | boolean | Set to `true` in `modifyConfig` (unless the user set it to `false`) to signal the adapter can deploy immutable static assets. |
| config.outputHashSalt | string | Salt for the content hashes; use to rotate hashes (e.g. after a detected hash collision). |
| outputs.staticFiles[].immutableHash | string \| null | Full content hash of an immutable asset; non-null means the asset is immutable and requested without `?dpl`. |

## Notes

- Source: https://nextjs.org/docs/app/api-reference/adapters/immutable-static-assets (v16.4.2)

- Immutable assets are requested without the `?dpl` query parameter and live in a shared namespace across deployments.
- They must not change (even after a new deployment) or be deleted for as long as active deployments use them.
- Next.js may use a truncated shorter content hash as the filename; `immutableHash` holds the full hash so you can validate that no hash collision occurred.
- Non-immutable static assets (e.g. the `public` folder, or older Next.js versions) must still be supported; they may change between deployments and are requested with `?dpl`.
- End-user-facing documentation is the `supportsImmutableAssets` option of `next.config.js`.

## Related

- [Adapters](./adapters.md)
- [Creating an Adapter](./adapters-creating-an-adapter.md)
- [Output Types](./adapters-output-types.md)
