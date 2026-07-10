# Comfy UI

Install and run ComfyUI, a node-based web UI for diffusion image generation (SDXL, Flux), leveraging the DGX Spark unified memory architecture.

## Signature / Usage

```bash
python3 -m venv comfyui-env && source comfyui-env/bin/activate
pip install torch --index-url https://download.pytorch.org/whl/cu130
git clone https://github.com/comfyanonymous/ComfyUI
python main.py --listen 0.0.0.0
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| v1-5-pruned-emaonly-fp16.safetensors | model | Stable Diffusion 1.5 checkpoint, ~2GB |

## Notes

- Requires min 8GB GPU memory, 20GB storage, Python 3.8+, CUDA compatible with Blackwell
- Web UI served on port 8188
- Duration: 30-45 minutes; Risk: Medium

## Related

- [DGX Dashboard](./dgx-dashboard.md)
