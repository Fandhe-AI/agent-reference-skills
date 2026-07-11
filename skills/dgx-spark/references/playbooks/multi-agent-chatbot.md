# Build and Deploy a Multi-Agent Chatbot

Prototype and deploy a fully local multi-agent system on DGX Spark: a gpt-oss-120B supervisor coordinates specialized coding, RAG, and image-analysis agents using the 128GB unified memory.

## Signature / Usage

```bash
sudo usermod -aG docker $USER && newgrp docker
git clone https://github.com/NVIDIA/dgx-spark-playbooks
./download-models.sh
docker compose up -d
# open http://localhost:3000
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| gpt-oss-120B | model | supervisor agent, ~63GB |
| Deepseek-Coder:6.7B-Instruct | model | coding agent, ~7GB |
| Qwen3-Embedding-4B | model | embeddings for RAG, ~4GB |

## Notes

- Total download ~74GB; default setup uses ~120 of 128GB memory
- Uses llama.cpp servers, TensorRT-LLM servers, Docker, and MCP servers
- Duration: 30 minutes to 2 hours including downloads

## Related

- [vLLM for Inference](./vllm.md)
- [RAG Application in AI Workbench](./rag-ai-workbench.md)
