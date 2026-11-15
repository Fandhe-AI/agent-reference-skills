---
source: https://docs.cloud.google.com/shell/docs/using-cloud-shell
---

# Use Cloud Shell

How to start and set up a new Cloud Shell session.

## Signature / Usage

### Start a new session

Click **Activate Cloud Shell** at the top of the Google Cloud console. A Cloud Shell session opens inside a new frame at the bottom of the Google Cloud console and displays a command-line prompt. It can take a few seconds for the session to be initialized.

### Use the terminal

Cloud Shell provides command-line access to the virtual machine instance in a terminal window that opens in the Google Cloud console. In addition to accessing the Google Cloud CLI and other utilities from the command line, you can use the `cloudshell` command to launch tutorials, open the Cloud Shell Editor, and download files. See [use-cloud-shell-terminal.md](./use-cloud-shell-terminal.md).

### Use the Cloud Shell Editor

Launch the Cloud Shell Editor by clicking **Open Editor** on the toolbar of the Cloud Shell window. See [editor-overview.md](./editor-overview.md).

### Choose ephemeral mode

By default, Cloud Shell provisions 5 GB of free persistent disk storage on your temporarily allocated virtual machine. This is your `$HOME` directory. When you use the default Cloud Shell experience, the files in your home directory persist between sessions.

If you do not need persistent storage, use Cloud Shell in ephemeral mode. In ephemeral mode, you can get started faster because there is less set up and there is no disk attachment or archive. However, all the files you create during your ephemeral mode session are deleted with the VM when the session ends.

To choose ephemeral mode, append `ephemeral=true` to the `https://shell.cloud.google.com` URL. For example:

```text
https://shell.cloud.google.com/?ephemeral=true
```

This does not work for `https://console.cloud.google.com` URLs.

Alternatively, open the Cloud Shell **More** menu, select **Ephemeral mode**, and click **Save**. To set ephemeral mode as your Cloud Shell default, enable **Always start Cloud Shell in ephemeral mode** before you click **Save**.

The example URL above is the page's prose example (inline code) reproduced in a fence.

### Adjust the display window

1. Click **Hide** or **Restore** to hide or restore the session display.
2. Click **Open Session in New Window** to detach the session as a new window.
3. To close the detached window and re-open the session in the Google Cloud console, click **Activate Cloud Shell** at the top of the Google Cloud console window.
4. To toggle between themes, click **Settings** and then click **Switch to Light Theme** or **Switch to Dark Theme**.

## Notes

- Source: https://docs.cloud.google.com/shell/docs/using-cloud-shell (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-cloud-shell-works.md](./how-cloud-shell-works.md)
- [using-web-preview.md](./using-web-preview.md)
- [launching-cloud-shell.md](./launching-cloud-shell.md)
- [open-in-cloud-shell.md](./open-in-cloud-shell.md)
