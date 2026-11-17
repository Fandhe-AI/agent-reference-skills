---
source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/review-approve-access-requests-google-keys
---

# Review and approve access requests using the Google-managed signing key

Enroll a project in Access Approval in the Google Cloud console, choose an enrollment mode, configure email and Pub/Sub notifications, and review approval requests. A Google-owned and managed signing key is used by default.

## Signature / Usage

### Enroll

Enable Access Transparency for your organization first. Then, in the console, select the project, open the **Access Approval** page, click **Enroll**, choose an enrollment mode, and click **Enroll**. Settings and the list of enabled products are inherited from the parent resource; open **Manage settings** to select services (all or selected supported services).

### Notifications

Under **Manage settings** > **Set up approval notifications**: add your address in **User or group email** for email; add a topic in **Pub/Sub topic** for Pub/Sub. For Pub/Sub, in IAM grant the Pub/Sub Publisher role (`roles/pubsub.publisher`) to the `customer-approval-jobs@system.gserviceaccount.com` principal; notifications are not created without this step.

### Settings with gcloud

Update notification emails associated with project p1:

```bash
gcloud access-approval settings update --project=p1 \
  --notification_emails='foo@example.com, bar@example.com'
```

Update notification pubsub topic for project p1:

```bash
gcloud access-approval settings update --project=p1 \
  --notification_pubsub_topic='exampleTopic'
```

Update preferred request expiration days for project p1:

```bash
gcloud access-approval settings update --project=p1 \
  --preferred_request_expiration_days=5
```

To get the settings for the current project:

```bash
gcloud access-approval settings get
```

## Options / Props

### Required roles (on the project)

| Role | Purpose |
|---|---|
| Access Approval Config Editor (`roles/accessapproval.configEditor`) | View and update Access Approval configuration and approve access requests. |
| Access Approval Approver (`roles/accessapproval.approver`) | View Access Approval configuration and approve access requests. |
| Access Approval Viewer (`roles/accessapproval.viewer`) | View Access Approval configuration and access requests and download log reports. |

### Enrollment modes (changeable at any time)

| Mode | Behavior |
|---|---|
| Transparency (Default) | Monitor Google administrative access without additional approval. |
| Streamlined support | Automatically approves Customer Care access to work on your support cases; other access reasons require Access Approval. |
| Access Approval | Full Access Approval functionality for all accesses. |

### Default settings

| Setting | Behavior |
|---|---|
| Prefer resource specific approval requests | Default scope of requests. Disabled by default (example `product.googleapis.com/project/12345/`); enabled gives resource scope (`product.googleapis.com/project/12345/instances/abcde`) and can increase the number of requests for the same data, possibly delaying Google support. |
| Approval Request Default Expiration Days | Default expiration; can be changed per request at approval time. |
| Preferred maximum scope of access | Largest recommended resource scope a Google administrator should request (for example, Project means Project or Resource level). |

## Notes

- Access Transparency logs are generated automatically for all Access Approval modes.
- Signing key: the default Google-owned key needs no configuration; to use a customer-managed key, see https://docs.cloud.google.com/assured-workloads/access-approval/docs/review-approve-access-requests-custom-keys.
- Clean up: Access Approval is a standard control enabled in an audit-only policy by default (Transparency policy). **Manage settings** > **Remove Settings** restores it. If the resource inherits settings from a parent, removing local settings reverts to the inherited settings, which might not be the system default Transparency policy. Removing settings disables required approvals; try on a disposable project first.
- The source shows Console steps only. The gcloud examples are from the gcloud 593.0.0 help, which also lists these flags: `--approval_policy` takes `transparency`, `streamlined-support`, `access-approval` or `inherit-policy-from-parent`; `--preferred_request_expiration_days` must be between 1 and 30; `--request_scope_max_width_preference` takes `ORGANIZATION`, `FOLDER` or `PROJECT`; `--folder` / `--organization` take a number.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/settings/update (gcloud 593.0.0 help).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/settings/get (gcloud 593.0.0 help).
- Streamlined support automatically approves Customer Care access to work on your support cases without a per-request approval; it is permissive for that access reason only, while other access reasons still require Access Approval.
- Source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/review-approve-access-requests-google-keys (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [approve-requests.md](./approve-requests.md)
- [access-approval-overview.md](./access-approval-overview.md)
- [supported-services.md](./supported-services.md)
- [validate-request-signature.md](./validate-request-signature.md)
