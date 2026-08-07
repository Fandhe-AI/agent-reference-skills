<!-- source: https://platform.claude.com/docs/en/intro / last verified: 2026-08-07 -->

# Intro to Claude

Claude is a highly performant, trustworthy, and intelligent AI platform built by Anthropic, for language, reasoning, analysis, coding, and more.

## Signature / Usage

The latest generation of Claude models (verbatim from the docs):

```text
Claude Fable 5 - Next-generation intelligence for long-running agents.
Claude Mythos 5 - Shares Claude Fable 5's capabilities without the safety classifiers. Available in limited release through Project Glasswing.
Claude Opus 5 - For complex agentic coding and enterprise work.
Claude Sonnet 5 - Frontier intelligence at scale, built for coding, agents, and enterprise workflows.
Claude Haiku 4.5 - Fastest model with near-frontier intelligence.
```

Anthropic offers two ways to build with Claude:

| Approach | What it is | Best for |
|---|---|---|
| Messages API | Direct model prompting access | Custom agent loops and fine-grained control |
| Claude Managed Agents | Pre-built, configurable agent harness that runs in managed infrastructure | Long-running tasks and asynchronous work |

Recommended path for new developers:

1. Make your first API call ([get-started](./get-started.md))
2. Secure your credentials (API key expiration, avoid client-side/source-control exposure)
3. Understand the Messages API (request/response structure, multi-turn conversations, system prompts, stop reasons)
4. Choose the right model (models overview)
5. Explore features and tools (extended thinking, web search, file handling, structured outputs)

## Notes

- Two developer tools: the Developer Console/Workbench (prototype prompts), the API Reference, and the Claude Cookbook (Jupyter notebooks).
- Key capabilities: text/code generation (summarize, answer, extract, translate, generate code) and vision (analyze images, generate text/code from images).
- Support: Help Center (support.claude.com) and Service Status (status.claude.com).

## Related

- [get-started](./get-started.md)
- [get-api-key](./get-api-key.md)
