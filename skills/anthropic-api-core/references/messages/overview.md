<!-- source: https://platform.claude.com/docs/en/build-with-claude/overview / last verified: 2026-08-07 -->

# Features overview

Explore Claude's advanced features and capabilities. The API surface is organized into five areas: model capabilities, tools, tool infrastructure, context management, and files and assets.

## Signature / Usage

Not applicable (this page is a feature index, not an API).

## Notes

- Feature availability classifications: Beta (preview, may change), Generally available (GA, stable), Deprecated (still functional, migration path provided), Retired (no longer available).
- Platform labels: Claude API (Anthropic first-party), Bedrock (AWS-operated), Claude Platform on AWS (Anthropic-operated on AWS), Google Cloud (Vertex AI, Google-operated), Microsoft Foundry (Anthropic-operated on Azure).
- The [Models API](../endpoints/models-list.md) returns `max_input_tokens`, `max_tokens`, and a `capabilities` object per model to discover supported features programmatically.
- Zero Data Retention (ZDR) eligibility is tracked per feature; some depend also on model-level ZDR availability.
- Model capabilities: context windows (up to 1M tokens), adaptive thinking, batch processing, citations, data residency, effort, fallback credit, PDF support, search results, server-side fallback, structured outputs, thinking.
- Server-side tools: advisor tool, code execution, web fetch, web search.
- Client-side tools: bash, computer use, memory, text editor.
- Tool infrastructure: Agent Skills, fine-grained tool streaming, MCP connector, programmatic tool calling, tool search.
- Context management: compaction, context editing, automatic prompt caching, prompt caching (5m / 1hr), token counting.
- Files and assets: Files API.
- Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照。

## Related

- [Working with messages](./working-with-messages.md)
- [Streaming](./streaming.md)
