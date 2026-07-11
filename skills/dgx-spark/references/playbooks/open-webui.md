# Open WebUI with Ollama

Deploy the self-hosted Open WebUI chat interface with integrated Ollama on DGX Spark, accessible from a local browser with GPU-accelerated inference and persistent storage.

## Signature / Usage

```bash
docker pull ghcr.io/open-webui/open-webui:ollama
docker run -d -p 8080:8080 --gpus all \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:ollama
# open http://localhost:8080
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| ghcr.io/open-webui/open-webui:ollama | container | Open WebUI bundled with Ollama |
| gpt-oss:20b | model | recommended model for initial testing |

## Notes

- NVIDIA Sync method uses a custom startup script with port forwarding (port 12000)
- Manual setup accesses UI directly at `http://localhost:8080`
- Additional models available via the Ollama library

## Related

- [Ollama](./ollama.md)
- [Set Up Local Network Access](./connect-to-your-spark.md)
