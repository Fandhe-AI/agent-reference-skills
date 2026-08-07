# Shell

Hosted/local `shell` tool: runs terminal commands either in an OpenAI-hosted containerized environment or in your own local runtime, via the Responses API. Successor to `local_shell` for GPT-5.1 and later.

## Signature / Usage

```bash
curl -L 'https://api.openai.com/v1/responses' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5.6",
    "tools": [
      { "type": "shell", "environment": { "type": "container_auto" } }
    ],
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": [
          { "type": "input_text", "text": "Execute: ls -lah /mnt/data && python --version && node --version" }
        ]
      }
    ],
    "tool_choice": "auto"
  }'
```

When the shell tool runs against your own local runtime, the model returns a `shell_call` action item:

```json
{
  "type": "shell_call",
  "call_id": "call_9d14ac6f2b73485e91c0f4da6e1b27c8",
  "action": {
    "commands": ["ls -l"],
    "timeout_ms": 120000,
    "max_output_length": 4096
  },
  "status": "in_progress"
}
```

Your harness executes the command, captures `stdout`/`stderr`/outcome, and returns a matching `shell_call_output` item in the next request:

```json
{
  "type": "shell_call_output",
  "call_id": "call_9d14ac6f2b73485e91c0f4da6e1b27c8",
  "max_output_length": 4096,
  "output": [
    {
      "stdout": "...",
      "stderr": "...",
      "outcome": { "type": "exit", "exit_code": 0 }
    }
  ]
}
```

With hosted shell containers managed by OpenAI (`environment.type: "container_auto"`, as in the example above), OpenAI provisions and runs the container end-to-end: the client sends nothing back — both the `shell_call` and its `shell_call_output` appear automatically in the response.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `environment.type` | `"container_auto"` etc. | Hosted container mode, or a local runtime you execute yourself (you handle `shell_call_output`) |
| `action.commands` | `string[]` | Commands to run |
| `action.timeout_ms` | `number` | Timeout hint |
| `action.max_output_length` | `number` | Output truncation length |

## Notes

- Hosted containers are Debian 12 based with Python 3.11, Node.js 22.16, Java 17.0, PHP 8.2, Ruby 3.1, Go 1.23 preinstalled. Default working directory `/mnt/data` for downloadable artifacts.
- Network access is disabled by default; enable outbound connections via domain allowlists (requires org configuration). `domain_secrets` inject credentials as environment variables without exposing raw values to the model.
- Reusable containers persist across multiple requests (pass `previous_response_id` with a container reference) for multi-turn workflows; skills (versioned tool bundles) can be mounted into containers.
- Running arbitrary shell commands can be dangerous: always sandbox execution, apply allow/deny lists, and log tool activity for auditing.
- Operates through the Responses API only (not Chat Completions).

## Related

- [Local Shell](./local-shell.md)
- [Apply Patch](./apply-patch.md)
