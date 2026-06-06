# Docker Terminal

Run agent commands inside an isolated Docker container to prevent destructive operations from affecting the host.

```yaml
# ~/.hermes/config.yaml
terminal:
  backend: docker
  docker_image: "nikolaik/python-nodejs:python3.11-nodejs20"
  docker_mount_cwd_to_workspace: false
  docker_forward_env:
    - "GITHUB_TOKEN"
  docker_volumes:
    - "/home/user/projects:/workspace/projects"
    - "/home/user/data:/data:ro"     # :ro = read-only mount
  container_cpu: 2
  container_memory: 4096            # MB
  container_disk: 51200             # MB (requires overlay2 on XFS+pquota)
  container_persistent: true        # Persist /workspace and /root across sessions
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
- `container_persistent: true` preserves `/workspace` and `/root` across sessions; omit it for a clean slate each time.
