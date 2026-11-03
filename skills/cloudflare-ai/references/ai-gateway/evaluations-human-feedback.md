---
source: https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback/, https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-api/, https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-bindings/
---

# Add human feedback

Annotate gateway logs with thumbs-up/down feedback via the dashboard, the Cloudflare API, or a Worker binding. Feedback feeds the (deprecated) Evaluations human-feedback metric.

## Signature / Usage

### Worker binding

```javascript
const resp = await env.AI.run(
	"@cf/meta/llama-3.1-8b-instruct",
	{
		prompt: "tell me a joke",
	},
	{
		gateway: {
			id: "my-gateway",
		},
	},
);

const myLogId = env.AI.aiGatewayLogId;

await env.AI.gateway("my-gateway").patchLog(myLogId, {
	feedback: 1, // all fields are optional; set values that fit your use case
	score: 100,
	metadata: {
		user: "123", // Optional metadata to provide additional context
	},
});
```

### API

List logs (token needs `AI Gateway Write` or `AI Gateway Read`) and patch one (needs `AI Gateway Write`):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"feedback": 1
	}'
```

## Options / Props

### `patchLog` / PATCH body

| Name | Type | Default | Description |
|------|------|---------|-------------|
| feedback | number | — | `-1` negative, `1` positive, `0` not evaluated |
| score | number | — | Number between 0 and 100 |
| metadata | object | — | Additional contextual information |

## Notes

- `patchLog(logId, {...})` returns `Promise<void>`; `await` it. All properties are optional.
- The log ID (`cf-aig-log-id`) is available in the response header, via the list-logs API, or from `env.AI.aiGatewayLogId`, which holds only the last inference call's log ID. Treat it as an opaque string: newer logs use lowercase UUIDv7 IDs, older ones 26-character ULIDs; the logs API accepts both.
- API token permissions for the API route: `AI Gateway - Read` and `AI Gateway - Edit`.
- Dashboard route: AI Gateway > Logs > expand a log entry > click thumbs up or thumbs down. To include feedback in evaluation metrics, select human feedback as an evaluator.
- Verify via the dashboard or by fetching the log again.

## Related

- [evaluations.md](./evaluations.md)
- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
- [observability-logging.md](./observability-logging.md)
