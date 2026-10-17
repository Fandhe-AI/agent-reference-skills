---
source: https://v2.tauri.app/distribute/rpm/
---

# RPM

How to distribute and manage RPM packages: configuring scripts, setting dependencies, adding a license, signing and debugging packages. Some sections (scripts and certain other steps) are optional.

## Signature / Usage

```sh
cargo tauri build
```

The RPM package is built in the `src-tauri/target/release/bundle/rpm` directory. Full option list: RpmConfig in the configuration reference.

### Signing the RPM package

Tauri signs the package with a GPG key during the build.

```bash
gpg --gen-key
export TAURI_SIGNING_RPM_KEY=$(cat /home/johndoe/my_super_private.key)
export TAURI_SIGNING_RPM_KEY_PASSPHRASE=password   # if the key has a passphrase
cargo tauri build
```

Verify the signature (local testing only): export and import the public key, then check (optionally set `~/.rpmmacros` as shown below):

```bash
gpg --export -a 'Tauri-App' > RPM-GPG-KEY-Tauri-App
sudo rpm --import RPM-GPG-KEY-Tauri-App
rpm  -v --checksig tauri-app-0.0.0-1.x86_64.rpm
```

`~/.rpmmacros` (minimal):

```bash
%_signature gpg
%_gpg_name Tauri-App
```

### Debugging the RPM package

| Purpose | Command |
| --- | --- |
| Package info (version, release, architecture) | `rpm -qip package_name.rpm` |
| Query specific fields | `rpm  -qp --queryformat '[%{NAME} %{VERSION} %{RELEASE} %{ARCH} %{SIZE}\n]' package_name.rpm` |
| List package contents | `rpm -qlp package_name.rpm` |
| Print pre/post install/remove scripts | `rpm -qp --scripts package_name.rpm` |
| Check dependencies | `rpm -qp --requires package_name.rpm` |
| Packages that depend on a package | `rpm -q --whatrequires package_name.rpm` |
| Verbose install | `rpm -ivvh package_name.rpm` |
| Verbose upgrade of installed package | `rpm -Uvvh package_name.rpm` |

### Cross-Compiling for ARM-based Devices

The ten manual steps (Rust targets `armv7-unknown-linux-gnueabihf` / `aarch64-unknown-linux-gnu`, gcc linker, `.cargo/config.toml` linker entries, `dpkg --add-architecture`, ports.ubuntu.com sources with `[arch=amd64]` on existing lines, `libwebkit2gtk-4.1-dev:armhf|arm64`, OpenSSL headers or vendored `openssl-sys`, `PKG_CONFIG_SYSROOT_DIR`, `cargo tauri build --target <triple>`) are identical to the Debian page; see debian.md.

## Options / Props

`tauri.conf.json > bundle > linux > rpm`:

| Name | Description |
| --- | --- |
| `preInstallScript` / `postInstallScript` / `preRemoveScript` / `postRemoveScript` | Scripts run before or after installation or removal |
| `conflicts` | Prevents installation if the package conflicts with another package |
| `provides` | RPM dependencies that your application provides |
| `depends` | RPM dependencies that your application needs to run |
| `files` | Files to include in the package |
| `obsoletes` | RPM dependencies that your application obsoletes; if this package is installed, packages listed as obsoletes are automatically removed if present |
| `desktopTemplate` | Adds a custom desktop file to the package |
| `epoch` | Defines weighted dependencies based on version numbers |
| `release` | Package release (`"1"` in the example) |

```json
{
  "bundle": {
    "linux": {
      "rpm": {
        "epoch": 0,
        "files": {},
        "release": "1",
        "preInstallScript": "/path/to/your/project/src-tauri/scripts/prescript.sh",
        "postInstallScript": "/path/to/your/project/src-tauri/scripts/postscript.sh",
        "preRemoveScript": "/path/to/your/project/src-tauri/scripts/prescript.sh",
        "postRemoveScript": "/path/to/your/project/src-tauri/scripts/postscript.sh"
      }
    }
  }
}
```

```json
{
  "bundle": {
    "linux": {
      "rpm": {
        "postRemoveScript": "/path/to/your/project/src-tauri/scripts/postscript.sh",
        "conflicts": ["oldLib.rpm"],
        "depends": ["newLib.rpm"],
        "obsoletes": ["veryoldLib.rpm"],
        "provides": ["coolLib.rpm"],
        "desktopTemplate": "/path/to/your/project/src-tauri/desktop-template.desktop"
      }
    }
  }
}
```

Scripts setup (create `src-tauri/scripts` with the four script files):

```bash
mkdir src-tauri/scripts
touch src-tauri/scripts/postinstall.sh \
  src-tauri/scripts/preinstall.sh \
  src-tauri/scripts/preremove.sh \
  src-tauri/scripts/postremove.sh
```

Example `preinstall.sh` (the others follow the same pattern with `This is post`, `This is preun`, `This is postun`):

```bash
echo "-------------"
echo "This is pre"
echo "Install Value: $1"
echo "Upgrade Value: $1"
echo "Uninstall Value: $1"
echo "-------------"
```

License, in `src-tauri/Cargo.toml` or `tauri.conf.json`:

```toml
[package]
name = "tauri-app"
version = "0.0.0"
description = "A Tauri App"
authors = ["you"]
edition = "2021"
license = "MIT" # add the license here
```

```json
{
  "bundle": {
    "licenseFile": "../LICENSE",
    "license": "MIT"
  }
}
```

## Notes

- Limitations: build with the oldest base system you intend to support that also provides Tauri v2's required WebKitGTK 4.1 packages (Ubuntu 22.04 and Debian 12 are suitable baselines). Newer bases can raise the minimum glibc and cause runtime errors like `/usr/lib/libc.so.6: version 'GLIBC_2.33' not found`. Use Docker or GitHub Actions.
- `epoch` is not recommended unless necessary, as it alters how the package manager compares package versions.
- The source's `scripts` example sets `preInstallScript`/`preRemoveScript` and `postInstallScript`/`postRemoveScript` to the same `prescript.sh` / `postscript.sh` paths; use your own script file names.
- The source repeats `touch` on backslash-continued lines (creating a stray `touch` file); merged into one command.
- The source also shows a ~/.rpmmacros %__gpg_sign_cmd forcing --digest-algo=sha1 / --force-v3-sigs; it is omitted here because SHA-1 signatures are weak and rejected by modern rpm.
- GUI apps on Linux do not inherit `$PATH` from shell dotfiles; see the `fix-path-env-rs` crate.

## Related

- [debian](./debian.md)
- [appimage](./appimage.md)
- [bundle-linux config](../config/bundle-linux.md)
