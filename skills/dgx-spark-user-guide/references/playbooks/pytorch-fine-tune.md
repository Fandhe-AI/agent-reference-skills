# Fine-tune with PyTorch

Fine-tune 1-70B parameter LLMs locally with PyTorch on DGX Spark using PEFT/LoRA/QLoRA/full-SFT, in single-node or multi-node (Docker Swarm) configurations.

## Signature / Usage

```bash
docker pull nvcr.io/nvidia/pytorch:25.11-py3
docker run --gpus all -it nvcr.io/nvidia/pytorch:25.11-py3
pip install transformers peft datasets trl bitsandbytes
huggingface-cli login
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Llama 3.2 3B / Llama 3.1 8B / Llama 3.1 70B | model | example fine-tuning targets |
| Full SFT / LoRA / QLoRA (4-bit) | method | supported fine-tuning approaches |

## Notes

- Multi-node setup requires two DGX Spark devices, Docker Swarm, and NVIDIA Container Toolkit
- Duration: 30-45 minutes setup; fine-tuning time varies by model size

## Related

- [LLaMA Factory](./llama-factory.md)
- [Fine-tune with NeMo](./nemo-fine-tune.md)
- [Connect Two Sparks](./connect-two-sparks.md)
