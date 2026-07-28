# LearningModelSession

Used to evaluate a `LearningModel` (legacy Windows ML) on a specific device.

## Signature / Usage

```csharp
using Windows.AI.MachineLearning;

// Creates a session using the default device
LearningModelSession session = new LearningModelSession(model);

// Bind and evaluate
LearningModelBinding binding = new LearningModelBinding(session);
binding.Bind(inputName, inputFrame);
binding.Bind(outputName, outputFrame);
LearningModelEvaluationResult results = await session.EvaluateAsync(binding, "test");
```

## Options / Props

| Constructor / member | Description |
|------|-------------|
| `LearningModelSession(LearningModel)` | Creates a session using the default device |
| `LearningModelSession(LearningModel, LearningModelDevice)` | Creates a session using a specified device |
| `LearningModelSession(LearningModel, LearningModelDevice, LearningModelSessionOptions)` | Creates a session with device and additional inference options (added in SDK 18362 / Windows 1903) |
| `Device` | The session's evaluation device |
| `Model` | The trained model for this session |
| `EvaluationProperties` | Properties controlling model evaluation |
| `Evaluate(LearningModelBinding, String)` / `EvaluateAsync(...)` | Synchronous / asynchronous evaluation using bound feature values |
| `EvaluateFeatures(IMap<String,Object>, String)` / `EvaluateFeaturesAsync(...)` | Evaluate directly from a feature map, without a separate `LearningModelBinding` |
| `Close()` / `Dispose()` | Closes the session |

## Notes

- Namespace: `Windows.AI.MachineLearning` (legacy UWP API, superseded by `Microsoft.Windows.AI.MachineLearning`). See [Legacy Windows Machine Learning](./legacy-windows-machine-learning.md).
- Thread-safe. On Windows Server, requires Windows Server 2019 with Desktop Experience.

## Related

- [LearningModel](./learning-model.md)
- [LearningModelBinding](./learning-model-binding.md)
- [LearningModelEvaluationResult](./learning-model-evaluation-result.md)
