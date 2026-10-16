<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/overview / last verified: 2026-10-17 -->

# Guides to common use cases

Explore production guides for building common Claude use cases: ticket routing, customer support agents, content moderation, legal summarization, and commerce agents.

## Signature / Usage

```text
/docs/en/about-claude/use-case-guides/
  ├── ticket-routing
  ├── customer-support-chat
  ├── content-moderation
  ├── legal-summarization
  └── commerce-agents
```

## Choosing a build path

The three paths for building with Claude differ in how much control you keep and how much of the implementation you offload to Anthropic.

| Path | What it gives you |
| --- | --- |
| Messages API | The most control: you write the agent loop and run your own tools and infrastructure. |
| Claude Agent SDK | In between: provides the agent loop and tool execution in a process you operate. |
| Claude Managed Agents | Offloads the most: Anthropic hosts the agent loop, tool execution, and runtime for you. |

## Notes

- Each guide follows a consistent flow: decide whether to use Claude, build a strong prompt, establish success criteria, evaluate, deploy, then improve performance with advanced techniques.
- Guides target production deployment, not just prompt snippets — they cover model selection, cost estimation, evaluation metrics, and integration into existing workflows.
- The Claude Agent SDK is covered by the anthropic-agent-sdk skill and Claude Managed Agents by the anthropic-managed-agents skill.
- The official overview no longer lists the Classification guide (see classification.md); the ticket routing guide covers the classification pattern.

## Related

- [Ticket routing](./ticket-routing.md)
- [Customer support agent](./customer-support-chat.md)
- [Content moderation](./content-moderation.md)
- [Legal summarization](./legal-summarization.md)
- [Commerce agent](./commerce-agents.md)
- [Classification](./classification.md) (removed from official docs)
