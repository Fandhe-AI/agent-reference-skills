# OpenClaw

Install OpenClaw, a local-first AI agent that remembers conversations and runs continuously, backed by a vLLM-served Qwen3.6-35B model on DGX Spark.

## Signature / Usage

```bash
curl -fsSL https://get.openclaw.ai | sh
vllm serve nvidia/Qwen3.6-35B-A3B-NVFP4   # separate terminal
# configure ~/.openclaw/openclaw.json with vLLM provider at http://localhost:8000/v1
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| nvidia/Qwen3.6-35B-A3B-NVFP4 | model | agent-ready quantized model, 262,144 token context |

## Notes

- Requires GPU memory sufficient for chosen model (DGX Spark 128GB supports large models)
- Extendable with community skills from Clawhub
- Duration: ~30 minutes install plus model download; Risk: Medium-High (requires security precautions for isolated systems)

## Related

- [OpenShell](./openshell.md)
- [NemoClaw](./nemoclaw.md)
- [vLLM for Inference](./vllm.md)
