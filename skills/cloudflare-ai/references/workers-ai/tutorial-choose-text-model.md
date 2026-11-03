---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/how-to-choose-the-right-text-generation-model/
---

# Tutorial: choose the right text generation model

Compare text generation models by sending the same questions to each over the REST API and timing the responses.

## Signature / Usage

Adapted (not in the official docs): notebook display calls replaced with `print`, error handler prints `response.text`; see Notes.

```python
import os
from getpass import getpass
from timeit import default_timer as timer

import requests

if "CLOUDFLARE_API_TOKEN" in os.environ:
    api_token = os.environ["CLOUDFLARE_API_TOKEN"]
else:
    api_token = getpass("Enter your Cloudflare API Token")

if "CLOUDFLARE_ACCOUNT_ID" in os.environ:
    account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]
else:
    account_id = getpass("Enter your account id")

# Given a set of models and questions, print each response to the question, from each model
# Include full completion timing
def speed_date(models, questions):
    for model in models:
        print(f"---\n #### {model}")
        for question in questions:
            print("> " + question)
            try:
                official_model_name = model.split("/")[-1]
                start = timer()
                response = requests.post(
                    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
                    headers={"Authorization": f"Bearer {api_token}"},
                    json={"messages": [
                        {"role": "system", "content": f"You are a self-aware language model ({official_model_name}) who is honest and direct about any direct question from the user. You know your strengths and weaknesses."},
                        {"role": "user", "content": question}
                    ]}
                )
                elapsed = timer() - start
                inference = response.json()
                print(inference["result"]["response"])
                print(f"_Generated in *{elapsed:.2f}* seconds_")
            except Exception as ex:
                print("uh oh")
                print(ex)
                print(response.text)

models = [
    "@hf/thebloke/zephyr-7b-beta-awq",
    "@hf/thebloke/mistral-7b-instruct-v0.1-awq",
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq",
    "@hf/thebloke/neural-chat-7b-v3-1-awq",
    "@hf/thebloke/llama-2-13b-chat-awq",
]

questions = [
    "What are the top 3 tasks where you excel? Please keep things brief.",
    "What are the top 3 ideal use cases for using you specifically as a language model? Please keep things brief.",
]

speed_date(models, questions)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| models | list of strings | — | Model IDs to compare. |
| questions | list of strings | — | Prompts sent to each model; examples cover translation, summarization, content creation, and sentiment classification. |

## Notes

- Adapted from the official docs: notebook `display(Markdown(...))` was replaced by `print`, and the exception handler prints `response.text` instead of the possibly undefined `inference` variable.
- The Text Generation interface is the same regardless of the model chosen; all text generation models on Workers AI support streaming (per the source).
- The notebook's per-model outputs and timings are example runs, not reference data, and are omitted. The model IDs are from a past catalog; check the catalog for current IDs.
- Notebook download: https://developers.cloudflare.com/workers-ai/static/documentation/notebooks/text-generation-model-exploration.ipynb

## Related

- [Tutorial: Python SDK notebook](./tutorial-jupyter-notebook.md)
- [Prompting](./prompting.md)
- [Tutorials index](./tutorials-index.md)
