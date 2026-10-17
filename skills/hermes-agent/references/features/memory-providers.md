# Memory Providers

External memory provider plugins that give the agent persistent cross-session knowledge beyond built-in MEMORY.md and USER.md. Only one external provider is active at a time; built-in memory stays active alongside it.

## Signature / Usage

```bash
hermes memory setup      # interactive picker + configuration
hermes memory status     # check what's active
hermes memory off        # disable external provider
```

```yaml
memory:
  provider: retaindb  # or byterover, honcho / hindsight / supermemory / mem0 / openviking / holographic / memori
                      # (catalog providers: run `hermes plugins install <name>` first)
```

## Provider Comparison

| Provider | Storage | Cost | Tools | Setup | Unique Feature |
|----------|---------|------|-------|-------|----------------|
| Honcho (catalog) | Cloud / self-hosted | Paid / Free | 5 | `hermes plugins install honcho` | Dialectic user modeling, session-scoped context |
| OpenViking (catalog) | Self-hosted | Free (AGPL-3.0) | 6 | `hermes plugins install openviking` + server | Filesystem hierarchy, tiered loading (L0 ~100 tokens, L1 ~2k, L2 full) |
| Mem0 (catalog) | Cloud / self-hosted / OSS | Free / Paid | 4 | `hermes plugins install mem0` | Server-side LLM extraction; platform / selfhosted / oss modes |
| Hindsight (catalog) | Cloud / local | Free / Paid | 3 | `hermes plugins install hindsight` | Knowledge graph, `hindsight_reflect` synthesis |
| Holographic (catalog) | Local SQLite | Free | 2 | `hermes plugins install holographic` | HRR algebra, trust scoring |
| RetainDB | Cloud | $20/mo | 10 | `requests` | Delta compression, hybrid search |
| ByteRover | Local / cloud | Free / Paid | 3 | `brv` CLI | Pre-compression extraction |
| Supermemory (catalog) | Cloud / self-hosted | Free / Paid | 4 | `hermes plugins install supermemory` | Context fencing, multi-container |
| Memori | Cloud | Free / Paid | 5 | `hermes-memori` (external) | Tool-aware memory, structured recall |

## Tools by provider

| Provider | Tools |
|---|---|
| Honcho | `honcho_profile`, `honcho_search`, `honcho_context`, `honcho_reasoning`, `honcho_conclude` |
| OpenViking | `viking_search`, `viking_read`, `viking_browse`, `viking_remember`, `viking_forget`, `viking_add_resource` |
| Mem0 | `mem0_search`, `mem0_add`, `mem0_update`, `mem0_delete` |
| Hindsight | `hindsight_retain`, `hindsight_recall`, `hindsight_reflect` |
| Holographic | `fact_store` (add, search, probe, related, reason, contradict, update, remove, list), `fact_feedback` |
| RetainDB | `retaindb_profile`, `retaindb_search`, `retaindb_context`, `retaindb_remember`, `retaindb_forget`, `retaindb_upload_file`, `retaindb_list_files`, `retaindb_read_file`, `retaindb_ingest_file`, `retaindb_delete_file` |
| ByteRover | `brv_query`, `brv_curate`, `brv_status` |
| Supermemory | `supermemory_store`, `supermemory_search`, `supermemory_forget`, `supermemory_profile` |
| Memori | `memori_recall`, `memori_recall_summary`, `memori_quota`, `memori_signup`, `memori_feedback` |

## Options / Props

Honcho (`$HERMES_HOME/honcho.json` > `~/.hermes/honcho.json` > `~/.honcho/config.json`):

| Key | Default | Description |
|-----|---------|-------------|
| `apiKey` / `baseUrl` | — | Cloud key / self-hosted URL |
| `peerName` / `aiPeer` / `workspace` | — / host key / host key | Peer identities and shared workspace |
| `contextCadence` | `1` | Min turns between base-layer `context()` calls |
| `dialecticCadence` | `2` | Min turns between `peer.chat()` LLM calls |
| `dialecticDepth` | `1` | `.chat()` passes per invocation, clamped 1-3 |
| `dialecticReasoningLevel` | `'low'` | `minimal` / `low` / `medium` / `high` / `max` |
| `recallMode` | `'hybrid'` | `hybrid` / `context` / `tools` |
| `writeFrequency` | `'async'` | `async` / `turn` / `session` / integer N |
| `observationMode` | `'directional'` | `directional` / `unified` |
| `sessionStrategy` | `'per-directory'` | `per-directory` / `per-repo` / `per-session` / `global` |
| `pinUserPeer`, `userPeerAliases`, `runtimePeerPrefix` | `false`, `{}`, `""` | Gateway identity mapping only |

Mem0 (`$HERMES_HOME/mem0.json`): `mode` (`platform` / `oss`), `host` (self-hosted server; do not combine with `mode: oss`), `user_id` (`hermes-user`), `agent_id` (`hermes`), `rerank` (`false`, platform only), `sync_max_chars` (`450`). Secret `MEM0_API_KEY` goes in `~/.hermes/.env`.

Hindsight (`$HERMES_HOME/hindsight/config.json`): `mode` (`cloud` / `local_embedded` / `local_external`), `bank_id` (`hermes`), `recall_budget` (`mid`), `memory_mode` (`hybrid`), `auto_retain` / `auto_recall` / `retain_async` (`true`), `retain_context`, `retain_tags`, `retain_source`, `retain_user_prefix`, `retain_assistant_prefix`, `recall_tags`.

Holographic (`plugins.hermes-memory-store` in `config.yaml`): `db_path` (`$HERMES_HOME/memory_store.db`), `auto_extract` (`false`), `default_trust` (`0.5`).

Supermemory (`$HERMES_HOME/supermemory.json`): `base_url` (`https://api.supermemory.ai`), `container_tag` (`hermes`, supports `{identity}`), `auto_recall`, `auto_capture`, `max_recall_results` (10), `profile_frequency` (50), `capture_mode` (`all`), `search_mode` (`hybrid` / `memories` / `documents`), `api_timeout` (5.0). Env: `SUPERMEMORY_API_KEY`, `SUPERMEMORY_BASE_URL`, `SUPERMEMORY_CONTAINER_TAG`.

## Notes

- When active, Hermes injects provider context into the system prompt, prefetches memories before each turn, syncs turns after each response, extracts on session end, mirrors built-in memory writes, and adds provider tools. Everything handed to a provider passes through the secret scrub first (even with `security.redact_secrets: false`); shapeless credentials are not detected.
- Honcho, OpenViking, Mem0, Hindsight, Holographic and Supermemory moved out of the Hermes tree to the plugin catalog. `hermes update` (and the first agent start) installs the catalog plugin for each profile naming the provider; with `security.allow_lazy_installs: false` the exact `hermes plugins install <name>` command is printed instead. `memory.provider`, config files and stored memories are untouched.
- Deprecation: RetainDB and ByteRover leave core on October 15, 2026; their standalone repositories are unmaintained.
- A memory provider is activated by `memory.provider`, not `plugins.enabled`; `hermes plugins enable hindsight` does not activate it. Hindsight reads `$HERMES_HOME/hindsight/config.json`, not a `memory.hindsight` section of `config.yaml`.
- OpenViking: when the local endpoint has nothing listening the plugin starts `openviking-server`, which inherits the full Hermes environment minus `PYTHONPATH`; start it yourself to avoid that. Env: `OPENVIKING_ENDPOINT`, `OPENVIKING_API_KEY`, `OPENVIKING_ACCOUNT`, `OPENVIKING_USER`; peer scoping via `memory.openviking.agent`.
- Mem0 setup flags: `hermes memory setup mem0 --mode <platform|selfhosted|oss> [--host ...] [--api-key ...] [--oss-llm ...] [--oss-vector ...] [--dry-run]`. The mem0ai SDK sends anonymous telemetry unless `MEM0_TELEMETRY=false`.
- Provider data is isolated per profile (local paths under `$HERMES_HOME/`, per-profile config files, profile-scoped project names for RetainDB, per-profile `.env` for OpenViking).
- Memori's `hermes-memori` is an external integration, not a `hermes pm install` package; do not let an external installer pip-install into Hermes's environment.

## Related

- [Memory](./memory.md)
- [Plugins](./plugins.md)
- [Plugin Catalog](./plugin-catalog.md)
