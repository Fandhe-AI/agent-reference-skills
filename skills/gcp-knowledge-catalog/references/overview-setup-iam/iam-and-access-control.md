---
source: https://docs.cloud.google.com/knowledge-catalog/docs/iam-and-access-control
---

# Access control with IAM for Knowledge Catalog

IAM controls access to Knowledge Catalog resources at the project level or on individual catalog resources such as entry groups, entries and aspect types. Roles can be granted with the Google Cloud console, the gcloud CLI, client libraries or APIs.

## Signature / Usage

### Grant a role on an entry group

Adapted (not in the official docs): the role is `roles/dataplex.catalogViewer`; the gcloud help example's `roles/dataplex.viewer` has no `dataplex.entryGroups.*` permissions and excludes catalog resources.

```bash
gcloud dataplex entry-groups add-iam-policy-binding \
    test-entry-group --project=test-project --location=us-central1 \
    --role=roles/dataplex.catalogViewer --member=user:foo@gmail.com
```

### Read the policy first

```bash
gcloud dataplex entry-groups get-iam-policy test-entry-group \
    --project=test-project --location=us-central1
```

The output includes an `etag` field that identifies the version emitted and lets you detect concurrent policy updates when you later use `set-iam-policy`.

## Options / Props

### Service agent

| Item | Value |
|---|---|
| Identity | Google-managed service agent created when you enable the Dataplex API. |
| Email | `service-CUSTOMER_PROJECT_NUMBER@gcp-sa-dataplex.iam.gserviceaccount.com` (`CUSTOMER_PROJECT_NUMBER` is the number of the project where the Dataplex API is enabled). |
| Required role | Dataplex Service Agent (`roles/dataplex.serviceAgent`) on the project; granted automatically when the API is enabled. If revoked, Knowledge Catalog might not function correctly. |
| Other projects | Grant the service agent the required permissions in projects that contain resources you attach as assets or scan for data profiles (for example Cloud Storage buckets or BigQuery datasets). |
| Custom execution identity for data scans | By default the service agent runs data quality and data profile scans. With a custom service account as the scan's execution identity, the service agent needs Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) or the `iam.serviceAccounts.getAccessToken` permission on that service account. End-user credentials (EUC) can also be used. |

### Resources and role types

| Topic | Details |
|---|---|
| Resources you can grant access to | Projects, entry groups, entries, entry links, aspect types, entry types, entry link types. |
| Multi-resource methods | Some API methods need permissions on several resources; attaching an aspect to an entry requires permissions on both the entry and the aspect type. |
| Basic roles | Owner, Editor, Viewer (highly permissive, pre-IAM). |
| Predefined roles | Granular per-service roles; see the Knowledge Catalog IAM roles page. |
| Custom roles | Only the permissions you choose. |
| Example roles | Dataplex Catalog Viewer (`roles/dataplex.catalogViewer`): read-only access to catalog resources (entry groups, entries, entry links, aspect types, entry types, entry link types, glossaries); Dataplex Viewer (`roles/dataplex.viewer`) is read access to Dataplex resources other than catalog resources (entries, entry groups, glossaries). Dataplex Administrator (`roles/dataplex.admin`): broad management access. |
| Policy inheritance | Resources inherit the policies of their parents; the effective policy is the union of the policy on the resource and the inherited policy. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/iam-and-access-control (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entry-groups/add-iam-policy-binding and https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entry-groups/get-iam-policy (gcloud 593.0.0 help); the page itself has no fenced code. The binding example uses `roles/dataplex.catalogViewer`, read-only.
- Corrected from the official docs: the page's example-roles row says Dataplex Viewer (`roles/dataplex.viewer`) can view entry groups, entries, entry links, aspect types, entry types and entry link types, and the gcloud help example binds `roles/dataplex.viewer` on an entry group. IAM `dataplex.md.txt`: `roles/dataplex.viewer` is read access "except for catalog resources like entries, entry groups, and glossaries", while `roles/dataplex.catalogViewer` has `dataplex.entryGroups.get/list`, `dataplex.entries.get/list`, `dataplex.aspectTypes.get/list`; iam-roles.md says the same, so the example and the row use `roles/dataplex.catalogViewer`.
- A new project's creator is granted Owner (`roles/owner`); no other individual users have access to Knowledge Catalog resources until explicitly granted.
- Granting at entry group level (instead of project level) avoids changing individual entry permissions; prefer the narrowest resource level that works.
- IAM in general (principals, policy hierarchy, custom roles, service accounts) is covered by `gcp-foundation`.

## Related

- [iam-roles.md](./iam-roles.md)
- [enable-api.md](./enable-api.md)
