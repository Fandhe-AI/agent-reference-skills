---
source: https://www.electronjs.org/docs/latest/api/structures/render-process-gone-details
---

# WebContents structures (RenderProcessGoneDetails, WebSource, SharedWorkerInfo)

Small object structures used by `WebContents` events and methods.

## Signature / Usage

```js
win.webContents.on('render-process-gone', (event, details) => {
  console.log(details.reason, details.exitCode)
})
```

## RenderProcessGoneDetails Object

| Name | Type | Description |
| --- | --- | --- |
| `reason` | string | The reason the render process is gone. Possible values: `clean-exit` - Process exited with an exit code of zero; `abnormal-exit` - Process exited with a non-zero exit code; `killed` - Process was sent a SIGTERM or otherwise killed externally; `crashed` - Process crashed; `oom` - Process ran out of memory; `launch-failed` - Process never successfully launched; `integrity-failure` - Windows code integrity checks failed; `memory-eviction` - Process proactively terminated to prevent a future out-of-memory (OOM) situation. |
| `exitCode` | Integer | The exit code of the process, unless `reason` is `launch-failed`, in which case `exitCode` will be a platform-specific launch failure error code. |

## WebSource Object

| Name | Type | Description |
| --- | --- | --- |
| `code` | string | |
| `url` | string (optional) | |

## SharedWorkerInfo Object

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | The unique id of the shared worker. |
| `url` | string | The url of the shared worker. |

## Notes

* Source pages: `api/structures/render-process-gone-details`, `web-source`, `shared-worker-info` (under https://www.electronjs.org/docs/latest/).
* `WebSource` is the `scripts` element type for `executeJavaScriptInIsolatedWorld`.

## Related

* [WebContents events: loading, navigation](./web-contents-events-loading-navigation.md)
* [WebContents methods: scripting, zoom](./web-contents-methods-scripting-zoom.md)
* [WebContents methods: devtools, ipc, input](./web-contents-methods-devtools-ipc-input.md)
