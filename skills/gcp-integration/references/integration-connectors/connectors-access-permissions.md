---
source: https://docs.cloud.google.com/integration-connectors/docs/connectors-access-permissions
---

# IAM roles, permissions and service accounts for Integration Connectors

Predefined IAM roles for Integration Connectors, the permission a principal needs to create or update a connection, and guidance for the service account a connection runs as. A connection runs as the service account you specify when creating it.

## Signature / Usage

### Create a connection

Generic steps: in the Cloud console go to **Integration Connectors > Connections**, select or create a project, and click **+ Create new** to open the **Create Connection** page. Most steps are the same for all connectors; the authentication mechanism might vary from connector to connector, so use the corresponding connector page for data-source-specific settings.

Before you begin, ensure you have the `iam.serviceAccounts.actAs` permission on the service account that the connection will use, for example through the Service Account User role (`roles/iam.serviceAccountUser`). Without this permission, you cannot create the connection.

### Grant a role on a service account

An IAM policy binding on a service account is added with `gcloud iam service-accounts add-iam-policy-binding` (example from the gcloud reference):

```bash
gcloud iam service-accounts add-iam-policy-binding \
    my-iam-account@my-project.iam.gserviceaccount.com \
    --member='user:test-user@gmail.com' --role='roles/editor'
```

## Options / Props

### Predefined roles

| Role | Description |
|---|---|
| Connector Admin (`roles/connectors.admin`) | Full access to all resources of the Connectors service, including IAM policy management on connections, custom connectors, endpoint attachments and managed zones. |
| Connectors Editor (`roles/connectors.editor`) | Editor role for connectors; create / update / delete of connections, custom connectors, endpoint attachments, managed zones, event subscriptions, regional settings and settings, plus `connectors.connections.listenEvent`. No `setIamPolicy`. |
| Connectors Viewer (`roles/connectors.viewer`) | Read-only access to all Connectors resources. |
| Custom Connectors Admin (`roles/connectors.customConnectorAdmin`) | Admin access to custom connector and custom connector version resources (a global resource created in the target project). |
| Custom Connector Viewer (`roles/connectors.customConnectorViewer`) | Read-only access to custom connector and version resources. |
| Connectors Endpoint Attachment Admin (`roles/connectors.endpointAttachmentAdmin`) | Admin access to endpoint attachments (a regional resource creating a PSC connection endpoint for a PSC service attachment). |
| Connectors Endpoint Attachment Viewer (`roles/connectors.endpointAttachmentViewer`) | Read-only access to endpoint attachments. |
| Connectors Event Subscriptions Admin (`roles/connectors.eventSubscriptionAdmin`) | Admin access to event subscription resources (regional). |
| Connectors Event Subscriptions Viewer (`roles/connectors.eventSubscriptionViewer`) | Read-only access to event subscriptions (`get`, `list`). |
| Connector Invoker (`roles/connectors.invoker`) | Full access to invoke all operations on connections: actions (`execute`, `list`), `connectors.connections.executeSqlQuery`, entities (create, delete, get, list, update, conditional update / delete) and `connectors.entityTypes.list`. |
| Connector Event Listener (`roles/connectors.listener`) | Listen to events by connections (`connectors.connections.listenEvent`). |
| Connectors Managed Zone Admin (`roles/connectors.managedZoneAdmin`) | Admin access to managed zones (a global resource creating a Cloud DNS peering zone with the target project). |
| Connectors Managed Zone Viewer (`roles/connectors.managedZoneViewer`) | Read-only access to managed zones. |

### Service agent role

| Role | Description |
|---|---|
| Connectors Platform Service Agent (`roles/connectors.serviceAgent`) | Lets the Connectors platform service account manage customer resources (includes `iam.serviceAccounts.getAccessToken`, `getOpenIdToken`, `implicitDelegation` and monitoring write permissions). Grant service agent roles only to service agents. |

### Permission for connection service accounts

| Item | Detail |
|---|---|
| Requirement | The principal that creates or updates a connection (user or service account calling Integration Connectors from the console, Terraform or the API) must have `iam.serviceAccounts.actAs` on the connection's service account. Applies to every connection regardless of authentication type. |
| How to grant | Assign the Service Account User role (`roles/iam.serviceAccountUser`) on the connection's service account. |
| Failure | `FAILED_PRECONDITION` with precondition violation type `SERVICE_ACCOUNT_PERMISSION_DENIED`; the connection is not created or updated; existing connections continue to run. |

## Notes

- Predefined roles: Each role lists many `connectors.*` permissions; the full per-role permission lists are in the IAM reference for the `connectors` service (https://docs.cloud.google.com/iam/docs/roles-permissions/connectors).
- Do not grant `roles/connectors.serviceAgent` to any principal except service agents.
- The member and role in the example are the gcloud reference's sample values; for the connection prerequisite, the role is `roles/iam.serviceAccountUser` on the connection's service account.
- Connections can be reset when the underlying infrastructure is restarted or updated; configure error handling strategies in Application Integration tasks to re-establish the connection.
- Service account guidance: create the service account in the same project as the connector (recommended). Service accounts can be user-managed, default service accounts created by certain services, or service agents; applications can use short-lived credentials or, less securely, service account keys.
- Cross-project service account: using a service account from a project other than the connection's can fail with `PERMISSION_DENIED` ("Permission `iam.serviceAccounts.getAccessToken` denied") because the default permissions of the Integration Connectors service agent (P4SA) do not cross project boundaries. In the project that contains the service account, grant the Service Account Token Creator role (`roles/iam.serviceAccountTokenCreator`) to the Integration Connectors service agent.
- The private network connectivity page names the endpoint attachment and managed zone admin roles `roles/connectors.endpointAttachmentsAdmin` / `roles/connectors.managedZonesAdmin`; the IAM reference lists `roles/connectors.endpointAttachmentAdmin` / `roles/connectors.managedZoneAdmin`, as used here.
- IAM, service accounts and service agents are in `gcp-foundation`; every `connectors` role and permission is listed in the `iam/connectors.md` page of `gcp-integration`.
- Omitted: Console click-paths beyond the first steps, and the per-connector connection settings.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/add-iam-policy-binding
- Source: https://docs.cloud.google.com/integration-connectors/docs/connectors-access-permissions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/integration-connectors/docs/service-account (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/integration-connectors/docs/createconnection (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/connectors (retrieved 2026-11-14; CC BY 4.0)

## Related

- [overview.md](./overview.md)
- [create-custom-connector.md](./create-custom-connector.md)
- [network-connectivity-private.md](./network-connectivity-private.md)
