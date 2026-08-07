# Application card - Windows Studio Effects

Responsible-AI transparency card for Windows Studio Effects, a suite of NPU-accelerated real-time camera/microphone effects (Background Blur, Eye Contact, Automatic Framing, Voice Focus, Portrait Light, Creative Filters) for video calls and recordings.

## Signature / Usage

No API surface — this is a Responsible AI transparency document for a Windows platform feature, not a developer API. It integrates with apps such as Microsoft Teams and is managed via Settings > Camera and Quick Settings.

## Options / Props

| Feature | Modes / Variants | Availability |
|------|-------------|------|
| Automatic framing | — | All NPU-enabled devices |
| Eye Contact | Standard (subtle gaze correction); Teleprompter (AI-driven, maintains eye contact while reading) | Standard: all NPU-enabled; Teleprompter: Snapdragon Copilot+ PCs only |
| Background Effects | Standard Blur; Portrait Blur (depth blur) | All NPU-enabled devices |
| Portrait Light | — | Snapdragon Copilot+ PCs only |
| Creative Filters | Illustrated, Animated, Watercolor | Snapdragon Copilot+ PCs only |
| Voice Focus | — | NPU devices with 40+ TOPS |

## Notes

- This is an **Application Card** (not a Platform Card) — distinguishes end-user AI features from underlying AI platform services.
- Devices with an NPU under 40 TOPS support only Background effects, standard Eye Contact, and Automatic Framing.
- Performance depends on lighting, subject/background contrast, and stable audio input; poor conditions degrade blur/eye-contact/voice-isolation accuracy.
- Powered by proprietary on-device computer-vision models maintained by Microsoft; no cloud dependency for the effects themselves.

## Related

- [Device requirements and fallback](./device-requirements.md)
- [Responsible AI guidelines](./responsible-ai.md)
