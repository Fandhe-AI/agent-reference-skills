# vLLM for Inference

Deploy vLLM, a high-throughput LLM inference engine (PagedAttention, continuous batching, OpenAI-compatible API), on single-node and multi-node DGX Spark configurations.

## Signature / Usage

```bash
export HF_TOKEN="your_huggingface_token"
docker pull nvcr.io/nvidia/vllm:26.05.post1-py3
docker run -it --gpus all -p 8000:8000 \
  nvcr.io/nvidia/vllm:26.05.post1-py3 vllm serve openai/gpt-oss-20b
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Gemma / Llama / Qwen / Nemotron / Phi series | models | 27+ supported models across BF16/NVFP4 quantizations |
| nvcr.io/nvidia/vllm | container | official NGC vLLM container |

## Notes

- Requires DGX Spark ARM64 + Blackwell GPU, CUDA 13.0, Docker with NVIDIA Container Toolkit, Python 3.12
- Multi-node deployment uses Ray over QSFP (two nodes) or switch (4+ nodes) with `--tensor-parallel-size`
- Unified Memory Architecture note: `sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'` can free memory
- Duration: ~30 minutes (Docker single-node); Risk: Low

## Known issue: multi-node serving (field notes)

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

- [Connect Two Sparks](./connect-two-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
- [SGLang for Inference](./sglang.md)
- [TRT-LLM for Inference](./trt-llm.md)
- [Speculative Decoding](./speculative-decoding.md)
