---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/, https://developers.cloudflare.com/workers-ai/guides/demos-architectures/, https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-flux/, https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-flux-newmodels/, https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-store-and-catalog/
---

# Tutorials, demos, and reference architectures

Index of Workers AI tutorials, the image generator playground video series, and reference architectures.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/guides/tutorials/explore-workers-ai-models-using-a-jupyter-notebook/ (text-to-image call):

```python
data = client.workers.ai.with_raw_response.run(
    "@cf/lykon/dreamshaper-8-lcm",
    account_id=account_id,
    prompt="A software developer incredibly excited about AI, huge smile",
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Whisper-large-v3-turbo with chunking | tutorial (Beginner) | — | See Tutorial: Whisper chunking. |
| Llama 3.2 11B Vision Instruct | tutorial (Beginner) | — | See Tutorial: Llama vision. |
| Retrieval Augmented Generation (RAG) | tutorial (Beginner) | — | See Tutorial: RAG. |
| Using BigQuery with Workers AI | tutorial (Beginner) | — | See Tutorial: BigQuery. |
| Explore models using a Jupyter notebook | tutorial (Beginner) | — | See Tutorial: Python SDK notebook. |
| Fine tune models with AutoTrain | tutorial (Beginner) | — | See Tutorial: AutoTrain LoRA. |
| Explore code generation using DeepSeek Coder | tutorial (Beginner) | — | See Tutorial: DeepSeek Coder. |
| Choose the right text generation model | tutorial (Beginner) | — | See Tutorial: choose a text model. |
| Build an AI Image Generator Playground (Part 1) | video | — | Deploy a Workers AI Image Playground with the flux models; repository https://github.com/kristianfreeman/workers-ai-image-playground |
| Add New AI Models to your Playground (Part 2) | video | — | Integrate new models and parameters that customize image generation. |
| Store and Catalog AI Generated Images with R2 (Part 3) | video | — | Use R2 to keep track of each generated image. |
| Build an AI code interpreter | tutorial (Intermediate) | — | cloudflare-sandbox-containers skill (sandbox: build-an-ai-code-interpreter) |
| Code interpreter with Workers AI | tutorial (Intermediate) | — | https://developers.cloudflare.com/sandbox/sdk/tutorials/workers-ai-code-interpreter/ (Sandbox SDK 0.x tutorial; not covered by the cloudflare-sandbox-containers skill) |
| Summarize PDF files on upload | tutorial (Intermediate) | — | https://developers.cloudflare.com/r2/tutorials/summarize-pdf/ |

## Notes

- The image playground pages are video series with no code on the page; the snippet above is borrowed from the notebook tutorial.
- Reference architectures using Workers AI (all under https://developers.cloudflare.com/reference-architecture/diagrams/): fullstack applications (`serverless/fullstack-application/`), storing user generated content (`storage/storing-user-generated-content/`), connected transportation systems (`iot/optimizing-and-securing-connected-transportation-systems/`), BigQuery to Workers AI (`ai/bigquery-workers-ai/`), multi-vendor AI observability and control (`ai/ai-multivendor-observability-control/`), composable AI (`ai/ai-composable/`), content-based asset creation (`ai/ai-asset-creation/`), RAG (`ai/ai-rag/`), automatic video captioning (`ai/ai-video-caption/`), serverless image content management (`serverless/serverless-image-content-management/`).
- Sandbox is covered by the cloudflare-sandbox-containers skill (sandbox category); the Sandbox SDK 0.x tutorial stays an official URL.
- Tutorials are example-oriented; consider samples/ for working workflows.

## Related

- [Tutorial: RAG](./tutorial-rag.md)
- [Tutorial: Whisper chunking](./tutorial-whisper-chunking.md)
- [Tutorial: Llama vision](./tutorial-llama-vision.md)
- [Tutorial: BigQuery](./tutorial-bigquery.md)
- [Tutorial: Python SDK notebook](./tutorial-jupyter-notebook.md)
- [Tutorial: AutoTrain LoRA](./tutorial-autotrain-lora.md)
- [Tutorial: DeepSeek Coder](./tutorial-deepseek-coder.md)
- [Tutorial: choose a text model](./tutorial-choose-text-model.md)
