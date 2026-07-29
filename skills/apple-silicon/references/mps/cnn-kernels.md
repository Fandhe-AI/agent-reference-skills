# cnn-kernels

The "Convolutional Neural Network Kernels" API Collection: 113 `MPSCNN*`/`MPSNN*` classes forming the node-based CNN layer set consumed by `MPSNNGraph` (or used standalone as individual `MPSKernel` subclasses).

## Signature / Usage

```swift
let conv = MPSCNNConvolution(device: device, convolutionDescriptor: convDescriptor,
                              kernelWeights: weightsPtr, biasTerms: biasPtr, flags: .none)
conv.encode(commandBuffer: commandBuffer, sourceImage: input, destinationImage: output)
```

## Options / Props

| Name | Family | Description |
| --- | --- | --- |
| `MPSCNNAdd` | Arithmetic | Per-element addition of two feature maps |
| `MPSCNNAddGradient` | Arithmetic | Backward pass for `MPSCNNAdd` |
| `MPSCNNSubtract` | Arithmetic | Per-element subtraction of two feature maps |
| `MPSCNNSubtractGradient` | Arithmetic | Backward pass for `MPSCNNSubtract` |
| `MPSCNNMultiply` | Arithmetic | Per-element multiplication of two feature maps |
| `MPSCNNMultiplyGradient` | Arithmetic | Backward pass for `MPSCNNMultiply` |
| `MPSCNNDivide` | Arithmetic | Per-element division of two feature maps |
| `MPSCNNArithmetic` | Arithmetic | Base class shared by the binary arithmetic layers |
| `MPSCNNArithmeticGradient` | Arithmetic | Base gradient class shared by the arithmetic layers |
| `MPSCNNArithmeticGradientState` | Arithmetic | State passed from forward arithmetic pass to its gradient |
| `MPSCNNBinaryConvolution` | Convolution | Binary-weight convolution |
| `MPSCNNConvolution` | Convolution | Standard 2D convolution |
| `MPSCNNDepthWiseConvolutionDescriptor` | Convolution | Descriptor configuring depth-wise convolution |
| `MPSCNNSubPixelConvolutionDescriptor` | Convolution | Descriptor configuring sub-pixel (pixel-shuffle) convolution |
| `MPSCNNConvolutionTranspose` | Convolution | Transposed (deconvolution) layer |
| `MPSCNNConvolutionGradient` | Convolution | Backward pass for `MPSCNNConvolution` |
| `MPSCNNConvolutionGradientState` | Convolution | State passed from forward convolution to its gradient |
| `MPSImageSizeEncodingState` | Convolution | Encodes output size for shape-inferring gradient passes |
| `MPSCNNConvolutionWeightsAndBiasesState` | Convolution | GPU-resident weights/biases state used for updates during training |
| `MPSCNNPoolingAverage` | Pooling | Average pooling |
| `MPSCNNPoolingAverageGradient` | Pooling | Backward pass for average pooling |
| `MPSCNNPoolingL2Norm` | Pooling | L2-norm pooling |
| `MPSCNNPoolingMax` | Pooling | Max pooling |
| `MPSCNNDilatedPoolingMax` | Pooling | Dilated (atrous) max pooling |
| `MPSCNNPooling` | Pooling | Base class shared by the pooling layers |
| `MPSCNNPoolingGradient` | Pooling | Base gradient class shared by the pooling layers |
| `MPSCNNDilatedPoolingMaxGradient` | Pooling | Backward pass for dilated max pooling |
| `MPSCNNPoolingL2NormGradient` | Pooling | Backward pass for L2-norm pooling |
| `MPSCNNPoolingMaxGradient` | Pooling | Backward pass for max pooling |
| `MPSCNNBinaryFullyConnected` | Fully connected | Binary-weight dense layer |
| `MPSCNNFullyConnected` | Fully connected | Standard dense layer over feature channels |
| `MPSCNNFullyConnectedGradient` | Fully connected | Backward pass for `MPSCNNFullyConnected` |
| `MPSCNNNeuronAbsolute` | Neuron | Absolute-value activation |
| `MPSCNNNeuronELU` | Neuron | Exponential linear unit activation |
| `MPSCNNNeuronHardSigmoid` | Neuron | Hard-sigmoid activation |
| `MPSCNNNeuronLinear` | Neuron | Linear (scale + bias) activation |
| `MPSCNNNeuronPReLU` | Neuron | Parametric ReLU activation |
| `MPSCNNNeuronReLUN` | Neuron | ReLU clamped to N (e.g. ReLU6) |
| `MPSCNNNeuronReLU` | Neuron | Rectified linear unit activation |
| `MPSCNNNeuronSigmoid` | Neuron | Sigmoid activation |
| `MPSCNNNeuronSoftPlus` | Neuron | Softplus activation |
| `MPSCNNNeuronSoftSign` | Neuron | Softsign activation |
| `MPSCNNNeuronTanH` | Neuron | Hyperbolic-tangent activation |
| `MPSCNNNeuron` | Neuron | Base class shared by the activation layers |
| `MPSCNNNeuronExponential` | Neuron | Exponential activation |
| `MPSCNNNeuronGradient` | Neuron | Base gradient class shared by the activation layers |
| `MPSCNNNeuronLogarithm` | Neuron | Logarithm activation |
| `MPSCNNNeuronPower` | Neuron | Power-function activation |
| `MPSNNNeuronDescriptor` | Neuron | Describes an activation to attach to another layer (e.g. fused into convolution) |
| `MPSCNNSoftMax` | Softmax | Softmax normalization |
| `MPSCNNLogSoftMax` | Softmax | Log-softmax normalization |
| `MPSCNNLogSoftMaxGradient` | Softmax | Backward pass for log-softmax |
| `MPSCNNSoftMaxGradient` | Softmax | Backward pass for softmax |
| `MPSCNNCrossChannelNormalization` | Normalization | Local response normalization across channels |
| `MPSCNNCrossChannelNormalizationGradient` | Normalization | Backward pass for cross-channel normalization |
| `MPSCNNLocalContrastNormalization` | Normalization | Local contrast normalization |
| `MPSCNNLocalContrastNormalizationGradient` | Normalization | Backward pass for local contrast normalization |
| `MPSCNNSpatialNormalization` | Normalization | Spatial (within-channel) normalization |
| `MPSCNNSpatialNormalizationGradient` | Normalization | Backward pass for spatial normalization |
| `MPSCNNBatchNormalization` | Normalization | Batch normalization using precomputed statistics |
| `MPSCNNBatchNormalizationGradient` | Normalization | Backward pass for batch normalization |
| `MPSCNNBatchNormalizationState` | Normalization | GPU-resident batch-norm parameters/state |
| `MPSCNNNormalizationMeanAndVarianceState` | Normalization | Mean/variance state shared across normalization layers |
| `MPSCNNBatchNormalizationStatistics` | Normalization | Computes per-batch mean/variance statistics |
| `MPSCNNBatchNormalizationStatisticsGradient` | Normalization | Backward pass for batch statistics |
| `MPSCNNInstanceNormalization` | Normalization | Per-instance normalization |
| `MPSCNNInstanceNormalizationGradient` | Normalization | Backward pass for instance normalization |
| `MPSCNNInstanceNormalizationGradientState` | Normalization | State passed from forward instance-norm to its gradient |
| `MPSCNNNormalizationGammaAndBetaState` | Normalization | Learnable scale/shift (gamma/beta) state shared across normalization layers |
| `MPSCNNUpsampling` | Upsampling | Base class shared by the upsampling layers |
| `MPSCNNUpsamplingBilinear` | Upsampling | Bilinear upsampling |
| `MPSCNNUpsamplingNearest` | Upsampling | Nearest-neighbor upsampling |
| `MPSCNNUpsamplingBilinearGradient` | Upsampling | Backward pass for bilinear upsampling |
| `MPSCNNUpsamplingGradient` | Upsampling | Base gradient class shared by the upsampling layers |
| `MPSCNNUpsamplingNearestGradient` | Upsampling | Backward pass for nearest-neighbor upsampling |
| `MPSCNNDropout` | Dropout | Stochastic feature-map dropout for training |
| `MPSCNNDropoutGradient` | Dropout | Backward pass for dropout |
| `MPSCNNDropoutGradientState` | Dropout | State passed from forward dropout to its gradient |
| `MPSCNNLoss` | Loss | Generic training loss layer |
| `MPSCNNLossDataDescriptor` | Loss | Describes label/weight data fed to a loss layer |
| `MPSCNNLossDescriptor` | Loss | Configures the loss function used by `MPSCNNLoss` |
| `MPSCNNLossLabels` | Loss | GPU-resident label buffer for a loss layer |
| `MPSCNNYOLOLoss` | Loss | YOLO object-detection loss |
| `MPSCNNYOLOLossDescriptor` | Loss | Configures `MPSCNNYOLOLoss` |
| `MPSNNReduceRowMax` | Reduction | Row-wise max reduction |
| `MPSNNReduceRowMin` | Reduction | Row-wise min reduction |
| `MPSNNReduceRowSum` | Reduction | Row-wise sum reduction |
| `MPSNNReduceRowMean` | Reduction | Row-wise mean reduction |
| `MPSNNReduceColumnMax` | Reduction | Column-wise max reduction |
| `MPSNNReduceColumnMin` | Reduction | Column-wise min reduction |
| `MPSNNReduceColumnSum` | Reduction | Column-wise sum reduction |
| `MPSNNReduceColumnMean` | Reduction | Column-wise mean reduction |
| `MPSNNReduceFeatureChannelsMax` | Reduction | Max reduction across feature channels |
| `MPSNNReduceFeatureChannelsMin` | Reduction | Min reduction across feature channels |
| `MPSNNReduceFeatureChannelsSum` | Reduction | Sum reduction across feature channels |
| `MPSNNReduceFeatureChannelsMean` | Reduction | Mean reduction across feature channels |
| `MPSNNReduceFeatureChannelsArgumentMax` | Reduction | Argmax index across feature channels |
| `MPSNNReduceFeatureChannelsArgumentMin` | Reduction | Argmin index across feature channels |
| `MPSNNReduceFeatureChannelsAndWeightsSum` | Reduction | Weighted sum reduction across feature channels |
| `MPSNNReduceFeatureChannelsAndWeightsMean` | Reduction | Weighted mean reduction across feature channels |
| `MPSNNReduceUnary` | Reduction | Base class shared by the single-source reduction layers |
| `MPSNNReduceBinary` | Reduction | Base class shared by the two-source (weighted) reduction layers |
| `MPSNNReshape` | Reshape | Reshapes a feature map's dimensions |
| `MPSNNReshapeGradient` | Reshape | Backward pass for reshape |
| `MPSNNSlice` | Slice | Slices a sub-region of channels/spatial extent |
| `MPSNNOptimizerAdam` | Optimization | Adam weight-update kernel |
| `MPSNNOptimizerRMSProp` | Optimization | RMSProp weight-update kernel |
| `MPSNNOptimizerStochasticGradientDescent` | Optimization | SGD weight-update kernel |
| `MPSNNOptimizer` | Optimization | Base class shared by the optimizer kernels |
| `MPSNNOptimizerDescriptor` | Optimization | Configures learning rate / regularization shared across optimizers |
| `MPSCNNKernel` | Base classes | Base class shared by all CNN image-to-image kernels |
| `MPSCNNBinaryKernel` | Base classes | Base class shared by the two-source CNN kernels |
| `MPSCNNGradientKernel` | Base classes | Base class shared by all CNN gradient (backward-pass) kernels |
| `MPSNNDefaultPadding` | Base classes | Default padding policy applied when a layer's descriptor does not specify one |

## Notes

- This table enumerates all 113 symbols from the official "Convolutional Neural Network Kernels" API Collection (per `reference-template.md`'s table requirement); consult each class's own DocC page for exact initializer parameters.
- Every layer with training support ships a `*Gradient` (and often `*GradientState`) counterpart for backpropagation, encoded in reverse order from the forward pass.
- This is a lower-level, node-composable layer distinct from Core ML's model-execution API (apple-ml skill); `cnn-kernels` classes are assembled manually or via `MPSNNGraph`, not loaded from a `.mlmodel` file.

## Related

- [mpsnngraph](./mpsnngraph.md)
- [MPSImage](./mpsimage.md)
- [mpsgraph-operations](./mpsgraph-operations.md)
