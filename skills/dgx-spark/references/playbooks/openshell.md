# Secure AI Agents with OpenShell

Run a terminal coding agent (Pi, the reference agent) inside NVIDIA OpenShell, a kernel-level sandbox runtime with declarative YAML policies, backed by a locally served vLLM model on DGX Spark. OpenShell controls filesystem, network, process, and inference access.

## Signature / Usage

Adapted (not in the official docs): the official one-liner pipes the installer to a shell (`curl ... | OPENSHELL_VERSION=v0.1.2 sh`); split into download, inspect, run (pinned to v0.1.2 as in the playbook).

```bash
curl -LsSf https://raw.githubusercontent.com/NVIDIA/OpenShell/main/install.sh -o install.sh
less install.sh
OPENSHELL_VERSION=v0.1.2 sh install.sh
```

Provider profile for the local vLLM server (Step 6), then lint, import, and create the provider:

```bash
openshell profile lint -f local-vllm.yaml
openshell profile import -f local-vllm.yaml
openshell provider create --name local-vllm --type local-vllm
```

Deploy the sandbox from the Pi agent image (Step 8; `MODEL_HANDLE` is the model ID returned by `curl http://localhost:8000/v1/models`):

```bash
export SANDBOX_NAME=openshell-demo

openshell sandbox create \
  --name "$SANDBOX_NAME" \
  --from pi-agent:local \
  --provider local-vllm \
  -- pi --model local-vllm/"$MODEL_HANDLE"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| OpenShell | sandbox runtime | kernel-level isolation via declarative YAML policies; installer provides the CLI, policy prover, and a local gateway |
| `local-vllm.yaml` | provider profile | declares the host (`host.openshell.internal`), port `8000`, and the binaries allowed to call the vLLM server; no credentials |
| `pi-agent:local` | agent image | bring-your-own image built from `Dockerfile.pi` (Node 24 base, Pi installed, `WORKDIR /sandbox`) and passed to `sandbox create --from` |
| `--upload .:/sandbox` | sandbox create flag | copies a project directory in at creation time; `/sandbox` is the only project directory writable by upload under the default filesystem policy |

## Notes

- Requires DGX OS (Ubuntu 24.04 base) or compatible Linux, Docker with NVIDIA Container Toolkit, Python 3.12+, and network access for packages, images, and model weights. Estimated time 30 minutes plus model download; risk level Medium.
- The playbook is validated against OpenShell v0.1.2 (Step 3 pins it with `OPENSHELL_VERSION`); behavior of `--upload` and `profile lint` is only confirmed against that release. If OpenShell is already installed, uninstall it first.
- Set up the inference backend with the vLLM playbook (single device) or the vLLM cluster playbook (cluster). Keep `--host 0.0.0.0` and port `8000` so sandboxes can reach the server (they use the `host.openshell.internal` alias, not `127.0.0.1`), and export `MODEL_HANDLE` as the exact model ID from `/v1/models`.
- The sandbox default policy denies all outbound traffic not listed in an attached profile's `endpoints`; a prompt that fetches `https://example.com` is expected to fail. Diagnose with `openshell logs "$SANDBOX_NAME" --tail`.
- Detach from Pi without stopping it with `Ctrl-P` then `Ctrl-Q`; quitting Pi ends the sandbox's main process (the sandbox is retained for inspection but cannot be reconnected to). `openshell sandbox delete` tears the sandbox down.
- Last Updated 10/19/2026: rewritten for OpenShell 0.1.0 (reference agent changed from OpenClaw to Pi, custom provider profiles replace managed inference routing, and the deploy flow builds a bring-your-own agent image); upload target `/workspace` returns `Permission denied`, use `/sandbox`.
- Adapted from the official docs: the install one-liner (`curl | sh`) was split into download, inspect, and run steps.
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-openshell/README.md (commit 3088315, 2026-10-23)

## Related

- [OpenClaw](./openclaw.md)
- [NemoClaw](./nemoclaw.md)
- [vLLM for Inference](./vllm.md)
- [Set Up Local Network Access](./connect-to-your-spark.md)
