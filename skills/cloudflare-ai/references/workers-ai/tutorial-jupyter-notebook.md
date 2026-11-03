---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/explore-workers-ai-models-using-a-jupyter-notebook/
---

# Tutorial: explore models with the Python SDK (Jupyter notebook)

Call text generation, text-to-image, image-to-text, speech recognition, translation, classification, and summarization models with the official Cloudflare Python SDK.

## Signature / Usage

Adapted (not in the official docs): notebook display calls replaced with `print`/plain variables; see Notes.

```python
import os
from getpass import getpass

from cloudflare import Cloudflare

if "CLOUDFLARE_API_TOKEN" in os.environ:
    api_token = os.environ["CLOUDFLARE_API_TOKEN"]
else:
    api_token = getpass("Enter your Cloudflare API Token")

if "CLOUDFLARE_ACCOUNT_ID" in os.environ:
    account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]
else:
    account_id = getpass("Enter your account id")

# Initialize client
client = Cloudflare(api_token=api_token)

result = client.workers.ai.run(
    "@cf/meta/llama-3-8b-instruct" ,
    account_id=account_id,
    messages=[
        {"role": "system", "content": """
            You are a productivity assistant for users of Jupyter notebooks for both Mac and Windows users.

            Respond in Markdown."""
        },
        {"role": "user", "content": "How do I use keyboard shortcuts to execute cells?"}
    ]
)
print(result["response"])
```

Other task calls:

```python
data = client.workers.ai.with_raw_response.run(
    "@cf/lykon/dreamshaper-8-lcm",
    account_id=account_id,
    prompt="A software developer incredibly excited about AI, huge smile",
)
image_bytes = data.read()
```

```python
data = client.workers.ai.run(
    "@cf/llava-hf/llava-1.5-7b-hf",
    account_id=account_id,
    image=image_request.content,
    prompt="Describe this photo",
    max_tokens=2048
)
print(data["description"])
```

```python
result = client.workers.ai.run(
    "@cf/meta/m2m100-1.2b",
    account_id=account_id,
    text="Artificial intelligence is pretty impressive these days. It is a bonkers time to be a builder",
    source_lang="english",
    target_lang="spanish"
)
print(result["translated_text"])
```

```python
result = client.workers.ai.run(
    "@cf/huggingface/distilbert-sst-2-int8",
    account_id=account_id,
    text="This taco is delicious"
)
```

```python
response = client.workers.ai.run(
    "@cf/facebook/bart-large-cnn",
    account_id=account_id,
    input_text=declaration_of_independence
)
response["summary"]
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| @cf/lykon/dreamshaper-8-lcm | model | — | Text to image; `prompt`. |
| @cf/llava-hf/llava-1.5-7b-hf | model | — | Image to text; `image`, `prompt`, `max_tokens`; result field `description`. |
| @cf/openai/whisper | model | — | Speech recognition; `audio` bytes; result has `text`, `word_count`, `vtt`, `words`. |
| @cf/meta/m2m100-1.2b | model | — | Translation; `text`, `source_lang`, `target_lang`; result `translated_text`. |
| @cf/huggingface/distilbert-sst-2-int8 | model | — | Text classification; `text`; result labels with scores. |
| @cf/microsoft/resnet-50 | model | — | Image classification; `image`. |
| @cf/facebook/bart-large-cnn | model | — | Summarization; `input_text`; result `summary`. |

## Notes

- Adapted from the official docs: notebook display calls (`display(Markdown(...))`, `Image`) were replaced with `print` or plain variables; `image_request` and `declaration_of_independence` are values you provide (the source downloads a sample image with `requests.get` and pastes a long text).
- Get the account ID and token from the dashboard Workers AI page, **Use REST API** (see REST API). Put them in `.env` and keep it out of version control.
- Notebook download: https://developers.cloudflare.com/workers-ai-notebooks/cloudflare-workers-ai.ipynb ; the Python SDK is https://github.com/cloudflare/cloudflare-python .
- Model availability and field names vary per model; the catalog is a separate category.

## Related

- [REST API](./rest-api.md)
- [Tutorial: choose a text generation model](./tutorial-choose-text-model.md)
- [Tutorials index](./tutorials-index.md)
