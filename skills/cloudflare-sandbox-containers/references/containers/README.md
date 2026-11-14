# containers

| Name | Description | Path |
| --- | --- | --- |
| Containers overview | What Cloudflare Containers are, minimal Worker, Durable Object and Wrangler setup | [overview.md](./overview.md) |
| Get started | Deploy a first container with a Durable Object | [get-started.md](./get-started.md) |
| Lifecycle of a Container | Deployment, instance states, routing, cold starts, shutdown | [architecture.md](./architecture.md) |
| Placement | Regional and jurisdictional placement constraints | [placement.md](./placement.md) |
| Migrate from the Container class | Container class helper to Durable Object Container API mapping, migration steps | [api-comparison.md](./api-comparison.md) |
| Container class (deprecated) | Deprecated `@cloudflare/containers` Container class, hooks, helpers (historical) | [container-class.md](./container-class.md) |
| Durable Object Container API | `ctx.container` start, exec, snapshot, monitor, intercepts | [durable-object-container.md](./durable-object-container.md) |
| Execute commands | `exec()` task guide: stdin, output, timeouts, streaming | [execute-commands.md](./execute-commands.md) |
| Wrangler configuration | `containers`, Durable Object binding and `exports` setup | [wrangler-configuration.md](./wrangler-configuration.md) |
| Scheduling policies | `default` versus `durable_object` policy and migration between them | [scheduling-policy.md](./scheduling-policy.md) |
| Rollouts | Gradual, immediate and none rollout modes, grace period | [rollouts.md](./rollouts.md) |
| Scaling and routing | Explicit instance names and random routing across a fixed pool | [scaling-and-routing.md](./scaling-and-routing.md) |
| Environment variables | Runtime variables and user-defined variables | [environment-variables.md](./environment-variables.md) |
| Handle outbound traffic | Outbound handlers, allow and deny hosts, HTTPS interception | [outbound-traffic.md](./outbound-traffic.md) |
| Connect to Workers and bindings | Reach KV, R2 and Durable Objects from a container | [workers-connections.md](./workers-connections.md) |
| Image management | Managed image, named images, registries, pushing images | [image-management.md](./image-management.md) |
| Deploy Containers | Deploy from your machine or Workers Builds | [deploy.md](./deploy.md) |
| Local development | `wrangler dev` and `vite dev` with containers | [local-dev.md](./local-dev.md) |
| Snapshots | Save and restore container filesystems | [snapshots.md](./snapshots.md) |
| SSH | Connect to a running instance through Wrangler | [ssh.md](./ssh.md) |
| Limits and instance types | Instance sizes, account, outbound and snapshot limits | [limits.md](./limits.md) |
| Pricing | vCPU, memory, disk and egress rates | [pricing.md](./pricing.md) |
| Containers FAQ | Logs, scaling, cold starts, disk, Docker-in-Docker | [faq.md](./faq.md) |
