# Run NemoClaw with a Local LLM

Install NemoClaw, NVIDIA's open-source OpenClaw reference stack, connecting OpenShell sandboxed agents to a local vLLM (Qwen3.6 35B) inference endpoint on DGX Spark.

## Signature / Usage

Adapted (not in the official docs): the official one-liner pipes the installer to a shell; split into download, inspect, run.

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh -o nemoclaw.sh
less nemoclaw.sh
bash nemoclaw.sh
# follow onboarding wizard: select model, create sandbox with policy tier
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| vLLM + Qwen3.6 35B (NVFP4) | model | local inference backend |
| OpenShell | runtime | sandboxed agent execution runtime |

## Notes

- Requires DGX OS with GB10 GPU (DGX Spark with 64 GB or 128 GB Unified Memory), Docker 28.x+, Node.js 22.16+ (auto-installed)
- Four isolation layers: filesystem, network, process, inference
- Optional Brave Search API key and Telegram/Discord/Slack integrations
- Duration: 30-60 minutes
- Adapted from the official docs: the install one-liner (curl | sh) was split into download, inspect, and run steps.
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-nemoclaw/README.md (commit 3088315, 2026-10-23)

## Related

- [Set Up Example NemoClaw Agents](./nemoclaw-applications.md)
- [OpenClaw](./openclaw.md)
- [OpenShell](./openshell.md)
