# Fine-Tune Vision Language Models

Fine-tune Vision-Language Models for image and video understanding with LoRA, GRPO preference optimization, and Streamlit UIs for training and side-by-side base vs fine-tuned inference. Two recipes: Qwen2.5-VL-7B (wildfire detection from satellite imagery, GRPO) and InternVL3-8B (dangerous driving analysis from videos).

## Signature / Usage

```bash
git clone https://github.com/NVIDIA/dgx-spark-playbooks
cd dgx-spark-playbooks/nvidia/playbook-vlm-finetuning/assets
docker build -t vlm_demo .
sh launch.sh
cd /vlm_finetuning
# Authenticate at runtime inside the container
hf auth login
# Image recipe
hf download Qwen/Qwen2.5-VL-7B-Instruct
streamlit run Image_VLM.py
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Finetuning Method | Full Finetuning / LoRA | Image recipe GRPO Training section; LoRA rank and alpha 8-64 |
| Steps | 1-1000 | Training steps (about 100 steps can take up to about 2 hours) |
| Batch Size | 1, 2, 4, 8, 16 | Training batch size |
| Learning Rate | 1e-6 to 1e-2 | Training learning rate |
| Optimizer | AdamW / Adafactor | Optimizer choice |
| Format Reward | 2.0 | GRPO reward for proper reasoning format |
| Correctness Reward | 5.0 | GRPO reward for correct answers |
| Number of Generations | 4 | GRPO preference optimization generations |
| Video Frames | 12 to 16 | Frames per video (video recipe, `ui_video/train/video_vlm.ipynb`) |
| Port 8501 / 8888 | ports | Streamlit / Jupyter (video recipe) |

## Notes

- Requires DGX Spark (DGX OS, 128 GB Unified Memory), NVIDIA Container Toolkit, Hugging Face access token (used with `hf auth login`); Weights & Biases optional
- The same `vlm_demo` Docker image serves both image and video recipes; stop Streamlit or Jupyter and free memory before switching workloads
- The official playbook passes HF_TOKEN via `--build-arg` at build time (`docker build --build-arg HF_TOKEN=$HF_TOKEN -t vlm_demo .`); this page instead authenticates at runtime with `hf auth login` inside the container (also listed in the playbook's troubleshooting table), because build arguments can persist in image history/provenance.
- Image recipe: first access starts vLLM servers for the base model (up to about 15 minutes); LoRA weights are merged into the base model after training (about 5 minutes). **Stop Finetuning** does not guarantee checkpoints are stored or adapters merged
- Image dataset: Kaggle Wildfire Prediction Dataset (Kaggle login and accepted terms required for the cURL download)
- Video recipe: dataset layout is `dataset/videos/*.mp4` plus `metadata.jsonl` (one structured JSON record per video); usable quality often needs a day or more of training
- Last Updated 10/09/2026: `peft` pinned in the Dockerfile (`peft==0.17.1`) so GRPO no longer fails with `ImportError: Found an incompatible version of torchao`; rebuild the image if you hit it
- UMA: flush buffer cache with `sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'` if memory pressure appears within capacity
- Duration: ~2 hours setup plus short image run; Risk: Medium. Rollback: stop and remove the Docker containers (exit the container; `docker stop` / `docker rm` for a running one), then remove the image if no longer needed (`docker rmi vlm_demo`, Step 7 Cleanup); delete downloaded models, datasets, and checkpoints under the mounted assets directory if needed
- Source: https://build.nvidia.com/spark/vlm-finetuning (dgx-spark-playbooks commit c035e0ac7d21)

## Related

- [Live VLM WebUI](./live-vlm-webui.md)
- [PyTorch Fine-Tune](./pytorch-fine-tune.md)
- [vLLM for Inference](./vllm.md)
