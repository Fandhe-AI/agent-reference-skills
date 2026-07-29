# operator-api

| Name | Description | Path |
| --- | --- | --- |
| Overview | CUTLASS Operator API purpose, install, basic GEMM usage | [overview.md](./overview.md) |
| Tutorials | Index of Operator API tutorials | [tutorials.md](./tutorials.md) |
| Tutorial 000: Basic GEMM | GemmArguments, get_operators, supports/compile/run workflow | [tutorial-000-gemm.md](./tutorial-000-gemm.md) |
| Tutorial 001: GEMM with Fused Epilogue | EpilogueArguments, custom epilogue function contract | [tutorial-001-gemm-fused-epilogue.md](./tutorial-001-gemm-fused-epilogue.md) |
| Tutorial 002: Bring Your Own Kernel | CuteDslOperator subclassing, registration | [tutorial-002-bring-your-own-kernel.md](./tutorial-002-bring-your-own-kernel.md) |
| Tutorial 003: Host Latency Best Practices | Compiled artifacts, skip-supports, CUDA Graphs, TVM FFI | [tutorial-003-host-latency-best-practices.md](./tutorial-003-host-latency-best-practices.md) |
| Tutorial 004: Fake Tensors | Compile against FakeTensor, run against real tensors | [tutorial-004-fake-tensors.md](./tutorial-004-fake-tensors.md) |
| Tutorial 005: Grouped GEMM with Contiguous Offset | GroupedGemmArguments, offsets vector | [tutorial-005-grouped-gemm-contiguous-offset.md](./tutorial-005-grouped-gemm-contiguous-offset.md) |
| Tutorial 006: Block-Scaled GEMM (MXFP8) | ScaledOperand, ScaleMode, ScaleSwizzleMode | [tutorial-006-block-scaled-gemm.md](./tutorial-006-block-scaled-gemm.md) |
| API Reference | Index of the public cutlass.operators API reference | [api-reference.md](./api-reference.md) |
| API: Operator | Operator class, CompiledArtifact, Workspace, AllocationRequirement | [api-operator.md](./api-operator.md) |
| API: Arguments and Operands | RuntimeArguments, GemmArguments, GroupedGemmArguments, EpilogueArguments, ScaledOperand | [api-arguments.md](./api-arguments.md) |
| API: Kernel Discovery | get_operators, Manifest, TargetSm, ArchPortability | [api-discovery.md](./api-discovery.md) |
| API: Metadata | OperatorMetadata, OperandsMetadata, DesignMetadata, EpilogueMetadata, MmaInstruction | [api-metadata.md](./api-metadata.md) |
| API: Misc | Status, GlobalOptions | [api-misc.md](./api-misc.md) |
