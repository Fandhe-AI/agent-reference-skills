# Text to Knowledge Graph on DGX Spark

Transform unstructured documents into structured, interactively visualized knowledge graphs using local LLM inference (Ollama), ArangoDB, and a Three.js WebGPU frontend.

## Signature / Usage

```bash
git clone https://github.com/NVIDIA/dgx-spark-playbooks
cd nvidia/txt2kg && ./start.sh
# open http://localhost:3001
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Ollama (Llama 3.1 8B default) | model | local LLM inference for triple extraction |
| ArangoDB | database | graph storage, UI at `localhost:8529` |
| Three.js WebGPU | frontend | GPU-accelerated 2D/3D graph visualization |

## Notes

- Requires Docker with NVIDIA Container Toolkit and Docker Compose
- Cleanup via `docker compose down`

## Related

- [Ollama](./ollama.md)
- [RAG Application in AI Workbench](./rag-ai-workbench.md)
