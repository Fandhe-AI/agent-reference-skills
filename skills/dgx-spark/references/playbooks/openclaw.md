# OpenClaw

Install OpenClaw, a local-first AI agent that remembers conversations and runs continuously, backed by a vLLM-served Qwen3.6-35B model on DGX Spark.

## Signature / Usage

Adapted (not in the official docs): the official one-liner pipes the installer to a shell; split into download, inspect, run.

```bash
curl -fsSL https://openclaw.ai/install.sh -o install.sh
less install.sh
bash install.sh
vllm serve nvidia/Qwen3.6-35B-A3B-NVFP4   # separate terminal
# configure ~/.openclaw/openclaw.json with vLLM provider at http://localhost:8000/v1
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| nvidia/Qwen3.6-35B-A3B-NVFP4 | model | agent-ready quantized model, 262,144 token context |

## Notes

- Requires GPU memory sufficient for chosen model (DGX Spark with 64 GB or 128 GB Unified Memory)
- Set the local server context window to at least 32K tokens (64K or higher recommended if memory allows); set up the backend with the vLLM playbook (single device) or vLLM cluster playbook (cluster), choosing a tool-calling model
- Extendable with community skills from Clawhub
- Duration: ~30 minutes install plus model download; Risk: Medium-High (requires security precautions for isolated systems)
- Adapted from the official docs: the install one-liner (curl | sh) was split into download, inspect, and run steps.
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-openclaw/README.md (commit 3088315, 2026-10-23)

## Related

- [OpenShell](./openshell.md)
- [NemoClaw](./nemoclaw.md)
- [vLLM for Inference](./vllm.md)
