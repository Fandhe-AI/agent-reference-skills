# MPSGraph Matrix Multiplication

Build a small graph with placeholders and variables, connect them with `matrixMultiplication`, and execute it against a command buffer with `MPSGraphTensorData`.

```swift
import MetalPerformanceShaders
import MetalPerformanceShadersGraph

func getRandomData(numValues: UInt, minimum: Float, maximum: Float) -> [Float] {
    return (1...numValues).map { _ in Float.random(in: minimum..<maximum) }
}

let graph = MPSGraph()

// A placeholder is fed a new MPSGraphTensorData every time the graph runs;
// a variable is graph-owned state that persists (and can be trained) across runs.
let sourcePlaceholderTensor = graph.placeholder(
    shape: [batchSize as NSNumber, inputFeatures as NSNumber],
    name: nil)

let weightCount = inputFeatures * outputFeatures
let weightsValues = getRandomData(numValues: UInt(weightCount), minimum: -0.2, maximum: 0.2)
let weights = graph.variable(
    with: Data(bytes: weightsValues, count: weightCount * 4),
    shape: [inputFeatures as NSNumber, outputFeatures as NSNumber],
    dataType: .float32,
    name: nil)

let biasesValues = [Float](repeating: 0.1, count: outputFeatures)
let biases = graph.variable(
    with: Data(bytes: biasesValues, count: outputFeatures * 4),
    shape: [outputFeatures as NSNumber],
    dataType: .float32,
    name: nil)

// matrixMultiplication takes the graph's current placeholder/variable
// tensors and returns a new tensor node; no computation happens yet.
let productTensor = graph.matrixMultiplication(
    primary: sourcePlaceholderTensor,
    secondary: weights,
    name: nil)
let resultTensor = graph.addition(productTensor, biases, name: nil)

// Wrap host data in MPSGraphTensorData and feed it against the
// placeholder to actually run the graph on the GPU.
let inputData = MPSGraphTensorData(
    MPSNDArray(device: device, descriptor: inputDescriptor))

let results = graph.run(
    with: commandQueue,
    feeds: [sourcePlaceholderTensor: inputData],
    targetTensors: [resultTensor],
    targetOperations: nil)

let outputTensorData = results[resultTensor]!
var output = [Float](repeating: 0, count: batchSize * outputFeatures)
outputTensorData.mpsndarray().readBytes(&output, strideBytes: nil)
```

## Notes

- MPSGraph is a GPU compute graph API, not the Core ML model runtime covered by the separate apple-ml skill.
- `graph.run(with:feeds:targetTensors:targetOperations:)` is the synchronous, blocking form; `graph.encode(to:feeds:targetTensors:targetOperations:executionDescriptor:)` (used for training below) enqueues onto an existing `MPSCommandBuffer` instead.
- The declaration-only `MPSMatrixMultiplication` / `MPSMatrix` API has no accompanying official code example, so it is intentionally not used here — this sample uses the MPSGraph path, which does.
- Derived from the official Apple sample "Training a neural network using MPSGraph" (distributed under the Apple Sample Code License, not MIT), archive published/a81b46b0b0e0 (`MPSGraphClassifier/MNISTClassifierGraph.swift`, the `addFullyConnectedLayer` helper's use of `graph.matrixMultiplication`).
