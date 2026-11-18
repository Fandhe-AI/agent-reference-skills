---
source: https://docs.cloud.google.com/developer-connect/docs/connect-repo
---

# Quickstart: connect a source code repository

Console quickstart that connects GitHub through a Git repository connection (required for Gemini Code Assist code customization), links one repository, and cleans up.

## Signature / Usage

### Prerequisites

You need a GitHub account and a repository on GitHub.com. If you are not the owner, ask the owner for admin-level permissions on the repository (or, for an organization repository, the organization owner).

### Initiate and configure the connection (console)

1. Open Developer Connect in the Google Cloud console and click **Connect** on the GitHub card.
2. Choose region `us-central1`, name `quickstart-connection`, then **Continue**.
3. Click **I understand and continue** (pop-ups must be allowed), sign in to GitHub and **Authorize Developer Connect** if prompted.
4. Install or re-use the **Google Developer Connect** GitHub app on the account that has the repository, choose the repository under **Repositories**, and click **Link**.

### Verify

```bash
gcloud developer-connect connections describe CONNECTION_NAME \
    --location=REGION
```

## Options / Props

| Console step | Value |
|--------------|-------|
| Region | `us-central1` |
| Name | `quickstart-connection` |
| Clean up | Repositories tab: **Unlink** the repository; Connections tab: **Delete** the connection (enter its name to confirm) |

## Notes

- Deleting connections and links does not delete the repositories on GitHub.com. To remove the GitHub app, follow GitHub's instructions on modifying installed apps.
- Deleting a connection is irreversible; try this quickstart on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/developer-connect/docs/connect-github-repo (the source quickstart is console-only).
- Source: https://docs.cloud.google.com/developer-connect/docs/connect-repo (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-github-repo.md](./connect-github-repo.md)
- [git-repo-connections.md](./git-repo-connections.md)
