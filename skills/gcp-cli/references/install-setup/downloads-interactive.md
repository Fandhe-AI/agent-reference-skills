---
source: https://docs.cloud.google.com/sdk/docs/downloads-interactive
---

# Interactive and non-interactive installers

The gcloud CLI provides an installer for each supported platform, deployable interactively or non-interactively. The installer downloads, installs, and sets up the latest version (adds components to `PATH`, enables shell command completion).

## Signature / Usage

### Linux and macOS (interactive)

The official page pipes the installer directly into `bash`. Adapted into download, inspect, run:

Adapted (not in the official docs): the official `curl https://sdk.cloud.google.com | bash` is split into download, inspect, run so the script can be reviewed before execution.

```bash
curl https://sdk.cloud.google.com > install.sh
```

```bash
less install.sh
```

```bash
bash install.sh
```

When prompted: choose a location for the `google-cloud-sdk` subdirectory (default is your Home directory); answer `Y` to send anonymous usage statistics; answer `Y` to add the tools to `PATH` and enable command completion. Then restart your shell and initialize:

```bash
exec -l $SHELL
```

```bash
gcloud init
```

### Windows (installer)

Requires Windows 8.1 and later, or Windows Server 2012 and later. Download the installer or use PowerShell:

```bash
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")

& $env:Temp\GoogleCloudSDKInstaller.exe
```

Follow the prompts (the installer is signed by Google LLC). At the end, leave the options to start the shell and configure your installation selected; the installer opens a terminal and runs `gcloud init`. The default installation does not include the App Engine extensions needed to deploy with `gcloud`; install them with the component manager.

### Windows (zip)

Download `google-cloud-sdk.zip` (https://dl.google.com/dl/cloudsdk/channels/rapid/google-cloud-sdk.zip), extract it, launch `google-cloud-sdk\install.bat`, restart the command prompt (`cmd.exe`), then:

```
C:\> gcloud init
```

### Non-interactive (silent) deployment

Linux and macOS: save the install script locally instead of piping it to bash, then run it:

```bash
curl https://sdk.cloud.google.com > install.sh
```

```bash
bash install.sh --disable-prompts
```

## Options / Props

`install.sh` options (Linux / macOS):

| Name | Type | Description |
|------|------|-------------|
| `--disable-prompts` | flag | Disable prompts. |
| `--install-dir=DIRECTORY` | path | Installation root directory; the CLI is installed in `DIRECTORY/google-cloud-sdk`. Default is `$HOME`. |

Windows installer flags (case sensitive):

| Name | Type | Description |
|------|------|-------------|
| `/S` | flag | Install silently; no installer pages displayed. |
| `/D` | path | Default installation directory. Must be the last parameter, no quotes even if the path has spaces, absolute paths only, e.g. `/D=C:\CloudSDK`. |
| `/allusers` | flag | Install for all users. |
| `/singleuser` | flag | Install for current user (default). |
| `/screenreader` | flag | Turn on screen reader mode (default off). |
| `/reporting` | flag | Enable usage reporting (default off). |
| `/noreporting` | flag | Disable usage reporting (default off). |
| `/nostartmenu` | flag | Do not create the Start Menu shortcut (default creates it). |
| `/nodesktop` | flag | Do not create the desktop shortcut (default creates it). |

## Notes

- Adapted from the official docs: the official Linux/macOS interactive one-liner `curl https://sdk.cloud.google.com | bash` was rewritten as download, inspect, run (the page's own non-interactive section already saves the script to `install.sh`).
- To install a specific version non-interactively (for example reproducible production builds), use a versioned archive instead; the installer targets the latest version.
- Windows troubleshooting: if `find` is not recognized, include its folder (usually `C:\WINDOWS\system32;`) in `PATH`; reboot before reinstalling after an uninstall; run the installer as administrator if unzipping fails.
- Source: https://docs.cloud.google.com/sdk/docs/downloads-interactive (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloads-versioned-archives.md](./downloads-versioned-archives.md)
- [install-sdk.md](./install-sdk.md)
- [initializing.md](./initializing.md)
- [components.md](./components.md)
