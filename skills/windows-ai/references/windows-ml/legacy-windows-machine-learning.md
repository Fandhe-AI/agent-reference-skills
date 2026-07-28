# Legacy Windows Machine Learning (Windows.AI.MachineLearning)

The original Windows ML API surface, shipped in 2018 in the `Windows.AI.MachineLearning` namespace (UWP `windows.dll`). Superseded by the new `Microsoft.Windows.AI.MachineLearning` namespace shipped in the Windows App SDK — see [What is Windows ML](./overview.md).

## Signature / Usage

```csharp
using Windows.AI.MachineLearning;

// Load and create the model
var modelFile = await StorageFile.GetFileFromApplicationUriAsync(new Uri($"ms-appx:///Assets/{modelFileName}"));
LearningModel model = await LearningModel.LoadFromStorageFileAsync(modelFile);

// Create the evaluation session
LearningModelSession session = new LearningModelSession(model);

// Bind inputs/outputs and evaluate
LearningModelBinding binding = new LearningModelBinding(session);
binding.Bind(inputFeatureName, inputFrame);
binding.Bind(outputFeatureName, outputFrame);
LearningModelEvaluationResult results = await session.EvaluateAsync(binding, "correlationId");
```

## Notes

- Namespace: `Windows.AI.MachineLearning` (UWP). Distinct from the current `Microsoft.Windows.AI.MachineLearning` namespace covered elsewhere in this skill — do not mix the two APIs in new code.
- Windows ML (legacy) is built into Windows 11 / Windows 10 / Windows Server 2019+ and is also available as a NuGet package (`Microsoft.AI.MachineLearning`) for down-level reach to Windows 8.1.
- Uses ONNX-format models, the same as the current Windows ML.
- New apps should use the current Windows ML APIs (`Microsoft.Windows.AI.MachineLearning`, `ExecutionProviderCatalog`, ONNX Runtime APIs) instead — they supersede this namespace and add dynamic EP acquisition, evergreen servicing, and direct ONNX Runtime API access.
- All API reference pages under `Windows.AI.MachineLearning` carry an "Important" banner in the official docs pointing to the new namespace.

## Related

- [What is Windows ML](./overview.md)
- [LearningModel](./learning-model.md)
- [LearningModelSession](./learning-model-session.md)
- [LearningModelBinding](./learning-model-binding.md)
- [LearningModelEvaluationResult](./learning-model-evaluation-result.md)
