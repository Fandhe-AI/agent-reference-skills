---
source: https://docs.cloud.google.com/binary-authorization/docs/policy-yaml-reference
---

# Policy YAML reference

Reference for Binary Authorization policies in YAML format. When you configure a policy with the command-line interface, you edit a YAML file that complies with this specification.

## Signature / Usage

### File format

```text
name: projects/<PROJECT_ID>/policy
admissionWhitelistPatterns:
- namePattern: <MATCHING_PATTERN>
- ...
globalPolicyEvaluationMode: <GLOBAL_EVAL_MODE>
defaultAdmissionRule:
  <ADMISSION_RULE>
clusterAdmissionRules:
  <CLUSTER_SPECIFIER>:
    <ADMISSION_RULE>
  ...
```

### `admissionWhitelistPatterns` (exempt images)

```text
admissionWhitelistPatterns:
  - namePattern: gcr.io/google-containers/*
  - namePattern: k8s.gcr.io/**
  - namePattern: gke.gcr.io/**
  - namePattern: gcr.io/gke-release/asm/*
  - namePattern: gcr.io/stackdriver-agents/*
  - namePattern: gcr.io/example-project/helloworld
  - namePattern: loc-ref
```

Allowlist currently-tagged versions:

```text
admissionWhitelistPatterns:
  ...
  - namePattern: gcr.io/example-project/helloworld:latest
  - namePattern: gcr.io/example-project/helloworld:my-tag
  - namePattern: gcr.io/example-project/helloworld:v1.*
```

Allowlist a specific version by digest:

```text
admissionWhitelistPatterns:
  ...
  - namePattern: gcr.io/example-project/helloworld@sha256:77b0b75136b9bd0fd36fb50f4c92ae0dbdbbe164ab67885e736fa4374e0cbb8c
```

Other allowlist forms in the source: all images under a path (`gcr.io/example-project/*`), a specific image (`gcr.io/example-project/helloworld`), and subdirectories (`gcr.io/example-project/**`).

### `globalPolicyEvaluationMode`

```text
globalPolicyEvaluationMode: ENABLE
```

```text
globalPolicyEvaluationMode: DISABLE
```

### `defaultAdmissionRule`

```text
defaultAdmissionRule:
  evaluationMode: REQUIRE_ATTESTATION
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
  requireAttestationsBy:
  - projects/example-project/attestors/secure-build
```

### `clusterAdmissionRules`

```text
clusterAdmissionRules:
  us-east1-a.prod-cluster:
    evaluationMode: REQUIRE_ATTESTATION
    enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
    requireAttestationsBy:
    - projects/example-project/attestors/secure-build
    - projects/example-project/attestors/prod-qualified
```

### `ADMISSION_RULE` collection

```text
evaluationMode: EVAL_MODE
enforcementMode: ENFORCEMENT_MODE
requireAttestationsBy:
- ATTESTOR
- ...
```

## Options / Props

### Top-level nodes

| Node | Description | Required |
|---|---|---|
| `name` | Name of the policy, `projects/PROJECT_ID/policy`. | Yes |
| `admissionWhitelistPatterns` | Container images that are always allowed to be deployed. | No |
| `globalPolicyEvaluationMode` | Whether to apply a system policy that exempts Google-owned system images. | No |
| `defaultAdmissionRule` | The rule to use when no specific rule applies. | Yes |
| `clusterAdmissionRules` | Rules that apply to specific clusters. | No |

### `evaluationMode`

| Value | Description |
|---|---|
| `ALWAYS_ALLOW` | Always allow deployment of images evaluated by this rule. |
| `ALWAYS_DENY` | Always deny deployment of images evaluated by this rule. |
| `REQUIRE_ATTESTATION` | Require one or more attestors to authorize the release before deployment; `requireAttestationsBy` is then required. |

### `enforcementMode`

| Value | Description |
|---|---|
| `ENFORCED_BLOCK_AND_AUDIT_LOG` | Blocks deployment and writes to the audit log. Used by most production rules. |
| `DRYRUN_AUDIT_LOG_ONLY` | Allows deployment of non-conformant images and writes violation details to the audit log. Primarily for testing a policy before it goes into effect. |

### Other fields

| Field | Description |
|---|---|
| `globalPolicyEvaluationMode` values | `ENABLE` (default; recommended) or `DISABLE`. |
| `requireAttestationsBy` | List of `projects/PROJECT_ID/attestors/ATTESTOR_NAME`; required for `REQUIRE_ATTESTATION` rules only. |
| `CLUSTER_SPECIFIER` | Cluster resource ID `location.name`, for example `us-east1-a.prod-cluster`. |

### Wildcards in `namePattern`

| Wildcard | Behavior |
|---|---|
| `*` | Matches images in the specified directory only: `gcr.io/my-project/nginx*` matches `gcr.io/my-project/nginx:latest` but not `gcr.io/my-project/nginx-images/nginx`. |
| `**` | Matches images in subdirectories: `gcr.io/my-project/nginx**` matches `gcr.io/my-project/nginx-1.14.2/image:latest`. |

## Notes

- Wildcards in `namePattern`: Wildcards are valid only at the end of the pattern: `gcr.io/my-project/nginx*` is valid, `gcr.io/my-project/n*x` is not. The same rules apply to local references to images.
- The source note on terminology: `whitelist` is a keyword in the software and is kept as written.
- Caution from the source: be careful with `**` next to project IDs, because it also matches images in other projects. For example `gcr.io/my-project**` allows both `gcr.io/my-project/nginx` and `gcr.io/my-project-exploit/nginx-exploit`.
- Not recommended: using `admissionWhitelistPatterns` to allowlist Google-managed system images. They are allowed when `globalPolicyEvaluationMode` is `ENABLE` (the default), and the system allowlist is updated with every GKE release.
- If you disable `globalPolicyEvaluationMode`, `gcr.io/google-containers/*`, `k8s.gcr.io/**`, `gke.gcr.io/*`, `gcr.io/gke-release/someproject/*` and `gcr.io/stackdriver-agents/*` must be in the allowlist because they hold resources GKE needs to start a cluster. Additional image paths might be required in the future.
- If a cluster-specific rule is applied to a deployment, the default rule is not considered.
- The `ALWAYS_ALLOW` evaluation mode allows every image evaluated by the rule; it is for the stated purpose only (for example a permissive default or testing).
- The source examples use `gcr.io` paths; for Artifact Registry use `LOCATION-docker.pkg.dev/...` paths.
- Source: https://docs.cloud.google.com/binary-authorization/docs/policy-yaml-reference (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-concepts.md](./key-concepts.md)
- [configuring-policy-cli.md](./configuring-policy-cli.md)
- [attestations.md](./attestations.md)
