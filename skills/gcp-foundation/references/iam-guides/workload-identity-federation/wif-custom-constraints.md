---
source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-custom-constraints
---

# Workload Identity Federation custom organization policy constraints

Use Organization Policy Service custom constraints to restrict create/update operations on workload identity pools, providers, and provider keys.

## Signature / Usage

Constraint definition file:

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes: RESOURCE_NAME
methodTypes:
  - CREATE
  - UPDATE 
condition: "CONDITION"
actionType: ACTION
displayName: DISPLAY_NAME
description: DESCRIPTION
```

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
```

```bash
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

Policy that enforces it (dry-run first, then live):

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true

dryRunSpec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy POLICY_PATH --update-mask=dryRunSpec
```

```bash
gcloud org-policies set-policy POLICY_PATH --update-mask=spec
```

Example: require all new providers to be SAML providers.

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/custom.enableSamlWorkloadIdProviders
resourceTypes:
- iam.googleapis.com/WorkloadIdentityPoolProvider
methodTypes:
- CREATE
condition: "!has(resource.saml)"
actionType: DENY
displayName: Enable SAML workload identity pool providers
description: All new workload identity pool providers must be SAML providers.
```

```yaml
name: projects/PROJECT_ID/policies/custom.enableSamlWorkloadIdProviders
spec:
  rules:
  - enforce: true
```

```bash
gcloud org-policies set-policy policy-enable-saml-idps.yaml
```

```bash
gcloud org-policies list --project=PROJECT_ID
```

Test (the OIDC provider creation is denied once enforced):

```bash
gcloud iam workload-identity-pools create POOL_ID \
    --location=global \
    --project=PROJECT_ID
```

```bash
gcloud iam workload-identity-pools providers create-oidc org-policy-test \
    --location=global \
    --workload-identity-pool=POOL_ID \
    --issuer-uri='https://accounts.google.com' \
    --attribute-mapping='google.subject=assertion.sub'
```

Other examples (conditions): `resource.keyData.keySpec == 'RSA_4096'` (ALLOW, on `iam.googleapis.com/WorkloadIdentityPoolProviderKey`, CREATE) and `resource.oidc.issuerUri == 'https://accounts.google.com'` (ALLOW, on `iam.googleapis.com/WorkloadIdentityPoolProvider`, CREATE and UPDATE).

## Options / Props

Supported resources and fields for conditions:

| Resource | Fields |
|----------|--------|
| `iam.googleapis.com/WorkloadIdentityPool` | `resource.description`, `resource.disabled`, `resource.displayName`, `resource.mode`, `resource.name`, `resource.inlineCertificateIssuanceConfig.{caPools,keyAlgorithm,lifetime,rotationWindowPercentage,useDefaultSharedCa}`, `resource.inlineTrustConfig.additionalTrustBundles[*].{intermediateCas.pemCertificate,trustAnchors.pemCertificate,trustDefaultSharedCa}` |
| `iam.googleapis.com/WorkloadIdentityPoolProvider` | `resource.attributeCondition`, `resource.attributeMapping`, `resource.aws.accountId`, `resource.aws.stsUri`, `resource.description`, `resource.disabled`, `resource.displayName`, `resource.name`, `resource.oidc.allowedAudiences`, `resource.oidc.issuerUri`, `resource.oidc.jwksJson`, `resource.saml.idpMetadataXml`, `resource.x509.trustStore.{intermediateCas.pemCertificate,trustAnchors.pemCertificate,trustDefaultSharedCa}` |
| `iam.googleapis.com/WorkloadIdentityPoolProviderKey` | `resource.keyData.keySpec`, `resource.name`, `resource.use` |

| Constraint field | Description |
|------------------|-------------|
| `name` | `custom.` prefix + letters/numbers; up to 70 characters excluding the prefix. |
| `displayName` | Up to 200 characters; may appear in errors, so no PII. |
| `description` | Up to 2000 characters; used as the violation error message. |
| `condition` | CEL, up to 1,500 characters. |
| `methodTypes` | `CREATE`, or `CREATE` and `UPDATE`. |
| `actionType` | `ALLOW` (only matching operations permitted, everything else blocked) or `DENY` (matching operations blocked). |

## Notes

- Required roles: `roles/orgpolicy.policyAdmin` on the organization; `roles/iam.workloadIdentityPoolAdmin` on the project to create or update Workload Identity Federation configuration.
- Most resource types support up to 20 custom constraints. With `UPDATE` enforcement, changes to a violating resource are blocked unless the change fixes the violation.
- A new policy takes up to 15 minutes to take effect (the example says about two minutes for enforcement to begin). Use dry-run (`dryRunSpec`) and Policy Simulator before setting the live policy.
- Policies are inherited down the resource hierarchy by default.
- Expected denial: `Operation denied by org policy on resource 'projects/PROJECT_ID/locations/global/workloadIdentityPools/POOL_ID': ["customConstraints/custom.enableSamlWorkloadIdProviders": "All new workload identity pool providers must be SAML providers."]`.
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-custom-constraints (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [OIDC and SAML providers](./wif-oidc-saml-providers.md)
- [Troubleshooting](./wif-troubleshooting.md)
