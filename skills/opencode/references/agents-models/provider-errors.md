---
source: https://opencode.ai/docs/providers/#errors
---

# Provider Errors

Provider and model errors usually identify the failed stage. Check the server process environment and the exact model ID before changing packages.

## Signature / Usage

Snippet taken from https://opencode.ai/docs/providers/#azure (replacement for an unset resource name):

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "azure": {
      "settings": {
        "resourceName": "my-models",
      },
    },
  },
}
```

| Error or symptom | Check |
| --- | --- |
| `No model is available for session ...` | No enabled model is currently selectable. Finish the provider-specific setup, then choose a model in `/models`. |
| `Model unavailable: provider/model` | The provider is inactive, the model ID is absent or disabled, or dynamic discovery no longer returns it. For custom aliases, check the `models` map key rather than `modelID`. |
| `Cannot initialize provider/model: NAME is required to resolve the provider endpoint` | A `${NAME}` placeholder remains in `baseURL`. Set that variable on the OpenCode server or replace the template with a complete endpoint. |
| `Azure resource name is missing` | Set `providers.azure.settings.resourceName`, `AZURE_RESOURCE_NAME`, or a complete `settings.baseURL`. |
| Vertex does not appear | Set a resolvable project in provider settings or a supported project variable. ADC alone does not activate the provider. |
| Bedrock does not appear | Provide a profile or another supported AWS credential-chain input. `AWS_REGION` by itself only selects a region. |
| Ollama has no models | Confirm the server exposes `/api/tags` and `/api/show` at the path derived from `baseURL`, and that `/api/show` reports the `completion` capability. |
| Copilot has no models | Confirm the active OAuth account has Copilot Chat access. A failed model sync is logged as `failed to sync GitHub Copilot models`. |

## Notes

- V2 rejects the retired provider IDs with a direct replacement. Use `azure/<model>` instead of `azure-cognitive-services/<model>`, and `google-vertex/<model>` instead of `google-vertex-anthropic/<model>`.

## Related

- [Providers](./providers.md)
- [Azure](./provider-azure.md)
- [Bedrock and Vertex](./provider-bedrock-vertex.md)
- [Copilot, Ollama, runtimes, gateways](./provider-copilot-local-gateways.md)
