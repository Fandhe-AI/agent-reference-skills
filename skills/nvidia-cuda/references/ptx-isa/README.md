# ptx-isa

| Name | Description | Path |
| --- | --- | --- |
| introduction | What PTX is, its design goals, forward compatibility | [introduction.md](./introduction.md) |
| programming-model | SIMT model, thread/CTA/cluster/grid hierarchy | [programming-model.md](./programming-model.md) |
| machine-model | SIMT multiprocessor model, memory hierarchy, warps and divergence | [machine-model.md](./machine-model.md) |
| syntax | Source format, statements, lexical conventions, predication syntax | [syntax.md](./syntax.md) |
| state-spaces-types-variables | State spaces (.reg/.global/.shared/...), fundamental types, variable declaration | [state-spaces-types-variables.md](./state-spaces-types-variables.md) |
| instruction-operands | Operand kinds, addressing modes, vector operands, type conversion | [instruction-operands.md](./instruction-operands.md) |
| abi | Function calls, .func/.callprototype, .param passing, variadic functions, alloca | [abi.md](./abi.md) |
| memory-consistency-model | Scopes (.cta/.cluster/.gpu/.sys), morally strong ops, fence/acquire/release | [memory-consistency-model.md](./memory-consistency-model.md) |
| instruction-set-overview | Instruction description format, general syntax, predicated execution, divergence, semantics (9.1–9.6) | [instruction-set-overview.md](./instruction-set-overview.md) |
| instructions-arithmetic | Integer / Extended-Precision Integer / Floating-Point / Half Precision Floating-Point / Mixed Precision Floating-Point (9.7.1–9.7.5) | [instructions-arithmetic.md](./instructions-arithmetic.md) |
| instructions-comparison-logic | Comparison and Selection / Half Precision Comparison / Logic and Shift (9.7.6–9.7.8) | [instructions-comparison-logic.md](./instructions-comparison-logic.md) |
| instructions-data-movement | Data Movement and Conversion / Fabric (9.7.9–9.7.10) | [instructions-data-movement.md](./instructions-data-movement.md) |
| instructions-texture-surface | Texture / Surface (9.7.11–9.7.12) | [instructions-texture-surface.md](./instructions-texture-surface.md) |
| instructions-control-flow | Control Flow / Stack Manipulation (9.7.13, 9.7.18) | [instructions-control-flow.md](./instructions-control-flow.md) |
| instructions-sync-communication | Parallel Synchronization and Communication (9.7.14) | [instructions-sync-communication.md](./instructions-sync-communication.md) |
| instructions-matrix-multiply | Warp Level MMA / Async Warpgroup Level MMA / TensorCore 5th Generation Family (9.7.15–9.7.17) | [instructions-matrix-multiply.md](./instructions-matrix-multiply.md) |
| instructions-video-misc | Video / Miscellaneous Instructions (9.7.19–9.7.20) | [instructions-video-misc.md](./instructions-video-misc.md) |
| special-registers | %tid, %ntid, %ctaid, %laneid, %clock64, %lanemask_*, cluster registers | [special-registers.md](./special-registers.md) |
| directives | Module / kernel-function / performance-tuning / debugging / linking / cluster directives | [directives.md](./directives.md) |
| pragma-strings | .pragma string hints (nounroll, mma_throughput, etc.) | [pragma-strings.md](./pragma-strings.md) |
| release-notes | PTX ISA version history and CUDA / sm_ architecture correspondence | [release-notes.md](./release-notes.md) |
