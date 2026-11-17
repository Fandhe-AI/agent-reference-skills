---
source: https://docs.cloud.google.com/binary-authorization/docs/attestations
---

# Attestations overview

An attestation affirms that a required activity (regression test, vulnerability scan, other test) was performed on a container image; it is created by signing the image's unique digest. At deploy time Binary Authorization verifies attestations with an attestor instead of repeating the activities. If all attestations are verified, the image can deploy.

## Signature / Usage

### Workflow

1. Enable Binary Authorization and set it up for GKE, Cloud Run or Google Distributed Cloud (Cloud Service Mesh users only set up the policy).
2. Create an attestor (Google Cloud CLI or Google Cloud console).
3. Configure a policy rule that requires attestations (default rule, or a cluster-specific / specific rule).
4. Create attestations (a signer signs the image: manually, or in a Cloud Build pipeline).
5. Deploy the image.

### Policy rule requiring attestations

```text
defaultAdmissionRule:
  evaluationMode: REQUIRE_ATTESTATION
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
  requireAttestationsBy:
  - projects/example-project/attestors/secure-build
```

## Options / Props

### Where to configure the require-attestation rule

| Platform | Rule scope |
|---|---|
| GKE | Default rule; cluster-specific rule |
| Cloud Run | Default rule |
| Distributed Cloud | Default rule; cluster-specific rule |
| Cloud Service Mesh | Specific rules scoped to a mesh service identity, a Kubernetes service account, or a Kubernetes namespace |

## Notes

- Cloud Build users can use the `built-by-cloud-build` attestor to deploy only images built by Cloud Build.
- Cloud Service Mesh workloads are enforced as soon as the policy is saved.
- Attestation creation: a signer can be a person (manual) or an automated service. The source links to "Create attestations manually" and "Create attestations in a Cloud Build pipeline".
- Deploy guides: GKE and Distributed Cloud use "Deploy containers"; Cloud Run uses the Cloud Run enabling guide.
- Follow-ups listed in the source: view audit logs, view Cloud Run breakglass audit logs, use breakglass (GKE / Cloud Run), use image digests in Kubernetes manifests. Breakglass bypasses policy enforcement; use it only for emergencies.
- The source also shows Console workflows for creating attestors and rules.
- Snippet taken from https://docs.cloud.google.com/binary-authorization/docs/policy-yaml-reference
- Source: https://docs.cloud.google.com/binary-authorization/docs/attestations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-concepts.md](./key-concepts.md)
- [configuring-policy-cli.md](./configuring-policy-cli.md)
- [policy-yaml-reference.md](./policy-yaml-reference.md)
- [overview.md](./overview.md)
