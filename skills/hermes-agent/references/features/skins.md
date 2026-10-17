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

Empty `spinner:` values use hardcoded defaults from `display.py`. `colors:` values are hex strings.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `colors.banner_border` | string | `#CD7F32` | Startup banner |
| `colors.banner_title` | string | `#FFD700` | Startup banner |
| `colors.banner_accent` | string | `#FFBF00` | Startup banner |
| `colors.banner_dim` | string | `#B8860B` | Startup banner |
| `colors.banner_text` | string | `#FFF8DC` | Startup banner |
| `colors.ui_accent` | string | — | General UI indicators |
| `colors.ui_label` | string | — | General UI indicators |
| `colors.ui_ok` | string | `#4caf50` | General UI indicators |
| `colors.ui_error` | string | `#ef5350` | General UI indicators |
| `colors.ui_warn` | string | `#ffa726` | General UI indicators |
| `colors.prompt`, `colors.input_rule`, `colors.response_border`, `colors.session_label`, `colors.session_border` | string | — | Prompt and response chrome |
| `colors.status_bar_bg`, `colors.voice_status_bg`, `colors.selection_bg` | string | — | TUI surfaces; `selection_bg` falls back to `completion_menu_current_bg` |
| `colors.completion_menu_bg`, `colors.completion_menu_current_bg`, `colors.completion_menu_meta_bg`, `colors.completion_menu_meta_current_bg` | string | — | Completion menu |
| `spinner.waiting_faces` | list of strings | — | — |
| `spinner.thinking_faces` | list of strings | — | — |
| `spinner.thinking_verbs` | list of strings | — | — |
| `spinner.wings` | list of `[left, right]` pairs | — | — |
| `branding.agent_name` | string | — | — |
| `branding.welcome` | string | — | — |
| `branding.goodbye` | string | — | — |
| `branding.response_label` | string | — | — |
| `branding.prompt_symbol` | string | — | Bare token |
| `branding.help_header` | string | — | — |
| `tool_prefix` | string | `┊` | Prefix for tool output lines |
| `tool_emojis` | dict | — | Per-tool emoji overrides `{tool_name: emoji}` |
| `banner_logo` | string | — | Rich-markup ASCII logo replacing the default banner |
| `banner_hero` | string | — | Rich-markup hero art replacing the caduceus |
| `customCSS` | string | — | Raw CSS for the desktop app and web dashboard only (ignored by CLI/TUI), capped at 32 KiB |

## Notes

- User skins in `~/.hermes/skins/` take precedence over built-ins with the same name; unknown skins fall back to `default`. `/skin` is session-only; set `display.skin` in `config.yaml` for a permanent default. Built-in skins load from `hermes_cli/skin_engine.py`.
- Desktop: `default` means the Desktop theme Nous (a stock `display.skin: default` never repaints Desktop); the classic gold look is the Desktop theme `classic` (`/skin classic`, `/skin gold`, `/skin hermes`). Desktop built-in names such as `mono` and `slate` are reserved; a user skin with such a name keeps the Desktop palette, but its `customCSS` still applies.
- Hermes Mod (community visual skin editor): `npx -y hermes-mod`; saves to `~/.hermes/skins/` and respects `HERMES_HOME`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/skins (pinned to v0.22.2)

## Related

- [Personality](./personality.md)
- [Extending the Dashboard](./extending-the-dashboard.md)
