# FAQs

## Signature / Usage

```bash
pip install nvidia-cutlass-dsl
```

## Options / Props

| Question | Answer |
| --- | --- |
| Are the DSLs replacing C++ templates? | No — CUTLASS 2.x and 3.x C++ APIs continue receiving fixes/updates for their supported architectures |
| CuTe DSL vs. CUTLASS Python vs. CUTLASS DSLs? | CUTLASS Python (deprecated) gave a Python interface to C++ kernels; CUTLASS DSLs is a family of native Python device-programming languages, with CuTe DSL as the first release |
| C++ or Python DSLs for newcomers? | Python DSLs recommended — CuTe C++ and CuTe DSL share a fully isomorphic programming model, so knowledge transfers |
| Where does the code live? | `pip install nvidia-cutlass-dsl`; GitHub is mainly for issues/PRs, not the primary distribution channel |
| Should I port existing C++ code to Python? | Almost certainly not, unless fast JIT compile times specifically matter — 2.x/3.x remain supported |
| Are portability promises different in the beta? | No portability promised during beta (DSL may change); post-beta breaking changes will be announced ahead of time |
| Supported architectures? | All NVIDIA GPU architectures from Ampere (SM80) onward |
| DL framework compatibility? | Yes — DLPack-supported tensor formats convert to `cute.Tensor` |
| Compiles to PTX or SASS? | Compiles to PTX, then uses the CUDA Toolkit's PTX compiler (`ptxas`) for SASS |
| Need NVCC or NVRTC? | No — the `nvidia-cutlass-dsl` wheel is self-contained |
| Debugging approach? | Compile-time/runtime printing, `cuda-gdb`, `compute-sanitizer` |
| Warp specialization in CuTe DSL? | Mirrors the C++ approach in Python syntax — see Control Flow docs and Blackwell kernel examples |
| Can I call functions across functions / use OOP? | Yes — function composition and class hierarchies are both used routinely |
| License | CuTe DSL components: NVIDIA Software EULA. Samples/notebooks: BSD 3-Clause |

## Related

- [Limitations](./limitations.md)
- [Overview](./overview.md)
