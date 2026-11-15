---
source: https://docs.cloud.google.com/shell/docs/launching-cloud-shell
---

# Launch Cloud Shell

A Cloud Shell session can be launched in different ways to best fit your use case.

## Signature / Usage

### Launch from the Google Cloud console

Click **Activate Cloud Shell** in the Google Cloud console (http://console.cloud.google.com). This launches a session in the bottom pane of Google Cloud console. You can transfer the session to a full screen experience by clicking **Open in new window**.

### Launch a standalone session

If you'd prefer a standalone session, launch Cloud Shell with https://shell.cloud.google.com. The Cloud Shell terminal and Cloud Shell Editor are automatically started for you.

To open just the Cloud Shell Editor, use https://ide.cloud.google.com. You can still access the Cloud Shell terminal at any time using the Open terminal button in the Cloud Shell menu bar.

### Launch from documentation

After starting your free trial, you can find **Activate Cloud Shell** in the header of the documentation page you're on. If you're signed into your Google account and reading Google Cloud documentation, you can find it there too. The button launches Cloud Shell as a panel at the bottom of your current page, so you can experiment with the product you're reading about while keeping the documentation in context.

The Cloud Shell terminal comes with the gcloud CLI, Docker, and other command-line utilities preinstalled and automatically authenticates you with your Google credentials, so you can use the terminal to run sample code in the documentation.

### Launch with an Open in Cloud Shell link

To let your users experiment with your project or code samples without having to download the gcloud CLI or installing dependencies, use the Open in Cloud Shell (OiCS) feature. It lets you construct and publish a URL that automatically performs certain actions upon Cloud Shell launch, such as cloning a Git repository or opening a tutorial, and supports URL parameters to customize the launched experience. See [open-in-cloud-shell.md](./open-in-cloud-shell.md).

### Launch and connect locally to Cloud Shell with the gcloud CLI

To interact with and connect to your Cloud Shell environment using a local command line, install the gcloud CLI. Using the `gcloud cloud-shell` command group, you can copy files between your local machine and Cloud Shell environment and establish an interactive SSH session with Cloud Shell.

Snippet taken from https://docs.cloud.google.com/shell/docs/using-cloud-shell-with-gcloud-cli:

```bash
gcloud cloud-shell ssh
```

## Notes

- Distance line: installing and authorizing the gcloud CLI itself is covered by the `install-setup` and `config-auth` categories of this skill; authentication concepts generally are in the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/shell/docs/launching-cloud-shell (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-cloud-shell.md](./using-cloud-shell.md)
- [launching-cloud-shell-editor.md](./launching-cloud-shell-editor.md)
- [open-in-cloud-shell.md](./open-in-cloud-shell.md)
- [using-cloud-shell-with-gcloud-cli.md](./using-cloud-shell-with-gcloud-cli.md)
