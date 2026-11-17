---
source: https://docs.cloud.google.com/binary-authorization/docs/key-concepts
---

# Binary Authorization concepts

A Binary Authorization policy (also called the project-singleton policy) is a set of deployment rules plus a list of exempt images. Rules combine an evaluation mode and an enforcement mode. Attestations, signers, attestors, keys and Artifact Analysis notes implement the `REQUIRE_ATTESTATION` mode.

## Signature / Usage

### Exempt image allowlist

```yaml
admissionWhitelistPatterns:
  - namePattern: EXEMPT_IMAGE_PATH
```

Replace `EXEMPT_IMAGE_PATH` with the path to an image to exempt; add more `- namePattern` entries for additional images.

### View the Google-maintained system policy

```bash
gcloud alpha container binauthz policy export-system-policy
```

## Options / Props

### Supported rule types by platform

| Platform | Default rule | Specific rule |
|---|---|---|
| GKE | Supported | Clusters, Kubernetes Namespaces, Kubernetes Service Accounts |
| Cloud Run | Supported | Not supported |
| GKE attached clusters | Supported | Clusters, Kubernetes Namespaces, Kubernetes Service Accounts |
| GKE on AWS | Supported | Clusters, Kubernetes Namespaces, Kubernetes Service Accounts |
| Google Distributed Cloud | Supported | Clusters, Kubernetes Namespaces, Kubernetes Service Accounts |
| Cloud Service Mesh | Supported | Cloud Service Mesh Service Identities |

### Evaluation modes (`evaluationMode`)

| Mode | Description |
|---|---|
| Allow all images | Allows all images to be deployed. |
| Disallow all images | Disallows all images from being deployed. |
| Require attestations | A signer signs the image digest and creates an attestation before deployment; at deploy time the enforcer uses an attestor to verify the signature. Requires `evaluationMode` set to `REQUIRE_ATTESTATION`. |

### Enforcement modes (`enforcementMode`)

| Mode | Description |
|---|---|
| Block and Audit Log | Blocks images that do not conform to the rule and writes a message to the audit log saying why. Used by most production rules. |
| Dry Run: Audit Log Only | Allows non-conformant images to be deployed but writes details to Cloud Audit Logs. Primarily for testing a policy (for example in production) before enforcement goes into effect. |

### Allowlist pattern examples

| Goal | Pattern |
|---|---|
| All images whose registry location matches the path | `gcr.io/example-project/*` |
| All images in any subdirectory of the path (for example `gcr.io/example-project/my-directory/helloworld`) | `gcr.io/example-project/**` |
| A specific image | `gcr.io/example-project/helloworld` |
| A specific version by tag | `gcr.io/example-project/helloworld:latest`, `gcr.io/example-project/helloworld:my-tag` |
| All versions and tags of an image | `gcr.io/example-project/helloworld@*` |
| A specific version by digest | `gcr.io/example-project/helloworld@sha256:77b0b75136b9bd0fd36fb50f4c92ae0dbdbbe164ab67885e736fa4374e0cbb8c` |

### Policy terms

| Term | Meaning |
|---|---|
| Default rule | `defaultAdmissionRule`; applies to any deployment request that does not match a specific rule. Every policy has one. |
| Specific rules | Scoped to specific clusters (`clusterAdmissionRule`), service accounts or identities; support varies by platform. |
| Signer | Person or automated process that signs an image descriptor with a private key to create an attestation. |
| Attestor | Google Cloud resource holding the public key(s) used to verify attestations at deploy time. Has an Artifact Analysis note and one or more public keys. Typically one attestor corresponds to one signer. |
| Cryptographic keys | Two types are supported: PKIX (X.509; classical and post-quantum algorithms) and PGP. PKIX keys can be stored locally, externally, or in Cloud Key Management Service. |
| Artifact Analysis note | One note per attestor; each attestation is stored as an occurrence of this note. |

## Notes

- Each Google Cloud project can have exactly one policy, configured in the project where you run your deployment platform. In a single-project configuration the policy, attestors and attestations reside in the same project; in a multi-project configuration the platform, attestors and attestations can reside in different projects (separation of duties).
- CV uses a different type of policy, called a platform policy (see overview-cv).
- Exempt images: Binary Authorization always allows exempt images. Images in `gcr.io/google_containers/*`, `k8s.gcr.io/**` and additional paths are exempt by default because GKE needs them to start a cluster with the default policy active.
- Using `exemptImages` to allowlist Google-managed system images is not recommended; set `globalPolicyEvaluationMode` to `ENABLE` instead. With "Trust all Google-maintained system images" the system policy is evaluated before and in addition to the user policy, so images required by GKE are not blocked.
- `ALLOW all images` / `ALWAYS_ALLOW` allows everything for the rule it is set on; it is meant for the stated purpose only (for example a default policy or testing). Prefer `DRYRUN_AUDIT_LOG_ONLY` to test a policy before enforcing it.
- The source examples use `gcr.io` paths; for Artifact Registry use `LOCATION-docker.pkg.dev/...` paths.
- CV is Preview ("Pre-GA Offerings Terms").
- The source also shows Console, REST API and gcloud alternatives for managing exempt images.
- Source: https://docs.cloud.google.com/binary-authorization/docs/key-concepts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [policy-yaml-reference.md](./policy-yaml-reference.md)
- [configuring-policy-cli.md](./configuring-policy-cli.md)
- [attestations.md](./attestations.md)
- [overview-cv.md](./overview-cv.md)
