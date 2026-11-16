---
source: https://docs.cloud.google.com/firestore/native/docs/security/iam
---

# Security for server client libraries

IAM permissions and roles for Firestore. The server client libraries, and REST / RPC requests authorized with a Google Identity OAuth 2.0 token (for example from a service account), are authorized by IAM and bypass Firestore Security Rules. REST requests with a Firebase Authentication ID token, or unauthenticated requests, are evaluated by Security Rules instead (see `firestore-databases-data/use-rest-api.md`).

## Signature / Usage

### Condition granting a role until a date

```json
{
  "role": "roles/datastore.user",
  "members": [
    "user:travis@example.com"
  ],
  "condition": {
    "title": "Expires_December_1_2023",
    "description": "Expires on December 1, 2023",
    "expression":
      "request.time < timestamp('2023-12-01T00:00:00.000Z')"
  }
}
```

### Restore the Firestore Security Rules service account binding

Security rules for mobile/web clients depend on service account `service-project_number@firebase-rules.iam.gserviceaccount.com` with role `roles/firebaserules.system`. If the role is removed, security rules deny all requests. Use the gcloud CLI (the role is hidden in the console by default):

```bash
gcloud projects add-iam-policy-binding project_id \
--member=serviceAccount:service-project_number@firebase-rules.iam.gserviceaccount.com \
--role=roles/firebaserules.system
```

## Options / Props

### Required permissions for API methods

| Method | Required permissions |
|---|---|
| documents `batchGet`, `get` | `datastore.entities.get` |
| documents `batchWrite` / `commit` / `write (RPC)` update or transform, exists precondition `false` | `datastore.entities.create` |
| `batchWrite` update or transform, exists precondition `true` | `datastore.entities.create` |
| `commit` / `write (RPC)` update or transform, exists precondition `true` | `datastore.entities.update` |
| `batchWrite` / `commit` / `write (RPC)` update or transform, no precondition | `datastore.entities.create`, `datastore.entities.update` |
| `commit` delete, `write (RPC)` delete, documents `delete` | `datastore.entities.delete` |
| `beginTransaction`, `rollback` | `datastore.databases.get` |
| `createDocument` | `datastore.entities.create` |
| `list`, `partitionQuery`, `runAggregationQuery`, `runQuery` | `datastore.entities.get`, `datastore.entities.list` |
| `listCollectionIds` | `datastore.entities.list` |
| `patch` | `datastore.entities.update` |
| `executePipeline (RPC)` stages `collection(...)`, `collection_group(...)`, `database()` | `datastore.entities.get`, `datastore.entities.list` |
| `executePipeline (RPC)` stage `documents(...)` / `update(...)` / `delete(...)` | `datastore.entities.get` / `datastore.entities.update` / `datastore.entities.delete` |
| indexes `create` / `delete` / `get` / `list` | `datastore.schemas.create` / `.delete` / `.get` / `.list` |
| databases `create` | `datastore.databases.create`; with `tags` also `datastore.databases.createTagBinding`; to verify bindings also `datastore.databases.listTagBindings`, `datastore.databases.listEffectiveTags` |
| databases `clone` | `datastore.databases.clone`; same extra tag permissions as `create` |
| databases `delete` / `get` / `list` / `patch` | `datastore.databases.delete` / `datastore.databases.getMetadata` / `datastore.databases.list` / `datastore.databases.update` |
| databases restore | `datastore.backups.restoreDatabase` |
| locations `get` / `list` | `datastore.locations.get` / `datastore.locations.list` |
| backupschedules get / list / create / update / delete | `datastore.backupSchedules.get` / `.list` / `.create` / `.update` / `.delete` |
| backups get / list / delete | `datastore.backups.get` / `.list` / `.delete` |

### Predefined roles

| Role | Permissions | Description |
|---|---|---|
| `roles/datastore.owner` | `appengine.applications.get` `datastore.*` `resourcemanager.projects.get` `resourcemanager.projects.list` | Full access to Firestore. |
| `roles/datastore.user` | `appengine.applications.get` `datastore.databases.get` `datastore.databases.getMetadata` `datastore.databases.list` `datastore.entities.*` `datastore.schemas.list` `datastore.namespaces.get` `datastore.namespaces.list` `datastore.statistics.get` `datastore.statistics.list` `resourcemanager.projects.get` `resourcemanager.projects.list` | Read/write access to data in a Firestore database. Intended for application developers and service accounts. |
| `roles/datastore.viewer` | `appengine.applications.get` `datastore.databases.get` `datastore.databases.getMetadata` `datastore.databases.list` `datastore.entities.get` `datastore.entities.list` `datastore.schemas.get` `datastore.schemas.list` `datastore.namespaces.get` `datastore.namespaces.list` `datastore.statistics.get` `datastore.statistics.list` `resourcemanager.projects.get` `resourcemanager.projects.list` `datastore.insights.get` | Read access to all Firestore resources. |
| `roles/datastore.importExportAdmin` | `appengine.applications.get` `datastore.databases.export` `datastore.databases.getMetadata` `datastore.databases.import` `datastore.operations.cancel` `datastore.operations.get` `datastore.operations.list` `resourcemanager.projects.get` `resourcemanager.projects.list` | Full access to manage imports and exports. |
| `roles/datastore.bulkAdmin` | `resourcemanager.projects.get` `resourcemanager.projects.list` `datastore.databases.getMetadata` `datastore.databases.bulkDelete` `datastore.operations.cancel` `datastore.operations.get` `datastore.operations.list` | Full access to manage bulk operations. |
| `roles/datastore.indexAdmin` | `appengine.applications.get` `datastore.databases.getMetadata` `datastore.schemas.*` `datastore.operations.list` `datastore.operations.get` `resourcemanager.projects.get` `resourcemanager.projects.list` | Full access to manage index definitions. |
| `roles/datastore.keyVisualizerViewer` | `datastore.databases.getMetadata` `datastore.keyVisualizerScans.get` `datastore.keyVisualizerScans.list` `resourcemanager.projects.get` `resourcemanager.projects.list` | Full access to Key Visualizer scans. |
| `roles/datastore.backupSchedulesViewer` | `datastore.backupSchedules.get` `datastore.backupSchedules.list` | Read access to backup schedules in a Firestore database. |
| `roles/datastore.backupSchedulesAdmin` | `datastore.backupSchedules.get` `.list` `.create` `.update` `.delete` `datastore.databases.list` `datastore.databases.getMetadata` | Full access to backup schedules in a Firestore database. |
| `roles/datastore.backupsViewer` | `datastore.backups.get` `datastore.backups.list` | Read access to backup information in a Firestore location. |
| `roles/datastore.backupsAdmin` | `datastore.backups.get` `datastore.backups.list` `datastore.backups.delete` | Full access to backups in a Firestore location. |
| `roles/datastore.restoreAdmin` | `datastore.backups.get` `datastore.backups.list` `datastore.backups.restoreDatabase` `datastore.databases.list` `datastore.databases.create` `datastore.databases.getMetadata` `datastore.operations.list` `datastore.operations.get` | Restore a Firestore backup into a new database. Also gives the ability to create new databases, not necessarily by restoring from a backup. |
| `roles/datastore.cloneAdmin` | `datastore.databases.clone` `datastore.databases.list` `datastore.databases.create` `datastore.databases.getMetadata` `datastore.operations.list` `datastore.operations.get` | Clone a Firestore database into a new database. Also gives the ability to create new databases, not necessarily by cloning. |
| `roles/datastore.statisticsViewer` | `resourcemanager.projects.get` `resourcemanager.projects.list` `datastore.databases.getMetadata` `datastore.insights.get` `datastore.keyVisualizerScans.get` `datastore.keyVisualizerScans.list` `datastore.statistics.list` `datastore.statistics.get` | Read access to Insights, Stats, and Key Visualizer scans. |

### Permissions

| Permission | Description |
|---|---|
| `datastore.databases.get` | Begin or rollback a transaction. |
| `datastore.databases.import` / `.export` / `.bulkDelete` | Import entities into / export entities from / bulk delete entities from a database. |
| `datastore.databases.getMetadata` / `.list` | Read metadata from a database / list databases in a project. |
| `datastore.databases.create` / `.update` / `.delete` / `.clone` | Create / update / delete / clone a database. |
| `datastore.databases.createTagBinding` / `.deleteTagBinding` / `.listTagBindings` / `.listEffectiveTags` | Create / delete / list tag bindings / list effective tags for a database. |
| `datastore.entities.create` / `.delete` / `.get` / `.update` | Create / delete / read / update a document. |
| `datastore.entities.list` | List the names of documents in a project (`datastore.entities.get` is required to access the document data). |
| `datastore.schemas.create` / `.delete` / `.get` / `.list` / `.update` | Create / delete / read metadata of / list / update an index. |
| `datastore.operations.cancel` / `.delete` / `.get` / `.list` | Cancel / delete / get / list long-running operations. |
| `resourcemanager.projects.get` / `.list` | Browse resources in the project / list owned projects. |
| `datastore.locations.get` / `.list` | Get / list database locations; required to create a new database. |
| `datastore.keyVisualizerScans.get` / `.list` | Get / list Key Visualizer scans. |
| `datastore.backupSchedules.get` / `.list` / `.create` / `.update` / `.delete` | Get / list / create / update / delete a backup schedule. |
| `datastore.backups.get` / `.list` / `.delete` / `.restoreDatabase` | Get / list / delete a backup / restore a database from a backup. |
| `datastore.insights.get` | Get insights of a resource. |

## Notes

- Firestore caches IAM permissions for 5 minutes; a role change takes up to 5 minutes to take effect.
- Some Firestore permissions differ from the standard IAM model: `datastore.databases.get` lets you begin or roll back a transaction; use `datastore.databases.getMetadata` to retrieve database information. `datastore.schemas.*` was previously `datastore.indexes.*`; `datastore.indexes` still works as an alias.
- Tag operations need `datastore.databases.createTagBinding` on the database being tagged; viewing tags needs `datastore.databases.listTagBindings` and `datastore.databases.listEffectiveTags`.
- The method table above is condensed; the source lists each REST / RPC method on its own row with links.
- Removing `roles/firebaserules.system` from the Firebase rules service account makes security rules deny all requests. In the gcloud command, replace `project_id` and `project_number` with your own values.
- Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). IAM concepts: `gcp-foundation`.
- Source inconsistency: the source's permissions table names `datastore.databases.listEffectiveTagBindings`, while its method table (`create`, `clone`) and the IAM roles reference (see `references/iam/firestore.md`) use `datastore.databases.listEffectiveTags`; this page uses `listEffectiveTags`.
- Source: https://docs.cloud.google.com/firestore/native/docs/security/iam (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-started.md](./get-started.md)
- [cmek.md](./cmek.md)
