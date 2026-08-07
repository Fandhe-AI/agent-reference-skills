<!-- source: https://code.claude.com/docs/en/self-hosted-environments-quickstart.md / last verified: 2026-08-07 -->

# Start a self-hosted runner and route a session to it

Minimal manual setup for a single self-hosted runner: save the environment secret, start the runner, then send it a follow-up from the CLI.

```bash
mkdir -p /etc/claude
(umask 077 && cat > /etc/claude/environment-secret)
# paste the environment key copied from the Cloud environments admin page, then Ctrl-D

mkdir -p '<writable-dir>'

claude self-hosted-runner --environment-secret-file '/etc/claude/environment-secret' --base-dir '<writable-dir>'
```

```bash
claude -p "your message" --cloud <session-id>
```

## Notes

- The environment must exist first: create it on the [Cloud environments admin page](https://claude.ai/admin-settings/cloud-environments) and copy its environment key (shown once, expires after 365 days).
- Requires Claude Code v2.1.224 or later on the runner host; `claude self-hosted-runner --help` confirms the version recognizes the `self-hosted-runner` subcommand.
- The runner exits once its active sessions finish; production deployments run it under an orchestrator that restarts it (see the Kubernetes / Docker Compose samples).
- The follow-up command (`claude -p ... --cloud <session-id>`) works from any machine signed in with `claude auth login`, not just the runner host.
