<!-- source: https://code.claude.com/docs/en/worktrees / last verified: 2026-10-16 -->
# Worktrees

A git worktree is a separate working directory with its own files and branch, sharing repository history and remote with the main checkout. Running each Claude Code session in its own worktree keeps edits from colliding, so one session can build a feature while another fixes a bug. Requires a git repository unless you replace the git logic with `WorktreeCreate`/`WorktreeRemove` hooks.

## Signature / Usage

```bash
claude --worktree feature-auth        # or -w; creates .claude/worktrees/feature-auth on branch worktree-feature-auth
claude --worktree "#1234"             # branch from PR #1234 (quote so the shell doesn't treat # as a comment)
claude --worktree https://gitlab.com/group/repo/-/merge_requests/123   # GitHub PR URL or GitLab MR URL also accepted

git worktree add ../project-feature-a -b feature-a   # manual worktree creation
git worktree list
git worktree remove ../project-feature-a
```

```json
{
  "worktree": { "baseRef": "head" }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--worktree <name>` / `-w` | flag | Creates an isolated worktree under `.claude/worktrees/<name>/` on a new branch and starts Claude there |
| `worktree.baseRef` | setting | `"fresh"` (default, branches from the remote default branch) or `"head"` (branches from current local `HEAD`, carrying unpushed commits) |
| `isolation: worktree` | subagent frontmatter | Runs a custom subagent (`.claude/agents/`) in its own temporary worktree |
| `.worktreeinclude` | file | `.gitignore`-syntax list of gitignored files (e.g. `.env`) to copy into every new worktree |

## Notes

- Claude Code enforces isolation for any session running in a worktree (interactive, background, or subagent): it blocks `Edit`/`Write`/`NotebookEdit` targeting the main checkout, blocks Bash/PowerShell/Monitor commands whose working directory resolves there, and blocks git redirects (`git -C`, `--git-dir`, `GIT_DIR`/`GIT_WORK_TREE`, or a `cd` before `git`) into the main checkout.
- On exit, an unnamed session's clean worktree is auto-removed; a named session, or one with uncommitted/untracked changes or new commits, prompts you to keep or remove it. `-p` runs have no exit prompt — clean up with `git worktree remove`.
- Resuming a session returns it to its worktree (interactive, `-p --continue/--resume`, and the Agent SDK) after Claude Code verifies the directory is still a genuine separate checkout; a periodic sweep also removes stale subagent/background-session worktrees older than `cleanupPeriodDays` that hold no uncommitted work.
- Branching from a PR or MR: `--worktree` accepts `#<number>`, a GitHub pull request URL, or a GitLab merge request URL. Claude Code reads only the number from the URL, always fetches from `origin`, and creates `.claude/worktrees/pr-<number>`. The fetch path depends on `origin`'s host: github.com fetches `pull/<number>/head`; gitlab.com fetches `merge-requests/<number>/head`; GitHub Enterprise, self-managed GitLab, or any other host tries `pull/<number>/head` first, then `merge-requests/<number>/head`. The fetch never waits for input (a password, key passphrase, or new SSH host confirmation makes it fail with `Error creating worktree: Failed to fetch PR/MR #<number>`; a key held by `ssh-agent` still works). Before v2.1.233, only `#<number>` and GitHub-style pull request URLs were accepted and `pull/<number>/head` was always fetched.
- On exit, Claude also checks for uncommitted work inside checked-out submodules; a worktree whose submodules can't be inspected prompts you rather than being removed automatically (requires v2.1.274 or later).
- Untracked skills, agents, and commands: when the worktree checkout has no `.claude/skills` directory at its root (for example your `.claude/skills` is gitignored), Claude Code loads the main checkout's project skills in the worktree session; the same read-through covers `.claude/agents` and `.claude/commands`. For skills it requires v2.1.277 or later. Project-scope plugins from the main checkout also load in worktrees (v2.1.200+).
- Filter drivers: Claude Code skips the repository's own git filter drivers when it creates a worktree (a filter driver is a shell command that anything able to write to the repository could have planted), so a worktree can contain Git LFS pointer files after `git lfs install --local`; a plain `git lfs install` (global config) isn't affected. Before v2.1.247, Claude Code ran those drivers during worktree creation. In four rare cases Claude Code creates no worktree at all (it can't tell which filter drivers the repository config defines, or finds a setting it can't switch off).
- Resume refusals: in `-p` mode and on Agent SDK resumes, Claude Code stops the resume with a stderr error (`Error: cannot resume into worktree <path>: ...This session was not started.`, `Error: could not verify worktree <path> for this resume, so the resume was aborted...`, `Error: ...The worktree binding is kept.`) for every refusal except a gone worktree. With `--output-format stream-json`, the refusal also arrives on stdout as a `result` message with subtype `error_during_execution`, and `startup_failure_reason` is `worktree_unverified` (for the `could not verify worktree` error) or `worktree_resume_refused` (for the `cannot resume into worktree` and `The worktree binding is kept` errors). Before v2.1.274 the result carried no `startup_failure_reason` field; before v2.1.260 a worktree-resume refusal produced no `result` message and Claude Code didn't write the cleared binding, so every retry failed the same way.
- Worktrees share the repository's `.git` directory, project-scope plugins, and saved "don't ask again" permission approvals with the main checkout — approvals persist even after the worktree is removed.
- Agent SDK session resume across worktrees follows the same re-entry logic described here; for SDK-side session *storage* (mirroring transcripts to S3/Redis/custom backends), see the `anthropic-agent-sdk` skill.

## Related

- [Manage sessions](./sessions.md): resuming a worktree-bound session
- [Checkpointing](./checkpointing.md): rewind file changes within a single session
