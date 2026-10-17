# vLLM for Inference

Playbook "Serve LLMs with vLLM on One Device": a locally accessible model API (vLLM, a high-performance inference engine) from one DGX Spark (64 GB or 128 GB unified memory) or one DGX Station. Three paths: Beginner (NVIDIA Sync model launch), Intermediate (recommended recipe as an NVIDIA Sync Custom App), Advanced (Qwen on 128GB Spark, or DeepSeek V4.1 Flash on DGX Station, prepared for the Hermes or OpenShell playbooks). For a Spark cluster, see the vllm-cluster playbook.

## Signature / Usage

Intermediate path, 128GB DGX Spark recipe (Qwen3.6-35B-A3B NVFP4): pull and download, then launch via the NVIDIA Sync Custom App, then health check:

```bash
# Step 3: on the DGX Spark
docker pull vllm/vllm-openai:v0.28.0
hf download nvidia/Qwen3.6-35B-A3B-NVFP4
# Step 4: NVIDIA Sync > Custom > + Add New: Name=vLLM-Qwen3.6-35B-A3B, Port=8000,
#   paste the 128GB Spark launch script into Launch Script, then Add
#   (https://raw.githubusercontent.com/NVIDIA/dgx-spark-playbooks/c035e0ac7d211509ec131b79b5b6f0f824a9e421/nvidia/playbook-vllm/assets/sync-vllm-single-spark-128gb.sh)
# Step 5: click the app name in NVIDIA Sync to start the container and vLLM server;
#   watch startup with: docker logs --tail 50 --follow vllm-qwen36-35b-a3b
# Step 6: from a local terminal
curl --fail-with-body -i http://localhost:8000/health
```

## Options / Props

Recommended recipes (Intermediate path):

| Device | Memory | Recipe | Docker pull command | Model download command |
| --- | --- | --- | --- | --- |
| DGX Spark | 64GB unified memory | Qwen/Qwen3.8-27B | `docker pull vllm/vllm-openai:qwen38` | `hf download nvidia/Qwen3.8-27B-NVFP4` |
| DGX Spark | 128GB unified memory | Qwen3.6-35B-A3B (NVFP4) | `docker pull vllm/vllm-openai:v0.28.0` | `hf download nvidia/Qwen3.6-35B-A3B-NVFP4` |
| DGX Station | 748GB coherent memory | Nemotron 3 Ultra (NVFP4) | `docker pull vllm/vllm-openai:v0.22.0` | `hf download nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4` |

Sync Custom App (Step 4):

| Device | Memory | App name | Launch script |
| --- | --- | --- | --- |
| DGX Spark | 64GB | `vLLM-Qwen3.8-27B` | `sync-vllm-single-spark-64gb.sh` |
| DGX Spark | 128GB | `vLLM-Qwen3.6-35B-A3B` | `sync-vllm-single-spark-128gb.sh` |
| DGX Station | 748GB | `vLLM-Nemotron-3-Ultra` | `sync-vllm-single-station.sh` |

Scripts are under `https://raw.githubusercontent.com/NVIDIA/dgx-spark-playbooks/c035e0ac7d211509ec131b79b5b6f0f824a9e421/nvidia/playbook-vllm/assets/`.

## Notes

- Supported hardware (one device): DGX Spark (DGX OS, 64 GB or 128 GB Unified Memory) and DGX Station (Ubuntu, large HBM + Grace DRAM).
- Recipes come from recipes.vllm.ai, a configuration site that generates the model checkpoint and vLLM server / Docker command for the device.
- The multi-node workflow moved to the separate vllm-cluster playbook ([vllm-cluster.md](./vllm-cluster.md)); the single-device playbook no longer documents Ray-based multi-node serving.
- For either DGX Spark script, if port 8000 is already in use, choose another Sync app port and change the `PORT` variable in the script to match; the script maps that host port to container port 8000.
- The earlier `nvcr.io/nvidia/vllm:26.05.post1-py3` tag no longer appears in the playbook.
- Unified Memory Architecture note: `sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'` can free memory
- Duration: Beginner and Intermediate 10 to 25 minutes depending on network speed, Advanced about 30 minutes more; Risk: Low

### Known issue: multi-node serving (field notes)

The cluster flow is now in [vllm-cluster.md](./vllm-cluster.md); the notes below are retained field notes.

- **Use the NGC container** (`nvcr.io/nvidia/vllm`), which bundles Ray plus a
  Blackwell (sm_121) -correct NCCL. The community `vllm/vllm-openai:latest` image with
  **Ray pip-installed on top** is a version-mismatched combo that hangs in multi-node
  TP: after model load and a few requests (~5-6 min) the engine logs
  `shm_broadcast.py ... No available shared memory broadcast block found in 60 seconds`
  repeatedly, then `TimeoutError: RPC call to sample_tokens timed out` → `EngineCore
  encountered a fatal error`. Confirmed **path- and load-independent** (reproduced over
  both a QSFP overlay and 1GbE, at TP=2, concurrency 8 and 4; `--ipc=host
  --shm-size=16g` did not help) — i.e. a software-stack fault, not the interconnect.
- Multi-node containers still need `--network host --ipc=host --shm-size` (vLLM's
  `run_cluster.sh` uses `--shm-size 10.24g`), started per the official Ray-cluster flow.
- Ray's OOM monitor can false-kill workers on Unified Memory even with ample free RAM:
  set `RAY_memory_monitor_refresh_ms=0`.
- After a crash a zombie `VLLM::EngineCore` GPU process can block the next start with
  `NCCL error: unhandled cuda error` — kill it before retrying.
- TP degree must divide the model's attention-head count (e.g. 32 heads → TP 1/2/4/8/16,
  **not 3**); use pipeline parallel to span an odd node count.

## Related

- [Serve LLMs with vLLM Across DGX Sparks](./vllm-cluster.md)
- [Connect Two Sparks](./connect-two-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
- [SGLang for Inference](./sglang.md)
- [TRT-LLM for Inference](./trt-llm.md)
- [Speculative Decoding](./speculative-decoding.md)
