# Config Backend Seam

Where a profile's user `config.yaml` is read and written: the `ConfigBackend` seam in `hermes_cli/config_backend.py`, its file and remote backends, and the CI lints that keep callers on it.

## Signature / Usage

Adapted (not in the official docs): the page has no code block; these two lines combine the backend selector named in the page with the lint-exemption comment form it quotes.

```text
HERMES_CONFIG_BACKEND=remote
# config-reader: ok — <why>
```

## Options / Props

Helpers in `hermes_cli/config_backend.py`:

| Helper | Use |
|---|---|
| `read_config_doc(path)` | Parsed user layer (raises like `open` + `fast_safe_load`) |
| `read_config_doc_readonly(path)` | Signature-cached read; never mutate the result |
| `config_version(path)` | Change signature (the file's stat tuple, or the remote version) |
| `config_cache_version(path)` (`config_cache_version_or_none`) | Signature for a cache of the parse: stat tuple plus a content digest while the later of mtime and ctime is younger than `utils.RACY_MTIME_WINDOW_NS`; the remote version on the remote backend |
| `config_exists(path)` | Whether the layer exists (a remote layer always does) |
| `config_version_or_none(path)` / `version_token(version)` | The version, or None when absent; a number that changes with it (TUI/session `mtime`) |
| `probe_config_readable(path)` | Raise `OSError` while unreadable; remote raises `ConfigBackendUnavailable` while the plane cannot serve it |
| `write_config_document(path, doc)` / `write_config_key(path, key, value)` | Writes; callers normally use `atomic_config_write` / `atomic_config_replace` |
| `write_config_keys(path, {key: value, ...})` | Related keys that must change together (a model switch's `model.*`, TUI `/focus`); remote sends one CAS write, so a lock on any key refuses all |
| `supports_file_tooling()` / `require_file_tooling(what)` | Gate for tools that copy, edit or back up the file (`config edit`, backup/restore, profile clone) |

## Notes

- The backend is chosen once per process from `HERMES_CONFIG_BACKEND`, never from a config value: `file` (default) or `remote` (`plugins/config_backends/remote/`).
- Only `<home>/config.yaml` is a user layer; any other file passed to these helpers is read and written in place whichever backend is selected.
- Caches of a parse key on `config_cache_version`, not `config_version`: without multigrain timestamps a same-size in-place rewrite within the tick of a read keeps mtime, ctime, size and inode (a rotated `api_key` is the usual casualty). Other derived caches (`auth.json`, pairing lists, `.env`, token files, managed overlay) key on `utils.file_cache_version(path)`; signatures compared much later pass `always_digest=True`. "Recent" is judged on ctime too (`cp -p` / `rsync --inplace -t` restore older mtimes). A worker bound to a frozen config snapshot stays stat-only. Caches miss when a remote poll installs a new layer.
- With the file backend the managed scope (`/etc/hermes`) stays an overlay on the user layer; the remote backend ignores the managed `config.yaml` (and `hermes doctor` flags it) while the managed `.env` applies in both modes.
- Lints: `scripts/check_config_yaml_writers.py` rejects a direct YAML dump of a config path; `scripts/check_config_yaml_readers.py` rejects direct `open` / `read_text` / `stat` / `exists` / YAML load of a config path. A true false positive carries `# config-reader: ok — <why>` on the line.
- Adapted from the official docs: the Signature / Usage snippet is composed from the selector variable and the exemption comment quoted in prose (the page has no code block).
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/config-backend (pinned to v0.23.1)

## Related

- Remote Config (configuration category, `remote-config.md`)
- [Managed Scope](../configuration/managed-scope.md)
- [Configuration](../configuration/configuration.md)
