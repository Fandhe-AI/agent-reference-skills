---
source: https://docs.cloud.google.com/shell/docs/workspaces
---

# Workspace management in the Cloud Shell Editor

The Cloud Shell Editor lets you manage your projects as workspaces. A workspace usually represents the root folder of your project and includes your project-specific configuration files. A Home workspace (based on your Home directory) is created for you automatically. With workspaces, you can specify persistent settings, run and debug configurations, and UI states (like open files) for all the folders in your workspace.

## Signature / Usage

### Create a new workspace

1. Using the Cloud Shell terminal, create a new directory to use as your workspace: use `mkdir` to manually create a new directory, or `git clone` to copy in an existing repository.
2. After your directory is ready, open it as a new workspace by clicking **File** > **Open Workspace**.

### Open a workspace

- Click **File** > **Open Folder**.
- If no workspaces are open, click the **Open Folder** button in the Explorer view.
- Select a recently opened workspace from the Recent section in the Welcome to Cloud Shell window, or click **File** > **Open Recent Workspace**.

To use the Home workspace, click **File** > **Open Folder** and choose your Home directory.

### Save and close a workspace

- Save under a new name: **File** > **Save Workspace As**.
- Close: **File** > **Close Folder**, then click **OK** when prompted.

### Delete a workspace

> **Warning:** These actions will delete your folder and can't be undone.

To delete the folder, first check that the path is the workspace folder you mean, then delete it. `rm -rf` removes the folder and everything under it without prompting.

Adapted (not in the official docs): a listing step is added before the deletion so you can confirm the target first.

```bash
ls -la -- "FOLDER_NAME"
```

Adapted (not in the official docs): the folder name is quoted and preceded by `--` so a name with spaces or a leading `-` is not split or read as an option.

```bash
rm -rf -- "FOLDER_NAME"
```

### Configure settings

Settings are accessible through the Settings Gear in the bottom left corner of the editor. Use **Search Settings** to filter settings. Three scopes exist:

- **User settings**: globally-applicable, applied to all your instances of the Cloud Shell Editor; stored in the browser.
- **Remote settings**: globally-applicable; stored in your Cloud Shell home directory under `$HOME/.codeoss/data/Machine/settings.json`.
- **Workspace settings**: applied only to the active workspace; saved in `.codeoss/settings.json` in your workspace folder and can be shared using version control or by downloading the workspace folder.

## Notes

- Adapted from the official docs: the page gives only `rm -rf FOLDER_NAME`; this page adds `ls -la -- "FOLDER_NAME"` to confirm the target first and runs `rm -rf -- "FOLDER_NAME"` with the name quoted.
- When a setting is set in more than one scope, remote settings override user settings, and workspace settings override both remote and user settings.
- Source: https://docs.cloud.google.com/shell/docs/workspaces (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [editor-overview.md](./editor-overview.md)
- [version-control.md](./version-control.md)
- [uploading-and-downloading-files.md](./uploading-and-downloading-files.md)
- [themes.md](./themes.md)
