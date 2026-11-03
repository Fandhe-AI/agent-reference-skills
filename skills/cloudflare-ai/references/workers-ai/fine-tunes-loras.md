---
source: https://developers.cloudflare.com/workers-ai/features/fine-tunes/, https://developers.cloudflare.com/workers-ai/features/fine-tunes/loras/
---

# Fine-tunes: using LoRA adapters

Upload a LoRA adapter as a fine-tune on your account and run inference with a base model by passing `lora`.

## Signature / Usage

Adapted (not in the official docs): the official snippet used the model ID `@cf/mistralai/mistral-7b-instruct-v0.2-lora`, which differs from the catalog ID `@cf/mistral/mistral-7b-instruct-v0.2-lora`.

```javascript
const response = await env.AI.run(
	"@cf/mistral/mistral-7b-instruct-v0.2-lora", //the model supporting LoRAs
	{
		messages: [{ role: "user", content: "Hello world" }],
		raw: true, //skip applying the default chat template
		lora: "00000000-0000-0000-0000-000000000", //the finetune id OR name
	},
);
```

Create a fine-tune and upload files with Wrangler:

```bash
npx wrangler ai finetune create <model_name> <finetune_name> <folder_path>

npx wrangler ai finetune list
```

Create and upload with the REST API (token needs `Workers AI Write`):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"model": "SUPPORTED_MODEL_NAME",
		"name": "FINETUNE_NAME",
		"description": "OPTIONAL_DESCRIPTION"
	}'
```

```bash
## Input: finetune_id, adapter_model.safetensors, then adapter_config.json
## Output: success true/false

curl -X POST https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/finetunes/{FINETUNE_ID}/finetune-assets/ \
    -H 'Authorization: Bearer {API_TOKEN}' \
    -H 'Content-Type: multipart/form-data' \
    -F 'file_name=adapter_model.safetensors' \
    -F 'file=@{PATH/TO/adapter_model.safetensors}'
```

List fine-tunes (`Workers AI Write` or `Workers AI Read`):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Inference over REST. Adapted (not in the official docs): `"raw"` is a JSON boolean (the source sent the string `"true"`), and the `Content-Type` header is added so the body is parsed as JSON.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/mistral/mistral-7b-instruct-v0.2-lora \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -H 'Content-Type: application/json' \
  -d '{
    "messages": [{"role": "user", "content": "Hello world"}],
    "raw": true,
    "lora": "00000000-0000-0000-0000-000000000"
  }'
```

Adapted (not in the official docs): the official excerpt contained `...` and a trailing comma; only the keys shown in the source are kept. Required `adapter_config.json` addition (`model_type` one of `mistral`, `gemma`, `llama`); other keys of your file stay as trained:

```jsonc
{
  "target_modules": [
    "q_proj",
    "v_proj"
  ],
  "task_type": "CAUSAL_LM",
  "model_type": "mistral"
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| lora | string | — | Fine-tune `id` or `name` passed in the inference input. |
| raw | boolean | — | Skip the default chat template; use the template your LoRA was trained on. |
| model | string | — | Create request: a supported base model name. |
| name | string | — | Create request: fine-tune name. |
| description | string | — | Create request: optional. |
| file_name | string | — | Upload request: `adapter_model.safetensors` or `adapter_config.json`. |
| model_type | string | — | In `adapter_config.json`: `mistral`, `gemma`, or `llama`. |

## Notes

- Feature is in open beta and free during this period (as stated in the source).
- Limitations: only a variety of models (must not be quantized; filter the catalog by LoRA https://developers.cloudflare.com/workers-ai/models/?capabilities=LoRA); adapter must be trained with rank `r <=8` as well as larger ranks if up to 32 (check `config.json`); adapter file must be < 300MB; files must be named exactly `adapter_config.json` and `adapter_model.safetensors`; up to 100 LoRA adapters per account.
- Only `adapter_model.safetensors` and `adapter_config.json` are accepted. Asset files of a fine-tune cannot be edited after upload; create a new fine-tune instead.
- Call the upload endpoint once per file; include `@` before the file path. Either the fine-tune `name` or `id` works.
- Open-source compatible adapters: the Hugging Face collection https://huggingface.co/collections/Cloudflare/workers-ai-compatible-loras-6608dd9f8d305a46e355746e . Train your own: see the AutoTrain tutorial.
- Corrected from the official docs: the original JSON example for `adapter_config.json` contained `...` and a trailing comma, and the wrangler output block (with decorative characters) was omitted; the model ID spelling was aligned to the catalog.
- Source inconsistency: the wrangler output sample in the docs mentions `@cf/mistral/mistral-7b-instruct-v0.2-lora`, the list-response sample mentions `@cf/mistralai/mistral-7b-instruct-v0.2-lora` and `@cf/meta-llama/llama-2-7b-chat-hf-lora`. Use IDs from the catalog.
- `wrangler ai finetune` is not covered by the cloudflare-wrangler skill; run `npx wrangler ai finetune --help` for flags.
- Fine-tuning here means LoRA adapters only (weights stay separate from the base model); it is unrelated to OpenAI / Anthropic fine-tuning (openai-evals-tuning).

## Related

- [Public LoRA adapters](./public-loras.md)
- [Prompting](./prompting.md)
- [Tutorial: AutoTrain LoRA](./tutorial-autotrain-lora.md)
