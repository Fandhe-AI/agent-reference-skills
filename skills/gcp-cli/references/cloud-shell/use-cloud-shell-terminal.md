---
source: https://docs.cloud.google.com/shell/docs/use-cloud-shell-terminal
---

# Use the Cloud Shell Terminal

How to use the Cloud Shell Terminal.

## Signature / Usage

Cloud Shell provides command-line access to the virtual machine instance in a terminal window that opens in the Google Cloud console. You can open multiple shell connections to the same instance. To view the gcloud CLI available commands, run `gcloud --help`. You can also use the `cloudshell` command to launch tutorials, open the Cloud Shell Editor, and download files; for more information, run `cloudshell help`.

The two commands below are quoted from the page's prose:

```bash
gcloud --help
```

```bash
cloudshell help
```

### Scroll the display

In addition to using your mouse while browser focus is on a session tab, scroll by pressing `Ctrl`+`Shift`+`PageUp` / `Ctrl`+`Shift`+`PageDn` (Windows and Linux) or `Fn`+`Shift`+`Up` / `Fn`+`Shift`+`Down` (on Mac OS X).

### Copy and paste text

Select text with your mouse; copy with `Ctrl`+`C` (Windows or Linux) or `Cmd`+`C` (macOS); paste at your cursor with `Ctrl`+`V` (Windows or Linux) or `Cmd`+`V` (macOS).

### Send a key combination using the Google Cloud console

Click **Send Key Combination** and then press `Ctrl`+`V`.

### Configure terminal settings

Click **Settings** to set terminal preferences for theme, font type and size, and copy, keyboard and scrollbar default settings.

If you're using an international keyboard or would like to customize your key bindings, specify which key behaves as Alt Gr: **Terminal Settings** > **Terminal Preferences** > **Keyboard** > **Alt Gr Key**, then choose one of the options:

- Auto - Autodetect based on browser language
- None - Disable any AltGr related munging
- Ctrl-Alt - Set Ctrl+Alt as AltGr
- Left-Alt - Set left Alt as AltGr
- Right-Alt - Set right Alt as AltGr

Additionally, you can set 'Alt is meta' to specify that your alt key should behave as a meta key.

### Open multiple terminal sessions

Click **Add Cloud Shell Session** at the top of the Cloud Shell window. Each session connects to the same virtual machine instance and appears in a new tab at the bottom of the Google Cloud console.

### Tab title customization

Cloud Shell understands xterm escape sequences for setting tab titles (http://tldp.org/HOWTO/Xterm-Title-4.html#ss4.3). To rename a tab title, set the `PS1` environment variable in your .bashrc to your chosen configuration and source your .bashrc for the change to take.

## Notes

- Source: https://docs.cloud.google.com/shell/docs/use-cloud-shell-terminal (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-cloudshell-command.md](./using-cloudshell-command.md)
- [configuring-cloud-shell.md](./configuring-cloud-shell.md)
- [using-cloud-shell-accessibility-features.md](./using-cloud-shell-accessibility-features.md)
