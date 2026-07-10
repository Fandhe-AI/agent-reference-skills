# Secure Long Running AI Agents with OpenShell

Run OpenClaw inside NVIDIA OpenShell, a kernel-level sandbox runtime with declarative YAML policies, to isolate filesystem/network/process/inference access on DGX Spark.

## Signature / Usage

```bash
uv tool install openshell
openshell gateway deploy
vllm serve nvidia/Qwen3.6-35B-A3B-NVFP4   # port 8000, gpu-memory-utilization 0.4
openshell sandbox deploy openclaw
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| OpenShell | sandbox runtime | kernel-level isolation via YAML policies |
| nvidia/Qwen3.6-35B-A3B-NVFP4 | model | served via vLLM as inference provider |
| OpenClaw | sandbox app | community sandbox with default policy |

## Notes

- Requires DGX OS (Ubuntu 24.04 base), Docker with NVIDIA Container Toolkit, Python 3.12+, `uv`
- Includes multi-provider and VS Code integration for advanced use
- Duration: 20-30 minutes plus model download

## Related

- [OpenClaw](./openclaw.md)
- [vLLM for Inference](./vllm.md)
- [Set Up Local Network Access](./connect-to-your-spark.md)
