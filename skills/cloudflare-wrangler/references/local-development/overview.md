---
source: https://developers.cloudflare.com/workers/local-development/
---

# Local development

Build, run, and test Worker code locally with Miniflare (a simulator running your Worker in a local `workerd` process). Bindings use local simulations by default and can connect to real resources via remote bindings.

## Signature / Usage

```sh
npx wrangler dev
# or, with the Cloudflare Vite plugin
npx vite dev
```

Remote binding configuration (`remote: true` on a binding):

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",

	"r2_buckets": [
		{
			"bucket_name": "screenshots-bucket",
			"binding": "screenshots_bucket",
			"remote": true,
		},
	],
}
```

```toml
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-11-03"

[[r2_buckets]]
bucket_name = "screenshots-bucket"
binding = "screenshots_bucket"
remote = true
```

## Defaults

By default, `wrangler dev` / `vite dev` (with the Vite plugin) means:

- Your Worker code runs on your local machine.
- All resources your Worker is bound to in your Wrangler configuration are simulated locally.
- The local `workerd` runtime runs with `TZ=UTC` so that `Date` and `Intl` APIs observe UTC, matching production regardless of your machine's timezone.

Bindings use the same API calls (such as `env.MY_KV.put()`) as in a deployed environment. Local resources are initially empty (see `local-data.md`). Bindings connect to local simulations except AI bindings (AI models always run remotely). `wrangler dev --local` temporarily disables all remote bindings.

## Remote bindings

Remote bindings connect to the deployed resource instead of the local simulation. Supported by Wrangler, the Cloudflare Vite plugin, and `@cloudflare/vitest-plugin`. The Worker still **executes locally**; only the resources change. Bindings without `remote: true` keep using local simulations.

### Integration with environments

Combine with Workers Environments to protect production data:

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",

	"env": {
		"production": {
			"r2_buckets": [
				{
					"bucket_name": "screenshots-bucket",
					"binding": "screenshots_bucket",
				},
			],
		},
		"staging": {
			"r2_buckets": [
				{
					"bucket_name": "preview-screenshots-bucket",
					"binding": "screenshots_bucket",
					"remote": true,
				},
			],
		},
	},
}
```

```toml
name = "my-worker"
# Set this to today's date
compatibility_date = "2026-11-03"

[[env.production.r2_buckets]]
bucket_name = "screenshots-bucket"
binding = "screenshots_bucket"

[[env.staging.r2_buckets]]
bucket_name = "preview-screenshots-bucket"
binding = "screenshots_bucket"
remote = true
```

Running `wrangler dev -e staging` (or `CLOUDFLARE_ENV=staging vite dev`) runs the Worker locally, and calls to `env.screenshots_bucket` use `preview-screenshots-bucket`.

### Recommended remote bindings

These bindings are recommended to have `remote: true` (they rely on Cloudflare's network or have complex backends not fully simulated locally).

Browser Run (no current local simulation):

```jsonc
{
	"browser": {
		"binding": "MY_BROWSER",
		"remote": true
	},
}
```

```toml
[browser]
binding = "MY_BROWSER"
remote = true
```

Workers AI (no current local simulation):

```jsonc
{
	"ai": {
		"binding": "AI",
		"remote": true
	},
}
```

```toml
[ai]
binding = "AI"
remote = true
```

Vectorize (no current local simulation):

```jsonc
{
	"vectorize": [
		{
			"binding": "MY_VECTORIZE_INDEX",
			"index_name": "my-prod-index",
			"remote": true
		}
	],
}
```

```toml
[[vectorize]]
binding = "MY_VECTORIZE_INDEX"
index_name = "my-prod-index"
remote = true
```

mTLS (no current local simulation; verifies certificate exchange and validation):

```jsonc
{
	"mtls_certificates": [
		{
			"binding": "MY_CLIENT_CERT_FETCHER",
			"certificate_id": "<YOUR_UPLOADED_CERT_ID>",
			"remote": true
			}
	]
}
```

```toml
[[mtls_certificates]]
binding = "MY_CLIENT_CERT_FETCHER"
certificate_id = "<YOUR_UPLOADED_CERT_ID>"
remote = true
```

Images (local simulation supports only a subset of features):

```jsonc
{
	"images": {
		"binding": "IMAGES" ,
		"remote": true
	}
}
```

```toml
[images]
binding = "IMAGES"
remote = true
```

If `remote: true` is not specified for Browser Run, Vectorize, mTLS, or Images, Cloudflare **will issue a warning**. If a Workers AI binding has `remote` set to `false`, Cloudflare will **produce an error**. If the property is omitted, Cloudflare connects to the remote resource and issues a warning to add the property.

Dispatch Namespaces (Workers for Platforms) — run the dynamic dispatch Worker locally while connecting to the remote dispatch namespace:

```jsonc
{
	"dispatch_namespaces": [
		{
			"binding": "DISPATCH_NAMESPACE",
			"namespace": "testing",
			"remote":true
		}
	]
}
```

```toml
[[dispatch_namespaces]]
binding = "DISPATCH_NAMESPACE"
namespace = "testing"
remote = true
```

### Unsupported remote bindings

These always use local simulations or local values. Specifying `remote: true` for them **issues an error**. See `bindings-per-env.md`.

- **Durable Objects**: always run locally for now (may be supported in the future).
- **Workflows**: only run locally for now.
- **Environment Variables (`vars`)**: intended to differ between local and deployed; configure via `.dev.vars` or Wrangler configuration.
- **Secrets**: expected to differ locally; use `.dev.vars`.
- **Static Assets**: always served from local disk.
- **Version Metadata**: not applicable or accurate for locally running code.
- **Hyperdrive**: being worked on, currently unsupported.
- **Rate Limiting**: local sessions should not share or affect deployed rate limits.

For use-cases needing these remotely, open a feature request in the `workers-sdk` repository.

### Using remote resources with Durable Objects and Workflows

Two recommended patterns:

- **Local Durable Objects/Workflows with remote bindings:** with remote bindings enabled in Wrangler configuration, locally running Durable Objects and Workflows can access remote resources.
- **Accessing remote Durable Objects/Workflows via service bindings:** deploy a Worker that defines them, then configure a remote service binding in your local Worker pointing to the deployed Worker, which acts as a proxy interface to the remote bindings.

### Connect to Access-protected Workers

If the Worker is protected by Cloudflare Access (the Worker, all Workers in the account, a `workers.dev` hostname, a Custom Domain, or another hostname/path routing to the Worker), Wrangler must authenticate with Access when connecting to remote bindings:

- **Interactive login** (local development): if a policy accepts user login, Wrangler launches the `cloudflared access login` flow in your browser. If the policy only allows service tokens, Wrangler skips the interactive flow and throws an error requiring service token credentials.
- **Service token** (CI / non-interactive): without a configured service token in a non-interactive environment, Wrangler throws an error.

Service token setup:

1. Create a service token: dashboard **Zero Trust** > **Access** > **Service Auth** > **Service Tokens**. The Client Secret is shown only once.
2. Add a Service Auth policy to the *existing* Access application that protects the Worker or hostname (**Action**: Service Auth; **Include**: the service token, or "Any Access Service Token"). Do not create a separate Access application for the same Worker or hostname — it can conflict.
3. Expose the credentials to Wrangler (in CI, store as secrets and expose to the step running Wrangler):

```sh
export CLOUDFLARE_ACCESS_CLIENT_ID=<CLIENT_ID>
export CLOUDFLARE_ACCESS_CLIENT_SECRET=<CLIENT_SECRET>
```

## Remote bindings API

Wrangler exposes programmatic utilities for tooling authors using Miniflare:

- `startRemoteProxySession`: starts a proxy session for a set of bindings; accepts options including an `auth` option with your Cloudflare account ID and API token. Returns `ready` (`Promise<void>`), `dispose` (`() => Promise<void>`), `updateBindings` (`(bindings: StartDevWorkerInput['bindings']) => Promise<void>`), `remoteProxyConnectionString`.
- `unstable_convertConfigBindingsToStartWorkerBindings`: converts the bindings in an `Unstable_Config` (from `unstable_readConfig`) into a structure passable to `startRemoteProxySession`. This conversion is temporary.
- `maybeStartOrUpdateRemoteProxySession`: takes an object with either a Wrangler config path (plus optional target environment) or the Worker name and its bindings, the current proxy session details (`null` or omitted if none), and optionally auth data. Returns the session details if started/updated, or `null` if no proxy session is needed (no remote bindings and no existing session).

```js
import { Miniflare, MiniflareOptions } from "miniflare";
import { maybeStartOrUpdateRemoteProxySession } from "wrangler";

let mf;

let remoteProxySessionDetails = null;

async function startOrUpdateDevSession() {
	remoteProxySessionDetails = await maybeStartOrUpdateRemoteProxySession(
		{
			bindings: {
				MY_KV: {
					type: "kv_namespace",
					id: "kv-id",
					remote: true,
				},
			},
		},
		remoteProxySessionDetails,
	);

	const miniflareOptions = {
		scriptPath: "./worker.js",
		kvNamespaces: {
			MY_KV: {
				id: "kv-id",
				remoteProxyConnectionString:
					remoteProxySessionDetails?.session.remoteProxyConnectionString,
			},
		},
	};

	if (!mf) {
		mf = new Miniflare(miniflareOptions);
	} else {
		mf.setOptions(miniflareOptions);
	}
}

// ... tool logic that invokes `startOrUpdateDevSession()` ...

// ... once the dev session is no longer needed run
// `remoteProxySessionDetails?.session.dispose()`
```

## `wrangler dev --remote` (Legacy)

```sh
npx wrangler dev --remote
```

All Worker code is uploaded to a temporary preview environment on Cloudflare, and changes are uploaded on save. All bindings connect to remote resources; they cannot be configured to use local simulations. Not supported in the Vite plugin. Use it only for behavior specific to Cloudflare's network that cannot be simulated locally or tested via remote bindings.

- Iteration is significantly slower due to the upload step.
- A limit of 50 routes per zone is enforced.
- Python Workers do not support `--remote`; use remote bindings instead.

## Notes

- Miniflare is not a hardened sandbox. Do not run untrusted or potentially malicious Worker code directly on your machine; run the whole development process inside a secure sandbox such as a virtual machine. This applies to `wrangler dev`, `vite dev`, `vite preview`, direct Miniflare use, and Miniflare-based testing tools.
- `remote: true` changes which resource your code accesses, but your Worker code still executes locally. Legacy `wrangler dev --remote` executes your code on Cloudflare.
- Data modification: writes, deletes, and updates on remote bindings affect actual data (preview or production).
- Billing: remote binding operations incur standard operational costs (KV operations, R2 storage/operations, AI requests, D1 usage).
- Network latency applies to remote bindings.
- The doc's API heading anchors reference `experimental_maybeStartOrUpdateProxySession` / `maybeStartOrUpdateRemoteProxySession` inconsistently; the example imports `maybeStartOrUpdateRemoteProxySession` from `wrangler`.

## Related

- [Supported bindings per development mode](./bindings-per-env.md)
- [Environment variables and secrets](./environment-variables.md)
- [Adding local data](./local-data.md)
- [Choosing between Wrangler & Vite](./wrangler-vs-vite.md)
- [Wrangler commands](../commands/README.md)
