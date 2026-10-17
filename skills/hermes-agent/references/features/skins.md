# Skins & Themes

Skins control the visual presentation of the Hermes CLI: banner colors, spinner faces and verbs, response-box labels, branding text and the tool activity prefix. Skins (appearance) are separate from personality (tone and wording).

## Signature / Usage

```bash
/skin                # show the current skin and list available skins
/skin ares           # switch to a built-in skin
/skin mytheme        # switch to a custom skin from ~/.hermes/skins/mytheme.yaml
```

```yaml
# ~/.hermes/config.yaml
display:
  skin: default
```

```yaml
# ~/.hermes/skins/cyberpunk.yaml (missing keys inherit from `default`)
name: cyberpunk
description: Neon terminal theme

colors:
  banner_border: "#FF00FF"
  banner_title: "#00FFFF"
  banner_accent: "#FF1493"

spinner:
  thinking_verbs: ["jacking in", "decrypting", "uploading"]
  wings:
    - ["⟨⚡", "⚡⟩"]

branding:
  agent_name: "Cyber Agent"
  response_label: " ⚡ Cyber "

tool_prefix: "▏"
```

## Built-in skins

| Skin | Description | Agent branding |
|------|-------------|----------------|
| `default` | Classic Hermes, gold and kawaii | `Hermes Agent` |
| `ares` | War-god theme, crimson and bronze | `Ares Agent` |
| `mono` | Monochrome grayscale | `Hermes Agent` |
| `slate` | Cool blue, developer-focused | `Hermes Agent` |
| `daylight` | Light theme for bright terminals | `Hermes Agent` |
| `warm-lightmode` | Warm brown/gold text for light backgrounds | `Hermes Agent` |
| `poseidon` | Ocean-god theme, deep blue and seafoam | `Poseidon Agent` |
| `sisyphus` | Austere grayscale with persistence | `Sisyphus Agent` |
| `charizard` | Volcanic theme, burnt orange and ember | `Charizard Agent` |

## Options / Props

`colors:` (hex strings; `default` skin values in parentheses for selected keys):

| Key | Description |
|-----|-------------|
| `banner_border` (`#CD7F32`), `banner_title` (`#FFD700`), `banner_accent` (`#FFBF00`), `banner_dim` (`#B8860B`), `banner_text` (`#FFF8DC`) | Startup banner |
| `ui_accent`, `ui_label`, `ui_ok` (`#4caf50`), `ui_error` (`#ef5350`), `ui_warn` (`#ffa726`) | General UI indicators |
| `prompt`, `input_rule`, `response_border`, `session_label`, `session_border` | Prompt and response chrome |
| `status_bar_bg`, `voice_status_bg`, `selection_bg` | TUI surfaces; `selection_bg` falls back to `completion_menu_current_bg` |
| `completion_menu_bg`, `completion_menu_current_bg`, `completion_menu_meta_bg`, `completion_menu_meta_current_bg` | Completion menu |

`spinner:` `waiting_faces`, `thinking_faces`, `thinking_verbs` (lists of strings), `wings` (list of `[left, right]` pairs). Empty values use hardcoded defaults from `display.py`.

`branding:` `agent_name`, `welcome`, `goodbye`, `response_label`, `prompt_symbol` (bare token), `help_header`.

| Top-level key | Type | Description |
|-----|------|-------------|
| `tool_prefix` | string | Prefix for tool output lines, default `┊` |
| `tool_emojis` | dict | Per-tool emoji overrides `{tool_name: emoji}` |
| `banner_logo` | string | Rich-markup ASCII logo replacing the default banner |
| `banner_hero` | string | Rich-markup hero art replacing the caduceus |
| `customCSS` | string | Raw CSS for the desktop app and web dashboard only (ignored by CLI/TUI), capped at 32 KiB |

## Notes

- User skins in `~/.hermes/skins/` take precedence over built-ins with the same name; unknown skins fall back to `default`. `/skin` is session-only; set `display.skin` in `config.yaml` for a permanent default. Built-in skins load from `hermes_cli/skin_engine.py`.
- Desktop: `default` means the Desktop theme Nous (a stock `display.skin: default` never repaints Desktop); the classic gold look is the Desktop theme `classic` (`/skin classic`, `/skin gold`, `/skin hermes`). Desktop built-in names such as `mono` and `slate` are reserved; a user skin with such a name keeps the Desktop palette, but its `customCSS` still applies.
- Hermes Mod (community visual skin editor): `npx -y hermes-mod`; saves to `~/.hermes/skins/` and respects `HERMES_HOME`.

## Related

- [Personality](./personality.md)
- [Extending the Dashboard](./extending-the-dashboard.md)
