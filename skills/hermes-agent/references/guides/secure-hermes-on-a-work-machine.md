# Running Hermes on a Personal or Work Machine

Security-posture walkthrough for running Hermes Agent on the machine you live on: what the defaults protect, how to tighten, and how to undo mistakes.

## Signature / Usage

A cautious starting `~/.hermes/config.yaml`:

```yaml
approvals:
  mode: manual                  # See every flagged command yourself
  timeout: 300                  # Unanswered prompts are denied (fail-closed)
  deny:                         # Never-run list, survives even /yolo
    - "git push --force*"
    - "*curl*|*sh*"
    - "dd if=* of=/dev/*"

security:
  redact_secrets: true

checkpoints:
  enabled: true

terminal:
  backend: docker               # Or ssh, keep execution off the host
  docker_forward_env: []        # No host secrets inside the container
```

`~/.hermes/.env` write sandbox:

```bash
HERMES_WRITE_SAFE_ROOT=/path/to/project:/home/you/.hermes
```

Gateway allowlists and checkpoints:

```bash
TELEGRAM_ALLOWED_USERS=123456789
GATEWAY_ALLOWED_USERS=123456789
hermes pairing approve <platform> <code>
hermes chat --checkpoints
```

## Options / Props

Terminal backends:

| Backend | Isolation |
|---------|-----------|
| `local` | None; runs on host (dangerous-command checks apply) |
| `docker` | Container is the security boundary |
| `ssh` | Remote machine (`TERMINAL_SSH_HOST`, `TERMINAL_SSH_USER`, `TERMINAL_SSH_KEY` in `~/.hermes/.env`) |

Rollback commands:

| Command | Description |
|---------|-------------|
| `/rollback` | List checkpoints with change stats |
| `/rollback diff <N>` | Preview changes since checkpoint N |
| `/rollback <N>` | Restore checkpoint N (also undoes the last chat turn) |
| `/rollback <N> <file>` | Restore a single file |

## Notes

- Defaults: `approvals.mode: smart` (auxiliary LLM risk assessment); approval prompts time out to deny (default 300 s); a hardline blocklist (`rm -rf /`, fork bombs, zeroing a disk) refuses regardless of mode, `--yolo`, or "allow always"; `write_file` / `patch` cannot touch `~/.ssh/`, `~/.aws/`, `~/.kube/`, `/etc/sudoers`, `~/.netrc`, Hermes credential stores, or project `.env` files; `security.redact_secrets` on; no telemetry, data goes only to the configured LLM provider.
- `approvals.deny` globs are case-insensitive fnmatch against the whole command (including deobfuscated variants); always quote patterns; effective immediately, even under `--yolo` or `mode: off`.
- `HERMES_WRITE_SAFE_ROOT` uses `:` separators on Unix; include the Hermes home or the agent cannot write cron / skill state. Sensitive paths inside the safe root remain blocked.
- Docker containers run with dropped capabilities, `no-new-privileges`, process limits, and size-limited tmpfs; dangerous-command checks are skipped in containers.
- Gateway default is deny-all when no allowlists are set; never set `GATEWAY_ALLOW_ALL_USERS=true`.
- Checkpoints are opt-in, stored as shadow git snapshots in `~/.hermes/checkpoints/store/`; the real project `.git` is untouched.
- Threat model: guardrails against an honest-but-wrong agent, not a sandbox against an adversarial process; the `terminal` tool runs as the same OS user. For containment use an isolated backend (Docker, Modal).

## Related

- [tips](./tips.md)
- [troubleshooting-agent-quality](./troubleshooting-agent-quality.md)
