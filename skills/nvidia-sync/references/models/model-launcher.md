# Model Launcher

Beta feature that runs a pre-selected containerized model (vLLM) on a supported DGX Spark, Spark cluster, or DGX Station from NVIDIA Sync, with OpenCode set up to use it and an OpenAI-compatible endpoint for other apps.

## Signature / Usage

```text
NVIDIA Sync > Settings > Models > select device or cluster > Configure
```

Try a request against the model endpoint from your laptop (Bash, Localhost access; keep Sync connected to the device, or the primary node for a cluster). Start the model, wait for Running, select Copy endpoint, then replace `<copied-endpoint-url>` with the URL you copied, including `/v1`:

```bash
MODEL_URL='<copied-endpoint-url>'
curl --fail --show-error "$MODEL_URL/models"
```

Copy the model's id from the response, replace `<model-id>` below with that value, and send a message. The reply appears in `choices[0].message.content` in the JSON response.

```bash
curl --fail --show-error "$MODEL_URL/chat/completions" \
  -H 'Content-Type: application/json' \
  -d '{"model":"<model-id>","messages":[{"role":"user","content":"Say hello in one short sentence."}]}'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| DGX Spark (standalone or cluster) | supported device | Qwen3.8 27B NVFP4 with the `eugr/spark-vllm:nightly-20261002` container image |
| DGX Station (standalone) | supported device | GLM 5.3 Flash NVFP4 with the `eugr/spark-vllm:station-20261001` container image |
| Configure | action | Settings > Models; downloads the model and vLLM container (setup does not start the model). For a cluster, choose the primary node on the Select a head node screen, then Next |
| Start Model / Stop Model | action | Settings > Models, the model actions menu, or the system tray; start runs the vLLM container and loads the model into memory, stop frees memory and keeps the downloaded files |
| Launch OpenCode | action | Settings > Models, or OpenCode in the system tray; starts OpenCode on the remote device and opens its web app in your browser |
| Endpoint URL / Copy endpoint | action | Settings > Models, or Copy model URL in the system tray; use as the base URL of a custom or OpenAI-compatible provider |
| Network access: Localhost | setting | Access through Sync's SSH tunnel to your computer; the endpoint is not open on the device's network interfaces |
| Network access: LAN | setting | Access through the device's network address; listens on every network the device is connected to, including VPNs; uses unencrypted HTTP |
| Generate API Key / Regenerate / Remove Key | action | With the model stopped and LAN selected; controls access to the LAN endpoint |
| Uninstall | action | Model actions menu; removes the model files Sync set up (after Stop) |

Memory per Spark and supported cluster sizes:

| Memory per Spark | Standalone | Cluster Sizes |
| --- | --- | --- |
| 64 GB | One Spark | Two, three, or four Sparks |
| 128 GB | One Spark | Two, three, or four Sparks |

## Notes

- Model Launcher downloads a specific model and optimized vLLM container image for your DGX device, installs the open source coding harness OpenCode on it, configures OpenCode as an NVIDIA Sync custom app using the model for inference, lets you start and stop the containerized model, and lets you restrict endpoint access to your laptop or share it on your LAN. The beta feature only supports DGX Spark and DGX Station devices; the feature supports 64 GB and 128 GB Sparks. Sync checks for a recipe that matches your device or cluster before setup starts.
- For other models, use NVIDIA Playbooks (two vLLM playbooks: single device and Spark cluster) or NVIDIA's Local AI Inference Recipes (other devices, models, and inference engines). See the dgx-spark skill for the DGX Spark playbooks.
- Setup prerequisites: set up the Spark cluster before its model (for example two 64 GB Sparks use the two-node 64 GB recipe, picked when you select that cluster in Models); add each Spark to Sync and make sure you can reach it over SSH; cable the Sparks in a supported layout and run the Cluster Assistant; keep the Sparks powered on and reachable; each serving node needs enough free disk space and memory for the recipe's checks. Follow any prompts to fix a failed check; setup starts once the checks pass. Wait until Sync says the model is ready to launch, then select Proceed. To stop setup, select Quit Task and wait for Sync to confirm it has stopped.
- Primary node: for a Spark cluster you choose one Spark as the primary node (the head node on the selection screen). It downloads the files, sends them to the other serving nodes, and coordinates the model's work; the other serving nodes are workers. Choose a Spark you can keep powered on and reach from your computer. OpenCode runs on the primary node. After setup, find the node marked primary in the Nodes list under Settings > Models.
- Progress: Sync shows model and container sizes before setup, the percent done and total size during downloads when known, and elapsed time and an estimate once it has measured the download speed. The estimate does not cover unpacking, copying, and checking, or the time needed to start the model later. You can close Settings and return to Models to check progress.
- Network access: choose under Network access in the Models tab. Stop the model before you change these settings; the change takes effect the next time you start it. LAN access is open to anyone who can reach it unless you set an API key. LAN uses unencrypted HTTP, including when you set an API key; the key controls access but does not encrypt requests or responses. For a Tailscale connection, the URL Sync shows still uses its SSH tunnel. You can switch modes after disconnecting Sync, as long as Sync can still reach the devices and confirm the model is stopped; after changing modes, start the model and copy the current URL again.
- API keys: after replacing a key, update your apps with the new value; if OpenCode was already running, restart it so it reads the new key too. Switching to Localhost keeps the saved key, but it is inactive until you switch back to LAN.
- Starting can take several minutes. Wait until the status shows Running before you launch OpenCode or use the endpoint. Connect to the device, or the primary node for a Spark cluster. If startup fails, fix the reported cause and select Retry.
- Using OpenCode: OpenCode works with files in `~/opencode` on the remote device (on the primary node, under the connected user account for a cluster). Sync creates an AGENTS.md file with device guidance and installs skills under `~/opencode/.opencode/skills/`. These are OpenCode skills, separate from Claude Code Agent Skills (SKILL.md). Uninstalling the model leaves your OpenCode workspace and sessions in place. If Launch OpenCode is disabled, check that the model is running and Sync is connected to the right device; for a cluster a connection to a worker does not replace a connection to the primary node.
- The endpoint works with other apps that support an OpenAI-compatible server. Sync shows Endpoint Unavailable when it cannot provide a current, verified URL.
- If Sync disconnects: the model keeps running if NVIDIA Sync disconnects or your computer sleeps. Disconnecting closes Sync's SSH tunnel, so a Localhost endpoint stops working until you reconnect; a client using the device's LAN address can still reach the model if the network path stays available. The Models tab keeps the last model status it read; reconnect to check the current state and copy a fresh endpoint URL. To free the model's memory, reconnect and select Stop Model.
- Added in NVIDIA Sync 0.148.0-153 (beta). See [troubleshooting.md](./troubleshooting.md) for recovery actions, model status meanings, and remote file locations.
- Source: https://docs.nvidia.com/sync/latest/models.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [troubleshooting.md](./troubleshooting.md)
- [Cluster Assistant](../cluster/cluster-assistant.md)
- [Direct Connections](../connections/direct-connections.md)
- [Custom Applications](../applications/custom-applications.md)
