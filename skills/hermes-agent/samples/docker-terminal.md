# Docker Terminal

Run agent commands inside an isolated Docker container to prevent destructive operations from affecting the host.

```yaml
# ~/.hermes/config.yaml
terminal:
  backend: docker
  docker_image: "nousresearch/hermes-sandbox:desktop"   # default image
  docker_mount_cwd_to_workspace: false
  docker_forward_env:
    - "GITHUB_TOKEN"
  docker_volumes:
    - "/home/user/projects:/workspace/projects"
    - "/home/user/data:/data:ro"     # :ro = read-only mount
  container_cpu: 2
  container_memory: 4096            # MB
  container_disk: 51200             # MB (requires overlay2 on XFS+pquota)
  container_persistent: true        # true = one shared long-lived container; false = fresh container per session
```

```bash
# Switch to Docker backend for the current invocation only
TERMINAL_BACKEND=docker hermes

# Or set permanently in .env
echo "TERMINAL_BACKEND=docker" >> ~/.hermes/.env
```

## Notes

- Security hardening is applied automatically: `--cap-drop ALL` with only `DAC_OVERRIDE`, `CHOWN`, `FOWNER` re-added; `--security-opt no-new-privileges`; `--pids-limit 256`.
- Dangerous command approval checks are skipped inside containers — the container itself is the security boundary.
- SSH, Modal, Singularity, and Daytona backends follow similar config patterns under `terminal:`.
- The default `docker_image` is `nousresearch/hermes-sandbox:desktop` (includes a display stack for Bot Screen / computer_use / browser). Any other image works for shell work. Writing `docker_image` is a decision: a persisted container on another image is recreated on the next terminal call.
- `container_persistent: true` (default) shares one long-lived container across sessions, `/new` and `delegate_task` subagents, preserving `/workspace` and `/root`. `false` creates one container per session and removes it when the session closes or goes idle past `lifetime_seconds`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/docker (pinned to v0.22.2)
