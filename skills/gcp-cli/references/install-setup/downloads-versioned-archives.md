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

2. Download the archive for your platform (links are `https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/<Package>`).
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

| Platform | Package | Size | SHA256 Checksum |
|---|---|---|---|
| Linux 64-bit (x86_64) | google-cloud-cli-linux-x86_64.tar.gz | 94.7 MB | 181a74765ab1f2d3dd37bc1b7f9b53b6f5b348eef44ea2e194b9ed41310b44bb |
| Linux 64-bit (Arm) | google-cloud-cli-linux-arm.tar.gz | 90.7 MB | 13e40f07f44bb6380a8d17275e352964360543af8ea18a7ddfee0445481f9413 |
| Linux 32-bit (x86) | google-cloud-cli-linux-x86.tar.gz | 54.8 MB | 476eef9d8f890795c246b6c567e7623e3c404c0c824d2e3be6f6be81d08bfe74 |
| macOS 64-bit (x86_64) | google-cloud-cli-darwin-x86_64.tar.gz | 54.9 MB | 108c1a0bb5d273703b61c4dc9cafab9cc0e674797347ab18d5357d228a517131 |
| macOS 64-bit (arm64) | google-cloud-cli-darwin-arm.tar.gz | 54.8 MB | 563b2102362a54506836b73ef3485b6abfe112c1e48559022bbb5dbf45f55e4e |
| macOS 32-bit (x86) | google-cloud-cli-darwin-x86.tar.gz | 53.2 MB | 35d83632d1b2fc48fe342c957a3105995d5f855c2d770b37de277178f0cfe2d8 |
| Windows 64-bit (x86_64) | google-cloud-cli-windows-x86_64.zip | 105.6 MB | 8fbdc9d644ffdd25a7f515c2643edc87100d3d48be9d3aa635454f6d7fb6a53c |
| Windows 64-bit (x86_64) with Python bundled | google-cloud-sdk-593.0.0-windows-x86_64-bundled-python.zip | 105.6 MB | 8fbdc9d644ffdd25a7f515c2643edc87100d3d48be9d3aa635454f6d7fb6a53c |
| Windows 32-bit (x86) | google-cloud-cli-windows-x86.zip | 102.8 MB | efb31b7f685035a637692beda552a1401115488e35c6bac2fa46e9ed668b433e |
| Windows 32-bit (x86) with Python bundled | google-cloud-sdk-593.0.0-windows-x86-bundled-python.zip | 102.8 MB | efb31b7f685035a637692beda552a1401115488e35c6bac2fa46e9ed668b433e |

## Notes

- The SHA256 checksums are tied to the versionless file names (`google-cloud-cli-<platform>.tar.gz`), which always serve the latest release; they are the values shown on the official page on the retrieval date and do not match other releases (for example, the versioned `google-cloud-cli-593.0.0-linux-x86.tar.gz` has SHA256 `ecf6c0e7fe61c4732903399058e1f278abc8cb7b26551696a08e52bac2d4e37c`, measured 2026-11-15). Compare against the checksum currently shown on the official page, or download a versioned archive for a reproducible install.
- Run `install.sh --help` or `install.bat --help` for flags, including those for non-interactive installation.
- Previous versions are in the download archive in Cloud Storage: https://console.cloud.google.com/storage/browser/cloud-sdk-release, directly accessible at `https://storage.googleapis.com/cloud-sdk-release/<archive_name>`.
- The source table lists identical checksums for the 64-bit and "with Python bundled" Windows archives (and likewise for 32-bit); transcribed as published.
- Source: https://docs.cloud.google.com/sdk/docs/downloads-versioned-archives (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloads-interactive.md](./downloads-interactive.md)
- [proxy-settings.md](./proxy-settings.md)
- [install-sdk.md](./install-sdk.md)
