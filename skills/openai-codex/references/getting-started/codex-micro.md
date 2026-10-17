# Codex Micro

A limited-run hardware keyboard accessory (collaboration with Work Louder) for the ChatGPT desktop app: six illuminated Agent Keys that follow chats and show status, customizable Command Keys, an analog stick, a dial, and voice input — a way to check chats, switch between them, and trigger Codex actions or skills without leaving the keyboard.

## Signature / Usage

Press the rear button once to turn the device on, connect via USB-C or Bluetooth, then follow the setup that appears when ChatGPT detects it. Open **Settings > Codex Micro** to configure the Agent Keys, Command Keys, analog stick, dial, and lighting.

## Options / Props

| Name | Description |
|------|-------------|
| Agent Keys (6) | Each follows a chat and lights up with status (idle/thinking/complete/requires input/error/unassigned). Single press switches to that chat; double press (within 350ms) also brings ChatGPT forward. Arrangement modes: Most recent chats, Pinned chats, Priority chats, Custom assignments (can trigger an action or enabled skill instead of following a chat). |
| Command Keys (6) | Default layout: Fast (toggle Fast mode), Approve, Decline, Fork (continue chat in a new chat), Mic (push-to-talk), Codex (send composer message). Each is remappable to another command or enabled skill. |
| Analog stick | Four directional actions, default: Up = toggle Plan mode, Right/Left = forward/back in app history, Down = toggle sidebar. Remappable per direction. |
| Dial | Modes: Composer navigation (default), Reasoning only, Conversation scrolling, Custom assignments. Press-and-hold opens device settings (except in Custom assignments mode). |

## Notes

- Bluetooth pairing: three Bluetooth channels. Press the rear button once, press and hold the touch control on the bottom-left edge for three seconds (lighting turns blue), tap to choose channel 1, 2, or 3 (fast-flashing channel light = ready to pair), connect in the computer's Bluetooth settings, and wait for the channel light to turn solid. The connection selector closes after five seconds without input. For USB-C, tap the touch control until the lighting turns white; plugging in a cable while in Bluetooth mode only charges it.
- Settings: press and hold the dial (default) or select the Micro icon beside your account name at the bottom of ChatGPT. Work Louder Input isn't required for the ChatGPT integration.
- Agent Key status lights: White idle, Blue thinking, Green complete (unread update), Amber requires input, Red error, Off no assigned chat. A single press switches chats without bringing ChatGPT forward (enable **Focus ChatGPT with a single tap** to change that). Custom assignments: an unassigned Agent Key opens a new chat and ChatGPT assigns it to that key.
- Mic key: default **Push to talk** (hold, then release); press twice within 350 ms for hands-free recording. Lighting: sea-green while recording, moving white while processing, solid white when ready; press the Codex key to send. If **Voice Chat** is available under **Microphone key**, the Mic key can start a Voice Chat or toggle the microphone (press and hold to end); **Use separate microphone keys** maps the two switches under the wide Mic key independently.
- Remapping: select a Command Key in the **Layout** preview and choose its keycap and action (open the browser or terminal, manage chats, review changes, run Git and PR actions, attach files or photos, open plugins or scheduled tasks, change reasoning effort, run an enabled skill, or another shortcut); choosing a keycap already in use swaps the two. **Reset layout** restores the default Command Key and analog stick assignments without changing the Agent Key mode or custom chat assignments.
- Dial: when a composer control or menu is open the Agent Key right of the dial lights red (press to cancel). Modes: Composer navigation, Reasoning only, Conversation scrolling (press to jump to the latest message), Custom assignments (left turn, right turn, press, long press).
- Lighting: adjust **Brightness** and **Auto-dim** (30 seconds to one hour, or off; default off after three minutes); battery status appears in device settings and beside the Micro icon when reported.
- Add more layers: ChatGPT uses layer 1; use Work Louder Input to configure up to five more layers for other apps.
- Troubleshooting on macOS: if Input Monitoring isn't set up, open **System Settings > Privacy & Security > Input Monitoring**, enable (or add) ChatGPT, quit and reopen ChatGPT, and confirm it detects the Micro on layer 1. For connection interference, ChatGPT retries automatically; reconnect the Micro and check for keyboard utilities or security tools blocking access (Work Louder notes Karabiner and Logitech Options+ can interfere when they have Input Monitoring permission; ask IT to check device rules on managed computers).
- Get a compatible Micro through OpenAI Supply Co; the ChatGPT desktop app also supports Creator Micro 2, available directly from Work Louder.
- macOS requires granting **Input Monitoring** to ChatGPT (System Settings > Privacy & Security > Input Monitoring) for key presses to register.
- Mic key uses the host computer's microphone; the device has no microphone of its own.
- Support for Bluetooth/cable/power issues comes from Work Louder (`hello@worklouder.cc`), not OpenAI Support.
- Source: https://learn.chatgpt.com/docs/features/codex-micro (retrieved 2026-10).

## Related

- [Best practices](./best-practices.md)
