---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-blazor-site/
---

# Blazor WebAssembly

Only Blazor WebAssembly works on Pages; Blazor Server is incompatible with the Cloudflare edge model. A `build.sh` installs .NET and publishes to `output`.

## Signature / Usage

```sh
dotnet new blazorwasm -o my-blazor-project
```

`build.sh` (runs in the Pages build environment; update the channel if you are not on the .NET 8 SDK). Make it executable with `chmod +x build.sh`:

```plaintext
#!/bin/sh
curl -sSL https://dot.net/v1/dotnet-install.sh > dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh -c 8.0 -InstallDir ./dotnet
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
- The build script downloads and runs Microsoft's installer script during the Pages build; review it before committing.

## Related

- [static-html.md](./static-html.md)
- [overview.md](./overview.md)
