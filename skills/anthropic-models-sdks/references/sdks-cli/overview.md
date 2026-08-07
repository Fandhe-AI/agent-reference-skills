<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/overview / last verified: 2026-08-07 -->

# CLI, SDKs, and libraries

Official tools for building with the Claude API: the `ant` CLI, client SDKs in seven languages, and framework-specific libraries.

## Signature / Usage

Anthropic provides three kinds of official tooling for building with the Claude API:

- **CLI:** The `ant` command-line tool for shell scripting and interactive use.
- **Client SDKs:** General-purpose Messages API clients for Python, TypeScript, C#, Go, Java, PHP, and Ruby. Each SDK provides idiomatic interfaces, type safety, and built-in support for streaming, retries, and error handling.
- **Libraries and integrations:** Packages and compatibility layers that expose Claude inside another framework's API surface rather than the Messages API directly.

For the full API specification, see the API reference (`/docs/en/api/overview`).

## Notes

- The CLI, client SDKs, and libraries are for calling the Claude API yourself: you send each request and handle each response. Claude Code, the Claude Agent SDK, and Claude Managed Agents work at a higher level, providing the agent loop, tool execution, and runtime.
- Client SDKs: Python, TypeScript, C#, Go, Java, PHP, Ruby.
- Libraries and integrations: Apple Foundation Models (Swift package for `LanguageModelSession`), OpenAI SDK compatibility.

## Related

- [CLI quickstart](./cli-quickstart.md)
- [Python SDK](./sdk-python.md)
- [TypeScript SDK](./sdk-typescript.md)
- [SDK middleware](./middleware.md)
- [OpenAI SDK compatibility](./openai-sdk-compat.md)
- [Apple Foundation Models](./apple-foundation-models.md)
