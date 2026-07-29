# Introduction

## Signature / Usage

```cuda
// Minimal CUDA kernel definition and launch, illustrating the "write CUDA
// kernels directly in a high-level language such as C++" approach.
__global__ void addOne(int *data) {
    int i = threadIdx.x;
    data[i] += 1;
}

int main() {
    addOne<<<1, 256>>>(data); // launch 256 threads on the GPU
}
```

## Notes

- Distinct from `ptx-isa/introduction.md`: this page introduces CUDA/GPU computing at the platform level; the PTX ISA page introduces the PTX virtual ISA specifically.
- The GPU (Graphics Processing Unit) started as fixed-function hardware for real-time 3D rendering. GPUs became increasingly programmable over successive generations, and by 2003 certain graphics pipeline stages became fully programmable.
- In 2006, NVIDIA introduced CUDA (Compute Unified Device Architecture) to let any computational workload use GPU throughput independent of graphics APIs. CUDA and GPU computing since then have accelerated scientific simulation (fluid dynamics, energy transport), business applications (databases, analytics), and AI (image classification, diffusion models, large language models).
- A GPU provides much higher instruction throughput and memory bandwidth than a CPU within a similar price and power envelope. A CPU is designed to execute a serial sequence of operations (a thread) as fast as possible and runs a few tens of threads in parallel; a GPU is designed to execute thousands of threads in parallel, trading lower single-thread performance for much greater total throughput. GPUs devote more transistors to data processing units, while CPUs dedicate more transistors to data caching and flow control.
- Multiple approaches exist for leveraging GPU compute power beyond writing CUDA kernels directly in a high-level language such as C++:
  - Specialized libraries such as cuBLAS, cuFFT, cuDNN, and CUTLASS, each optimized per GPU architecture, balancing productivity, performance, and portability.
  - AI frameworks that frequently offer GPU-accelerated components, often built on the specialized libraries above.
  - Domain-specific languages (DSLs) such as NVIDIA's Warp or OpenAI's Triton, which compile to run directly on the CUDA platform and provide a higher-level GPU programming abstraction than conventional high-level languages.
  - The [NVIDIA Accelerated Computing Hub](https://github.com/NVIDIA/accelerated-computing-hub) contains resources, examples, and tutorials for GPU and CUDA computing.
- Document version: CUDA Programming Guide v13.3 (`https://docs.nvidia.com/cuda/cuda-programming-guide/`).
- Scope boundary with the `dgx-spark` skill: GB10-based hardware, DGX OS, and operational playbooks are covered by the `dgx-spark` skill's hardware / software categories. This `nvidia-cuda` skill covers CUDA the programming model and how to write CUDA C++ / Python code, independent of any specific hardware SKU.

## Related

- [Programming Model](./programming-model.md)
- [The CUDA platform](./cuda-platform.md)
