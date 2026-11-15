---
source: https://docs.cloud.google.com/sdk/docs/downloads-versioned-archives
---

# Versioned archives

Downloadable, versioned archives for each gcloud CLI release. Each contains a self-contained installation in a directory named `google-cloud-sdk` that can be copied to any location.

## Signature / Usage

Best for non-interactive installation of a specific version: scripting and CI where updates must not break scripts, automated deployments to many machines that must stay in sync, installs behind a proxy or firewall, or when you do not want an interactive install.

1. Check your OS bit width: Linux / macOS `getconf LONG_BIT`; Windows **Control Panel** > **System** > **System Type**. On macOS also check the hardware name (x86_64, arm64, or x86):

   ```bash
   uname -m
   ```

2. Download the versioned archive for your platform from `https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/<Package>` and verify its SHA256 checksum against the table below (version 593.0.0 shown):

   Adapted (not in the official docs): the official table lists versionless file names, which always serve the latest release; this skill pins the versioned 593.0.0 archive and the checksum measured for it.

   ```bash
   curl -fLO https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-593.0.0-linux-x86_64.tar.gz
   echo "42c32b7553c712f71fcf6f124546c0519437f53755f47f9bd0c957998cd6b826  google-cloud-cli-593.0.0-linux-x86_64.tar.gz" | shasum -a 256 -c -
   ```
3. Extract to any location (preferably your Home folder).
4. Run the install script from the extracted folder root (adds tools to `PATH`, prints instructions for `bash` completion on Linux/macOS, and offers usage reporting).

   Linux or macOS:

   ```bash
   ./google-cloud-sdk/install.sh
   ```

   Screen reader mode:

   ```bash
   ./google-cloud-sdk/install.sh --screen-reader=true
   ```

   Windows:

   ```
   .\google-cloud-sdk\install.bat
   ```

5. Initialize.

   Linux or macOS:

   ```bash
   ./google-cloud-sdk/bin/gcloud init
   ```

   Windows:

   ```
   .\google-cloud-sdk\bin\gcloud init
   ```

If you answered `n` to modifying your profile, source these files in your profile instead (replace `/path/to/gcloud`): Bash `path.bash.inc` (PATH) and `completion.bash.inc` (completion); Zsh `path.zsh.inc` and `completion.zsh.inc`; Fish `path.fish.inc` (PATH).

## Options / Props

Versioned archives of Google Cloud CLI 593.0.0 (SHA256 measured 2026-11-15 by downloading each file from `https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/`):

| Platform | Package | Size (bytes) | SHA256 Checksum |
|---|---|---|---|
| Linux 64-bit (x86_64) | google-cloud-cli-593.0.0-linux-x86_64.tar.gz | 94726966 | 42c32b7553c712f71fcf6f124546c0519437f53755f47f9bd0c957998cd6b826 |
| Linux 64-bit (Arm) | google-cloud-cli-593.0.0-linux-arm.tar.gz | 90745023 | f40acaca49c9774bca035c96dcf7350a13c09007e906cb4832e91dc36ce11497 |
| Linux 32-bit (x86) | google-cloud-cli-593.0.0-linux-x86.tar.gz | 54761702 | ecf6c0e7fe61c4732903399058e1f278abc8cb7b26551696a08e52bac2d4e37c |
| macOS 64-bit (x86_64) | google-cloud-cli-593.0.0-darwin-x86_64.tar.gz | 54882890 | 18b34987c1288c0c9c8ace5088d124e2a1b51eea7b7c645e2dae9d5832faa619 |
| macOS 64-bit (arm64) | google-cloud-cli-593.0.0-darwin-arm.tar.gz | 54790650 | 3351dba1dbed21be0bc77c47462d6ba5d28a25ecc31e878ab1c0f32cc442741b |
| macOS 32-bit (x86) | google-cloud-cli-593.0.0-darwin-x86.tar.gz | 53234960 | f9bfaef59c439c989fabc6ee9bb4c1b6f48df9e812f1de0cd18ac29e54f7d12e |
| Windows 64-bit (x86_64) | google-cloud-cli-593.0.0-windows-x86_64.zip | 105593538 | 8fbdc9d644ffdd25a7f515c2643edc87100d3d48be9d3aa635454f6d7fb6a53c |
| Windows 64-bit (x86_64) with Python bundled | google-cloud-sdk-593.0.0-windows-x86_64-bundled-python.zip | 105593538 | 8fbdc9d644ffdd25a7f515c2643edc87100d3d48be9d3aa635454f6d7fb6a53c |
| Windows 32-bit (x86) | google-cloud-cli-593.0.0-windows-x86.zip | 102843946 | efb31b7f685035a637692beda552a1401115488e35c6bac2fa46e9ed668b433e |
| Windows 32-bit (x86) with Python bundled | google-cloud-sdk-593.0.0-windows-x86-bundled-python.zip | 102843946 | efb31b7f685035a637692beda552a1401115488e35c6bac2fa46e9ed668b433e |

## Notes

- Adapted from the official docs: the official table (retrieved 2026-11-14) lists the versionless names `google-cloud-cli-<platform>.tar.gz` / `.zip`, which always serve the latest release, with their checksums at that time. For a pinned install this page lists the versioned 593.0.0 archives with checksums measured on 2026-11-15. The Windows checksums match the official table; the Linux and macOS checksums in the official table differ from the 593.0.0 archives, so they belong to another build of the versionless files. For another version, replace `593.0.0` in the file name and compute the checksum from a trusted download.
- Run `install.sh --help` or `install.bat --help` for flags, including those for non-interactive installation.
- Previous versions are in the download archive in Cloud Storage: https://console.cloud.google.com/storage/browser/cloud-sdk-release, directly accessible at `https://storage.googleapis.com/cloud-sdk-release/<archive_name>`.
- The 64-bit and "with Python bundled" Windows archives are byte-identical (same size and checksum), as the official table also shows; likewise for 32-bit.
- Source: https://docs.cloud.google.com/sdk/docs/downloads-versioned-archives (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloads-interactive.md](./downloads-interactive.md)
- [proxy-settings.md](./proxy-settings.md)
- [install-sdk.md](./install-sdk.md)
