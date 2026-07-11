# FLUX.1 Dreambooth LoRA Fine-tuning

Fine-tune FLUX.1-dev 12B with multi-concept Dreambooth LoRA on DGX Spark, then use the trained weights in ComfyUI for custom high-resolution (up to 1024px) image generation.

## Signature / Usage

```bash
sudo usermod -aG docker $USER && newgrp docker
git clone https://github.com/NVIDIA/dgx-spark-playbooks
# download FLUX.1-dev, prepare 5-10 images per concept, run training script
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| black-forest-labs/FLUX.1-dev | model | gated 12B diffusion model, requires HF access |
| CLIP / T5 Text Encoder / Autoencoder | model | supporting encoders |

## Notes

- Requires NVIDIA Docker and no competing GPU processes
- Model download ~30-45 minutes; training ~90 minutes
- Trained LoRA weights integrate into ComfyUI workflows

## Related

- [Comfy UI](./comfy-ui.md)
