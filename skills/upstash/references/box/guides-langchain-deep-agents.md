# Guide: LangChain Deep Agents

The [`langchain-upstash-box`](https://pypi.org/project/langchain-upstash-box/) package wraps an Upstash Box as a LangChain Deep Agents sandbox backend, so a [Deep Agent](https://docs.langchain.com/oss/python/deepagents/overview)'s shell and file tools run inside the box instead of on your machine.

## Signature / Usage

```bash
pip install langchain-upstash-box
# or: uv add langchain-upstash-box

export UPSTASH_BOX_API_KEY="box_xxxxxxxxxxxxxxxxxxxxxxxx"
```

```python
from langchain_upstash_box import UpstashBoxSandbox

sandbox = UpstashBoxSandbox.create(runtime="python")

result = sandbox.execute("echo hello")
print(result.output, result.exit_code)

sandbox.write("/workspace/home/hello.py", "print('hi from box')")
print(sandbox.execute("python3 /workspace/home/hello.py").output)

sandbox.delete()
```

```python
from deepagents import create_deep_agent

sandbox = UpstashBoxSandbox.create(runtime="python")

agent = create_deep_agent(
    model="anthropic:claude-sonnet-4-6",
    system_prompt="You are a coding assistant with sandbox access.",
    backend=sandbox,
)

result = agent.invoke({"messages": [{"role": "user", "content": "Create a hello world Python script and run it"}]})
sandbox.delete()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UpstashBoxSandbox.create(runtime=..., timeout=...)` | — | Provisions a box and returns a `SandboxBackendProtocol`-implementing backend. `api_key=` / `base_url=` args override `UPSTASH_BOX_API_KEY` / `UPSTASH_BOX_BASE_URL` (base URL defaults to `https://us-east-1.box.upstash.com`) |
| `UpstashBoxSandbox(box_id=...)` | `string` | Wraps an existing box by id instead of creating a new one |
| `sandbox.execute(cmd, timeout=...)` | — | Runs a shell command; default timeout is 30 minutes, overridable per call or per backend |

## Notes

- Filesystem helpers (`ls` / `read` / `write` / `edit` / `glob` / `grep`) are included on the sandbox backend
- The `model="anthropic:..."` shorthand requires `langchain-anthropic` and an `ANTHROPIC_API_KEY`; any LangChain chat model works
- You own the box lifecycle — call `sandbox.delete()` when done. An idle box auto-pauses (compute released, filesystem kept) and wakes on the next command, but stays around until deleted

## Related

- [Quickstart](./quickstart.md)
- [Filesystem](./filesystem.md)
- [Snapshots](./snapshots.md)
