# Run NemoClaw with a Local LLM

Install NemoClaw, NVIDIA's open-source OpenClaw reference stack, connecting OpenShell sandboxed agents to a local vLLM (Qwen3.6 35B) inference endpoint on DGX Spark.

## Signature / Usage

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
# follow onboarding wizard: select model, create sandbox with policy tier
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| vLLM + Qwen3.6 35B (NVFP4) | model | local inference backend |
| OpenShell | runtime | sandboxed agent execution runtime |

## Notes

- Requires DGX OS with GB10 GPU, Docker 28.x+, Node.js 22.16+ (auto-installed)
- Four isolation layers: filesystem, network, process, inference
- Optional Brave Search API key and Telegram/Discord/Slack integrations
- Duration: 30-60 minutes

## Related

- [Set Up Example NemoClaw Agents](./nemoclaw-applications.md)
- [OpenClaw](./openclaw.md)
- [OpenShell](./openshell.md)
