# Models

Meet the AI models that power ChatGPT Work and Codex, and how to choose between them across the desktop app, ChatGPT Work on the web, Codex CLI, and the IDE extension.

## Signature / Usage

```bash
# Choose a model / reasoning effort for a CLI run
codex --model gpt-6.1-sol
codex exec -m gpt-6.1-sol "Review the current changes"
```

GPT-6.1 Terra requires Codex CLI 0.159.0 or later. To use it, run `codex -m gpt-6.1-terra`.

In an interactive CLI session, use `/model` to switch models or adjust reasoning effort. In the desktop app, ChatGPT Work on the web, and the IDE extension, use the model and reasoning control beneath the composer.

To set a default model for the desktop app, CLI, and IDE extension (they share one `config.toml`):

```toml
model = "gpt-6.1-sol"
```

## Options / Props

Recommended models. Capability and Speed are out of 5 (the number of icons on the official model cards).

| Name | Capability | Speed | Desktop app | Web | CLI | IDE extension | Credits | API |
|------|-----------|-------|-------------|-----|-----|----------------|---------|-----|
| `gpt-6-astra` (most capable model for complex work across code, apps, and research) | 5 | 2 | Yes | Yes | Yes | Yes | Yes | Yes |
| `gpt-6.1-sol` (near-Astra performance at a lower cost; repeated, long-running work) | 5 | 3 | Yes (Work and Codex) | Yes (ChatGPT Work) | Yes | Yes | Yes | Yes |
| `gpt-6.1-terra` (fast, efficient; clear writing, visual understanding, and computer use) | 5 | 4 | Yes (Work and Codex) | Yes (ChatGPT Work) | Yes | No | Yes | Yes |
| `gpt-6-luna` (most efficient; focused, high-volume tasks) | 3 | 4 | Yes (Work and Codex) | Yes (ChatGPT Work) | Yes | Yes | Yes | Yes |

Retired / deprecated models:

| Name | Status | Replacement |
|------|--------|-------------|
| `gpt-5.5` | Retires from Codex with ChatGPT sign-in on 2026-10-14, noon PDT (19:00 UTC) | Paid plans: `gpt-6.1-sol`; Free and Go: `gpt-6-luna` |
| `gpt-5.4` | Retired 2026-08-31 | `gpt-6-sol` |
| `gpt-5.4-mini` | Retired 2026-08-31 | `gpt-6-luna` |
| `gpt-5.3-codex-spark` | Retired 2026-09-14 | An available model |
| `gpt-5.2`, `gpt-5.3-codex` | Already deprecated (ChatGPT sign-in) | An available model |

## Notes

- Recommended: Astra suits the most demanding workflows; GPT-6.1 Sol offers near-Astra performance at a lower cost; GPT-6.1 Terra is a fast, efficient choice for writing, visual understanding, and computer use; Luna suits focused, repeatable tasks.
- Recommendations apply to ChatGPT Work and Codex. For Chat, see "models in ChatGPT" in the OpenAI Help Center.
- `gpt-6-sol` has no model card on the page; it appears only as the replacement for `gpt-5.4`.
- GPT-6.1 Terra: the card lists the desktop app (Work and Codex), ChatGPT Work on the web, Codex CLI, credits, and API access; it does not list the IDE extension. Requires Codex CLI 0.159.0 or later.
- In the desktop app and ChatGPT Work on the web, start with the default Power setting; move toward **Smarter** for deeper reasoning or **Faster** for faster, lower-cost work. Open **Advanced** to choose a specific model, reasoning effort, or speed (e.g. to try GPT-6.1 Terra, choose it from the model list).
- The six Power presets shown: Luna High, GPT-6 Sol Light, GPT-6 Sol Medium, Astra Light, Astra Medium, Astra Extra High (some paid plans omit Astra Extra High). Available options and defaults vary by plan, client, workspace settings, and rollout.
- GPT-6.1 Sol uses a default context window of 500,000 tokens in Codex and ChatGPT Work.
- GPT-5.5 retirement: the OpenAI API and Codex sessions authenticated with an API key aren't affected. Replace `gpt-5.5` in workspace defaults, saved model settings, managed configurations, custom agents, scheduled tasks, and scripts that select a model.
- `gpt-5.4` / `gpt-5.4-mini`: in Enterprise and Edu, an administrator must enable Luna first. The OpenAI API and Codex authenticated with your own API key aren't affected.
- Custom model provider or gateway: use a compatible Responses API endpoint. Current Codex releases don't support `wire_api = "chat"` or a Chat Completions-only endpoint.
- With API-key authentication, model availability follows your API organization and project; GPT-5.5 remains available through the OpenAI API and in API-key Codex sessions.
- Source: https://learn.chatgpt.com/docs/models (retrieved 2026-11-14).

### Reasoning effort

- For GPT-6.1 Sol, start with the reasoning effort available by default in your client. Start with **High** for Luna or **Light** for Astra. In configuration, Astra's Light setting is `low`.
- **Light** (desktop app, ChatGPT Work on the web, IDE extension) or **Low** (CLI) suits quick, well-scoped tasks. **Medium** balances speed and depth. **High** and **Extra High** suit difficult work with multiple steps, sources, or tradeoffs.
- Reasoning efforts don't map exactly between model generations.
- **Max** gives the selected model more time to reason about a single task. **Ultra** uses subagents to handle separate parts of a complex task in parallel. Most tasks do not need Max or Ultra.
- GPT-6 Luna supports reasoning efforts up to **Max**, but not **Ultra**.
- In the CLI, use `/model`, choose a model, then select **More reasoning…** to see its supported Max or Ultra options.
- If a model supports Ultra but it doesn't appear in the desktop app's model slider, go to **Settings** > **Configuration**, then turn on **Ultra in model picker slider**.

## Related

- [cli.md](./cli.md)
- [ide.md](./ide.md)
- [cloud.md](./cloud.md)
- [best-practices.md](./best-practices.md)
