# Python SDK

Official OpenAI SDK for Python (`openai` package on PyPI), the primary client for calling the OpenAI API from Python.

## Signature / Usage

```bash
pip install openai
```

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.6",
    input="Write a one-sentence bedtime story about a unicorn.",
)

print(response.output_text)
```

## Notes

- `OpenAI()` reads the API key automatically from the `OPENAI_API_KEY` environment variable; export it in your shell before running scripts (`export OPENAI_API_KEY="your_api_key_here"`).
- Create API keys from the [dashboard](https://platform.openai.com/api-keys).
- Source and full API surface: [github.com/openai/openai-python](https://github.com/openai/openai-python).

## Related

- [JavaScript SDK](./javascript-sdk.md)
- [OpenAI CLI](./openai-cli.md)
