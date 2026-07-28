# LearningModelBinding

Used to bind values to a `LearningModel`'s named input and output features before evaluation (legacy Windows ML).

## Signature / Usage

```csharp
using Windows.AI.MachineLearning;

LearningModelBinding binding = new LearningModelBinding(session);

binding.Bind(inputImageDescription.Name, inputFrame);
binding.Bind(outputImageDescription.Name, outputFrame);

var results = await session.EvaluateAsync(binding, "test");
```

## Options / Props

| Member | Description |
|------|-------------|
| `LearningModelBinding(LearningModelSession)` | Creates a binding from the specified session |
| `Bind(String, Object)` | Binds a value to the named feature |
| `Bind(String, Object, IPropertySet)` | Binds a value to the named feature with additional binding properties |
| `Clear()` | Removes all bindings |
| `HasKey(String)` | Checks whether the map view contains the specified key |
| `Lookup(String)` | Returns the bound value at the specified key |
| `Size` | Number of elements in the binding map |

## Notes

- Namespace: `Windows.AI.MachineLearning` (legacy UWP API, superseded by `Microsoft.Windows.AI.MachineLearning`). See [Legacy Windows Machine Learning](./legacy-windows-machine-learning.md).
- Implements `IReadOnlyDictionary<string, object>` / `IMapView<String, Object>` — bindings can be enumerated and inspected like a dictionary.
- Thread-safe. On Windows Server, requires Windows Server 2019 with Desktop Experience.

## Related

- [LearningModelSession](./learning-model-session.md)
- [LearningModelEvaluationResult](./learning-model-evaluation-result.md)
