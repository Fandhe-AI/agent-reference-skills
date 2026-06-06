# figma.timer

Sub-API for controlling the FigJam timer. Only available in FigJam documents.

## Signature / Usage

```ts
// Start a 5-minute timer
figma.timer.start(300);

// Pause and resume
figma.timer.pause();
figma.timer.resume();

// Read state
console.log(figma.timer.state);     // 'RUNNING' | 'PAUSED' | 'STOPPED'
console.log(figma.timer.remaining); // seconds left
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `remaining` | `number` (readonly) | Seconds remaining; `0` if not started |
| `total` | `number` (readonly) | Total duration in seconds; `0` if not started |
| `state` | `'STOPPED' \| 'PAUSED' \| 'RUNNING'` (readonly) | Current timer status |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `start()` | `(seconds: number) => void` | Start (or adjust) timer to the given duration; resumes if paused |
| `pause()` | `() => void` | Pause; no-op if not running |
| `resume()` | `() => void` | Resume; no-op if not paused |
| `stop()` | `() => void` | Stop and reset; no-op if already stopped or finished |

## Notes

- Only available in FigJam (`figma.editorType === 'figjam'`); throws in other editors.
- Calling `start()` on a running timer adjusts the remaining time.

## Related

- [editor-types](./editor-types.md)
- [figma global object](./figma-global.md)
