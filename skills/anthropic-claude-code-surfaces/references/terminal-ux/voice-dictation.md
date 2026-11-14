<!-- source: https://code.claude.com/docs/en/voice-dictation.md / last verified: 2026-11-14 -->

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
  "voice": {
    "enabled": true,
    "mode": "tap"
  }
}
```

```json
{
  "language": "japanese"
}
```

## Options / Props

| Requirement | Detail |
| --- | --- |
| Account | claude.ai account (not available with an Anthropic API key, Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry) |
| Microphone | Local mic required; not available in cloud sessions or SSH sessions |
| WSL | Requires WSLg (WSL2 via Microsoft Store on Windows 10 or 11); WSL1 unsupported, use native Windows |

| Mode | Behavior |
| --- | --- |
| Hold (default) | Hold `Space` to record, release to finalize and insert the transcript at the cursor; set `"autoSubmit": true` in the `voice` settings object to send automatically if 3+ words |
| Tap | Tap `Space` on an empty prompt to start, tap again to stop; auto-submits if transcript is 3+ words (shorter transcripts are inserted, not sent). No warmup. Recording also stops after 15 seconds of silence or two minutes total |

## Notes

- Transcription streams audio to Anthropic servers (not processed locally); doesn't consume Claude messages/tokens or count toward `/usage` limits. Audio recording uses a built-in native module on macOS, Linux, and Windows; on Linux it falls back to `arecord` (ALSA utils) or `rec` (SoX), and `/voice` prints an install command if neither exists.
- Enabling runs a microphone check (macOS shows the system permission prompt). For the first three sessions with dictation enabled the footer shows a `hold space to speak` hint when the prompt is empty (not with a custom status line). Transcription is tuned for coding vocabulary and adds your project name and git branch name as recognition hints.
- Hold mode detects a held key from rapid key-repeat, so there is a brief warmup (`keep holding…` then `listening…`); the first key-repeat characters are removed when recording activates. Speech appears dimmed until finalized. `Space` starts dictation only where it would otherwise type into the prompt (not in the transcript viewer or vim non-INSERT modes; a modifier combination such as `meta+k` works there too and skips the warmup).
- Cancel with `Esc` or `Ctrl+C`: the microphone stops, the transcript is discarded, and the prompt is restored; neither key does anything else in that press. Both also cancel while a finished recording is processing.
- Rebind the dictation key via `voice:pushToTalk` in the `Chat` context of `~/.claude/keybindings.json`; avoid bare letter keys in hold mode since hold detection relies on key-repeat. A custom binding replaces the default `Space` (one key at a time, so `"space": null` is optional). `Caps Lock` can't be bound (an error is shown).
- Dictation language follows the `language` setting (BCP 47 code or name; defaults to English if unset); supports cs/da/nl/en/fr/de/el/hi/id/it/ja/ko/no/pl/pt/ru/es/sv/tr/uk. If `language` is not in the supported list, `/voice` warns on enable and falls back to English for dictation (Claude's text responses are unaffected). In the VS Code extension, when `language` is empty, dictation uses VS Code's `accessibility.voice.speechLanguage` before defaulting to English.
- Also works in hold mode in agent view (peek-and-reply) to dictate to a background session.
- The VS Code extension also supports voice dictation with the same claude.ai account requirement, but not in VS Code Remote sessions (SSH, Dev Containers, Codespaces). There a recording ends after 15 seconds with no recognized words, or two minutes after it starts.
- The three-word auto-submit threshold counts individual words for Japanese, Chinese, and Thai transcripts.
- `Unknown command: /voice` means a claude.ai account isn't the active sign-in (`ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, an `apiKeyHelper`, or a third-party provider takes precedence); run `/login`. `Voice mode is disabled by your organization's policy` means an administrator turned dictation off.
- Troubleshooting: under WSLg, SoX needs its PulseAudio backend, so run `sudo apt install sox libsox-fmt-pulse` (`sox` alone pulls in the ALSA backend, which can't record on WSL). On Linux, `Voice mode requires a microphone, but SoX could not open an audio capture device` means no capture device (v2.1.195+). `Voice input is failing repeatedly and has been paused` follows three failures within 10 seconds (before v2.1.202 only start-up failures counted). In hold mode, if spaces keep accumulating dictation is off (`/voice hold`); if one or two spaces appear then nothing, key-repeat is disabled at the OS level, so use `/voice tap`. `Voice stream error: WebSocket upgrade rejected with HTTP <status>` means a server refused the connection (a 400-range status usually means a stale sign-in, or a proxy or bot-protection service answering in place of the transcription service); run `/login` and check for a VPN or proxy.
- If your terminal isn't listed under macOS System Settings → Privacy & Security → Microphone: run `tccutil reset Microphone <bundle-id>` (`com.apple.Terminal`, `com.googlecode.iterm2`; others via `osascript -e 'id of app "AppName"'`), quit the terminal with `Cmd+Q`, relaunch, and run `/voice`. Running `tccutil reset Microphone` without a bundle ID revokes microphone access from every app.
- Source: https://code.claude.com/docs/en/voice-dictation.md (fetched 2026-11-14). The earlier "organization must not have HIPAA compliance enabled" requirement does not appear in the current source and was removed.

## Related

- [interactive-mode](./interactive-mode.md)
