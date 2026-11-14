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
- `./start.sh` starts the default ArangoDB + Ollama stack; `--neo4j` selects Neo4j + Ollama and `--vllm` Neo4j + vLLM
- DGX Station (64 KB page size): use `./start.sh --neo4j` and do not add `--vector-search`, because Qdrant (like ArangoDB) can abort with `<jemalloc>: Unsupported system page size`; DGX Spark is not affected
- `start.sh` waits for the Web UI on port 3001 before printing the success banner and exits non-zero if it never responds
- Supported on DGX Spark with 64 GB or 128 GB unified memory
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-txt2kg/README.md (commit 3088315, 2026-10-23)

## Related

- [Ollama](./ollama.md)
- [RAG Application in AI Workbench](./rag-ai-workbench.md)
