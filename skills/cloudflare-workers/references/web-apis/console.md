---
source: https://developers.cloudflare.com/workers/runtime-apis/console/
---

# Console

The `console` object provides methods to emit logs, warnings, and debug code. All standard `console` API methods are present in Workers, but some are no ops (callable, no error, no effect) for library compatibility.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/runtime-apis/headers/#set-cookie-handling (no code on the Console page itself):

```js
console.log(headers.getAll("Set-Cookie"));
```

## Options / Props

| Method | Behavior |
| --- | --- |
| `console.debug()` | supported |
| `console.error()` | supported |
| `console.info()` | supported |
| `console.log()` | supported |
| `console.warn()` | supported |
| `console.clear()` | partial support |
| `console.count()` | partial support |
| `console.group()` | partial support |
| `console.table()` | partial support |
| `console.trace()` | partial support |
| `console.assert()` | no op |
| `console.countReset()` | no op |
| `console.dir()` | no op |
| `console.dirxml()` | no op |
| `console.groupCollapsed()` | no op |
| `console.groupEnd` | no op |
| `console.profile()` | no op |
| `console.profileEnd()` | no op |
| `console.time()` | no op |
| `console.timeEnd()` | no op |
| `console.timeLog()` | no op |
| `console.timeStamp()` | no op |
| `console.createTask()` | Will throw an exception in production, but works in local dev, Quick Editor, and remote preview |

## Notes

- "supported" methods are written to the console in local dev (`npx wrangler@latest dev`), appear in real-time logs (dashboard tail or `wrangler tail`), and create entries in the `logs` field of Tail Worker events and Workers Trace Events (which Logpush can send to a destination).
- "partial support" methods can be safely called but are no ops in both production and local development. In the Workers Playground, the Quick Editor in the dashboard, and remote preview mode (`wrangler dev --remote`) they behave as expected and print to the console.

## Related

- [Performance and timers](./performance.md)
- [Web standards](./web-standards.md)
