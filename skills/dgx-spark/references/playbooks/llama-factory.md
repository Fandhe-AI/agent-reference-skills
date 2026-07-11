# LLaMA Factory

Install LLaMA Factory and fine-tune models (LoRA, QLoRA, full fine-tuning; SFT/RLHF) such as LLaMA, Mistral, and Qwen3 on DGX Spark's Blackwell architecture.

## Signature / Usage

```bash
python3 -m venv llamafactory-env && source llamafactory-env/bin/activate
git clone https://github.com/hiyouga/LLaMA-Factory
pip install -e ".[torch,metrics]"
llamafactory-cli train examples/train_lora/qwen3_lora_sft.yaml
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Qwen3 | model | example model used for LoRA fine-tuning |

## Notes

- Requires CUDA 12.9+, Python 3 venv, over 50GB storage, HuggingFace Hub access
- Includes checkpoint validation, inference test, and export for production
- Duration: 30-60 minutes setup; 1-7 hours training depending on model/dataset

## Related

- [Fine-tune with PyTorch](./pytorch-fine-tune.md)
- [Unsloth on DGX Spark](./unsloth.md)
