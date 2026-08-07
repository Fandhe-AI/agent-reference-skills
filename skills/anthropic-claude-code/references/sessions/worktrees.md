<!-- source: https://code.claude.com/docs/en/worktrees / last verified: 2026-08-07 -->
# Worktrees

A git worktree is a separate working directory with its own files and branch, sharing repository history and remote with the main checkout. Running each Claude Code session in its own worktree keeps edits from colliding, so one session can build a feature while another fixes a bug. Requires a git repository unless you replace the git logic with `WorktreeCreate`/`WorktreeRemove` hooks.

## Signature / Usage

```bash
claude --worktree feature-auth        # or -w; creates .claude/worktrees/feature-auth on branch worktree-feature-auth
claude --worktree "#1234"             # branch from PR #1234 (quote so the shell doesn't treat # as a comment)

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
- Worktrees share the repository's `.git` directory, project-scope plugins, and saved "don't ask again" permission approvals with the main checkout — approvals persist even after the worktree is removed.
- Agent SDK session resume across worktrees follows the same re-entry logic described here; for SDK-side session *storage* (mirroring transcripts to S3/Redis/custom backends), see the `anthropic-agent-sdk` skill.

## Related

- [Manage sessions](./sessions.md): resuming a worktree-bound session
- [Checkpointing](./checkpointing.md): rewind file changes within a single session
