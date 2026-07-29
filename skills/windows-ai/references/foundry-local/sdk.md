# Foundry Local SDK (foundry-local-sdk)

`FoundryLocalManager` is the SDK entry point for managing the Foundry Local service, the model catalog, and model lifecycle (download/load/unload) from C#, JavaScript, Python, or Rust. It wraps the native Core API and exposes an OpenAI-compatible `endpoint`/`apiKey` so any OpenAI SDK (or other OpenAI-compatible client, including the Azure AI Inference SDK pointed at a local base URL) can call the loaded model directly.

## Signature / Usage

```python
import openai
from foundry_local import FoundryLocalManager

alias = "qwen2.5-0.5b"

# Starts the service (if needed) and loads the model.
manager = FoundryLocalManager(alias)

client = openai.OpenAI(
    base_url=manager.endpoint,
    api_key=manager.api_key,  # not required for local usage
)

stream = client.chat.completions.create(
    model=manager.get_model_info(alias).id,
    messages=[{"role": "user", "content": "Why is the sky blue?"}],
    stream=True,
)
for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```

```csharp
using Microsoft.AI.Foundry.Local;

// Static helper: starts the service and loads the model in one call.
var manager = await FoundryLocalManager.StartModelAsync("qwen2.5-0.5b");

var info = await manager.GetModelInfoAsync("qwen2.5-0.5b");
Console.WriteLine($"Endpoint: {manager.Endpoint}, ApiKey: {manager.ApiKey}, Model: {info?.ModelId}");
```

## Options / Props

`FoundryLocalManager` service properties (available across languages, naming per language convention):

| Property / Method | Description |
|---|---|
| `Endpoint` / `endpoint` | OpenAI-compatible API endpoint (`service URI` + `/v1`). Pass this as `base_url` to an OpenAI SDK client. |
| `ApiKey` / `apiKey` / `api_key` | API key string (not required for local usage; default placeholder value). |
| `ServiceUri` / `service_uri` | Base URI of the Foundry Local service. |
| `IsServiceRunning` / `isServiceRunning()` / `is_service_running()` | Whether the service is running. |
| `StartServiceAsync()` / `startService()` / `start_service()` | Starts the Foundry Local service. |
| `FoundryLocalManager.StartModelAsync(aliasOrModelId)` (C# static) | Starts the service and downloads/loads the given model in one call. |
| `ListCatalogModelsAsync()` / `listCatalogModels()` / `list_catalog_models()` | Lists all models in the catalog. |
| `RefreshCatalog()` / `refreshCatalog()` / `refresh_catalog()` | Refreshes the cached catalog. |
| `GetModelInfoAsync(aliasOrModelId)` / `getModelInfo()` / `get_model_info(alias_or_model_id, raise_on_not_found=False)` | Gets model metadata by alias or model ID. |
| `GetCacheLocationAsync()` / `getCacheLocation()` / `get_cache_location()` | Returns the local model cache directory path. |
| `ListCachedModelsAsync()` / `listCachedModels()` / `list_cached_models()` | Lists models already downloaded to the cache. |
| `DownloadModelAsync(aliasOrModelId)` / `downloadModel()` / `download_model(alias_or_model_id, token=None, force=False)` | Downloads a model to the local cache. |
| `LoadModelAsync(aliasOrModelId)` / `loadModel(id, ttl=600)` / `load_model(alias_or_model_id, ttl=600)` | Loads a model into the inference server. |
| `UnloadModelAsync(aliasOrModelId)` / `unloadModel()` / `unload_model(alias_or_model_id, force=False)` | Unloads a model from the inference server. |
| `ListLoadedModelsAsync()` / `listLoadedModels()` / `list_loaded_models()` | Lists models currently loaded in the service. |

`FoundryModelInfo` / `ModelInfo` fields: `alias`, `id`, `version`, `execution_provider`/`ExecutionProvider`, `device_type`/`DeviceType` (`CPU`/`GPU`/`NPU`), `uri`, `file_size_mb`, `supports_tool_calling`, `prompt_template`, `provider`, `publisher`, `license`, `task`.

## Notes

- Two SDK generations exist: the version above (`FoundryLocalManager`, `StartModelAsync`, `GetModelInfo`, `Endpoint`, `ApiKey`) is the **CLI-dependent SDK** (C# `Microsoft.AI.Foundry.Local` ≤ 0.3.0, JS/Python `foundry-local-sdk` ≤ 0.5.x) — it requires the `foundry` CLI/service and is supported until **31 August 2026**. The newer **current SDK** (same package names, later versions) is self-contained (no CLI dependency), uses a `Configuration`/`FoundryLocalConfig` object plus `FoundryLocalManager.CreateAsync`/`.create()`/`.initialize()`, a `catalog` object (`manager.catalog.getModel(alias)`), and native `model.get_chat_client()` / `model.GetChatClientAsync()` clients in addition to the REST endpoint. New development should use the current SDK.
- On Windows, the current SDK generation also ships as `Microsoft.AI.Foundry.Local.WinML` (NuGet) / `foundry-local-sdk-winml` (PyPI) — a Windows-only variant with the identical API that bundles hardware acceleration (QNN NPU/NVIDIA GPU/CPU via WinML). See [Microsoft.AI.Foundry.Local.WinML](./winml-package.md) for setup and the required `Betalgo.Ranul.OpenAI` dependency for C#'s `ChatMessage` type.
- Passing an **alias** (for example `qwen2.5-0.5b`) auto-selects the best model variant for the end-user's hardware at run time; passing a specific **model ID** pins an exact CPU/GPU/NPU variant.
- Combine with the OpenAI SDK by pointing `base_url`/`Endpoint` at the manager's endpoint; the Azure AI Inference SDK and any other OpenAI-compatible HTTP client work the same way since the endpoint speaks the OpenAI wire format.
- Browser/JS usage without Node.js must supply `host` manually and cannot call `init`/`isServiceRunning`/`startService` — start the service via `foundry service start` first.
- Namespace: npm/PyPI/crates.io package `foundry-local-sdk`; NuGet package `Microsoft.AI.Foundry.Local`. Distinct from the Azure AI Foundry cloud SDKs (`azure-ai-projects`, etc.).

## Related

- [Foundry Local REST API](./rest-api.md)
- [Foundry Local Architecture](./architecture.md)
- [Model Catalog and Hardware Variants](./model-catalog.md)
- [Microsoft.AI.Foundry.Local.WinML](./winml-package.md)
