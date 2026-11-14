---
source: https://opencode.ai/docs/providers/#azure
---

# Provider: Azure

Azure's standard catalog endpoint needs a resource name in addition to its credential.

## Signature / Usage

Set `settings.resourceName` once, then connect an API key or use the Microsoft Entra ID session from the Azure CLI as described in [Provider accounts](https://opencode.ai/docs/cli/providers/).

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

Find the **Resource name** in the [Azure portal](https://portal.azure.com/) or [Microsoft Foundry](https://ai.azure.com/). It is also the first part of endpoints such as `https://my-models.openai.azure.com/` and `https://my-models.services.ai.azure.com/`.

```bash
az cognitiveservices account list \
  --query "[].{name:name,resourceGroup:resourceGroup}" \
  --output table
```

To use Entra ID, install the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli), sign in, then choose **Microsoft Entra ID (Azure CLI)** when connecting Azure.

```bash
az login
```

Enter the resource name when connecting if it is not already supplied by configuration or the environment. A resource name saved with a connection takes precedence over configuration; connect again to change it.

Azure CLI connections use the account selected in the Azure CLI. For a resource in another tenant or subscription, select both explicitly.

```bash
az login --tenant TENANT_ID
az account set --subscription NAME_OR_ID
```

Instead of configuration, `AZURE_RESOURCE_NAME` supplies the resource name to the OpenCode server. The legacy `AZURE_COGNITIVE_SERVICES_RESOURCE_NAME` variable also works.

### Deployments

Azure serves a model only through a deployment, so OpenCode lists the deployments of your resource and shows those instead of the whole Azure catalog. The list loads in the background after startup, after connecting, and after switching accounts. To pick up a deployment added later, restart OpenCode or connect again.

- Until the list loads for a connection, or if it fails, the whole catalog stays available.
- A failed reload for the same connection keeps its last complete inventory.
- Switching accounts never shows the previous account's inventory; the new account starts from the whole catalog.
- Deployments inherit limits, costs, and capabilities from their catalog models.

Deployment names are their model IDs, in lowercase because Azure ignores case in names, for example `azure/gpt-production`. A deployment named after its model, such as `gpt-6-luna`, keeps the catalog ID. These IDs stay stable when other deployments are added or removed.

OpenCode matches a deployment to the catalog by the model it deploys, or by its name when Azure spells the model differently, as with `gpt-4` for GPT-4 Turbo. A deployment named after another model, such as `gpt-6.1-sol` deploying `gpt-6-luna`, shows that model's name, limits, and costs.

With the Azure CLI, OpenCode lists deployments through the Azure management API, which needs read access to the resource. If that fails, and always with an API key, it uses the resource's legacy deployment inventory. Discovery reads every page before publishing the list. A custom `settings.baseURL` keeps the catalog.

Configure a deployment explicitly when its model is not in the catalog, such as a fine-tuned model, or to map a model ID to a deployment yourself. OpenCode logs a warning naming such deployments. Explicitly configured models are always kept.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "azure": {
      "models": {
        "gpt-6-luna": {
          "modelID": "gpt-production",
        },
      },
    },
  },
}
```

Your identity needs one of these roles:

- **Cognitive Services OpenAI User** for Azure OpenAI models.
- **Cognitive Services User** for other Foundry models.

If a request uses a token from the wrong tenant, sign in again with the required tenant.

```bash
az login --tenant TENANT_ID
```

## Notes

- V2 rejects the retired provider ID `azure-cognitive-services/<model>`; use `azure/<model>`.

## Related

- [Providers](./providers.md)
- [Provider errors](./provider-errors.md)
- [Provider packages and models](./provider-packages-models.md)
