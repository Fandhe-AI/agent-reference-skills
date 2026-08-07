<!-- source: https://code.claude.com/docs/en/auto-mode-config.md / last verified: 2026-08-07 -->

# Configure auto mode

Auto mode lets Claude Code run without routine permission prompts by routing tool calls through a classifier that blocks anything irreversible, destructive, or aimed outside your environment. Deny and explicit ask rules are evaluated *before* the classifier and still block/prompt. This page is the configuration reference; see permission-modes docs for what auto mode is and how to enable it.

Available to all users on every provider (Anthropic API, Claude Platform on AWS, Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, signed-in Claude apps gateway). By default, the classifier trusts only the working directory and the current repo's configured remotes.

## Common boundaries

Auto mode allows pushes to any branch of the working repository, including the default branch, and PR creation by default (since v2.1.211; before that, only the working branch, Claude-created branches, and the default branch). A non-default branch whose name marks it as a deploy target (`production`, `release`, `gh-pages`) isn't covered by that default — the classifier judges it on its own terms. Force pushes, secrets entering a commit, or content that would leave the repo via CI/deploy stay blocked regardless.

### Add a human checkpoint

```json
{ "permissions": { "ask": ["Bash(git push *)", "Bash(gh pr create *)"] } }
```

| Boundary | Mechanism | Behavior in auto mode |
| --- | --- | --- |
| Prompt before the action | `permissions.ask` | Always prompts for content-scoped rules; classifier can't auto-approve |
| Never run the action | `permissions.deny` | Blocks before the classifier is consulted; nothing can override it |
| One-off boundary for this session | State it in conversation | Classifier blocks it, but can be lost to context compaction — use `ask`/`deny` for a durable guarantee |

## Where the classifier reads configuration

The classifier reads the same CLAUDE.md content Claude reads, so project-wide instructions steer both. For cross-project rules, use the `autoMode` settings block:

| Scope | File | Use for |
| --- | --- | --- |
| One developer | `~/.claude/settings.json` | Personal trusted infrastructure |
| Organization-wide | Managed settings | Trusted infrastructure distributed to all developers |
| `--settings` flag or Agent SDK | Inline JSON | Per-invocation overrides for automation |

**Not read** from `.claude/settings.json` or `.claude/settings.local.json` (project-directory files a repo or build step could inject rules into). Before v2.1.207, `.claude/settings.local.json` was also read — move any `autoMode` there to `~/.claude/settings.json`. Entries from each scope combine additively; a developer-added `allow` entry can override an organization `soft_deny` entry.

## Define trusted infrastructure

`autoMode.environment` is usually the only field needed. Three entry kinds (v2.1.198+; before v2.1.195 only the first five):

- **Context slots** (no rules of their own; describe posture): Organization, Primary use of Claude Code, Cloud provider(s), Repository visibility, Internal sharing/snippet hosting, Org-specific CLIs, Secrets management, CI/CD deploy targets, Network posture, Protected deployment namespaces/environments, Data retention/declassification.
- **Trust slots** (name what's inside the boundary; default `None configured` except repo/source-control which default to the working repo+remotes): Trusted repo, Source control, Trusted internal domains, Trusted cloud buckets, Key internal services, Internal package registry.
- **Sensitivity slots** (name what protective rules treat as high-risk; default to broad heuristics like `prod`/`production` in the name): Sensitive data locations & audiences, Sensitive remote targets, Protected IaC scopes.

```json
{
  "autoMode": {
    "environment": [
      "$defaults",
      "Source control: github.example.com/acme-corp and all repos under it",
      "Trusted cloud buckets: s3://acme-build-artifacts, gs://acme-ml-datasets",
      "Trusted internal domains: *.corp.example.com, api.internal.example.com",
      "Key internal services: Jenkins at ci.example.com, Artifactory at artifacts.example.com"
    ]
  }
}
```

Include the literal string `"$defaults"` to splice in the built-in entries alongside your own (position matters). Entries are prose, not regex/tool patterns — write them like describing your infrastructure to a new engineer: organization/primary use, source control orgs, cloud providers and trusted buckets, trusted internal domains, key internal services, internal package registry, sensitive data locations & audiences, sensitive remote targets, protected IaC scopes, additional context. (The registry/sensitivity entries require v2.1.195+.)

## Override the block and allow rules

```json
{
  "autoMode": {
    "environment": ["$defaults", "Source control: github.example.com/acme-corp and all repos under it"],
    "allow": ["$defaults", "Deploying to the staging namespace is allowed: staging is isolated from production and resets nightly"],
    "soft_deny": ["$defaults", "Never run database migrations outside the migrations CLI, even against dev databases"],
    "hard_deny": ["$defaults", "Never send repository contents to third-party code-review APIs"]
  }
}
```

Precedence inside the classifier: `hard_deny` (unconditional) > `soft_deny` (blocks unless overridden) > `allow` (exceptions to `soft_deny`) > explicit user intent (overrides remaining soft blocks only when the message directly and specifically names the exact action — general requests like "clean up the repo" don't count). **Omitting `"$defaults"` from an array discards the built-in rules for that section entirely** — only do this after reviewing `claude auto-mode defaults` output and copying what you still want.

## Route all shell commands through the classifier

```json
{ "autoMode": { "classifyAllShell": true } }
```

By default, narrow Bash/PowerShell allow rules (e.g. `Bash(npm test)`) still resolve before the classifier in auto mode; only broad rules (`Bash(*)`, wildcarded interpreters) are suspended. Setting `classifyAllShell: true` suspends every shell allow rule, trading latency (each command becomes a classifier call) for coverage. Requires v2.1.193+; applies only while auto mode is active.

## Inspect the defaults and your effective config

| Command | Purpose |
| --- | --- |
| `claude auto-mode defaults` | Print built-in `environment`/`allow`/`soft_deny`/`hard_deny` rules as JSON (`--label <prefix>` filters by label prefix, v2.1.208+) |
| `claude auto-mode config` | Print what the classifier actually uses, with your settings applied and defaults otherwise |
| `claude auto-mode critique` | AI feedback on your custom `allow`/`soft_deny`/`hard_deny` rules |
| `claude auto-mode reset` | Remove `autoMode` from `~/.claude/settings.json`, restoring defaults (`--yes` skips confirmation; v2.1.212+; doesn't touch managed/`--settings` sources) |

## Review denials

Denials appear under `/permissions` → **Recently denied**; press `r` to mark for retry. The shown reason is usually the fixed text `Blocked by classifier` (v2.1.208+); some sessions show a short model-written explanation instead. Fix a denial by adding the destination to `autoMode.environment`, adding an `allow` rule, or stating the one-off intent and retrying. Programmatic reaction: the `PermissionDenied` hook.

## Options / Props

| Key | Type | Description |
| --- | --- | --- |
| `autoMode.environment` | array | Trusted repos/buckets/domains/services (prose); `"$defaults"` splices in built-ins |
| `autoMode.allow` | array | Exceptions to `soft_deny` (prose) |
| `autoMode.soft_deny` | array | Destructive actions user intent can clear (prose) |
| `autoMode.hard_deny` | array | Unconditional security boundaries (prose) |
| `autoMode.classifyAllShell` | boolean | Route every shell command through the classifier while auto mode is active |

## Notes

This page was retrieved in full (no truncation observed).

## Related

- [settings.md](./settings.md): the `autoMode` key's place among other settings, and settings-file precedence
- [errors.md](./errors.md): classifier failure messages (`Auto mode cannot determine the safety of an action`, `Auto mode classifier transcript exceeded context window`)
