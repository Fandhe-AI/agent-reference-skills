---
source: https://developers.cloudflare.com/workers-ai/models/llava-1.5-7b-hf/, https://developers.cloudflare.com/workers-ai/models/moondream3.1-9B-A2B/, https://developers.cloudflare.com/workers-ai/guides/tutorials/explore-workers-ai-models-using-a-jupyter-notebook/
---

# Image-to-Text Models

Vision-language models that describe, answer questions about, caption, point at, or detect objects in an image. (Several text-generation models also accept images; see [text-generation.md](./text-generation.md).)

## Signature / Usage

Neither model page has a usage example. Snippet taken from https://developers.cloudflare.com/workers-ai/guides/tutorials/explore-workers-ai-models-using-a-jupyter-notebook/ (Python SDK; `client`, `account_id`, and `requests` are set up earlier in that tutorial).

```python
url = "https://blog.cloudflare.com/content/images/2017/11/lava-lamps.jpg"

image_request = requests.get(url, allow_redirects=True)

display(Image(image_request.content, format="jpg"))

data = client.workers.ai.run(
    "@cf/llava-hf/llava-1.5-7b-hf",
    account_id=account_id,
    image=image_request.content,
    prompt="Describe this photo",
    max_tokens=2048
)

print(data["description"])
```

## Options / Props

### Models

| Model ID | Provider | Properties as stated | Unit pricing |
|----------|----------|----------------------|--------------|
| `@cf/llava-hf/llava-1.5-7b-hf` | llava-hf | Beta; open-source chatbot fine-tuned from LLaMA/Vicuna on multimodal instruction data; Zero data retention | — |
| `@cf/moondream/moondream3.1-9B-A2B` | moondream | Vision; 9B mixture-of-experts (2B active); Zero data retention | $0.30 per M input tokens, $1.00 per M output tokens |

### Input parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| (input, option 1) | string (format: binary) | — | llava-1.5-7b-hf. Binary string representing the image contents. |
| (input, option 2) | object | — | llava-1.5-7b-hf. Alternative object form; the tutorial call also passes `prompt` and `max_tokens`. Output has a `description` string. |
| task | string | query | moondream. enum: query, caption, point, detect. Which Moondream skill to run. |
| image | string | — | moondream. Public HTTPS URL or base64 data URI. Optional for `query`; required for `caption`, `point`, and `detect`. |
| question | string | What's in this image? | moondream. Question for the `query` task. |
| caption_length | string | normal | moondream. enum: short, normal, long. |
| target | string | person | moondream. Object phrase to locate for `point` and `detect`. |
| reasoning | boolean | true | moondream. Reasoning trace for `query`. |
| temperature | number | 0.2 | moondream. 0 to 2. |
| top_p | number | 0.9 | moondream. 0 to 1. |
| max_tokens | integer | 8192 | moondream. 1 to 28672. For `query` and `caption`. |
| max_objects | integer | 150 | moondream. 1 to 500. For `point` and `detect`. |
| stream | boolean | false | moondream. Incremental tokens for `query` and `caption`; `point` and `detect` do not support streaming. |

Moondream output fields: `finish_reason`, `metrics`, `answer` (query), `caption` (caption), `points` (point), `objects` (detect bounding boxes), `reasoning`; fields not belonging to the requested task are null.

## Notes

- Neither page documents a usage snippet; moondream's request is described only by its parameter list above.
- The llava tutorial call uses the Python SDK's keyword arguments, not the `env.AI.run` binding form.

## Related

- [text-generation.md](./text-generation.md)
- [image-classification.md](./image-classification.md)
- [text-to-image.md](./text-to-image.md)
