---
source: https://docs.cloud.google.com/sdk/docs/downloads-snap
---

# Install the gcloud CLI with snap

Install the gcloud CLI as a snap package on Ubuntu systems for automatic updates. Only available on Ubuntu versions that support snaps.

## Signature / Usage

The snap contains the gcloud CLI, `gcloud alpha`, `gcloud beta`, `gsutil`, `docker-credential-gcloud`, and `bq` only. It does not include `kubectl` or the App Engine extensions; install the Debian package if you need them.

1. Remove the deprecated `google-cloud-sdk` snap if installed (both packages need the same aliases):

   > **Warning:** this uninstalls the `google-cloud-sdk` snap from the machine.

   Adapted (not in the official docs): `sudo` is added because removing a snap needs root privileges.

   ```bash
   sudo snap remove google-cloud-sdk
   ```

2. Install the snap:

   Adapted (not in the official docs): `sudo` is added because installing a snap needs root privileges.

   ```bash
   sudo snap install google-cloud-cli --classic
   ```

3. Optional command completion (Bash, then Zsh), then restart your shell:

   ```bash
   echo "source /snap/google-cloud-cli/current/completion.bash.inc" >> ~/.bashrc
   ```

   ```bash
   echo "source /snap/google-cloud-cli/current/completion.zsh.inc" >> ~/.zshrc
   ```

4. Initialize:

   ```bash
   gcloud init
   ```

## Notes

- Ubuntu only (snap-capable releases).
- Adapted from the official docs: the page prints `snap remove google-cloud-sdk` and `snap install google-cloud-cli --classic` without `sudo`; both are shown with `sudo`.
- Source: https://docs.cloud.google.com/sdk/docs/downloads-snap (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-sdk.md](./install-sdk.md)
- [initializing.md](./initializing.md)
