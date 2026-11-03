---
source: https://developers.cloudflare.com/sandbox/sdk/migrate/preview-urls/, https://developers.cloudflare.com/sandbox/sdk/migrate/tunnels/, https://developers.cloudflare.com/sandbox/sdk/migrate/outbound-traffic/, https://developers.cloudflare.com/sandbox/sdk/migrate/other-features/
---

# Migrating preview URLs, tunnels, outbound rules and other 0.x features

Replace `exposePort()` / `proxyToSandbox()` / `wsConnect()`, `tunnels`, 0.12 outbound fields and `gitCheckout()`, plus Docker-in-Docker, OpenCode, OpenAI, bridge and `WarmPool`, with code in your Worker and Durable Object. Aggregated: the official pages carry large replacement code (preview routing, tunnel management, outbound entrypoint, OpenCode/OpenAI helpers) that this skill does not reproduce; use the official URLs above for those.

## Signature / Usage

Preview URL constants (the key 0.12 used to store tokens, so existing URLs keep working):

```ts
type PortToken = { token: string; name?: string };
type Stored = Record<string, string | PortToken>;

// The key where 0.12 stored preview tokens.
const PORT_TOKENS = "portTokens";

function previewUrl(
	port: number,
	name: string,
	token: string,
	hostname: string,
): string {
	return `https://${port}-${name}-${token}.${hostname}/`;
}
```

Outbound rules constants (the 0.12 fields become constants applied in a `WorkerEntrypoint`):

```ts
type Handler = { method: string; params?: unknown };

type OutboundHandler = (
	request: Request,
	env: Env,
	params: unknown,
) => Response | Promise<Response>;

// The outbound fields of your 0.12 class.
const ENABLE_INTERNET = false;
const ALLOWED_HOSTS: string[] | undefined = [
	"github.com",
	"registry.npmjs.org",
	"api.example.com",
];
const DENIED_HOSTS: string[] | undefined = undefined;
const OUTBOUND_BY_HOST: Record<string, Handler> = {
	"api.example.com": { method: "withToken" },
};
const OUTBOUND: Handler | undefined = undefined;

// Your 0.12 handlers, by name.
const HANDLERS: Record<string, OutboundHandler> = {
	withToken: (request, env) => {
		const headers = new Headers(request.headers);
		headers.set("Authorization", `Bearer ${env.API_TOKEN}`);
		return fetch(new Request(request, { headers }));
	},
};
```

`gitCheckout()` replacement (runs `git clone` inside the sandbox container, never on the host). Adapted (not in the official docs): `url` must be `https:` and `dir` an absolute path under `/workspace/` without `..` (git also accepts `file:`, `ssh:` and `ext::` transports); see Notes.

```ts
export class MySandbox extends DurableObject<Env> {
	// ...

	async clone(url: string, dir: string): Promise<void> {
		if (new URL(url).protocol !== "https:") {
			throw new TypeError("Only https: repository URLs are allowed");
		}
		if (!dir.startsWith("/workspace/") || dir.split("/").includes("..")) {
			throw new TypeError("dir must be an absolute path under /workspace/");
		}

		await this.ensureRunning();

		const git = ["git", "clone", "--filter=blob:none", "--depth", "1"];
		const clone = await this.container.exec(
			["timeout", "-k", "5", "600", ...git, "--", url, dir],
			{ cwd: "/workspace", env: ENV },
		);
		const output = await clone.output();

		if (output.exitCode !== 0) {
			throw new Error(new TextDecoder().decode(output.stderr));
		}
	}
}
```

Docker-in-Docker image (runs as root with iptables and IP forwarding off; this Dockerfile builds the sandbox image, never runs on the host):

```dockerfile
FROM docker:dind

COPY --from=docker.io/cloudflare/sandbox:1.0.1 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

ENTRYPOINT ["sh", "-c", "dockerd-entrypoint.sh dockerd --iptables=false --ip6tables=false --ip-forward=false > /var/log/dockerd.log 2>&1 & exec sleep infinity"]
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exposePort()`, `unexposePort()`, `getExposedPorts()`, `isPortExposed()`, `validatePortToken()` | 0.x call | — | Methods over the `portTokens` storage key; validate tokens with a constant-time compare. |
| `proxyToSandbox()`, `SandboxEnv` | 0.x call | — | Your Worker routes `<port>-<name>-<token>.<hostname>` to `getByName()`; the Durable Object checks the token and forwards with `getTcpPort()`. Keep the wildcard DNS record, certificate and Worker route. |
| `wsConnect(request, port)` | 0.x call | — | `container.getTcpPort(port).fetch(request)`; bridge the WebSocket to keep the container running. |
| `tunnels.get(port)`, `tunnels.list()`, `tunnels.destroy(port)` | 0.x call | — | `openTunnel()`, `listTunnels()`, `closeTunnel()` running `cloudflared` via `exec()`; `start()` needs `enableInternet: true`. Copy `cloudflared` into the image (`COPY --from=docker.io/cloudflare/cloudflared:2026.10.2 /usr/local/bin/cloudflared /usr/local/bin/cloudflared`). |
| `tunnels.get(port, { name })` | 0.x call | — | `resumeTunnel()` / `deleteTunnel()` over the 0.12 `tunnels` and `tunnels:meta` keys; hostnames 0.12 created keep working. Keep `CLOUDFLARE_API_TOKEN`; remove `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_TUNNEL_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID`, `SANDBOX_TRANSPORT`. |
| `allowedHosts`, `deniedHosts`, `outbound`, `outboundByHost`, `outboundHandlers`, `outboundProxy`, `outboundProxies`, `enableInternet`, `interceptHttps` | 0.x field | — | Constants above plus a `WorkerEntrypoint` applying the rules in the 0.12 order, registered by the class; handlers take `(request, env, params)` rather than `(request, env, ctx)`. `interceptHttps` becomes `container.interceptOutboundHttps("*", fetcher)` for every sandbox. |
| `setAllowedHosts()`, `setDeniedHosts()`, `allowHost()`, `denyHost()`, `removeAllowedHost()`, `removeDeniedHost()`, `setOutboundHandler()`, `setOutboundByHost()`, `setOutboundByHosts()`, `removeOutboundByHost()` | 0.x call | — | Methods updating the `OUTBOUND_CONFIGURATION` key and registering the entrypoint again. |
| `ContainerProxy` | 0.x export | — | Remove from imports and Worker exports. |
| `gitCheckout()` | 0.x call | — | `clone()` above; pass `--branch` for the `branch` option; image needs Git; allow the Git host in your rules; private repositories: see the sandbox category (clone a private repository). |
| `docker:dind-rootless` image | 0.x image | — | `docker:dind` with `--ip-forward=false`; keep `enableInternet: true` so Docker can pull; wait for the daemon, run `docker run --rm --network=host ...`. |
| `@cloudflare/sandbox/opencode` | 0.x subpath | — | Start `opencode serve` and use an OpenCode SDK client; `proxyToOpencode()` becomes `fetch()` in your Durable Object forwarding to the server port. |
| `@cloudflare/sandbox/openai` | 0.x subpath | — | Your own `Shell` and `Editor`; `ShellResult` and `ApplyPatchResult` from `@openai/agents`. |
| `@cloudflare/sandbox/bridge` | 0.x subpath | — | No bridge: add a Worker route per call and check the bearer token in your Worker. |
| `WarmPool` | 0.x class | — | Remove the export, binding and variables (`WARM_POOL_TARGET`, `WARM_POOL_REFRESH_INTERVAL`, `WARM_POOL_MAX_INSTANCES`, `WARM_POOL_SCALE_BATCH_SIZE`), and delete the class with `{ "deleted_classes": ["WarmPool"], "tag": "v3" }` (or `state: "deleted"` with `exports`). |

## Notes

- Live previews after an in-place switch: a URL 0.12 issued returns 503 until a server listens on its port in the new container (briefly it can still reach the 0.12 server); after a container restarts it works without another `exposePort()` (0.12 returned 410); a wrong token or a port without a token or after `unexposePort()` returns 404. Check with `curl https://8080-ada-<TOKEN>.example.com/` and the same port with a wrong token (expect `Not found 404`). Side by side, `copyFrom0x()` copies the tokens; route via `await sandboxFor(env, name)`. Most tunnels can become preview URLs instead.
- Outbound: 0.12 checked HTTPS only with `interceptHttps = true`; the new entrypoint checks every HTTPS request, so commands that relied on the old behaviour now follow your rules. 0.12 static-field handlers (`static outboundByHost = { ... }`) never ran when TypeScript compiled class fields as definitions (ES2022 default); in 1.0 they run. HTTPS requests to a bare IP fail while `*` is intercepted and `enableInternet` is `false`; use a hostname. Handlers for mounts named `r2EgressMount` and `s3CredentialProxyMount` may appear in stored rules and are skipped.
- Adapted from the official docs: the `clone()` replacement passed `url` and `dir` to `git clone` unchecked; the snippet rejects non-`https:` URLs and directories outside `/workspace/`. The `--` separator already stops option injection.
- Security: the example handler sets an `Authorization` header from `env.API_TOKEN` only for the hostnames mapped to it (`api.example.com`); keep the secret in a Worker secret, never in the container. Keep `ENABLE_INTERNET` false unless needed; `cloudflared` requires `true`, which also lets code in the sandbox reach the Internet.
- `WarmPool` is not needed: the cited benchmark median is 648 ms with the Durable Object policy; call `start()` for a sandbox a user is about to use instead of keeping a pool (each started sandbox is billed while it waits). Clients written for the bridge API (for example `CloudflareSandboxClient` in the OpenAI Agents SDK for Python) work only with a 0.x bridge Worker.
- Docker-in-Docker on 1.0: the 0.x rootless setup's daemon exits with `failed to set IP forwarding ... read-only file system`; the daemon logs to `/var/log` because `docker:dind` mounts an empty `/tmp`; `sandbox-shim` is statically linked so it runs on Alpine. Compare containers/faq.md for the generic Docker-in-Docker guidance.
- The OpenCode, OpenAI shell/editor and bridge replacements are summarized only; read the official page https://developers.cloudflare.com/sandbox/sdk/migrate/other-features/ for their code. Not covered by this skill: the Sandbox SDK 0.x reference (https://developers.cloudflare.com/sandbox/sdk/).

## Related

- [API map](./api-map.md)
- [Plan and move](./plan-and-move.md)
- [Commands and processes](./commands-and-processes.md)
- [Files and storage](./files-and-storage.md)
