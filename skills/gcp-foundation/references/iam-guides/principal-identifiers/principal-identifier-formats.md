---
source: https://docs.cloud.google.com/iam/docs/principal-identifiers
---

# Principal Identifier Formats

The identifier format for a principal depends on the principal type and the policy type: allow policies (IAM v1), deny policies (IAM v2), Principal Access Boundary bindings (IAM v3), and access policies (Eventarc).

## Signature / Usage

Allow policies (v1). Also used for Privileged Access Manager entitlements:

```text
user:USER_EMAIL_ADDRESS                    e.g. user:alex@example.com
serviceAccount:SA_EMAIL_ADDRESS            e.g. serviceAccount:my-service-account@my-project.iam.gserviceaccount.com
group:GROUP_EMAIL_ADDRESS                  e.g. group:my-group@example.com
domain:DOMAIN                              e.g. domain:example.com
allUsers
allAuthenticatedUsers
principalSet://cloudresourcemanager.googleapis.com/RESOURCE_TYPE/RESOURCE_NUMBER/type/ServiceAccount
principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE
principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/group/GROUP_ID
principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE
principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/*
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/group/GROUP_ID
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/*
principal://TRUST_DOMAIN/resources/SERVICE/RESOURCE_PATH
principalSet://TRUST_DOMAIN/*
principalSet://TRUST_DOMAIN/attribute.platformContainer/aiplatform/projects/PROJECT_NUMBER
```

GKE Workload Identity (v1):

```text
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/NAMESPACE/sa/KUBERNETES_SERVICE_ACCOUNT
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/kubernetes.serviceaccount.uid/SERVICEACCOUNT_ID
serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KUBERNETES_SERVICE_ACCOUNT]   (legacy)
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/namespace/NAMESPACE
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/kubernetes.cluster/https://container.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_NAME
```

Deny policies (v2) differ for users, service accounts, groups, and "all principals":

```text
principal://goog/subject/USER_EMAIL_ADDRESS
principal://iam.googleapis.com/projects/-/serviceAccounts/SA_EMAIL_ADDRESS
principalSet://cloudresourcemanager.googleapis.com/RESOURCE_TYPE/RESOURCE_NUMBER/type/ServiceAgent
principalSet://goog/group/GROUP_EMAIL_ADDRESS
principalSet://goog/public:all
principalSet://goog/cloudIdentityCustomerId/CLOUD_IDENTITY_CUSTOMER_ID
```

Workforce, workload, and agent identity formats are the same as in allow policies.

Principal Access Boundary policy bindings (v3) principal sets:

```text
//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID
//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/WORKLOAD_POOL_ID
PROJECT_TRUST_DOMAIN/attribute.container/projects/PROJECT_NUMBER
//iam.googleapis.com/locations/global/workspace/CUSTOMER_ID
//cloudresourcemanager.googleapis.com/projects/PROJECT_ID
//cloudresourcemanager.googleapis.com/folders/FOLDER_ID
//cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_ID
```

Access policies (Eventarc) use the deny-policy style identifiers: `principal://goog/subject/...`, `principal://iam.googleapis.com/projects/-/serviceAccounts/...`, the service-account `principalSet`, `principalSet://goog/group/...`, `principalSet://goog/cloudIdentityCustomerId/...`, and `principalSet://goog/public:all` (only with the `DENY` action).

Deleted principals (allow: `deleted:user:...?uid=UNIQUE_ID`, `deleted:serviceAccount:...?uid=UNIQUE_ID`, `deleted:group:...?uid=UNIQUE_ID`; deny: `deleted:principal://...?uid=UNIQUE_ID`):

```text
deleted:user:alex@example.com?uid=123456789012345678901
deleted:principal://goog/subject/alex@example.com?uid=123456789012345678901
```

## Notes

- In the Google Cloud console, omit the `user:`, `serviceAccount:`, `group:`, and `domain:` prefixes when granting to a new principal.
- Moving projects into or out of a folder or organization changes membership of the service-account and service-agent `principalSet`s.
- Do not deny permissions for service agents (it can break Google Cloud services); use the `type/ServiceAgent` principal set to exempt them from deny rules.
- Do not add deleted principals when creating or modifying policies.
- Agent identity examples include Vertex AI Agent Engine (`agents.global.org-123456789012.system.id.goog`, or `agents.global.proj-9876543210.system.id.goog` without an organization) and Gemini Enterprise.
- `allUsers` and `allAuthenticatedUsers` (and `principalSet://goog/public:all`) make resources broadly accessible; avoid in allow policies unless intended.
- Source: https://docs.cloud.google.com/iam/docs/principal-identifiers
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [principals-overview.md](./principals-overview.md)
