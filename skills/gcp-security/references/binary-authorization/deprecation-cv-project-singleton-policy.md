---
source: https://docs.cloud.google.com/binary-authorization/docs/deprecations/cv-project-singleton-policy
---

# Legacy continuous validation deprecation and shutdown

Binary Authorization is ending support for legacy continuous validation (legacy CV) with project-singleton policies for GKE. The replacement is CV with check-based platform policies.

## Signature / Usage

### Check-based platform policy format

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

## Options / Props

### Timeline

| Date | Change |
|---|---|
| April 15, 2024 | You can no longer enable legacy CV on new GKE projects. |
| May 1, 2025 | Legacy CV stops monitoring Pods in existing projects; no more Cloud Logging entries for Pod images that do not conform to the project-singleton policy. |

### Migration mapping

| Legacy project-singleton policy | Equivalent check-based platform policy |
|---|---|
| `ALWAYS_ALLOW` | Platform policy without any `checkSet` block. |
| `ALWAYS_DENY` | Platform policy with a single `checkSet` block that has an `alwaysDeny` check. |
| Requires attestations | A single platform policy with one SimpleSigningAttestationCheck per attestor; with the same key pair, the check works with existing attestations and logs only Pod images without valid attestations. |

### Replacement checks

| Check | Description |
|---|---|
| Vulnerability check | Image is checked for vulnerabilities at a severity level you define. |
| Sigstore check | Image has attestations signed by Sigstore. |
| SLSA check | Image was built from source in a trusted directory and by a trusted builder. |
| Trusted directory check | Image must reside in a trusted directory within a trusted image repository. |

## Notes

- Deprecated: legacy CV with project-singleton policies; migrate to CV with check-based platform policies (Preview).
- `ALWAYS_ALLOW` allows every image. Its equivalent, a platform policy with no check sets, is allowed, but since there are no checks to violate, CV doesn't produce any log entries.
- The deprecation policy is defined in the Google Cloud Platform Terms of Service (section "Discontinuation of Services"); a deprecated feature remains available for at least the period defined there before scheduled shutdown.
- Check-based platform policies are scoped to a GKE cluster rather than a Google Cloud project; after creating one you can apply it to one or more clusters. To enable CV with platform policies on a cluster, configure the cluster's Binary Authorization settings during cluster creation or update.
- Like legacy CV, check-based policies log Pods with non-conformant images to Logging.
- Snippet taken from https://docs.cloud.google.com/binary-authorization/docs/overview-cv
- Source: https://docs.cloud.google.com/binary-authorization/docs/deprecations/cv-project-singleton-policy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview-cv.md](./overview-cv.md)
- [key-concepts.md](./key-concepts.md)
