# matrix-arithmetic

Matrix Arithmetic, Copying, Neural Network, Softmax, and Normalization Operations from the "Matrices and Vectors" API Collection: GEMM-style multiplication, vector products, buffer/image copy kernels, and the matrix-shaped counterparts of the CNN fully-connected/neuron/softmax/batch-norm layers — all `MPSKernel` subclasses encoded onto a command buffer.

## Signature / Usage

```swift
let mul = MPSMatrixMultiplication(device: device,
                                   transposeLeft: false, transposeRight: false,
                                   resultRows: m, resultColumns: n, interiorColumns: k,
                                   alpha: 1.0, beta: 0.0)
mul.encode(commandBuffer: commandBuffer, leftMatrix: a, rightMatrix: b, resultMatrix: c)
```

## Options / Props

| Name | Category | Description |
| --- | --- | --- |
| `MPSMatrixMultiplication` | Arithmetic | GEMM: `C = alpha * A * B + beta * C`, with optional transpose |
| `MPSMatrixVectorMultiplication` | Arithmetic | Matrix-vector product (GEMV) |
| `MPSMatrixSum` | Arithmetic | Weighted sum of multiple matrices |
| `MPSMatrixFindTopK` | Arithmetic | Finds the top-K values/indices per row |
| `MPSMatrixCopy` | Copying | Copies regions between matrices |
| `MPSMatrixCopyDescriptor` | Copying | Describes per-region copy parameters for `MPSMatrixCopy` |
| `MPSMatrixCopyToImage` | Copying | Converts an `MPSMatrix` into an `MPSImage` |
| `MPSImageCopyToMatrix` | Copying | Converts an `MPSImage` into an `MPSMatrix` |
| `MPSMatrixFullyConnected` | Neural network | Dense (fully-connected) layer expressed as a matrix operation |
| `MPSMatrixFullyConnectedGradient` | Neural network | Backward pass for `MPSMatrixFullyConnected` |
| `MPSMatrixNeuron` | Neural network | Activation function applied to a matrix |
| `MPSMatrixNeuronGradient` | Neural network | Backward pass for `MPSMatrixNeuron` |
| `MPSMatrixSoftMax` | Softmax | Softmax normalization over a matrix |
| `MPSMatrixSoftMaxGradient` | Softmax | Backward pass for `MPSMatrixSoftMax` |
| `MPSMatrixLogSoftMax` | Softmax | Log-softmax normalization over a matrix |
| `MPSMatrixLogSoftMaxGradient` | Softmax | Backward pass for `MPSMatrixLogSoftMax` |
| `MPSMatrixBatchNormalization` | Normalization | Batch normalization over a matrix |
| `MPSMatrixBatchNormalizationGradient` | Normalization | Backward pass for `MPSMatrixBatchNormalization` |

## Notes

- `alpha`/`beta` follow BLAS GEMM convention; `transposeLeft`/`transposeRight` avoid a separate transpose pass.
- `MPSMatrixCopyToImage`/`MPSImageCopyToMatrix` are the bridge used when feeding CNN feature maps (`MPSImage`) into matrix routines and back.
- The Neural Network / Softmax / Normalization families mirror `cnn-kernels`' `MPSCNNFullyConnected`/`MPSCNNNeuron*`/`MPSCNNSoftMax`/`MPSCNNBatchNormalization` layers, but operate on `MPSMatrix` inputs instead of `MPSImage` feature maps — use whichever matches how the data is already laid out in the pipeline.

## Related

- [MPSMatrix](./mpsmatrix.md)
- [matrix-decomposition-solve](./matrix-decomposition-solve.md)
- [mpsndarray](./mpsndarray.md)
