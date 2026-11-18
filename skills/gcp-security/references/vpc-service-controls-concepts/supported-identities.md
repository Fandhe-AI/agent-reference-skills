---
source: https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities
---

# Supported identities for ingress and egress rules

The identities that VPC Service Controls supports in ingress and egress rules, with their identifier formats, plus Workload Identity Federation for GKE considerations and how to manage perimeters that reference deleted IAM principals.

## Signature / Usage

### Get a perimeter that contains deleted principals

By default, updating or listing perimeters that contain deleted principals fails with a `The email address is invalid or non-existent` error. Use the Access Context Manager API and set the `deletedPrincipalSyntax` query parameter (REST) or the `deleted_principal_syntax` field (gRPC) to `DELETED_PRINCIPAL_SYNTAX_SUPPORT_ENABLED` in requests such as get, list, or patch (Preview):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://accesscontextmanager.googleapis.com/v1/accessPolicies/\
POLICY_NAME/servicePerimeters/PERIMETER_NAME?\
deletedPrincipalSyntax=DELETED_PRINCIPAL_SYNTAX_SUPPORT_ENABLED"
```

## Options / Props

### Identities from the IAM `v1` principal identifiers for allow policies

| Principal type | Identifier |
|----------------|------------|
| User accounts | `user:USER_EMAIL_ADDRESS` |
| Service accounts | `serviceAccount:SA_EMAIL_ADDRESS` |
| Single identity in a workforce identity pool | `principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE` |
| All workforce identities in a group | `principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/group/GROUP_ID` |
| All workforce identities with a specific attribute value | `principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE` |
| All identities in a workforce identity pool | `principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/*` |
| Single identity in a workload identity pool | `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE` |
| Workload identity pool group | `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/group/GROUP_ID` |
| All identities in a workload identity pool with a certain attribute | `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE` |
| All identities in a workload identity pool | `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/*` |
| All GKE Pods that use a Kubernetes service account by ID | `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/kubernetes.serviceaccount.uid/SERVICEACCOUNT_ID` |
| All GKE Pods in a Kubernetes namespace, regardless of service account or cluster | `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/namespace/NAMESPACE` |
| All GKE Pods in a cluster | `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/kubernetes.cluster/https://container.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_NAME` |
| All agent identities in a trust domain with a certain attribute | `principalSet://TRUST_DOMAIN/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE` |
| All agent identities in a trust domain | `principalSet://TRUST_DOMAIN/*` |

### SPIFFE formats for third-party workforce and workload identities

| Identity type | Principal type | Identifier |
|---------------|----------------|------------|
| Workforce identities in SPIFFE format | Single identity in a workforce identity pool | `principal://POOL_ID.global.workforce.id.goog/SUBJECT_ATTRIBUTE_VALUE` |
| Workforce identities in SPIFFE format | All identities in a workforce identity pool as a trust domain with a certain attribute | `principalSet://POOL_ID.global.workforce.id.goog/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE` |
| Workforce identities in SPIFFE format | All identities in a workforce identity pool as a trust domain | `principalSet://POOL_ID.global.workforce.id.goog/*` |
| Workload identities in SPIFFE format | All identities in a workload identity pool as a trust domain with a certain attribute | `principalSet://POOL_ID.global.ORGANIZATION_ID.workload.id.goog/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE` |
| Workload identities in SPIFFE format | All identities in a workload identity pool as a trust domain | `principalSet://POOL_ID.global.ORGANIZATION_ID.workload.id.goog/*` |

### Limits and limitations

| Item | Limit or limitation |
|------|---------------------|
| Workload Identity Federation for GKE principals (Preview) | 1,000 per access policy. |
| Workload Identity Federation for GKE principals | Do not support the deleted principal syntax. |
| Deleted IAM principals (Preview) | Maximum of 500 deleted identities in an access policy. |
| Deleted principals API version | Only deleted IAM principals that use the IAM `v1` API; deleted principals using IAM `v2` or `v3` are not supported. |
| Deleted principals in access levels | Not supported. |
| Principals without IAM `deleted:` prefix syntax | Also not supported in perimeter rules. |
| Console and `gcloud` | Cannot manage perimeters that contain deleted principals; attempts fail with `The email address is invalid or non-existent`. |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Workforce identity pools, workload identity pools, Workload Identity Federation for GKE (Preview), agentic identities, and service agents can be specified only in perimeter ingress and egress rules. They are not supported in Access Context Manager access levels.
- Workload Identity Federation for GKE (Preview) and deleted IAM principals (Preview) are subject to the Pre-GA Offerings Terms and might have limited support.
- Workload Identity Federation for GKE principals can be given in the full IAM principal format (for example `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/NAMESPACE/sa/KUBERNETES_SERVICE_ACCOUNT`) or the equivalent SPIFFE format (`principal://PROJECT_ID.svc.id.goog/ns/NAMESPACE/sa/KUBERNETES_SERVICE_ACCOUNT`). Describing or retrieving a perimeter whose rules were created with SPIFFE syntax returns the identity in SPIFFE format.
- The `curl` call only reads a perimeter. `POLICY_NAME` and `PERIMETER_NAME` are placeholders. The `Authorization` header carries a short-lived access token over HTTPS; do not paste it into shared logs.
- IAM principal identifier and Workload Identity Federation details are in the `gcp-foundation` skill.

## Related

- [ingress-egress-rules.md](./ingress-egress-rules.md)
- [quotas.md](./quotas.md)
- [context-aware-access.md](./context-aware-access.md)
