# Run Hermes Agent with Nous Portal

Start-to-finish walkthrough: subscribe, set up, switch models, enable Tool Gateway routing, and verify.

## Signature / Usage

```bash
hermes setup --portal      # OAuth login, stores token in ~/.hermes/auth.json, sets model.provider: nous, enables Tool Gateway
hermes portal info         # verify auth, model, and per-tool routing
hermes chat
```

Model switching:

```bash
/model anthropic/claude-sonnet-4.6
/model openai/gpt-5.4
/model google/gemini-2.5-pro
/model deepseek/deepseek-v3.2
/model anthropic/claude-opus-4.6
hermes config set model.default anthropic/claude-sonnet-4.6
```

Tool Gateway routing and voice:

```bash
hermes tools           # per tool: "Nous Subscription" or your own key (e.g. Browserbase)
hermes portal tools    # per-tool routing view
hermes setup tts       # pick "Nous Subscription" for TTS
```

Remote hosts:

```bash
ssh -N -L 8642:127.0.0.1:8642 user@remote-host    # local terminal
hermes setup --portal                             # on the remote
hermes auth add nous --type oauth                 # device-code alternative
```

Cron on the subscription:

```bash
hermes cron create "0 9 * * *" \
  "Search the web for top AI news and summarize the 5 most important stories" \
  --name "Daily AI news"
```

## Notes

- No per-vendor keys needed (OpenAI, Anthropic, search, FAL, Browser Use).
- Do not pick Hermes-4-70B / Hermes-4-405B for agent work: they are chat/reasoning models, not tool-call-tuned; use frontier agentic models for Hermes Agent.
- Tool Gateway is opt-in per tool; picking "Nous Subscription" without a session runs the Portal login inline without changing your inference provider.
- Each profile is an independent credential island and fails closed without its own sign-in (`hermes -p <name> portal`; offers to import an existing shared session). Separate users have separate `~/.hermes/auth.json`.
- Troubleshooting: "not logged in" (run `hermes portal`); provider drift (`hermes config set model.provider nous` or `hermes model`); partner names in routing (`hermes tools`); "Re-authentication required" (refresh token quarantined locally; `hermes auth add nous`); missing model (type the OpenRouter-style slug); billing missing (check `model.provider`, OAuth fallback, `hermes profile list`); start clean with `hermes auth logout nous`.
- The model catalog draws on OpenRouter's 300+ models plus models served via proprietary or secondary providers.

## Related

- [oauth-over-ssh](./oauth-over-ssh.md)
- [manage-hermes-cloud-with-mcp](./manage-hermes-cloud-with-mcp.md)
- [desktop-native-signin](./desktop-native-signin.md)
