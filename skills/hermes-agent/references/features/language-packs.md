# Language Packs

Hermes ships 17 UI languages (`display.language`). Language packs (a plugin or a folder in your Hermes home) add or override UI languages for the CLI, gateway, `hermes --tui` and Desktop. Only static UI text is translated; agent responses, tool output, logs and slash-command names are unchanged.

## Signature / Usage

```bash
hermes plugins install https://github.com/teknium1/hermes-lang-pl   # or a catalog name
hermes config set display.language pl
hermes plugins validate ./hermes-lang-pl
```

```yaml
# plugin.yaml
name: hermes-lang-pl
version: 1.0.0
description: Polish language pack for Hermes
provides_locales:
  - id: pl            # lowercase BCP-47-style tag: pl, pt-br, zh-hant
    endonym: Polski   # shown in language switchers
    rtl: false        # true for right-to-left scripts
```

## Layout

```text
hermes-lang-pl/
  plugin.yaml
  locales/
    pl.yaml            # core: Python-side strings (approval.*, gateway.*, cli.*, display.*, slash.*, tips.*, ...)
    pl.tui.yaml        # optional: hermes --tui strings
    pl.desktop.yaml    # optional: Hermes Desktop strings
```

## Lookup order

1. Plugin language packs (`provides_locales`; last loaded wins)
2. Overlay `<HERMES_HOME>/locales/<lang>.yaml` (per profile)
3. Bundled `locales/<lang>.yaml`
4. The same three layers for English, then the raw key

Every layer may be partial.

## Python registration

```python
def register(ctx):
    here = Path(__file__).parent
    ctx.register_locale("pl", here / "locales" / "pl.yaml", endonym="Polski")
    ctx.register_locale("pl", {"approval": {"denied": "      ✗ Odrzucono"}})
    ctx.register_locale("pl", here / "locales" / "pl.tui.yaml", surface="tui")
    ctx.register_locale_dir(here / "locales")
```

`register_locale(lang, source, *, endonym=None, rtl=False, surface="core")`; `surface` is `core`, `tui` or `desktop`. Registration is undone on unload and never changes `display.language`.

## Notes

- `hermes config set display.language <id>` accepts any id a layer supplies; unknown ids are refused with the available list. The `HERMES_LANGUAGE` entry in `.env` overrides `display.language`. Restart running gateways/TUIs after installing a pack.
- No Python code is needed when `provides_locales` is declared; the loader registers every `locales/<lang>[.tui|.desktop].yaml`.
- YAML values must be text (numbers, lists, booleans, empty values are rejected). Avoid YAML reserved words (`on`, `off`, `yes`, `no`) as keys.
- Core strings use named placeholders (`{count}`); keep every `{name}` from English or Hermes falls back to the untranslated string. TUI/Desktop function-valued entries use positional placeholders (`{0} of {1} sessions`).
- Key sets for TUI and Desktop are exported in `locales/_keys.tui.json` and `locales/_keys.desktop.json`; the validator checks against them and warns about keys absent from the English catalog.
- Personal overlay without a plugin: `~/.hermes/locales/en.yaml` (partial, e.g. `approval.denied`); applies per profile.
- Troubleshooting: an id must match its file name (`pl` needs `locales/pl.yaml`); a language listed but English in TUI/Desktop means the pack lacks `.tui.yaml` / `.desktop.yaml`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/language-packs (pinned to v0.22.2)

## Related

- [Plugins](./plugins.md)
- [Skins](./skins.md)
