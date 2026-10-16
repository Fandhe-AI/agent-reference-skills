---
source: https://docs.astral.sh/uv/reference/installer/
---

# The uv installer

Environment variables that customize the standalone installer (`install.sh` / `install.ps1`).

## Signature / Usage

Change the installation path with `UV_INSTALL_DIR`:

First download and inspect the installer as described in [Installing uv](./installation.md) (`${installer}` is the downloaded file). Then:

```console
$ env UV_INSTALL_DIR="/custom/path" sh "${installer}"
```

```pwsh-session
PS> powershell -ExecutionPolicy ByPass -c {$env:UV_INSTALL_DIR = "C:\Custom\Path"; & $installer}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `UV_INSTALL_DIR` | path | Where the uv binary is installed. By default uv is installed in the user executable directory. |
| `UV_NO_MODIFY_PATH` | `1` | Disables updating shell profiles to put the uv binary on `PATH`. |
| `UV_UNMANAGED_INSTALL` | path | Installs uv to a specific path while preventing the installer from modifying shell profiles or environment variables. Intended for ephemeral environments like CI. Also disables self-updates. |

## Disabling shell modifications

```console
$ env UV_NO_MODIFY_PATH=1 sh "${installer}"
```

If installed with `UV_NO_MODIFY_PATH`, subsequent operations such as `uv self update` will not modify shell profiles.

## Unmanaged installations

```console
$ env UV_UNMANAGED_INSTALL="/custom/path" sh "${installer}"
```

## Passing options to the installation script

Environment variables are recommended because they are consistent across platforms. Options can also be passed directly to the script; to see the available options:

```console
$ sh "${installer}" --help
```

## Notes

- The official documentation shows these examples in pipe form (`curl ... | env VAR=... sh`, `irm ... | iex`); this page rewrites them to run a previously downloaded and inspected installer. Environment variable names and values are unchanged.
- Changing the installation path only affects where the uv binary is installed. uv still stores its data (cache, Python installations, tools, etc.) in the default locations.
- `UV_UNMANAGED_INSTALL` disables self-updates (`uv self update`).

## Related

- [Installing uv](./installation.md)
