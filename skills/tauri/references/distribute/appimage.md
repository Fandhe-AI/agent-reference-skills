---
source: https://v2.tauri.app/distribute/appimage/
---

# AppImage

`AppImage` is a distribution format that does not rely on system installed packages and instead bundles all dependencies and files needed by the application. The output is larger (from the 2-6 MB range to 70+ MB) but supported on many Linux distributions and executable without installation.

## Signature / Usage

```sh
chmod a+x MyProject.AppImage
./MyProject.AppImage
```

## Options / Props

| Config key (`bundle > linux > appimage > ...`) | Description |
| --- | --- |
| `bundleMediaFramework` | Enable if your app plays audio/video; includes additional GStreamer files, increasing bundle size. Currently only fully supported on Ubuntu build systems |
| `files` | Map of path inside the AppImage to a file or folder relative to `tauri.conf.json` |

```json
{
  "bundle": {
    "linux": {
      "appimage": {
        "files": {
          "/usr/share/README.md": "../README.md",
          "/usr/assets": "../assets/"
        }
      }
    }
  }
}
```

## Notes

- Limitations: build with the oldest base system you intend to support that also provides Tauri v2's required WebKitGTK 4.1 packages (Ubuntu 22.04 and Debian 12 are suitable baselines). A newer base can raise the minimum glibc, causing runtime errors like `/usr/lib/libc.so.6: version 'GLIBC_2.33' not found`. Use Docker or GitHub Actions to build for Linux.
- Make sure the build system has all the GStreamer plugins your app needs at runtime; plugins in the `ugly` package are licensed in a way that may make them hard to distribute.
- `files` destination paths must currently begin with `/usr/`. Use Tauri's resources feature for other files.
- ARM: `linuxdeploy`, the AppImage tooling Tauri uses, does not support cross-compiling ARM AppImages, so they can only be built on ARM devices or emulators. Since August 2025 GitHub provides public `ubuntu-22.04-arm` and `ubuntu-24.04-arm` runners (typical build ~10 minutes). A QEMU based workflow exists but is extremely slow; see the GitHub pipelines page.
- GUI apps on Linux do not inherit `$PATH` from shell dotfiles; see the `fix-path-env-rs` crate.

## Related

- [sign-linux](./sign-linux.md)
- [pipelines-github](./pipelines-github.md)
- [bundle-linux config](../config/bundle-linux.md)
