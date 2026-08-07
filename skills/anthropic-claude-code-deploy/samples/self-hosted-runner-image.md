<!-- source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md / last verified: 2026-08-07 -->

# Build a self-hosted runner image

Minimal Dockerfile that installs the `claude` binary and configures git identity for a self-hosted runner container.

```dockerfile Dockerfile
FROM debian:bookworm-slim
ARG CLAUDE_CODE_VERSION
RUN apt-get update && apt-get install -y --no-install-recommends git curl ca-certificates openssh-client \
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL "https://downloads.claude.ai/claude-code-releases/${CLAUDE_CODE_VERSION:?set with --build-arg CLAUDE_CODE_VERSION}/linux-x64/claude" \
      -o /usr/local/bin/claude && chmod +x /usr/local/bin/claude
RUN git config --system user.name "Claude" \
 && git config --system user.email "noreply@anthropic.com" \
 && git config --system --add safe.directory '*'
ENTRYPOINT ["claude"]
```

```bash
docker build --build-arg CLAUDE_CODE_VERSION=2.1.224 -t <your-registry>/claude-runner:latest .
```

## Notes

- Swap `linux-x64` for `linux-arm64` on ARM nodes, or for `linux-x64-musl` / `linux-arm64-musl` on Alpine-based images.
- Anthropic doesn't publish a pre-built runner image; add whatever toolchain (language runtimes, compilers, MCP sidecars) the target repositories need on top of this base.
- Without `git config user.name`/`user.email`, `git commit` fails with `Please tell me who you are` and sessions can't make progress. Don't bake long-lived push credentials into a shared image; mint per-session credentials from a wrapper script instead.
- Pin `CLAUDE_CODE_VERSION` explicitly to hold a fleet on one version; the runner turns off auto-update inside the sessions it spawns.
