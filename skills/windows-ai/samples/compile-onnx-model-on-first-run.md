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

// Compile the model if not already compiled (or if the cached one is not optimal)
bool isCompiled = File.Exists(compiledModelPath)
    && IsCompiledModelOptimal(ortEnv, compiledModelPath, epName, epDevices);
if (!isCompiled && File.Exists(compiledModelPath))
{
    File.Delete(compiledModelPath); // not optimal for this EP/device: recompile
}
if (!isCompiled)
{
    Console.WriteLine("No compiled model found. Compiling model ...");
    using (var compileOptions = new OrtModelCompilationOptions(sessionOptions))
    {
        compileOptions.SetInputModelPath(modelPath);
        compileOptions.SetOutputModelPath(compiledModelPath);
        compileOptions.CompileModel();
        isCompiled = File.Exists(compiledModelPath);
        if (isCompiled)
        {
            Console.WriteLine("Model compiled successfully!");
        }
        else
        {
            Console.WriteLine("Failed to compile the model. Will use original model.");
        }
    }
}
else
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
- Deviation from the walkthrough: the walkthrough only checks `File.Exists`; this sample combines it with `IsCompiledModelOptimal` and deletes a non-optimal cached file before recompiling. It is still not a complete cache-management example.
- The compatibility APIs require Windows ML 2.3 or later (upstream ONNX Runtime: `GetModelCompatibilityForEpDevices()` 1.23, `GetCompatibilityInfoFromModel()` 1.24). The device collection must be non-empty and from the same EP.
- The Windows ML samples accept the compiled model only for `EP_SUPPORTED_OPTIMAL`. Treat `EP_UNSUPPORTED` and `EP_NOT_APPLICABLE` as "use or recompile the original model".
- Include a source-model version or hash in the cache key; a new EP, driver update, hardware change, or changed compilation settings may require a new cache entry. Compilation can take minutes, so run it in the background.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/tutorial, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/model-compilation (retrieved 2026-10-16)
