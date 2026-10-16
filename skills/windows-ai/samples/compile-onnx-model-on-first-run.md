# Compile ONNX Model on First Run with Compatibility Check

Compile an ONNX model for the selected execution provider on first run, and validate a cached compiled model with `IsCompiledModelOptimal` before reuse.

Compile on first run (from the Windows ML walkthrough, with the output path moved to a per-user cache; `sessionOptions` is the already-configured `OrtSessionOptions`; `ortEnv`, `epName`, `epDevices` are the values obtained when the execution provider was selected):

```csharp
// Prepare paths
string executableFolder = Path.GetDirectoryName(Assembly.GetEntryAssembly()!.Location)!;
string labelsPath = Path.Combine(executableFolder, "ResNet50Labels.txt");
string imagePath = Path.Combine(executableFolder, "dog.jpg");
            
// Set the paths to your converted ONNX model
// Use Foundry Toolkit to download and convert ResNet-50 to ONNX format: https://code.visualstudio.com/docs/intelligentapps/modelconversion
string modelPath = Path.Combine(executableFolder, "resnet50-v2-7.onnx");
string cacheFolder = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "MyApp", "CompiledModels");
Directory.CreateDirectory(cacheFolder);
string compiledModelPath = Path.Combine(cacheFolder, "resnet50-v2-7-compiled.onnx");
// Marker written when a fresh compile was not optimal or could not be validated: skip compiling on later runs
string skipMarkerPath = compiledModelPath + ".not-optimal";

// File operations below must never prevent falling back to the original model
static void TryDelete(string path)
{
    try { File.Delete(path); } catch (Exception) { /* ignore: in use or access denied */ }
}
static void TryWriteMarker(string path)
{
    try { File.WriteAllText(path, "not-optimal"); } catch (Exception) { /* ignore */ }
}

// Compile the model if not already compiled (or if the cached one is not optimal)
bool isCompiled = false;
bool evaluationFailed = false;
try
{
    isCompiled = File.Exists(compiledModelPath)
        && IsCompiledModelOptimal(ortEnv, compiledModelPath, epName, epDevices);
}
catch (Exception ex)
{
    // Compatibility evaluation failed: use the original model for this run, do not compile or adopt the cached artifact
    Console.WriteLine($"Compatibility check failed ({ex.Message}). Will use original model.");
    evaluationFailed = true;
    isCompiled = false;
}

if (!isCompiled && !evaluationFailed && !File.Exists(skipMarkerPath))
{
    try
    {
        TryDelete(compiledModelPath); // not optimal for this EP/device: recompile
        Console.WriteLine("No optimal compiled model found. Compiling model ...");
        using (var compileOptions = new OrtModelCompilationOptions(sessionOptions))
        {
            compileOptions.SetInputModelPath(modelPath);
            compileOptions.SetOutputModelPath(compiledModelPath);
            compileOptions.CompileModel();
        }
        // Adopt the new artifact only if it validates as optimal
        try
        {
            isCompiled = File.Exists(compiledModelPath)
                && IsCompiledModelOptimal(ortEnv, compiledModelPath, epName, epDevices);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Validation of the compiled model failed ({ex.Message}).");
            isCompiled = false;
        }
        if (isCompiled)
        {
            Console.WriteLine("Model compiled successfully!");
        }
        else
        {
            Console.WriteLine("Compiled model is not optimal, missing, or unvalidated. Will use original model.");
            TryDelete(compiledModelPath);
            TryWriteMarker(skipMarkerPath); // avoid recompiling on every launch
        }
    }
    catch (Exception ex)
    {
        // Compilation itself failed: do not adopt a partial artifact
        Console.WriteLine($"Failed to compile the model ({ex.Message}). Will use original model.");
        isCompiled = false;
        TryDelete(compiledModelPath);
    }
}
else if (isCompiled)
{
    Console.WriteLine("Found precompiled model.");
}
var modelPathToUse = isCompiled ? compiledModelPath : modelPath;
```

Compatibility check helper (from the model compilation page):

```csharp
static bool IsCompiledModelOptimal(
    OrtEnv ortEnv,
    string compiledModelPath,
    string epName,
    IReadOnlyList<OrtEpDevice> epDevices)
{
    string compatibilityInfo =
        ortEnv.GetCompatibilityInfoFromModel(compiledModelPath, epName);

    return !string.IsNullOrWhiteSpace(compatibilityInfo) &&
        ortEnv.GetModelCompatibilityForEpDevices(
            epDevices,
            compatibilityInfo) ==
        OrtCompiledModelCompatibility.EP_SUPPORTED_OPTIMAL;
}
```

## Notes

- Deviation from the walkthrough: the output path is a per-user local cache, because the install directory is read-only for MSIX and typically for Program Files installs (as the model compilation page recommends). For a packaged app, `ApplicationData.Current.LocalCacheFolder` can be used instead of `LocalApplicationData`.
- Deviation from the walkthrough: the walkthrough only checks `File.Exists`; this sample combines it with `IsCompiledModelOptimal`, validates a freshly compiled artifact the same way, and deletes a non-optimal cached file before recompiling. It is still not a complete cache-management example.
- Deviation: delete and marker-write failures (file in use, access denied) are swallowed by `TryDelete` / `TryWriteMarker`, so the final `modelPathToUse` line is always reached and the original model is used as the fallback.
- Under an optimal-only cache policy, missing compatibility metadata is a cache miss. If compatibility evaluation returns an error, use the original model for that run and don't promote a newly compiled artifact because your app can't validate it (model compilation page). This sample therefore skips compiling in that run (`evaluationFailed`) and does not adopt a compiled artifact whose validation throws.
- `EP_NOT_APPLICABLE` is also the default when the EP doesn't implement compatibility validation; it is not evidence the cache is compatible, so use the original model. With such an EP the optimal-only policy misses the cache every launch, so the `.not-optimal` marker file skips recompiling; alternatively omit compilation entirely. Delete the marker when the EP, driver, hardware, or source model changes.
- The `.not-optimal` marker, `evaluationFailed`, and the `TryDelete` / `TryWriteMarker` helpers are this sample's own safeguards, not from the docs. The marker is written for a non-optimal result and for an exception thrown by post-compile validation; a failure of `CompileModel()` itself writes no marker, so it is retried on the next launch.
- The compatibility APIs require Windows ML 2.3 or later (upstream ONNX Runtime: `GetModelCompatibilityForEpDevices()` 1.23, `GetCompatibilityInfoFromModel()` 1.24). The device collection must be non-empty and from the same EP.
- The Windows ML samples accept the compiled model only for `EP_SUPPORTED_OPTIMAL`. Treat `EP_UNSUPPORTED` and `EP_NOT_APPLICABLE` as "use or recompile the original model".
- Include a source-model version or hash in the cache key; a new EP, driver update, hardware change, or changed compilation settings may require a new cache entry. Compilation can take minutes, so run it in the background.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/tutorial, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/model-compilation (retrieved 2026-10-16)
