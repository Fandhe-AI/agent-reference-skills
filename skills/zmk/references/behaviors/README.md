# Keymap Behaviors

| Name | Binding(s) | Description | Path |
|------|-----------|-------------|------|
| Overview | — | What behaviors are and how they are used in ZMK keymaps | [overview.md](./overview.md) |
| Key Press | `&kp` | Send standard HID keycodes | [key-press.md](./key-press.md) |
| Hold-Tap | `&mt`, `&lt` | Different action on hold vs. tap; mod-tap and layer-tap | [hold-tap.md](./hold-tap.md) |
| Layers | `&mo`, `&to`, `&tog` | Momentary, to-layer, and toggle layer activation | [layers.md](./layers.md) |
| Macros | `&macro_*` | Sequences of behaviors executed on key press/release | [macros.md](./macros.md) |
| Mod-Morph | `&gresc` | Different action depending on held modifiers | [mod-morph.md](./mod-morph.md) |
| Sticky Key | `&sk` | One-shot modifier key (stays active until next keypress) | [sticky-key.md](./sticky-key.md) |
| Sticky Layer | `&sl` | One-shot layer activation | [sticky-layer.md](./sticky-layer.md) |
| Tap-Dance | `&td` | Different action per consecutive tap count | [tap-dance.md](./tap-dance.md) |
| Mouse Emulation | `&mkp`, `&mmv`, `&msc` | Mouse button, pointer movement, and scroll | [mouse-emulation.md](./mouse-emulation.md) |
| Key Repeat | `&key_repeat` | Resend the last transmitted keycode | [key-repeat.md](./key-repeat.md) |
| Key Toggle | `&kt` | Toggle a key between pressed and released state | [key-toggle.md](./key-toggle.md) |
| Caps Word | `&caps_word` | Smart caps-lock that auto-deactivates on non-word keys | [caps-word.md](./caps-word.md) |
| Output Selection | `&out` | Choose between USB and Bluetooth output | [outputs.md](./outputs.md) |
| Bluetooth | `&bt` | Manage Bluetooth connection profiles | [bluetooth.md](./bluetooth.md) |
| Backlight | `&bl` | Control per-key LED backlight brightness | [backlight.md](./backlight.md) |
| RGB Underglow | `&rgb_ug` | Control RGB underglow color, brightness, and effects | [underglow.md](./underglow.md) |
| External Power | `&ext_power` | Toggle VCC power to external peripherals (battery saving) | [power.md](./power.md) |
| Reset | `&sys_reset`, `&bootloader` | Restart firmware or enter bootloader mode | [reset.md](./reset.md) |
| Soft Off | `&soft_off` | Force keyboard into deep low-power off state | [soft-off.md](./soft-off.md) |
| ZMK Studio Unlock | `&studio_unlock` | Unlock device for live editing via ZMK Studio | [studio-unlock.md](./studio-unlock.md) |
| Sensor Rotation | `&inc_dec_kp` / custom | Encoder clockwise/counter-clockwise behavior | [sensor-rotate.md](./sensor-rotate.md) |
| Miscellaneous | `&trans`, `&none` | Transparent passthrough and event block | [misc.md](./misc.md) |
