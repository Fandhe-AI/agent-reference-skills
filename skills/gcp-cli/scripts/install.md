---
source: https://docs.cloud.google.com/sdk/docs/install-sdk
---

# Install, Initialize and Verify

Copy-paste commands for installing the Google Cloud CLI (gcloud CLI 593.0.0 docs), running `gcloud init`, verifying the installation, configuring a proxy, and uninstalling.

## Signature / Usage

### Install from a Linux archive

Replace the package name with the one for your platform (`uname -a`): `google-cloud-cli-linux-x86_64.tar.gz`, `google-cloud-cli-linux-arm.tar.gz`, or `google-cloud-cli-linux-x86.tar.gz`.

```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-linux-x86_64.tar.gz
```

```bash
tar -xf google-cloud-cli-linux-x86_64.tar.gz
```

```bash
./google-cloud-sdk/install.sh
```

```bash
./google-cloud-sdk/install.sh --help
```

The last command lists the flags for non-interactive installation.

### Install from a macOS archive

Replace `FILE_NAME` with `google-cloud-cli-darwin-x86_64.tar.gz`, `google-cloud-cli-darwin-arm.tar.gz` (Apple silicon), or `google-cloud-cli-darwin-x86.tar.gz` (check with `uname -m`).

```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/FILE_NAME
```

```bash
tar -xf FILE_NAME
```

```bash
./google-cloud-sdk/install.sh
```

```bash
./google-cloud-sdk/install.sh --screen-reader=true
```

The last command is the screen reader variant.

### Install with the interactive installer (Linux and macOS)

Adapted (not in the official docs): the official `curl https://sdk.cloud.google.com | bash` is split into download, inspect, run so the script can be reviewed before it executes.

```bash
curl https://sdk.cloud.google.com > install.sh
```

```bash
less install.sh
```

```bash
bash install.sh
```

```bash
exec -l $SHELL
```

```bash
gcloud init
```

### Install non-interactively (Linux and macOS)

```bash
curl https://sdk.cloud.google.com > install.sh
```

```bash
bash install.sh --disable-prompts
```

`--install-dir=DIRECTORY` installs into `DIRECTORY/google-cloud-sdk` (default `$HOME`).

### Install on Debian or Ubuntu (apt)

```bash
sudo apt-get update
```

```bash
sudo apt-get install ca-certificates gnupg curl
```

```bash
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
```

```bash
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

```bash
sudo apt-get update && sudo apt-get install google-cloud-cli
```

For Debian 9+ or Ubuntu 18.04+. The first `curl` pipes the public key into `gpg --dearmor` (a key import, not a script). Optional extra packages, for example:

```bash
sudo apt-get install google-cloud-cli-app-engine-java
```

Skip host-side Python compilation on resource-constrained VMs, container images, or CI runners:

```bash
sudo CLOUDSDK_SKIP_PY_COMPILATION=1 apt-get install google-cloud-cli
```

Downgrade (`VERSION` of the form `123.0.0`; the page prints it as `google-cloud-cli=123.0.0-0`):

```bash
sudo apt-get update && sudo apt-get install google-cloud-cli=123.0.0-0
```

### Install on Red Hat, Fedora or CentOS (dnf)

RHEL 7, 8, or 9-compatible, x86_64:

```bash
sudo tee -a /etc/yum.repos.d/google-cloud-sdk.repo << EOM
[google-cloud-cli]
name=Google Cloud CLI
baseurl=https://packages.cloud.google.com/yum/repos/cloud-sdk-el9-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOM
```

```bash
sudo dnf install libxcrypt-compat.x86_64
```

```bash
sudo dnf install google-cloud-cli
```

For RHEL 10, ARM64, the `yum` command, and optional packages, see the install page.

### Install with snap (Ubuntu)

```bash
snap remove google-cloud-sdk
```

```bash
snap install google-cloud-cli --classic
```

```bash
echo "source /snap/google-cloud-cli/current/completion.bash.inc" >> ~/.bashrc
```

```bash
echo "source /snap/google-cloud-cli/current/completion.zsh.inc" >> ~/.zshrc
```

`snap remove google-cloud-sdk` removes the deprecated snap; the two `echo` lines add Bash and Zsh completion.

### Install on Windows (PowerShell)

```powershell
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")

& $env:Temp\GoogleCloudSDKInstaller.exe
```

Requires Windows 8.1 and later, or Windows Server 2012 and later.

### Initialize and authorize

```bash
gcloud init
```

```bash
gcloud init --skip-diagnostics
```

```bash
gcloud init --console-only
```

`--console-only` (alias `--no-launch-browser`) is for a machine without a browser when you cannot use another machine with one. See Notes for `--no-browser`.

### Verify the installation

```bash
gcloud version
```

```bash
gcloud auth list
```

```bash
gcloud config list
```

```bash
gcloud help
```

```bash
gcloud help compute instances create
```

### Diagnose the environment

```bash
gcloud info
```

```bash
gcloud info --run-diagnostics
```

```bash
gcloud info --run-diagnostics --check-certs=compute.googleapis.com
```

```bash
gcloud info --show-log
```

### Search help text

```bash
gcloud help -- project
```

```bash
gcloud help --limit=20 -- project
```

### Configure a proxy

```bash
gcloud config set proxy/type [PROXY_TYPE]
```

```bash
gcloud config set proxy/address [PROXY_IP_ADDRESS]
```

```bash
gcloud config set proxy/port [PROXY_PORT]
```

```bash
gcloud config set core/custom_ca_certs_file [PATH_TO_CUSTOM_CA]
```

Adapted (not in the official docs): the official sample prints `export NAME [VALUE]`, which is not valid shell syntax; `export NAME=VALUE` is required.

```bash
export CLOUDSDK_PROXY_USERNAME=[USERNAME]
export CLOUDSDK_PROXY_PASSWORD=[PASSWORD]
```

### Turn usage statistics off

```bash
gcloud config set disable_usage_reporting true
```

### Locate directories before uninstalling

> **警告**: The uninstall steps delete the installation and user config directories, which hold your gcloud credentials and configurations. Use the paths printed by the first two commands, and delete them only after confirming the output.

```bash
gcloud info --format='value(installation.sdk_root)'
```

```bash
gcloud info --format='value(config.paths.global_config_dir)'
```

Then delete both directories by hand, and remove the `completion.bash.inc` and `path.bash.inc` source lines from your shell init file if you added them. On macOS, also remove the cache directories:

```bash
find ~/Library/Caches/ -type d -name "google-cloud-sdk" | xargs -I {} rm -r "{}"
```

Adapted (not in the official docs): `find -exec` passes each path intact (no pipe to `xargs`), and `-prune` stops `find` from descending into a directory it is about to delete.

```bash
find ~/Library/Caches/ -type d -name "google-cloud-sdk" -prune -exec rm -r {} +
```

## Notes

- Adapted from the official docs: the macOS cache cleanup is also shown with `find ... -prune -exec rm -r {} +`, which does not depend on how `xargs` splits paths.
- `gcloud init --no-browser` is for a machine without a browser when you can run the gcloud CLI on another machine that has one (see `gcloud init --help`). `gcloud info --anonymize` minimizes personal information when sharing output.
- Installs from an OS package (apt, dnf, snap) are uninstalled with the OS package manager; on Windows run `uninstaller.exe` in the gcloud CLI directory.
- The `find ... | xargs ... rm -r` line deletes every directory it matches; run it without `| xargs ...` first to preview the matches.
- Credentials and ADC design (service account keys, Workload Identity Federation, impersonation) belong to the `gcp-foundation` skill. Language-specific client libraries belong to the `gcp-client-libraries` skill.
- `gcloud init` modifies your active configuration; see config.md for named configurations.
- Package and archive names, checksums, and supported OS versions are in the install page; this file keeps one representative command per method.
- Source: https://docs.cloud.google.com/sdk/docs/install-sdk (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/downloads-interactive (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/downloads-snap (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/proxy-settings (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/uninstall-cloud-sdk (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/usage-statistics (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/init (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/info (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/help (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/version (gcloud 593.0.0 help)

## Related

- [install-sdk.md](../references/install-setup/install-sdk.md)
- [downloads-interactive.md](../references/install-setup/downloads-interactive.md)
- [downloads-snap.md](../references/install-setup/downloads-snap.md)
- [initializing.md](../references/install-setup/initializing.md)
- [proxy-settings.md](../references/install-setup/proxy-settings.md)
- [uninstall-cloud-sdk.md](../references/install-setup/uninstall-cloud-sdk.md)
