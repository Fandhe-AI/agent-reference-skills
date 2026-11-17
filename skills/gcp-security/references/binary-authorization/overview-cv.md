---
source: https://docs.cloud.google.com/binary-authorization/docs/overview-cv
---

# Continuous validation overview

Preview. Continuous validation (CV) monitors Pods running on GKE to ensure their container images continue to conform to the check-based platform policies you specify. Violations are logged to Cloud Logging. CV with platform policies supersedes legacy continuous validation (deprecated). Platform policies work only with CV and do not support Binary Authorization enforcement; GKE is the only supported platform.

## Signature / Usage

### Canonical platform policy format

```text
gkePolicy:
  checkSets:
  - checks:
    - CHECK_TYPE1:
        CHECK_TYPE1_PARAMETERS
      displayName: CHECK_TYPE1_DISPLAY_NAME
    - CHECK_TYPE2:
        CHECK_TYPE2_PARAMETERS
      displayName: CHECK_TYPE2_DISPLAY_NAME
    displayName: CHECK_SET_DISPLAY_NAME
```

### Always-deny check

```yaml
gkePolicy:
  checkSets:
    - displayName: "My check set"
      checks:
        - alwaysDeny: true
```

### Simple signing attestation check

Adapted (not in the official docs): `checkSets`, `checks`, `attestationAuthenticators` and `pkixPublicKeys` written as lists, and the PEM markers with five dashes.

```yaml
gkePolicy:
  checkSets:
  - checks:
    - simpleSigningAttestationCheck:
        containerAnalysisAttestationProjects:
        - "projects/my-attestation-project1"
        - "projects/my-attestation-project2"
        attestationAuthenticators:
        - pkixPublicKeySet:
            pkixPublicKeys:
            - publicKeyPem: |
                -----BEGIN PUBLIC KEY-----
                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQxXxgAEvgQuW1FHYZPB2PTQfOJKUkS9sjMO/1os10xOWrhl1kQo4EnzMOovROWVLo+m9mcwp7nRQ2qQDThZdSFi0nFJ1A==
                -----END PUBLIC KEY-----
              signatureAlgorithm: ECDSA_P256_SHA256
```

### SLSA check

Adapted (not in the official docs): `checkSets`, `checks`, `rules` and `allowPattern` written as lists, `attestationSource` as one object, and `imageAllowlist` placed in the same check as `slsaCheck`.

```yaml
gkePolicy:
  checkSets:
  - displayName: "My check set"
    checks:
    - imageAllowlist:
        allowPattern:
        - "gcr.io/my-images/not-built-by-GCB/**"
      slsaCheck:
        rules:
        - trustedBuilder: GOOGLE_CLOUD_BUILD
          attestationSource:
            containerAnalysisAttestationProjects:
            - "projects/attestation-project1"
            - "projects/attestation-project2"
          # Require that images were built using a checked-in top-level config file.
          configBasedBuildRequired: true
          # Which repos the config file can be from.
          trustedSourceRepoPatterns:
          - "source.cloud.google.com/my-project/my-source-repo"
          - "github.com/my-github-user/*"
      displayName: "My SLSA check"
```

### Sigstore signature check

Adapted (not in the official docs): `publicKeys` written as a list, and the PEM markers with five dashes.

```yaml
gkePolicy:
  checkSets:
  - checks:
    - displayName: sigstore-signature-check
      sigstoreSignatureCheck:
        sigstoreAuthorities:
        - displayName: sigstore-authority
          publicKeySet:
            publicKeys:
            - publicKeyPem: |
                -----BEGIN PUBLIC KEY-----
                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQxXxgAEvgQuW1FHYZPB2PTQfOJKUkS9sjMO/1os10xOWrhl1kQo4EnzMOovROWVLo+m9mcwp7nRQ2qQDThZdSFi0nFJ1A==
                -----END PUBLIC KEY-----
```

### Vulnerability check

Adapted (not in the official docs): `containerAnalysisVulnerabilityProjects` written as a list.

```yaml
gkePolicy:
  checkSets:
    - displayName: "Default check set"
      checks:
        - vulnerabilityCheck:
            maximumFixableSeverity: MEDIUM
            maximumUnfixableSeverity: HIGH
            allowedCves:
              - "CVE-2022-11111"
              - "CVE-2022-22222"
            blockedCves:
              - "CVE-2022-33333"
              - "CVE-2022-44444"
            containerAnalysisVulnerabilityProjects:
              - "projects/my-project"
```

### Exempt images at policy level

Adapted (not in the official docs): `imageAllowlist` written as one object with an `allowPattern` list, and `checkSets` as a list.

```text
gkePolicy:
  imageAllowlist:
    allowPattern:
    - "us-central1-docker.pkg.dev/PROJECT_ID/exempt-images1/**"
    - "us-central1-docker.pkg.dev/PROJECT_ID/exempt-images2/**"
  checkSets:
  - checks:
      ...
```

### Multiple check sets

Adapted (not in the official docs): `trustedDirPatterns` written as a list.

```yaml
gkePolicy:
  checkSets:
    - displayName: "Prod check set"
      scope:
        kubernetesNamespace: "prod-namespace"
      checks:
        - trustedDirectoryCheck:
            trustedDirPatterns:
              - "gcr.io/my-project/prod-images"
        - imageFreshnessCheck:
            maxUploadAgeDays: 30
    - displayName: "Dev check set"
      scope:
        kubernetesNamespace: "dev-namespace"
      checks:
        - trustedDirectoryCheck:
            trustedDirPatterns:
              - "gcr.io/my-project/dev-images"
    - displayName: "Default check set"
      checks:
        - alwaysDeny: true
```

## Options / Props

### Checks

| Check | Behavior |
|---|---|
| `alwaysDeny: true` | All images subject to the check fail; a log entry per Pod on every review. Cannot be set to `false` (remove the check instead). |
| `imageFreshnessCheck.maxUploadAgeDays` | Logs when the image was uploaded more than the threshold number of days ago. |
| `simpleSigningAttestationCheck` | Each Pod image must have a valid signed attestation. `containerAnalysisAttestationProjects` (`projects/ATTESTATION_PROJECT_ID`) lists where attestations are searched; `attestationAuthenticators` carry the PKIX keys. Satisfied by a signature from any key in any authenticator. PGP keys are not supported. |
| `slsaCheck` | Checks SLSA provenance: trusted builder (`GOOGLE_CLOUD_BUILD` is the only supported trusted builder), attestation projects, `configBasedBuildRequired`, `trustedSourceRepoPatterns`. |
| `sigstoreSignatureCheck` | Verifies Sigstore signatures; supports only images hosted in Artifact Registry; satisfied by any key in any authority. |
| `trustedDirectoryCheck.trustedDirPatterns` | Images must reside in one of the listed directories. |
| `vulnerabilityCheck` | Uses Artifact Analysis vulnerability scanning (must be enabled first). Fields: `maximumFixableSeverity`, `maximumUnfixableSeverity`, `allowedCves`, `blockedCves`, `containerAnalysisVulnerabilityProjects`. Logs when a vulnerability exceeds a severity threshold or matches `blockedCves` and is not in `allowedCves`. |

### Allowlist (exempt image) patterns

| Pattern form | Matches |
|---|---|
| `us-central1.pkg.dev/my-project/my-image:latest@sha256:77b0b75136b9bd0fd36fb50f4c92ae0dbdbbe164ab67885e736fa4374e0cbb8c` | Exact name, tag and digest. |
| `us-central1.pkg.dev/my-project/my-image:latest` | Name and tag, any digest (or none). |
| `us-central1.pkg.dev/my-image:foo*` | Name and tag prefix, any digest (or none). |
| `us-central1.pkg.dev/my-project/my-image@sha256:77b0b75136b9bd0fd36fb50f4c92ae0dbdbbe164ab67885e736fa4374e0cbb8c` | Name and digest, any tag (or none). |
| `us-central1.pkg.dev/my-project/my-image` | Name, any tag and/or digest. |
| `us-central1.pkg.dev/my-project/my-image*` | Name prefix; `*` matches suffixes that do not include `/`. |
| `us-central1.pkg.dev/my-project/**` | `**` matches suffixes that can include `/`; only after a `/`. |

### Check set scope rules

| Rule | Detail |
|---|---|
| Scopes | `kubernetesNamespace` or `kubernetesServiceAccount` (value `my-namespace:my-service-account`). |
| One per scope | Only one check set per scope in a platform policy. |
| Order | Service account-scoped check sets first, then namespace-scoped. |
| Default check set | No scope; only one, and it must be listed last. If a policy contains any check sets it must contain at least a default check set. A policy with no check sets is allowed but produces no log entries. |

### Roles and resource names

| Item | Value |
|---|---|
| View / list / describe platform policies | `binaryauthorization.policyViewer` |
| Create / modify / delete platform policies | `binaryauthorization.policyEditor` |
| Platform policy in another project | `projects/POLICY_PROJECT_ID/platforms/gke/policies/POLICY_ID` |
| Feed resource created by CV | `binauthz-cv-cai-feed` |

## Notes

- Allowlist (exempt image) patterns: `*` and `**` cannot be used with tags or digests; name and tag prefixes must not be empty, so `*`, `**` and `us-central1.pkg.dev/my-image:*` are invalid. An allowlist at the policy level (`gkePolicy.imageAllowlist`) exempts from the whole policy; at the check set level from that check set; within a check (`checks[].imageAllowlist`) from that check only.
- Preview: "Pre-GA Offerings Terms"; available "as is" and might have limited support.
- CV reviews images of each Pod at least every 24 hours, including init containers and ephemeral containers. It writes a separate log entry per violated platform policy per Pod, containing only the violating images; if all images satisfy all checks, no entries are produced. Non-policy-conformant Pods are logged at least once, even short-lived Pods. CV does not terminate running Pods.
- CV does not support image tags other than those in exempt images. A tagged image is first evaluated against exempt images; if not exempted CV looks for a digest and, finding none, the image violates the check.
- `binauthz-cv-cai-feed`: deleting or modifying it can cause CV to fail. CV automatically restores a missing or altered feed, but it can fail to log findings until it does.
- Updating a platform policy overwrites the existing policy with the YAML you provide; to add a check, describe the existing policy to a YAML file, add the check and update from that file.
- Multiple platform policies: create them in the cluster's project or any other project; each GKE cluster chooses which one to use. All checks in a policy are evaluated for each image unless the image matches an exempt-image allowlist pattern.
- Single-project setup: Binary Authorization sets up its required roles in the service agent automatically; no extra IAM roles if clusters, policies and metadata are in one project. In a multi-project setup the policies, images, cluster and other CV-dependent resources can each reside in a different project; set up IAM roles for the resources CV must access.
- Simple signing and Sigstore: a project-singleton policy requires a valid attestation from any key of every attestor, whereas these checks require one from any key in any authenticator / authority. To get the equivalent of multiple attestors, configure multiple checks; multiple authenticators or keys are not sufficient. Attestors are not needed: you create keys, describe the platform policy to get the key ID, create and sign the payload, write the attestation JSON and create the attestation with the Artifact Analysis API. You still create an Artifact Analysis Note but do not name it in the policy.
- Trusted directory: also safeguard the repositories you list as trusted directories against unauthorized access.
- Dry run and breakglass: with dry run enabled, or when Pods are deployed using breakglass, project-singleton enforcement is bypassed or permissive; a matching platform policy lets CV keep logging violating Pods. Recommended: keep a project-singleton policy for enforcement and a platform policy for monitoring.
- Enabling CV on clusters that already use enforcement: the source says to use `--binauthz-evaluation-mode=POLICY_BINDINGS_AND_PROJECT_SINGLETON_POLICY_ENFORCE` so enforcement continues. In gcloud 593.0.0 the help lists the value as `policy-bindings-and-project-singleton-policy-enforce` on the `beta` and `alpha` tracks only; the GA `gcloud container clusters create` / `update` help lists only `disabled` and `project-singleton-policy-enforce` (the full flag list is in the `gcp-gke` skill).
- The source's example public key is an illustrative value; use your own public key and never put private key material in a policy.
- Validate after policy updates: inspect both the project-singleton policy and CV platform policies, deploy test Pods and check Binary Authorization entries in Logging.
- Legacy CV with project-singleton policies is deprecated; the dates are on [deprecation-cv-project-singleton-policy.md](./deprecation-cv-project-singleton-policy.md).
- The source examples use `gcr.io` paths; use Artifact Registry `LOCATION-docker.pkg.dev/...` paths for new images.
- Console and gcloud commands for creating, describing and updating platform policies are in "Manage platform policies" (https://docs.cloud.google.com/binary-authorization/docs/manage-platform-policies).
- The separate image freshness and trusted directory check examples are omitted; both checks appear in the multiple check sets example.
- Corrected from the official docs: several examples write list fields as mappings or single strings, but these fields are arrays in the v1 Discovery document (`GkePolicy.checkSets`, `CheckSet.checks`, `ImageAllowlist.allowPattern`, `SimpleSigningAttestationCheck.attestationAuthenticators`, `PkixPublicKeySet.pkixPublicKeys`, `SlsaCheck.rules`, `SigstorePublicKeySet.publicKeys`, `VulnerabilityCheck.containerAnalysisVulnerabilityProjects` and `TrustedDirectoryCheck.trustedDirPatterns` are arrays; `VerificationRule.attestationSource` is an object). Original fragments: `checkSets:` followed by `checks:` without `-`, `attestationAuthenticators:`, `pkixPublicKeys:` and `publicKeys:` followed by a mapping instead of a list item, `- containerAnalysisAttestationProjects: "projects/attestation-project1"`, `containerAnalysisVulnerabilityProjects: "projects/my-project"`, `trustedDirPatterns: "gcr.io/my-project/prod-images"`, `imageAllowlist:` followed by `- allowPattern: ...`.
- Corrected from the official docs: the SLSA example writes `imageAllowlist:` as a mapping key followed by a separate `- slsaCheck:` list item, which is not valid YAML. A check-level `imageAllowlist` sits in the same `Check` object as the check it exempts (Discovery `Check.imageAllowlist`), and the source says the `not-built-by-GCB` images are exempted from the check.
- Corrected from the official docs: the key examples write the PEM markers as `---BEGIN PUBLIC KEY---` / `---END PUBLIC KEY---`; `publicKeyPem` is a PEM-encoded key as described in RFC 7468 (Discovery `PkixPublicKey.publicKeyPem`), whose markers use five dashes.
- Source: https://docs.cloud.google.com/binary-authorization/docs/overview-cv (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [deprecation-cv-project-singleton-policy.md](./deprecation-cv-project-singleton-policy.md)
- [key-concepts.md](./key-concepts.md)
- [overview.md](./overview.md)
