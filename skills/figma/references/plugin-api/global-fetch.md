# global fetch()

A network fetch function available in the plugin sandbox (not in the UI iframe). Functionally similar to the browser `fetch` API but with Figma-specific constraints.

## Signature / Usage

```ts
// Declare allowed domains in manifest.json first:
// "networkAccess": { "allowedDomains": ["api.example.com"] }

const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' }),
});

if (response.ok) {
  const data = await response.json();
}
```

## Options / Props

### Function Signature

```ts
fetch(url: string, init?: FetchOptions): Promise<FetchResponse>
```

### FetchOptions

| Name | Type | Description |
|------|------|-------------|
| `method` | `string` | HTTP verb: `'GET'`, `'POST'`, etc. |
| `headers` | `Record<string, string>` | Request headers as a plain object |
| `body` | `string \| Uint8Array` | Request body |
| `cache` | `string` | Cache control |
| `redirect` | `string` | Redirect handling |
| `referrer` | `string` | Referrer URL |
| `integrity` | `string` | Subresource integrity |

### FetchResponse

| Property/Method | Type | Description |
|----------------|------|-------------|
| `ok` | `boolean` | `true` if status 200–299 |
| `status` | `number` | HTTP status code |
| `statusText` | `string` | Status message |
| `url` | `string` | Final URL after redirects |
| `redirected` | `boolean` | Whether a redirect occurred |
| `type` | `string` | Response type |
| `headersObject` | `Record<string, string>` | Response headers as plain object |
| `text()` | `() => Promise<string>` | Body as text |
| `json()` | `() => Promise<any>` | Body parsed as JSON |
| `arrayBuffer()` | `() => Promise<ArrayBuffer>` | Body as ArrayBuffer |

## Notes

- The `url` parameter must be a **string** — `Request` objects are not supported.
- Headers are plain objects, not `Headers` instances (unlike browser `fetch`).
- All requested domains must be listed in `manifest.json` under `networkAccess.allowedDomains`. Requests to unlisted domains will fail.
- `fetch()` is only available in the **plugin sandbox** (the `main` code). The UI iframe has access to the standard browser `fetch`.

## Related

- [manifest](./manifest.md)
- [figma.ui](./figma-ui.md)
