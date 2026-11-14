<!-- source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md / last verified: 2026-11-14 -->

# Run a self-hosted runner with Docker Compose

Compose service that restarts the runner on exit, reading the environment secret from a Compose secret file.

```yaml compose.yaml
services:
  claude-runner:
    image: <your-registry>/claude-runner:latest
    command:
      - self-hosted-runner
      - --environment-secret-file
      - /run/secrets/environment-secret
      - --capacity
      - "4"
      - --base-dir
      - /workspace
    secrets:
      - environment-secret
    restart: always
    stop_grace_period: 90s

secrets:
  environment-secret:
    file: ./environment-secret
```

## Notes

- `restart: always` restarts the same container with its writable layer intact, so the runner reuses its previous filesystem rather than starting fresh. Use this recipe for evaluation only; production should recreate the container per run (or use the Kubernetes recipe) to match the ephemeral, per-session hardening posture.
- `stop_grace_period: 90s` must cover the runner's full drain path (in-flight turn completion + `post-session` hook), the same requirement as `terminationGracePeriodSeconds` on Kubernetes.
- `./environment-secret` should be created with `(umask 077 && cat > ./environment-secret)` so the secret never lands in shell history.
- Docker waits longer before each restart of a container that keeps exiting, up to a ceiling; if the runner can't start (failed start), read its output rather than restarting faster (`docker inspect --format '{{.RestartCount}}' <container>` shows the restart count). The recipe sets no CPU/memory limits; add limits sized for the capacity you run. With `--use-anthropic-git-proxy`, change `--capacity` to `1`.
- Source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md, fetched 2026-11-14
