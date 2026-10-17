# Troubleshooting: "My Agent Feels Dumber"

Diagnostic checklist for when Hermes seems less capable or forgets things mid-session: model switches, context pressure, wrong context detection, frozen memory snapshot.

## Signature / Usage

```bash
/model                 # current model; /status shows model, provider, profile
/usage                 # token usage and context window state
/context               # visual breakdown of the window; /context all for per-skill / per-toolset cost
/compress              # summarize history
/compress here [N]     # keep the most recent N exchanges verbatim
/compress focus <topic>
/new
/skills
/reload-skills
/tools list
```

Fix a wrong detected context length:

```yaml
model:
  default: your-model-name
  context_length: 131072

providers:
  my-server:
    api: "http://localhost:11434/v1"
    models:
      qwen3.5:27b:
        context_length: 64000
```

## Options / Props

| Symptom | First command | Likely cause |
|---------|--------------|--------------|
| Everything feels less capable | `/model` | Session on a different model than expected |
| Long session degrading | `/usage` | Context pressure; compress or start fresh |
| Limits hit surprisingly early | CLI startup line / `/usage` | Wrong auto-detected context length |
| Forgot what I said this session | (by design) | Frozen memory snapshot, appears next session |
| Forgot last week's discussion | ask it to `session_search` | Memory is bounded curated facts only |
| Lost a specific ability | `/skills`, `/tools list` | Skill or toolset not loaded |
| Lost old detail after long session | `/usage`, `/context` | Compression summarized older history |

## Notes

- `/model <name>` is session-only by default unless `model.persist_switch_by_default: true`; add `--global` to persist. Dashboard Models page changes apply to new sessions only. A mid-session switch resets the prompt cache.
- The CLI startup line shows the detected context length (e.g. `📊 Context limit: 128000 tokens`). For Ollama, a custom `num_ctx` needs a matching Hermes context length because `/api/show` reports the maximum. On a running gateway, edits to `model.context_length` or `compression.*` apply on the next message.
- Memory is injected as a frozen snapshot at session start; mid-session saves are written to disk immediately but reach the system prompt only next session (preserves the prefix cache).
- Memory is bounded: MEMORY.md 2,200 chars (~800 tokens), USER.md 1,375 chars (~500 tokens). The header shows usage (e.g. `[67% — 1,474/2,200 chars]`); `hermes journey list` shows entries. `session_search` queries all past sessions (SQLite FTS).
- Compression: last 20 messages protected (`protect_last_n`), opening exchange pinned (`protect_first_n: 3`); default `compression.in_place: true` soft-archives pre-compaction turns (still searchable); `in_place: false` rotates to a linked new session ("my project" to "my project #2").
- A toolset trimmed at start (`hermes chat -t "terminal"`) or `/tools disable` leaves the agent with fewer capabilities for that session.

## Related

- [tips](./tips.md)
- [work-with-skills](./work-with-skills.md)
