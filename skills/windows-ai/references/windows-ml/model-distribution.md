# Distribute models for Windows ML

Windows ML loads a model from a local file path, so the app either bundles the model in its package or downloads it separately.

## Signature / Usage

```csharp
// Resolve the model path relative to the app's install location.
string modelPath = Path.Combine(AppContext.BaseDirectory, "Assets", "Models", "model.onnx");

if (!File.Exists(modelPath))
{
    throw new FileNotFoundException("The bundled model is missing from the app package.", modelPath);
}

// Load modelPath with your inference APIs.
```

Download separately (excerpt of the official `GetModelPathAsync`: reuse a verified file, download to a `.download` temp file, verify SHA-256, then move into place):

```csharp
string tempPath = modelPath + ".download";
// ... stream download to tempPath, reporting progress ...
if (!await VerifyHashAsync(tempPath, expectedSha256, cancellationToken))
{
    File.Delete(tempPath);
    throw new InvalidOperationException("Downloaded model failed integrity verification.");
}

File.Move(tempPath, modelPath, overwrite: true);
return modelPath;
```

## Options / Props

| - | Include the model in your package | Download the model separately |
| --- | --- | --- |
| Best for | Small models, or models that must work offline immediately after install | Large models, or models distributed separately from the app |
| First-run experience | Model available immediately | Download needed before first use, unless done in the installer or prefetched |
| App size impact | Increases installed size for every user | Uses storage only where a user opts into the feature |
| Offline support | Always available offline | Offline only after the first successful download |

## Notes

- Bundling: add the model and dependent files (tokenizer, labels) as content (Build Action **Content**); resolve the path relative to the install location, never a hard-coded absolute path. An optional MSIX package can keep the model out of the base install without custom download logic.
- Downloading: host over HTTPS with a SHA-256 hash; check for an existing file first; store in a writable app-local folder that survives app updates; verify the hash before use; write atomically (temp file, then rename); handle retries and offline; delete old versions on replacement. The download may run in the installer or on first run.
- For a library or SDK shared by multiple independent apps that should share one on-disk model copy, use the Windows ML Model Catalog APIs instead of custom download-and-share logic.

## Related

- [Model catalog](./model-catalog.md)
- [Windows ML overview](./overview.md)
