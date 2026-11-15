---
source: https://docs.cloud.google.com/sdk/docs/uninstall-cloud-sdk
---

# Uninstall the gcloud CLI

How to remove the gcloud CLI. For OS-package installs (such as `apt-get` or `yum`), uninstall with the OS package manager. For Windows installations, run `uninstaller.exe` in your gcloud CLI directory.

## Signature / Usage

1. Locate the installation directory and the user config directory (typically `~/.config/gcloud` on macOS and Linux):

   ```bash
   gcloud info --format='value(installation.sdk_root)'
   ```

   ```bash
   gcloud info --format='value(config.paths.global_config_dir)'
   ```

2. Delete both directories.

   > **Warning:** this permanently deletes the installation and the user config directory, including stored credentials and named configurations. Check the paths printed in step 1 before deleting.
3. Remove lines sourcing `completion.bash.inc` and `path.bash.inc` in your `.bashrc` or equivalent shell init file, if you added them during installation.
4. Review the `.boto` file in your home directory and remove the sections `[GoogleCompute]` and `[GSUtil]`; review `[OAuth2]` and `[Credentials]` for settings no longer needed.
5. Some systems keep `Cache` directories such as `~/Library/Caches/` on macOS. Find and delete them:

   Adapted (not in the official docs): `find -exec` passes each path intact (no pipe to `xargs`), and `-prune` stops `find` from descending into a directory it is about to delete.

   ```bash
   find ~/Library/Caches/ -type d -name "google-cloud-sdk" -prune -exec rm -r {} +
   ```

## Notes

- Adapted from the official docs: the official macOS cache cleanup `find ~/Library/Caches/ -type d -name "google-cloud-sdk" | xargs -I {} rm -r "{}"` is replaced with `find ... -prune -exec rm -r {} +`, which does not depend on how `xargs` splits paths.
- The cleanup deletes every directory it matches; run the `find` part without `-exec rm -r {} +` first to preview the matches.
- On Windows, if you uninstalled the gcloud CLI, reboot before reinstalling (see install-sdk).
- Source: https://docs.cloud.google.com/sdk/docs/uninstall-cloud-sdk (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-sdk.md](./install-sdk.md)
