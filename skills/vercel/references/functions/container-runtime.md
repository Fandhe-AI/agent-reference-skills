# Container Runtime (Beta)

Run any code and library on Vercel Functions with an OCI container image built from a `Dockerfile` or `Containerfile` at the project root. Available on all plans (Beta). Uses Active CPU pricing.

## Signature / Usage

A root `Dockerfile` or `Containerfile` is enough when Vercel detects no other framework: on a new project Vercel selects the Container preset, builds that file, and routes all traffic to the image. When the project already matches another framework (such as Next.js), Vercel keeps that framework; set the project framework to Container to build the root file (`--yes` skips the confirmation prompt):

```bash
vercel project update --framework container --yes
```

A `Dockerfile.vercel` or `Containerfile.vercel` file selects the Container preset when that preset should win over another detected framework.

```docker
# Dockerfile
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

Nginx static server:

```docker
# Dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html
```

```html
<!-- index.html -->
<h1>Hello from Vercel Functions running a custom OCI image!</h1>
```

## Services (multiple containers)

```json
{
  "services": {
    "frontend": {
      "root": "frontend/",
      "entrypoint": "Dockerfile"
    },
    "backend": {
      "root": "backend/",
      "entrypoint": "Dockerfile"
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
| `Dockerfile` / `Containerfile` | Placed at project root; builds with the Container preset when no other framework is detected (or the project framework is set to Container) |
| `Dockerfile.vercel` / `Containerfile.vercel` | Selects the Container preset even when another framework is detected |
| `PORT` | Env var (project settings) overriding the default port `80` |
| `entrypoint` | Per-service path to the dockerfile, relative to the service's `root` |

## Notes

- Deploy with the Vercel CLI or by pushing to Git; the image is built and pushed to Vercel Container Registry (VCR) during the build step
- `vercel dev` requires the `docker` CLI and daemon locally
- The container must open an HTTP server; default port is `80`
- Runtime logs come from container `stdout` / `stderr`; they are not tied to a request and are broadcast to all in-flight requests of the instance
- Scale in: no traffic for 5 minutes (production) or 30 seconds (preview) scales down. The container gets `SIGTERM` with a 30 second grace period
- Same limits and Active CPU pricing as Vercel Functions
- Images must stay within the Container Registry limits, including the optimization limits that cap how many entries an image can contain
- Custom container images are supported for projects using Secure Compute or Static IPs; BYOC (bring your own cloud) is not yet supported with custom container images
- Migration guides exist for Railway, Fly.io, Render, Google Cloud Run and AWS containers (see the Vercel KB); for container images that run continuously without receiving traffic see Daemons
- Source: https://vercel.com/docs/functions/runtimes/container (fetched 2026-11-14)

## Related

- [runtimes.md](./runtimes.md)
- [limitations.md](./limitations.md)
- [usage-and-pricing.md](./usage-and-pricing.md)
