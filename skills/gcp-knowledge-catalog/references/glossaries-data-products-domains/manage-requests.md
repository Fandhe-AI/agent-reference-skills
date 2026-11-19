---
source: https://docs.cloud.google.com/knowledge-catalog/docs/manage-requests
---

# Manage governance requests

How requesters, approvers and workflow administrators manage governance requests in Knowledge Catalog (formerly Dataplex Universal Catalog) with the console or the `changeRequests` REST methods. This feature is in Preview ("Pre-GA Offerings Terms"); requesting single metadata changes to business glossaries and entries is in private preview and needs an access form. Enable the Dataplex API first.

## Signature / Usage

### Requester: view, edit and delete requests

List the requests you authored:

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests?filter=author=USER_EMAIL"
```

View a specific request:

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests/CHANGE_REQUEST_ID"
```

Update only the justification of a pending request (state `NEW` or `FAILED`; `FAILED` resets to `NEW`):

```bash
curl -X PATCH \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "justification": "NEW_JUSTIFICATION"
  }' \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests/CHANGE_REQUEST_ID?updateMask=justification"
```

Delete a request (requesters only in state `NEW`):

```bash
curl -X DELETE \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests/CHANGE_REQUEST_ID"
```

### Approver: list, approve, reject

List requests pending review (batch requests have `changeType` set to `BATCH_CHANGE_METADATA`; enrichment agent runs set `batchChangeMetadataRequest.description.job.name`):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests?filter=state=NEW"
```

Approve a request:

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{}' \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests/CHANGE_REQUEST_ID:approve"
```

For a batch request, a successful validation returns the `ChangeRequest` in the `APPLYING` state while the batch runs in the background:

```json
{
  "name": "projects/my-project/locations/us-central1/changeRequests/b326114f-472b-457d-81e8-98b8ad89c608",
  "uid": "b326114f-472b-457d-81e8-98b8ad89c608",
  "justification": "Proposing new entry using RequestBatchMetadataChange",
  "author": "requester@example.com",
  "state": "APPLYING",
  "resource": "//dataplex.googleapis.com/projects/my-project/locations/us-central1/entryGroups/my-entry-group",
  "approver": "approver@example.com",
  "changeType": "BATCH_CHANGE_METADATA",
  "batchChangeMetadataRequest": {
    "name": "projects/my-project/locations/us-central1/entryGroups/my-entry-group",
    "changes": [
      {
        "createEntryRequest": {
          "parent": "projects/my-project/locations/us-central1/entryGroups/my-entry-group",
          "entryId": "new-entry-id",
          "entry": {
            "entryType": "projects/my-project/locations/us-central1/entryTypes/my-entry-type"
          }
        }
      }
    ]
  }
}
```

After the background run, poll `changeRequests.get`; the final state is `APPROVED` or `FAILED`, and `failedRequests` is keyed by position in `changes` (starting at `0`):

```json
{
  "name": "projects/my-project/locations/us-central1/changeRequests/b326114f-472b-457d-81e8-98b8ad89c608",
  "state": "APPROVED",
  "changeType": "BATCH_CHANGE_METADATA",
  "batchChangeMetadataResponse": {
    "failedRequests": {
      "1": {
        "code": 5,
        "message": "Entry not found."
      }
    }
  }
}
```

Reject a request with a comment:

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "comment": "REJECTION_REASON"
  }' \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests/CHANGE_REQUEST_ID:reject"
```

### Workflow administrator: notifications and audit

Configure up to 10 approver emails on an entry group (`entryGroups.patch`):

```bash
curl -X PATCH \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "changeRequestConfig": {
      "approverEmails": [
        "APPROVER_EMAIL_1",
        "APPROVER_EMAIL_2"
      ]
    }
  }' \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/entryGroups/ENTRY_GROUP_ID?updateMask=changeRequestConfig"
```

Same on a business glossary (`glossaries.patch`):

Adapted (not in the official docs): the glossary path uses `locations/LOCATION` (the glossary's location) instead of `locations/global`.

```bash
curl -X PATCH \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "changeRequestConfig": {
      "approverEmails": [
        "APPROVER_EMAIL_1",
        "APPROVER_EMAIL_2"
      ]
    }
  }' \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/glossaries/GLOSSARY_ID?updateMask=changeRequestConfig"
```

List all active and historical requests in a project and location:

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://dataplex.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/changeRequests"
```

## Options / Props

### Required roles

| Task | Roles |
|------|-------|
| Approve or reject data product access requests | `roles/dataplex.dataProductsEditor`, `roles/dataplex.dataProductsAdmin` |
| Review and approve metadata change requests | `roles/dataplex.catalogAdmin`, `roles/dataplex.workflowApprover` |
| View and edit authored requests | `roles/dataplex.changeRequestOwner` |
| View and edit requests created by an enrichment agent | `roles/dataplex.catalogAdmin` |
| View all requests and delete requests in any state | `roles/dataplex.workflowAdmin`, `roles/dataplex.catalogAdmin` |
| Configure approver email notifications | `roles/dataplex.catalogAdmin`, `roles/dataplex.catalogEditor`, `roles/dataplex.glossaryOwner` |

### Console tabs on Governance Workflows

| Tab | Shows |
|-----|-------|
| My Requests | Your past and pending requests |
| Pending Approvals | Requests pending review (filter by resource type, request type or date) |
| Approval Log | Completed approvals, rejections and historical audit trails |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/manage-requests (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the official glossary example fixes the path to `locations/global`, while the entry group example uses `locations/LOCATION`. Glossaries are also created in regional locations (for example `--location=us-central1` in import-export-glossaries-entrylinks-overview.md), so the example uses `LOCATION`; replace it with the location of the glossary.
- Unconfirmed by the API definitions: the glossary example above is as the official page writes it, but the Discovery document's `GoogleCloudDataplexV1Glossary` schema and the googleapis proto (5ce0245) have no `changeRequestConfig` field (only `EntryGroup` has it), so `glossaries.patch` with `updateMask=changeRequestConfig` is not confirmed. Use `entryGroups.patch` where possible.
- If an approver uses `roles/dataplex.workflowApprover`, they must also have write access on the target entry or glossary resource, such as Dataplex Catalog Editor or Dataplex Entry Owner.
- You cannot approve your own request; the approver must be a different principal with all write and type-usage permissions the changes need. An enrichment agent can auto-approve its own requests based on confidence or submit them for review.
- Who can edit: user-submitted requests only by the original author; enrichment-agent requests also by reviewers and approvers while in `NEW` or `FAILED` (the `author` stays the agent service account).
- Approval validates IAM permissions and payload rules synchronously: a payload failure (for example `INVALID_ARGUMENT`, `NOT_FOUND`) moves the request straight to `FAILED`; a `PERMISSION_DENIED` failure leaves it in `NEW`.
- Notifications: approve or reject sends an email with the review comment to the requester (for batch requests after the update completes); no email is sent if the author is a service account.
- Deleting is irreversible (the request is removed from storage); requesters can delete only `NEW` requests, workflow administrators any state. Try deletes on a disposable request first.
- The source also shows Console steps and a PATCH body that updates the batch `changes` (an `updateEntryRequest` with aspects) and a sample response for a pending batch change request; both are omitted here.

## Related

- [about-governance-workflows.md](./about-governance-workflows.md)
- [use-data-products.md](./use-data-products.md)
