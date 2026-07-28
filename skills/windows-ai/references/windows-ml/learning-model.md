# LearningModel

Represents a trained machine learning model (legacy Windows ML). Load an ONNX model, enumerate its input/output features, and create a `LearningModelSession` to evaluate it.

## Signature / Usage

```csharp
using Windows.AI.MachineLearning;

var modelFile = await StorageFile.GetFileFromApplicationUriAsync(new Uri($"ms-appx:///Assets/{modelFileName}"));
LearningModel model = await LearningModel.LoadFromStorageFileAsync(modelFile);

LearningModelSession session = new LearningModelSession(model);
```

## Options / Props

| Member | Description |
|------|-------------|
| `LoadFromFilePath(String)` | Loads an ONNX model from a file on disk |
| `LoadFromStorageFileAsync(IStorageFile)` | Loads an ONNX model from an `IStorageFile` asynchronously |
| `LoadFromStream(IRandomAccessStreamReference)` / `LoadFromStreamAsync(...)` | Loads an ONNX model from a stream |
| `Close()` / `Dispose()` | Releases the in-memory ONNX model; after calling, no more `LearningModelSession` objects can be created |
| `Name`, `Author`, `Description`, `Domain`, `Version`, `Metadata` | Model metadata read from the ONNX file |
| `InputFeatures`, `OutputFeatures` | Lists of the model's input/output feature descriptors |

## Notes

- Namespace: `Windows.AI.MachineLearning` (legacy UWP API, superseded by `Microsoft.Windows.AI.MachineLearning`). See [Legacy Windows Machine Learning](./legacy-windows-machine-learning.md).
- Thread-safe. On Windows Server, requires Windows Server 2019 with Desktop Experience.
- Device family: Windows 10, version 1809 (10.0.17763.0)+.

## Related

- [LearningModelSession](./learning-model-session.md)
- [LearningModelBinding](./learning-model-binding.md)
- [Legacy Windows Machine Learning](./legacy-windows-machine-learning.md)
