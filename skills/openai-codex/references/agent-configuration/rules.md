# Rules

Rules control which commands Codex can run outside the sandbox. Rules are experimental and may change.

## Signature / Usage

```python
# ~/.codex/rules/default.rules
prefix_rule(
    pattern = ["gh", "pr", "view"],
    decision = "prompt",
    justification = "Viewing PRs is allowed with approval",
    match = [
        "gh pr view 7888",
        "gh pr view --repo openai/codex",
        "gh pr view 7888 --json title,body,comments",
    ],
    not_match = [
        "gh pr --repo openai/codex view 7888",
    ],
)
```

```shell
codex execpolicy check --pretty \
  --rules ~/.codex/rules/default.rules \
  -- gh pr view 7888 --json title,body,comments
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pattern` | list (required) | Command prefix to match; each element is a literal string or a union of literals (e.g. `["view", "list"]`) to match alternatives at that position. |
| `decision` | `"allow"` \| `"prompt"` \| `"forbidden"` (default `"allow"`) | Action when the rule matches. Codex applies the most restrictive decision when multiple rules match (`forbidden` > `prompt` > `allow`). |
| `justification` | string (optional) | Human-readable reason surfaced in approval prompts or rejection messages; recommend an alternative when using `forbidden`. |
| `match` / `not_match` | list (default `[]`) | Example commands Codex validates when loading the rules file, to catch authoring mistakes. |

## Notes

- Create a `.rules` file under a `rules/` folder next to an active config layer (e.g. `~/.codex/rules/default.rules`); restart Codex to load changes.
- Codex scans `rules/` under every active config layer at startup, including Team Config locations and `~/.codex/rules/`. Project-local rules under `<repo>/.codex/rules/` load only when the project `.codex/` layer is trusted.
- Allow-listing a command in the TUI writes to `~/.codex/rules/default.rules`. With Smart approvals enabled (default), Codex may propose a `prefix_rule` during escalation requests — review the suggested prefix before accepting.
- Admins can enforce restrictive `prefix_rule` entries from `requirements.toml` (managed configuration).
- Shell wrappers (`bash -lc`, `zsh -c`, etc.) containing only plain words joined by safe operators (`&&`, `||`, `;`, `|`) are parsed with tree-sitter and split into individual commands before rule evaluation, so the most restrictive per-command result wins (e.g. `git add . && rm -rf /` is not auto-allowed just because `git add` is allowed). Scripts using redirection, substitution, env vars, wildcards, or control flow are NOT split and are evaluated as a single `["bash", "-lc", "<full script>"]` invocation.
- The `.rules` file format uses Starlark (Python-like syntax, side-effect free).

## Related

- [Custom Instructions with AGENTS.md](./agents-md.md)
- [Subagents](./subagents.md)
