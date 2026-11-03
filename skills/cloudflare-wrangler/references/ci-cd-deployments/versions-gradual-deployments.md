---
source: https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/
---

# Gradual Deployments

Split traffic between two versions of a Worker by percentage. Also covers Gradual Deployments with Durable Objects.

## Signature / Usage

Requires Wrangler 3.40.0+ (before 3.73.0 needs `--x-versions`).

```
npx wrangler versions upload
```

```
npx wrangler versions deploy
```

Follow the prompts to choose percentages; run `wrangler versions deploy` again and set the new version to 100% to finish. Test the split:

```bash
for j in {1..10}
do
    curl -s https://$WORKER_NAME.$SUBDOMAIN.workers.dev
done
```

Logpush `ScriptVersion` field (added via the Logpush API only):

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs' \
-H 'Authorization: Bearer <TOKEN>' \
-H 'Content-Type: application/json' \
-d '{
"name": "workers-logpush",
"output_options": {
    "field_names": ["Event", "EventTimestampMs", "Outcome", "Logs", "ScriptName", "ScriptVersion"]
},
"destination_conf": "<DESTINATION_URL>",
"dataset": "workers_trace_events",
"enabled": true
}'| jq .
```

```json
{
	"ScriptVersion": {
		"id": "<UUID>",
		"message": "<MESSAGE>",
		"tag": "<TAG>"
	}
}
```

## Options / Props

Durable Object version assignment example (Version A currently deployed, gradually deploying B; objects "foo", "bar", "baz"):

| Deployment config | "foo" | "bar" | "baz" |
| --- | --- | --- | --- |
| Version A: 100% | A | A | A |
| Version B: 20% / Version A: 80% | B | A | A |
| Version B: 50% / Version A: 50% | B | B | A |
| Version B: 100% | B | B | B |

## Notes

- Dashboard: Worker > **Edit code** > down arrow next to **Deploy** > **Save** creates a version; **Deployments** > **Promote deployment** creates the split.
- Version skew: by default each request is routed independently, so consecutive requests (reloads, asset fetches) may hit different versions; use version affinity to pin. Between Workers via service bindings, use version overrides to pin the downstream Worker.
- Observability: `ScriptVersion` in Logpush; Version metadata binding exposes version ID/tag at runtime.
- Limit: gradual deployment only with the last 100 uploaded versions.
- Durable Objects: only one version of each object runs at a time; each object is assigned a version per the percentages and keeps it until a new deployment. Guarantees: per deployment, requests to an object use the same version; if you list versions in the same order and increase a version's percentage, objects previously assigned that version are not reassigned; an object resets only when assigned a different version.
- DO and its Worker are usually bundled together so they cannot be deployed independently; keep API changes forwards and backwards compatible.
- Durable Object class lifecycle changes (via `exports` or legacy `migrations`) cannot be uploaded as versions because they are atomic; rollbacks cannot go to versions prior to the change. Wrangler before `4.131.0` may return error code `10211` on `wrangler versions upload` with a pending migration; apply with `npx wrangler deploy`. Deploy lifecycle changes independently of other code changes.

## Related

- [versions-overview.md](./versions-overview.md)
- [versions-version-affinity.md](./versions-version-affinity.md)
- [versions-version-overrides.md](./versions-version-overrides.md)
- [workers-versions.md](../commands/workers-versions.md)
