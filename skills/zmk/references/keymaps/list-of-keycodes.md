# List of Keycodes

Reference of all keycodes available for use with `&kp` and other behaviors. Keycodes map to USB HID usage IDs. Platform compatibility is indicated per keycode (W = Windows, L = Linux, A = Android, m = macOS, i = iOS).

## Signature / Usage

```devicetree
&kp A          // Letter A
&kp NUMBER_1   // Digit 1
&kp F5         // Function key F5
&kp C_VOL_UP   // Volume up (consumer control)
&kp KP_N0      // Keypad 0
```

## Keycode Categories

### Letters

`A` – `Z` (26 keys). Aliases match the uppercase letter directly (e.g., `A`, `B`, … `Z`).

### Numbers

| Keycode | Aliases |
|---------|---------|
| `NUMBER_0`–`NUMBER_9` | `N0`–`N9` |

### Symbols / Punctuation

| Keycode | Notes |
|---------|-------|
| `EXCLAMATION` | `EXCL`, `LS(N1)` |
| `AT_SIGN` | `AT`, `LS(N2)` |
| `HASH` | `POUND`, `LS(N3)` |
| `DOLLAR` | `DLLR`, `LS(N4)` |
| `PERCENT` | `PRCNT`, `LS(N5)` |
| `CARET` | `LS(N6)` |
| `AMPERSAND` | `AMPS`, `LS(N7)` |
| `ASTERISK` | `ASTRK`, `STAR`, `LS(N8)` |
| `LEFT_PARENTHESIS` / `RIGHT_PARENTHESIS` | `LPAR` / `RPAR` |
| `LEFT_BRACKET` / `RIGHT_BRACKET` | `LBKT` / `RBKT` |
| `LEFT_BRACE` / `RIGHT_BRACE` | `LBRC` / `RBRC` |
| `SINGLE_QUOTE` / `DOUBLE_QUOTES` | `SQT` / `DQT` |
| `SEMICOLON` | `SEMI` |
| `COLON` | `LS(SEMI)` |
| `COMMA` | |
| `PERIOD` | `DOT` |
| `SLASH` | `FSLH` |
| `BACKSLASH` | `BSLH` |
| `PIPE` | `LS(BSLH)` |
| `GRAVE` | `TILDE` (via `LS(GRAVE)`) |
| `MINUS` / `UNDERSCORE` | `UNDER` = `LS(MINUS)` |
| `PLUS` / `EQUAL` | `PLUS` = `LS(EQUAL)` |
| `LESS_THAN` / `GREATER_THAN` | `LT` / `GT` |
| `QUESTION` | `QMARK`, `LS(FSLH)` |

### Control & Whitespace

| Keycode | Aliases |
|---------|---------|
| `ESCAPE` | `ESC` |
| `RETURN` | `ENTER` |
| `SPACE` | `SPC` |
| `TAB` | |
| `BACKSPACE` | `BSPC` |
| `DELETE` | `DEL` |
| `INSERT` | `INS` |

### Navigation

| Keycode | Aliases |
|---------|---------|
| `HOME` | |
| `END` | |
| `PAGE_UP` | `PG_UP` |
| `PAGE_DOWN` | `PG_DN` |
| `UP_ARROW` | `UP` |
| `DOWN_ARROW` | `DOWN` |
| `LEFT_ARROW` | `LEFT` |
| `RIGHT_ARROW` | `RIGHT` |

### Modifiers (standalone keys)

| Keycode | Aliases |
|---------|---------|
| `LEFT_SHIFT` | `LSHIFT`, `LSHFT` |
| `RIGHT_SHIFT` | `RSHIFT`, `RSHFT` |
| `LEFT_CONTROL` | `LCTRL`, `LCTL` |
| `RIGHT_CONTROL` | `RCTRL`, `RCTL` |
| `LEFT_ALT` | `LALT` |
| `RIGHT_ALT` | `RALT` |
| `LEFT_GUI` | `LGUI`, `LWIN`, `LCMD` |
| `RIGHT_GUI` | `RGUI`, `RWIN`, `RCMD` |

See [Modifiers](./modifiers.md) for modifier functions like `LS(x)`, `LC(x)`, etc.

### Locks

| Keycode | Aliases |
|---------|---------|
| `CAPSLOCK` | `CAPS` |
| `SCROLLLOCK` | `SLCK` |
| `KP_NUMLOCK` | `KP_NUM` |
| `LOCKING_CAPS` | `LCLK` |
| `LOCKING_SCROLL` | `LSLK` |
| `LOCKING_NUM` | `LNLK` |

### Function Keys

`F1`–`F24`

### Keypad

| Keycode | Notes |
|---------|-------|
| `KP_N0`–`KP_N9` | Numpad digits |
| `KP_PLUS`, `KP_MINUS` | |
| `KP_MULTIPLY` | `KP_ASTERISK` |
| `KP_DIVIDE` | `KP_SLASH` |
| `KP_DOT` | |
| `KP_ENTER` | |
| `KP_EQUAL` | |
| `KP_LEFT_PARENTHESIS` / `KP_RIGHT_PARENTHESIS` | |

### Editing

| Keycode | Aliases / Notes |
|---------|-----------------|
| `C_AC_CUT` | `K_CUT` |
| `C_AC_COPY` | `K_COPY` |
| `C_AC_PASTE` | `K_PASTE` |
| `C_AC_UNDO` | `K_UNDO` |
| `C_AC_REDO` | `K_AGAIN`, `K_REDO` |

### Media / Consumer Controls

| Keycode | Description |
|---------|-------------|
| `C_VOLUME_UP` | `C_VOL_UP` |
| `C_VOLUME_DOWN` | `C_VOL_DN` |
| `C_MUTE` | |
| `C_PLAY_PAUSE` | `C_PP` |
| `C_NEXT` | |
| `C_PREVIOUS` | `C_PREV` |
| `C_FAST_FORWARD` | `C_FF` |
| `C_REWIND` | `C_RW` |
| `C_BRIGHTNESS_INC` | `C_BRI_UP`, `C_BRI_INC` |
| `C_BRIGHTNESS_DEC` | `C_BRI_DN`, `C_BRI_DEC` |
| `C_BACKLIGHT_TOGGLE` | `C_BKL_TOG` |
| `C_MENU` | |

### Application Launch

| Keycode | Description |
|---------|-------------|
| `C_AL_WWW` | Open browser |
| `C_AL_EMAIL` | Open email client |
| `C_AL_CALCULATOR` | `C_AL_CALC` |
| `C_AC_HOME` | Browser home |
| `C_AC_BOOKMARKS` | |
| `C_AC_SEARCH` | |

### Input Assist

| Keycode | Description |
|---------|-------------|
| `C_KEYBOARD_INPUT_ASSIST_NEXT` | Next input suggestion |
| `C_KEYBOARD_INPUT_ASSIST_PREVIOUS` | Previous input suggestion |
| `C_KEYBOARD_INPUT_ASSIST_NEXT_GROUP` | Next suggestion group |
| `C_KEYBOARD_INPUT_ASSIST_PREVIOUS_GROUP` | Previous suggestion group |
| `C_KEYBOARD_INPUT_ASSIST_ACCEPT` | Accept current input suggestion |
| `C_KEYBOARD_INPUT_ASSIST_CANCEL` | Cancel input suggestion |

### Power & Lock

| Keycode | Aliases |
|---------|---------|
| `C_POWER` | `C_PWR` |
| `K_POWER` | |
| `C_SLEEP` | |
| `K_SLEEP` | |
| `C_AL_LOCK` | Screen lock |

### Miscellaneous

| Keycode | Description |
|---------|-------------|
| `PRINTSCREEN` | `PSCRN` |
| `PAUSE_BREAK` | `PAUSE` |
| `SCROLLLOCK` | `SLCK` |
| `INTERNATIONAL_1`–`INTERNATIONAL_9` | Language-specific characters |
| `LANGUAGE_1`–`LANGUAGE_9` | Language input switching |

## Notes

- Keycodes are defined in `<dt-bindings/zmk/keys.h>`; include this file in any keymap using `&kp`
- Many symbol keycodes are aliases that expand to modifier+key combinations (e.g., `EXCLAMATION` = `LS(NUMBER_1)`)
- Platform compatibility varies — check the official docs for per-keycode support matrix (W/L/A/m/i columns)
- Consumer control codes (`C_*`) target the USB HID Consumer page and may require driver support on the host

## Related

- [Keymaps Overview](./overview.md)
- [Modifiers](./modifiers.md)
