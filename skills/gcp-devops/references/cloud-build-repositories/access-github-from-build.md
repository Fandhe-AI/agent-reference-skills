---
source: https://docs.cloud.google.com/build/docs/access-github-from-build
---

# Access a private GitHub repository from a build (SSH deploy key)

Tutorial: generate a GitHub SSH key, add its public half to the repository's deploy keys, store the private key in Secret Manager, and have a manually submitted build use it to clone the private repository. Needed only for manual builds; with Cloud Build triggers you can connect to any private repository you own without storing credentials in Secret Manager.

## Signature / Usage

### 1. Create an SSH key

Create a working directory, then generate a key without a passphrase (Cloud Build cannot use a passphrase-protected key). `github-email` is your GitHub email address.

```bash
mkdir workingdir
cd workingdir
```

```bash
ssh-keygen -t rsa -b 4096 -N '' -f id_github -C github-email
```

### 2. Store the private key in Secret Manager and add the public key as a deploy key

Upload `workingdir/id_github` as a secret in the Secret Manager page of the Google Cloud console (Create Secret; Secret value > Upload; leave Regions unchanged). Ensure the private key file ends with a newline, because Secret Manager might remove trailing whitespace and SSH requires a trailing newline.

In the repository on GitHub, go to Settings > Deploy keys > Add deploy key, give a title and paste `workingdir/id_github.pub`. Select **Allow write access** only if the build must push. Then delete the key from disk:

```bash
rm id_github*
```

### 3. Grant Secret Manager access

Give the service account used for the build the `Secret Manager Secret Accessor` role (console: Cloud Build **Permissions** page, set the role to **Enable**).

### 4. Add GitHub's host key to known hosts

In `workingdir` (next to `cloudbuild.yaml`) create `known_hosts.github`. It must be part of the source you submit (commit it when using a trigger).

```bash
ssh-keyscan -t rsa github.com > known_hosts.github
```

### 5. Configure the build

The first step writes the key from Secret Manager to `id_rsa` in a volume named `ssh` and copies `known_hosts.github`; the second step clones with the key.

```yaml
# Access the id_github file from Secret Manager, and setup SSH
steps:
- name: 'gcr.io/cloud-builders/git'
  secretEnv: ['SSH_KEY']
  entrypoint: 'bash'
  args:
  - -c
  - |
    echo "$$SSH_KEY" >> /root/.ssh/id_rsa
    chmod 400 /root/.ssh/id_rsa
    cp known_hosts.github /root/.ssh/known_hosts
  volumes:
  - name: 'ssh'
    path: /root/.ssh

# Clone the repository
- name: 'gcr.io/cloud-builders/git'
  args:
  - clone
  - --recurse-submodules
  - git@github.com:GIT_USERNAME/GIT_REPOSITORY
  volumes:
  - name: 'ssh'
    path: /root/.ssh

availableSecrets:
  secretManager:
  - versionName: projects/PROJECT_ID/secrets/SECRET_NAME/versions/latest
    env: 'SSH_KEY'
```

### 6. Submit the build

```bash
gcloud builds submit --config=cloudbuild.yaml .
```

## Options / Props

### Placeholders in `cloudbuild.yaml`

| Name | Description |
|---|---|
| `GIT_USERNAME` | GitHub username of the repository owner. |
| `GIT_REPOSITORY` | Name of the GitHub repository to access. |
| `PROJECT_ID` | ID of the Google Cloud project where the secrets are stored. |
| `SECRET_NAME` | Name of the secret created in Secret Manager. |

## Notes

- The private key is a long-lived credential that authenticates to your repository: keep it only in Secret Manager, reference it through `availableSecrets.secretManager` and `secretEnv` with `$$SSH_KEY` (the `$$` escape is required), delete the local copy (`rm id_github*`), and never commit it. Grant the Secret Accessor role only on the secret if you can; the source describes the console permission toggle.
- Security: verify the host key fingerprints in `known_hosts.github` against GitHub's published SSH host key fingerprints (https://help.github.com/articles/github-s-ssh-key-fingerprints/) as the source advises. Select write access on the deploy key only if the build must push.
- Clean up (source): delete the project (everything in it is deleted and custom project IDs are lost; try the tutorial in a disposable project) or delete just the deploy key (repository Settings > Deploy keys > Delete).
- The source's sample build output (three steps, for a two-step config) is omitted. The source also shows Console steps for the secret upload and the role grant; no gcloud form is given.
- `gcr.io/cloud-builders/git` is hosted on Artifact Registry and is not affected by the Container Registry shutdown.
- Source: https://docs.cloud.google.com/build/docs/access-github-from-build (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-repo-github.md](./connect-repo-github.md)
- [build-repos-from-github.md](./build-repos-from-github.md)
