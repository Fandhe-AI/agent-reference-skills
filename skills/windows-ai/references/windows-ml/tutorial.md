# Windows ML walkthrough

An end-to-end walkthrough of running the ResNet-50 image classification model with Windows ML: acquiring/converting the model, ensuring and registering execution providers, compiling the model for the selected EP, running inference, and post-processing results.

## Signature / Usage

```csharp
// 1. Register EPs
EnvironmentCreationOptions envOptions = new()
{
    logId = "ResnetDemo",
    logLevel = OrtLoggingLevel.ORT_LOGGING_LEVEL_ERROR
};
OrtEnv ortEnv = OrtEnv.CreateInstanceWithOptions(ref envOptions);
var catalog = Microsoft.Windows.AI.MachineLearning.ExecutionProviderCatalog.GetDefault();
await catalog.EnsureAndRegisterCertifiedAsync();

var sessionOptions = new SessionOptions();
sessionOptions.SetEpSelectionPolicy(ExecutionProviderDevicePolicy.MIN_OVERALL_POWER);

// 2. Compile the model once, cache the compiled version (see full page for logic)

// 3. Run inference
using var session = new InferenceSession(modelPathToUse, sessionOptions);
var inputTensor = new DenseTensor<float>(input.ToArray(), new[] { 1, 3, 224, 224 }, false);
var inputs = new List<NamedOnnxValue> { NamedOnnxValue.CreateFromTensor(session.InputMetadata.First().Key, inputTensor) };
var results = session.Run(inputs);
// 4. Post-process: apply softmax to results, print top-5 labels
```

## Notes

- The ResNet-50 model is acquired from Hugging Face and converted to QDQ ONNX format using the Foundry Toolkit.
- Model compilation against the selected EP is a one-time step; the compiled model is cached locally and reused on subsequent runs for faster inference.
- Full runnable samples (C#, C++/WinRT, Python) are in the `WindowsML` folder of the `WindowsAppSDK-Samples` GitHub repository.

## Related

- [Get started with Windows ML](./get-started.md)
- [API reference](./api-reference.md)
- [Samples](./samples.md)
