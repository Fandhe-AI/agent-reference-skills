<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool / last verified: 2026-08-07 -->

# Code Execution Tool

Give Claude a sandboxed container that runs Python/Bash so it can perform calculations, analyze data, and iterate on solutions itself.

```bash
curl --fail-with-body -sS https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 4096,
    "messages": [
      {
        "role": "user",
        "content": "Use the code execution tool to calculate the mean and standard deviation of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      }
    ],
    "tools": [
      {
        "type": "code_execution_20250825",
        "name": "code_execution"
      }
    ]
  }'
```

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-5",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": "Use the code execution tool to calculate the mean and standard deviation of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        }
    ],
    tools=[{"type": "code_execution_20250825", "name": "code_execution"}],
)

print(response.to_json())
```

## Notes

- The container is Python 3.11 on Linux x86_64 (5 GiB RAM, 5 GiB disk, 1 CPU) with no internet access and pre-installed libraries only (pandas, numpy, scipy, scikit-learn, matplotlib, etc.).
- Reuse a container across requests by passing back its `id` in `container`, keeping files (and, on `_20260120`+, interpreter state) alive for up to 30 days.
- Response blocks are `bash_code_execution_tool_result` (stdout/stderr/return_code/created files) and `text_editor_code_execution_tool_result`; no client-side `tool_result` is needed since this is a server tool.
- Free when combined with `web_search_20260209`+/`web_fetch_20260209`+ in the same request; standalone billing is by execution time (5-minute minimum).
