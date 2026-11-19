---
source: https://docs.cloud.google.com/secure-source-manager/docs/use-git
---

# Use Git with Secure Source Manager

Secure Source Manager supports all Git SCM client commands over HTTPS and SSH. HTTPS authentication uses a gcloud-backed Git credential helper (gcloud CLI `395.0.0` or later); a Compute Engine VM can authenticate with its attached service account, and Workforce Identity Federation users use a workforce login configuration instead.

## Signature / Usage

### Check and update the gcloud CLI

If the Git installer asks for a credential helper, select **None (Do not use a credential helper)**.

```bash
gcloud --version
```

```bash
gcloud components update
```

Then run `gcloud init`.

### Set up the credential helper (Linux)

```bash
git config --global credential.'https://*.*.sourcemanager.dev'.helper gcloud.sh
```

Earlier versions of Git might not support wildcards:

```bash
git config --global credential.'https://INSTANCE_ID-PROJECT_NUMBER-git.LOCATION.sourcemanager.dev'.helper gcloud.sh
```

### Set up the credential helper (Windows)

```bash
git config --global credential.https://*.*.sourcemanager.dev.helper gcloud.cmd
```

Without wildcards:

```bash
git config --global credential.https://INSTANCE_ID-PROJECT_NUMBER-git.LOCATION.sourcemanager.dev.helper gcloud.cmd
```

To re-authenticate after the initial setup:

```bash
gcloud auth login
```

### Authenticate from a Compute Engine VM with a service account

For a custom service account, create it and allow the VM creator to use it:

```bash
gcloud iam service-accounts create SA_NAME --project=PROJECT_ID
```

```bash
gcloud iam service-accounts add-iam-policy-binding SA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --member="user:USER_EMAIL" \
    --role="roles/iam.serviceAccountUser"
```

```bash
gcloud compute instances create VM_NAME \
    --project=PROJECT_ID \
    --zone=ZONE \
    --scopes=openid,https://www.googleapis.com/auth/userinfo.profile,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform \
    --service-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

Adapted (not in the official docs): the instance-level grant uses `gcloud source-manager instances add-iam-policy-binding` instead of a project-level `gcloud projects add-iam-policy-binding`, and the repository grant uses `gcloud source-manager repos add-iam-policy-binding --region` instead of `gcloud ssm repos ... --instance --location` (no such group or flags in gcloud 593.0.0); `$SA_EMAIL` is quoted as `"${SA_EMAIL}"`.

```bash
SA_EMAIL="$(gcloud compute instances describe VM_NAME --project=PROJECT_ID --zone=ZONE --format="get(serviceAccounts[0].email)")"
gcloud source-manager instances add-iam-policy-binding INSTANCE_ID \
    --project=PROJECT_ID \
    --region=LOCATION \
    --member="serviceAccount:${SA_EMAIL}" \
    --role=roles/securesourcemanager.instanceAccessor
gcloud source-manager repos add-iam-policy-binding REPOSITORY_ID \
    --project=PROJECT_ID \
    --region=LOCATION \
    --member="serviceAccount:${SA_EMAIL}" \
    --role=roles/securesourcemanager.repoReader
```

For write access use `roles/securesourcemanager.repoWriter`. Then connect to the VM, install Git and set the credential helper:

```bash
gcloud compute ssh VM_NAME --project=PROJECT_ID --zone=ZONE
```

```bash
sudo apt-get install git
```

### Clone and push

```bash
git clone REPOSITORY_URL
```

To push an existing repository into an empty Secure Source Manager repository:

```bash
git remote add origin REPOSITORY_URL
```

```bash
git push -u origin main
```

### Clone with the Developer Connect Git proxy

```bash
git config --global credential.'https://*.developerconnect.dev'.helper gcloud.sh
```

```bash
git clone https://REGION-git.developerconnect.dev/v1/projects/PROJECT_ID/locations/REGION/connections/CONNECTION_ID/gitRepositoryLinks/LINK_ID
```

On Windows use `git config --global credential.https://*.developerconnect.dev.helper gcloud.cmd`.

## Options / Props

### Required roles

| Role | Scope | Needed for |
|------|-------|-----------|
| `roles/securesourcemanager.instanceAccessor` | The instance | Any Git use |
| `roles/securesourcemanager.repoReader` | The repository | Clone |
| `roles/securesourcemanager.repoWriter` | The repository | Push |
| `roles/developerconnect.gitProxyReader` | `GitRepositoryLink` resource in Developer Connect | Clone through the proxy URI |

## Notes

- gcloud CLI `395.0.0` or later is required for Git over HTTPS.
- Credentials from the helper are short lived. If Git config contains a line like `*credential*.helper=store`, remove it from the global, system or local Git config; otherwise authentication errors occur.
- Workforce Identity Federation users do not set the helper; they create a workforce identity pool login configuration (browser-based sign-in with the gcloud CLI) and re-authenticate when the pool session duration expires.
- On a VM, Git uses Application Default Credentials from the VM service account; use the HTTPS repository URL. Grant access at the repository level (least privilege); IAM propagation can take a few minutes.
- The source's first VM option uses the Compute Engine default service account with the scopes above; a custom service account is shown as the other path and is the one reproduced here. The `cloud-platform` scope is broad.
- Pushing through the Developer Connect Git proxy URI is not supported (prevents writes under the Developer Connect service account identity); use HTTPS or SSH to push. Proxy setup requires Git proxy enabled on the Developer Connect connection.
- Adapted from the official docs: the source grants `roles/securesourcemanager.instanceAccessor` at project level with `gcloud projects add-iam-policy-binding` and uses `gcloud ssm repos add-iam-policy-binding REPOSITORY_ID --instance=INSTANCE_ID --location=LOCATION`; neither `ssm` nor `--instance` / `--location` exists for that command in gcloud 593.0.0 help. The instance grant is moved from the project to the instance, which is the narrower scope (the Secure Source Manager permission-mapping page states that instance roles bind to an instance or a project).
- The source also shows the Compute Engine default-service-account VM creation command.
- Source: https://docs.cloud.google.com/secure-source-manager/docs/use-git (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-repository.md](./create-repository.md)
- [grant-iam-roles.md](./grant-iam-roles.md)
- [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md)
