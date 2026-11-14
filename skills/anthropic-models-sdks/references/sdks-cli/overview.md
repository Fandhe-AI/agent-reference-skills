<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/overview / last verified: 2026-11-14 -->

# CLI, SDKs, and libraries

Official tools for building with the Claude API: the `ant` CLI, client SDKs in seven languages, and framework-specific libraries.

## Signature / Usage

Anthropic provides three kinds of official tooling for building with the Claude API:

- **CLI:** The `ant` command-line tool for shell scripting and interactive use.
- **Client SDKs:** General-purpose Messages API clients for Python, TypeScript, C#, Go, Java, PHP, and Ruby. They also cover Claude Managed Agents and most of the Admin API. Each SDK provides idiomatic interfaces, type safety, and built-in support for streaming, retries, error handling, and OpenTelemetry tracing.
- **Libraries and integrations:** Packages and compatibility layers that expose Claude inside another framework's API surface rather than the Messages API directly.

For the full API specification, see the API reference (`/docs/en/api/overview`).

## Latest versions

| Tool | Latest version | Package |
| --- | --- | --- |
| ant CLI | `2.9.0` | `github.com/anthropics/anthropic-cli` |
| Python | `2.8.0` | `anthropic` on PyPI |
| TypeScript | `1.8.0` | `@anthropic-ai/sdk` |
| C# | `13.8.0` | `Anthropic` |
| Go | `2.9.0` | `github.com/anthropics/anthropic-sdk-go/v2` |
| Java | `3.8.0` | `com.anthropic:anthropic-java` |
| PHP | `1.8.0` | `anthropic-ai/sdk` |
| Ruby | `2.8.0` | `anthropic` on RubyGems |

The same versions are available as JSON at `https://platform.claude.com/docs/sdk-versions.json`.

## Notes

- Each major version of a client SDK sends one API version by default. To move to a new API version, upgrade to a new major version. For `2026-10-21`, see `https://platform.claude.com/docs/en/api/migration-2026-10-21#upgrade`.
- Starting with the versions that first use `2026-10-21` (Python 2.0.0, TypeScript 1.0.0, C# 13.0.0, Go 2.0.0, Java 3.0.0, PHP 1.0.0, Ruby 2.0.0, `ant` CLI 2.0.0), the SDK and the CLI are licensed under the Apache License, Version 2.0. Earlier versions remain under the MIT License.

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
