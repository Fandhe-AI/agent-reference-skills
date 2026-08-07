<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/customer-support-chat / last verified: 2026-08-07 -->

# Customer support agent

Guide to building a customer support chatbot with Claude that answers product questions, stays on topic, and generates quotes through tool use.

## Signature / Usage

```python
from anthropic import Anthropic

class ChatBot:
    def __init__(self, session_state):
        self.anthropic = Anthropic()
        self.session_state = session_state

    def generate_message(self, messages, max_tokens):
        return self.anthropic.messages.create(
            model=MODEL,
            system=IDENTITY,
            max_tokens=max_tokens,
            messages=messages,
            tools=TOOLS,
        )

    def process_user_input(self, user_input):
        self.session_state.messages.append({"role": "user", "content": user_input})
        response_message = self.generate_message(self.session_state.messages, max_tokens=2048)
        # handle tool_use blocks vs. plain text blocks, then append the assistant reply
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| IDENTITY | str | System prompt establishing the assistant's role and persona |
| TASK_SPECIFIC_INSTRUCTIONS | str | Static context, few-shot examples, and guardrails concatenated into the first user turn |
| TOOLS | list | Client-side tool definitions (e.g. `get_quote`) the model can call |
| MODEL | str | Model ID, e.g. `claude-opus-5` |

## Notes

- Claude works best with the bulk of prompt content in the first `User` turn rather than the system prompt (the only exception being role prompting).
- Claude Opus 5 balances intelligence/latency/cost for complex multi-step support conversations; Claude Haiku 4.5 suits latency-sensitive flows with RAG, tool use, or long context.
- For real-time data (account balances, order status), use tool use rather than embedding-based RAG.
- Advanced techniques: RAG to reduce long-context latency and cost, streaming to reduce perceived response time, a separate intent classifier to route highly varied queries to specialized sub-conversations.
- Prerequisites: `ANTHROPIC_API_KEY` env var, Python 3.9+, `pip install anthropic streamlit python-dotenv` for the reference Streamlit UI.

## Related

- [Overview](./overview.md)
- [Ticket routing](./ticket-routing.md)
