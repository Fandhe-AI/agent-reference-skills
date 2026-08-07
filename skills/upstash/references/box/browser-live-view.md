# Browser: Live View

Every tab can produce a shareable, view-only live view URL that streams the tab in real time — open it in a browser or embed it in an `<iframe>` to show users what their agent is doing.

## Signature / Usage

```typescript
const liveUrl = await tab.liveViewUrl()
// https://<box>-9223.<domain>/screencast?token=...&tab=...
```

```python
live_url = tab.live_view_url()
```

```html
<iframe
  src="https://<box>-9223.<domain>/screencast?token=...&tab=..."
  style="width: 100%; aspect-ratio: 16 / 10; border: 0;"
></iframe>
```

## Notes

- The URL is self-contained: an access token is embedded in the URL, so viewers need no API key or SDK
- View-only — viewers cannot click or type; drive the browser via the SDK or connect over CDP instead
- Treat live view URLs as secrets: anyone with the URL can watch the tab
- Also viewable interactively from the **Browser** tab in the Upstash Console; for a replayable video instead of a live stream, see Recordings

## Related

- [Browser Overview](./browser-overview.md)
- [Recordings](./browser-recordings.md)
- [Connect over CDP](./browser-connect.md)
- [Security & Secrets](./security.md)
