---
source: https://www.electronjs.org/docs/latest/tutorial/code-signing
---

# Platform Distribution

Distribution commands for code signing, Mac App Store, Windows Store, and Snap. Sources:
- https://www.electronjs.org/docs/latest/tutorial/code-signing
- https://www.electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide
- https://www.electronjs.org/docs/latest/tutorial/windows-store-guide
- https://www.electronjs.org/docs/latest/tutorial/snapcraft

> **Warning**: Signing and store submission commands handle certificates and tokens and send artifacts to external services. Run the examples only in a disposable test environment with test credentials. Pass tokens through environment variables and never write them directly into shell history or files.

## Sign a Windows app with jsign (Azure Artifact Signing)

```bash
jsign --storetype TRUSTEDSIGNING \
      --keystore https://eus.codesigning.azure.net/ \
      --storepass "${AZURE_ACCESS_TOKEN}" \
      --alias trusted-sign-acct/AppName \
      --tsaurl http://timestamp.acs.microsoft.com/ \
      --tsmode RFC3161 \
      --replace <file>
```

Official example for signing from Linux / macOS. `--replace` replaces any existing signature on the target file. Differs from the official text: `${AZURE_ACCESS_TOKEN}` is quoted here to avoid shell word splitting.

Source: https://www.electronjs.org/docs/latest/tutorial/code-signing

## Sign for the Mac App Store

The official guide does not give shell commands. It signs with `signAsync` from `@electron/osx-sign` (for example `identity: 'Apple Distribution'`). See the two JS examples (development / submission) in the mac-app-store-submission-guide page; no code block is included here because it has no shell commands. To get an MAS binary, use `ELECTRON_INSTALL_PLATFORM=mas electron .` (documented in tutorial/installation).

Source: https://www.electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide

## Install the tool for Windows Store (AppX) packages

```sh
npm install -g electron-windows-store
```

Prerequisites (per the official guide): Windows 10 Anniversary Update or later, the Windows 10 SDK, and Node 4 or later.

Source: https://www.electronjs.org/docs/latest/tutorial/windows-store-guide

## Run electron-windows-store

> **Warning**: This runs in an elevated PowerShell and can generate the AppX package, create certificates, and install. Run it only in a disposable Windows environment.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Package the app beforehand with `@electron/packager` or similar.

Source: https://www.electronjs.org/docs/latest/tutorial/windows-store-guide

## Install and run electron-installer-snap

```sh
npm install --save-dev electron-installer-snap
npx electron-installer-snap --src=out/myappname-linux-x64
```

Run in a terminal where `snapcraft` is on `PATH`; pass the location of the packaged app to `--src`.

Source: https://www.electronjs.org/docs/latest/tutorial/snapcraft

## Build with snapcraft and install locally

> **Warning**: `--dangerous` allows installing an unsigned local snap. Run only in a disposable Linux environment.

```sh
npx create-electron-app@latest my-app
cd my-app
# Create snap/snapcraft.yaml in the project root first (see the YAML example on the snapcraft page)
snapcraft
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
electron-packager-hello-world
```

Before running `snapcraft`, create `snap/snapcraft.yaml` in the project root (`my-app`); see the YAML example on the snapcraft page. That example uses `command: my-app/my-app --no-sandbox`, but `--no-sandbox` is for testing only (api/command-line-switches).

Source: https://www.electronjs.org/docs/latest/tutorial/snapcraft
