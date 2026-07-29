# HIPIFY (hipify-clang / hipify-perl)

HIPIFY is the tool family (a separate `ROCm/HIPIFY` project) that automatically translates CUDA source code into HIP C++, either via a Clang-based AST tool (`hipify-clang`) or a regex-based Perl script (`hipify-perl`).

## Signature / Usage

```bash
# hipify-clang: AST-based, requires a CUDA install + LLVM/Clang
./hipify-clang square.cu --cuda-path=/usr/local/cuda-12.9 -I /path/to/includes

# hipify-perl: regex-based, no CUDA install required
hipify-perl square.cu -o square.cu.hip
```

## Options / Props

| Tool / Option | Description |
| --- | --- |
| `hipify-clang <file.cu> --cuda-path=<dir> [-I ...] [-D ...] [-- <clang-args>]` | Parses CUDA into an AST and applies transformation matchers; requires CUDA ≥7.0 and LLVM+Clang ≥4.0.0 (versions must be compatible, e.g. CUDA 12.9.1 with LLVM 21.1.0-22.1.3) |
| `hipify-clang file1.cu file2.cu ... --cuda-path=<dir>` | Processes multiple files in one invocation |
| `hipify-clang <file> --cuda-path=<dir> -- -std=c++17` | Passes additional compiler flags (e.g. C++ standard) after `--` |
| `--print-stats` / `--print-stats-csv` | Prints or exports conversion statistics |
| `hipify-perl <file> -o <output>` | Regex-based translation with no external dependency (no CUDA install, no validation of CUDA correctness required); generated from `hipify-clang`'s rule set |
| `reference/hipify-clang-cmd` / `reference/hipify-perl-cmd` | Full CLI flag reference for each tool |
| `reference/supported_apis` | Aggregate CUDA API support-status tables (see below) |
| `reference/hip_supported_apis`, `reference/roc_supported_apis`, `reference/hip_roc_supported_apis` | Per-target (HIP-only vs ROC-runtime) API support-status tables |

## Notes

- Prefer `hipify-clang` for anything beyond trivial files: it parses complex constructs (macro expansion, namespaces, templates, host/device differentiation) that `hipify-perl` cannot reliably handle; `hipify-perl`'s advantage is zero dependencies and no requirement for valid/compilable CUDA input.
- HIPIFY additionally publishes ~20 machine-generated per-library comparison tables (`reference/tables/*`) covering cuBLAS, cuSPARSE, cuFFT, cuRAND, cuSOLVER, and other CUDA math/library APIs mapped to their ROCm equivalents (rocBLAS, hipSPARSE, hipFFT, etc.); consult those tables directly at `rocm.docs.amd.com/projects/HIPIFY/en/latest/reference/tables/` rather than a local copy, since they are large and regenerated frequently.
- This tool operates on the separate `ROCm/HIPIFY` documentation site (`rocm.docs.amd.com/projects/HIPIFY/en/latest/`), distinct from the main `ROCm/HIP` docs used by the rest of this category.

## Related

- [porting-cuda-to-hip.md](./porting-cuda-to-hip.md)
- [cuda-to-hip-api-comparison.md](./cuda-to-hip-api-comparison.md)
