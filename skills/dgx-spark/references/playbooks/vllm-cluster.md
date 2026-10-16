# Serve LLMs with vLLM Across DGX Sparks

Guided and configurable model serving across a DGX Spark cluster, with three paths: Beginner (NVIDIA Sync, fixed model, two to four Sparks), Intermediate (NVIDIA Sync plus `spark-vllm-docker` recipe, two Sparks), Advanced (manual launch, two Sparks).

## Signature / Usage

```bash
git clone https://github.com/eugr/spark-vllm-docker.git
cd spark-vllm-docker
./run-recipe.sh recipes/qwen3.8-27b-nvfp4-dflash2.yaml --setup
curl --fail --show-error http://localhost:8000/health
```

Advanced path (head node, after `./run-recipe.sh --discover`):

```bash
./build-and-copy.sh -c --copy-parallel
./hf-download.sh nvidia/Qwen3.8-27B-NVFP4 -c --copy-parallel
./hf-download.sh z-lab/Qwen3.8-27B-DFlash2 -c --copy-parallel
./launch-cluster.sh -t vllm-node exec \
  vllm serve nvidia/Qwen3.8-27B-NVFP4 \
    --host 0.0.0.0 --port 8000 --trust-remote-code \
    --kv-cache-dtype fp8 --gpu-memory-utilization 0.7 \
    --max-model-len 262144 --max-num-seqs 8 --max-num-batched-tokens 16384 \
    --enable-chunked-prefill --async-scheduling --enable-prefix-caching \
    --speculative-config '{"method":"dflash","model":"z-lab/Qwen3.8-27B-DFlash2","num_speculative_tokens":8,"draft_tensor_parallel_size":2}' \
    --load-format instanttensor --reasoning-parser qwen3 \
    --tool-call-parser qwen3_xml --enable-auto-tool-choice \
    --tensor-parallel-size 2
./launch-cluster.sh stop   # stop on both Sparks
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Beginner | path | NVIDIA Sync Cluster Assistant + model launcher, fixed model; two or four Sparks (three or four: no worked CLI example) |
| Intermediate | path | NVIDIA Sync cluster + `run-recipe.sh` recipe on the head node; two Sparks |
| Advanced | path | Manual `launch-cluster.sh` with explicit vLLM flags; two Sparks |
| `--tensor-parallel-size` | int | Set to 2 in the two-Spark worked example |

## Notes

- Prerequisite: cluster configured per the Connect Multiple DGX Sparks playbook (cabling + NVIDIA Sync Cluster Assistant or manual setup), Docker on each Spark, Hugging Face CLI authenticated on each Spark (Intermediate / Advanced), `uv` on the head node
- `spark-vllm-docker` is a community launcher repository (eugr/spark-vllm-docker), not an NVIDIA repository; the recipe uses `nvidia/Qwen3.8-27B-NVFP4`
- The recipe path and the manual launcher have separate setup steps; use one path consistently
- Duration: 30 minutes or longer on first model download; Risk: Medium (changes cluster network config, launches processes on multiple Sparks)
- Stop: Beginner stops the model in NVIDIA Sync; Intermediate / Advanced stop on both Sparks from the head node (`./launch-cluster.sh stop`)
- Last Updated 09/28/2026: cluster workflow split from the single-device vLLM playbook
- Source: https://build.nvidia.com/spark/vllm-cluster (dgx-spark-playbooks commit c035e0ac7d21)

## Related

- [Connect Multiple DGX Sparks](./connect-multiple-sparks.md)
- [vLLM for Inference](./vllm.md)
- [NCCL for Two Sparks](./nccl.md)
