# Audio

Playing audio from Rive animations in the web runtime.

## Signature / Usage

```ts
import { Rive } from "@rive-app/webgl2";

const r = new Rive({
  src: "scene.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  autoplay: true,
  stateMachines: "Main",
});

// Adjust playback volume (0.0 = muted, 1.0 = full)
r.volume = 0.5;
```

## Options / Props

### `volume` property

```ts
r.volume: number  // getter / setter
```

| Value | Effect |
|-------|--------|
| `1.0` | Full volume (default) |
| `0.0` | Muted |
| `0.5` | 50% of the audio event's default volume |

Acts as a multiplier applied on top of each audio event's own volume setting from the editor.

### Audio asset loading

Embedded audio plays automatically with no extra setup. For referenced audio assets, provide an `assetLoader` callback and check `asset.isAudio`:

```ts
assetLoader: (asset, bytes) => {
  if (asset.isAudio) {
    // load and assign audio bytes
    return true;
  }
  return false;
}
```

## Notes

- Most browsers block audio playback until the user interacts with the page (click or touch). Audio will not play before that first interaction regardless of Rive configuration.
- Audio requires `@rive-app/webgl2` or `@rive-app/canvas`; it is **not supported** in `@rive-app/canvas-lite`.
- Audio events are authored in the Rive editor and triggered via timelines, state transitions, or listeners.

## Related

- [loading-assets.md](./loading-assets.md)
- [rive-constructor.md](./rive-constructor.md)
- [packages.md](./packages.md)
