# MPSGraph Training Loop Step

Wire up placeholders, trainable variables, a loss, its gradients, and SGD update ops into a single graph, then encode one training step per batch with double buffering.

```swift
import MetalPerformanceShaders
import MetalPerformanceShadersGraph

let graph = MPSGraph()

let sourcePlaceholderTensor = graph.placeholder(
    shape: [batchSize as NSNumber, MNISTSize * MNISTSize as NSNumber], name: nil)
let labelsPlaceholderTensor = graph.placeholder(
    shape: [batchSize as NSNumber, MNISTNumClasses as NSNumber], name: nil)

var variableTensors = [MPSGraphTensor]()
// ... build the forward pass (convolutions, fully connected layers, ...),
// appending every trainable weight/bias to variableTensors as it's created ...
let logitsTensor = /* forward pass output */ sourcePlaceholderTensor

let lossTensor = graph.softMaxCrossEntropy(
    logitsTensor,
    labels: labelsPlaceholderTensor,
    axis: -1,
    reuctionType: .sum,
    name: nil)
let batchSizeTensor = graph.constant(Double(batchSize), shape: [1], dataType: .float32)
let lossMeanTensor = graph.division(lossTensor, batchSizeTensor, name: nil)

// gradients(of:with:) differentiates the loss with respect to every
// trainable variable in one call; stochasticGradientDescent + assign
// turn each gradient into an in-place parameter update op.
let gradTensors = graph.gradients(of: lossMeanTensor, with: variableTensors, name: nil)
let lambdaTensor = graph.constant(learningRate, shape: [1], dataType: .float32)

var updateOps: [MPSGraphOperation] = []
for (variable, gradient) in gradTensors {
    let updateTensor = graph.stochasticGradientDescent(
        learningRate: lambdaTensor,
        values: variable,
        gradient: gradient,
        name: nil)
    updateOps.append(graph.assign(variable, tensor: updateTensor, name: nil))
}

// Double buffering: at most two training batches are in flight, so the
// CPU can prepare batch N+1 while the GPU still runs batch N.
let doubleBufferingSemaphore = DispatchSemaphore(value: 2)

func encodeTrainingBatch(commandBuffer: MPSCommandBuffer,
                         sourceTensorData: MPSGraphTensorData,
                         labelsTensorData: MPSGraphTensorData,
                         completion: ((Float) -> Void)?) -> MPSGraphTensorData {
    doubleBufferingSemaphore.wait()

    let executionDesc = MPSGraphExecutionDescriptor()
    executionDesc.completionHandler = { resultsDictionary, _ in
        var loss: Float = 0
        let lossTensorData = resultsDictionary[lossMeanTensor]!
        lossTensorData.mpsndarray().readBytes(&loss, strideBytes: nil)

        doubleBufferingSemaphore.signal()

        if let completion = completion {
            DispatchQueue.main.async { completion(loss) }
        }
    }

    let feed = [sourcePlaceholderTensor: sourceTensorData,
               labelsPlaceholderTensor: labelsTensorData]

    // encode(to:) records this step's ops onto an already-open command
    // buffer, rather than committing its own like run(with:) does.
    let fetch = graph.encode(to: commandBuffer,
                             feeds: feed,
                             targetTensors: [lossMeanTensor],
                             targetOperations: updateOps,
                             executionDescriptor: executionDesc)

    return fetch[lossMeanTensor]!
}
```

## Notes

- MPSGraph is a GPU compute graph API, not the Core ML model runtime covered by the separate apple-ml skill.
- `targetOperations: updateOps` is what makes this a training step and not just a forward pass: the `assign` ops mutate every variable tensor in place, so the next call to `encodeTrainingBatch` sees updated weights.
- The completion handler runs after the GPU finishes the batch; it reads the loss back and only then signals the semaphore, which is what caps in-flight batches at two.
- Derived from the official Apple sample "Training a neural network using MPSGraph" (distributed under the Apple Sample Code License, not MIT), archive published/a81b46b0b0e0 (`MPSGraphClassifier/MNISTClassifierGraph.swift`).
