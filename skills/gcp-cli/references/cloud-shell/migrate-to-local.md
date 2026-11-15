---
source: https://docs.cloud.google.com/shell/docs/migrate-to-local
---

# Migrate an application from Cloud Shell Editor to a local IDE

How to migrate the application you've been developing with the Cloud Shell Editor to a local IDE like VS Code.

## Signature / Usage

1. Set up the Cloud Code extension for your IDE. Cloud Code is available for installation on VS Code and JetBrains IDEs (IntelliJ Ultimate/Community, PyCharm Professional/Community, WebStorm, and GoLand).
2. Download the necessary source code by navigating to **File** > **Download**. Alternatively, commit your source code to a Git repo using the Source Control: Git view from the Activity bar or using Git commands in the Cloud Shell terminal.

You can now access your workspace from your local IDE using **File** > **Open Workspace** (VS Code) / **Open** (IntelliJ) if you downloaded your Cloud Code workspace, or your local Source Control: Git view, if you committed your source code to a Git repo.

Snippet taken from https://docs.cloud.google.com/shell/docs/version-control (the Git identity commands used before committing in the Cloud Shell terminal):

```bash
git config --global user.email you@example.com
git config --global user.name YourName
```

## Notes

- The official page offers a **Guide me** walkthrough that runs inside the Cloud Shell Editor.
- Source: https://docs.cloud.google.com/shell/docs/migrate-to-local (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [version-control.md](./version-control.md)
- [uploading-and-downloading-files.md](./uploading-and-downloading-files.md)
- [workspaces.md](./workspaces.md)
