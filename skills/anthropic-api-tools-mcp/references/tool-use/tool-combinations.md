<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-combinations / last verified: 2026-08-07 -->

# Tool combinations

Common Anthropic-provided tool pairings for research agents, coding agents, and long-running agents.

## Signature / Usage

```json
{
  "tools": [
    {"type": "web_search_20260209", "name": "web_search"},
    {"type": "code_execution_20260521", "name": "code_execution"}
  ]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Research agent | web_search + code_execution | Search finds sources, code execution analyzes/synthesizes |
| Coding agent | text_editor + bash | Inspect code, edit, run tests, repeat |
| Cite-then-fetch | web_search + web_fetch | Search surfaces candidate URLs, fetch retrieves full page content for the relevant ones |
| Long-running agent | memory + any toolset | Memory persists state across conversations; orthogonal to other tools |
| All-in-one | computer_use | Subsumes most others by operating a full desktop via screenshots + mouse/keyboard; slowest, use when nothing narrower fits |

## Notes

- Coding agent pairing: both `text_editor` and `bash` are client-executed, so pair with a constrained working directory and command allowlist for untrusted code.
- Cite-then-fetch avoids fetching everything upfront: Claude searches, inspects snippets, and fetches only the 2-3 relevant results — useful when the answer lives in long-form content a snippet can't capture.
- Memory tool is orthogonal: it doesn't change other tools' behavior, just gives Claude a place to write/retrieve facts that would otherwise be lost on context reset.
- Computer use is the most general and slowest option (every action requires a screenshot round trip); prefer narrower tools when they cover the use case.
- These combinations are starting points, not prescriptions — mix tools to fit the task.

## Related

- [tool-reference](./tool-reference.md)
- [server-tools](./server-tools.md)
- [overview](./overview.md)
