<!-- source: https://code.claude.com/docs/en/self-hosted-environments.md / last verified: 2026-11-14 -->

# Self-hosted environments

Runs Claude Code cloud sessions (web, `claude --cloud`, mobile/desktop apps, scheduled routines) on infrastructure your organization operates instead of Anthropic's, via runner processes you deploy. Public beta on Team/Enterprise plans, off by default.

## Signature / Usage

Three parts: **Environment** (named destination created in claude.ai admin settings, grouping runners), **Runner** (a process on your host that claims sessions from the environment's queue, clones the repo, spawns a Claude Code process), **Session** (one Claude Code task). A runner serves one **owner** at a time and locks to the owner of the first session it picks up (a user account, or the Claude Tag agent for Claude Tag channel sessions).

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Environment | concept | Named group of runners; sessions route to the environment, not an individual runner; appears as `pool` / `pool_id` (`ccpool_...`) in API fields, token claims, and metric names |
| Environment secret | credential | Single shared credential runners use to authenticate and register; shown once at creation, labeled "environment key" in the admin UI |
| Runner | process | Long-lived process you deploy; registers, receives a runner token, polls for sessions |
| Session | task | Runs as a child Claude Code process the runner spawns |

## Notes

- Sessions execute inside your network; connections to Anthropic (`api.anthropic.com` for queue polling, event stream, and by default model inference) are outbound HTTPS only — Anthropic never connects into your network.
- Minimum fleet size = number of owners (users and Claude Tag agents) expected active at once.

### Availability and limitations

- Plans: public beta on Team and Enterprise; off by default. An Owner turns on **Allow self-hosted environments** on the Cloud environments admin page, which requires cloud sessions to be enabled for the organization.
- Unavailable for organizations with Zero Data Retention enabled or the HIPAA configuration applied.
- Model inference: Anthropic API by default; a runner can instead send model requests to Amazon Bedrock or Google Cloud's Agent Platform (session content still goes to Anthropic). On a runner configured this way, server-managed settings and organization policies from claude.ai don't reach sessions.
- Surfaces: claude.ai/code, mobile/desktop apps, cloud scheduled tasks, and the terminal (`claude --cloud` or an `--environment` dispatch). Claude Tag sessions can run there too, but Claude can't use Access bundles in those sessions yet. Claude Security and Code Review sessions don't route to them yet.
- Repositories: GitHub or GitHub Enterprise Server; sessions started with an `--environment` dispatch can also use another git host.
- Billing: sessions consume the organization's Claude Code usage the same way Anthropic-hosted sessions do.
- Why self-host: network access to internal services, custom tooling in the runner image, compliance (checkouts and artifacts stay on your infrastructure; session content still goes to `api.anthropic.com`). You own the runner image, the fleet, and its network.

### Session lifecycle

- A runner with free capacity claims a queued session and holds a lease; it clones the repo and spawns a child Claude Code process; the child streams events over HTTPS while each runner poll refreshes the lease (and doubles as heartbeat).
- If the runner stops polling, the lease lapses after about 60 seconds; the server can then take a few minutes and sometimes longer to requeue the session.
- Each poll request gets 10 seconds. On a timeout, lost request, or unparseable response (for example from an intercepting proxy), the runner keeps serving live sessions and retries after a second or two, doubling the gap on each further failure up to 20 seconds, and shortening it when the lease is close to expiring.

### Runner lifecycle

- The first session locks the runner to its owner; it then runs up to `--capacity` concurrent sessions for that owner. After they finish, `--drain-grace-sec` decides: default `0` = exit immediately (so an orchestrator such as Kubernetes restarts it with a fresh disk); a positive value = keep polling the locked owner's queue that many seconds before exiting.
- Claude Tag channel sessions all share one owner (the Claude Tag agent), so a runner locked to it can serve sessions started by different people when `--capacity` is above one or `--drain-grace-sec` is positive.
- `--retire-at <epoch-seconds>`: for infrastructure that destroys hosts at a known time without a usable signal (sandbox lifetime cap, spot reclamation); set a few minutes before the kill. At the retire time the runner stops taking new work, releases each active session (a mid-turn session after its turn finishes, waiting at most `SELF_HOSTED_RUNNER_POST_TURN_SETTLE_MS` for the process to report the turn end; background tasks waited up to 60 seconds, bounded by `SELF_HOSTED_RUNNER_BG_RESULT_GRACE_MS` for the follow-up turn), and exits 0. Released sessions resume on a fresh runner at the user's next message. Without `--retire-at`, a signal-less host kill looks like a crash and the session requeues.
- A `SIGTERM` needs no flag: the runner drains (see the deploy page's Shutdown timing), or keeps serving held sessions with `--defer-shutdown-max-min`.

### Network paths

- Control plane: polls `api.anthropic.com`, posts setup-progress and failure events (outbound HTTPS).
- Git: clones/pushes to your git host over HTTPS or SSH with credentials you provide; with the Anthropic git proxy, github.com git traffic goes through `api.anthropic.com` instead (the child opens a WebSocket for `git` and `gh`).
- Session child: event stream to `api.anthropic.com`, model inference, git commands.
- Optional orchestrator SCM connector isn't available, so its WebSocket tunnel doesn't open.
- Corporate egress proxies are supported: the runner and orchestrator honor `HTTPS_PROXY` / `NO_PROXY` and mTLS variables from Network configuration (set per process; sessions inherit). Session streaming uses server-sent events, so a proxy must not buffer responses.

### What stays on your infrastructure

- Repository checkouts, build artifacts, secrets, and files a session creates stay on your machines. The conversation (prompts, responses, tool results) goes to `api.anthropic.com` and Anthropic stores the transcript so you can resume from another supported surface — also when using Bedrock / Agent Platform for inference. Session orchestration, queueing, and the claude.ai interface remain Anthropic-hosted.
- Distinct from Remote Control (drive your own always-on machine from other devices; available on Pro, Max, and Ultra) — use that instead if you don't use cloud sessions at all.
- Source: https://code.claude.com/docs/en/self-hosted-environments.md, fetched 2026-11-14

## Related

- [Self-hosted environments quickstart](./self-hosted-environments-quickstart.md)
- [Deploy self-hosted environments to production](./self-hosted-environments-deploy.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
- [Test self-hosted environments end to end](./self-hosted-environments-testing.md)
- [Self-hosted environments reference](./self-hosted-environments-reference.md)
- [Verify session identity in self-hosted environments](./self-hosted-environments-identity.md)
