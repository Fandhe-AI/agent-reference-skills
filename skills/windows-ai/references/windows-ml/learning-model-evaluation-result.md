# LearningModelEvaluationResult

Holds the results of a `LearningModelSession` evaluation (legacy Windows ML).

## Signature / Usage

```csharp
using Windows.AI.MachineLearning;

LearningModelEvaluationResult results = await session.EvaluateAsync(binding, "test");

if (results.Succeeded)
{
    var outputs = results.Outputs;
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `Succeeded` | `true` if the evaluation completed successfully; otherwise `false` |
| `Outputs` | The model's output feature values |
| `ErrorStatus` | If evaluation failed, an error code describing the failure |
| `CorrelationId` | The optional string passed to `LearningModelSession.Evaluate` / `EvaluateAsync` |

## Notes

- Namespace: `Windows.AI.MachineLearning` (legacy UWP API, superseded by `Microsoft.Windows.AI.MachineLearning`). See [Legacy Windows Machine Learning](./legacy-windows-machine-learning.md).
- Thread-safe. On Windows Server, requires Windows Server 2019 with Desktop Experience.

## Related

- [LearningModelSession](./learning-model-session.md)
- [LearningModelBinding](./learning-model-binding.md)
