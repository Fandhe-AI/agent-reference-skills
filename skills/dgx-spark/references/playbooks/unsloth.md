# Unsloth on DGX Spark

Run optimized fine-tuning with Unsloth (custom kernels, up to 2x faster training, reduced memory via LoRA/QLoRA) on DGX Spark, exporting to GGUF, Ollama, or vLLM formats.

## Signature / Usage

```bash
docker pull nvcr.io/nvidia/pytorch:25.11-py3
docker run --gpus all -it nvcr.io/nvidia/pytorch:25.11-py3
pip install unsloth transformers peft bitsandbytes
python test_unsloth.py
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| unsloth/Meta-Llama-3.1-8B-bnb-4bit | model | test model, customizable |

## Notes

- Requires Blackwell GPU, CUDA 13.0
- Supports 4-bit and 16-bit dynamic quantization, compatible with LLaMA/Mistral/Qwen/DeepSeek

## Related

- [LLaMA Factory](./llama-factory.md)
- [Fine-tune with PyTorch](./pytorch-fine-tune.md)
