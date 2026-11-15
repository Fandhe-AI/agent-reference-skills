---
source: https://docs.cloud.google.com/shell/docs/using-cloud-shell-with-gcloud-cli
---

# Use Cloud Shell with the gcloud CLI

If you have the gcloud CLI installed, you can interact with Cloud Shell from your terminal and use it as a sandbox and a portable development environment, for example to quickly test an operation or to use an IDE of your choice to edit a file saved on your Cloud Shell instance from your local desktop.

## Signature / Usage

The `gcloud cloud-shell` command group provides:

- Establishing an interactive SSH session with Cloud Shell using `gcloud cloud-shell ssh`.
- Copying files between your local and Cloud Shell machine via `scp`.
- Mounting your Cloud Shell directory to your local file system via `sshfs` (`get-mount-command`).

### Example workflow

1. Start a SSH session:

```bash
gcloud cloud-shell ssh
```

2. Copy a file, `data.txt`, from Cloud Shell to your local machine:

```bash
gcloud cloud-shell scp cloudshell:~/data.txt localhost:~data.txt
```

Adapted (not in the official docs): `localhost:~data.txt` lacks the slash after `~`; the file is meant to land in the local home directory.

```bash
gcloud cloud-shell scp cloudshell:~/data.txt localhost:~/data.txt
```

3. If you're using Mac or Linux, you can mount your Cloud Shell home directory onto your local file system after installing sshfs (https://github.com/libfuse/sshfs). This allows you to edit the files in your Cloud Shell home directory using your choice of local tools. All the data in your remotely mounted file system is stored on a Persistent Disk and stored across sessions.

```bash
gcloud cloud-shell get-mount-command ~/my-cloud-shell
```

## Notes

- Corrected from the official docs: the destination `localhost:~data.txt` is kept verbatim above, followed by the corrected `localhost:~/data.txt` (the `gcloud cloud-shell scp` help uses `localhost:~/...`).
- To propagate your credentials to your Cloud Shell when starting it from the Google Cloud CLI, use the `--authorize-session` flag when running `gcloud cloud-shell ssh`.
- Reference documentation for the command group: https://docs.cloud.google.com/sdk/gcloud/reference/cloud-shell
- Distance line: installing the gcloud CLI is covered by the `install-setup` category of this skill.
- Source: https://docs.cloud.google.com/shell/docs/using-cloud-shell-with-gcloud-cli (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [uploading-and-downloading-files.md](./uploading-and-downloading-files.md)
- [launching-cloud-shell.md](./launching-cloud-shell.md)
- [how-cloud-shell-works.md](./how-cloud-shell-works.md)
