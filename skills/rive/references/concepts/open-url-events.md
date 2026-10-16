# Open URL Events

Events that open a URL at runtime when reported from a timeline, state, transition, or listener.

## Signature / Usage

Select the **Open URL** Event type in the editor, then enter the URL and Target. Web runtimes require opting in:

```ts
// Web runtimes: Open URL Events are disabled by default
automaticallyHandleEvents: true
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| URL | string | URL to open. Include the protocol (for example `http://` or `https://`) when linking to external domains |
| Target: `Blank` | enum | Opens in a new tab or window, depending on browser settings. If the Event is not triggered by a user interaction (for example via a Listener), the browser may block it as a popup |
| Target: `Parent` | enum | Opens in the parent browsing context; behaves like `Self` if no parent exists |
| Target: `Self` | enum | Opens in the current browsing context |
| Target: `Top` | enum | Opens in the topmost browsing context; behaves like `Self` if no ancestor exists |

## Notes

- Not supported on Apple or Android runtimes.
- For security reasons, disabled by default in web runtimes; set `automaticallyHandleEvents` to `true` to enable.
- For security reasons, disabled in share links and on the Rive Marketplace, and URLs are not opened by default in embeds or Marketplace posts (this behavior may change in the future).
- Event Properties (extra data carried to the runtime) are deprecated and replaced by Data Binding.

## Related

- [Events](./events.md)
- [Audio Events](./audio-events.md)
- [Listeners](./listeners.md)
- [Data Binding](./data-binding.md)
