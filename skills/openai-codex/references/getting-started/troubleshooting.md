# Troubleshooting

FAQ, logs, stuck-state recovery, and terminal issues for the ChatGPT desktop app and Codex.

## Signature / Usage

Compare Codex versions when a feature works in the CLI but not in the desktop app:

```bash
codex --version
/Applications/Codex.app/Contents/Resources/codex --version   # Codex bundled with the desktop app (retained Codex.app compatibility bundle path)
```

## Options / Props

| Symptom | Resolution |
|---------|------------|
| Files in side panel that Codex didn't edit | The review panel reflects the project's Git state. Switch staged/unstaged or compare with main; use the **Last turn** view for only the last turn's changes. |
| Remove a project from the sidebar | Hover the project name, select the three dots, choose **Remove**. Re-add via **Add new project** next to **Chats** or `Cmd`+`O`. |
| Find archived chats | In Settings (`codex://settings`), **Archived chats**; unarchived chats return to their original sidebar location. |
| Only some chats appear in sidebar | Filter icon next to **Chats** > **Chronological**; then check **Archived chats** in Settings. |
| Code doesn't run on a worktree | Worktrees inherit Git-checked-in files only. Use a local environment setup script, or copy ignored files with `.worktreeinclude`, or check out the changes in the regular project. |
| Teammate's shared local environment not picked up | The configuration must be in the `.codex` folder at the project root; open the project at the directory containing `.codex`. |
| Codex asks to access Apple Music | macOS requires approval for directories such as Music, Downloads, Desktop when Codex reads your home directory. |
| Scheduled tasks create many worktrees | Archive scheduled runs you no longer need; avoid pinning runs unless you intend to keep their worktrees. |
| Wrong target (Local / Worktree / Cloud) | Cancel the run and press the up arrow key in the composer to recover the prompt. |
| Fonts not rendering correctly | Set **Code font** in Settings (shared by review pane, integrated terminal, other code). |

## Notes

- **Approve for me missing or disabled**: select it from the permissions control below the composer. Update the app and check the permissions menu in that chat (choices differ between local and cloud). For local execution check for an explicit `features.guardian_approval = false` and the configured permission profile, approval policy, and approval reviewer. In a managed workspace, ask the administrator; organization or device policy can restrict these and local settings can't override it. If still unavailable, include app version, OS, execution environment, and whether the option is missing or disabled in feedback.
- **Work conversation does not appear on another device**: confirm the same ChatGPT account and workspace on each device; ask the workspace owner to check Work Cloud and **Allow local computer access**. If `enforce_residency` is enabled in any cloud policy, **Allow local computer access** is disabled for both Work and dots. Sync applies only to tasks created after it is enabled; existing tasks are not migrated.
- **Synced task cannot use the computer's files or tools**: keep the computer online. If unavailable when a new turn starts, an eligible synced task can continue in a cloud container without access to the computer's files or tools; a running turn doesn't move automatically.
- **Turn stopped after Local computer access with Work Cloud was turned off**: running turns are interrupted; send a new message to start another turn (in an existing cloud conversation it uses Work Cloud without local files).
- **Automated policy updates missing**: use the policy API for Global settings; use the Agent Security UI for Local or Codex Cloud settings. Existing Global API workflows remain after migration; test scripts and Terraform integrations and confirm policy assignments and ordering are unchanged.
- **Environment allows network access but the action is blocked**: a higher-priority policy wins even if a lower-priority one is more specific; within one policy, OS-specific environment overrides take priority over all-OS overrides, then Global. Managed HTTP/SOCKS listener ports and non-loopback proxy listeners are unsupported by the cloud runtime; socket-rule support depends on the execution path. Don't broaden the global baseline to work around a failed test.
- **Feedback**: type `/` in the composer to send feedback (you receive a session ID). Report issues in the `openai/codex` GitHub repo.
- **Logs**: App logs (macOS) `~/Library/Logs/com.openai.codex/YYYY/MM/DD`; session transcripts `$CODEX_HOME/sessions` (default `~/.codex/sessions`); archived sessions `$CODEX_HOME/archived_sessions` (default `~/.codex/archived_sessions`). Review logs for sensitive information before sharing.
- **Stuck chat**: check whether Codex is waiting for an approval; open the terminal and run a basic command like `git status`; start a new chat with a smaller prompt.
- **Stuck terminal**: close the panel, reopen with `Ctrl`+`` ` ``, re-run `pwd` or `git status`; if still stuck, wait until active chats finish and restart the app.
- The desktop app and Codex CLI can bundle different Codex versions, so features may reach one surface before the other.
- Source: https://learn.chatgpt.com/docs/reference/troubleshooting (retrieved 2026-10).

## Related

- [ChatGPT desktop app](./desktop-app.md)
- [ChatGPT desktop app for Windows](./windows-app.md)
- [Codex CLI](./cli.md)
