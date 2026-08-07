# Local Shell

`local_shell` tool: allows agents to run shell commands locally on a machine you or the user provide. Designed to work with Codex CLI and `codex-mini-latest`; commands execute in your own runtime — the API only returns instructions, it does not execute them on OpenAI infrastructure.

## Signature / Usage

```python
response = client.responses.create(
    model="codex-mini-latest",
    tools=[{"type": "local_shell"}],
    input=[
        {
            "role": "user",
            "content": [
                {"type": "input_text", "text": "List files in the current directory"},
            ],
        }
    ],
)
```

Loop: look for `local_shell_call` items in `response.output`, execute the contained `action` (e.g. `exec` with a command), then send the result back as a `local_shell_call_output` item (`type`, `call_id`, `output`) with `previous_response_id` set to continue.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `action.command` | `string[]` | Argv-tokenized command |
| `action.timeout_ms` | `number` | Timeout hint (not enforced server-side — enforce your own limits) |
| `action.working_directory` | `string` | Working directory |
| `action.env` | object | Environment variables |

## Notes

- **This tool is outdated.** For new use cases, use [Shell](./shell.md) with GPT-5.1 instead.
- Available only via the Responses API with `codex-mini-latest`; not available on other models or via Chat Completions.
- Sandbox or containerize execution, impose resource limits, filter/scrutinize high-risk commands (`rm`, `curl`, network utilities), and log every command and output.
- On failure, still send a `local_shell_call_output` with the error message in `output`; the model may recover or try a different command. Missing `call_id` returns a `400` validation error.

## Related

- [Shell](./shell.md)
- [Computer Use](./computer-use.md)
