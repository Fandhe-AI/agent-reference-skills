# Developer Quickstart

The OpenAI API provides a consistent interface to state-of-the-art AI models for text generation, natural language processing, computer vision, and more. This page covers API key setup, SDK installation, and a first API call.

## Signature / Usage

```bash
# macOS / Linux
export OPENAI_API_KEY="your_api_key_here"

# Windows (PowerShell) — persists for new terminals only; open a new terminal after running this
setx OPENAI_API_KEY "your_api_key_here"
# To use the key in the current PowerShell session without opening a new terminal:
$env:OPENAI_API_KEY = "your_api_key_here"

# Install SDK
npm install openai      # JavaScript/Node.js
pip install openai      # Python
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

- Create an API key via the dashboard and export it as `OPENAI_API_KEY` before making any call.
- On Windows, `setx` only takes effect in terminals opened after running it; use `$env:OPENAI_API_KEY = "..."` in PowerShell to set it for the current session immediately.
- The quickstart example consistently uses `model="gpt-5.6"` as a bare alias; the model catalog otherwise lists variant suffixes (`gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`) — see [Models](./models.md).
- Official SDKs also exist for .NET, Java, Go, and Ruby (via NuGet, Maven, Go modules, Bundler).
- Beyond basic text generation, the API supports image/file input analysis, web search, file search over vector stores, code interpreter, function calling, MCP server integration, streaming via server-sent events, and multi-agent systems through the Agents SDK.

## Related

- [Key concepts](./concepts.md)
- [Models](./models.md)
