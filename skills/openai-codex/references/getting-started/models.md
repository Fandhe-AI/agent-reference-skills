> OpenAI Codex (learn.chatgpt.com) のドキュメント.

# Models

Meet the AI models that power ChatGPT Work and Codex, and how to choose between them across the desktop app, ChatGPT Work on the web, Codex CLI, and the IDE extension.

## Signature / Usage

```bash
# Choose a model / reasoning effort for a CLI run
codex --model gpt-5.6
codex exec -m gpt-5.6 "Review the current changes"
```

In an interactive CLI session, use `/model` to switch models or adjust reasoning effort. In the desktop app, ChatGPT Work on the web, and the IDE extension, use the model/reasoning control beneath the composer.

To set a default model for the desktop app, CLI, and IDE extension (they share one `config.toml`):

```toml
model = "gpt-5.6"
```

## Options / Props

| Name | Capability | Speed | Desktop app | Web | CLI | IDE extension | Cloud |
|------|-----------|-------|-------------|-----|-----|----------------|-------|
| `gpt-5.6-sol` | 5/5 | 2/5 | Yes | Yes | Yes | Yes | Yes |
| `gpt-5.6-terra` | 4/5 | 3/5 | Yes | Yes | Yes | Yes | No |
| `gpt-5.6-luna` | 3/5 | 4/5 | Yes | Yes | Yes | Yes | No |
| `gpt-5.3-codex-spark` | 2/5 | 5/5 | Yes | No | Yes | Yes | No |
| `gpt-5.5` (previous gen) | 4/5 | 3/5 | Yes | Yes | Yes | Yes | No |
| `gpt-5.4` (deprecated) | 3/5 | 3/5 | Yes | Yes | Yes | Yes | No |
| `gpt-5.4-mini` (deprecated) | 2/5 | 4/5 | Yes | Yes | Yes | Yes | No |

## Notes

- Recommended default is **Sol** (`gpt-5.6-sol`) for complex, open-ended work; **Terra** for pragmatic everyday work; **Luna** for clear, repeatable/high-volume tasks.
- Reasoning effort levels: Light/Low (quick well-scoped tasks) -> Medium (balanced) -> High/Extra High (difficult, multi-step work). There is no exact mapping from GPT-5.5 to GPT-5.6 reasoning efforts.
- **Max** gives the selected model more time on a single task. **Ultra** uses [subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) to parallelize a divisible task; enable via Settings > Configuration > "Ultra in model picker slider" if not shown by default.
- `gpt-5.4` and `gpt-5.4-mini` retire from Codex (ChatGPT sign-in) on August 31, 2026 — replace with `gpt-5.6-terra` and `gpt-5.6-luna` respectively in saved configs, custom agents, and scheduled tasks. `gpt-5.2` and `gpt-5.3-codex` are already deprecated. The OpenAI API and Codex authenticated with your own API key are unaffected.
- Codex also supports any model/provider compatible with the Chat Completions or Responses APIs; Chat Completions support is deprecated and will be removed in a future release.
- Currently you cannot change the default model for Codex cloud chats.
- `subagents` (referenced by Ultra mode) belongs to a different scope's reference page, not this category.

## Related

- [cli.md](./cli.md)
- [ide.md](./ide.md)
- [cloud.md](./cloud.md)
- [best-practices.md](./best-practices.md)
