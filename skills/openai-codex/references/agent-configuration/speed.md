# Speed

You can increase model speed in Codex in exchange for higher usage: Fast mode and Ultrafast mode.

## Signature / Usage

```text
/fast on
/fast off
/fast status
/statusline
```

```toml
# config.toml
service_tier = "fast"
[features]
fast_mode = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `/fast on` \| `/fast off` \| `/fast status` | CLI command | Change or inspect the current Fast mode setting. |
| `/statusline` | CLI command | Show Fast mode in the footer. |
| `service_tier = "fast"` | config.toml | Persists Fast mode as the default. |
| `[features].fast_mode` | boolean (config.toml) | Enables Fast mode alongside `service_tier`. |

## Notes

- **Fast mode:** Fast mode speeds up supported models, including GPT-6.1 Sol, GPT-6 Astra, GPT-6 Sol, and GPT-6 Luna, where available. For GPT-5.6, the speed increase is 1.5x.
- Available in the ChatGPT desktop app, Codex CLI, and IDE extension when you sign in with ChatGPT.
- Billing: Fast mode uses included subscription limits at 2.5x the Standard rate. Purchased credits and Enterprise pay-as-you-go usage are billed at 2x the Standard rate.
- **Ultrafast mode:** Ultrafast supports GPT-6 Astra and GPT-6.1 Sol. GPT-6 Astra Ultrafast generates tokens up to 8x faster than GPT-6 Astra in Standard mode in Codex.
- Available in Codex and ChatGPT Work on Pro $500 and eligible Enterprise and Edu plans. On Pro $500, Ultrafast uses your included usage first, then your available credits.
- Billing: included subscription limits at 8x the Standard rate; purchased credits and Enterprise pay-as-you-go usage at 6x.
- Enterprise workspaces: off by default. Workspace owners can enable access for selected users or the workspace through workspace permissions. Existing per-user spend controls apply to eligible Ultrafast usage.
- Eligible Enterprise workspaces use credit-based or USD usage-based agreements. Eligible Edu plans use credits. Legacy Enterprise plans that rely on rate limits instead of usage-based billing aren't supported. Other self-serve plans don't have access at launch, even with purchased credits.
- Inference residency: GPT-6.1 Sol Ultrafast supports the United States and Europe (EEA + Switzerland); GPT-6 Astra Ultrafast supports the United States only.
- **Billing and API:** ChatGPT Work and Codex share the same pricing, credits, and usage limits.
- With an API key, Codex uses API token pricing instead, and ChatGPT credit multipliers don't apply. For API availability, request configuration, and pricing, see "Ultrafast mode in the API" in the OpenAI API docs (https://developers.openai.com/api/docs/guides/ultrafast-mode).
- **Retirement and migration:** `gpt-5.3-codex-spark` (Codex-Spark) retired on 2026-09-14 (see models.md).
- GPT-5.5 retires from Codex with ChatGPT sign-in on October 14, 2026, at noon PDT (19:00 UTC). The OpenAI API and Codex sessions authenticated with an API key aren't affected.
- Source: https://learn.chatgpt.com/docs/agent-configuration/speed (retrieved 2026-10). Codex-Spark retirement: https://learn.chatgpt.com/docs/changelog#codex-2026-09-14-codex-spark-deprecation

## Related

- [Subagents](./subagents.md)
- [Models](../getting-started/models.md)
