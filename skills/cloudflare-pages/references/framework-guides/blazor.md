---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-blazor-site/
---

# Blazor WebAssembly

Only Blazor WebAssembly works on Pages; Blazor Server is incompatible with the Cloudflare edge model. A `build.sh` installs .NET and publishes to `output`.

## Signature / Usage

```sh
dotnet new blazorwasm -o my-blazor-project
```

`build.sh` (runs in the Pages build environment). Make it executable with `chmod +x build.sh`.

`DOTNET_SDK_VERSION`, the SDK tarball URL and `DOTNET_SDK_SHA512` all come from the official .NET release metadata, https://dotnetcli.blob.core.windows.net/dotnet/release-metadata/8.0/releases.json: pick the SDK release you want and, in its `sdk.files[]` entry for `linux-x64`, copy the `url` and `hash` fields. Replace the placeholders before committing.

Adapted (not in the official docs): instead of downloading and running the mutable `dotnet-install.sh` installer, the script downloads a pinned .NET SDK tarball and verifies its published SHA-512 before extracting it; `set -eu` stops the build if the download or checksum check fails.

```plaintext
#!/bin/sh
set -eu

DOTNET_SDK_VERSION="<SDK_VERSION>"
DOTNET_SDK_URL="<URL_FROM_RELEASES_JSON>"
DOTNET_SDK_SHA512="<SHA512_FROM_RELEASES_JSON>"

curl -fsSL -o dotnet-sdk.tar.gz "${DOTNET_SDK_URL}"
echo "${DOTNET_SDK_SHA512}  dotnet-sdk.tar.gz" | sha512sum -c -
mkdir -p ./dotnet
tar -xzf dotnet-sdk.tar.gz -C ./dotnet
./dotnet/dotnet --version
./dotnet/dotnet publish -c Release -o output
```

Create a `.gitignore`:

```sh
dotnet new gitignore
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Build command | — | — | `./build.sh` |
| Build directory | — | — | `output/wwwroot` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Troubleshooting `Error: Asset "/opt/buildhome/repo/output/wwwroot/_framework/dotnet.wasm" is over the 25MiB limit`: either reduce asset size (https://docs.microsoft.com/en-us/aspnet/core/blazor/performance?view=aspnetcore-6.0#minimize-app-download-size), or remove the wasm files from the output with `rm output/wwwroot/_framework/*.wasm` and modify the app to load the Brotli compressed files (https://docs.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-6.0#compression).
- Adapted from the official docs: the source downloads `dotnet-install.sh` from a mutable URL and runs it unverified (with the PowerShell-style `-InstallDir`). This page downloads a pinned SDK tarball and checks its SHA-512 (from the official .NET release metadata) before extraction. `DOTNET_SDK_VERSION` documents which release the URL and hash belong to; keep all three values from the same `releases.json` entry and update them together when changing SDK.

## Related

- [static-html.md](./static-html.md)
- [overview.md](./overview.md)
