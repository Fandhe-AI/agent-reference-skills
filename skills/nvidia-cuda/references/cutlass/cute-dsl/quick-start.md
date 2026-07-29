# Quick Start

## Signature / Usage

```bash
# from source
git clone https://github.com/NVIDIA/cutlass.git
./setup.sh --cu12   # or --cu13

# via pip (stable wheel)
pip install nvidia-cutlass-dsl
# CUDA 13.1 specific extra also available

pip install torch jupyter mypy==1.19.1
export PYTHONUNBUFFERED=1   # recommended for Jupyter notebook development
```

## Options / Props

| Requirement | Value |
| --- | --- |
| OS | Linux only (x86_64 and aarch64) |
| Python | 3.10 – 3.14 |
| CUDA Toolkit | 12.9 or 13.1 |
| Driver | Must match CUDA Toolkit; for CUDA 12.9, driver 575.51.03 or later |
| `nvidia-cutlass-dsl` wheel | Includes everything needed to generate GPU kernels |

## Notes

- This quick start describes CUTLASS DSL 4.4.
- Recommended companion packages for notebook-based development: `torch`, `jupyter`, `mypy==1.19.1`.

## Related

- [Overview](./overview.md)
- [Functionality](./functionality.md)
