---
source: https://docs.cloud.google.com/workload-manager/docs/deploy/sap/deploy-sap
---

# Deploy an SAP S/4HANA application

Use the Guided Deployment Automation tool in the Workload Manager console (**Deployments**, **Create deployment**, **SAP**) to configure and deploy an SAP S/4HANA workload. The deployment can take up to two or three hours.

## Signature / Usage

Optional, required only if your organization enforces VPC Service Controls compliance: in the **Private pool** field, give the name of a Cloud Build private pool configured for VPC Service Controls.

```text
projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID
```

Existing shared storage is specified in the **Shared storage** field in this format.

```text
IP_ADDRESS/STORAGE_NAME
```

## Options / Props

### Deployment basics

| Field | Description |
|-------|-------------|
| Name | Names the workload (example "S4-Prod-EP1"). Must be unique in the current project and is involved in naming some deployed resources. A maximum of 25 characters is allowed. |
| Description | Optional; displayed on the dashboard for your deployment. |
| Service account | Attached to the deployment; used to call other APIs and services for creating required resources. Select an existing one or click **New service account**; click **Grant** if roles are missing. |
| Ansible Runner service account | Service account for the temporary Ansible Runner VM created during deployment. |
| Private pool | Optional; see the format above. `PRIVATEPOOL_PROJECT_ID` is the project containing the pool, `REGION` where it was created, `PRIVATEPOOL_ID` its ID. |
| SAP application | The SAP product to install. |
| SAP version | The version of the SAP application. |
| Environment type | Production or non-production use. |
| Deployment model | **Distributed with high availability**: recommended for production systems and other critical workloads to achieve the highest availability. **Distributed**: suitable for non-production workloads where availability is not critical, for lower cost. |
| HANA scaling method | Scaling method for the database. |
| VM name prefix | Applied to the names of all VMs created; a maximum of seven characters. |
| Software installation media bucket | The Cloud Storage bucket holding the SAP installation media; must exist within the project in which you create the deployment. |

### Location & networking

| Field | Description |
|-------|-------------|
| Project name | Project in which to deploy the workload. |
| Region | Region in which to deploy. |
| Primary zone | A zone from the region. |
| Secondary zone | A zone for the secondary system; visible only if high availability (HA) is the deployment model. |
| Network | The VPC network. |
| Subnet | The subnet in that VPC network. |
| Internet access | **Cloud NAT**: use a Cloud NAT gateway you already created for the network. **Allow External IP**: reserve a static external IP address on each VM. |
| Skip automatic firewall setup | Disables automatic firewall rule creation; if skipped, verify your firewall rules enable communication between the VMs in the deployment. |
| Network tags | Network tags that help apply firewall rules to the VMs. |
| DNS zone | **Create a new DNS zone**: Workload Manager creates a private Cloud DNS zone. **Skip DNS configuration**: set up a DNS zone manually. |

### Database

| Field | Description |
|-------|-------------|
| HANA SID | SAP system ID for the database layer: three alphanumeric characters, beginning with a letter, all letters uppercase. |
| Operating system | A supported OS image; all database VMs use it. |
| Secret name for database credentials | Secret holding the SAP HANA database password; must exist in the project in which you create the deployment. |
| Machine family / Series / Machine type | For the database VMs. |
| Block storage option | Block storage type for the HANA database VM. |

### Application: General

| Field | Description |
|-------|-------------|
| NetWeaver SID | SAP system ID for the application layer: three alphanumeric characters, beginning with a letter, all letters uppercase. |
| Operating system | A supported OS image; all application VMs use it. |
| Secret for application credentials | Secret holding the SAP application password; must exist in the project in which you create the deployment. |
| Shared storage | Workload Manager creates NFS shared file storage (Filestore Enterprise); alternatively specify an existing mount location as `IP_ADDRESS/STORAGE_NAME`. |

### Application: Central services

| Field | Description |
|-------|-------------|
| Central services service account | For the ABAP SAP Central Services (ASCS) instances. |
| Central services OS image | A supported OS image for all ASCS VMs. |
| Central services machine family / series / type | For the ASCS VMs. |

### Application: Application servers

| Field | Description |
|-------|-------------|
| Number of application servers per zone | For example, `2` creates two application VMs in a non-HA deployment model or four in an HA model, divided evenly across both zones. |
| App instance number | Instance number for application servers. |
| VM names | For HA, names are assigned to VMs in the primary and secondary zones in alternating order. If empty, names are assigned from the **VM name prefix**. |
| Application server service account | Service account for the application servers. |
| Application server OS image | A supported OS image. |
| Application server machine family / series / type | For the application servers. |

## Notes

- Block storage: if you select Balanced Persistent Disk or SSD Persistent Disk, all disks in the deployment use that type. If you select Hyperdisk Extreme, only the `/data` and `/log` volumes use Hyperdisk Extreme and the other disk volumes use SSD Persistent Disk. Disk sizes are calculated automatically according to best practices for the selected machine type and block storage type.
- Workflow: **Deployment basics**, **Location & networking**, **Database**, **Application**, then **Preview** (summary; errors from previous steps appear in the Deployment dashboard), then **Create**.
- Monitor status on the dashboard by hovering over the **Status** icon; a console notification is sent on completion or failure. The deployment continues in the background and can take up to two or three hours.
- Troubleshooting, error during configuration or provisioning: if the cause requires changing the configuration (for example the deployment name was not unique), delete the deployment and create a new one; if not (for example insufficient quota), resolve the issue and click **Retry**.
- Troubleshooting, error during the Ansible process: if the cause requires changing the configuration (for example the wrong Cloud Storage bucket for SAP files), delete the deployment and create a new one; if not (for example an OS package failed to download), resolve the issue if applicable, delete the deployment, and create a new one. Deleting a deployment is destructive; try it on a disposable project first.
- "Internet access": **Allow External IP** reserves a static external IP address on each VM; **Cloud NAT** uses a gateway you already created for the network.
- The source has no code; the two `text` blocks are the formats given in the Private pool and Shared storage fields.
- Source: https://docs.cloud.google.com/workload-manager/docs/deploy/sap/deploy-sap (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [prerequisites.md](./prerequisites.md)
- [deployment-overview.md](./deployment-overview.md)
