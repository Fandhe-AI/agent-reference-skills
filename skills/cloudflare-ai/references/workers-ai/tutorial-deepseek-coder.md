---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/explore-code-generation-using-deepseek-coder-models/
---

# Tutorial: code generation with DeepSeek Coder (REST, Python)

Call the DeepSeek Coder models over the Workers AI REST API from Python: completion from a comment, debugging help, tests, and fill-in-the-middle.

## Signature / Usage

Environment (`.env`, keep it out of version control):

```bash
CLOUDFLARE_API_TOKEN="YOUR-TOKEN"
CLOUDFLARE_ACCOUNT_ID="YOUR-ACCOUNT-ID"
```

Adapted (not in the official docs): notebook display calls replaced with `print`; see Notes.

```python
import os
from getpass import getpass

import requests

if "CLOUDFLARE_API_TOKEN" in os.environ:
    api_token = os.environ["CLOUDFLARE_API_TOKEN"]
else:
    api_token = getpass("Enter you Cloudflare API Token")

if "CLOUDFLARE_ACCOUNT_ID" in os.environ:
    account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]
else:
    account_id = getpass("Enter your account id")

model = "@hf/thebloke/deepseek-coder-6.7b-base-awq"

prompt = "# A function that checks if a given word is a palindrome"

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"messages": [
        {"role": "user", "content": prompt}
    ]}
)
inference = response.json()
code = inference["result"]["response"]
print(prompt)
print(code.strip())
```

Fill-in-the-middle (the special tokens use the characters shown; copy and paste them):

```python
model = "@hf/thebloke/deepseek-coder-6.7b-base-awq"

code = """
<｜fim▁begin｜>import re

from jklol import email_service

def send_email(email_address, body):
    <｜fim▁hole｜>
    if not is_valid_email:
        raise InvalidEmailAddress(email_address)
    return email_service.send(email_address, body)<｜fim▁end｜>
"""

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"messages": [
        {"role": "user", "content": code}
    ]}
)
inference = response.json()
print(inference["result"]["response"].strip())
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| @hf/thebloke/deepseek-coder-6.7b-base-awq | model | — | Base model: comment completion and fill-in-the-middle. |
| @hf/thebloke/deepseek-coder-6.7b-instruct-awq | model | — | Instruct model: debugging help, test writing, JSON extraction; system message sets the task. |

## Notes

- Adapted from the official docs: the Jupyter display wrapper (`display(Markdown(...))`) was replaced with `print` so the snippet runs outside a notebook.
- Other use cases in the source (instruct model with a system message): explain why code fails, write `unittest` tests, and an experimental JSON extraction prompt. The source JSON Schema string in that experiment contains a trailing comma and is not valid; prefer JSON Mode for structured output.
- Model availability: confirm both `@hf/thebloke/deepseek-coder-*` IDs in the model catalog before use.
- Output text in the source (generated code/answers) is not API reference and is omitted.

## Related

- [JSON Mode](./json-mode.md)
- [Prompting](./prompting.md)
- [Tutorials index](./tutorials-index.md)
