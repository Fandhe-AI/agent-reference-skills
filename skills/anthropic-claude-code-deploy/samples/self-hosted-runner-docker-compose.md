<!-- source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md / last verified: 2026-08-07 -->

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
