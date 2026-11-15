---
source: https://docs.cloud.google.com/shell/docs/quotas-limits
---

# Quotas and limits

Cloud Shell uses quotas and system limits to maintain fair resource allocation, prevent service overloads, and help you manage resource use. Quotas have default values you can typically request adjustments for; system limits are fixed values that can't be changed.

## Signature / Usage

### Viewing your weekly Cloud Shell quota

Click **Session information** and then click **Usage quota**. A dialog displays the hours remaining in your quota, the total number of hours, and the date and time the quota resets. If you reach your quota, wait until that time or upgrade to Cloud Workstations, which has no weekly usage limitations.

### Clearing disk space

If you encounter a `no space left on device` error, free up space by removing files from your home directory. To see the space each file uses within each sub-directory:

Adapted (not in the official docs): the official `du -hs $(ls -A)` splits file names that contain spaces and passes names that start with `-` as options; this form passes every entry of the current directory (including dotfiles) intact.

```bash
du -hs -- .[!.]* ..?* * 2>/dev/null
```

### Required `.bashrc` content

Cloud Shell can produce errors if the `.bashrc` file is modified or deleted. The `.bashrc` file must contain the following lines:

```sh
  if [ -f "/google/devshell/bashrc.google" ]; then
    source "/google/devshell/bashrc.google"
  fi
```

### `gcloud` output formatting

By default, Cloud Shell enables gcloud accessibility features, so table output is rendered as a flattened list. To restore boxed tables for many commands, append the following to the end of your `$HOME/.bashrc` file:

```bash
gcloud config set accessibility/screen_reader false
```

## Options / Props

| Limit | Value |
| --- | --- |
| Default weekly Cloud Shell usage quota | 50 hours |
| Non-interactive sessions | Ended automatically after 40 minutes |
| Maximum session length | 12 hours (new session can start immediately) |
| Inactive VM | Terminates if the session is inactive for 40 minutes; changes outside `$HOME` are lost |
| `$HOME` persistent disk | 5 GB (per user, across projects; counts all files incl. installed software) |
| `$HOME` recycling | Deleted if you delete it or don't access Cloud Shell for 120 days (email notification first) |
| First connection | Can take up to 25 seconds (home disk creation); subsequent connections about five seconds; slower if unused for a week |
| Users | Not available to users younger than 18 or whose age is unknown |
| Editor extensions | Installation of custom Cloud Shell Editor extensions is not supported |
| Browsers | Latest Google Chrome, Mozilla Firefox, Microsoft Edge, Microsoft Internet Explorer 11+, Apple Safari 8+; Safari in private browser mode is not supported |

## Notes

- Adapted from the official docs: the disk-usage example `du -hs $(ls -A)` is replaced by a glob form (`du -hs -- .[!.]* ..?* *`) that does not word-split file names or treat a leading `-` as an option.
- Cloud Shell is intended for interactive use only. Coin mining and network scanning using Cloud Shell are strictly prohibited; violating the Terms of Service results in Cloud Shell being disabled for your account.
- If a session is terminated or can't be established because you exceeded a service limit, Cloud Shell displays an error with a link to a form to appeal the violation.
- The majority of these limits are not present in Cloud Workstations.
- To prevent `$HOME` deletion due to 120 days of inactivity, start a session. For sensitive data you want to store long term, consider Cloud Storage.
- Third-party cookies: the Cloud Shell Editor can't load if third-party cookies are disabled (default in many browsers' private modes). You can still use it in its own window via **Open in New Window**, or by navigating to port 970 using Web Preview.
- Ephemeral mode offers faster connection performance but all files you create in your session are lost on session end.
- Inactivity timeout: this page says 40 minutes, whereas [how-cloud-shell-works.md](./how-cloud-shell-works.md) says "after an hour of inactivity". Both are kept as written.
- The page's `.bashrc` snippet keeps its two-space inner indentation from the source.
- Source: https://docs.cloud.google.com/shell/docs/quotas-limits (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-cloud-shell-works.md](./how-cloud-shell-works.md)
- [using-cloud-shell.md](./using-cloud-shell.md)
- [using-web-preview.md](./using-web-preview.md)
- [resetting-cloud-shell.md](./resetting-cloud-shell.md)
