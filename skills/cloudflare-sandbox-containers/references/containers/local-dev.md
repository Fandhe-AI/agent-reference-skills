---
source: https://developers.cloudflare.com/containers/guides/local-dev/
---

# Local development

Run the Worker and its containers locally with `npx wrangler dev` (or `vite dev` with the Cloudflare Vite plugin). Requires a Docker-compatible CLI and engine (for example Docker Desktop or Colima).

## Signature / Usage

```bash
npx wrangler dev
```

Inside a dev session press `r` to rebuild the container image; instances then restart with the new image. Worker code reloads automatically on save; code inside the container does not.

## Notes

- Versions: `durable_object` scheduling policy needs Wrangler 4.136.0 or later locally; the `cloudflare/debian-trixie` managed image needs Wrangler 4.141.0 or later.
- A dev session builds a local-path image from the Dockerfile or pulls a referenced image. `wrangler dev` supports Cloudflare Registry, Docker Hub, Amazon ECR and Google Artifact Registry images; `vite dev` supports the external registries but cannot pull from the Cloudflare Registry (use a local Dockerfile with `FROM <IMAGE_REFERENCE>`). Private images need local authentication such as `docker login`.
- Instances launch when Worker code creates them; ending the session stops them but keeps local images. `max_instances` does not apply locally and your machine may not run as many containers as production. Prune old images with `docker image prune` or similar. There is no built-in mechanism to sync code changes into a running container.
- FUSE: Miniflare grants the Docker privileges needed for Filesystem in Userspace automatically (`wrangler dev`, the Cloudflare Vite plugin, direct Miniflare) when the Docker daemon runs inside a VM (macOS, WSL), or for rootless Docker on Linux with `/dev/fuse`. Rootful Docker on Linux does not support FUSE by default.
- Differences after deploy (`durable_object` policy): the deployed hostname is 64 characters (one more than a DNS label) and is not in `/etc/hosts`, whereas locally it is the 12-character Docker container ID. Python `http.server` / `wsgiref` servers then exit with `UnicodeEncodeError: 'idna' codec can't encode characters in position 0-63: label too long`; use `socketserver` instead, in the container image or its entrypoint (runs inside the container, never on the host):

```sh
python3 -c 'import http.server as h, socketserver as s; s.ThreadingTCPServer(("", 8000), h.SimpleHTTPRequestHandler).serve_forever()'
```

- Also after deploy: every process has the same Linux capabilities as `root` regardless of user, while locally non-root users have none and file permissions apply.
- Troubleshooting: `Container is not listening to port 8080` means `getTcpPort()` was called before the process listens; retry. An opaque `internal error` may need `DOCKER_HOST` set to your engine's socket path. SSL errors during the Docker build with the Cloudflare One Client or a TLS-inspecting VPN: disable it temporarily, or provide its CA (exposed on the host via `NODE_EXTRA_CA_CERTS` and `SSL_CERT_FILE`) to the build without baking build secrets into the image; Wrangler invokes Docker itself, so to pass build secrets build and push manually with `wrangler containers push`. Certificate install commands differ by base image (Alpine uses `apk add ca-certificates` and another path).

## Related

- [Deploy](./deploy.md)
- [Image management](./image-management.md)
- [Scheduling policy](./scheduling-policy.md)
