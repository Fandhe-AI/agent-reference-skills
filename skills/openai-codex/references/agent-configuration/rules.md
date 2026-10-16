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
| `decision` | `"allow"` \| `"prompt"` \| `"forbidden"` (default `"allow"`) | Action when the rule matches. `allow` runs the command outside the sandbox without prompting; `prompt` prompts before each matching invocation; `forbidden` blocks without prompting. Codex applies the most restrictive decision when multiple rules match (`forbidden` > `prompt` > `allow`). |
| `justification` | string (optional, non-empty) | Human-readable reason surfaced in approval prompts or rejection messages; when using `forbidden`, include a recommended alternative (e.g. "Use `rg` instead of `grep`."). |
| `match` / `not_match` | list (default `[]`) | Example commands Codex validates when loading the rules file, to catch authoring mistakes. |

## Notes

- Create a `.rules` file under a `rules/` folder next to an active config layer (e.g. `~/.codex/rules/default.rules`); restart Codex to load changes.
- Codex scans `rules/` under every active config layer at startup, including Team Config locations and `~/.codex/rules/`. Project-local rules under `<repo>/.codex/rules/` load only when the project `.codex/` layer is trusted.
- Allow-listing a command in the TUI writes to `~/.codex/rules/default.rules`. With Smart approvals enabled (default), Codex may propose a `prefix_rule` during escalation requests — review the suggested prefix before accepting.
- Admins can enforce restrictive `prefix_rule` entries from `requirements.toml` (managed configuration).
- Shell wrappers (`bash -lc`, `zsh -c`, etc.) containing only plain words joined by safe operators (`&&`, `||`, `;`, `|`) are parsed with tree-sitter and split into individual commands before rule evaluation, so the most restrictive per-command result wins (e.g. `git add . && rm -rf /` is not auto-allowed just because `git add` is allowed). Scripts using redirection, substitution, env vars, wildcards, or control flow are NOT split and are evaluated as a single `["bash", "-lc", "<full script>"]` invocation.
- The `.rules` file format uses Starlark (Python-like syntax, designed to be safe to run: no side effects such as touching the filesystem).
- `pattern` must be a non-empty list and an exact prefix of the argument list (like what `execvp(3)` receives); `gh pr --repo openai/codex view 7888` does not match `["gh", "pr", "view"]`.
- `codex execpolicy check` emits JSON showing the strictest decision and matching rules (including `justification`); repeat `--rules` to combine files.
- Linear chains are split only for plain words joined by `&&`, `||`, `;`, `|`; redirection (`>`, `>>`, `<`), substitutions, `FOO=bar`, wildcards (`*`, `?`), and control flow are not split.
- Local `.rules` files apply to Codex; Local computer access with Work Cloud uses managed command rules (`rules` TOML field in Agent Security) instead and does not read local rule files.

## Related

- [Custom Instructions with AGENTS.md](./agents-md.md)
- [Subagents](./subagents.md)
