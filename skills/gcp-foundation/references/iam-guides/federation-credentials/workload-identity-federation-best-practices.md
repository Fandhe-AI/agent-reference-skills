---
source: https://docs.cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation
---

# Workload Identity Federation Best Practices

When to use Workload Identity Federation (WIF) and how to configure workload identity pools and providers to resist spoofing, privilege escalation, non-repudiation, and malicious credential configuration threats.

## Signature / Usage

### Regional STS endpoint (data residency)

```text
gcloud iam workload-identity create-cred-config ... --sts-location=REGION
```

For an existing credential configuration file, replace in `token_url`:

```text
https://sts.googleapis.com            ->  https://sts.REGION.rep.googleapis.com
https://sts.mtls.googleapis.com       ->  https://sts.REGION.rep.mtls.googleapis.com
```

### Default audience (provider URL)

```text
https://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID
```

### Organization policy constraint to block new providers

```text
constraints/iam.workloadIdentityPoolProviders   (rule: Deny All at the organization root; allow trusted AWS accounts / OIDC providers per project)
```

### The three-step flow

1. Obtain a credential from the trusted identity provider.
2. Exchange it for a token from the Security Token Service.
3. Use the STS token to impersonate a service account and obtain a short-lived Google access token.

## Options / Props

| Topic | Practice |
|-------|----------|
| When to use | Use for applications with ambient credentials (AWS instance profiles, Azure managed identities, GitHub Actions OIDC tokens; OIDC, SAML, AWS credentials). Chain an additional exchange for unsupported types (for example Kerberos to an OAuth JWT through AD FS). Reduces the number of secrets to rotate. |
| Multi-tenant IdPs | For GitHub and Terraform Cloud (one issuer URL for all tenants) add an attribute condition for the trusted tenant or organization. |
| Pool management | Use one dedicated project for pools and providers; enforce with `constraints/iam.workloadIdentityPoolProviders`. |
| Subject collisions | One provider per pool; do not federate with the same IdP twice within a pool (or at all, if avoidable). |
| OIDC metadata | Protect the IdP's OIDC metadata / JWKS endpoint against MITM when behind a TLS-terminating proxy. |
| Audience | Keep the provider URL as the audience to reduce confused-deputy risk. |
| Attribute mappings | Use immutable, non-reusable, stable, authoritative attributes (for example a unique user ID, not email/username); restrict `iam.googleapis.com/workloadIdentityPoolProviders.update` (Owner, `roles/iam.workloadIdentityPoolAdmin`). |
| External credential configs | Validate credential configuration JSON from external sources before use. |
| Audit | Enable Data Access logs for the Security Token Service API and Identity and Access Management API in all projects holding pools or federated service accounts; make the `google.subject` mapping unique and reversible (one external identity to exactly one subject value and back). |
| Privilege | Use service accounts in the same project as the resources; one service account per application; grant `roles/iam.workloadIdentityUser` to specific external identities, never to all pool members. |

## Notes

- A workload identity pool contains no identities; it is a view over external IdP identities, so ambiguous mappings enable spoofing.
- Audit logs attribute actions to the impersonated service account; some services include `serviceAccountDelegationInfo` with the federated subject, not all do.
- If the same external identity maps to multiple IAM principals in different pools, revoking one binding may leave another.
- Deleting an IdP user does not remove IAM bindings; reused attributes can let a new user inherit access.
- Source: https://docs.cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation (retrieved 2026-11-14; CC BY 4.0)

## Related

- [authentication-methods-and-sts-audit.md](./authentication-methods-and-sts-audit.md)
- [workforce-identity-federation.md](./workforce-identity-federation.md)
- [service-account-best-practices.md](../service-accounts/service-account-best-practices.md)
