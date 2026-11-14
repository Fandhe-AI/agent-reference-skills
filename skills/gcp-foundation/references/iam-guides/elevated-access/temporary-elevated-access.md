---
source: https://docs.cloud.google.com/iam/docs/temporary-elevated-access
---

# Temporary Elevated Access

Ways to give users temporary (break-glass or just-in-time) access to sensitive resources while recording justification: Privileged Access Manager, Google groups, IAM Conditions, the Just-In-Time Access application, and service account impersonation.

## Signature / Usage

Identifiers named on the page (roles that let a user impersonate a service account, and the example group):

```text
roles/iam.serviceAccountOpenIdTokenCreator   (short-lived OIDC ID tokens)
roles/iam.serviceAccountTokenCreator         (OAuth 2.0 access tokens, OIDC ID tokens, signed JWTs and blobs)
roles/compute.admin                          (granted to group emergency-compute-access@example.com)
```

### Comparison

| Method | How it works | Justification recorded | Limits |
|---|---|---|---|
| Privileged Access Manager (PAM) | Just-in-time grants with approvals, justifications, audit logs; entitlements can use tag-based conditions; service accounts or agent identities can be approvers or self-elevate; supports multi-party approval | Yes | See PAM docs |
| Google groups | Grant roles to a group and add/remove users; Google Groups API supports membership expiration | No, build your own process | Exempt the group from relevant deny rules |
| IAM Conditions | Time-based conditional bindings give expiring access | No, build your own process | Expired bindings are not auto-removed (policy size limit); deny policies do not support time-based conditions |
| Just-In-Time Access app | Open source, runs on App Engine or Cloud Run, uses IAM Conditions; users search roles and give justification; replaces the existing conditional binding to keep policy size small | Yes | Cannot give access if the user is explicitly denied |
| Service account impersonation | Grant the user a token-creator role, or run a token broker that issues short-lived credentials after authentication and justification | Via broker | Direct role grant allows impersonation at any time |

## Notes

- PAM use cases: emergency access, controlled access to sensitive resources, granular least privilege, automated approvals via service accounts or agent identities, protecting service accounts and agent identities, mitigating insider threats with multi-party approval, contractor access, and turning permanent roles flagged by IAM recommender into on-demand entitlements.
- Remove expired conditional bindings periodically so allow policies do not exceed the maximum size.
- Granting token-creator roles lets the user impersonate the service account at any time; the service account holds the elevated roles, so scope it narrowly and consider deny-rule exemptions.
- Source: https://docs.cloud.google.com/iam/docs/temporary-elevated-access
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [tags-access-control.md](../delegated-administration/tags-access-control.md)
- [limit-role-granting.md](../delegated-administration/limit-role-granting.md)
