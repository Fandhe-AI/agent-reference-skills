<!-- source: https://code.claude.com/docs/en/voice-dictation.md / last verified: 2026-08-07 -->

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
- Dictation language follows the `language` setting (defaults to English if unset); supports cs/da/nl/en/fr/de/el/hi/id/it/ja/ko/no/pl/pt/ru/es/sv/tr/uk.
- Also works in agent view (peek-and-reply) to dictate to a background session.

## Related

- [interactive-mode](./interactive-mode.md)
