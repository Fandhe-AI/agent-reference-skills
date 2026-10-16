# Integrating on-device AI models in your app with Core AI

Power your app's intelligent features with an on-device AI model. Start from a `.aimodel` file, load it as `AIModel`, load an `InferenceFunction`, and run it with `NDArray` or pixel buffer inputs.

## Signature / Usage

```swift
import CoreAI

// Specialize the model for this device and load it.
let model = try await AIModel(contentsOf: urlOfModel)

// Load a function from the model.
guard let function = try model.loadFunction(named: "main") else {
    // Handle case where expected function is not found.
}

// Create an `NDArray` that matches the expected type and shape.
var input = NDArray(shape: [3, 4], scalarType: .float32)

// Access a mutable view to write data into the array.
var mutableView = input.mutableView(as: Float.self)
guard let elements = mutableView.contiguousElements else {
    // Handle non-contiguous memory layout.
}
writeInputData(into: elements)

// Run the function with the `NDArray` input.
var outputs = try await function.run(inputs: ["input": input])

// Extract the returned output.
guard let predictionValue = outputs.remove("prediction") else {
    // Handle output not found.
}
guard let prediction = predictionValue.ndArray else {
    // Handle output of unexpected type of value.
}
processOutput(prediction.view())
```

Image inputs and outputs use `CVMutablePixelBuffer`:

```swift
guard let inputDescriptor = function.descriptor.inputDescriptor(of: "image"),
      case .image(let imageDescriptor) = inputDescriptor else {
    // Handle a missing or unexpected input.
}

var inputs = InferenceFunction.Inputs()
inputs.insert(pixelBuffer, for: "image")
var outputs = try await function.run(inputs: inputs)

guard let outputValue = outputs.remove("result"),
      let resultBuffer = outputValue.pixelBuffer else {
    // Handle a missing output, or an output that isn't an image.
}
```

## Notes

- Availability: Core AI is iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+ (as listed for the Core AI types in the source docs).
- Inference happens on device: data stays private, features work offline, and there is no per-inference cost.
- A `.aimodel` file is either converted with the Core AI PyTorch Extensions Python package (`https://apple.github.io/coreai-torch`) or already prepared in the correct format. It should contain one or more inference functions.
- Model choice: compare candidate models with the Evaluations framework (`Evaluating a Core AI model` sample); comparison does not require matching input or output shapes.
- Add the `.aimodel` to an Xcode target (drag into Project Navigator or File > Add Files). The model then appears in the Compile Sources build phase. The file can also be downloaded over the network.
- Metal Toolchain is required (not installed by default). Get it via Xcode > Settings > Components > Other Components, or via the Get button shown when selecting an `.aimodel` file. Without it, builds that include `.aimodel` files fail with a missing Metal compiler error.
- The Xcode model viewer's General tab shows size (parameters, on-disk storage), metadata (editable inline), compute vs storage numeric types, and operation distribution; the Functions tab shows each function's signature. A question mark in an `NDArray` dimension means the dimension is dynamic.
- `AIModel(contentsOf:options:)` is asynchronous because specialization must complete first and can take significant time for large models. `loadFunction(named:)` prepares resources and can also be expensive; it throws on load failure and returns `nil` when no function has that name. Check `functionNames` for models with multiple functions.
- The same inference function can be called safely from different tasks to process multiple inputs simultaneously.
- Language models can also be run through `LanguageModelSession` (Foundation Models); see the "Running a Core AI model in a Foundation Models session" article.
- `NDArray` is read-only by default: write via `mutableView(as:)`, read via `view()`. Swift enforces this at compile time.
- For images, `ImageDescriptor.width` / `height` of `-1` indicates a dynamic dimension; `pixelFormatType` is an `OSType` comparable to Core Video format constants.
- Boundary with Core ML model format (`.mlmodel` / `.mlpackage`) is not confirmed in the source; this page does not state one.
- Source: https://developer.apple.com/documentation/coreai/integrating-on-device-ai-models-in-your-app-with-core-ai

## Related

- [AIModel](./aimodel.md)
- [InferenceFunction](./inferencefunction.md)
- [InferenceFunctionDescriptor](./inferencefunctiondescriptor.md)
- [NDArray](./ndarray.md)
- [InferenceValue](./inferencevalue.md)
- [ImageDescriptor](./imagedescriptor.md)
- [Managing model specialization and caching](./managing-model-specialization-and-caching.md)
