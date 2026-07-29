# HIPRTC Runtime Compilation

Compile a kernel from source text at runtime with `hiprtcCreateProgram`/`hiprtcCompileProgram`, targeting the current device's architecture, then load the resulting code into a module and launch it.

```cpp
#include <hip/hiprtc.h>
#include <hip/hip_runtime.h>
#include <cstdlib>
#include <iostream>
#include <string>
#include <vector>

int main()
{
    // Kernel source supplied as a string, with its own headers.
    static constexpr auto saxpy_kernel = R"(
extern "C" __global__ void saxpy_kernel(const float a, const float* d_x, float* d_y, const unsigned int size)
{
    const unsigned int global_idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (global_idx < size) {
        d_y[global_idx] = a * d_x[global_idx] + d_y[global_idx];
    }
}
)";

    hiprtcProgram prog;
    hiprtcCreateProgram(&prog, saxpy_kernel, "saxpy_kernel.cu", 0, nullptr, nullptr);

    // Pass the current device's architecture so hiprtc generates code
    // that matches the hardware it will actually run on.
    hipDeviceProp_t props;
    hipGetDeviceProperties(&props, 0);
    std::vector<const char*> options;
    std::string arch_option;
    if (props.gcnArchName[0]) {
        arch_option = std::string("--gpu-architecture=") + props.gcnArchName;
        options.push_back(arch_option.c_str());
    }

    hiprtcResult compile_result = hiprtcCompileProgram(prog, static_cast<int>(options.size()), options.data());

    size_t log_size = 0;
    hiprtcGetProgramLogSize(prog, &log_size);
    if (log_size) {
        std::string log(log_size, '\0');
        hiprtcGetProgramLog(prog, &log[0]);
        // Always print the compile log, even on success; it may contain warnings.
        std::cerr << log << '\n';
    }
    if (compile_result != HIPRTC_SUCCESS) {
        return EXIT_FAILURE;
    }

    size_t code_size = 0;
    hiprtcGetCodeSize(prog, &code_size);
    std::vector<char> code(code_size);
    hiprtcGetCode(prog, code.data());
    hiprtcDestroyProgram(&prog);

    // Load the compiled code object into a module and resolve the kernel
    // function by its (unmangled, thanks to extern "C") name.
    hipModule_t module;
    hipModuleLoadData(&module, code.data());
    hipFunction_t kernel;
    hipModuleGetFunction(&kernel, module, "saxpy_kernel");

    hipModuleUnload(module);
    return 0;
}
```

## Notes

- `hiprtcCreateProgram` takes the kernel source as a plain string plus optional header name/source arrays — no `.hip` file needs to exist on disk for this compilation path.
- `extern "C"` on the kernel avoids C++ name mangling so `hipModuleGetFunction` can look it up by its plain source name.
- Passing `--gpu-architecture=<gcnArchName>` from the queried device properties ensures the runtime-compiled code targets the actual device it will run on; omitting it lets the compiler pick a default that may not match.
- Always check `hiprtcGetProgramLogSize`/`hiprtcGetProgramLog` even when compilation succeeds — the log can contain warnings about the generated code.
- This is the HIP API (`hiprtcCreateProgram`, `hipModuleLoadData`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent (`nvrtcCreateProgram`) has no dedicated samples page in the nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/runtime_compilation" (MIT License), tag `therock-7.14`.
