# Use Hermes as a Python Library

Embed `AIAgent` in Python scripts, web apps, or pipelines without the CLI.

## Signature / Usage

```bash
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
source ./activate
```

```python
from run_agent import AIAgent

agent = AIAgent(
    model="anthropic/claude-sonnet-4.6",
    quiet_mode=True,
)
response = agent.chat("What is the capital of France?")
print(response)
```

Full control and multi-turn:

```python
result = agent.run_conversation(
    user_message="Search for recent Python 3.13 features",
    task_id="my-task-1",
)
print(result["final_response"])

result2 = agent.run_conversation(
    "What's my name?",
    conversation_history=result["messages"],
)
```

Toolsets and prompts:

```python
agent = AIAgent(model="anthropic/claude-sonnet-4.6", enabled_toolsets=["web"], quiet_mode=True)
agent = AIAgent(model="anthropic/claude-sonnet-4.6", disabled_toolsets=["terminal"], quiet_mode=True)
agent = AIAgent(ephemeral_system_prompt="You are a SQL expert. Only answer database questions.", quiet_mode=True)
```

Batch: `python batch_runner.py --input prompts.jsonl --output results.jsonl`, or a `ThreadPoolExecutor` with one fresh `AIAgent` per task.

## Options / Props

Key constructor parameters:

| Name | Type | Description |
|------|------|-------------|
| `model` | `str` (default `""`) | Model in OpenRouter format; empty resolves from hermes config at runtime |
| `quiet_mode` | `bool` (False) | Suppress CLI output |
| `enabled_toolsets` | `List[str]` (None) | Whitelist toolsets |
| `disabled_toolsets` | `List[str]` (None) | Blacklist toolsets |
| `save_trajectories` | `bool` (False) | Save conversations to JSONL (ShareGPT format, `trajectory_samples.jsonl`) |
| `ephemeral_system_prompt` | `str` (None) | Custom system prompt, not saved to trajectories |
| `max_iterations` | `int` (500) | Max tool-calling iterations per conversation |
| `skip_context_files` | `bool` (False) | Skip loading AGENTS.md files |
| `skip_memory` | `bool` (False) | Disable persistent memory read/write |
| `api_key` | `str` (None) | API key; falls back to env vars |
| `base_url` | `str` (None) | Custom API endpoint URL |
| `platform` | `str` (None) | Platform hint such as `"discord"`, `"telegram"` |

## Notes

- Hermes does not publish a supported wheel or sdist for `requirements.txt` installs; use the activated source checkout.
- Same env vars as the CLI are required (at minimum `OPENROUTER_API_KEY`, or `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`).
- Always set `quiet_mode=True` when embedding.
- `run_conversation()` returns `final_response` and `messages`; `task_id` is stored on the agent for VM isolation but not echoed back.
- `run_conversation()` accepts `system_message` to override the ephemeral system prompt for that call; `conversation_history` is copied, never mutated.
- Not thread-safe: create one `AIAgent` per thread or task.
- Consider lowering `max_iterations` (e.g. 10) for simple Q&A.
- Use `skip_memory=True` for stateless API endpoints.
- Source: https://hermes-agent.nousresearch.com/docs/guides/python-library (pinned to v0.22.2)

## Related

- [tips](./tips.md)
