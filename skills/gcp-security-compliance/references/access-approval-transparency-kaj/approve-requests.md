---
source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/approve-requests
---

# Approving Access Approval requests

Approvers receive Access Approval requests by email or Pub/Sub and approve or dismiss them in the Google Cloud console or through the Access Approval API.

## Signature / Usage

### Approve with the API

Take the `approvalRequest` name from the Pub/Sub message, then POST to it with `:approve` (or `:dismiss`). The request is a POST with an empty body.

Adapted (not in the official docs): the rendered source wraps the placeholders in `<var>` tags; they are plain upper-case placeholders here.

```bash
# HTTP POST request with empty body (an effect of using -d '')
curl -H \
  "Authorization: Bearer $(gcloud auth print-access-token)" \
  -d '' \
  https://accessapproval.googleapis.com/v1/projects/PROJECT_ID/approvalRequests/APPROVAL_REQUEST_ID:approve
```

### Approve with gcloud

```bash
gcloud access-approval requests approve \
    projects/12345/approvalRequests/abc123
```

## Options / Props

### Required roles

| Role | Purpose |
|---|---|
| Access Approval Approver (`roles/accessapproval.approver`) | Grant on the project, folder, or organization to the principal (user, service account, or Google group) who approves requests. |
| Cloud KMS CryptoKey Signer/Verifier (`roles/cloudkms.signerVerifier`) | Required for the Access Approval service account of your resource only when you use a custom signing key. Not needed with a Google-managed signing key. |

### Responses

| Action | Effect | Google access state |
|---|---|---|
| `:approve` | Approves the request. | Denied before approval, approved after approval. |
| `:dismiss` | Dismisses the request; recommended over taking no action because it prompts the Google employee to follow up. | Denied before dismissal, denied after dismissal. |
| No action | Google employee access is still denied. The employee must open a new request after the `requestedExpiration` time passes. | Denied before no action, denied after expiration time. |

## Notes

- Pending requests shown in the console are only those for the selected hierarchy level (a folder shows folder-level resources, not all projects in it).
- A request not approved within 14 days, or before it expires, is automatically dismissed. The bulk approve option does not let you choose the expiration date and time; the single-request dialog does.
- After approval the status is `Approved`; any Google employee whose characteristics match the approval scope (same justification, location, or desk location) can access the resource until the approval expires or the justification is no longer valid (for example, the support case is closed). Access Approval grants no IAM role or permission to the requester.
- Dismissing only removes the request from your pending list; access stays denied either way.
- Access Transparency logs all accesses you approve.
- Adapted from the official docs: the rendered source wrote the URL as `.../projects/<var>PROJECT_ID</var>/approvalRequests/<var>APPROVAL_REQUEST_ID</var>:approve`; the `<var>` tags were removed.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/requests/approve (gcloud 593.0.0 help).
- The source also shows Console steps and the optional signature validation step.
- Source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/approve-requests (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [review-approve-access-requests-google-keys.md](./review-approve-access-requests-google-keys.md)
- [approval-request-details.md](./approval-request-details.md)
- [validate-request-signature.md](./validate-request-signature.md)
