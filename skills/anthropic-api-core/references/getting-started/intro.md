<!-- source: https://platform.claude.com/docs/en/intro / last verified: 2026-10-17 -->

# Intro to Claude

Claude is a highly performant, trustworthy, and intelligent AI platform built by Anthropic, for language, reasoning, analysis, coding, and more.

## Signature / Usage

The latest generation of Claude models (from the docs):

```text
Claude Fable 5.1 (claude-fable-5-1) - For demanding reasoning and long-horizon agentic work
Claude Opus 5.5 (claude-opus-5-5) - For long-running agentic coding and knowledge work
Claude Sonnet 5.5 (claude-sonnet-5-5) - The best combination of speed and intelligence
Claude Haiku 5.5 (claude-haiku-5-5) - For high-volume, latency-sensitive tasks such as classification, extraction, and routing
```

If unsure which model to use, start with Claude Opus 5.5 for most workloads. Use Claude Fable 5.1 for demanding reasoning and long-horizon agentic work, or when evals on Claude Opus 5.5 at higher effort still fall short. All current models support text and image input, text output, multilingual capabilities, vision, and tool use.

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
