---
source: https://docs.cloud.google.com/build/docs/securing-builds/use-secrets
---

# Use secrets from Secret Manager

Store passwords and API keys in Secret Manager and configure a build to read them through `availableSecrets.secretManager`. Each step that needs a secret lists it in `secretEnv` and references it with a `$$`-prefixed environment variable inside `bash -c`.

## Signature / Usage

### Grant access to the build service account

Grant the Secret Manager Secret Accessor role (`roles/secretmanager.secretAccessor`) on the secret to the service account you use for the build. Enable the Cloud Build and Secret Manager APIs first (`serviceusage.services.enable`, available through Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). The source shows this grant in the Console on the secret's Permissions panel.

### UTF-8 secrets

Adapted (not in the official docs): the source passes the password as `--password=$$PASSWORD`, which places the secret on the `docker login` command line; the example pipes it with `--password-stdin` instead. `$$USERNAME` is quoted.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  entrypoint: 'bash'
  args: ['-c', 'echo "$$PASSWORD" | docker login --username="$$USERNAME" --password-stdin']
  secretEnv: ['USERNAME', 'PASSWORD']
availableSecrets:
  secretManager:
  - versionName: projects/PROJECT_ID/secrets/DOCKER_PASSWORD_SECRET_NAME/versions/DOCKER_PASSWORD_SECRET_VERSION
    env: 'PASSWORD'
  - versionName: projects/PROJECT_ID/secrets/DOCKER_USERNAME_SECRET_NAME/versions/DOCKER_USERNAME_SECRET_VERSION
    env: 'USERNAME'
```

### Example: accessing a secret from a script

The step declares `secretEnv`; the Python process reads the environment variable.

```yaml
steps:
- name: python:slim
  entrypoint: python
  args: ['main.py']
  secretEnv: ['MYSECRET']
availableSecrets:
  secretManager:
  - versionName: projects/$PROJECT_ID/secrets/mySecret/versions/latest
    env: 'MYSECRET'
```

Adapted (not in the official docs): the source's `main.py` prints the first five characters of the secret, which writes part of the secret into the build log; the example only reports whether it is set.

```python
import os
print("MYSECRET is set" if os.environ.get("MYSECRET") else "Not Found")
```

### Example: create a GitHub pull request

Store a GitHub token in Secret Manager and use it from a step (the source pairs it with a GitHub app trigger). Replace the upper-case placeholders.

```yaml
steps:
- name: 'launcher.gcr.io/google/ubuntu1604'
  id: Create GitHub pull request
  entrypoint: bash
  args:
  - -c
  - curl -X POST -H "Authorization:Bearer $$GH_TOKEN" -H 'Accept:application/vnd.github.v3+json' https://api.github.com/repos/GITHUB_USERNAME/REPO_NAME/pulls -d '{"head":"HEAD_BRANCH","base":"BASE_BRANCH", "title":"NEW_PR"}'
  secretEnv: ['GH_TOKEN']
availableSecrets:
  secretManager:
  - versionName: projects/PROJECT_ID/secrets/GH_TOKEN_SECRET_NAME/versions/latest
    env: GH_TOKEN
```

### Non-UTF-8 secrets

Read the secret version into a file in `/workspace`, then use the file in a later step.

```yaml
steps:
- name: gcr.io/cloud-builders/gcloud
  entrypoint: 'bash'
  args: [ '-c', "gcloud secrets versions access latest --secret=secret-name --format='get(payload.data)' | tr '_-' '/+' | base64 -d > decrypted-data.txt" ]
- name: gcr.io/cloud-builders/docker
  entrypoint: 'bash'
  args: [ '-c', 'docker login --username=my-user --password-stdin < decrypted-data.txt']
```

## Options / Props

| Field | Description |
|-------|-------------|
| `availableSecrets.secretManager[].versionName` | Path to the secret version in Secret Manager, `projects/PROJECT_ID/secrets/SECRET/versions/VERSION`. May contain substitution variables. |
| `availableSecrets.secretManager[].env` | Local environment variable name that build steps use to reference the secret. |
| `secretEnv` (step) | Which of those environment variables the step can use. |
| `entrypoint: bash` (step) | Required to refer to the environment variable for the secret. |
| `args` (step) | Start with `-c`; reference the secret as `$$VARIABLE`. |

### Placeholders

| Name | Description |
|------|-------------|
| `PROJECT_ID` | Project ID or number of the project where the secrets are stored. |
| `DOCKER_USERNAME_SECRET_NAME` / `DOCKER_USERNAME_SECRET_VERSION` | Secret name and version holding the Docker username. |
| `DOCKER_PASSWORD_SECRET_NAME` / `DOCKER_PASSWORD_SECRET_VERSION` | Secret name and version holding the Docker password. |
| `GITHUB_USERNAME`, `REPO_NAME` | Owner and name of the GitHub repository. |
| `HEAD_BRANCH` | Branch with the changes; for cross-repository pull requests in the same network use `username:branch`. |
| `BASE_BRANCH` | Existing branch to merge into; a pull request cannot request a merge into a base of another repository. |
| `GH_TOKEN_SECRET_NAME` | Secret name holding the GitHub token. |
| `NEW_PR` | The title of the new pull request. |

## Notes

- Source: https://docs.cloud.google.com/build/docs/securing-builds/use-secrets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- You can refer to secrets only in the `args` field of a build step. Variables must be written with `$$` so Cloud Build leaves them for bash; a single `$` would be treated as a substitution.
- Warning from the source: granting Secret Manager Secret Accessor to the legacy Cloud Build service account lets anyone who runs builds through a trigger that uses that account reach the secret, even without the Secret Accessor role; the access is logged in the project's build history. Prefer a user-specified service account with the role granted on the individual secret.
- Corrected from the official docs: `--password=$$PASSWORD` became `echo "$$PASSWORD" | docker login ... --password-stdin`, and `main.py` no longer prints the first five characters of the secret.
- The GitHub example passes the token to `curl` in a header on the step's command line; keep the token in Secret Manager only, never in `env`, substitutions, a trigger or a URL. A personal access token is a long-lived credential; scope it narrowly.
- The GitHub example keeps the source's builder image `launcher.gcr.io/google/ubuntu1604`; choose a currently supported builder image for your own builds.
- The non-UTF-8 flow writes the decoded secret to `decrypted-data.txt` in `/workspace`, which later steps can read; do not store it in build artifacts. To use the secret in an environment variable, prefix the variable name with an underscore and escape it with `$$`, for example `_VARIABLE_NAME=$(cat password.txt)`, then pass `$$_VARIABLE_NAME` to the command that needs it (for example on standard input). The source's example ends with `&& echo -n $$_VARIABLE_NAME`, which prints the whole secret to the build log; do not echo or print secrets.
- The source's JSON versions are omitted: the GitHub JSON example is not valid JSON.
- Secret Manager itself is covered by the `gcp-security` skill; Docker Hub authentication is described at `https://docs.cloud.google.com/build/docs/interacting-with-dockerhub-images`, and encrypted credentials at `https://docs.cloud.google.com/build/docs/securing-builds/use-encrypted-credentials`.

## Related

- [substitute-variable-values.md](./substitute-variable-values.md)
- [create-basic-configuration.md](./create-basic-configuration.md)
- [pass-data-between-steps.md](./pass-data-between-steps.md)
