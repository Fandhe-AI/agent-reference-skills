---
source: https://developers.cloudflare.com/containers/guides/local-dev/, https://developers.cloudflare.com/sandbox/get-started/, https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/
---

# Dev

Local development and local smoke tests. Full flag tables belong to the cloudflare-wrangler skill.

## Signature / Usage

### Generate types

```sh
npx wrangler types
```

Generates types for Durable Object / container bindings (for example `env.MY_CONTAINER`).

### Start the local development server

```sh
npx wrangler dev
```

Containers run on your local Docker, so Docker must be running. Durable Object scheduling policy requires Wrangler 4.136.0 or later, and running the `cloudflare/debian-trixie` managed image locally requires 4.141.0 or later. To rebuild container-side code during a dev session, press `r`. For Vite projects, use `vite dev`.

### Send a command to the Sandbox (local)

```sh
curl http://localhost:8787 --request POST --json '{"argv":["uname","-a"]}'
```

The response contains `Linux` in `stdout` and an `exitCode` of 0. The command runs inside the container (a disposable environment), not on the host.

### Query the AI code interpreter (local)

```sh
curl http://localhost:8787 --json '{"question":"How many prime numbers are there below 100,000?"}'
```

### Set DOCKER_HOST when the socket cannot be found

```sh
export DOCKER_HOST="<SOCKET_PATH>"
```

Set this only when an `internal error` appears and the container engine socket cannot be auto-detected.

### Clean up local images

```sh
docker image prune
```

> **Warning**: Removes unused Docker images from the host. Images used for other purposes may also be affected, so review what will be removed before running it.

## Notes

- The `curl` examples talk to `wrangler dev` on localhost; commands they send run inside the local container, not on the host.

## Related

- [Local development](../references/containers/local-dev.md)
- [Execute commands](../references/containers/execute-commands.md)
