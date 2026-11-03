---
source: https://developers.cloudflare.com/workers/runtime-apis/handlers/tail/
---

# Tail Handler

The `tail()` handler is the handler you implement when writing a Tail Worker. Tail Workers can be used to process logs in real-time and send them to a logging or analytics service. It is called once each time the connected producer Worker is invoked.

## Signature / Usage

```js
export default {
  async tail(events, env, ctx) {
    await fetch("<YOUR_ENDPOINT>", {
      method: "POST",
      body: JSON.stringify(events),
    })
  }
}
```

## Options / Props

Handler parameters:

| Name | Type | Description |
|------|------|-------------|
| `events` | array | An array of `TailItems`. One `TailItem` is collected for each event that triggers a Worker. For Workers for Platforms customers with a Tail Worker installed on the dynamic dispatch Worker, `events` will contain two elements: one for the dynamic dispatch Worker and one for the User Worker. |
| `env` | object | The bindings associated with your Worker using ES modules format, such as KV namespaces and Durable Objects. |
| `ctx` | object | The context associated with your Worker. Currently, this object just contains the `waitUntil` function. |

Event properties:

| Name | Type | Description |
|------|------|-------------|
| `event.type` | string | The type of event. This will always return `"tail"`. |
| `event.traces` | array | An array of `TailItems` (same as `events`). |
| `event.waitUntil(promisePromise)` | void | See [Context (ctx)](./context.md#waituntil). Unlike fetch event handlers, tail handlers do not return a value, so this is the only way for trace Workers to do asynchronous work. |

`TailItems` properties:

| Name | Type | Description |
|------|------|-------------|
| `scriptName` | string | The name of the producer script. |
| `event` | object | Information about the Worker's triggering event. For fetch events: a `FetchEventInfo` object. For other event types: `null`, currently. |
| `eventTimestamp` | number | Measured in epoch time. |
| `logs` | array | An array of `TailLog`. |
| `exceptions` | array | An array of `TailException`. A single Worker invocation might result in multiple unhandled exceptions, since a Worker can register multiple asynchronous tasks. |
| `outcome` | string | One of: `unknown` (outcome status was not set), `ok` (invocation succeeded), `exception` (unhandled exception: uncaught JavaScript exception, a fetch handler that does not result in a Response, or an internal error), `exceededCpu` (exceeded CPU limits), `exceededMemory` (exceeded memory limits), `scriptNotFound` (internal error retrieving the Worker script), `canceled` (canceled before completion, commonly because the client disconnected before a response could be sent), `responseStreamDisconnected` (response stream disconnected during deferred proxying; client or server hung up early). |

`FetchEventInfo` properties: `request` (a `TailRequest` object), `response` (a `TailResponse` object).

`TailRequest`:

| Name | Type | Description |
|------|------|-------------|
| `cf` | object | Data from `IncomingRequestCfProperties`. |
| `headers` | object | Header name/value entries (redacted by default). Header names are lowercased, and values of duplicate header names are concatenated with `", "` (comma space), similar to the Fetch standard. |
| `method` | string | The HTTP request method. |
| `url` | string | The HTTP request URL (redacted by default). |
| `getUnredacted()` | object | Returns a TailRequest object with unredacted properties. |

`TailResponse`: `status` (number) - the HTTP status code.

`TailLog` (records information sent to console functions):

| Name | Type | Description |
|------|------|-------------|
| `timestamp` | number | Measured in epoch time. |
| `level` | string | The console function that was called. One of: `debug`, `info`, `log`, `warn`, `error`. |
| `message` | object | The array of parameters passed to the console function. |

`TailException` (records an unhandled exception during the invocation):

| Name | Type | Description |
|------|------|-------------|
| `timestamp` | number | Measured in epoch time. |
| `name` | string | The error type (for example, `Error`, `TypeError`). |
| `message` | object | The error description (for example, `"x" is not a function`). |

## Notes

- Outcome is not the same as HTTP status. It is equivalent to the exit status of a script. A Worker outcome may differ from a response code if, for example, a script successfully processes a request but is designed to return a `4xx`/`5xx` response, or sends a `200` response but an asynchronous task registered via `waitUntil()` later exceeds CPU or memory limits.
- Some `TailRequest` properties are redacted by default to make it harder to accidentally record sensitive information. The redactions use heuristic rules, so they are subject to false positives and negatives. `getUnredacted()` bypasses redaction; be careful about what information is retained.
  - Header redaction: the value is the string `"REDACTED"` when the (case-insensitive) header name is `cookie`/`set-cookie` or contains the substring `"auth"`, `"key"`, `"secret"`, `"token"`, or `"jwt"`.
  - URL redaction: for each greedily matched substring of ID characters (a-z, A-Z, 0-9, `+`, `-`, `_`), if it meets the criteria for a hex or base-64 ID, it is replaced with `"REDACTED"`. Hex ID: 32 or more hex digits, containing only hex digits and separators (`+`, `-`, `_`). Base-64 ID: 21 or more characters with at least two uppercase, two lowercase, and two digits.
- Corrected from the official docs: the official example calls `fetch(...)` without `await`, so the forwarding request is not tied to the invocation lifetime and may be cancelled when `tail()` returns; added `await` (alternatively pass the promise to `ctx.waitUntil()`).
- Tail Worker setup: see https://developers.cloudflare.com/workers/observability/logs/tail-workers/. The `wrangler tail` command is covered by the cloudflare-wrangler skill.

## Related

- [Context (ctx)](./context.md)
- [Handlers overview](./handlers-overview.md)
