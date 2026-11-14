# Serve LLMs with vLLM Across DGX Sparks

Model serving across a DGX Spark cluster (two Sparks for the worked examples; same memory size in one cluster, all 64 GB or all 128 GB). Two paths: Intermediate (NVIDIA Sync cluster setup plus a supplied `spark-vllm-docker` recipe run with `run-recipe.py`) and Advanced (manual `docker run` + `vllm serve` on each Spark with `--nnodes 2`, native multi-node, no Ray).

## Signature / Usage

Install `uv` on the head Spark first:

Adapted (not in the official docs): the README runs `curl -LsSf https://astral.sh/uv/install.sh | sh`; split into download, inspect, run.

```bash
curl -LsSf -o uv-install.sh https://astral.sh/uv/install.sh
less uv-install.sh
sh uv-install.sh
export PATH="$HOME/.local/bin:$PATH"
```

Intermediate path on the head Spark (two 64GB Sparks shown; recipe file saved in `recipes/` from the playbook assets):

```bash
git clone https://github.com/eugr/spark-vllm-docker.git
cd spark-vllm-docker
uv run --with pyyaml python run-recipe.py --discover
uv run --with pyyaml python run-recipe.py --show-env
docker pull eugr/spark-vllm-b12x:nightly-20261015
uv run --with pyyaml python run-recipe.py recipes/qwen38-flash-next-2x64gb.yaml --setup
# second head terminal
curl --fail-with-body -i http://127.0.0.1:8000/health
curl --fail-with-body -sS http://127.0.0.1:8000/v1/models
# stop (or Ctrl+C in the launch terminal)
./launch-cluster.sh stop
./launch-cluster.sh status
```

Laptop access: `ssh -N -L 8000:127.0.0.1:8000 <user>@<head-host>`, then use `http://localhost:8000/v1`.

## Options / Props

| Cluster | Model | Recipe file (Intermediate) | Checkpoint (Advanced) |
| --- | --- | --- | --- |
| 2 x DGX Spark, 64GB each | Qwen3.8 Flash-Next | `qwen38-flash-next-2x64gb.yaml` | `nvidia/Qwen3.8-Flash-Next-FP4-Local` |
| 2 x DGX Spark, 128GB each | GLM 5.3 Flash | `glm53-flash-2x128gb.yaml` | `nvidia/GLM-5.3-Flash-FP4-Local` |

Recipe files: `https://raw.githubusercontent.com/NVIDIA/dgx-spark-playbooks/30883150541743d580c9c347700c6ac99fc396d2/nvidia/playbook-vllm-cluster/assets/<recipe file>`. Both recipes use image `eugr/spark-vllm-b12x:nightly-20261015` (community image with the B12X backend) and native multi-token prediction (`--speculative-config` with `"method":"mtp"`; no separate draft checkpoint).

Advanced multi-node flags:

| Flag | Description |
| --- | --- |
| `--tensor-parallel-size 2` | Splits tensors across the two GPUs; traffic uses the Spark-to-Spark link |
| `--nnodes 2` | Number of nodes in the distributed executor |
| `--node-rank 0` or `1` | Unique rank per node; the head is rank `0` |
| `--master-addr` / `--master-port` | Rendezvous: head's ConnectX IP (`HEAD_IP`) and port `29501` (`MASTER_PORT`); API port is `8000` |
| `--headless` | Worker (rank 1) runs without an API server |
| `--pipeline-parallel-size 1` | GLM keeps one pipeline stage |
| `--kv-cache-memory-bytes 3G` | Explicit per-GPU KV-cache budget in the 64GB Qwen recipe |

Advanced launch outline: set `HEAD_IP`, `ETH_IF`, `IB_IF`, `MASTER_PORT=29501`, `IMAGE`, `HF_CACHE_DIR` on each node, then run `docker run --rm -it --name vllm_cluster --privileged --gpus all --ipc host --network host --shm-size=16g ... --entrypoint /bin/bash "$IMAGE"` on each Spark (with the NCCL / UCX / GLOO interface variables and cache mounts from the README). Inside, set `NODE_ARGS=(--node-rank 0)` on the head and `NODE_ARGS=(--node-rank 1 --headless)` on the worker, export the recipe's environment, and run the full `vllm serve` command (Qwen: `vllm serve nvidia/Qwen3.8-Flash-Next-FP4-Local ... --max-model-len 262144 --max-num-seqs 8`, `--reasoning-parser qwen3`, `--tool-call-parser qwen3_xml`; GLM: `vllm serve nvidia/GLM-5.3-Flash-FP4-Local ... --max-model-len 500000 --max-num-seqs 4`, `--reasoning-parser glm45`, `--tool-call-parser glm47`, `--attention-backend B12X`). The full commands are in the README Advanced Step 4.

## Notes

- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-vllm-cluster/README.md (commit 3088315, 2026-10-23)
- Supported: two Sparks for the CLI examples, 64 GB or 128 GB each (Last Updated 10/22/2026 added 64 GB). The README states the guided path covers two to four Sparks, but there is no worked command-line example for three or four; it has no Beginner path section.
- Prerequisites: cluster per the Connect Multiple DGX Sparks playbook (ConnectX link; switch required for four Sparks), NVIDIA Sync on the laptop for Intermediate, Docker on each Spark, authenticated Hugging Face CLI on each Spark, `uv` on the head.
- `spark-vllm-docker` (eugr/spark-vllm-docker) and the `eugr/spark-vllm-b12x` image are community, not NVIDIA, artifacts. Recipe `--setup` copies the image and model files to the worker; run `docker pull` first. Restart without `--setup`; use `uvx hf auth login` on the head if a download asks for access.
- Sync's cluster setup does not create the laptop API tunnel. The head's API binds to host interfaces, so use a trusted network.
- Duration: 30 minutes or longer on first model download; Risk: Medium (changes cluster network config, launches processes on multiple Sparks). Advanced stop: `docker stop vllm_cluster` on each Spark.
- Adapted from the official docs: the README's `uv` installer one-liner (`curl | sh`) was split into download, inspect, and run steps (see Signature / Usage).

## Related

- [Connect Multiple DGX Sparks](./connect-multiple-sparks.md)
- [vLLM for Inference](./vllm.md)
- [NCCL for Two Sparks](./nccl.md)
