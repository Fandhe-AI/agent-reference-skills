---
source: https://vite.dev/config/server-options#server-host
---

# server.host / server.allowedHosts

Control which IP addresses the dev server listens on (`server.host`) and which hostnames it responds to (`server.allowedHosts`). Applied to dev only.

## Signature / Usage

```js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.example.com'],
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.host` | `string \| boolean` | `'localhost'` | IP addresses to listen on. `0.0.0.0` or `true` listens on all addresses, including LAN and public addresses. CLI: `--host 0.0.0.0` or `--host` |
| `server.allowedHosts` | `string[] \| true` | `[]` | Hostnames Vite is allowed to respond to. `localhost`, domains under `.localhost` and all IP addresses are allowed by default. Skipped when using HTTPS |

## Notes

- A string starting with `.` allows that hostname without the `.` and all subdomains: `.example.com` allows `example.com`, `foo.example.com` and `foo.bar.example.com`. `true` allows any host.
- Only add hosts whose IP resolution you control (e.g. you own `vite.dev`: add `vite.dev` and `.vite.dev`). Never add Top-Level Domains like `.com`.
- Setting `server.allowedHosts` to `true` allows any website to send requests to your dev server through DNS rebinding attacks, allowing them to download your source code and content. Always use an explicit list of allowed hosts (GHSA-vg6x-rcgg-rjx6).
- The environment variable `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` adds additional allowed hosts, comma-separated (e.g. `host1.example.com,host2.example.com`).
- Other servers may respond instead of Vite: (1) with `localhost`, Node.js `dns.setDefaultResultOrder` changes address ordering and browsers may use a different resolved address than Vite listens on (Vite prints the resolved address when it differs); (2) with wildcard hosts (e.g. `0.0.0.0`), because servers listening on non-wildcard hosts take priority.
- On WSL2, `host: true` is not sufficient to access the server from your LAN; see the Microsoft WSL networking document.
- Preview server equivalents: `preview.host` / `preview.allowedHosts` (default to the `server.*` values).

## Related

- [server-port.md](./server-port.md)
- [preview-options.md](./preview-options.md)
