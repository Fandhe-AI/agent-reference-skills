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
| Deep learning frameworks | PyTorch 2.14.0, JAX 0.11.1, TensorFlow 2.21 / 2.20 |
| Inference serving | vLLM 0.29.0, SGLang 0.5.18, ATOM, MIGraphX 2.18, ONNX Runtime 1.29.0, xDiT, ComfyUI |
| Distributed inference | vLLM with MoRI recipe, SGLang with MoRI recipe (multi-node prefill-decode disaggregated serving over RDMA with MoRI on MI355X clusters) |
| Training | Primus (backends include Megatron, TorchTitan, MaxText) |

## Notes

- ROCm Core SDK 10.1.0 validated framework versions: PyTorch 2.14.0, JAX 0.11.1, vLLM 0.29.0, SGLang 0.5.18, MIGraphX 2.18, ONNX Runtime 1.29.0, TensorFlow 2.21 / 2.20. TensorFlow 2.19.1 support was dropped in 10.1.0 (replaced PyTorch 2.11.0, JAX 0.10.0, vLLM 0.27.0, SGLang 0.5.15, MIGraphX 2.17 from the previous release). Names only here; see the AI Ecosystem portal for install and recipes
- The AI Ecosystem portal also covers Optimization (workload optimization, vLLM V1 performance, model quantization, model acceleration libraries, Triton kernels, Composable Kernel) and Tutorials (AI Playbooks, AI Developer Hub)
- Framework install steps (PyTorch/TensorFlow/JAX/DGL) are covered in [install-deep-learning-frameworks.md](./install-deep-learning-frameworks.md); this page is the landing-section summary, not a full install guide
- vLLM and SGLang are inference-serving stacks with ROCm-enabled builds distributed as Docker images, following the same GPU-passthrough pattern as other ROCm containers (see [install-docker-spack.md](./install-docker-spack.md))

## Related

- [Install Deep Learning Frameworks](./install-deep-learning-frameworks.md)
- [What is ROCm](./what-is-rocm.md)
