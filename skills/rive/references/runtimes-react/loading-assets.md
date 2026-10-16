# Loading Assets (React)

Loading and replacing Rive file assets (fonts, images, audio) dynamically at runtime via the `assetLoader` callback of `useRive` / `useRiveFile`.

## Signature / Usage

```javascript
assetLoader: (asset: rc.FileAsset, bytes: Uint8Array) => boolean;
```

Add `assetLoader` to the parameters of `useRive`. The callback is called for every asset the runtime detects in the `.riv` on load; it either handles the load itself or passes responsibility back so the runtime can load it otherwise. See the Web (JS) runtime's loading-assets page (`#using-the-asset-handler-api`) for more API details.

### Export types (set in the Rive editor Assets tab)

| Type | Behavior |
|------|----------|
| Embedded (default) | Asset is included in the `.riv`; runtime loads it implicitly. May bulk up file size, especially fonts with Rive Text. |
| Hosted | Asset is hosted on Rive's CDN and loaded automatically; costs an extra CDN call. Available on Voyager and Enterprise plans. |
| Referenced | Asset is not embedded; your app loads it via the asset handler. All referenced assets, including the `.riv`, are bundled as a zip on export. |

## Notes

- `assetLoader` works only with the `useRive` and `useRiveFile` hooks, not the default-exported `<Rive />` component.
- Supported image formats: jpeg, png, webp. Image CDNs doing on-the-fly transformation may need an `Accept` header, e.g. `headers: { Accept: 'image/png,image/webp,image/jpeg,*/*', }`.
- SVG assets cannot be loaded at runtime as referenced assets (SVGs are converted to Rive vector objects, always embedded in the `.riv`).
- To dynamically replace images, the page points to image data binding (see the data-binding page).
- Official examples: specify a font asset to load; localization font swapping with i18n; specify an image asset to load (CodeSandbox links on the source page).

## Related

- [Fonts](./fonts.md)
- [Playing Audio](./playing-audio.md)
- [Data Binding](./data-binding.md)
- [useRive](./use-rive.md)

Source: https://rive.app/docs/runtimes/react/loading-assets (fetched 2026-10)
