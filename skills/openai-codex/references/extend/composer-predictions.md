# Composer Predictions

Autocomplete-style suggestions for your next message in the Codex desktop app. After Codex responds, it suggests a follow-up prompt in the message box based on the current conversation.

## Signature / Usage

```text
Settings → General → Composer → Show predictions
```

Press **Tab** to accept the suggestion as an editable draft (it is not sent); or just type your own message.

## Options / Props

| Item | Detail |
|------|--------|
| Availability | Beta; users aged 18+ on personal ChatGPT Pro plans in supported regions; local and SSH threads in the Codex desktop app with GPT-6 Astra, GPT-6.1 Sol, and GPT-6.1 Terra. |
| Default | Enabled by default for eligible users; toggle **Show predictions**. |
| Requirements | Updated Codex desktop app and a signed-in personal ChatGPT Pro account. |

## Notes

- Predictions use only the current thread; they don't look up memories or retrieve from connected apps themselves. Memory context already in the thread can personalize them; they work with memory off.
- Generating predictions doesn't count toward Codex usage limits or consume credits; sending a message (including an accepted prediction) is billed normally.
- Setup and troubleshooting: https://help.openai.com/en/articles/20001601-composer-predictions-in-codex
- Source: https://learn.chatgpt.com/docs/features/composer-predictions (retrieved 2026-11-14).

## Related

- [Desktop app](../getting-started/desktop-app.md)
- [Voice](./voice.md)
