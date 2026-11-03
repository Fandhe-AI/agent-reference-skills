---
source: https://developers.cloudflare.com/workers-ai/get-started/rest-api/
---

# REST API

Run Workers AI models over HTTP with the Execute AI model endpoint, authenticated by an API token.

## Signature / Usage

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -d '{ "prompt": "Where did the phrase Hello World come from" }'
```

Response shape:

```json
{
	"result": {
		"response": "Hello, World first appeared in 1974 at Bell Labs when Brian Kernighan included it in the C programming language example. It became widely used as a basic test program due to simplicity and clarity. It represents an inviting greeting from a program to the world."
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ACCOUNT_ID | string | — | Account ID, copied from the Workers AI dashboard page (**Use REST API**). |
| API_TOKEN | string | — | Workers AI API token. A custom token needs `Workers AI - Read` and `Workers AI - Edit`. |
| model | string | — | Model path segment after `/ai/run/`. Any model in the catalog can be used. |

## Notes

- Get the token: dashboard Workers AI page, **Use REST API**, **Create a Workers AI API Token**, copy it and save it (it is shown on your profile afterwards).
- Reference for the endpoint: https://developers.cloudflare.com/api/resources/ai/methods/run/
- Embedded function calling is not supported over the REST API; it needs Workers.
- Treat the API token as a secret: do not commit it; prefer an environment variable over typing it inline in shell history.
- OpenAI-compatible paths (`/ai/v1/...`) are on a separate page.

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [OpenAI compatibility](./openai-compatibility.md)
- [Batch API](./batch-api.md)
- [Markdown conversion REST API](./markdown-conversion-rest-api.md)
