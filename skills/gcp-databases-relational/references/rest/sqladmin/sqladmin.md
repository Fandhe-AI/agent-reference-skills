---
source: https://sqladmin.googleapis.com/$discovery/rest?version=v1
---

# Cloud SQL Admin API REST API (sqladmin)

## Signature / Usage

Base URL: `https://sqladmin.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `sql.Backups.CreateBackup`

- Versions: v1
- `POST https://sqladmin.googleapis.com/v1/{+parent}/backups`
- Creates a backup for a Cloud SQL instance. This API can be used only to create on-demand backups.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this backup is created. Format: projects/{project} |

### `sql.Backups.DeleteBackup`

- Versions: v1
- `DELETE https://sqladmin.googleapis.com/v1/{+name}`
- Deletes the backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the backup to delete. Format: projects/{project}/backups/{backup} |

### `sql.Backups.GetBackup`

- Versions: v1
- `GET https://sqladmin.googleapis.com/v1/{+name}`
- Retrieves a resource containing information about a backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the backup to retrieve. Format: projects/{project}/backups/{backup} |

### `sql.Backups.ListBackups`

- Versions: v1
- `GET https://sqladmin.googleapis.com/v1/{+parent}/backups`
- Lists all backups associated with the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent that owns this collection of backups. Format: projects/{project} |
| `filter` | query | string | no | Multiple filter queries are separated by spaces. For example, 'instance:abc AND type:FINAL, 'location:us', 'backupInterval.startTime>=1950-01-01T01:01:25.771Z'. You can filter by type, instance, backupInterval.startTime (creation time), or location. |
| `pageSize` | query | integer (int32) | no | The maximum number of backups to return per response. The service might return fewer backups than this value. If a value for this parameter isn't specified, then, at most, 500 backups are returned. The maximum value is 2,000. Any values that you set, which are greater than 2,000, are changed to 2,000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListBackups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBackups` must match the call that provided the page token. |

### `sql.Backups.UpdateBackup`

- Versions: v1
- `PATCH https://sqladmin.googleapis.com/v1/{+name}`
- Updates the retention period and description of the backup. You can use this API to update final backups only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the backup. Format: projects/{project}/backups/{backup}. |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields that you can update. You can update only the description and retention period of the final backup. |

### `sql.backupRuns.delete`

- Versions: v1, v1beta4
- `DELETE https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/backupRuns/{id}`
- Deletes the backup taken by a backup run.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `id` | path | string (int64) | yes | The ID of the backup run to delete. To find a backup run ID, use the list (https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1/backupRuns/list) method. |

### `sql.backupRuns.get`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/backupRuns/{id}`
- Retrieves a resource containing information about a backup run.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `BackupRun`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `id` | path | string (int64) | yes | The ID of this backup run. |

### `sql.backupRuns.insert`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/backupRuns`
- Creates a new backup run on demand.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `BackupRun`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |

### `sql.backupRuns.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/backupRuns`
- Lists all backup runs associated with the project or a given instance and configuration in the reverse chronological order of the backup initiation time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `BackupRunsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID, or "-" for all instances. This does not include the project ID. |
| `maxResults` | query | integer (int32) | no | Maximum number of backup runs per response. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |

### `sql.backups.createBackup`

- Versions: v1beta4
- `POST https://sqladmin.googleapis.com/sql/v1beta4/{+parent}/backups`
- Creates a backup for a Cloud SQL instance. This API can be used only to create on-demand backups.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this backup is created. Format: projects/{project} |

### `sql.backups.deleteBackup`

- Versions: v1beta4
- `DELETE https://sqladmin.googleapis.com/sql/v1beta4/{+name}`
- Deletes the backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the backup to delete. Format: projects/{project}/backups/{backup} |

### `sql.backups.getBackup`

- Versions: v1beta4
- `GET https://sqladmin.googleapis.com/sql/v1beta4/{+name}`
- Retrieves a resource containing information about a backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the backup to retrieve. Format: projects/{project}/backups/{backup} |

### `sql.backups.listBackups`

- Versions: v1beta4
- `GET https://sqladmin.googleapis.com/sql/v1beta4/{+parent}/backups`
- Lists all backups associated with the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent that owns this collection of backups. Format: projects/{project} |
| `filter` | query | string | no | Multiple filter queries are separated by spaces. For example, 'instance:abc AND type:FINAL, 'location:us', 'backupInterval.startTime>=1950-01-01T01:01:25.771Z'. You can filter by type, instance, backupInterval.startTime (creation time), or location. |
| `pageSize` | query | integer (int32) | no | The maximum number of backups to return per response. The service might return fewer backups than this value. If a value for this parameter isn't specified, then, at most, 500 backups are returned. The maximum value is 2,000. Any values that you set, which are greater than 2,000, are changed to 2,000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListBackups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBackups` must match the call that provided the page token. |

### `sql.backups.updateBackup`

- Versions: v1beta4
- `PATCH https://sqladmin.googleapis.com/sql/v1beta4/{+name}`
- Updates the retention period and the description of the backup. You can use this API to update final backups only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the backup. Format: projects/{project}/backups/{backup}. |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields that you can update. You can update only the description and retention period of the final backup. |

### `sql.blueGreenDeployments.create`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/{+parent}/blueGreenDeployments`
- Creates a blue-green deployment under a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `BlueGreenDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this blue-green deployment will be created. Format: projects/{project}/locations/{location} |
| `blueGreenDeploymentId` | query | string | yes | Required. The ID to use for the blue-green deployment, which will become the final component of the deployment's resource name. The ID must be unique within the given project and location and between 2-63 characters. |

### `sql.blueGreenDeployments.delete`

- Versions: v1, v1beta4
- `DELETE https://sqladmin.googleapis.com/v1/{+name}`
- Deletes a blue-green deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the blue-green deployment to delete. Format: projects/{project}/locations/{location}/blueGreenDeployments/{blue_green_deployment} |
| `deleteOldSource` | query | boolean | no | Optional. If set to true, and the switchover is complete, this deletes the old source instance along with the deployment. |

### `sql.blueGreenDeployments.get`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/{+name}`
- Retrieves a blue-green deployment resource under a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `BlueGreenDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the blue-green deployment to retrieve. Format: projects/{project}/locations/{location}/blueGreenDeployments/{blue_green_deployment} |
| `view` | query | string enum | no | Optional. Specifies whether to return the basic or detailed view of the resource in the response. Values: `BLUE_GREEN_DEPLOYMENT_VIEW_UNSPECIFIED`, `BASIC`, `DETAILED`. |

### `sql.blueGreenDeployments.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/{+parent}/blueGreenDeployments`
- Lists blue-green deployments under a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `ListBlueGreenDeploymentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose blue-green deployments are to be listed. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters the results. |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields to order the results by. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of deployments to return. The service may return fewer deployments than this value. If unspecified, at most 500 deployments are returned. The maximum value is 1000; values above 1000 are treated as 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListBlueGreenDeployments` call. Provide this to retrieve the subsequent page. |

### `sql.blueGreenDeployments.switchover`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/{+name}:switchover`
- Switches over to green instance for a blue-green deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `SwitchoverBlueGreenDeploymentRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the blue-green deployment to switch over. Format: projects/{project}/locations/{location}/blueGreenDeployments/{blue_green_deployment} |

### `sql.connect.generateEphemeral`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}:generateEphemeralCert`
- Generates a short-lived X509 certificate containing the provided public key and signed by a private key specific to the target instance. Users may use the certificate to authenticate as themselves when connecting to the database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `GenerateEphemeralCertRequest`; Response: `GenerateEphemeralCertResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |

### `sql.connect.get`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/connectSettings`
- Retrieves connect settings about a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `ConnectSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `readTime` | query | string (google-datetime) | no | Optional. Optional snapshot read timestamp to trade freshness for performance. |

### `sql.connect.resolve`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/locations/{location}/dns/{dnsName}:resolveConnectSettings`
- Retrieves connect settings about a Cloud SQL instance using the instance DNS name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `ConnectSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The region of the instance. |
| `dnsName` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |

### `sql.databases.delete`

- Versions: v1, v1beta4
- `DELETE https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/databases/{database}`
- Deletes a database from a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `database` | path | string | yes | Name of the database to be deleted in the instance. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.databases.get`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/databases/{database}`
- Retrieves a resource containing information about a database inside a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Database`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `database` | path | string | yes | Name of the database in the instance. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.databases.insert`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/databases`
- Inserts a resource containing information about a database inside a Cloud SQL instance. \*\*Note:\*\* You can't modify the default character set and collation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `Database`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.databases.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/databases`
- Lists databases in the specified Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `DatabasesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.databases.patch`

- Versions: v1, v1beta4
- `PATCH https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/databases/{database}`
- Partially updates a resource containing information about a database inside a Cloud SQL instance. This method supports patch semantics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `Database`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `database` | path | string | yes | Name of the database to be updated in the instance. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.databases.update`

- Versions: v1, v1beta4
- `PUT https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/databases/{database}`
- Updates a resource containing information about a database inside a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `Database`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `database` | path | string | yes | Name of the database to be updated in the instance. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.flags.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/flags`
- Lists all available database flags for Cloud SQL instances.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `FlagsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `databaseVersion` | query | string | no | Database type and version you want to retrieve flags for. By default, this method returns flags for all database types and versions. |
| `flagScope` | query | string enum | no | Optional. Specify the scope of flags to be returned by SqlFlagsListService. Return list of database flags if unspecified. Values: `SQL_FLAG_SCOPE_UNSPECIFIED`, `SQL_FLAG_SCOPE_DATABASE`, `SQL_FLAG_SCOPE_CONNECTION_POOL`. |

### `sql.instances.ListEntraIdCertificates`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/listEntraIdCertificates`
- Lists all versions of EntraID certificates for the specified instance. There can be up to three sets of certificates listed: the certificate that is currently in use, a future that has been added but not yet used to sign a certificate, and a certificate that has been rotated out.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `InstancesListEntraIdCertificatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.ListServerCertificates`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/listServerCertificates`
- Lists all versions of server certificates and certificate authorities (CAs) for the specified instance. There can be up to three sets of certs listed: the certificate that is currently in use, a future that has been added but not yet used to sign a certificate, and a certificate that has been rotated out. For instances not using Certificate Authority Service (CAS) server CA, use ListServerCas instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `InstancesListServerCertificatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.RotateEntraIdCertificate`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/rotateEntraIdCertificate`
- Rotates the server certificate version to one previously added with the addEntraIdCertificate method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesRotateEntraIdCertificateRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.RotateServerCertificate`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/rotateServerCertificate`
- Rotates the server certificate version to one previously added with the addServerCertificate method. For instances not using Certificate Authority Service (CAS) server CA, use RotateServerCa instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesRotateServerCertificateRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.acquireSsrsLease`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/acquireSsrsLease`
- Acquire a lease for the setup of SQL Server Reporting Services (SSRS).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesAcquireSsrsLeaseRequest`; Response: `SqlInstancesAcquireSsrsLeaseResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance (Example: project-id). |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This doesn't include the project ID. It's composed of lowercase letters, numbers, and hyphens, and it must start with a letter. The total length must be 98 characters or less (Example: instance-id). |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.addEntraIdCertificate`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/addEntraIdCertificate`
- Adds a new Entra ID certificate for the specified instance. If an Entra ID certificate was previously added but never used in a certificate rotation, this operation replaces that version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.addServerCa`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/addServerCa`
- Adds a new trusted Certificate Authority (CA) version for the specified instance. Required to prepare for a certificate rotation. If a CA version was previously added but never used in a certificate rotation, this operation replaces that version. There cannot be more than one CA version waiting to be rotated in. For instances that have enabled Certificate Authority Service (CAS) based server CA, use AddServerCertificate to add a new server certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.addServerCertificate`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/addServerCertificate`
- Add a new trusted server certificate version for the specified instance using Certificate Authority Service (CAS) server CA. Required to prepare for a certificate rotation. If a server certificate version was previously added but never used in a certificate rotation, this operation replaces that version. There cannot be more than one certificate version waiting to be rotated in. For instances not using CAS server CA, use AddServerCa instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.clone`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/clone`
- Creates a Cloud SQL instance as a clone of the source instance. Using this operation might cause your instance to restart.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesCloneRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the source Cloud SQL instance. |
| `instance` | path | string | yes | Required. The ID of the Cloud SQL instance to be cloned (source). This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.delete`

- Versions: v1, v1beta4
- `DELETE https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}`
- Deletes a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance to be deleted. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `enableFinalBackup` | query | boolean | no | Flag to opt-in for final backup. By default, it is turned off. |
| `finalBackupDescription` | query | string | no | Optional. The description of the final backup. |
| `finalBackupExpiryTime` | query | string (google-datetime) | no | Optional. Final Backup expiration time. Timestamp in UTC of when this resource is considered expired. |
| `finalBackupTtlDays` | query | string (int64) | no | Optional. Retention period of the final backup. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.demote`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/demote`
- Demotes an existing standalone instance to be a Cloud SQL read replica for an external database server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesDemoteRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance name. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.demoteMaster`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/demoteMaster`
- Demotes the stand-alone instance to be a Cloud SQL read replica for an external database server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesDemoteMasterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance name. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.executeSql`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/executeSql`
- Execute SQL statements.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `ExecuteSqlPayload`; Response: `SqlInstancesExecuteSqlResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Database instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.export`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/export`
- Exports data from a Cloud SQL instance to a Cloud Storage bucket as a SQL dump or CSV file.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InstancesExportRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance to be exported. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.failover`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/failover`
- Initiates a manual failover of a high availability (HA) primary instance to a standby instance, which becomes the primary instance. Users are then rerouted to the new primary. For more information, see the Overview of high availability (https://cloud.google.com/sql/docs/mysql/high-availability) page in the Cloud SQL documentation. If using Legacy HA (MySQL only), this causes the instance to failover to its failover replica instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesFailoverRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the read replica. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.get`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}`
- Retrieves a resource containing information about a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `DatabaseInstance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Database instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.import`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/import`
- Imports data into a Cloud SQL instance from a SQL dump or CSV file in Cloud Storage.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InstancesImportRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.insert`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances`
- Creates a new Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `DatabaseInstance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project to which the newly created Cloud SQL instances should belong. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances`
- Lists instances under a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `InstancesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project for which to list Cloud SQL instances. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. The expression is in the form of field:value. For example, 'instanceType:CLOUD_SQL_INSTANCE'. Fields can be nested as needed as per their JSON representation, such as 'settings.userLabels.auto_start:true'. Multiple filter queries are space-separated. For example. 'state:RUNNABLE instanceType:CLOUD_SQL_INSTANCE'. By default, each expression is an AND expression. However, you can include AND and OR expressions explicitly. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |
| `maxResults` | query | integer (uint32) | no | The maximum number of instances to return. The service may return fewer than this value. If unspecified, at most 500 instances are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |

### `sql.instances.listServerCas`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/listServerCas`
- Lists all of the trusted Certificate Authorities (CAs) for the specified instance. There can be up to three CAs listed: the CA that was used to sign the certificate that is currently in use, a CA that has been added but not yet used to sign a certificate, and a CA used to sign a certificate that has previously rotated out.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `InstancesListServerCasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.patch`

- Versions: v1, v1beta4
- `PATCH https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}`
- Partially updates settings of a Cloud SQL instance by merging the request with the current configuration. This method supports patch semantics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `DatabaseInstance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |
| `reconcilePscNetworking` | query | boolean | no | Optional. Set PSC config to the same value as the existing config to reconcile the PSC networking. |
| `reconcilePscNetworkingForce` | query | boolean | no | Optional. Set PSC config to the same value as the existing config and force reconcile the PSC networking. |

### `sql.instances.pointInTimeRestore`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/{+parent}:pointInTimeRestore`
- Point in time restore for an instance managed by Google Cloud Backup and Disaster Recovery.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `PointInTimeRestoreContext`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where you created this instance. Format: projects/{project} |

### `sql.instances.preCheckMajorVersionUpgrade`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/preCheckMajorVersionUpgrade`
- Execute MVU Pre-checks
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesPreCheckMajorVersionUpgradeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.promoteReplica`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/promoteReplica`
- Promotes the read replica instance to be an independent Cloud SQL primary instance. Using this operation might cause your instance to restart.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the read replica. |
| `instance` | path | string | yes | Cloud SQL read replica instance name. |
| `failover` | query | boolean | no | Set to true to invoke a replica failover to the DR replica. As part of replica failover, the promote operation attempts to add the original primary instance as a replica of the promoted DR replica when the original primary instance comes back online. If set to false or not specified, then the original primary instance becomes an independent Cloud SQL primary instance. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.reencrypt`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/reencrypt`
- Reencrypt CMEK instance with latest key version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesReencryptRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.releaseSsrsLease`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/releaseSsrsLease`
- Release a lease for the setup of SQL Server Reporting Services (SSRS).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `SqlInstancesReleaseSsrsLeaseResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. The project ID that contains the instance. |
| `instance` | path | string | yes | Required. The Cloud SQL instance ID. This doesn't include the project ID. The instance ID contains lowercase letters, numbers, and hyphens, and it must start with a letter. This ID can have a maximum length of 98 characters. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.resetSslConfig`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/resetSslConfig`
- Deletes all client certificates and generates a new server SSL certificate for the instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |
| `mode` | query | string enum | no | Optional. Reset SSL mode to use. Values: `RESET_SSL_MODE_UNSPECIFIED`, `ALL`, `SYNC_FROM_PRIMARY`. |

### `sql.instances.restart`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/restart`
- Restarts a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance to be restarted. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.restoreBackup`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/restoreBackup`
- Restores a backup of a Cloud SQL instance. Using this operation might cause your instance to restart.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesRestoreBackupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.rotateServerCa`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/rotateServerCa`
- Rotates the server certificate to one signed by the Certificate Authority (CA) version previously added with the addServerCA method. For instances that have enabled Certificate Authority Service (CAS) based server CA, use RotateServerCertificate to rotate the server certificate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesRotateServerCaRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.startReplica`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/startReplica`
- Starts the replication in the read replica instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the read replica. |
| `instance` | path | string | yes | Cloud SQL read replica instance name. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.stopReplica`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/stopReplica`
- Stops the replication in the read replica instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the read replica. |
| `instance` | path | string | yes | Cloud SQL read replica instance name. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.switchover`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/switchover`
- Switches over from the primary instance to the DR replica instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the replica. |
| `instance` | path | string | yes | Cloud SQL read replica instance name. |
| `dbTimeout` | query | string (google-duration) | no | Optional. (MySQL and PostgreSQL only) Cloud SQL instance operations timeout, which is a sum of all database operations. Default value is 10 minutes and can be modified to a maximum value of 24 hours. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.truncateLog`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/truncateLog`
- Truncate MySQL general and slow query log tables MySQL only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `InstancesTruncateLogRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the Cloud SQL project. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.instances.update`

- Versions: v1, v1beta4
- `PUT https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}`
- Updates settings of a Cloud SQL instance. Using this operation might cause your instance to restart.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `DatabaseInstance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.operations.cancel`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/operations/{operation}/cancel`
- Cancels an instance operation that has been performed on an instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `operation` | path | string | yes | Instance operation ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.operations.get`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/operations/{operation}`
- Retrieves an instance operation that has been performed on an instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `operation` | path | string | yes | Required. Instance operation ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.operations.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/operations`
- Lists all instance operations that have been performed on the given Cloud SQL instance in the reverse chronological order of the start time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `OperationsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | query | string | no | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |
| `maxResults` | query | integer (uint32) | no | Maximum number of operations per response. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |

### `sql.projects.instances.getDiskShrinkConfig`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/getDiskShrinkConfig`
- Get Disk Shrink Config for a given instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `SqlInstancesGetDiskShrinkConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.projects.instances.getLatestRecoveryTime`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/getLatestRecoveryTime`
- Get Latest Recovery Time for a given instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `SqlInstancesGetLatestRecoveryTimeResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |
| `sourceInstanceDeletionTime` | query | string (google-datetime) | no | The timestamp used to identify the time when the source instance is deleted. If this instance is deleted, then you must set the timestamp. |

### `sql.projects.instances.performDiskShrink`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/performDiskShrink`
- Perform Disk Shrink on primary instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `PerformDiskShrinkContext`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.projects.instances.rescheduleMaintenance`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/rescheduleMaintenance`
- Reschedules the maintenance on the given instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `SqlInstancesRescheduleMaintenanceRequestBody`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.projects.instances.resetReplicaSize`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/resetReplicaSize`
- Reset Replica Size to primary instance disk size.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `SqlInstancesResetReplicaSizeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the read replica. |
| `instance` | path | string | yes | Cloud SQL read replica instance name. |

### `sql.projects.instances.startExternalSync`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/startExternalSync`
- Start External primary instance migration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `SqlInstancesStartExternalSyncRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |

### `sql.projects.instances.verifyExternalSyncSettings`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/verifyExternalSyncSettings`
- Verify External primary instance external sync settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `SqlInstancesVerifyExternalSyncSettingsRequest`; Response: `SqlInstancesVerifyExternalSyncSettingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |

### `sql.sslCerts.createEphemeral`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/createEphemeral`
- Generates a short-lived X509 certificate containing the provided public key and signed by a private key specific to the target instance. Users may use the certificate to authenticate as themselves when connecting to the database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `SslCertsCreateEphemeralRequest`; Response: `SslCert`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the Cloud SQL project. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.sslCerts.delete`

- Versions: v1, v1beta4
- `DELETE https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/sslCerts/{sha1Fingerprint}`
- Deletes the SSL certificate. For First Generation instances, the certificate remains valid until the instance is restarted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `sha1Fingerprint` | path | string | yes | Sha1 FingerPrint. |

### `sql.sslCerts.get`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/sslCerts/{sha1Fingerprint}`
- Retrieves a particular SSL certificate. Does not include the private key (required for usage). The private key must be saved from the response to initial creation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `SslCert`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |
| `sha1Fingerprint` | path | string | yes | Sha1 FingerPrint. |

### `sql.sslCerts.insert`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/sslCerts`
- Creates an SSL certificate and returns it along with the private key and server certificate authority. The new certificate will not be usable until the instance is restarted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `SslCertsInsertRequest`; Response: `SslCertsInsertResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |

### `sql.sslCerts.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/sslCerts`
- Lists all of the current SSL certificates for the instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `SslCertsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Cloud SQL instance ID. This does not include the project ID. |

### `sql.tiers.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/tiers`
- Lists all available machine types (tiers) for Cloud SQL, for example, `db-custom-1-3840`. For more information, see https://cloud.google.com/sql/pricing.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `TiersListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project for which to list tiers. |

### `sql.users.delete`

- Versions: v1, v1beta4
- `DELETE https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/users`
- Deletes a user from a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `host` | query | string | no | Host of the user in the instance. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |
| `name` | query | string | no | Name of the user in the instance. |

### `sql.users.get`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/users/{name}`
- Retrieves a resource containing information about a user.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `User`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `name` | path | string | yes | User of the instance. |
| `host` | query | string | no | Host of a user of the instance. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.users.insert`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/users`
- Creates a new user in a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `User`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.users.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/users`
- Lists users in the specified Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `UsersListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |

### `sql.users.update`

- Versions: v1, v1beta4
- `PUT https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/users`
- Updates an existing user in a Cloud SQL instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `User`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Database instance ID. This does not include the project ID. |
| `databaseRoles` | query | repeated string | no | Optional. List of database roles to grant to the user. body.database_roles will be ignored for update request. |
| `host` | query | string | no | Optional. Host of the user in the instance. |
| `location` | query | string | no | Optional. Region of the Cloud SQL instance. |
| `name` | query | string | no | Name of the user in the instance. |
| `revokeExistingRoles` | query | boolean | no | Optional. Specifies whether to revoke existing roles that are not present in the `database_roles` field. If `false` or unset, the database roles specified in `database_roles` are added to the user's existing roles. |
| `revokeExistingServerRoles` | query | boolean | no | Optional. Specifies whether to revoke existing roles that are not present in the `server_roles` field. If `false` or unset, the server roles specified in `server_roles` are added to the user's existing server roles. |
| `serverRoles` | query | repeated string | no | Optional. The server roles to grant to the SQL Server login. Existing server roles will not be revoked if revoke_existing_roles is false. body.server_roles will be ignored for update request. |

### `sql.workloadCaptures.list`

- Versions: v1, v1beta4
- `GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/workloadCaptures`
- Lists all captured workloads associated with the instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: —; Response: `WorkloadCapturesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |

### `sql.workloadCaptures.start`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/workloadCaptures:start`
- Starts capturing the SQL queries, transactions, and other operations executed on the primary instance. This traffic is securely stored and forms a "captured workload". This workload can be replayed later on a different instance to safely test performance impacts, database upgrades, configuration changes etc. before applying them to production.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `WorkloadCapturesStartRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |

### `sql.workloadCaptures.startReplay`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/workloadCaptures/{workloadId}:startReplay`
- Starts executing a captured workload on a separate Cloud SQL instance provisioned for workload replay. This target instance simulates the production environment without affecting the primary instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `WorkloadCapturesStartReplayRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |
| `workloadId` | path | string | yes | Required. The ID of the workload to replay. |

### `sql.workloadCaptures.stop`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/workloadCaptures:stop`
- Stops capturing the query traffic and related operations executed on the primary instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `WorkloadCapturesStopRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID. This does not include the project ID. |

### `sql.workloadCaptures.stopReplay`

- Versions: v1, v1beta4
- `POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/workloadCaptures:stopReplay`
- Stops an active workload replay on the target Cloud SQL replay instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/sqlservice.admin`
- Request: `WorkloadCapturesStopReplayRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID of the project that contains the target replay instance. |
| `instance` | path | string | yes | Required. Cloud SQL instance ID of the target replay instance. This does not include the project ID. |

### Example request skeleton

Generated from the Discovery entry of `sql.Backups.GetBackup` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://sqladmin.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta4 of `sqladmin` (retrieved 2026-11-14). Resources on this page: Backups, backupRuns, backups, blueGreenDeployments, connect, databases, flags, instances, operations, projects, sslCerts, tiers, users, workloadCaptures.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/sqladmin/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://sqladmin.googleapis.com/$discovery/rest?version=v1, https://sqladmin.googleapis.com/$discovery/rest?version=v1beta4 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
