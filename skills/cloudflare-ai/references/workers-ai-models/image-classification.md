---
source: https://developers.cloudflare.com/workers-ai/models/resnet-50/, https://developers.cloudflare.com/workers-ai/guides/tutorials/explore-workers-ai-models-using-a-jupyter-notebook/
---

# Image Classification Models

ResNet-50 image classification on Workers AI. No object-detection model appears as a dedicated task in this model catalog (`@cf/moondream/moondream3.1-9B-A2B` offers `detect` and `point` skills; see [image-to-text.md](./image-to-text.md)).

## Signature / Usage

The model page has no usage example. Snippet taken from https://developers.cloudflare.com/workers-ai/guides/tutorials/explore-workers-ai-models-using-a-jupyter-notebook/ (Python SDK; `client`, `account_id`, `requests`, and `display` are set up earlier in that tutorial).

```python
url = "https://raw.githubusercontent.com/craigsdennis/notebooks-cloudflare-workers-ai/main/assets/craig-and-a-burrito.jpg"
image_request = requests.get(url, allow_redirects=True)

display(Image(image_request.content, format="jpg"))
response = client.workers.ai.run(
    "@cf/microsoft/resnet-50",
    account_id=account_id,
    image=image_request.content
)
response
```

## Options / Props

| Model ID | Provider | Properties as stated | Unit pricing |
|----------|----------|----------------------|--------------|
| `@cf/microsoft/resnet-50` | Microsoft | 50 layers deep image classification CNN trained on more than 1M images from ImageNet; Zero data retention | $0.00000251 per inference request |

| Name | Type | Default | Description |
|------|------|---------|-------------|
| (input, option 1) | string (format: binary) | — | The image to classify. |
| (input, option 2) | object | — | Alternative input form, not expanded in the source. |
| (output) | array of objects | — | contentType `application/json`; item fields not expanded in the source. |

## Notes

- The tutorial's sample output lists items with `label` and `score` (for example label `BURRITO`); this is the tutorial's SDK-typed output, not a schema from the model page.

## Related

- [text-classification.md](./text-classification.md)
- [image-to-text.md](./image-to-text.md)
