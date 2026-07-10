# Optimized JAX

Set up and optimize JAX (NumPy-style GPU code via `jit`/`grad`/`vmap`/`pmap` and the XLA compiler) on DGX Spark's Blackwell architecture using a marimo notebook walkthrough.

## Signature / Usage

```bash
git clone https://github.com/NVIDIA/dgx-spark-playbooks
docker build -t jax-on-spark .
docker run --gpus all -p 8080:8080 jax-on-spark
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| nvcr.io/nvidia/cuda:13.0.1-ubuntu24.04 | container | base image for the custom `jax-on-spark` image |
| marimo | tool | interactive notebook environment used for the tutorial |

## Notes

- Requires ARM64 + Blackwell GPU, Docker with NVIDIA Container Toolkit, port 8080 free
- Tutorial progresses from a NumPy SOM baseline to iteratively optimized JAX implementations
- Duration: 2-3 hours

## Related

- [CUDA-X Data Science](./cuda-x-data-science.md)
