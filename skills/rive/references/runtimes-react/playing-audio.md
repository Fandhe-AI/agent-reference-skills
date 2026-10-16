# Playing Audio (React)

Playing Rive audio events in the React runtime. Audio is added to the Rive file via audio events in the editor.

## Signature / Usage

```tsx
// Referenced audio assets must be supplied by your app via assetLoader
// (same signature as other referenced assets):
assetLoader: (asset: rc.FileAsset, bytes: Uint8Array) => boolean;
```

## Notes

- Browser autoplay restriction: most browsers block audio until the page has received some interaction (touch/click). This applies to any audio, and the interaction need not be Rive-specific.
- Embedded assets: no additional work required to play audio.
- Referenced assets: audio still plays automatically, but the audio file(s) must be loaded when the runtime attempts to play them. See the loading-assets page.

## Related

- [Loading Assets](./loading-assets.md)

Source: https://rive.app/docs/runtimes/react/playing-audio (fetched 2026-10)
