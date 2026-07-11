# NIM on Spark

Deploy an NVIDIA NIM microservice for fast, reliable LLM serving on DGX Spark using a containerized inference service with GPU acceleration.

## Signature / Usage

```bash
docker login nvcr.io   # NGC API key
docker run --gpus all -p 8000:8000 \
  nvcr.io/nim/meta/llama-3.1-8b-instruct-dgx-spark:latest
curl -X POST http://localhost:8000/v1/completions
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Llama 3.1 8B NIM | model | primary example, `nvcr.io/nim/meta/llama-3.1-8b-instruct-dgx-spark` |
| Qwen3-32B NIM | model | alternative available for DGX Spark |

## Notes

- Requires NGC account with API key, Docker with NVIDIA Container Toolkit
- 10-50GB disk space for model caching depending on model
- Exposes OpenAI-compatible API for integration
- Duration: 15-30 minutes

## Related

- [vLLM for Inference](./vllm.md)
- [Nemotron Model Family](./nemotron.md)
