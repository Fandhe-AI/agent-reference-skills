---
source: https://docs.cloud.google.com/shell/docs/version-control
---

# Use version control with Cloud Shell Editor

How to use version control for your application files with the Cloud Shell Editor's Git support.

## Signature / Usage

### Use version control

By clicking the Source Control view from the Activity bar, you can access your Git repositories (or create a new one), view existing and staged changes, and merge changes. From here, you can stage and unstage changes, diff between the previous state and the current version of files, and commit changes.

### Authenticate with Git

To pull or push changes to your Git repository or clone your repository, you must authenticate with Git. If you're working with Cloud Source Repositories, Cloud Shell handles authentication for you automatically.

When you carry out an action that requires authentication, Git prompts you for a password. Enter a personal access token (PAT; a more secure alternative to Git passwords). To avoid entering your PAT multiple times, turn on credential helper to allow Git to cache your PAT for 15 minutes:

1. Launch the Cloud Shell Editor terminal by clicking **Terminal** > **New Terminal**.
2. Run the following command:

```bash
git config --global credential.helper cache
```

For more customization options like changing timeout length and specifying a local path for credential storage, see the Git Tools - Credential Storage documentation (https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage).

### Toggle between multiple repositories

To toggle between your repositories, in the Cloud Shell Editor status bar, click your repository name and select the repository to switch your scope to. This updates your Source Control panel with the context of your chosen repository.

### Display working changes and diff view

As you add, modify, and delete files, these changes are reflected under the Changes section in your Source Control panel. You can open the selected file, stage these changes, discard changes, or see what changes are being made in this commit. Staged files are also listed under Staged Changes. Clicking any file brings up its diff view.

### Commit changes

1. Run the following git commands using the Cloud Shell terminal:

```bash
git config --global user.email you@example.com
git config --global user.name YourName
```

2. In the Source Control panel, write a commit message and then click **Commit** or press **Cmd/Ctrl** + **Enter**.

### Clone a repository

1. Retrieve the repository URL: for GitHub repositories, open the main page of your repository and then open the Clone or Download dialog.
2. Launch the command palette (press `Ctrl`/`Cmd`+`Shift`+`P` or click **View** > **Command Palette**) and then run **Git: Clone**.
3. When prompted, enter the Git repository location.

### Create and switch between branches

1. Launch the command palette and then run **Git: Checkout**.
2. Select from the list of branches or create a new local branch.

### Git status bar

The Git status bar lets you keep track of your current branch and switch to another with the branch indicator. It also provides the Synchronize Changes action, which pushes local changes to your upstream branch and pulls remote changes into your local repository. If you don't have an upstream branch set up, the Publish action is available to push your local changes to a remote repository.

## Notes

- The page's commit step is worded "(or press **Cmd/Ctrl** + **Enter**)" with an unbalanced parenthesis in the source; kept as the meaning only.
- Source: https://docs.cloud.google.com/shell/docs/version-control (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [editor-overview.md](./editor-overview.md)
- [workspaces.md](./workspaces.md)
- [migrate-to-local.md](./migrate-to-local.md)
