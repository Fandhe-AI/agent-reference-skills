# Nix & NixOS Setup

Install and deploy Hermes Agent with Nix: quick `nix run`, a Home Manager module, and a declarative NixOS module with optional container mode. Nix and NixOS are Tier 2 (best-effort) platforms.

## Signature / Usage

```bash
# Run the TUI without installing
nix run github:NousResearch/hermes-agent -- setup
nix run github:NousResearch/hermes-agent -- --tui

# Or install into your profile
nix profile install github:NousResearch/hermes-agent
hermes setup
hermes --tui

# Desktop app
nix run github:NousResearch/hermes-agent#desktop
```

Minimal NixOS module configuration:

```nix
# configuration.nix
{ config, ... }: {
  services.hermes-agent = {
    enable = true;
    settings.model.default = "anthropic/claude-sonnet-4";
    environmentFiles = [ config.sops.secrets."hermes-env".path ];
    addToSystemPackages = true;
  };
}
```

## Deployment Levels

| Level | Who it's for | What you get |
|-------|-------------|--------------|
| `nix run` / `nix profile install` | Any Nix user (macOS, Linux) | Pre-built binary with all deps, then the standard CLI workflow |
| Home Manager module | An agent for one person, on any distribution or macOS | Declarative configuration and a user service, without root |
| NixOS module (native) | NixOS server deployments | Declarative config, hardened systemd service, managed secrets |
| NixOS module (container) | Agents that need self-modification | Everything above, plus a persistent Ubuntu container where the agent can `apt`/`pip`/`npm install` |

## Options / Props

Core options of `services.hermes-agent` (NixOS module; the Home Manager module shares the same option set):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enable` | `bool` | `false` | Enable the hermes-agent service |
| `package` | `package` | `hermes-agent` | The hermes-agent package to use |
| `user` / `group` | `str` | `"hermes"` | System user / group |
| `createUser` | `bool` | `true` | Auto-create user/group |
| `stateDir` | `str` | `"/var/lib/hermes"` | State directory (`HERMES_HOME` parent) |
| `workingDirectory` | `str` | `"${stateDir}/workspace"` | Agent working directory |
| `addToSystemPackages` | `bool` | `false` | Add `hermes` CLI to system PATH and set `HERMES_HOME` system-wide |
| `settings` | `attrs` (deep-merged) | `{}` | Declarative config rendered as `config.yaml` |
| `configFile` | `null` or `path` | `null` | Existing `config.yaml`; overrides `settings` entirely |
| `environmentFiles` | `listOf str` | `[]` | Env files with secrets, merged into `$HERMES_HOME/.env` at activation |
| `environment` | `attrsOf str` | `{}` | Non-secret env vars (visible in Nix store) |
| `authFile` | `null` or `path` | `null` | OAuth credentials seed, copied on first deploy only |
| `authFileForceOverwrite` | `bool` | `false` | Always overwrite `auth.json` from `authFile` |
| `documents` | `attrsOf (either str path)` | `{}` | Workspace files relative to `workingDirectory` (requires explicit `workingDirectory`) |
| `hermesHomeFiles` | `attrsOf (either str path)` | `{}` | Files installed into `HERMES_HOME` (`SOUL.md`, `memories/`) |
| `mcpServers` | `attrsOf submodule` | `{}` | MCP server definitions, merged into `settings.mcp_servers` |
| `extraArgs` | `listOf str` | `[]` | Extra args for `hermes gateway` |
| `extraPackages` | `listOf package` | `[]` | Extra packages available to the agent |
| `extraPlugins` | `listOf package` | `[]` | Directory plugin packages symlinked into `$HERMES_HOME/plugins/` (each needs `plugin.yaml`) |
| `extraPythonPackages` | `listOf package` | `[]` | Python packages added to PYTHONPATH for entry-point plugin discovery |
| `extraDependencyGroups` | `listOf str` | `[]` | pyproject.toml optional extras added to the groups `package` already ships (e.g. `["google-meet"]`) |
| `restart` / `restartSec` | `str` / `int` | `"always"` / `5` | systemd `Restart=` / `RestartSec=` (not used on macOS) |
| `backend.mode` | `enum ["none" "serve" "dashboard"]` | `"none"` | Runs the process a remote Desktop connection and the dashboard connect to. `serve` gives `/api/ws` and `/api/pty`; `dashboard` also serves the browser panel. Not usable with `container.enable` |
| `backend.host` / `backend.port` | `str` / `port` | `"127.0.0.1"` / `9119` | Bind address (non-loopback starts the authentication gate) / port |
| `backend.extraArgs` | `listOf str` | `[]` | More arguments for the backend command |
| `container.enable` | `bool` | `false` | Enable OCI container mode (NixOS only) |
| `container.backend` | `enum ["docker" "podman"]` | `"docker"` | Container runtime |
| `container.image` | `str` | `"ubuntu:24.04"` | Base image |
| `container.extraVolumes` | `listOf str` | `[]` | Extra mounts (`host:container:mode`) |
| `container.extraOptions` | `listOf str` | `[]` | Extra args passed to `docker create` |
| `container.hostUsers` | `listOf str` | `[]` | Users who get a `~/.hermes` symlink and are added to the `hermes` group |

`mcpServers.<name>` sub-options: `command`, `args`, `env` (stdio); `url`, `headers`, `auth` (`"oauth"`) (HTTP); `enabled` (default `true`), `timeout` (default 120 s), `connect_timeout` (default 60 s), `tools` (`include`/`exclude`), `sampling`.

Home Manager only:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `services.hermes-agent.hermesHome` | `str` | `"${config.home.homeDirectory}/.hermes"` | `HERMES_HOME` directly |
| `services.hermes-agent.gateway.enable` | `bool` | `false` | Run the messaging gateway |
| `programs.hermes-agent.enable` | `bool` | `false` | Add `hermes` CLI to `home.packages`, export `HERMES_HOME` for shells |
| `programs.hermes-agent.desktop.enable` | `bool` | `false` | Add the Hermes Desktop application |

## Optional Dependency Groups

Groups the `default` package already ships (naming one in `extraDependencyGroups` changes nothing; the table lists common groups, `pyproject.toml` is authoritative):

| Group | What it enables |
|-------|-----------------|
| `messaging` | Discord, Telegram, Slack |
| `matrix` | Matrix/Element (Linux only) |
| `dingtalk` / `feishu` | DingTalk / Feishu/Lark |
| `voice` | Local speech-to-text (faster-whisper) |
| `edge-tts` / `tts-premium` | Edge TTS / ElevenLabs TTS |
| `anthropic` / `bedrock` / `azure-identity` | Native Anthropic SDK / AWS Bedrock / Azure Entra ID |
| `modal` / `daytona` | Terminal backends |
| `exa` / `firecrawl` / `fal` | Web search / web search / image generation |

## Notes

- Tier 2 platform: the flake and NixOS module are best-effort and commits to `main` may break them. For a supported setup use Docker or an FHS environment (see platform-support.md).
- The default package adds about 700 MB to the closure; `#messaging` adds about 33 MB. Missing messaging deps show up as `No adapter available for discord` (fix: `#messaging` package or `extraDependencyGroups = [ "messaging" ]`).
- Never put API keys in `settings` or `environment`; values in Nix expressions land in the world-readable `/nix/store`. Use `environmentFiles` with sops-nix or agenix.
- Managed mode: under the NixOS module, `hermes setup`, `hermes config edit`, `hermes config set`, `hermes gateway install` and `hermes gateway uninstall` are blocked (detected via the `HERMES_MANAGED` env var and the `.managed` marker file).
- With `container.enable = true` and `addToSystemPackages = true`, every host `hermes` command is routed into the container. `HERMES_DEV=1` bypasses routing. Podman needs passwordless sudo for the podman binary.
- The container is recreated only when its identity hash changes (schema version, image, `extraVolumes`, `extraOptions`, entrypoint script); the writable layer (`apt`/`pip`/`npm` installs) is then lost, while `/data` and `/home/hermes` persist.
- `documents` requires an explicit `workingDirectory`; `SOUL.md` and `memories/` only work through `hermesHomeFiles`.
- Home Manager: container mode and the NixOS-style `addToSystemPackages` do not apply. Enable linger (`users.users.<name>.linger = true` or `sudo loginctl enable-linger <name>`) or the user service stops at logout.
- Nix-declared `settings` keys win over `config.yaml` on disk, but user-added keys Nix does not touch are preserved. `nix build .#configKeys && cat result` lists every leaf config key.
- Update with `nix flake update hermes-agent` then `sudo nixos-rebuild switch` (NixOS) or `home-manager switch` (Home Manager). In container mode only the `current-package` symlink changes.
- Dev shell: `nix develop` provides an editable Python venv with the `dev` group on the interpreter `pm/lock.json` pins; `HERMES_PYTHON` and `VIRTUAL_ENV` point at it (no `PYTHONPATH` needed) and the shell hook uses pnpm. `nix flake check` runs the flake checks.
- `services.hermes-agent.installPackage` was removed in favor of `programs.hermes-agent` (Home Manager).
- Source: https://hermes-agent.nousresearch.com/docs/getting-started/nix-setup (pinned to v0.23.1)

### Changes in v0.23 (from v0.22.2)

- `extraDependencyGroups` / `extraPythonPackages` (and `pkgs.hermes-agent.override { extraDependencyGroups = [ ... ]; }`) only add to the groups the selected package ships. The `default` package already ships `messaging`, `voice`, `exa` and the other listed groups, so naming those changes nothing. For a smaller build use `package = inputs.hermes-agent.packages.${system}.minimal;` (or `#messaging`), or `.override { defaultDependencyGroups = [ ]; }` to drop the shipped groups. The official troubleshooting table still suggests `extraDependencyGroups = [ "messaging" ]` for `No adapter available for discord`; with the `default` package that has no effect, so prefer the `#messaging` / `minimal` package route.
- Dev shell: `hermes` stays your installed Hermes; `hermes-checkout` runs the checkout's code with the same arguments. Use a separate `HERMES_HOME` when a change touches stored state, because both read the same one by default.
- A Desktop running on the same host attaches to the gateway itself via `hermes gateway ensure`; only a remote Desktop connection and the dashboard need `backend.mode`.
- Webapp: the package ships the Webapp prebuilt. Enable it with `settings.webapp = { enabled = true; host = "127.0.0.1"; port = 9120; }` (with `gateway.enable = true`) and open it with `hermes webapp`. A non-loopback `host` or a `public_url` needs one of the dashboard's sign-in providers. The wrapper points `HERMES_WEBAPP_DIST` at the bundle, so `hermes webapp --force-build` has nothing to rebuild. `nix build .#webapp` builds it alone.
- After a `pnpm-lock.yaml` change that adds, removes or re-resolves a package, run `nix run .#update-pnpm-lockfile` from the checkout to refresh `nix/pnpm-deps-hash` (otherwise every frontend build fails with a hash mismatch).

## Related

- [Installation](./installation.md)
- [Platform Support](./platform-support.md)
- [Updating & Uninstalling](./updating.md)
