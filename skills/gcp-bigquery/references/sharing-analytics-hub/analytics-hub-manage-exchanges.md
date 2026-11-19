---
source: https://docs.cloud.google.com/bigquery/docs/analytics-hub-manage-exchanges
---

# Manage data exchanges

As a BigQuery sharing (formerly Analytics Hub) administrator you create, update, view, share, and delete data exchanges, manage their access permissions and roles, and make them publicly discoverable. A data exchange is private by default: only users or groups with access can view or subscribe to its listings.

## Signature / Usage

### Enable the Analytics Hub API

Required permissions: `serviceUsage.services.get`, `serviceUsage.services.list`, `serviceUsage.services.enable` (included in Service Usage Admin, `roles/serviceusage.serviceUsageAdmin`).

```bash
gcloud services enable analyticshub.googleapis.com
```

### Create a data exchange

Required role: Analytics Hub Admin (`roles/analyticshub.admin`) on your project. You specify project, region, display name, and optional settings (primary contact, description, Subscriber Email Logging, Public Discoverability). Project and region can't be changed afterwards.

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges?dataExchangeId=DATAEXCHANGE_ID
```

The request body is a `DataExchange` resource. With `logLinkedDatasetQueryUserEmail` set, the response contains `logLinkedDatasetQueryUserEmail: true`; logged principals are in the `job_principal_subject` field of the `INFORMATION_SCHEMA.SHARED_DATASET_USAGE` view.

### Update a data exchange

```text
PATCH https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID?updateMask=UPDATEMASK
```

### View data exchanges

```text
GET https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges
```

Across an organization (the console lists organization-wide exchanges if you have `resourcemanager.organizations.get`):

```text
GET https://analyticshub.googleapis.com/v1/organizations/ORGANIZATION_ID/locations/LOCATION/dataExchanges
```

### Give users access to a data exchange

Read the policy with `projects.locations.dataExchanges.getIamPolicy`:

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID:getIamPolicy
```

Edit the policy. Member formats: `user:test-user@gmail.com`, `group:admins@googlegroups.com`, `serviceAccount:server@example.gserviceaccount.com`, `domain:example.com`. To grant `roles/analyticshub.subscriber` to a group, add this binding:

```json
{
 "members": [
   "group:subscribers@googlegroups.com"
 ],
 "role":"roles/analyticshub.subscriber"
}
```

Set the policy with `projects.locations.dataExchanges.setIamPolicy`, passing the updated policy in the request body:

```text
POST https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID:setIamPolicy
```

### Delete a data exchange

```text
DELETE https://analyticshub.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/dataExchanges/DATAEXCHANGE_ID
```

## Options / Props

### Placeholders

| Name | Description |
|------|-------------|
| `PROJECT_ID` | Project that contains (or will contain) the data exchange |
| `LOCATION` | Location of the data exchange; use lowercase letters; see supported regions in the introduction page |
| `DATAEXCHANGE_ID` | ID of the data exchange |
| `UPDATEMASK` | Comma-separated fields to update, for example `displayName,primaryContact` |
| `ORGANIZATION_ID` | Organization ID |

### Updatable `DataExchange` fields

| Field |
|-------|
| `displayName` |
| `description` |
| `primaryContact` |
| `documentation` |
| `icon` |
| `discoveryType` |
| `logLinkedDatasetQueryUserEmail` |

### Roles for exchange permissions

| Role | Console label |
|------|---------------|
| `roles/analyticshub.admin` | Analytics Hub Admin (Administrators) |
| `roles/analyticshub.listingAdmin` | Analytics Hub Listing Admin |
| `roles/analyticshub.publisher` | Analytics Hub Publisher (Publishers) |
| `roles/analyticshub.subscriber` | Analytics Hub Subscriber (Subscribers) |
| `roles/analyticshub.subscriptionOwner` | Analytics Hub Subscription Owner |
| `roles/analyticshub.viewer` | Analytics Hub Viewer (Viewers) |

## Notes

- Corrected from the official docs: the source writes the response field as `log_linked_dataset_query_user_email`; the REST JSON name is `logLinkedDatasetQueryUserEmail`.
- Source: https://docs.cloud.google.com/bigquery/docs/analytics-hub-manage-exchanges (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The API, gcloud, and IAM names stay `analyticshub`; the console page is "Sharing (Analytics Hub)".
- The source also shows Console steps for create, update, view, share link, permissions, and delete; omitted.
- Caution: avoid creating a data exchange in a project protected by a VPC Service Controls perimeter; if you do, add the appropriate ingress and egress rules (https://docs.cloud.google.com/bigquery/docs/analytics-hub-vpc-sc-rules#create_a_data_exchange).
- Subscriber Email Logging: logs principal identifiers of all users running jobs and queries on linked datasets; all future listings under the exchange get it turned on. After you enable and save it you can't edit this setting; to disable it, delete the exchange and create a new one without it.
- Public discoverability: all listings in the exchange appear and are searchable in the catalog and inherit the setting by default. Public exchanges can't have private listings, but private exchanges can have public listings. The exchange's project must have an associated organization and billing account. Also grant the Analytics Hub Viewer role (`roles/analyticshub.viewer`) to `allUsers` or `allAuthenticatedUsers`.
- Make a data exchange public: grant `allAuthenticatedUsers` the Viewer role (to view listings) and the Subscriber role (to subscribe) at the data exchange level, and turn on Public Discoverability when creating or updating. Granting `allUsers` / `allAuthenticatedUsers` opens discovery (and, with the Subscriber role, subscription) to everyone on the internet / every signed-in Google user. To make an exchange private again, remove `allAuthenticatedUsers` and the associated roles and disable public discoverability.
- When editing the IAM policy, send back the whole policy returned by `getIamPolicy` (including its `etag`) so concurrent changes aren't overwritten.
- For users in external identity providers, replace Google Account principal identifiers (`user:`, `group:`, `domain:`) with Workforce Identity Federation principal identifiers.
- Delete is irreversible ("You can't undo a data exchange deletion"): all listings in the exchange are deleted; shared and linked datasets aren't deleted. Deleting a project doesn't delete its exchanges, so delete all exchanges before shutting down the project. Prerequisites: for Cloud Marketplace-integrated commercial listings, offboard them first; for listings for multiple regions, revoke all active subscriptions first. Try it on a disposable exchange first.
- To manage listings within an exchange see the manage-listings page; organization-level discovery needs `resourcemanager.organizations.get`. A publisher in a different organization can't browse your exchange; share its link (More options > Copy share link).
- To make an administrator for one exchange only, grant `roles/analyticshub.admin` at the data exchange level; to manage all exchanges in a project, grant it at the project level.

## Related

- [analytics-hub-introduction.md](./analytics-hub-introduction.md)
- [analytics-hub-manage-listings.md](./analytics-hub-manage-listings.md)
- [analytics-hub-view-subscribe-listings.md](./analytics-hub-view-subscribe-listings.md)
