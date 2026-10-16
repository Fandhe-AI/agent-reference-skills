<!-- source: https://code.claude.com/docs/en/permission-modes.md / last verified: 2026-10-16 -->

# Choose a permission mode

Permission modes control how often Claude Code pauses to ask before editing files, running commands, or making network requests.

## Signature / Usage

```bash
claude --permission-mode plan
claude --permission-mode acceptEdits
claude --dangerously-skip-permissions   # equivalent to --permission-mode bypassPermissions
```

```json
// settings file
{ "permissions": { "defaultMode": "acceptEdits" } }
```

## Options / Props

| Mode | What runs without asking | Best for |
|---|---|---|
| `default` (labeled Manual; `manual` is accepted as an alias) | Reads only | Getting started, sensitive work |
| `acceptEdits` | Reads, file edits, common filesystem commands (`mkdir`, `touch`, `mv`, `cp`, etc.) | Iterating on reviewed code |
| `plan` | Reads, plus classifier-approved commands when auto mode is available | Exploring before changing |
| `auto` | Everything, with background classifier safety checks | Long tasks, fewer prompts |
| `dontAsk` | File reads inside your working directories and pre-approved tools; anything that would prompt is denied | Locked-down CI/scripts |
| `bypassPermissions` | Everything (including protected-path writes) | Isolated containers/VMs only |

- `Shift+Tab` cycles `default → acceptEdits → plan` (plus `bypassPermissions`/`auto` if enabled); from `auto`, the first press switches to `default`. `dontAsk` never appears in the cycle.
- With Claude Code v2.1.283+, `auto` is the built-in starting permission mode for interactive terminal and VS Code sessions on every plan and provider. On earlier versions it is the built-in starting mode only on Pro, Max, and Team plans. (The built-in `auto` default needs v2.1.228+ on macOS/Linux/WSL and v2.1.233+ on native Windows; `claude -p` / Agent SDK sessions start in `default` when they fetch feature flags.) With the HIPAA configuration applied (v2.1.285+), sessions start in `default` and auto stays available.
- Auto mode requires: any plan; Team/Enterprise has it on by default (admins can disable via `permissions.disableAutoMode`); model on the Anthropic API and Claude Platform on AWS: Opus 4.6+, Sonnet 4.6+, Haiku 5.5, or a Fable model; on Bedrock / Agent Platform / Foundry / signed-in Claude apps gateway: only Sonnet 5+, Opus 4.7+, Haiku 5.5, and Fable models (Haiku 5.5 on these providers needs v2.1.293+). Sonnet 4.5, Opus 4.5, Haiku 4.5 and claude-3 models are unsupported everywhere.
- `defaultMode: "auto"` and `defaultMode: "bypassPermissions"` are ignored in `.claude/settings.json` / `.claude/settings.local.json` (the latter changed in v2.1.257, changelog), so a repo can't grant itself those modes; set them in user or managed settings or pass `--permission-mode`.
- Prompt option "Yes, and switch to auto mode" is added to Bash permission prompts in Manual and `acceptEdits` mode when auto mode is available (v2.1.247+; not on PowerShell prompts or prompts forced by ask rules / hooks).

## Notes

- Auto mode's classifier blocks-by-default categories include: `curl | bash`, sending sensitive data externally, production deploys/migrations, mass cloud-storage deletion, granting IAM/repo permissions, force push, `git reset --hard`/`git clean -fd`, `terraform destroy`-class commands, writing to secret managers, merging unapproved PRs, opening tunnels/reverse shells, printing live credentials, disarming safety flags (`--insecure`), and writes to Claude Code's own session transcripts.
- Classifier is blocked-by-default also for (v2.1.257+): requesting credentials from the cloud instance-metadata endpoint (e.g. `169.254.169.254`) or authenticating with the machine's own service-account/node identity; reaching a public host by a route other than a direct request (tunnel, reverse shell, rewritten resolver/proxy); reading host-owned credentials (node certificates, node registry auth); connecting to or scanning sibling containers/pods/VMs or the node beneath (Containment Escape rules; describe intended setups in a Host containment entry in `autoMode.environment`). Also: `git remote set-url` / `git remote add` unless you named the remote, opening a PR against a different repository or organization, forking with `gh repo fork`, commenting out or force-passing a test that guards security behavior, and (v2.1.261+) posting a link to a public paste/diagram/data-sharing service when the URL itself carries the content. A remote added or repointed during the session isn't trusted. Run `claude auto-mode defaults` to print the full rule lists.
- Classifier fallback: 3 consecutive or 20 total blocks in a session pause auto mode and resume normal prompting; thresholds aren't configurable.
- Server-side classifier review: in auto mode Claude Code can ask the server to review actions as part of the session's model requests instead of sending its own classifier requests (direct Anthropic API: terminal v2.1.271+ on Pro/Max/Team, v2.1.278+ on Enterprise/API accounts; `-p` / Agent SDK / VS Code / desktop v2.1.281+; cloud providers and LLM gateways v2.1.278+; signed-in Claude apps gateway v2.1.280+). If the server doesn't review the session, Claude Code falls back to its own classifier requests, and once the fallback holds for the session it shows a notice about classifier request charges (see auto-mode-classifier-billing). If the server gives no verdict for an action, the action is denied, and the turn stops after ten responses in a row with no verdict. `CLAUDE_CODE_AUTO_MODE_SERVER=0` forces Claude Code's own classifier requests; `=1` turns server review on where it isn't yet (needs v2.1.281+ on a direct connection).
- `permissions.disableAutoMode` now applies to a running session when it arrives from an admin-deployed source (shows `auto mode disabled by settings`); before v2.1.251 a running session kept auto mode until it ended.
- Actions no mode auto-approves (including `bypassPermissions`): tools matched by an explicit ask rule; connector tools your organization set to `ask`; tools requiring user interaction (`AskUserQuestion`, MCP tools marked `requiresUserInteraction`); `rm` / `rmdir` targeting a critical path; the cross-session messaging safeguards; reads outside the working directories while `permissions.blockReadsOutsideWorkingDirectories` is on (v2.1.257+).
- Critical-path removals (`rm -rf /`, `rm -rf ~`, working directory and parents, etc.) in `auto` / `bypassPermissions` show a two-minute countdown in the terminal prompt, then are denied; after three unanswered prompts in a session further ones are denied immediately; in `auto` where no terminal prompt can show (`-p`, Agent SDK, VS Code chat panel, Desktop) they are denied immediately. Requires v2.1.281+; `CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT=1` turns it off.
- Protected paths (`.git`, `.claude`, `.vscode`, `.gitconfig`, `.npmrc`, shell rc files, etc.) are never auto-approved except in `bypassPermissions` mode or planning sessions with bypass permissions available — even a matching `permissions.allow` rule doesn't change this.
- `bypassPermissions` still prompts for explicit `ask` rules, org-`ask` connector tools, `requiresUserInteraction` MCP tools, and `rm -rf /` / `rm -rf ~` circuit breakers. Refuses to start as root/sudo on Linux/macOS outside a recognized sandbox.
- The Agent SDK's `canUseTool` permission callback (programmatic, per-tool-call approval) is a separate mechanism from these CLI permission modes; see anthropic-agent-sdk for that API. The `settings.json` `defaultMode` basics here belong to Claude Code itself; see anthropic-claude-code for general settings usage.

## Related

- [permissions](./permissions.md)
- [auto-mode-classifier-billing](./auto-mode-classifier-billing.md)
- [sandboxing](./sandboxing.md)
- [sandbox-environments](./sandbox-environments.md)
