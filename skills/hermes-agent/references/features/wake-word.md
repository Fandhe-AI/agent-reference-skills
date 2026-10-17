# Wake Word

Hands-free "Hey Hermes" trigger for the CLI, TUI and desktop app. An on-device hotword listener starts a fresh session, opens the microphone, captures one utterance through the voice pipeline and answers. Off by default; no audio leaves the machine until you speak a command.

## Signature / Usage

```text
/wake on        # start listening (installs the engine on first use)
/wake status    # phrase, provider and state
/wake off       # stop listening
```

```yaml
wake_word:
  enabled: false
  surface: auto               # "auto" | "cli" | "tui" | "gui"
  input_device: null          # PortAudio index or device-name substring; null = process default
  capture: auto               # auto | local | client
  provider: auto              # auto | openwakeword | sherpa | porcupine
  phrase: "hey hermes"        # cosmetic label except for sherpa
  sensitivity: 0.6            # 0.0-1.0, higher = stricter
  confirmation_frames: 3      # openWakeWord only
  start_new_session: true
  profile_routing: true       # sherpa: one listener can wake any profile
  openwakeword:
    model: hey_hermes         # bundled default, or absolute path to a custom .tflite
  porcupine:
    keyword: jarvis           # built-in keyword OR path to a custom .ppn
```

## Engines

| Engine | Cost | API key | Notes |
|--------|------|---------|-------|
| openWakeWord | Free | None | TFLite via `pyopen-wakeword`; bundled "hey hermes" model; custom models need a `.tflite`; not available on Intel macOS or native Windows ARM64 |
| sherpa | Free | None | Open-vocabulary typed phrases; downloads a ~13 MB English model on first use; supports native Windows ARM64 |
| Porcupine | Free tier / paid | `PORCUPINE_ACCESS_KEY` | Picovoice; built-in keywords + custom `.ppn`; default keyword is "jarvis" |

`auto` selects the first platform-supported engine in order openWakeWord, sherpa, Porcupine (platform of the Python backend). An explicit provider stays selected and reports requirement errors instead of switching silently; opt into auto with `hermes config set wake_word.provider auto`.

## Notes

- Toggling via `/wake` or the desktop ear button also writes `wake_word.enabled` to `config.yaml`. The toggle refuses to arm until both STT and TTS are ready (`hermes tools`, Voice section).
- Remote desktop: the GUI passes `client_capture: true` on `wake.start`; the desktop streams 16 kHz mono int16 PCM via the `wake.feed` RPC and the backend emits `wake.detected`. CLI and TUI keep local capture unless `capture: client`.
- Only one surface listens at a time (first eligible claimant is sticky; no silent failover). Not available in the messaging gateway (no microphone).
- False triggers: raise `confirmation_frames` (4-5) or `sensitivity` (toward 0.8). sherpa and Porcupine ignore `confirmation_frames`.
- With sherpa, every profile with `wake_word.enabled: true` is enrolled with phrase `hey <profile name>` by default and the desktop live-switches profiles; set `wake_word.profile_routing: false` to opt out. CLI and TUI print `hermes -p <profile>` instead of routing.
- Desktop: saying "stop", "never mind", "goodbye", "cancel" or "that's all" ends a hands-free voice conversation (whole-utterance match only).
- macOS grants microphone access per process; the Python backend needs its own grant (`/wake status` reports "mic delivers only silence"). On Windows set `wake_word.input_device` (`hermes config set wake_word.input_device "Microphone Array"`).
- Requires `sounddevice` + `numpy`, an STT provider and a TTS provider; engine dependencies auto-install via PM unless `security.allow_lazy_installs` is off.

## Related

- [Voice Mode](./voice-mode.md)
- [TTS](./tts.md)
