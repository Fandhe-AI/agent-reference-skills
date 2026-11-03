# samples

| Name | Description | Path |
| --- | --- | --- |
| Static frontend, container backend | Serve a static frontend with Workers Static Assets and route `/api` requests to a pool of three Containers (`durable_object` scheduling policy). | [container-backend.md](./container-backend.md) |
| Stateless instances | Distribute HTTP requests across three named Container instances, each started by its own Durable Object. | [stateless-instances.md](./stateless-instances.md) |
| Cron container | Run a short container task every two minutes from a Cron Trigger; the task prints its scheduled time and exits. | [cron-container.md](./cron-container.md) |
| Environment variables and secrets | Pass runtime environment variables, a Worker secret, a Secrets Store secret, and a KV value into a container through `env` in `ctx.container.start()`. | [env-vars-and-secrets.md](./env-vars-and-secrets.md) |
| Mount R2 buckets with FUSE | Start a Container that mounts an R2 bucket read-only with FUSE (tigrisfs), lists it, and exits; the Durable Object awaits completion with `monitor()`. | [r2-fuse-mount.md](./r2-fuse-mount.md) |
| Monitor container lifecycle | Log when a Container becomes ready, exits successfully, or fails, using `monitor()` from the Durable Object. | [status-hooks.md](./status-hooks.md) |
| WebSocket to container | Forward WebSocket upgrade requests through a Durable Object to an echo server running in a Container. | [websocket-to-container.md](./websocket-to-container.md) |
| Run tests from a Git repository | Clone a repository into a fresh disposable sandbox container, install its dependencies, run its tests, return the result, and destroy the instance. | [run-tests-in-sandbox.md](./run-tests-in-sandbox.md) |
| Stream command output | Send stdout and stderr of a command in a sandbox container to a browser as server-sent events while it runs, report the exit code, and stop the command when the client disconnects. | [stream-command-output.md](./stream-command-output.md) |
| Call an authenticated API from a sandbox | Let code in a sandbox container call an API that needs a token while the token stays in your Worker. | [call-authenticated-api-from-sandbox.md](./call-authenticated-api-from-sandbox.md) |
