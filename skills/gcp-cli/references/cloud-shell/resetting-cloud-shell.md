---
source: https://docs.cloud.google.com/shell/docs/resetting-cloud-shell
---

# Disable or reset Cloud Shell

Turn off Cloud Shell access for managed users, or reset your Cloud Shell instance to reprovision a clean home directory and restore default settings.

## Signature / Usage

### Disable Cloud Shell for managed user accounts

To disable Cloud Shell for Google Workspace and Cloud Identity managed user accounts, go to the Google Admin console and navigate to **Apps** > **Additional Google services** > **Google Cloud Platform** > **Cloud Shell Settings** and disable **Cloud Shell Access Settings**.

To disable Cloud Shell for specific users, use access groups: add individual users to the group and turn off the group's Cloud Shell access setting.

### Reset Cloud Shell

Before resetting your home directory, consider using Safe mode to sign in as root and fix issues with your files.

To restore your Cloud Shell home directory to a clean state:

1. Check for personal files in the home directory and note that the next step deletes these files:

```sh
ls -a $HOME
```

2. Remove all files from your home directory.

> **Important:** This will permanently delete all files in your home directory.

The official page runs `sudo rm -rf $HOME` inside the Cloud Shell session for this step. It is not reproduced as a copyable command here because it deletes the whole home directory irreversibly; run it only inside Cloud Shell after backing up the files listed in step 1.

3. In the Cloud Shell menu, click **More** and then click **Restart**. If prompted, click **Restart** in the confirmation dialog. This provisions a new VM and restores the home directory to its default state.

## Notes

- Destructive: the official step 2 command (`sudo rm -rf $HOME`) is irreversible and Cloud Shell can't recover deleted files; it is described in prose instead of a copyable block.
- Safe mode is described in [how-cloud-shell-works.md](./how-cloud-shell-works.md).
- Source: https://docs.cloud.google.com/shell/docs/resetting-cloud-shell (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-cloud-shell-works.md](./how-cloud-shell-works.md)
- [configuring-cloud-shell.md](./configuring-cloud-shell.md)
- [quotas-limits.md](./quotas-limits.md)
