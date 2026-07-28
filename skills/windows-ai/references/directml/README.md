# DirectML

| Name | Description | Path |
|------|-------------|------|
| DirectML Overview | Architecture overview, Direct3D 12 relationship, layer-by-layer vs graph workflows | [directml-overview.md](./directml-overview.md) |
| DMLCreateDevice / IDMLDevice | Device creation function and root device interface | [dmlcreatedevice.md](./dmlcreatedevice.md) |
| IDMLOperator / DML_OPERATOR_DESC | Uncompiled operator interface and generic operator descriptor container | [idmloperator.md](./idmloperator.md) |
| IDMLCompiledOperator | Compiled, GPU-dispatchable form of an operator or graph | [idmlcompiledoperator.md](./idmlcompiledoperator.md) |
| IDMLOperatorInitializer | Object used to initialize one or more compiled operators | [idmloperatorinitializer.md](./idmloperatorinitializer.md) |
| IDMLBindingTable / DML_BINDING_DESC | Resource binding table and generic binding descriptor | [idmlbindingtable.md](./idmlbindingtable.md) |
| IDMLCommandRecorder | Records DirectML dispatches into a Direct3D 12 command list | [idmlcommandrecorder.md](./idmlcommandrecorder.md) |
| Tensors (DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC) | Tensor descriptors and buffer-backed tensor layout, strides, sizing | [tensors.md](./tensors.md) |
| Key operators | Convolution, GEMM, ReLU activation operator descriptors | [operators.md](./operators.md) |
| DML_GRAPH_DESC / IDMLDevice1::CompileGraph | Graph-based operator compilation | [graphs.md](./graphs.md) |
| ONNX Runtime DirectML execution provider | Using DirectML via ONNX Runtime session options | [onnxruntime-directml.md](./onnxruntime-directml.md) |
| PyTorch with DirectML | `torch-directml` package installation and device usage | [pytorch-directml.md](./pytorch-directml.md) |
| DirectML version history | Version/feature-level table, `DML_TARGET_VERSION`, hardware requirements | [version-history.md](./version-history.md) |
