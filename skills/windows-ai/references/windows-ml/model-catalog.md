# Windows ML Model Catalog

The Model Catalog APIs let an app or library dynamically download large AI model files to a shared on-device location from the developer's own online model catalogs, instead of shipping the files inside the app package. The catalog automatically filters models by execution-provider/hardware compatibility, and de-duplicates downloads across apps: if multiple apps request the same model (same file SHA256), the already-downloaded copy is shared on disk instead of being downloaded again.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.MachineLearning;

// Create a catalog source from a hosted catalog JSON (or a local file:// / path URI)
var source = await ModelCatalogSource.CreateFromUriAsync(
    new Uri("https://contoso.com/models"));

// Multiple sources can be added in priority order (highest priority first)
var catalog = new ModelCatalog(new ModelCatalogSource[] { source });

// Find a model by common Name — the catalog picks the best variant for this device
CatalogModelInfo model = await catalog.FindModelAsync("phi-3.5-reasoning");
if (model != null)
{
    // Download (if needed) and get a local instance of the model
    var progress = new Progress<double>(p => Console.WriteLine($"Download: {p:P}"));
    CatalogModelInstanceResult result = await model.GetInstanceAsync().AsTask(progress);

    if (result.Status == CatalogModelInstanceStatus.Available)
    {
        CatalogModelInstance instance = result.GetInstance();
        string modelPath = instance.ModelPaths[0];
        // Inference the model at modelPath with ONNX Runtime or another runtime
    }
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `ModelCatalogSource.CreateFromUriAsync(Uri)` | Creates a catalog source from an `https://` URL or a local file path pointing at a Model Catalog Source JSON file |
| `ModelCatalog(ModelCatalogSource[])` | Constructs a catalog from one or more sources; `catalog.Sources` is a mutable, priority-ordered collection you can add to later |
| `catalog.FindModelAsync(name)` | Returns the best-matching `CatalogModelInfo` for a model **Name** across all sources, filtered by the catalog's current execution-provider compatibility list |
| `catalog.FindAllModelsAsync()` | Returns all `CatalogModelInfo` matches across sources, respecting `catalog.ExecutionProviders` |
| `catalog.ExecutionProviders` | Mutable list of EP names (e.g. `cpuexecutionprovider`, `dmlexecutionprovider`) used to filter `FindModelAsync`/`FindAllModelsAsync`; clear and repopulate to narrow results |
| `catalog.GetAvailableModels()` | Returns models already downloaded/available locally, each queryable via `model.GetStatus()` (`CatalogModelStatus.Ready` / `NotReady`) |
| `CatalogModelInfo.Name` / `.Version` / `.Publisher` / `.ModelSizeInBytes` / `.ExecutionProviders` | Metadata read off a found model before downloading |
| `model.GetInstanceAsync()` / `GetInstanceAsync(headers)` | Downloads the model if not already present (dedup by file SHA256) and returns a `CatalogModelInstanceResult`; an overload accepts a header dictionary for authenticated downloads |
| `CatalogModelInstanceResult.Status` | `CatalogModelInstanceStatus.Available` on success; otherwise inspect `.ExtendedError` / `.DiagnosticText` |
| `CatalogModelInstanceResult.GetInstance()` | Returns the `CatalogModelInstance`; dispose it (`using`) when done |
| `CatalogModelInstance.ModelPaths` | Local file path(s) of the downloaded model, ready to pass to an inference runtime |

## Notes

- Model identity has two levels: **Name** (e.g. `"phi-3.5"`, shared by hardware variants) and **Id** (e.g. `"phi-3.5-cpu"`, unique per variant). Use `FindModelAsync(name)` for automatic best-variant selection; the catalog matches variants against `catalog.ExecutionProviders`.
- Cross-app sharing is keyed by each file's `sha256` in the Model Catalog Source; identical files are stored once in a shared per-user location regardless of which app requested them.
- Requires Windows App SDK 1.8.3 or later.
- Namespace: `Microsoft.Windows.AI.MachineLearning` (same namespace as `ExecutionProviderCatalog`), distinct from the Foundry Local model catalog (`foundry model list` CLI, `Microsoft.AI.Foundry.Local` SDK) covered under `foundry-local` — Windows ML's Model Catalog is for an app's own self-hosted catalogs, not the curated Foundry cloud registry.

## Related

- [Model Catalog Source schema](./model-catalog-source-schema.md)
- [ExecutionProviderCatalog](./execution-provider-catalog.md)
- [Select execution providers (device policy)](./select-execution-providers.md)
