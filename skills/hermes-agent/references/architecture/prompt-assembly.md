# Prompt Assembly

Hermes separates the cached system prompt from ephemeral API-call-time additions to preserve prompt caching, session continuity and memory correctness.

## Signature / Usage

Cached system prompt tiers (`agent/system_prompt.py`), joined `stable` -> `context` -> `volatile`:

1. **stable** — identity (`SOUL.md` or fallback), tool/model guidance, coding operating brief
2. **context** — caller-supplied `system_message`, project context files (`.hermes.md` / `AGENTS.md` / `CLAUDE.md` / `.cursorrules`), then worktree-dependent git workspace snapshot, operator instructions and platform hints
3. **volatile** — skills index, built-in memory snapshot (`MEMORY.md`), user profile snapshot (`USER.md`), external memory-provider block, timestamp/session/model/provider line, then runtime environment hints (host / home / current working directory)

Project context priority (first match wins, only ONE loaded):

```python
# From agent/prompt_builder.py (simplified)
def build_context_files_prompt(cwd=None, skip_soul=False):
    cwd_path = Path(cwd).resolve()

    # Priority: first match wins — only ONE project context loaded
    project_context = (
        _load_hermes_md(cwd_path)       # 1. .hermes.md / HERMES.md (walks to git root)
        or _load_agents_md(cwd_path)    # 2. AGENTS.md (cwd only)
        or _load_claude_md(cwd_path)    # 3. CLAUDE.md (cwd only)
        or _load_cursorrules(cwd_path)  # 4. .cursorrules / .cursor/rules/*.mdc
    )
    ...
```

| Priority | Files | Search scope | Notes |
|----------|-------|-------------|-------|
| 1 | `.hermes.md`, `HERMES.md` | CWD up to git root | Hermes-native project config |
| 2 | `AGENTS.md` | CWD only | Common agent instruction file |
| 3 | `CLAUDE.md` | CWD only | Claude Code compatibility |
| 4 | `.cursorrules`, `.cursor/rules/*.mdc` | CWD only | Cursor compatibility |

## Options / Props

Platform hint override (`config.yaml`, top-level `platform_hints`):

```yaml
platform_hints:
  whatsapp:
    append: >
      When tabular output would be useful, invoke the table_formatting
      skill instead of emitting a Markdown table.
  slack:
    replace: "You are on Slack. Keep responses tight and avoid wide tables."
  telegram: "Prefer short messages; split long answers."   # shorthand = append
```

| Key | Description |
|-----|-------------|
| `append` | Keep the built-in hint and add text after it |
| `replace` | Substitute the built-in hint entirely (wins over `append`) |
| bare string | Shorthand for `append` |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/prompt-assembly (pinned to v0.22.2)
- API-call-time-only layers (not in the cached prompt): `ephemeral_system_prompt`, prefill messages, gateway-derived session context overlays, later-turn Honcho/external recall injected into the current-turn user message. `pre_llm_call` plugin context is appended to the current turn's user message.
- Memory/profile snapshots live in the volatile tier; mid-session writes update disk but not the built prompt until a rebuild (new session or compression-triggered rebuild).
- Inside the context tier shared project files come before worktree-specific text so sessions of one project in different git worktrees share a prompt prefix.
- `Platform:` is not an identity field: a surface switch keeps stored bytes and delivers guidance as a one-shot note on the per-turn user-message channel (`agent/surface_switch.py`). The `<available_skills>` index delta is delivered the same way (`agent/skills_index_delta.py`).
- When `skip_context_files` is set (e.g. subagent delegation) SOUL.md is not loaded and `DEFAULT_AGENT_IDENTITY` is used.
- `SOUL.md` (`~/.hermes/SOUL.md`) fills the identity slot; `build_context_files_prompt(skip_soul=True)` prevents duplication.
- Context files are security-scanned (a hit replaces a project file with `[BLOCKED: ...]`; the user's own SOUL.md is warned about and loaded), truncated at `context_file_max_chars` (70/20 head/tail split; cap scales with context window, 20,000-char floor, 500K ceiling), and YAML frontmatter is stripped.
- Supported customization surfaces: `SOUL.md`, `MEMORY.md` / `USER.md`, project context files, skills, system prompt config overrides, ephemeral overlays (`HERMES_EPHEMERAL_SYSTEM_PROMPT`, prefill messages). Edit `agent/prompt_builder.py` only when forking or contributing upstream.
- Prompt surface review: `scripts/ci/prompt_surface.py render` writes snapshots to `tests/fixtures/prompt_surface/`; changes there need approval from hermes-agent-core.

```bash
scripts/run-in-hermes-env python scripts/ci/prompt_surface.py render
```

## Related

- [Context Compression & Caching](./context-compression-and-caching.md)
- [Session Storage](./session-storage.md)
- [Gateway Internals](./gateway-internals.md)
