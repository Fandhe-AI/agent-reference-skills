---
source: https://docs.cloud.google.com/sdk/docs/install-sdk
---

# Install the Google Cloud CLI

Recommended method to install and initialize the Google Cloud CLI (gcloud CLI), then run a few core commands to verify the installation. The page documents version 593.0.0.

## Signature / Usage

### Linux (archive)

Requires Python 3.10 to 3.15. The x86_64 and Arm Linux packages include a bundled Python interpreter that is preferred by default (see `gcloud topic startup`). Run `uname -a` to determine your Linux platform.

| Platform | Package name | Size | SHA256 Checksum |
|---|---|---|---|
| Linux 64-bit (x86_64) | google-cloud-cli-linux-x86_64.tar.gz | 94.7 MB | 181a74765ab1f2d3dd37bc1b7f9b53b6f5b348eef44ea2e194b9ed41310b44bb |
| Linux 64-bit (Arm) | google-cloud-cli-linux-arm.tar.gz | 90.7 MB | 13e40f07f44bb6380a8d17275e352964360543af8ea18a7ddfee0445481f9413 |
| Linux 32-bit (x86) | google-cloud-cli-linux-x86.tar.gz | 54.8 MB | 476eef9d8f890795c246b6c567e7623e3c404c0c824d2e3be6f6be81d08bfe74 |

Download (replace the package name with the one for your configuration), extract, then run the installer from the folder you extracted:

Adapted (not in the official docs): `curl -O` becomes `curl -fLO` so an HTTP error fails the download instead of saving the error page under the archive name.

```bash
curl -fLO https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-linux-x86_64.tar.gz
```

```bash
tar -xf google-cloud-cli-linux-x86_64.tar.gz
```

```bash
./google-cloud-sdk/install.sh
```

To replace an existing installation, delete the existing `google-cloud-sdk` directory and extract the archive to the same location. The script prompts (answer `Y` to accept) to add the gcloud CLI to your `PATH`, enable command completion, and opt in to anonymous usage statistics. For non-interactive installation, list flags with:

```bash
./google-cloud-sdk/install.sh --help
```

Optionally open a new terminal so `PATH` changes take effect.

### Debian/Ubuntu (apt)

The package contains the `gcloud`, `gcloud alpha`, `gcloud beta`, `gsutil`, and `bq` tools only; it does not include `kubectl` or the App Engine extensions (install separately, see components below). Package versions published within the last 365 days are retained in the repository. Requirements: an Ubuntu release or Debian stable release that has not reached end-of-life, recently updated packages, and `ca-certificates`, `gnupg`, `curl` installed.

```bash
sudo apt-get update
```

```bash
sudo apt-get install ca-certificates gnupg curl
```

1. Import the Google Cloud public key. For Debian 9+ or Ubuntu 18.04+:

   ```bash
   curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
   ```

   For older distributions:

   ```bash
   curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
   ```

   If your `apt-key` does not support `--keyring`:

   ```bash
   curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
   ```

2. Add the distribution URI as a package source. For Debian 9+ or Ubuntu 18.04+:

   ```bash
   echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
   ```

   For older distributions that do not support `signed-by`:

   ```bash
   echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
   ```

3. Update and install:

   ```bash
   sudo apt-get update && sudo apt-get install google-cloud-cli
   ```

   In resource-constrained VMs, container images, or CI/CD runners, export `CLOUDSDK_SKIP_PY_COMPILATION=1` during installation to skip host-side Python compilation (installation time drops from minutes to seconds, at the cost of minor interactive command overhead):

   ```bash
   sudo CLOUDSDK_SKIP_PY_COMPILATION=1 apt-get install google-cloud-cli
   ```

   Inside a Docker image, use a single `RUN` step:

   ```docker
   RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg && apt-get update -y && apt-get install google-cloud-cli -y
   ```

   For older base images without `gpg --dearmor`:

   ```docker
   RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-cli -y
   ```

4. Optional additional component packages (APT list on this page): `google-cloud-cli-anthos-auth`, `google-cloud-cli-app-engine-go`, `google-cloud-cli-app-engine-grpc`, `google-cloud-cli-app-engine-java`, `google-cloud-cli-app-engine-python`, `google-cloud-cli-app-engine-python-extras`, `google-cloud-cli-bigtable-emulator`, `google-cloud-cli-cbt`, `google-cloud-cli-cloud-run-proxy`, `google-cloud-cli-config-connector`, `google-cloud-cli-datastore-emulator`, `google-cloud-cli-firestore-emulator`, `google-cloud-cli-gke-gcloud-auth-plugin`, `google-cloud-cli-kubectl-oidc`, `google-cloud-cli-local-extract`, `google-cloud-cli-minikube`, `google-cloud-cli-nomos`, `google-cloud-cli-pubsub-emulator`, `google-cloud-cli-skaffold`, `google-cloud-cli-spanner-emulator`, `google-cloud-cli-terraform-tools`, `google-cloud-cli-tests`, `kubectl`.

   ```bash
   sudo apt-get install google-cloud-cli-app-engine-java
   ```

Downgrade (`VERSION` of the form `123.0.0`):

```
sudo apt-get update && sudo apt-get install google-cloud-cli=123.0.0-0
```

### Red Hat/Fedora/CentOS (dnf/yum)

Packages exist for Red Hat Enterprise Linux 7, 8, 9, and 10; Fedora 41 and 42; and CentOS 7 and 8. The package contains `gcloud`, `gcloud alpha`, `gcloud beta`, `gsutil`, and `bq` only (no `kubectl` or App Engine extensions).

1. Update DNF with the repository information. For RHEL 7, 8, or 9-compatible installations:

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

   For RHEL 10-compatible installations (updated `gpgkey`):

   ```bash
   sudo tee -a /etc/yum.repos.d/google-cloud-sdk.repo << EOM
   [google-cloud-cli]
   name=Google Cloud CLI
   baseurl=https://packages.cloud.google.com/yum/repos/cloud-sdk-el10-x86_64
   enabled=1
   gpgcheck=1
   repo_gpgcheck=0
   gpgkey=https://packages.cloud.google.com/yum/doc/rpm-package-key-v10.gpg
   EOM
   ```

   For ARM64 (aarch64), use `https://packages.cloud.google.com/yum/repos/cloud-sdk-el9-aarch64` (RHEL 7, 8, or 9-compatible) or `https://packages.cloud.google.com/yum/repos/cloud-sdk-el10-aarch64` (RHEL 10-compatible) as the `baseurl` value.

2. On x86_64, install `libxcrypt-compat.x86_64` (the source gives only this x86_64 package and names no aarch64 equivalent):

   ```bash
   sudo dnf install libxcrypt-compat.x86_64
   ```

3. Install the gcloud CLI (use `yum` if you have not moved to `dnf`):

   ```bash
   sudo dnf install google-cloud-cli
   ```

   ```bash
   sudo CLOUDSDK_SKIP_PY_COMPILATION=1 dnf install google-cloud-cli
   ```

4. Optional additional component packages (RPM list on this page): same as the APT list above except that it ends with `google-cloud-cli-terraform-validator` instead of `google-cloud-cli-terraform-tools`, and has no `google-cloud-cli-terraform-tools`.

   ```bash
   sudo dnf install google-cloud-cli-app-engine-java
   ```

Downgrade (replace `123.0.0`):

```bash
sudo dnf downgrade google-cloud-cli-123.0.0
```

### macOS (archive)

Requires Python 3.10 to 3.15 (check with `python3 -V` or `python -V`); the installer installs Python v3.14 and required extension modules by default. Run `uname -m` to determine your platform.

| Platform | Package | Size | SHA256 Checksum |
|---|---|---|---|
| macOS 64-bit (x86_64) | google-cloud-cli-darwin-x86_64.tar.gz | 54.9 MB | 108c1a0bb5d273703b61c4dc9cafab9cc0e674797347ab18d5357d228a517131 |
| macOS 64-bit (ARM64, Apple silicon) | google-cloud-cli-darwin-arm.tar.gz | 54.8 MB | 563b2102362a54506836b73ef3485b6abfe112c1e48559022bbb5dbf45f55e4e |
| macOS 32-bit (x86) | google-cloud-cli-darwin-x86.tar.gz | 53.2 MB | 35d83632d1b2fc48fe342c957a3105995d5f855c2d770b37de277178f0cfe2d8 |

Replace `FILE_NAME` with the package name for your platform:

Adapted (not in the official docs): `curl -O` becomes `curl -fLO` so an HTTP error fails the download instead of saving the error page under the archive name.

```bash
curl -fLO https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/FILE_NAME
```

```bash
tar -xf FILE_NAME
```

```bash
./google-cloud-sdk/install.sh
```

The script prompts to install Python 3.14 and recommended modules if needed, add the gcloud CLI to `PATH` and enable command completion, and opt in to anonymous usage statistics. Screen reader mode:

```bash
./google-cloud-sdk/install.sh --screen-reader=true
```

### Windows

Requires Windows 8.1 and later, or Windows Server 2012 and later. Download the [installer](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe), or from PowerShell:

```bash
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")

& $env:Temp\GoogleCloudSDKInstaller.exe
```

Launch the installer (signed by Google LLC) and follow the prompts. Check **Turn on screen reader mode** if you use a screen reader. Supported Python is 3.10 to 3.15; the installer bundles Python 3 by default, and you can use an existing Python by unchecking **Install Bundled Python** (see `gcloud topic startup`). At the end, uncheck the option to start the shell; you configure gcloud in the next steps.

### Chromebook

Set up the Linux development environment on your Chromebook first, then:

```bash
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

```bash
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
```

```bash
sudo apt-get update && sudo apt-get install google-cloud-cli
```

Optional components use the same APT package list as Debian/Ubuntu, except the Chromebook list ends with `google-cloud-cli-terraform-validator` instead of `google-cloud-cli-terraform-tools`. Downgrade:

```bash
sudo apt-get update && sudo apt-get install google-cloud-cli=123.0.0-0
```

### Initialize and authorize

If you are behind a proxy or firewall, configure network access first (see proxy-settings). Then:

```bash
gcloud init
```

By default this opens a web browser to authorize access. To authorize from the command line instead, add the `--console-only` flag. For non-interactive authorization, create a service account with the appropriate scopes in the Google Cloud console and use `gcloud auth activate-service-account` with its JSON key file. At the prompts: sign in and click **Allow**; select a project from those where you have **Owner**, **Editor**, or **Viewer** (with more than 200 projects you are prompted to enter a project ID, create a project (billing must then be enabled), or list projects); select a default Compute Engine zone if the Compute Engine API is enabled.

Optional screen reader support:

```bash
gcloud config set accessibility/screen_reader true
```

### Run core commands

```console
gcloud auth list
```

```console
gcloud config list
```

```console
gcloud help
```

```console
gcloud help compute instances create
```

## Notes

- Adapted from the official docs: the Linux and macOS archive downloads use `curl -fLO` instead of the official `curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/...` so that an HTTP error stops the download.
- The two `RUN` lines are Dockerfile instructions (shown as `docker` fences), not shell commands. They call `curl` and `gpg` (or `apt-key`) without installing them, so the base image must already have `curl` and `gnupg`.
- The `libxcrypt-compat.x86_64` step applies to x86_64 hosts; the source page shows no aarch64 package for this step (not verified on aarch64).
- The SHA256 checksums are those the official page showed on the retrieval date for the versionless file names (`google-cloud-cli-<platform>.tar.gz`), which always serve the latest release; after a new release they no longer match. Compare against the checksum currently shown on the official page, or use the pinned 593.0.0 archives and checksums listed in [downloads-versioned-archives.md](./downloads-versioned-archives.md).
- Windows troubleshooting: if installation fails because `find` is not recognized, include the folder containing `find` (usually `C:\WINDOWS\system32;`) in `PATH`; if you uninstalled the gcloud CLI, reboot before reinstalling; if unzipping fails, run the installer as an administrator.
- If you use Compute Engine, the gcloud CLI may already be installed on some OS images; if you run a modern Ubuntu with Snap and want automatic updates, see downloads-snap.
- The page lists `google-cloud-cli-terraform-tools` for APT (Debian/Ubuntu) and `google-cloud-cli-terraform-validator` for RPM and Chromebook, as in the source.
- Service account keys for `gcloud auth activate-service-account` and Application Default Credentials (ADC) / Workload Identity Federation concepts belong to the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/sdk/docs/install-sdk (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloads-interactive.md](./downloads-interactive.md)
- [downloads-versioned-archives.md](./downloads-versioned-archives.md)
- [downloads-snap.md](./downloads-snap.md)
- [components.md](./components.md)
- [initializing.md](./initializing.md)
- [proxy-settings.md](./proxy-settings.md)
- [uninstall-cloud-sdk.md](./uninstall-cloud-sdk.md)
