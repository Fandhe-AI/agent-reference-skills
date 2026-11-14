<!-- source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md / last verified: 2026-11-14 -->

# Build a self-hosted runner image

Minimal Dockerfile that installs the `claude` binary and configures git identity for a self-hosted runner container.

```dockerfile Dockerfile
FROM debian:bookworm-slim
ARG CLAUDE_CODE_VERSION
RUN apt-get update && apt-get install -y --no-install-recommends git curl ca-certificates openssh-client jq python3 \
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL "https://downloads.claude.ai/claude-code-releases/${CLAUDE_CODE_VERSION:?set with --build-arg CLAUDE_CODE_VERSION}/linux-x64/claude" \
      -o /usr/local/bin/claude && chmod +x /usr/local/bin/claude
RUN git config --system user.name "Claude" \
 && git config --system user.email "noreply@anthropic.com" \
 && git config --system --add safe.directory '*'
ENTRYPOINT ["claude"]
```

```bash
# If your model needs a newer release, change stable to latest in the URL
docker build \
  --build-arg CLAUDE_CODE_VERSION="$(curl -fsSL https://downloads.claude.ai/claude-code-releases/stable)" \
  -t <your-registry>/claude-runner:latest .
```

## Notes

- Swap `linux-x64` for `linux-arm64` on ARM nodes, or for `linux-x64-musl` / `linux-arm64-musl` on Alpine-based images (see the official Alpine setup notes for extra packages).
- `python3` is needed because the hooks the control plane supplies to Claude Tag sessions run it; keep it on `PATH` in any image that serves Claude Tag sessions (runner v2.1.229+). `jq` is needed for the built-in `gh` `--jq` option.
- Anthropic doesn't publish a pre-built runner image; add whatever toolchain (language runtimes, compilers, MCP sidecars) the target repositories need on top of this base.
- Without `git config user.name`/`user.email`, `git commit` fails with `Please tell me who you are` and sessions can't make progress. Don't bake long-lived push credentials into a shared image; mint per-session credentials from a wrapper script instead.
- The build command looks up the current `stable` release number each time; pass a version number directly as `CLAUDE_CODE_VERSION` to pin for reproducible builds. The runner turns off auto-update inside the sessions it spawns. You can verify the binary against the release's signed manifest (Binary integrity and code signing in the setup docs).
- Source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md, fetched 2026-11-14
