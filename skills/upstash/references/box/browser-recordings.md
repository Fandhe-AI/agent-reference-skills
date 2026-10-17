# Browser: Recordings

Recordings capture the browser to a replayable HLS video, covering all tabs, following whichever is in the foreground, and including everything an AI task does — useful for audit trails and debugging agent behavior.

## Signature / Usage

```typescript
const recording = await box.browser.recordings.start({ maxDurationSeconds: 120 })

await tab.goto("https://upstash.com/docs")
await tab.run("Find the quickstart and summarize it")

const saved = await recording.stop()
console.log(saved.durationMs, saved.playlistUrl)
console.log(saved.markers) // tab switches and AI run chapters

const recordings = await box.browser.recordings.list()
const same = await box.browser.recordings.get(recordings[0].id)

// Save a completed recording as a regular MP4 file
const path = await box.browser.recordings.download(saved.id, {
  path: "./session.mp4",
})
```

```python
recording = box.browser.recordings.start(max_duration_seconds=120)

tab.goto("https://upstash.com/docs")
tab.run("Find the quickstart and summarize it")

saved = recording.stop()

recordings = box.browser.recordings.list()
same = box.browser.recordings.get(recordings[0].id)

path = box.browser.recordings.download(saved.id, path="./session.mp4")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maxDurationSeconds` | `number` (default and max `600`) | Recording stops automatically at this duration |
| `Recording.status` | `"recording" \| "completed" \| "failed" \| "deleted"` | Current recording state |
| `Recording.markers` | `{ type: "tab_switch" \| "run", ... }[]` | Chapters for tab switches and AI runs, with timestamps |
| `Recording.startedAt` / `endedAt` / `durationMs` | — | Timing of the recording (Python: `duration_ms`) |
| `Recording.stoppedReason` | — | Why the recording stopped |
| `Recording.mp4SizeBytes` | `number` (Python: `mp4_size_bytes`) | MP4 size; check it to know in advance whether a recording downloads as MP4 |
| `recordings.download(id, { path })` | `string` path (optional) | Saves a completed recording as an MP4 file; returns the path |

## Notes

- Source: https://upstash.com/docs/box/overall/browser/recordings (fetched 2026-10-17; no version pin on the site).
- One active recording per box; stops on `stop()`, at `maxDurationSeconds`, or automatically after 3 minutes with no on-screen activity
- Unlike Live View URLs, the `playlistUrl` is not tokenized — fetching it requires the Box API key like any other API call. Recordings are retained for 14 days
- To play recordings in your own product, keep the API key server-side: proxy playlist/segment requests and attach the `X-Box-Api-Key` header there, feeding the proxied playlist to an HLS player (e.g. hls.js); do not ship the key to end users
- `download` writes to the working directory as `box-recording-<id>.mp4` when `path` is omitted. Recordings captured before MP4 support download as raw MPEG-TS with a `.ts` extension instead
- `recording.stop()` is safe on a stale handle — if that recording already auto-stopped, it returns the finished recording's metadata instead of affecting a newer one

## Related

- [Browser Overview](./browser-overview.md)
- [Live View](./browser-live-view.md)
- [AI Actions](./browser-ai-actions.md)
