---
source: https://developers.cloudflare.com/workers-ai/features/fine-tunes/public-loras/
---

# Public LoRA adapters

Cloudflare-provided LoRA adapters named `cf-public-*` that work immediately for fine-tuned inference.

## Signature / Usage

Adapted (not in the official docs): `Content-Type: application/json` header added so the body is parsed as JSON.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/mistral/mistral-7b-instruct-v0.1 \
  --header 'Authorization: Bearer {cf_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "messages": [
      {
        "role": "user",
        "content": "Write a python program to check if a number is even or odd."
      }
    ],
    "lora": "cf-public-magicoder"
  }'
```

List public LoRAs (`Workers AI Write` or `Workers AI Read`):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes/public" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Binding. Adapted (not in the official docs): the long article text in the prompt is replaced by a placeholder.

```js
const answer = await env.AI.run("@cf/mistral/mistral-7b-instruct-v0.1", {
	stream: true,
	raw: true,
	messages: [
		{
			role: "user",
			content: "Summarize the following: <article text>",
		},
	],
	lora: "cf-public-cnn-summarization",
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cf-public-magicoder | LoRA name | — | Coding tasks in multiple languages. Compatible with `@cf/mistral/mistral-7b-instruct-v0.1`, `@hf/mistral/mistral-7b-instruct-v0.2`. |
| cf-public-jigsaw-classification | LoRA name | — | Toxic comment classification. Same compatible models. |
| cf-public-cnn-summarization | LoRA name | — | Article summarization. Same compatible models. |

## Notes

- Public LoRAs are named `cf-public-x`; the prefix is reserved for Cloudflare. Try them in the playground https://playground.ai.cloudflare.com .
- Use the prompt template the LoRA was trained on (see the linked Hugging Face repos: predibase/magicoder, predibase/jigsaw, predibase/cnn).
- Compatible model IDs are copied from the source; confirm they are still listed in the model catalog before relying on them.
- Adapted from the official docs: a `Content-Type: application/json` header is added so the body is parsed as JSON, and the long article text in the Binding example's prompt is replaced by a placeholder.

## Related

- [Fine-tunes: LoRA adapters](./fine-tunes-loras.md)
- [Prompting](./prompting.md)
