# Python Library

Embed `AIAgent` in your own Python scripts, web apps, or automation pipelines without the CLI.

```python
from run_agent import AIAgent

agent = AIAgent(
    model="anthropic/claude-sonnet-4.6",
    quiet_mode=True,
    skip_context_files=True,
    skip_memory=True,
    disabled_toolsets=["terminal"],
)

# Simple: returns the final text
print(agent.chat("What is the capital of France?"))

# Full control: returns a dict with final_response and messages
result = agent.run_conversation(user_message="My name is Alice")
result2 = agent.run_conversation(
    "What's my name?",
    conversation_history=result["messages"],
)
print(result2["final_response"])
```

```bash
# Hermes publishes no wheel / sdist; use a PM-prepared source checkout
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
source ./activate
python your_app.py
```

## Notes

- Always set `quiet_mode=True` when embedding; otherwise CLI spinners and progress output clutter your application.
- Create one `AIAgent` per thread or task; instances hold conversation history, tool sessions and iteration counters and are not thread-safe.
- `skip_context_files=True` skips `AGENTS.md` loading; `skip_memory=True` disables persistent memory read/write (recommended for stateless endpoints). `max_iterations` defaults to 500.
- Provider credentials use the same environment variables as the CLI (e.g. `OPENROUTER_API_KEY`).
- Source: https://hermes-agent.nousresearch.com/docs/guides/python-library (pinned to v0.22.2)
