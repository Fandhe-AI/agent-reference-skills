# Build a Video Search and Summarization (VSS) Agent

Deploy NVIDIA's VSS blueprint on DGX Spark combining VLM, LLM, and RAG for real-time video summarization, Q&A, and alerts, in local or hybrid deployment modes.

## Signature / Usage

```bash
git clone https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization
docker login nvcr.io
./deploy/docker/scripts/dev-profile.sh up
# open http://localhost:7777
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Cosmos Reason 2 VLM (8B) | model | local vision-language processing |
| Nemotron Nano 9B v2 | model | optional, alert workflows |
| DeepStream | pipeline | optional CV automation |

## Notes

- Requires DGX OS 7.4.0+, driver 580.95.05+, CUDA 13.0, Docker + Docker Compose, NGC API Key
- Requires >10GB available in `/tmp/`
- Rollback: `deploy/docker/scripts/dev-profile.sh down`
- Duration: 30-45 minutes plus processing time

## Related

- [Live VLM WebUI](./live-vlm-webui.md)
- [Multi-modal Inference](./multi-modal-inference.md)
