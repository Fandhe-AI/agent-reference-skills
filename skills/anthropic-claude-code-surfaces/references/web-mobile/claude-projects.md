<!-- source: https://code.claude.com/docs/en/claude-projects.md / last verified: 2026-10-17 -->

# Let Claude coordinate ongoing work with Projects

A project is one ongoing conversation where Claude coordinates a stream of related work, starting a thread (usually a cloud session) for each task. Threads run in parallel, share the project's repositories, instructions, and memory, and can be checked and steered from a phone.

## Signature / Usage

Project instructions (**Project settings > Memory > Project instructions**, up to 16,000 characters) are sent to every new thread:

```text
This project holds p95 latency for the payments API under 200 ms: profiling, query and caching fixes, and the dependency upgrades that come with them, in the payments-api repository.

- Branch from main and open one draft pull request per thread.
- Before you call work done, run `make test` and `make lint` and paste the summary lines in your final message.
- If you can't reach something you need, such as a repository, a secret, an API, or a connector, say exactly what's missing in your first message and stop. Don't substitute, mock, or guess.
- Don't merge, force-push, or change CI configuration without asking me in the thread.
```

Run a thread on your own computer through Remote Control (needs Claude Code v2.1.280 or later on that computer):

```bash
# In the folder the task needs; add --spawn worktree in a git repository
claude remote-control
```

Then choose **Work locally** from the **+** menu beside the message box and click **Allow once** on the **Allow Claude to work in a folder on your device** card.

## Options / Props

Project settings (changed at claude.ai/code or in the desktop app, not in `settings.json`; changes reach new threads only):

| Setting | Section | What it controls |
| --- | --- | --- |
| Name, icon, and goal | General | The project's name and icon in the sidebar, and its one-line goal |
| Coordinator model and effort | General | The model and effort level for Claude in the project conversation |
| Thread model and effort | General | The model and effort level for threads |
| Project instructions | Memory | Standing rules every new thread receives |
| Project repositories | Environment | The repositories new cloud threads clone |
| Cloud environment | Environment | The cloud environment new cloud threads run in |
| Plugins | Plugins | The plugins that load into each new cloud thread |
| Usage | Usage | Token use by thread and by model |
| Memory | Memory | The project's memory files |
| Restart Claude | General | Restarts the project conversation when Claude stops responding there |
| Pause, Archive, Delete | General | Stops, hides, or removes the project |

**Overview** pane thread groups:

| Group | What's in it |
| --- | --- |
| Ready for review | Threads whose pull request is open and awaiting review |
| Waiting on you | Threads that need your reply or approval, or that failed |
| Working | Threads still running |
| Landing | Threads whose pull request is approved or queued to merge |
| Idle | Threads that finished and aren't waiting on anything |
| Resolved | Threads marked done: by you, by Claude after the last step such as merging, or automatically after a week with no activity |

What threads pick up from repositories:

| In each repository | One repository | Several repositories |
| --- | --- | --- |
| `CLAUDE.md` | Loaded when the thread starts | Loaded from every repository |
| Skills, agents, and commands under `.claude/` | Loaded | Loaded from every repository |
| Plugins enabled in `.claude/settings.json` | Not loaded; add in **Project settings > Plugins** | Not loaded; add in **Project settings > Plugins** |
| Permission rules, hooks, and `env` in `.claude/settings.json` | Apply, except `env` keys no cloud session honors | Don't apply in an Anthropic-hosted environment; self-hosted environments follow their own configuration |

## Notes

- Public beta on Pro and Max plans, rolling out gradually; not available on Team or Enterprise plans yet. If **Projects** doesn't appear in the sidebar at claude.ai/code or in the desktop app Code tab, join the waitlist.
- Available at claude.ai/code, in the desktop app, and in the Claude mobile app (iOS / Android); not in the terminal CLI, the VS Code extension, or the JetBrains plugin, and not through Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.
- Create from scratch via **New project** (only Name is required; Goal and Context are optional), or from an existing cloud session via **Continue as project** / **Move to project**. A local session has neither option.
- Prerequisites for code work: GitHub repositories on github.com (not GitHub Enterprise Server, GitLab, or Bitbucket), push access for your connected GitHub account, and the Claude GitHub App installed. A `/web-setup` token alone is not enough for a project's cloud threads.
- A new project runs every thread on Opus at high effort (conversation at low effort), which draws on your plan fastest.
- Cloud threads work on a new branch from the default branch, and watch their pull request with auto-fix turned on. The enforced limit is 200 new threads per day across your projects; a thread limit you ask for is a preference, not a cap.
- Threads run in auto mode when the thread's model supports it. A permission prompt is answered inside that thread; telling Claude in the project conversation to go ahead doesn't reach it.
- Project memory (files under **Project settings > Memory**, listed under **Auto memory**, indexed by `MEMORY.md`) is separate from Claude Code's local auto memory and from repository `CLAUDE.md`. A thread run on your computer starts with project instructions but not memory files.
- Files and folders: Library tab accepts up to 100 files and 2 GB per pick (single file up to 480 MB); the New project dialog skips files over 30 MB; a folder copy holds the first 100 files up to 200 MB (no hidden files or `node_modules`); up to 10 folders and Google Drive folders combined.
- A thread on your computer can't run while **Require trusted devices** is on for your account, and it pauses while the computer is asleep.
- A project belongs to one user: no sharing, no organization-level controls during the beta, no moving threads between projects, no merging projects. A local session you started yourself can't be added to a project.
- A cloud thread's sandbox pauses between turns; if it can't be resumed, the thread continues from a fresh clone and uncommitted changes can be lost.
- Distinct from Claude Tag (Slack-channel Claude for Team and Enterprise), subagents (side tasks inside one session), agent teams, and the earlier claude.ai chat / Cowork Projects.

## Related

- [claude-code-on-the-web](./claude-code-on-the-web.md)
- [mobile](./mobile.md)
- [web-quickstart](./web-quickstart.md)
