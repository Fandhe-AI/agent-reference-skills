---
source: https://opencode.ai/docs/tools/
---

# Tools

Ask for the outcome you want. OpenCode chooses the available tools, requests approval when required, and returns the result.

## Signature / Usage

```text
Find where request timeouts are configured, change the default to 30 seconds,
and run the relevant existing tests.
```

This task typically uses `grep` or `glob`, `read`, an editing tool, and `shell`. You can also name a tool when you want a specific approach.

```text
Use grep to find every reference to DEFAULT_TIMEOUT, then read the matching files.
```

### Extensions

[MCP servers](https://opencode.ai/docs/mcp-servers/) add tools whose names and inputs come from each connected server. Their permission action is `<server>_<tool>` with resource `*`. They are not a fixed part of the built-in catalog. By default, agents reach them through `execute` under the server's namespace; set `codemode: false` on a server to list its tools directly.

[Skills](https://opencode.ai/docs/skills/) add task instructions rather than new executable tools. [Attachments](https://opencode.ai/docs/attachments/) put user-selected content into a prompt, while [References](https://opencode.ai/docs/references/) provide named outside directories. These features complement tools without bypassing their permission checks.

## Notes

- Built-in tools are split across pages: `tools-files.md`, `tools-shell-web.md`, `tools-interaction-automation.md`, `tools-browser.md`.
- OpenCode permissions and tools are distinct from Claude Code (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin).

## Related

- [tools-files.md](./tools-files.md)
- [tools-shell-web.md](./tools-shell-web.md)
- [tools-interaction-automation.md](./tools-interaction-automation.md)
- [tools-browser.md](./tools-browser.md)
- [mcp-overview.md](./mcp-overview.md)
