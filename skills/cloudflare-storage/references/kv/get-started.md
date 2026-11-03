---
source: https://developers.cloudflare.com/kv/get-started/
---

# Getting started

Create a KV namespace, bind it to a Worker, write and read key-value pairs, and deploy, using Wrangler or the dashboard.

## Signature / Usage

Create a Worker project:

```sh
npm create cloudflare@latest -- kv-tutorial
```

Create a namespace (a `<BINDING_ID>` is randomly generated):

```sh
npx wrangler kv namespace create USERS_NOTIFICATION_CONFIG
```

```sh
🌀 Creating namespace with title "USERS_NOTIFICATION_CONFIG"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{
	"kv_namespaces": [
		{
			"binding": "USERS_NOTIFICATION_CONFIG",
			"id": "<BINDING_ID>"
		}
	]
}
```

Bind it in the Wrangler file:

```jsonc
{
	"kv_namespaces": [
		{
			"binding": "USERS_NOTIFICATION_CONFIG",
			"id": "<BINDING_ID>"
		}
	]
}
```

Write and read with Wrangler:

```sh
npx wrangler kv key put --binding=USERS_NOTIFICATION_CONFIG "user_1" "enabled"
npx wrangler kv key get --binding=USERS_NOTIFICATION_CONFIG "user_1" --text
```

Access from a Worker:

```ts
export interface Env {
  USERS_NOTIFICATION_CONFIG: KVNamespace;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    try {
      await env.USERS_NOTIFICATION_CONFIG.put("user_2", "disabled");
      const value = await env.USERS_NOTIFICATION_CONFIG.get("user_2");
      if (value === null) {
        return new Response("Value not found", { status: 404 });
      }
      return new Response(value);
    } catch (err) {
      console.error(`KV returned error:`, err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unknown error occurred when accessing KV storage";
      return new Response(errorMessage, {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
} satisfies ExportedHandler<Env>;
```

Deploy:

```sh
npm run deploy
```

## Options / Props

`wrangler kv key put` namespace selection (exactly one of `--binding` or `--namespace-id` is required):

| Name | Type | Description |
|------|------|-------------|
| --binding | string | Target the namespace by binding name. |
| --namespace-id | string | Target the namespace by ID. |
| --remote | boolean | Write to the remote namespace (default is local). |
| --text | boolean | With `kv key get`, view the value as text in the terminal. |

## Notes

- Binding names are only a reference; the `binding` value must be a valid JavaScript variable name and is available at `env.<BINDING_NAME>`.
- By default `wrangler kv key put` writes locally; add `--remote` to write to the remote namespace:

```sh
npx wrangler kv key put --namespace-id=xxxxxxxxxxxxxxxx "<KEY>" "<VALUE>" --remote
```

- `wrangler dev` uses local KV by default; reading keys not written locally returns `null`. Set `"remote": true` in the binding to use the remote namespace.
- KV operations are scoped to your account. Use `kv bulk` to write a file of multiple pairs.
- Workers KV Instant (private beta) is for small, read-heavy configuration values that update infrequently and are proactively propagated across the network. Create one with Wrangler:

```sh
npx wrangler@latest kv namespace create APP_CONFIG --experimental-mode instant
```

Or with the Cloudflare CLI (`cf kv namespaces create --title APP_CONFIG --namespaceMode instant`) or the API (requires the `Workers KV Storage Write` permission):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"title": "APP_CONFIG",
		"mode": "instant"
	}'
```

KV Instant namespaces have additional limitations; see `limits.md` before choosing this mode.
- Always handle exceptions explicitly (`try...catch`) when reading from or writing to KV.
- Wrangler installation and project scaffolding are covered by the cloudflare-wrangler and cloudflare-workers skills.

## Related

- [kv-namespaces.md](./kv-namespaces.md)
- [kv-bindings.md](./kv-bindings.md)
- [kv-commands.md](./kv-commands.md)
- [environments.md](./environments.md)
- [limits.md](./limits.md)
