# ChatGPT Voice

Powered by GPT-Live, ChatGPT Voice lets you talk through ideas and coordinate tasks in Chat, Work, and Codex in the ChatGPT desktop app: start work, check progress, or change direction by speaking.

## Signature / Usage

```text
Start a Codex task to run the tests and investigate anything that doesn't pass.
```

1. Open the Codex task (or start a new chat or task) in the desktop app.
2. Select **Start voice chat** (existing task) or **Start new voice chat** (new chat or task).
3. First time: allow microphone access, choose a voice, review screen context on macOS.
4. Talk; select **Stop voice chat** when finished. Hotkey: **Settings > Voice > Voice chat hotkey**.

## Options / Props

| Setting / ability | Detail |
|-------------------|--------|
| Plans | Desktop app with ChatGPT Plus, Pro, Business, Edu, Enterprise (Enterprise/Edu begin with a two-week early-access period); also via Codex on iOS after pairing with a desktop host. Depends on rollout and workspace settings. |
| Delegation | Starts separate tasks for longer work, checks tasks, sends follow-ups, and reports progress, blockers, results back into the voice conversation. |
| Switch tasks | "Let me talk to the task reviewing the tests", then "Take me back to the previous task." The destination task must support voice and be on a connected host. |
| Screen context (macOS) | **Settings > Voice > Screen context**; say "Take a look at this" to take an appshot of the frontmost window (image plus accessible text, including content outside the visible scroll area). May need **Screen & System Audio Recording** and **Accessibility** permissions; organizations can disable it. |

## Notes

- Voice uses the same permissions as the tasks it directs and the existing task's conversation and selected model.
- Voice in existing Codex tasks is rolling out; if **Start voice chat** is missing, update the desktop app and the Codex host, or start a new voice chat, or use voice dictation (prompt text only).
- Only one voice chat can be active across the desktop app at a time; troubleshoot plan/rollout/workspace availability, microphone permissions, and other windows with an active voice chat.
- Source: https://learn.chatgpt.com/docs/features/voice (retrieved 2026-11-14).

## Related

- [Pets](./pets.md)
- [Computer Use](./computer-use.md)
- [Desktop app](../getting-started/desktop-app.md)
