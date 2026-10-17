# Public URLs (Preview)

Expose ports from a box with public URLs. Each URL maps to one port and can optionally require bearer-token and/or basic authentication.

## Signature / Usage

```typescript
const box = await Box.create({ runtime: "node" })
await box.exec.command("node /work/server.js &")

const publicUrl = await box.getPublicURL(3000)
console.log(publicUrl.url)
// https://{BOX_ID}-3000.preview.box.upstash.com

const bearer = await box.getPublicURL(3000, { bearerToken: true })
await fetch(bearer.url, { headers: { Authorization: `Bearer ${bearer.token}` } })

const basic = await box.getPublicURL(8080, { basicAuth: true })
const basicCredentials = Buffer.from(`${basic.username}:${basic.password}`).toString("base64")
await fetch(basic.url, { headers: { Authorization: `Basic ${basicCredentials}` } })

const { publicURLs } = await box.listPublicURLs()
await box.deletePublicURL(3000)
```

```python
public_url = box.get_public_url(3000)
public_url = box.get_public_url(3000, bearer_token=True)
public_url = box.get_public_url(8080, basic_auth=True)
result = box.list_public_urls()
box.delete_public_url(3000)
```

## Options / Props

| Option (TS / Python) | Description |
|---|---|
| `bearerToken` / `bearer_token` | Require `Authorization: Bearer <token>`; response includes `token` |
| `basicAuth` / `basic_auth` | Require username/password; response includes `username`, `password` |

`listPublicURLs()` entries: `id` (`{BOX_ID}-{port}`), `port`, `url`, `created_at`, `basic_auth`, `bearer_token`. Enabling both auth methods accepts either.

## Notes

- One public URL per port: creating another for the same port overwrites the previous one, including its credentials
- Public URLs outlive a pause and are removed when the box is deleted
- A request to the URL resumes a paused box; the request is held until the app's port is listening. Credentials are checked before the box is woken. After container resume the proxy waits up to 30 additional seconds for the app; if still not ready it returns `503` with `Retry-After: 5`
- Set a client timeout covering resume plus readiness wait (docs use 90 seconds; httpx defaults to 5 seconds, which a cold start can outlast)
- For the app to answer after resume, use an init command to restart the server; move slow installs (cold `npm install`) into the image or a snapshot
- Creating a public URL on a paused box resumes it
- The SDK still supports `getPreviewUrl`, `listPreviews`, `deletePreview` as deprecated aliases of `getPublicURL`, `listPublicURLs`, `deletePublicURL`
- Not available on EphemeralBox
- The docs print token / password for illustration; do not log them in real code
- Source: https://upstash.com/docs/box/overall/preview (fetched 2026-10-17; no version pin on the site).

## Related

- [Keep Alive](./keep-alive.md)
- [How It Works](./how-it-works.md)
- [Security](./security.md)
