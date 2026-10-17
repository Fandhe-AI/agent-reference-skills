# Built-in Plugins

Plugins bundled in the Hermes repository under `<repo>/plugins/<name>/`. They use the same plugin surface as third-party plugins (hooks, tools, slash commands) and ship disabled.

## Signature / Usage

```bash
hermes plugins enable disk-cleanup
hermes plugins disable disk-cleanup
```

```yaml
# ~/.hermes/config.yaml
plugins:
  enabled:
    - disk-cleanup
```

## Discovery

`PluginManager` scans four sources in order; later sources win on name collision:

1. Bundled: `<repo>/plugins/<name>/`
2. User: `~/.hermes/plugins/<name>/`
3. Project: `./.hermes/plugins/<name>/` (requires `HERMES_ENABLE_PROJECT_PLUGINS=1`)
4. Pip entry points: `hermes_agent.plugins`

`plugins/memory/` and `plugins/context_engine/` are excluded from bundled scanning (single-select providers configured through `hermes memory setup` / `context.engine`).

## Currently shipped

| Plugin | Kind | Purpose |
|---|---|---|
| `disk-cleanup` | hooks + slash command | Auto-track ephemeral files and clean them on session end |
| `security-guidance` | hooks | Pattern-match dangerous code on `write_file`/`patch` and append a warning (or block); 25 rules |
| `teams_pipeline` | standalone | Microsoft Teams meeting pipeline, Graph-backed, transcript-first summaries |
| `google_meet` | standalone | Join Meet calls, live-caption transcription, optional realtime duplex audio |
| `image_gen/openai` | image backend | OpenAI GPT Image 2 and 2.5 Flare/Sunburst generation and editing (API key) |
| `image_gen/openai-codex` | image backend | OpenAI image generation via Codex OAuth |
| `image_gen/xai` | image backend | xAI `grok-2-image` backend |
| `hermes-achievements` | dashboard tab | Collectible badges generated from session history |
| `kanban/dashboard` | dashboard tab | Kanban board UI for the multi-agent dispatcher |

## disk-cleanup

| Hook | Behaviour |
|---|---|
| `post_tool_call` | Tracks files matching `test_*`, `tmp_*`, `*.test.*` created by `write_file` / `terminal` / `patch` inside `HERMES_HOME` or `/tmp/hermes-*` |
| `on_session_end` | Runs the safe `quick` cleanup if test files were tracked in the turn |

| Category | Threshold | Confirmation |
|---|---|---|
| `test` | every session end | Never |
| `temp` | >7 days | Never |
| `cron-output` | >14 days | Never |
| empty dirs under HERMES_HOME | always | Never |
| `research` | >30 days, beyond 10 newest | Always (deep only) |
| `chrome-profile` | >14 days | Always (deep only) |
| files >500 MB | never auto | Always (deep only) |

```text
/disk-cleanup status                     # breakdown + top-10 largest
/disk-cleanup dry-run                    # preview without deleting
/disk-cleanup quick                      # run safe cleanup now
/disk-cleanup deep                       # quick + list items needing confirmation
/disk-cleanup track <path> <category>    # manual tracking
/disk-cleanup forget <path>              # stop tracking (does not delete)
```

State lives in `$HERMES_HOME/disk-cleanup/` (`tracked.json`, `tracked.json.bak`, `cleanup.log`). Cleanup only touches paths under `HERMES_HOME` or `/tmp/hermes-*`; Windows mounts (`/mnt/c/...`) are rejected; project trees (`workspace/`, `projects/`, `plans/`, `home/`) and `kanban/` are never tracked.

## security-guidance

Appends a security warning block to `write_file` / `patch` / `skill_manage` results whose content matches dangerous patterns (e.g. `pickle.load`, `eval(`, `os.system`, `shell=True`, `dangerouslySetInnerHTML`, disabled TLS verification, GitHub Actions `${{ github.event.* }}` injection). The file is still written in warn mode.

| Env var | Effect |
|---|---|
| (unset) | warn mode (default) |
| `SECURITY_GUIDANCE_BLOCK=1` | block mode; write refused |
| `SECURITY_GUIDANCE_DISABLE=1` | kill switch |

## google_meet

```bash
hermes plugins enable google_meet
hermes meet setup   # preflight: playwright, chromium, auth file
hermes meet auth    # sign into Google and save session state
```

Toolset: `meet_join` / `meet_status` / `meet_transcript` / `meet_leave` / `meet_say`. Transcript comes from Meet live captions; artifacts saved under `~/.hermes/workspace/meetings/<meeting_id>/`. `mode='realtime'` is speak-only; `meet_status` reports `micState`.

## hermes-achievements

Dashboard-only plugin (no hooks or model-visible tools) that auto-registers as a tab in `hermes dashboard`. Tiers: Copper, Silver, Gold, Diamond, Olympian. Routes under `/api/plugins/hermes-achievements/`: `GET /achievements`, `GET /scan-status`, `GET /recent-unlocks`, `GET /sessions/{id}/badges`, `POST /rescan`, `POST /reset-state`. State files in `$HERMES_HOME/plugins/hermes-achievements/`: `state.json`, `scan_snapshot.json`, `scan_checkpoint.json`.

## Notes

- Bundled plugins are never auto-enabled, including on upgrade.
- Langfuse tracing is no longer bundled; install the catalog plugin with `hermes plugins install langfuse`. Profiles that had `observability/langfuse` enabled are migrated by `hermes update`.
- NeMo Relay is no longer a bundled plugin; do not run `hermes plugins enable observability/nemo_relay`. Configure through a Relay `plugins.toml` (`~/.config/nemo-relay/plugins.toml`, then `/etc/nemo-relay/plugins.toml`); `HERMES_NEMO_RELAY_PLUGINS_TOML` replaces the user file. `hermes migrate relay` (or `--all-profiles`) converts legacy `HERMES_NEMO_RELAY_ATOF_*` / `ATIF_*` variables.
- Optional session-span segmentation for continuous gateway sessions:

```yaml
gateway:
  telemetry:
    session_segments:
      on_compaction: false  # rotate after context compaction
      max_turns: 0          # 0 = unlimited; N = turns per segment
```

## Related

- [Plugins](./plugins.md)
- [Plugin Catalog](./plugin-catalog.md)
- [Memory Providers](./memory-providers.md)
