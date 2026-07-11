# Fine-tune with NeMo

Fine-tune 1-70B parameter language and vision-language models locally using NVIDIA NeMo AutoModel, supporting PEFT/LoRA/QLoRA/SFT with FP8 precision and full HuggingFace compatibility.

## Signature / Usage

```bash
docker pull nvcr.io/nvidia/nemo-automodel:26.02
docker run --gpus all -it nvcr.io/nvidia/nemo-automodel:26.02
# run a pre-configured LoRA/QLoRA/SFT recipe
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Llama-3.1-8B / Meta-Llama-3-70B / Qwen3-8B | model | example fine-tuning targets |

## Notes

- Requires Blackwell GPU, CUDA 12.0+, Python 3.10+, min 32GB system RAM, Docker/Podman
- Supports publishing fine-tuned model back to HuggingFace Hub
- Duration: 45-90 minutes for setup and initial fine-tuning

## Related

- [LLaMA Factory](./llama-factory.md)
- [Fine-tune with PyTorch](./pytorch-fine-tune.md)
