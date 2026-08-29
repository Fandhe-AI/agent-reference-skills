---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nodejs--docker
---

# Node.js / Docker

Running a built TanStack Start app on a plain Node.js server (or inside a Docker container). The exact shape depends on the build tool (Vite or Rsbuild).

## Signature / Usage

```json
// package.json (Vite build)
{
  "scripts": {
    "build": "vite build",
    "start": "node .output/server/index.mjs"
  }
}
```

```ts
// Rsbuild server entry contract (dist/server/index.js)
type ServerEntry = {
  fetch(request: Request): Response | Promise<Response>
}
```

```sh
npm install srvx
```

```json
// package.json (Rsbuild build, served via srvx)
{
  "scripts": {
    "build": "rsbuild build",
    "start": "srvx --prod -s ../client dist/server/index.js"
  }
}
```

## Notes

- Vite builds: follow the [Nitro](./nitro.md) deployment instructions and start the output with `node`.
- Rsbuild builds: client assets land in `dist/client`, the server bundle in `dist/server/index.js` (or `dist/server/server.js` — adjust the path accordingly), exporting a fetch-style `ServerEntry`. Serve `dist/client` as static assets and forward other requests to the entry's `fetch` handler; `srvx` or Express work for this.
- Build with `npm run build`, start with `npm run start`.

## Related

- [Bun](./bun.md)
- [Nitro](./nitro.md)
