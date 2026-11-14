<!-- source: https://code.claude.com/docs/en/claude-projects.md / last verified: 2026-11-14 -->

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
| Auto-continue when usage limits reset | General | Whether a thread or the conversation that stops at a usage limit continues on its own when the limit resets (on by default; applies to the whole project) |
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

| In each repository | In a cloud thread |
| --- | --- |
| `CLAUDE.md`, `.claude/CLAUDE.md`, `.claude/rules/` at the repository root | Loaded from every repository when the thread starts; subdirectory `CLAUDE.md` files and path-specific rules aren't loaded |
| Skills under `.claude/skills/` | Not loaded; enable the skill for your claude.ai account instead |
| Agents and commands under `.claude/` | Not loaded; run the thread on your own computer |
| MCP servers in `.mcp.json` | Not loaded; use the connectors on your claude.ai account |
| Plugins enabled in `.claude/settings.json` | Not loaded; add in **Project settings > Plugins** |
| Permission rules, hooks, and `env` in `.claude/settings.json` | Not applied / not run; approve inside the thread, set variables in the cloud environment, or run the thread on your own computer |

## Notes

- Public beta on Pro, Max, and Ultra plans, rolling out gradually; not available on Team or Enterprise plans yet. If **Projects** doesn't appear in the sidebar at claude.ai/code or in the desktop app Code tab, check under **More**, then join the waitlist. If the button reads **Get started** instead of **New project**, upgrade or archive the listed existing claude.ai projects first.
- Available at claude.ai/code, in the desktop app, and in the Claude mobile app (iOS / Android); not in the terminal CLI, the VS Code extension, or the JetBrains plugin, and not through Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.
- Create from scratch via **New project** (only Name is required; goal and **Context** are optional), or from an existing cloud session via **Continue in project** in its sidebar menu, then **Continue as new project** or an existing project. A local session connected through Remote Control gets the same menu at claude.ai/code, unless **Require trusted devices** is on for your account.
- On your first project, Claude takes a turn on its own (using your plan): it may start a read-only exploring thread and post **Setup recommendations** (repositories, scheduled tasks), which you switch off or accept with **Update setup**. Routing: quick questions are answered in place, new work goes to a new or existing thread, and Claude can propose threads in a **Suggested threads** list.
- GitHub setup: connect GitHub once, install the Claude GitHub App on the repositories (an organization owner must approve on organization-owned repositories), and authorize SSO for organizations that enforce SAML SSO. Cloud thread repository errors: `Couldn't start the session — Claude doesn't have GitHub access to this project's repository`, `Unable to access your repository`, and `Claude can't access` a repository (install or reconnect link). Claude can only add repositories from a GitHub owner the project already uses; a thread can add a repository to itself (that thread only, clone happens mid-task so its `CLAUDE.md` isn't loaded at start). A project doesn't need a repository; threads deliver files to the project's **Library**.
- Running a thread on your computer: needs Claude Code v2.1.280 or later; connect the folder via the desktop app (**Use this computer from your phone and claude.ai** under **Settings > Code**) or `claude remote-control` (with `--spawn worktree` for per-thread worktrees), choose **Work locally** from the **+** menu, then **Allow once** on the card. The thread uses auto mode unless `claude remote-control` is started with `--settings` and `permissions.defaultMode` picks another mode, and uses that machine's files, MCP servers, hooks, and permission rules.
- Tuning: preferences you give Claude (thread limits, update cadence, "propose before starting") are saved to project memory and followed, but are not hard caps.
- Skills, plugins, connectors in threads: enable skills for your claude.ai account (repository `.claude/skills/` don't load); add plugins in **Project settings > Plugins**; MCP tools come from your claude.ai connectors (the project conversation itself has none); install CLI tools in the environment's setup script. Turning a connector off from the **+** menu in a thread saves that as your account default.
- **Overview** pane: reopen with the **Threads** button (dot when something waits on you); also **Library** and **Scheduled tasks**. Desktop app notifications are configurable under **Notifications** in the project's sidebar menu. Open a thread to read it, steer it in its own message box, answer prompts, or **Stop** / Esc.
- **Pause** interrupts everything; **Archive** hides the project and archives its threads (scheduled tasks don't run); **Delete** is permanent (branches and PRs on GitHub are unaffected).
- Usage: cache lifetime is an hour on Pro, Max, and Ultra within plan limits, so reviving an old idle thread re-reads its whole conversation; prefer a fresh thread. Threads stopped at the five-hour or weekly limit auto-continue after reset unless **Auto-continue when usage limits reset** is off. Going past plan limits needs usage credits. A thread watching a PR wakes and uses your plan when CI fails or a comment arrives.
- Common messages: `Claude hasn't responded` (**Restart Claude**), `Claude ran out of context on this turn`, `Claude is out of date on your device` (Claude Code older than v2.1.280), `Reached the turn limit` (`CLAUDE_CODE_MAX_TURNS`), `The project's environment was removed`, `Lost contact with your folder` (wake the computer or restart the desktop app / `claude remote-control`).
- Source: https://code.claude.com/docs/en/claude-projects.md (fetched 2026-11-14)
- Prerequisites for code work: GitHub repositories on github.com (not GitHub Enterprise Server, GitLab, or Bitbucket), push access for your connected GitHub account, and the Claude GitHub App installed. A `/web-setup` token alone is not enough for a project's cloud threads.
- A new project runs every thread on Opus at high effort (conversation at low effort), which draws on your plan fastest.
- Cloud threads work on a new branch from the default branch, and watch their pull request with auto-fix turned on. The enforced limit is 500 new threads per day across your projects; a thread limit you ask for is a preference, not a cap.
- Threads run in auto mode when the thread's model supports it. A permission prompt is answered inside that thread; telling Claude in the project conversation to go ahead doesn't reach it.
- Project memory (files under **Project settings > Memory**, listed under **Auto memory**, indexed by `MEMORY.md`) is separate from Claude Code's local auto memory and from repository `CLAUDE.md`. A thread run on your computer starts with project instructions but not memory files.
- Files and folders (uploaded files appear under `/mnt/project-files`): up to 1,000 files and 2 GB at a time, single file up to 480 MB; uploaded folders skip hidden files and `node_modules`; up to 10 folders and Google Drive folders combined (single files don't count). Uploads are copies; re-upload and choose **Replace** to update.
- A thread on your computer can't run while **Require trusted devices** is on for your account, and it pauses while the computer is asleep (the desktop app has **Keep this computer awake for Remote Control**).
- A project belongs to one user: no sharing, no organization-level controls during the beta, no moving threads between projects, no merging projects. A local session you started yourself can't be added to a project.
- A cloud thread's sandbox pauses between turns; if it can't be resumed, the thread continues from a fresh clone and uncommitted changes can be lost.
- Distinct from Claude Tag (Slack-channel Claude for Team and Enterprise), subagents (side tasks inside one session), agent teams, and the earlier claude.ai chat / Cowork Projects.

## Related

- [claude-code-on-the-web](./claude-code-on-the-web.md)
- [mobile](./mobile.md)
- [web-quickstart](./web-quickstart.md)
