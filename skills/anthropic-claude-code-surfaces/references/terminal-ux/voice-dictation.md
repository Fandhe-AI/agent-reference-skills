<!-- source: https://code.claude.com/docs/en/voice-dictation.md / last verified: 2026-10-17 -->

# Voice dictation

Speak prompts in the Claude Code CLI with hold-to-record or tap-to-record dictation; speech streams live into the prompt input and can mix with typing.

## Signature / Usage

```bash
/voice          # toggle on/off, keep current mode
/voice hold      # enable hold-to-record (default)
/voice tap       # enable tap-to-record-and-send
/voice off       # disable
```

```json
{
  "voice": { "enabled": true, "mode": "tap", "autoSubmit": true },
  "language": "japanese"
}
```

## Options / Props

| Requirement | Detail |
| --- | --- |
| Account | claude.ai account (not available with API key, Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry) |
| Compliance | Organization must not have HIPAA compliance enabled |
| Microphone | Local mic required; not available in Claude Code on the web or SSH sessions |
| WSL | Requires WSLg (WSL2 via Microsoft Store); WSL1 unsupported |

| Mode | Behavior |
| --- | --- |
| Hold (default) | Hold `Space` to record, release to finalize; `autoSubmit: true` sends automatically if 3+ words |
| Tap | Tap `Space` to start, tap again to stop; auto-submits if transcript is 3+ words |

## Notes

- Transcription streams audio to Anthropic servers (not processed locally); doesn't consume Claude messages/tokens or count toward `/usage` limits.
- Rebind the dictation key via `voice:pushToTalk` in `~/.claude/keybindings.json`; avoid bare letter keys in hold mode since hold detection relies on key-repeat.
- Dictation language follows the `language` setting (defaults to English if unset); supports cs/da/nl/en/fr/de/el/hi/id/it/ja/ko/no/pl/pt/ru/es/sv/tr/uk. If `language` is not in the supported list, `/voice` warns on enable and falls back to English for dictation. In the VS Code extension, when `language` is empty, dictation uses VS Code's `accessibility.voice.speechLanguage` before defaulting to English.
- Also works in agent view (peek-and-reply) to dictate to a background session.
- The VS Code extension also supports voice dictation with the same claude.ai account requirement, but not in VS Code Remote sessions (SSH, Dev Containers, Codespaces), because the microphone is on your local machine and the extension runs on the remote host.
- The three-word auto-submit threshold counts individual words for Japanese, Chinese, and Thai transcripts.
- A custom `voice:pushToTalk` binding replaces the default `Space` (one key at a time, so `"space": null` is optional). `Caps Lock` can't be bound (an error is shown).
- Troubleshooting: under WSLg, SoX needs its PulseAudio backend, so run `sudo apt install sox libsox-fmt-pulse` (`sox` alone pulls in the ALSA backend, which can't record on WSL). `Voice stream error: WebSocket upgrade rejected with HTTP <status>` means a server refused the connection (a 400-range status usually means a stale sign-in, or a proxy or bot-protection service answering in place of the transcription service); run `/login` and check for a VPN or proxy.

## Related

- [interactive-mode](./interactive-mode.md)
