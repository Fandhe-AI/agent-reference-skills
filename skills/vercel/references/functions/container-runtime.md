# Container Runtime (Beta)

Run any code and library on Vercel Functions with an OCI container image built from a `Dockerfile.vercel` file. Available on all plans (Beta). Uses Active CPU pricing.

## Signature / Usage

```docker
# Dockerfile.vercel
FROM node:26-alpine

RUN npm i -g srvx
WORKDIR /app
COPY server.ts .

# srvx listens on $PORT by default
CMD ["srvx", "--prod"]
```

```ts
// server.ts
export default {
  fetch(req: Request) {
    return Response.json({ ip: req.headers.get("x-forwarded-for") })
  }
}
```

## Services (multiple containers)

```json
{
  "services": {
    "frontend": {
      "root": "frontend/",
      "entrypoint": "Dockerfile.vercel"
    },
    "backend": {
      "root": "backend/",
      "entrypoint": "Dockerfile.vercel"
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "backend" } },
    { "source": "/(.*)", "destination": { "service": "frontend" } }
  ]
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `Dockerfile.vercel` / `Containerfile.vercel` | Placed at project root; auto-detected, with a rewrite rule routing all traffic to the image |
| `PORT` | Env var (project settings) overriding the default port `80` |
| `entrypoint` | Per-service path to the dockerfile, relative to the service's `root` |

## Notes

- Deploy with the Vercel CLI or by pushing to Git; the image is built and pushed to Vercel Container Registry (VCR) during the build step
- `vercel dev` requires the `docker` CLI and daemon locally
- The container must open an HTTP server; default port is `80`
- Runtime logs come from container `stdout` / `stderr`; they are not tied to a request and are broadcast to all in-flight requests of the instance
- Scale in: no traffic for 5 minutes (production) or 30 seconds (preview) scales down. The container gets `SIGTERM` with a 30 second grace period
- Same limits and Active CPU pricing as Vercel Functions
- Secure Compute and Static IPs are not yet supported with custom container images
- Source: https://vercel.com/docs/functions/runtimes/container

## Related

- [runtimes.md](./runtimes.md)
- [limitations.md](./limitations.md)
- [usage-and-pricing.md](./usage-and-pricing.md)
