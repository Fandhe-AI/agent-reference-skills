# mpsgraph-operations

`MPSGraph`'s operation methods (390 instance methods on the class itself — there is no per-op API Collection) grouped into families. Each call appends a node to the graph and returns the resulting `MPSGraphTensor`(s); this table is a best-effort family-level index, not an exhaustive method list.

## Signature / Usage

```swift
let sorted = graph.sort(logits, axis: -1, descending: true, name: "sorted")
let top5 = graph.topK(logits, axis: -1, k: 5, name: "top5")
let spectrum = graph.realToHermiteanFFT(signal, axes: [1], descriptor: fftDescriptor, name: "fft")
```

## Options / Props

| Family | Representative methods | Description |
| --- | --- | --- |
| Elementwise arithmetic | `addition`, `subtraction`, `multiplication`, `division`, `power`, `absolute`, `clamp`, `bitwiseAND/OR/XOR/NOT` | Basic tensor arithmetic and bitwise ops |
| Convolution | `convolution2D`, `convolution3D`, `convolutionTranspose2D`, `depthwiseConvolution2D` (+ `*DataGradient`/`*WeightsGradient`) | Forward and gradient convolution ops, 2D/3D/transposed/depthwise |
| Pooling | `avgPooling2D`/`4D`, `maxPooling2D`/`4D`, `L2NormPooling4D` (+ `*Gradient`) | Spatial pooling ops |
| RNN / LSTM / GRU | `LSTM(_:recurrentWeight:...)`, `GRU(_:recurrentWeight:...)` (+ `*Gradients`) | Recurrent-layer ops taking an `MPSGraphLSTMDescriptor`/`MPSGraphGRUDescriptor` |
| FFT | `fastFourierTransform`, `realToHermiteanFFT`, `HermiteanToRealFFT` (via `MPSGraphFFTDescriptor`) | Fourier-transform ops |
| Random | `randomTensor(withShape:descriptor:...)`, `randomUniformTensor`, `randomPhiloxStateTensor` (via `MPSGraphRandomOpDescriptor`) | Stateless and stateful (Philox) random tensor generation |
| Sort / TopK | `sort`, `argSort`, `topK`, `bottomK` (+ `*Gradient`) | Sorting and k-selection ops along an axis |
| Cumulative | `cumulativeSum`, `cumulativeMaximum`, `cumulativeMinimum`, `cumulativeProduct` | Running reductions along an axis |
| Control flow | `if(_:then:else:name:)`, `while(initialInputs:before:after:name:)`, `for(numberOfIterations:initialBodyArguments:body:name:)`, `controlDependency(with:dependentBlock:name:)` | Graph-level branching, looping, and explicit dependency ordering |
| Matrix / linear algebra | `matrixMultiplication(primary:secondary:name:)`, `inverse(input:name:)`, `bandPart` | Batched matrix ops expressed as graph tensors |
| Normalization / training | `dropout(_:rate:name:)`, `adam(...)`, `applyStochasticGradientDescent(...)` | Training-time regularization and optimizer update ops |

## Notes

- `MPSGraph` exposes these as plain Swift methods on the graph instance rather than as an API Collection with its own topic page, so exhaustive per-method documentation is not practical here — this table groups the ~390 instance methods by functional family (arithmetic / convolution / pooling / RNN / FFT / random / sort·topK / control flow / linear algebra / training), verified against the live method list rather than fully enumerated.
- Gradient variants (`*Gradient`, `*Gradients`) exist for nearly every differentiable family and are used when building a training graph by hand instead of relying on `MPSGraph`'s automatic differentiation helpers.

## Related

- [mpsgraph](./mpsgraph.md)
- [mpsgraph-tensor](./mpsgraph-tensor.md)
- [cnn-kernels](./cnn-kernels.md)
