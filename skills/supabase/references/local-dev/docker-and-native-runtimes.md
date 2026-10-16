# Docker and native runtimes

The two runtimes of the experimental `supabase stack` commands: Docker (containers via Docker or Podman) and native (one process per service, no container engine). Both run the same services.

## Signature / Usage

```bash
supabase start --runtime native        # native processes
supabase start --runtime docker        # require Docker for a new local project
supabase stack status --output-format json   # `runtime` field: docker | podman | native
supabase stack prepare --runtime native      # pre-download archives, start nothing
```

## Options / Props

| | Docker runtime | Native runtime |
|---|---|---|
| Flag | `--runtime docker` or `--runtime podman` | `--runtime native` |
| How services run | One container per service, from images the CLI pulls | One process per service, from archives the CLI downloads and verifies |
| Requires | A running Docker or Podman engine | A supported platform, `tar` on the host, network access to the archive hosts on first start |
| Database data | Set at creation: a Docker volume if Docker client and daemon are both version 26+, otherwise a host directory | `~/.supabase/stacks/<id>/` |
| Downloaded artifacts | The engine's image cache | `~/.supabase/cache/stack`, shared by all local projects |
| Isolation | Separate network namespaces and file systems | Shared host process table and file locks |

Native platform support:

| Platform | Support |
|---|---|
| Linux `amd64` / `arm64` | Ubuntu 22.04+ or another distribution with glibc 2.35+ |
| macOS on Apple silicon | macOS 14+ |
| Windows | Not supported (use Docker) |
| macOS on Intel | Not supported (use Docker) |

## Notes

- Experimental: the `supabase stack` commands can change between releases. The default `supabase start` always uses Docker; the runtime choice exists only with `[experimental] stack` on.
- Use Docker when available (best isolation for several projects). Use native where no engine exists (agent sandboxes, CI runners); intended for one local project per environment.
- Auto-selection without `--runtime`: Docker if the daemon answers `docker version`, then Podman (`podman info`), then native on supported platforms. Each check waits up to 10 s; having the `docker` command installed isn't enough. An explicit `--runtime` never falls back.
- The runtime is recorded at creation and reused; passing a different `--runtime` to an existing local project fails. To switch, start a new named local project or destroy and restart; data isn't converted. Different apps can use different runtimes.
- A Docker local project keeps the storage it was created with (a Docker 25 host directory stays after upgrading to 26). `SUPABASE_HOME` overrides `~/.supabase`; saved settings live in `~/.supabase/stacks/<id>/` in both runtimes.
- Postgres starts right away; other services start on first request, stop after 60 s idle (Studio 5 min, Functions never). `--eager` starts everything and disables idle stops. `--preparation on-demand` defers downloads until first request.
- Native doesn't run as `root` (Postgres `initdb`); set `SUPABASE_NATIVE_POSTGRES_USER` to a non-root account (create it first).
- Native archives come from `supabase/slim-services` GitHub releases (fallback `supabase-cli-artifacts.s3.us-east-1.amazonaws.com`), checksum-verified, extracted with system `tar`. Allowlisted sandboxes: allow the S3 host, or both `github.com` and `release-assets.githubusercontent.com` (`ghcr.io` alone isn't enough). `prepare` creates the local project if missing (visible in `stack list`, removable via `stack destroy`). `stack destroy` leaves the cache; delete `~/.supabase/cache/stack` to reclaim space.
- If Postgres is slow on a cold start, raise `health_timeout` under `[db]` (both runtimes).
- CLI v2.121.0+: native runs each `pg_cron` job in a background worker, so a job body can't contain its own `BEGIN` / `COMMIT`. Earlier versions fail every native `pg_cron` job (`connection failed`, or `job startup timeout` on macOS).

## Related

- [running-multiple-local-projects.md](./running-multiple-local-projects.md)
- [overview.md](./overview.md)
