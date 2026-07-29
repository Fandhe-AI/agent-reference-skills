# AI Ecosystem

Full-stack documentation and recipes to deploy AI workloads on AMD GPUs using popular ROCm-enabled frameworks, one of the four top-level sections of the ROCm docs landing page.

## Signature / Usage

```bash
# Pull a ROCm-enabled deep learning framework image (verified pattern, see
# install-deep-learning-frameworks.md); inference-serving images (vLLM, SGLang)
# follow the same rocm/<project>:<tag> naming convention on Docker Hub
docker pull rocm/pytorch:latest
```

## Options / Props

| Area | Frameworks / tools |
| --- | --- |
| Deep learning frameworks | PyTorch, JAX |
| Inference serving | vLLM, SGLang |

## Notes

- ROCm 7.14.0. Framework install steps (PyTorch/TensorFlow/JAX/DGL) are covered in [install-deep-learning-frameworks.md](./install-deep-learning-frameworks.md); this page is the landing-section summary, not a full install guide
- vLLM and SGLang are inference-serving stacks with ROCm-enabled builds distributed as Docker images, following the same GPU-passthrough pattern as other ROCm containers (see [install-docker-spack.md](./install-docker-spack.md))

## Related

- [Install Deep Learning Frameworks](./install-deep-learning-frameworks.md)
- [What is ROCm](./what-is-rocm.md)
