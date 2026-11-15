---
source: https://docs.cloud.google.com/shell/docs/uploading-and-downloading-files
---

# Manage files with Cloud Shell

How to upload and download files and folders with Cloud Shell.

## Signature / Usage

To transfer files, use one of the following methods:

- Click **More** > **Upload** or **Download** to move your files or folders to or from Cloud Shell. Files and folders can only be uploaded to and downloaded from your home directory.
- Use the `cloudshell download` command to download files:

```bash
cloudshell download test1.md test2.md
```

- Use the `gcloud cloud-shell scp` command on a local terminal to transfer files between Cloud Shell and your workstation. For example, to move a file, 'data.txt', from Cloud Shell to your local machine:

Adapted (not in the official docs): `localhost:~data.txt` lacks the slash after `~`; the file is meant to land in the local home directory.

```bash
gcloud cloud-shell scp cloudshell:~/data.txt localhost:~/data.txt
```

- In your Cloud Shell Editor Explorer, right-click a directory or file and then click **Copy Download Link**, **Download**, or **Upload Files**.

## Notes

- Corrected from the official docs: the page writes the destination as `localhost:~data.txt` (`gcloud cloud-shell scp cloudshell:~/data.txt localhost:~data.txt`), which lacks the slash after `~`; the fence uses `localhost:~/data.txt`, the form the `gcloud cloud-shell scp` help uses.
- Source: https://docs.cloud.google.com/shell/docs/uploading-and-downloading-files (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-cloudshell-command.md](./using-cloudshell-command.md)
- [using-cloud-shell-with-gcloud-cli.md](./using-cloud-shell-with-gcloud-cli.md)
- [editor-overview.md](./editor-overview.md)
