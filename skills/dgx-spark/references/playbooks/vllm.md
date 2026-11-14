# vLLM for Inference

Playbook "Serve LLMs with vLLM on One Device": a locally accessible model API (vLLM, a high-performance inference engine) from one DGX Spark (64 GB or 128 GB unified memory) or one DGX Station. Two paths: Intermediate (pull a recommended model, add its launch script as an NVIDIA Sync Custom App) and Advanced (choose and run a recipe from NVIDIA Local AI Inference Recipes by hand, test tool calling, tune, save a launch script, connect Hermes / OpenShell / a laptop client). For a Spark cluster, see the vllm-cluster playbook.

## Signature / Usage

Intermediate path, 128GB DGX Spark, Qwen3.8 Flash-Next: download the image and model, add the pinned launch script as a Sync Custom App, then check the API from the laptop.

```bash
# Step 4: on the DGX Spark
docker pull eugr/spark-vllm-b12x:nightly-20261015
hf download nvidia/Qwen3.8-Flash-Next-FP4-Local
# Step 5: NVIDIA Sync > Custom > + Add New: Name=vLLM-Qwen3.8-Flash-Next, Port=8000,
#   paste the script into Launch Script, then Add
#   (https://raw.githubusercontent.com/NVIDIA/dgx-spark-playbooks/30883150541743d580c9c347700c6ac99fc396d2/nvidia/playbook-vllm/assets/sync-vllm-spark-128gb-qwen38-flash-next.sh)
# Step 6: click the app name in NVIDIA Sync, then watch startup on the device
docker logs --tail 50 --follow vllm-spark-128gb-qwen38-flash-next
# Step 7: from a local terminal on the laptop
curl --fail-with-body -i http://localhost:8000/health
curl --fail-with-body -sS http://localhost:8000/v1/models
```

## Options / Props

Intermediate recipes (Step 4: pull and download; Step 5: Sync app name and launch script):

| Device | Memory | Model | Docker pull command | Model download command | App name | Launch script |
| --- | --- | --- | --- | --- | --- | --- |
| DGX Spark | 64GB | Qwen3.8 27B (NVFP4) | `docker pull vllm/vllm-openai:v0.28.0` | `hf download nvidia/Qwen3.8-27B-NVFP4` | `vLLM-Qwen3.8-27B-64GB` | `sync-vllm-spark-64gb-qwen38-27b.sh` |
| DGX Spark | 64GB | Nemotron 3.5 Bolt 74B A9B | `docker pull eugr/spark-vllm:nightly-20261016` | `hf download nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB` | `vLLM-Nemotron3.5-Bolt` | `sync-vllm-spark-64gb-nemotron35-bolt.sh` |
| DGX Spark | 128GB | Qwen3.8 Flash-Next | `docker pull eugr/spark-vllm-b12x:nightly-20261015` | `hf download nvidia/Qwen3.8-Flash-Next-FP4-Local` | `vLLM-Qwen3.8-Flash-Next` | `sync-vllm-spark-128gb-qwen38-flash-next.sh` |
| DGX Spark | 128GB | Qwen3.8 27B (NVFP4) | `docker pull nvcr.io/nvidia/vllm:26.10.pre1-py3` | `hf download nvidia/Qwen3.8-27B-NVFP4` | `vLLM-Qwen3.8-27B-128GB` | `sync-vllm-spark-128gb-qwen38-27b.sh` |
| DGX Station | 748GB | Qwen3.8 Flash-Next | `docker pull vllm/vllm-openai:qwen38-flash-next` | `hf download Inferact/Qwen3.8-Flash-Next-NVFP4` | `vLLM-Qwen3.8-Flash-Next` | `sync-vllm-station-qwen38-flash-next.sh` |
| DGX Station | 748GB | Nemotron 3 Super 120B A12B | `docker pull vllm/vllm-openai:v0.31.0` | `hf download nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-NVFP4` | `vLLM-Nemotron3-Super` | `sync-vllm-station-nemotron3-super.sh` |

Draft models for speculative decoding (download in addition):

| Model | Draft model download command |
| --- | --- |
| Qwen3.8 27B (either Spark memory size) | `hf download z-lab/Qwen3.8-27B-DFlash2` |
| Nemotron 3.5 Bolt 74B A9B | `hf download nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB-LiLiCorr` |

Scripts are under `https://raw.githubusercontent.com/NVIDIA/dgx-spark-playbooks/30883150541743d580c9c347700c6ac99fc396d2/nvidia/playbook-vllm/assets/`. Container names for `docker logs`: `vllm-spark-64gb-qwen38-27b`, `vllm-spark-64gb-nemotron35-bolt`, `vllm-spark-128gb-qwen38-flash-next`, `vllm-spark-128gb-qwen38-27b`, `vllm-station-qwen38-flash-next`, `vllm-station-nemotron3-super`.

Advanced path recommended recipes (NVIDIA Local AI Inference Recipes, nvidia.github.io/local-ai-inference-recipes):

| Device | Memory | Recommended model |
| --- | --- | --- |
| DGX Spark | 64GB unified memory | Qwen3.8 27B (NVFP4) |
| DGX Spark | 128GB unified memory | Qwen3.8 27B (NVFP4) |
| DGX Station | 748GB coherent memory | DeepSeek V4 Flash 0731 (marked experimental on the recipe page) |

## Notes

- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-vllm/README.md (commit 3088315, 2026-10-23)
- Supported hardware (one device): DGX Spark (DGX OS, 64 GB or 128 GB Unified Memory) and DGX Station (Ubuntu, large HBM + Grace DRAM). Prerequisites: Docker available to the user, Hugging Face CLI on the device; NVIDIA Sync on the laptop for Intermediate; SSH access for Advanced.
- Playbook Last Updated 10/19/2026. Duration: Intermediate 15 to 30 minutes depending on network speed, Advanced about 30 minutes more; Risk: Low. The Qwen3.8 27B and Nemotron 3.5 Bolt scripts also need the draft model listed above (speculative decoding).
- The README has no Beginner path and no Ray-based multi-node section any more; the cluster flow is the separate vllm-cluster playbook ([vllm-cluster.md](./vllm-cluster.md)). Earlier single-script names (`sync-vllm-single-spark-64gb.sh`, `sync-vllm-single-spark-128gb.sh`, `sync-vllm-single-station.sh`) and the Qwen3.6-35B-A3B / Nemotron 3 Ultra recipes do not exist at this commit.
- Port 8000 busy: stop the Sync app, set the app **Port** and `PORT=8000` near the top of the launch script to a free port (for example `8001`), start again, and use that port in the laptop URLs. All Intermediate scripts use Docker host networking, so `PORT` is vLLM's port on the device and Sync forwards the same port.
- Advanced Station: if the recipe uses `--gpus all` and the Station has more than one GPU, select the GB300 (`nvidia-smi --query-gpu=uuid,name`) and use `--gpus "device=${GB300_UUID}"`, otherwise vLLM may pick the RTX PRO 6000 and hit `torch.OutOfMemoryError`. First-run FlashInfer autotune can need a larger `VLLM_ENGINE_READY_TIMEOUT_S` (for example `7200`).
- Unified Memory Architecture note: `sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'` can free memory; with unified memory `nvidia-smi --query-gpu` memory fields report `N/A`, use plain `nvidia-smi`.

## Related

- [Serve LLMs with vLLM Across DGX Sparks](./vllm-cluster.md)
- [Connect Two Sparks](./connect-two-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
- [SGLang for Inference](./sglang.md)
- [TRT-LLM for Inference](./trt-llm.md)
- [Speculative Decoding](./speculative-decoding.md)
