# Live VLM WebUI

Stream webcam video via WebRTC to a Vision Language Model backend (Ollama, vLLM, SGLang, NIM, or cloud APIs) for real-time VLM analysis, with GPU monitoring and customizable prompts.

## Signature / Usage

```bash
ollama pull gemma3:4b
pipx install live-vlm-webui
# open https://<SPARK_IP>:8090
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| gemma3:4b | model | recommended lightweight VLM, 1-2s/frame |
| llama3.2-vision:11b | model | higher quality, slower |
| qwen2.5-vl:7b | model | alternative vision model |

## Notes

- Requires a webcam, Python 3.10+, pipx, and a running VLM backend (Ollama recommended)
- Uninstall via `pipx uninstall live-vlm-webui`
- Duration: 20-30 minutes; Risk: Low

## Related

- [Ollama](./ollama.md)
- [vLLM for Inference](./vllm.md)
- [SGLang for Inference](./sglang.md)
