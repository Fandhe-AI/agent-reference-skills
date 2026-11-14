# Fine-Tune FLUX.2 Klein for Custom Image Generation

Train a multi-concept LoRA on FLUX.2 Klein (4B or 9B) with AI Toolkit on DGX Spark, then load the trained weights in ComfyUI for high-resolution (~1024px) image generation.

## Signature / Usage

```bash
git clone https://github.com/NVIDIA/dgx-spark-playbooks
cd dgx-spark-playbooks/nvidia/playbook-flux-finetuning/assets
export HF_TOKEN=<YOUR_HF_TOKEN>
sh download.sh
docker build -f Dockerfile.train -t flux2-train .
sh launch_train.sh
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| FLUX.2 Klein 4B (`black-forest-labs/FLUX.2-klein-base-4B`) | model | Selected on 64 GB systems, with Qwen3-4B text encoder |
| FLUX.2 Klein 9B (`black-forest-labs/FLUX.2-klein-base-9B`) | model | Selected on 128 GB systems, with Qwen3-8B text encoder |
| `flux2-vae.safetensors` | model | Autoencoder, downloaded by `download.sh` |
| `config/flux2_klein_4b.yaml` / `config/flux2_klein_9b.yaml` | config | Datasets and training parameters; LoRA dim/alpha 256, learning rate `0.0001` (AdamW 8-bit), batch size 2, `bfloat16`, 1,000 steps at 1024x1024 |
| `flux_data/` | dataset | Sample concepts `tjtoy` (trigger `tjtoy toy`, 6 images) and `sparkgpu` (trigger `sparkgpu gpu`, 7 images) |
| `workflows/base_flux2.json` / `workflows/finetuned_flux2.json` | ComfyUI workflow | Base inference / LoRA-conditioned inference |

## Notes

- Requires NVIDIA Docker, a Hugging Face `HF_TOKEN` with access granted on the gated FLUX.2 Klein model card, and no competing heavy GPU workloads
- `download.sh` detects physical memory (64 GB or 128 GB) and pulls the matching Klein and Qwen3 models; `launch_train.sh` selects the matching profile and writes `models/loras/flux2_klein_tjtoy_sparkgpu.safetensors`
- Inference: `docker build -f Dockerfile.inference -t flux2-comfyui .` then `sh launch_comfyui.sh`; ComfyUI is on port `8188`. Stop ComfyUI before training
- If you reduce `steps` in the config, also reduce `save_every`; set `compile: false` if `torch.compile` fails
- Model download ~30-45 minutes; estimated total 4 hours; Risk: Medium. Rollback: remove containers, models, `hf_cache/`, and LoRA checkpoints
- On unified memory, flush buffer cache with `sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'` if you hit memory pressure
- Changed from the earlier FLUX.1-dev 12B Dreambooth LoRA version of this playbook
- Last Updated 10/21/2026
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-flux-finetuning/README.md (commit 3088315, 2026-10-23)

## Related

- [Comfy UI](./comfy-ui.md)
