# mps

| Name | Description | Path |
| --- | --- | --- |
| mpskernel | MPSKernel base class, encode contract, MPSCommandBuffer, MPSSupportsMTLDevice, tuning hints | [mpskernel.md](./mpskernel.md) |
| mpsimage | MPSImage / MPSTemporaryImage / MPSImageDescriptor feature-channel textures | [mpsimage.md](./mpsimage.md) |
| image-filters | 55 MPSImage* filters (morphology / convolution / histogram / threshold / arithmetic / reduction) | [image-filters.md](./image-filters.md) |
| mpsmatrix | MPSMatrix / MPSMatrixDescriptor / MPSVector / MPSVectorDescriptor and their temporary variants | [mpsmatrix.md](./mpsmatrix.md) |
| matrix-arithmetic | MPSMatrixMultiplication / VectorMultiplication / Sum / FindTopK / Copy, plus matrix-shaped FullyConnected / Neuron / SoftMax / BatchNormalization | [matrix-arithmetic.md](./matrix-arithmetic.md) |
| matrix-decomposition-solve | Cholesky / LU decomposition and solve, MPSMatrixSolveTriangular, MPSMatrixDecompositionStatus | [matrix-decomposition-solve.md](./matrix-decomposition-solve.md) |
| mpsndarray | MPSNDArray / MPSNDArrayDescriptor and quantization descriptors | [mpsndarray.md](./mpsndarray.md) |
| mpsnngraph | MPSNNGraph node-based graph construction (MPSNNImageNode / MPSNNFilterNode) | [mpsnngraph.md](./mpsnngraph.md) |
| cnn-kernels | 113 MPSCNN*/MPSNN* layers (convolution / pooling / neuron / normalization / softmax / loss / optimizer) | [cnn-kernels.md](./cnn-kernels.md) |
| mpsgraph | MPSGraph core (placeholder, constant, run/runAsync/encode, MPSGraphDevice, MPSGraphExecutionDescriptor) | [mpsgraph.md](./mpsgraph.md) |
| mpsgraph-tensor | MPSGraphTensor / MPSGraphTensorData / MPSGraphOperation / MPSGraphShapedType | [mpsgraph-tensor.md](./mpsgraph-tensor.md) |
| mpsgraph-executable | MPSGraphExecutable / MPSGraphCompilationDescriptor / serialization / deployment target | [mpsgraph-executable.md](./mpsgraph-executable.md) |
| mpsgraph-operations | MPSGraph op families (arithmetic / convolution / RNN / FFT / random / sort・topK / control flow) | [mpsgraph-operations.md](./mpsgraph-operations.md) |
| ray-tracing | MPSRayIntersector / acceleration structures for GPU ray tracing | [ray-tracing.md](./ray-tracing.md) |
