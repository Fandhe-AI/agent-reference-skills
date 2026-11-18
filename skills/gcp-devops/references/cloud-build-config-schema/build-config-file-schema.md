---
source: https://docs.cloud.google.com/build/docs/build-config-file-schema
---

# Cloud Build config file schema

A build config file (`cloudbuild.yaml` or JSON) tells Cloud Build which tasks to perform. It is modeled on the Cloud Build API `Build` resource and can be written in YAML or JSON (use JSON when submitting requests with tools such as curl). This page lists every top-level field, build step field, `options` field and `artifacts` type, with the limits the source states.

## Signature / Usage

### Overall structure

```text
steps:
- name: string
  args: [string, string, ...]
  env: [string, string, ...]
  allowFailure: boolean
  allowExitCodes: [string (int64 format), string (int64 format), ...]
  dir: string
  id: string
  waitFor: [string, string, ...]
  entrypoint: string
  secretEnv: string
  volumes: object(Volume)
  timeout: string (Duration format)
  script: string
  automapSubstitutions: boolean
  results: object(Results)
- name: string
  ...
- name: string
  ...
timeout: string (Duration format)
queueTtl: string (Duration format)
logsBucket: string
options:
 env: [string, string, ...]
 secretEnv: string
 volumes: object(Volume)
 sourceProvenanceHash: enum(HashType)
 machineType: enum(MachineType)
 diskSizeGb: string (int64 format)
 substitutionOption: enum(SubstitutionOption)
 dynamicSubstitutions: boolean
 automapSubstitutions: boolean
 logStreamingOption: enum(LogStreamingOption)
 logging: enum(LoggingMode)
 defaultLogsBucketBehavior: enum(DefaultLogsBucketBehavior)
 pool: object(PoolOption)
 pubsubTopic: string
 requestedVerifyOption: enum(RequestedVerifyOption)
 workerRelease: string
substitutions: map (key: string, value: string)
tags: [string, string, ...]
serviceAccount: string
secrets: object(Secret)
availableSecrets: object(Secrets)
artifacts: object(Artifacts)
  goModules: [object(GoModules), ...]
  mavenArtifacts: [object(MavenArtifact), ...]
  pythonPackages: [object(PythonPackage), ...]
  npmPackages: [object(npmPackage), ...]
images:
- [string, string, ...]
```

### Build steps

```yaml
steps:
- name: 'gcr.io/cloud-builders/kubectl'
  args: ['set', 'image', 'deployment/mydepl', 'my-image=gcr.io/my-project/myimage']
  env:
  - 'CLOUDSDK_COMPUTE_ZONE=us-east4-b'
  - 'CLOUDSDK_CONTAINER_CLUSTER=my-cluster'
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'gcr.io/my-project-id/myimage', '.']
```

### Build-level timeout, queue time and logs

```yaml
steps:
- name: 'ubuntu'
  args: ['sleep', '5']
timeout: 20s
queueTtl: 10s
```

```yaml
steps:
- name: 'gcr.io/cloud-builders/go'
  args: ['install', '.']
logsBucket: 'gs://mybucket'
```

### Secrets (`availableSecrets`)

Secret Manager: reference the secret with `env`, list it in the step's `secretEnv`, and read it as `$$VAR` inside a `bash -c` script.

Adapted (not in the official docs): the password is piped to `docker login --password-stdin` instead of being passed as `--password=$$PASSWORD` on the command line, where it can appear in process listings and logs. `$$USERNAME` is quoted.

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

### Artifacts

Cloud Storage objects:

```yaml
steps:
- name: 'gcr.io/cloud-builders/go'
  args: ['build', 'my-package']
artifacts:
  objects:
    location: 'gs://mybucket/'
    paths: ['my-package']
```

Maven (folder upload, then single packaged file; add `-DaltDeploymentRepository=local::default::file:./workspace/target` to the Maven deploy command for the folder form):

```yaml
artifacts:
  mavenArtifacts:
    - repository: 'https://us-central1-maven.pkg.dev/my-project-id/my-java-repo'
      deployFolder: '/workspace/target'
      artifactId: 'my-app-1'
      groupId: 'com.mycompany.app'
      version: '1.0.0'
```

## Options / Props

### Top-level fields

| Field | Type | Description |
|-------|------|-------------|
| `steps` | list of build steps | Actions to perform. Up to 300 steps. Run serially on the same machine by default; use `waitFor` for concurrency. |
| `timeout` | Duration string | Build time limit. Default 60 minutes, maximum 24 hours. Seconds with up to nine fractional digits, ending in `s` (for example `3.5s`). On expiry the build status is `TIMEOUT`. |
| `queueTtl` | Duration string | Maximum queue time, counted from `createTime`. Default `3600s` (1 hour). On expiry the status is `EXPIRED`. |
| `logsBucket` | string | Cloud Storage bucket for logs (`gs://mybucket`). If unset, `defaultLogsBucketBehavior` applies. |
| `options` | object | Optional build settings, see below. |
| `substitutions` | map (string to string) | Variables resolved at build time. A missing variable or missing substitution is an error unless `ALLOW_LOOSE` is set. |
| `tags` | list of strings | Groups and filters builds. Different from the `--tag` flag of `gcloud builds submit`, which builds with a Dockerfile. |
| `serviceAccount` | string | IAM service account used at build time. The legacy Cloud Build service account cannot be specified here. |
| `secrets` | object(Secret) | Pairs encrypted env values with a Cloud KMS key. The source says to use `availableSecrets` instead. |
| `availableSecrets` | object(Secrets) | Secret Manager (`secretManager`) or Cloud KMS (`inline`) secrets available to steps. |
| `artifacts` | object(Artifacts) | Artifacts stored after all steps succeed. |
| `images` | list of strings | Linux Docker images pushed to Artifact Registry. A listed image that is not produced fails the build; built but unlisted images are discarded. |

### Build step fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Builder image that runs the step (a cloud builder, public image or custom image). |
| `args` | list of strings | Passed to the builder's entrypoint; if the builder has none, the first element is the entrypoint. Up to 100 arguments per step, each up to 10,000 characters. |
| `env` | list of `KEY=VALUE` | Environment variables for the step. |
| `allowFailure` | boolean | If true, a failing step does not fail the build (status still `Successful` even if every step fails). `allowExitCodes` takes precedence. |
| `allowExitCodes` | list of int64 strings | Exit codes that do not fail the build; any other code fails it. Maximum value 255. Takes precedence over `allowFailure`. |
| `dir` | string | Working directory, `/workspace/<dir>` for relative paths. An absolute path outside the workspace is not persisted across steps unless a volume covers it. |
| `id` | string | Unique step identifier, used by `waitFor`. |
| `waitFor` | list of step ids | Steps that must finish first. If omitted, the step waits for all prior steps to complete successfully. |
| `entrypoint` | string | Overrides the builder's default entrypoint. |
| `secretEnv` | list | Env variable names (from `availableSecrets` or encrypted `secrets`) exposed to this step. |
| `volumes` | list of Volume (`name`, `path`) | Docker volumes mounted into the step to persist files across steps. |
| `timeout` | Duration string | Step time limit; must not exceed the build `timeout`. If unset the step runs until completion or build timeout. |
| `script` | string | Shell script to run. Cannot be combined with `args` or `entrypoint` in the same step. |
| `automapSubstitutions` | boolean | true maps all substitutions to environment variables for the step; false ignores substitutions for that step. |
| `results` | list of Result | Key-value data attached as an attestation. Fields: `name` (required, reference name), `attestationContent` (optional), `attestationType` (optional). The last two matter only if attestations are validated. |

### `options` fields

| Field | Type | Description |
|-------|------|-------------|
| `enableStructuredLogging` | boolean | Maps build log fields to `LogEntry` fields in Cloud Logging (`message` goes to `textPayload` or `jsonPayload.message`; unmapped fields to `jsonPayload`). |
| `env` | list of `KEY=VALUE` | Global variables for all steps. A step-level definition wins. |
| `secretEnv` | list | Global Cloud KMS-encrypted variables for all steps; must be defined in the build's `Secret`. |
| `volumes` | list of Volume | Volumes mounted for all steps, created empty and discarded after the build. Names and paths must not conflict with step volumes. A global volume in a one-step build is invalid. |
| `pubsubTopic` | string | Topic for build status notifications. Default topic name `cloud-builds`. |
| `sourceProvenanceHash` | list of enum | Hash algorithm for source provenance (example value `SHA256`). |
| `machineType` | enum | Default `e2-standard-2` (2 CPUs). Four high-CPU types (two with 8 CPUs, two with 32 CPUs) plus 1 CPU and 2 CPU types. High-CPU types can lengthen startup. Available types per region can change. Example: `E2_HIGHCPU_8`. |
| `diskSizeGb` | int64 string | Custom disk size. Maximum 4000 GB. |
| `logStreamingOption` | enum | `STREAM_ON` streams logs to Cloud Storage during the build; by default logs are collected on completion. |
| `logging` | enum | `GCS_ONLY` (Cloud Storage), `CLOUD_LOGGING_ONLY` (Logging), `LEGACY` (both; used if undefined), `NONE` (not stored). |
| `defaultLogsBucketBehavior` | enum | `REGIONAL_USER_OWNED_BUCKET` or `LEGACY_BUCKET`. Applies when logs go to Cloud Storage and `logsBucket` is unset. |
| `dynamicSubstitutions` | boolean | Enables bash parameter expansion in substitutions. Always true for trigger-invoked builds; must be set to true for manual builds. |
| `automapSubstitutions` | boolean | Maps all substitutions to environment variables for the whole build. |
| `substitutionOption` | enum | Behavior on substitution check errors (`ALLOW_LOOSE` skips the check). Always `ALLOW_LOOSE` for trigger-invoked builds and cannot be overridden. |
| `pool` | object(PoolOption) | Resource name of the private pool that runs the build. |
| `requestedVerifyOption` | enum | `VERIFIED` enables and verifies attestation and provenance generation; the build is `SUCCESS` only if they are generated. |
| `workerRelease` | string | Release channel (for example `regular`) or a specific version. |

### `logsBucket` and `defaultLogsBucketBehavior` (when `logging` is `GCS_ONLY`, `LEGACY` or undefined)

| `logsBucket` | `defaultLogsBucketBehavior` | Where build logs are stored |
|---|---|---|
| Bucket specified | Value ignored | In the bucket specified in `logsBucket` |
| No value | `REGIONAL_USER_OWNED_BUCKET` | In a Cloud Build-created and user-owned bucket |
| No value | `LEGACY_BUCKET` | In a Cloud Build-created and Google Cloud-owned bucket |
| No value | No value | In a Cloud Build-created and user-owned bucket. If creating this bucket fails, then build logs are stored in a Cloud Build-created and Google Cloud-owned bucket. |

### `availableSecrets` fields

| Field | Description |
|-------|-------------|
| `secretManager[].versionName` | Path to the secret version in Secret Manager. |
| `secretManager[].env` | Local environment variable name steps use to reference the secret. |
| `inline[].kmsKeyName` | Path to the Cloud KMS key. |
| `inline[].envMap` | Map of local variable name to the encrypted value. |

### `artifacts` types

| Type | Fields | Description |
|------|--------|-------------|
| `objects` | `location`, `paths` | Files stored in Cloud Storage. |
| `goModules` | `repositoryName`, `repositoryLocation`, `repositoryProjectId`, `sourcePath`, `modulePath`, `moduleVersion` | Go modules to an Artifact Registry Go repository. The module directory must contain `go.mod`; an absolute path is recommended, `.` is allowed, the field cannot be empty. |
| `mavenArtifacts` | `repository`, `deployFolder` or `path`, `artifactId`, `groupId`, `version` | Java artifacts to an Artifact Registry Maven repository. |
| `pythonPackages` | `repository`, `paths` | Python packages to Artifact Registry. |
| `npmPackages` | `repository`, `packagePath` | npm packages; both required. The directory must contain `package.json`; absolute path recommended, `.` allowed, cannot be omitted or empty. |
| `oci` | `file`, `registryPath`, `tags` | OCI images to Artifact Registry; `file` and `registryPath` required. Also supports multi-architecture images. |
| `genericArtifacts` | `folder`, `registryPath` | Files uploaded as a package version in an Artifact Registry generic repository. A generic artifact can also be a build dependency downloaded before the build starts. |

## Notes

- Only YAML forms are kept; the source also gives a JSON equivalent for every example. Several of its JSON samples contain syntax errors (missing commas, an unterminated `"allowExitCodes` key, single-quoted `'200'`), so write JSON from the field table rather than copying them. Examples for `entrypoint`, `allowExitCodes`, volumes, step `timeout`, `results`, `options`, substitutions, `tags`, Cloud KMS `inline` secrets, `images`, Go modules, Python / npm packages, OCI / generic artifacts and the `cloudbuild` network are omitted; the field tables list them. The source's own `results` and substitutions examples use snake_case keys (`requested_verify_option`, `substitution_option`) while the schema lists `requestedVerifyOption` and `substitutionOption`; prefer the camelCase schema names.
- Corrected from the official docs: `docker login --username=$$USERNAME --password=$$PASSWORD` became `echo "$$PASSWORD" | docker login --username="$$USERNAME" --password-stdin` (secret kept out of the command line).
- Inside a `bash -c` script use `$$VAR` so Cloud Build does not treat `$VAR` as a substitution; keep `$$` exactly. Never put tokens or passwords in `env`, `substitutions` or URLs; use `availableSecrets.secretManager` plus `secretEnv`. The Cloud KMS `inline` form is not recommended by the source.
- `serviceAccount` is a user-specified service account; see the source's "Configuring user-specified service accounts" page for the roles it needs.
- `entrypoint`-less builders use the first `args` element as the entrypoint. Examples keep the source's `gcr.io/...` image names (`gcr.io/cloud-builders/*` are Cloud Build's builder images); the source says listed `images` are pushed to Artifact Registry, and other examples use `LOCATION-docker.pkg.dev/PROJECT/REPO/IMAGE` names. Container Registry was shut down on March 18, 2025: `gcr.io/PROJECT/IMAGE` names such as `gcr.io/my-project/myimage` only work for `gcr.io` repositories hosted on Artifact Registry, so use an Artifact Registry path for new images.
- `tags` (build labels) are not the `--tag` flag of `gcloud builds submit`.
- Builds run each step on the local Docker network `cloudbuild`, which hosts Application Default Credentials; pass `--network=cloudbuild` to nested `docker build` steps to expose ADC.
- Docker builds can use a `Dockerfile` without a build config when using the gcloud CLI or build triggers; Dockerfile syntax itself is covered by the `docker` skill.
- Source: https://docs.cloud.google.com/build/docs/build-config-file-schema (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [cloud-builders.md](./cloud-builders.md)
