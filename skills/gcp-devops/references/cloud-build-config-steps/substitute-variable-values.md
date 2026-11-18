---
source: https://docs.cloud.google.com/build/docs/configuring-builds/substitute-variable-values
---

# Substitute variable values

Use `substitutions` in a build config to resolve variables at build time, or to re-use a build request with different values. Cloud Build provides built-in substitutions and lets you define your own (names starting with `_`). Substitutions resolve in a build's `steps` and `images`.

## Signature / Usage

### Built-in substitutions in a config

```yaml
steps:
# Uses the ubuntu build step:
# to run a shell script; and
# set env variables for its execution
- name: 'ubuntu'
  args: ['bash', './myscript.sh']
  env:
  - 'BUILD=$BUILD_ID'
  - 'PROJECT_ID=$PROJECT_ID'
  - 'PROJECT_NUMBER=$PROJECT_NUMBER'
  - 'REV=$REVISION_ID'

# Uses the docker build step to build an image called my-image
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/my-image', '.']

# my-image is pushed to Artifact Registry
images:
- '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/my-image'
```

### Provide trigger-style values on a manual build

```bash
gcloud builds submit --config=cloudbuild.yaml \
    --substitutions=TAG_NAME="test"
```

### User-defined substitutions with defaults

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build',
          '--build-arg',
          'node_version=${_NODE_VERSION_1}',
          '-t',
          '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/build-substitutions-nodejs-${_NODE_VERSION_1}',
          '.']
- name: 'gcr.io/cloud-builders/docker'
  args: ['build',
          '--build-arg',
          'node_version=${_NODE_VERSION_2}',
          '-t',
          '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/build-substitutions-nodejs-${_NODE_VERSION_2}',
          '.']
substitutions:
    _NODE_VERSION_1: v6.9.1 # default value
    _NODE_VERSION_2: v6.9.2 # default value
images: [
    '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/build-substitutions-nodejs-${_NODE_VERSION_1}',
    '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/build-substitutions-nodejs-${_NODE_VERSION_2}'
]
```

Override the defaults on the command line (not possible for `$PROJECT_ID` and `$BUILD_ID`):

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_NODE_VERSION_1="v6.9.4",_NODE_VERSION_2="v6.9.5" .
```

### Skip the missing-substitution check (`ALLOW_LOOSE`)

```yaml
steps:
- name: 'ubuntu'
  args: ['echo', 'hello world']
substitutions:
    _SUB_VALUE: unused
options:
    substitutionOption: 'ALLOW_LOOSE'
```

### Dynamic substitutions

Set `dynamicSubstitutions: true` so a user-defined substitution can reference another variable (bash parameter expansions are interpreted).

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', '${_IMAGE_NAME}', '.']
substitutions:
    _IMAGE_NAME: '${_LOCATION}-docker.pkg.dev/${PROJECT_ID}/${_REPOSITORY}/test-image'
options:
    dynamicSubstitutions: true
```

### Secret substitutions

Put a substitution variable in the `versionName` of `availableSecrets.secretManager`. The secret value is read through `secretEnv` and referenced as `$$VAR` in a `bash -c` script.

Adapted (not in the official docs): the source passes the password as `--password=$$PASSWORD`, which places the secret on the `docker login` command line; the example pipes it with `--password-stdin` instead. `$$USERNAME` is quoted.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  entrypoint: 'bash'
  args: ['-c', 'echo "$$PASSWORD" | docker login --username="$$USERNAME" --password-stdin']
  secretEnv: ['USERNAME', 'PASSWORD']

availableSecrets:
  secretManager:
  - versionName: projects/$PROJECT_ID/secrets/my-docker-password/versions/$_SECRET_VERSION
    env: 'PASSWORD'
  - versionName: projects/$PROJECT_ID/secrets/my-docker-username/versions/latest
    env: 'USERNAME'

substitutions:
    _SECRET_VERSION: '1' #Default value for the secret version
```

### Map substitutions to environment variables

Scripts (`script:`) do not support substitutions directly but do support environment variables. Set `automapSubstitutions: true` at the build level to map all substitutions to environment variables for every step:

```yaml
steps:
- name: 'ubuntu'
  script: |
    #!/usr/bin/env bash
    echo "Hello $_USER"
- name: 'ubuntu'
  script: |
    #!/usr/bin/env bash
    echo "Your project ID is $PROJECT_ID"
options:
  automapSubstitutions: true
substitutions:
  _USER: "Google Cloud"
```

Set it on a single step instead (only the second step below prints the project ID):

```yaml
steps:
- name: 'ubuntu'
  script: |
    #!/usr/bin/env bash
    echo "Hello $_USER"
- name: 'ubuntu'
  script: |
    #!/usr/bin/env bash
    echo "Your project ID is $PROJECT_ID"
  automapSubstitutions: true
substitutions:
  _USER: "Google Cloud"
```

Manual mapping with the step-scoped `env` field:

```yaml
steps:
- name: 'ubuntu'
  env:
  - 'BAR=$PROJECT_ID'
  script: 'echo $BAR'
```

## Options / Props

### Default substitutions for all builds

| Name | Description |
|------|-------------|
| `$PROJECT_ID` | ID of your Cloud project |
| `$BUILD_ID` | ID of your build |
| `$PROJECT_NUMBER` | your project number |
| `$LOCATION` | the region associated with your build |

### Default substitutions for builds invoked by triggers

| Name | Description |
|------|-------------|
| `$TRIGGER_NAME` | name associated with your trigger |
| `$COMMIT_SHA` | commit ID associated with your build |
| `$REVISION_ID` | commit ID associated with your build (same as `$COMMIT_SHA`; both are supported) |
| `$SHORT_SHA` | first seven characters of `COMMIT_SHA` |
| `$REPO_NAME` | name of your repository |
| `$REPO_FULL_NAME` | full name of your repository, including the user or organization |
| `$BRANCH_NAME` | name of your branch |
| `$TAG_NAME` | name of your tag |
| `$REF_NAME` | name of your branch or tag |
| `$TRIGGER_BUILD_CONFIG_PATH` | path to the build config file used; an empty string if the build is configured inline on the trigger or uses a `Dockerfile` or `Buildpack` |
| `$SERVICE_ACCOUNT_EMAIL` | email of the service account used for the build (default or user-specified) |
| `$SERVICE_ACCOUNT` | resource name, `projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_EMAIL` |

### Default substitutions for pull request triggers

| Name | Description |
|------|-------------|
| `$_HEAD_BRANCH` | head branch of the pull request |
| `$_BASE_BRANCH` | base branch of the pull request |
| `$_HEAD_REPO_URL` | URL of the head repository of the pull request |
| `$_PR_NUMBER` | number of the pull request |

### Rules and limits for user-defined substitutions

| Rule | Value |
|------|-------|
| Name pattern | Must begin with `_`; uppercase letters and numbers only (`_[A-Z0-9_]+`) |
| Maximum parameters | 200 |
| Parameter key length | 100 bytes |
| Parameter value length | 4000 bytes |
| `$$` | Literal `$`: `$$FOO` is the literal `$FOO`; `$$_FOO` is the literal `$_FOO`; `$$$_FOO` is `$` followed by the value of `_FOO` |
| Syntax | `$_FOO` and `${_FOO}` are equivalent; `${}` allows `${_FOO}BAR` |

### Build options

| Option | Description |
|--------|-------------|
| `substitutionOption: ALLOW_LOOSE` | Skip the error for a missing substitution variable or unused substitution. Set by default, and not overridable, for builds invoked by triggers. |
| `dynamicSubstitutions` | `true` lets a substitution reference another variable. Always `true` for trigger-invoked builds; must be set for manual builds. |
| `automapSubstitutions` | Maps all substitutions to environment variables. Build-level (`options`) or step-level; the step value overrides the build value. |

## Notes

- Source: https://docs.cloud.google.com/build/docs/configuring-builds/substitute-variable-values (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- If a default substitution is not available (sourceless builds, or builds that use a storage source), occurrences of the variable are replaced with an empty string. `$REPO_NAME`, `$REPO_FULL_NAME`, `$BRANCH_NAME`, `$TAG_NAME`, `$COMMIT_SHA` and `$SHORT_SHA` always default to an empty string even without `ALLOW_LOOSE`.
- With `gcloud builds submit`, the source says you can manually provide `$TRIGGER_NAME`, `$COMMIT_SHA`, `$REVISION_ID`, `$SHORT_SHA`, `$REPO_NAME`, `$REPO_FULL_NAME`, `$BRANCH_NAME`, `$TAG_NAME`, `$REF_NAME`, `$TRIGGER_BUILD_CONFIG_PATH`, `$SERVICE_ACCOUNT_EMAIL` and `$SERVICE_ACCOUNT`. The gcloud 593.0.0 `builds submit` help lists only REPO_NAME, BRANCH_NAME, TAG_NAME, REVISION_ID, COMMIT_SHA and SHORT_SHA for `--substitutions`; the page text and the help differ, so verify against the installed gcloud.
- The first and the dynamic-substitution examples use `${_LOCATION}` and `${_REPOSITORY}` without defining them; pass them with `--substitutions=_LOCATION=...,_REPOSITORY=...` (or add them under `substitutions`), otherwise the build fails the missing-substitution check described next.
- Without `ALLOW_LOOSE`, a variable such as `$_FOO` with no `_FOO` in the substitutions mapping, and unmatched keys in the mapping, cause an error.
- Corrected from the official docs: the secret-substitution example used `docker login --username=$$USERNAME --password=$$PASSWORD`; the password is now sent through `--password-stdin` so it is not part of the command line. Keep `$$` for variables expanded by bash inside the step, never a single `$`.
- Default substitutions such as `$PROJECT_ID` cannot be overridden on the command line (`$PROJECT_ID`, `$BUILD_ID`).
- Payload bindings and bash parameter expansions in substitutions are on a separate page (`https://docs.cloud.google.com/build/docs/configuring-builds/use-bash-and-bindings-in-substitutions`).
- The source also shows a build-level opt-out example (`automapSubstitutions: false` on one step while enabled in `options`) and JSON forms of each example; they are omitted (the source's JSON for the user-defined example has a trailing comma and its automap JSON is malformed).

## Related

- [use-secrets.md](./use-secrets.md)
- [create-basic-configuration.md](./create-basic-configuration.md)
- [submit-build-via-cli-api.md](./submit-build-via-cli-api.md)
- [store-artifacts-in-artifact-registry.md](./store-artifacts-in-artifact-registry.md)
