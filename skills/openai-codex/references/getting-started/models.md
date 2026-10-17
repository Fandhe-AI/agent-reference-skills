# Models

Meet the AI models that power ChatGPT Work and Codex, and how to choose between them across the desktop app, ChatGPT Work on the web, Codex CLI, and the IDE extension.

## Signature / Usage

```bash
# Choose a model / reasoning effort for a CLI run
codex --model gpt-6.1-sol
codex exec -m gpt-6.1-sol "Review the current changes"
```

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

- Recommended: use GPT-6.1 Sol when available to your account and client for complex coding and agentic workflows; Luna for focused, repeatable tasks; Astra when a task needs the strongest capability across steps and tools.
- In ChatGPT, GPT-6.1 Sol, GPT-6 Sol, and GPT-6 Luna are available in Work and Codex. They aren't available in Chat.
- GPT-5.6 Sol, GPT-5.6 Terra, and GPT-5.6 Luna remain available during the rollout. Selecting a new model doesn't change workspace permissions or grant access to it.
- `gpt-6-sol` has no model card on the page; it appears only as the replacement for `gpt-5.4`.
- GPT-6.1 Sol launch rollout: Plus, Pro, Business, Enterprise, and Edu in Codex in the desktop app and CLI, and ChatGPT Work on the web and mobile. Enterprise and Edu keep it off by default until an administrator enables it. Free and Go are not included at launch.
- Standard and Fast modes are available where supported. Ultrafast is available on Pro $500 and eligible Enterprise and Edu plans (see speed.md).
- GPT-5.5 retirement: the OpenAI API and Codex sessions authenticated with an API key aren't affected. Replace `gpt-5.5` in workspace defaults, saved model settings, managed configurations, custom agents, scheduled tasks, and scripts that select a model.
- `gpt-5.4` / `gpt-5.4-mini`: in Enterprise and Edu, an administrator must enable Luna first. The OpenAI API and Codex authenticated with your own API key aren't affected.
- Custom model provider or gateway: use a compatible Responses API endpoint. Current Codex releases don't support `wire_api = "chat"` or a Chat Completions-only endpoint.
- With API-key authentication, model availability follows your API organization and project; GPT-5.5 remains available through the OpenAI API and in API-key Codex sessions.
- Source: https://learn.chatgpt.com/docs/models (retrieved 2026-10).

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
