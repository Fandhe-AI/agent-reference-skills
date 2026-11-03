---
source: https://developers.cloudflare.com/sandbox/sdk/migrate/, https://developers.cloudflare.com/sandbox/sdk/migrate/changes-in-1-0/
---

# Migrating Sandbox SDK 0.x to 1.0: overview

How to move a Sandbox SDK 0.x application (`@cloudflare/sandbox` 0.12) to 1.0, where you write the Durable Object class yourself and it starts the container through `this.ctx.container`.

## Signature / Usage

Scope of this skill: only the 0.x to 1.0 migration is covered here. The Sandbox SDK 0.x reference itself (the `Sandbox` class, `getSandbox()`, and the rest of the 0.x API) is not covered by this skill; use the official documentation at https://developers.cloudflare.com/sandbox/sdk/ for it.

Find the 0.x calls your application uses (run on your own machine against your source tree; read-only):

```sh
grep -rhow \
	-e getSandbox -e sleepAfter -e keepAlive \
	-e envVars -e onStart -e onStop \
	-e onActivityExpired -e createSession \
	-e readFile -e writeFile -e listFiles -e watch \
	-e startProcess -e streamProcessLogs \
	-e exposePort -e proxyToSandbox -e wsConnect \
	-e tunnels -e terminal -e SandboxAddon \
	-e outboundByHost -e setOutboundHandler \
	-e allowedHosts -e deniedHosts -e gitCheckout \
	-e enableInternet -e interceptHttps \
	-e mountBucket -e createBackup -e restoreBackup \
	-e runCode -e createCodeContext \
	-e sandbox/opencode -e sandbox/openai \
	-e sandbox/bridge -e WarmPool \
	src | sort | uniq -c
```

## Options / Props

Where each 0.x feature goes:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Sandbox`, `getSandbox()`, `sleepAfter`, `keepAlive`, `envVars`, `onStart()`, `onStop()`, `onActivityExpired()` | 0.x code | — | Write the class: see plan-and-move.md. |
| `exec()`, `execStream()`, `createSession()` | 0.x code | — | Change calls: see commands-and-processes.md. |
| `readFile()`, `writeFile()`, `listFiles()`, `watch()` | 0.x code | — | Change calls: see files-and-storage.md. |
| `startProcess()`, `streamProcessLogs()` | 0.x code | — | Add code: see commands-and-processes.md. |
| `terminal()`, `SandboxAddon` | 0.x code | — | Add code: see commands-and-processes.md. |
| `runCode()`, `createCodeContext()` | 0.x code | — | Add code: see commands-and-processes.md. |
| `exposePort()`, `proxyToSandbox()`, `wsConnect()`, `tunnels` | 0.x code | — | Add code: see networking-and-other.md. |
| `outboundByHost`, `setOutboundHandler()`, `allowedHosts`, `deniedHosts`, `enableInternet`, `interceptHttps`, `gitCheckout()` | 0.x code | — | Add code: see networking-and-other.md. |
| `sandbox/opencode`, `sandbox/openai`, `sandbox/bridge`, `WarmPool`, `docker:dind-rootless` | 0.x code | — | Add or remove code, change the image: see networking-and-other.md. |
| `mountBucket()`, `createBackup()`, `restoreBackup()` | 0.x code | — | Change calls or add code: see files-and-storage.md. |
| Every 0.x API and its replacement | — | — | See api-map.md. |

## Notes

- 1.0 model: in 0.x the package's `Sandbox` class is your Durable Object (it starts the container, keeps it running and sends calls to an SDK server in the container). In 1.0 you write the Durable Object, which calls the container directly through `this.ctx.container`; the package keeps only small helpers such as `Files`, `S3Mount`, and `DirectoryBackup` (these run the `sandbox-shim` helper through `exec()`). The container uses the Durable Object scheduling policy, which is in public beta.
- Decisions that stay in your code: lifetime (inactivity timeout set after `start()` and again in the constructor), network access (no Internet unless `start()` passes `enableInternet: true`; allow one destination with an outbound handler that can add a credential the container never sees), failure handling (the package retries nothing and sets no time limits; use GNU coreutils `timeout`). `exec()` takes an argument array and starts no shell; each call sets its own `cwd` and `env`. Your image provides every tool: the 0.x image included Python, Git, `curl`, `wget`, `jq`, `unzip`, `ps`, while `cloudflare/debian-trixie` and `node:24-trixie-slim` include none of them.
- A deploy does not replace running containers: a new image applies only to containers that start after the deploy. The package writes nothing to Durable Object storage; 0.x keys remain and are ignored by the package.
- Support: 0.x receives bug and security fixes until 2026-12-31 and no new features; after that date deployed 0.x applications keep running and `@cloudflare/sandbox` 0.x stays on npm. The migration pages compare 1.0 with 0.12, the last 0.x release; upgrade first to `@cloudflare/sandbox` 0.12.14 and the `docker.io/cloudflare/sandbox:0.12.14` image if you use an earlier release. Until you move, pin both to 0.12.14. Features to avoid in new 0.x work: HTTP and WebSocket transports, `exposePort()`, default sessions, separate streaming methods.
- One-way switch: the deploy that moves your class to `scheduling_policy: "durable_object"` cannot be undone (0.x code cannot start containers for that class, even after `wrangler rollback`). Rehearse on a staging Worker first (see plan-and-move.md).
- The independent benchmark the page cites (100 sandboxes started at once) reports median time from creating a sandbox to running a command falling from 4.0 seconds to 648 milliseconds with the Durable Object scheduling policy; each `start()` call also chooses its own image.
- Sibling reference for the 1.0 API surface: the `sandbox/` category of this skill (names `Files`, `S3Mount`, `DirectoryBackup` pages) and the `containers/` category for `ctx.container`.

## Related

- [API map](./api-map.md)
- [Plan and move](./plan-and-move.md)
- [Commands and processes](./commands-and-processes.md)
- [Files and storage](./files-and-storage.md)
- [Networking and other features](./networking-and-other.md)
