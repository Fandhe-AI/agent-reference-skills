---
source: https://docs.cloud.google.com/developer-connect/docs/connect-github-repo
---

# Connect to GitHub and link repositories

Create a Developer Connect connection to GitHub and link GitHub repositories, using the Google Cloud console or the gcloud CLI. The connection stores a GitHub OAuth token as a Secret Manager secret in your project.

## Signature / Usage

### Prerequisites for the CLI

Create the Developer Connect service agent (beta track, as the source shows):

```bash
gcloud beta services identity create \
    --service=developerconnect.googleapis.com \
    --project=PROJECT_ID
```

### Create the connection (gcloud)

Adapted (not in the official docs): `APP_TYPE` values are written as the lower-case, hyphenated choices that the gcloud 593.0.0 help lists (`dataform`, `developer-connect`, `firebase`, `gemini-code-assist`) instead of `DEVELOPER_CONNECT` and similar.

```bash
gcloud developer-connect connections create CONNECTION_NAME \
    --location=REGION \
    --github-config-app=APP_TYPE \
    --git-proxy-config-enabled
```

Get the app-installation URI, open it in a browser, click **I understand and continue**, sign in to GitHub and **Authorize Developer Connect**:

```bash
gcloud developer-connect connections describe CONNECTION_NAME \
    --location=REGION
```

If `installationState` is `COMPLETE`, the app installation is done; otherwise the output contains a URI that returns you to configuration in the browser.

### Add repository links

```bash
gcloud developer-connect connections git-repository-links create REPO_NAME \
    --clone-uri=REPO_URI \
    --connection=CONNECTION_NAME \
    --location=REGION
```

List linked repositories with `gcloud developer-connect connections git-repository-links list`. `REPO_URI` example from the source: `https://github.com/cloud-build/test-repo.git`.

## Options / Props

### Required roles

| Role | Grant to | When |
|------|----------|------|
| `roles/developerconnect.admin` (Developer Connect Admin) | Your user account | If you are not the project owner |
| `roles/cloudkms.cryptoKeyEncrypterDecrypter` | The Secret Manager service account | To encrypt the secrets Developer Connect creates with a CMEK |
| `roles/secretmanager.admin` (Secret Manager Admin) | The Developer Connect service account `service-{projectNumber}@gcp-sa-devconnect.iam.gserviceaccount.com` | To use the gcloud CLI |
| `roles/resourcemanager.projectIamAdmin` (Project IAM Admin) | Your user account | To use the console; the console can then grant the necessary permissions automatically |

### `--github-config-app` values

| Value | Use |
|-------|-----|
| `firebase` | Firebase App Hosting |
| `dataform` | Dataform |
| `gemini-code-assist` | Gemini Code Assist |
| `developer-connect` | Everything else |

### Console options

| Option | Behavior |
|--------|----------|
| Enable a data residency compliant connection | Creates a GitHub app for the connection; only console-created GitHub connections can be data-residency compliant |
| Encryption | Optional CMEK key for the Secret Manager secrets Developer Connect creates |
| Enable Developer Connect proxy | On by default; lets Developer Connect proxy Git calls to GitHub. `--git-proxy-config-enabled` is the CLI equivalent |

## Notes

- Adapted from the official docs: the source writes `--github-config-app=APP_TYPE` with values `FIREBASE`, `DATAFORM`, `GEMINI_CODE_ASSIST`, `DEVELOPER_CONNECT`; the gcloud 593.0.0 help lists the lower-case hyphenated forms.
- The source recommends completing the guide with a bot account or an account shared by your team, not a personal account, and owning the repository or having admin-level permissions on a shared one.
- GitHub connections created with the gcloud CLI are not data-residency compliant; all other connection types are.
- The OAuth token that GitHub creates is stored in your project as a Secret Manager secret; treat that secret as a credential and do not copy it elsewhere.
- Roles above are the source's requirements; the Secret Manager Admin grant to the service account is broad, so ask your administrator whether the console path (Project IAM Admin) suits your policy better.
- Data sharing: content from Google Cloud resources linked to this connection might be transferred to GitHub. To stop sharing, delete the Developer Connect connections and revoke access in GitHub.
- Deleting connections is irreversible; try these steps on a disposable project first.
- The source also shows Console steps (omitted here except where listed in the tables).
- Source: https://docs.cloud.google.com/developer-connect/docs/connect-github-repo (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [git-repo-connections.md](./git-repo-connections.md)
- [connect-repo.md](./connect-repo.md)
- [connect-gitlab.md](./connect-gitlab.md)
