# Screencast and Video

`Screencast` (since v1.59) captures screencast frames from a page and records video. Accessed as `page.screencast`.

## Signature / Usage

```ts
// Record video
await page.screencast.start({ path: 'video.webm', size: { width: 1280, height: 800 } });
// ... perform actions ...
await page.screencast.stop();

// Capture frames
await page.screencast.start({
  onFrame: ({ data, timestamp, viewportWidth, viewportHeight }) => {
    console.log(`frame size: ${data.length} (${viewportWidth}x${viewportHeight}) at ${timestamp}`);
  },
  size: { width: 800, height: 600 },
});
await page.screencast.stop();
```

Action annotations:

```ts
await page.screencast.showActions({
  style: {
    point: 'width: 20px; height: 20px; border-radius: 50%; background: red',
    highlight: 'outline: 2px solid #333; background: rgba(0, 128, 255, .15)',
    title: 'font-size: 16px',
  },
});
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `start(options?)` | `Promise<Disposable>` | Starts the screencast. `path` saves a video; `onFrame` delivers JPEG frames; both can be combined |
| `stop()` | `Promise<void>` | Stops the screencast and video recording; saves the video to the `start` path |
| `showOverlay(html, options?)` | `Promise<Disposable>` | Adds an HTML overlay on top of the page until removed. Disposing removes it |
| `showChapter(title, options?)` | `Promise<void>` | Chapter overlay with title and optional description, centered with blurred backdrop; useful for narrating recordings |
| `showActions(options?)` | `Promise<Disposable>` | Enables visual annotations on interacted elements. Disposing stops showing actions |
| `showOverlays()` | `Promise<void>` | Shows overlays |
| `hideOverlays()` | `Promise<void>` | Hides overlays without removing them |
| `hideActions()` | `Promise<void>` | Removes action decorations |

## Options / Props

### start

| Name | Type | Description |
|------|------|-------------|
| `path` | string | Where the video is saved on stop. When provided, video recording is started (v1.59) |
| `onFrame` | `(frame: ScreencastFrame) => Promise` | Receives JPEG frames: `data` (Buffer), `timestamp` (ms since Unix epoch), `viewportWidth`, `viewportHeight` (v1.59) |
| `quality` | int | Image quality, 0-100 (v1.59) |
| `size` | `{ width: number; height: number }` | Max frame dimensions; scaled to preserve aspect ratio. Default: viewport scaled down to fit 800x800 (v1.59) |
| `fps` | int | Video frame rate, only used with `path`. Default `25` (v1.64) |

### showOverlay / showChapter

| Name | Type | Description |
|------|------|-------------|
| `html` (showOverlay param) | string | HTML content for the overlay |
| `duration` (showOverlay) | number | Ms after which the overlay is removed. Stays until dismissed if omitted |
| `title` (showChapter param) | string | Title text shown prominently |
| `description` (showChapter) | string | Optional text below the title |
| `duration` (showChapter) | number | Ms until removal. Default `2000` |

### showActions

| Name | Type | Description |
|------|------|-------------|
| `duration` | number | How long each annotation is shown, ms. Default `500` |
| `position` | `"top-left" \| "top" \| "top-right" \| "bottom-left" \| "bottom" \| "bottom-right"` | Position of the action title overlay. Default `"top-right"` |
| `cursor` | `"none" \| "pointer"` | Cursor decoration for pointer actions; `"pointer"` (default) animates a pointer between action points (v1.61) |
| `style` | `{ point?: string; highlight?: string; title?: string }` | CSS declarations for the point marker, target element box and action title. All fade out over `duration` (v1.64) |
| `fontSize` | int | Deprecated. Use `style: { title: 'font-size: 32px' }` instead. Default `24` |

## Notes

- If a screencast is already active (e.g. started by tracing or video recording), the existing configuration takes precedence for `size`; frame size may exceed the bounds or the option may be ignored.
- Firefox and WebKit currently capture up to 25 frames per second, so higher `fps` yields no extra distinct frames there. Higher `fps` costs more CPU for encoding.
- `showActions` `fontSize` is deprecated in favor of `style.title`.
- Source: https://playwright.dev/docs/api/class-screencast (microsoft/playwright v1.64.1 `docs/src/api/class-screencast.md`)

## Related

- [tracing.md](./tracing.md)
- [page.md](./page.md)
