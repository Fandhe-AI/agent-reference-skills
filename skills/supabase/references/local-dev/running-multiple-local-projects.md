# Running multiple local projects (experimental supabase stack)

Run one local Supabase project per app, git worktree, or named environment on one machine with the experimental `supabase stack` commands. Requires Supabase CLI v2.119.0 or later.

## Signature / Usage

```toml
# supabase/config.toml
[experimental]
stack = true
```

```bash
export SUPABASE_EXPERIMENTAL_STACK=1   # alternative when there is no config.toml
supabase stack --help                  # confirm the commands exist
supabase start                         # default local project for this app/branch
supabase start --stack dev             # named local project
supabase start --stack test
supabase start --exclude studio,mail   # leave services out
supabase status --env --output-format text > .env.local
supabase stack list                    # every local project on the machine
supabase stack logs --follow --service database
supabase stop --stack test
supabase stack stop --all
supabase stack destroy --stack test --yes
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--stack <name>` | string | Names a local project; omitted = the app directory's default local project |
| `--stack-id` | string (repeatable) | ID from `supabase stack list` (JSON output has the full ID); several IDs in one `destroy` need CLI v2.121.0+ |
| `--exclude` | list | One or more of `rest`, `auth`, `realtime`, `storage`, `functions`, `studio`, `mail`, `analytics`, `pooler`. The database can't be excluded; excluding `rest` requires excluding `studio`; excluding `studio` also removes MCP |
| `--eager` | flag | Start every enabled service before returning and turn off idle stops |
| `--preparation on-demand` | flag | Defer each download until the service's first request |
| `--runtime` | docker / podman / native | Runtime for a new local project |
| `--output-format json` | flag | JSON output for `start` / `status` (`id`, `runtime`, `lazy_services`, `env`, `endpoints`) |
| `--env`, `--override-name A=B,...` | flag | Export connection details as environment variables, optionally renamed |
| `--all` | flag | With `supabase stack stop`, stop every local project |
| `--yes` | flag | Skip the `destroy` confirmation prompt |
| `stack logs`: `--follow`, `--tail <n>`, `--since 10m`, `--service <name>` | flags | Prints the last 200 retained lines by default; `--service gateway` shows requests to the shared API port |

## Notes

- Experimental: flags and output can change between releases and the CLI compatibility promise doesn't cover them. Without the setting, `supabase stack` fails with `Unknown subcommand "stack"`. Don't add a second `[experimental]` table (the config becomes invalid).
- With the setting on, `supabase start` / `status` / `stop` run the stack commands, and the local targets of `db`, `migration`, `test`, `gen`, `inspect`, `pull`, `storage`, `seed`, `services`, and `functions serve` route to the stack. `SUPABASE_EXPERIMENTAL_STACK` takes precedence over the config file (`=0` for one session off).
- Identity of a local project = project root (nearest directory with `supabase/config.toml`, else the current directory) + git branch + optional `--stack` name. Different identities never share containers, processes, ports, database data, or Storage data. Same checkout and branch (two packages under one `supabase/`, or two agents) share one local project; use separate worktrees or `--stack` names. Studio snippets in `supabase/snippets` are shared.
- Ports are assigned from 20000-32767 and stay stable across restarts. Ports in `config.toml` (and `SUPABASE_API_PORT` / `SUPABASE_DB_PORT` env vars) are exact requests and conflict across projects. Remove the `port` keys under `[api]`, `[db]`, `[db.pooler]`, `[studio]`, `[local_smtp]`, `[analytics]`, plus `shadow_port`, `inspector_port` (`[edge_runtime]`), `smtp_port`, `pop3_port`, `vector_port`. `SUPABASE_EXPERIMENTAL_STACK=1 supabase init` writes the config without port keys.
- CLI v2.121.0+ applies port changes on restart of a stopped local project (data kept); earlier versions fail with `The saved stack cannot adopt these changes`. A Postgres major version change always needs a new local project.
- Postgres starts immediately; other services start on first request and stop after 60 s idle (Studio 5 min; Functions never). Re-running `supabase start` on a running project keeps its settings; stop and start to apply `config.toml`, `--exclude`, or `--eager` changes.
- Differences from default `supabase start`: separate data (nothing copied, default project not stopped); no `stop --no-backup` / `--project-id` (use `stack destroy` / `stack stop --all`); no `-o` / `--output` (use `--output-format`, `--env`); `functions serve` needs a running local project.
- `db`, `migration`, and other database commands don't accept `--stack`; they use the current branch's default local project. `db pull` / `push` / `dump` target the linked project unless `--local`. To reach a named project, pass `DB_URL` from `supabase status --stack <name> --env` to `--db-url`. Local database password is `postgres`.
- `destroy` takes no backup and frees ports; it keeps Storage uploads in `supabase/.temp/stack-uploads/<id>/` and may leave container engine resources if the engine isn't running (it prints cleanup commands). Don't delete a shared Docker volume.
- Unsupported `config.toml` settings (start fails naming the setting): `api.tls`; Analytics GCP settings and non-Postgres backends; custom Auth email templates with `content_path`; Storage Analytics and vector buckets; custom `edge_runtime.deno_version`; `db.major_version` other than 15 and 17; `db.orioledb_version` before v2.121.0 and `experimental.s3_*` for OrioleDB in any version.
- Switching branches switches local projects (the first keeps running). Moving or renaming the app directory creates a new local project.
- Docker is recommended for several simultaneous local projects; native is for sandboxes / CI.
- Source: https://supabase.com/docs/guides/local-development/running-multiple-local-projects (fetched 2026-10-17, Supabase CLI v2.121.0; release: https://github.com/supabase/cli/releases/tag/v2.121.0)

## Related

- [docker-and-native-runtimes.md](./docker-and-native-runtimes.md)
- [overview.md](./overview.md)
