---
source: https://developers.cloudflare.com/workers-ai/get-started/rest-api/, https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/, https://developers.cloudflare.com/workers-ai/features/fine-tunes/loras/
---

# Workers AI

Commands for running Workers AI over the REST API, creating a Worker project, local development, deployment, and uploading LoRA fine-tunes.

Export `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` first (below). The API token needs `Workers AI - Read` and `Workers AI - Edit`. Full Wrangler flag tables belong to the cloudflare-wrangler skill.

## Signature / Usage

### Set environment variables

```sh
export CLOUDFLARE_ACCOUNT_ID="<ACCOUNT_ID>"
export CLOUDFLARE_API_TOKEN="<API_TOKEN>"
```

Do not commit these values. Keep them in your shell or a gitignored `.env` / `.dev.vars` file.

### Run a model over the REST API

Adapted (not in the official docs): `{ACCOUNT_ID}` / `{API_TOKEN}` placeholders replaced with the environment variables above; see Notes.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -d '{ "prompt": "Where did the phrase Hello World come from" }'
```

Any model in the Workers AI models catalog can replace `@cf/meta/llama-3.1-8b-instruct`.

### Create a Worker project

```sh
npm create cloudflare@latest -- hello-ai
```

```sh
cd hello-ai
```

Other package managers: `yarn create cloudflare hello-ai` / `pnpm create cloudflare@latest hello-ai`. The guide selects "Hello World example", "Worker only", "TypeScript", git "Yes", AGENTS.md "Yes", deploy "No".

### Configure the AI binding

```jsonc
{
	"ai": {
		"binding": "AI"
	}
}
```

```toml
[ai]
binding = "AI"
```

Add to the Wrangler configuration file. The binding is available as `env.AI`.

### Local development

> **Warning**: Workers AI always accesses your Cloudflare account to run models, so usage charges apply even in local development.

```sh
npx wrangler dev
```

You are prompted to log in on first run.

### Log in and deploy

```sh
npx wrangler login
```

```sh
npx wrangler deploy
```

The Worker is published to `https://hello-ai.<YOUR_SUBDOMAIN>.workers.dev`.

### Upload a LoRA adapter (Wrangler)

```bash
npx wrangler ai finetune create <model_name> <finetune_name> <folder_path>
```

```bash
npx wrangler ai finetune list
```

The folder must contain `adapter_config.json` and `adapter_model.safetensors` (exact file names, adapter under 300MB). `adapter_config.json` must include `model_type` set to one of `mistral`, `gemma` or `llama`. Fine-tune assets cannot be edited after upload; create a new fine-tune instead.

### Create a LoRA fine-tune (REST API)

Requires an API token with `Workers AI: Edit` (`Workers AI Write`).

Adapted (not in the official docs): `$ACCOUNT_ID` is replaced with `${CLOUDFLARE_ACCOUNT_ID}` and `$CLOUDFLARE_API_TOKEN` with `${CLOUDFLARE_API_TOKEN}` to match the variables exported above. See Notes.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/finetunes" \
	--request POST \
	--header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
	--json '{
		"model": "SUPPORTED_MODEL_NAME",
		"name": "FINETUNE_NAME",
		"description": "OPTIONAL_DESCRIPTION"
	}'
```

### Upload adapter files (REST API)

Adapted (not in the official docs): the explicit `Content-Type: multipart/form-data` header is removed because it omits the boundary and breaks the upload (curl `-F` sets the header with a boundary itself), and the `{ACCOUNT_ID}` / `{API_TOKEN}` / `{FINETUNE_ID}` placeholders are replaced with the exported variables and `<FINETUNE_ID>`. See Notes.

```bash
# Input: finetune_id, adapter_model.safetensors, then adapter_config.json
# Output: success true/false

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/finetunes/<FINETUNE_ID>/finetune-assets/" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -F 'file_name=adapter_model.safetensors' \
    -F 'file=@<PATH/TO/adapter_model.safetensors>'
```

Run the call once per file: once for `adapter_model.safetensors` and once for `adapter_config.json` (change both `file_name` and the `file=@` path). Keep the `@` before the path. The finetune `name` or `id` can be used.

### List fine-tunes (REST API)

Adapted (not in the official docs): `$ACCOUNT_ID` is replaced with `${CLOUDFLARE_ACCOUNT_ID}` to match the variables exported above. See Notes.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/finetunes" \
	--request GET \
	--header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
```

Requires `Workers AI Read` or `Workers AI Write`.

### Run inference with a LoRA (REST API)

Adapted (not in the official docs): the official body sends `"raw": "true"` as a string, while the Worker example on the same page uses the boolean `true`; the boolean is used here. Placeholders are replaced with environment variables. See Notes.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/mistral/mistral-7b-instruct-v0.2-lora" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -d '{
    "messages": [{"role": "user", "content": "Hello world"}],
    "raw": true,
    "lora": "<FINETUNE_ID_OR_NAME>"
  }'
```

`@cf/mistral/mistral-7b-instruct-v0.2-lora` is the catalog model ID (the docs page's Worker example spells it `@cf/mistralai/...`, which is not in the catalog). Other LoRA-capable models are listed in the Workers AI models catalog (filter by LoRA).

## Notes

- Adapted from the official docs: placeholders and `$ACCOUNT_ID` replaced with the exported `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` variables, the `curl` multipart upload no longer sets `Content-Type` manually, and the LoRA `raw` value is boolean.
- The LoRA inference example keeps the official curl path's catalog model ID `@cf/mistral/mistral-7b-instruct-v0.2-lora`, consistent with the fine-tunes reference page (the same docs page's Worker example and list response show `@cf/mistralai/...`, which is not a catalog ID).
- Do not commit the token; keep it in the shell or a gitignored `.dev.vars`.

## Related

- [Workers AI binding for AI Gateway](../references/ai-gateway/integrations-workers-ai-binding.md)
