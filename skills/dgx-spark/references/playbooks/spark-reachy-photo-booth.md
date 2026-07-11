# Spark & Reachy Photo Booth

Build an AI-augmented photo booth combining DGX Spark with the Reachy Mini robot: local ReAct LLM loop, voice interaction, image generation, and person tracking, without cloud dependencies.

## Signature / Usage

```bash
git clone https://github.com/NVIDIA/spark-reachy-photo-booth
# create .env with NVIDIA_API_KEY and HF_TOKEN
docker compose up -d
# open http://127.0.0.1:3001
```

## Options / Props

| Component | Technology |
| --- | --- |
| LLM | openai/gpt-oss-20b via TensorRT-LLM |
| Speech Recognition | nvidia/riva-parakeet-ctc-1.1B |
| Text-to-Speech | hexgrad/Kokoro-82M |
| Image Generation | black-forest-labs/FLUX.1-Kontext-dev |
| Computer Vision | facebookresearch/detectron2, FoundationVision/ByteTrack |
| Storage | MinIO, Redpanda message bus |

## Notes

- Requires a Reachy Mini (or Lite) robot, NGC Personal API Key, HuggingFace gated-repo token
- Microservices architecture with 12+ containerized services on a message bus
- Duration: ~2 hours including hardware setup and model downloads (subsequent runs ~5 minutes)

## Related

- [Multi-modal Inference](./multi-modal-inference.md)
