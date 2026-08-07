# Local environments

Configure setup steps for worktrees and common actions for a project, in Codex in the ChatGPT desktop app. Stored in the `.codex` folder at the project root, so the configuration can be checked into Git and shared.

## Signature / Usage

```bash
# Setup script example (runs automatically when Codex creates a new worktree)
npm install
npm run build
```

```bash
# Action script example (e.g. a "Run" action for a Node.js project)
npm start
```

## Options / Props

| Name | Description |
|------|-------------|
| Setup script | Runs automatically when Codex creates a new worktree at the start of a new chat; installs dependencies or runs a build. Platform-specific overrides available (macOS/Windows/Linux). |
| Actions | Common tasks (dev server, test suite) defined per project; appear in the ChatGPT desktop app top bar and run in the [integrated terminal](https://learn.chatgpt.com/docs/integrated-terminal). Platform-specific scripts and an icon can be set per action. |
| Built-in Git tools | Diff pane with inline comments, stage/revert chunks or files, commit, push, and create a pull request without leaving the app. |

## Notes

- Local environments are available only in Codex in the ChatGPT desktop app (select **Codex** before configuring or using one).
- Configured through ChatGPT desktop app settings; if a repository contains more than one project, open the project directory that has the shared `.codex` folder.
- To isolate concurrent changes from the local checkout, start the task in a worktree (see `git-worktrees.md`).

## Related

- [git-worktrees.md](./git-worktrees.md)
- [modes.md](./modes.md)
