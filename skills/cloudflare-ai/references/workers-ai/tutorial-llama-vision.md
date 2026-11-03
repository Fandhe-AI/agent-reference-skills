---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/llama-vision-tutorial/
---

# Tutorial: Llama 3.2 11B Vision Instruct

Accept Meta's license once per account, then send messages and an image to `@cf/meta/llama-3.2-11b-vision-instruct`.

## Signature / Usage

Accept the license (first use):

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3.2-11b-vision-instruct \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "prompt": "agree" }'
```

Adapted (not in the official docs): the source labelled this fence `javascript` although it contains TypeScript (`interface`, `satisfies`); it is labelled `ts` here.

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Describe the image I'm providing." },
    ];

    // Replace this with your image data encoded as base64 or a URL
    const imageBase64 = "data:image/png;base64,IMAGE_DATA_HERE";

    const response = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
      messages,
      image: imageBase64,
    });

    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

```jsonc
{
	"env": {},
	"ai": {
		"binding": "AI"
	}
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| messages | array | — | System and user messages. |
| image | string | — | Image data as base64 (for example a `data:image/png;base64,...` string) or a URL, per the source comment. |
| CLOUDFLARE_ACCOUNT_ID | env var | — | Account ID for the license call. |
| CLOUDFLARE_AUTH_TOKEN | env var | — | API token for the license call. |

## Notes

- Without agreeing to the license the call fails with `Model agreement` (error `5016`, HTTP 403).
- As written, the tutorial Worker ignores the request body: the `curl -X POST ... -d '{ "image": "BASE64_ENCODED_IMAGE" }'` test does not feed the image into the model; the image is the hard-coded `imageBase64` constant. Read the request body yourself if you want per-request images.
- The sample response in the source (`{ "result": "This is a golden retriever ..." }`) is illustrative.
- Keep API tokens in environment variables, not in command history shared with others.
- Deploy with `wrangler deploy` (cloudflare-wrangler).

## Related

- [Errors](./errors.md)
- [Binding and env.AI.run()](./bindings-and-run.md)
- [Tutorials index](./tutorials-index.md)
