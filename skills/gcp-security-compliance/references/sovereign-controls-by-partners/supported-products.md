---
source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/supported-products
---

# Supported products by data boundary

Lists the Google Cloud products and API services supported by Sovereign Controls by Partners for each data boundary. A product not listed for a boundary is unsupported and has not met that boundary's control requirements.

## Signature / Usage

Enabling a supported service (the source shows this command on the regional endpoints page for supported services; replace `SERVICE_NAME` with the service to enable).

```bash
gcloud services enable SERVICE_NAME
```

## Options / Props

| Product | API services | France Data Boundary by S3NS | Germany Data Boundary by T-Systems | Italy Data Boundary by PSN | Kingdom of Saudi Arabia Data Boundary Advanced by CNTXT | Kingdom of Saudi Arabia Data Boundary Foundation by CNTXT |
|---|---|---|---|---|---|---|
| Access Context Manager | `accesscontextmanager.googleapis.com` | Y | Y | Y | Y | Y |
| Access Transparency | `accessapproval.googleapis.com` | Y | Y | Y | Y | Y |
| AlloyDB for PostgreSQL | `alloydb.googleapis.com` | Y | Y | Y | - | - |
| Apigee | `apigee.googleapis.com` | Y | Y | Y | - | - |
| Artifact Registry | `artifactregistry.googleapis.com` | Y | Y | Y | Y | Y |
| Backup for Google Kubernetes Engine (GKE) | `gkebackup.googleapis.com` | Y | Y | Y | - | - |
| BigQuery (2) | `bigquery.googleapis.com`, `bigqueryconnection.googleapis.com`, `bigquerydatapolicy.googleapis.com`, `bigqueryreservation.googleapis.com`, `bigquerystorage.googleapis.com` | Y | Y | Y | Y | Y |
| BigQuery Data Transfer Service (2) | `bigquerydatatransfer.googleapis.com` | Y | Y | Y | - | - |
| Bigtable | `bigtable.googleapis.com`, `bigtableadmin.googleapis.com` | Y | Y | Y | Y | Y |
| Binary Authorization | `binaryauthorization.googleapis.com` | Y | Y | Y | - | - |
| Certificate Authority Service | `privateca.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Build | `cloudbuild.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud DNS | `dns.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud External Key Manager (Cloud EKM) | `cloudkms.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud HSM | `cloudkms.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Interconnect | `compute.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Key Management Service (Cloud KMS) | `cloudkms.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Load Balancing | `compute.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Logging | `logging.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Monitoring (3) | `monitoring.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud NAT | `networkconnectivity.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Next Generation Firewall | `compute.googleapis.com` | - | - | - | Y | Y |
| Cloud Router | `networkconnectivity.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Run | `run.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud SQL | `sqladmin.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Service Mesh | `mesh.googleapis.com`, `meshca.googleapis.com`, `meshconfig.googleapis.com`, `trafficdirector.googleapis.com`, `networkservices.googleapis.com` | Y | Y | Y | - | - |
| Cloud Storage | `storage.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud VPN | `compute.googleapis.com` | Y | Y | Y | Y | Y |
| Cloud Workstations | `workstations.googleapis.com` | Y | Y | Y | Y | Y |
| Compute Engine | `compute.googleapis.com` | Y | Y | Y | Y | Y |
| Google Kubernetes Engine (GKE) Connect | `gkeconnect.googleapis.com`, `connectgateway.googleapis.com` | Y | Y | Y | Y | Y |
| Dataflow | `dataflow.googleapis.com`, `datapipelines.googleapis.com` | Y | Y | Y | Y | Y |
| Essential Contacts | `essentialcontacts.googleapis.com` | - | - | - | Y | Y |
| Eventarc | `eventarc.googleapis.com` | Y | Y | Y | - | - |
| Filestore | `file.googleapis.com` | Y | Y | Y | Y | Y |
| Firebase Security Rules | `firebaserules.googleapis.com` | Y | Y | Y | Y | Y |
| Firestore | `firestore.googleapis.com` | Y | Y | Y | - | - |
| Google Kubernetes Engine (GKE) Hub | `gkehub.googleapis.com` | Y | Y | Y | Y | Y |
| Google Kubernetes Engine (GKE) Identity Service | `anthosidentityservice.googleapis.com` | Y | Y | Y | - | - |
| Google Cloud Armor | `compute.googleapis.com`, `networksecurity.googleapis.com` | Y | Y | Y | Y | Y |
| Google Kubernetes Engine (GKE) | `container.googleapis.com`, `containersecurity.googleapis.com` | Y | Y | Y | Y | Y |
| Identity and Access Management (IAM) | `iam.googleapis.com`, `policytroubleshooter.googleapis.com` | Y | Y | Y | Y | Y |
| Identity-Aware Proxy | `iap.googleapis.com` | Y | Y | Y | Y | Y |
| Knowledge Catalog | `dataplex.googleapis.com`, `datalineage.googleapis.com` | Y | Y | Y | Y | Y |
| Managed Service for Apache Airflow | `composer.googleapis.com` | Y | Y | Y | - | - |
| Managed Service for Apache Spark | `dataproc-control.googleapis.com`, `dataproc.googleapis.com` | Y | Y | Y | Y | Y |
| Memorystore for Redis | `redis.googleapis.com` | Y | Y | Y | Y | Y |
| Network Connectivity Center | `networkconnectivity.googleapis.com` | Y | Y | Y | Y | Y |
| Organization Policy Service | `orgpolicy.googleapis.com` | Y | Y | Y | Y | Y |
| Persistent Disk | `compute.googleapis.com` | Y | Y | Y | Y | Y |
| Personalized Service Health | `servicehealth.googleapis.com` | - | - | - | Y | Y |
| Pub/Sub | `pubsub.googleapis.com` | Y | Y | Y | Y | Y |
| Resource Manager | `cloudresourcemanager.googleapis.com` | Y | Y | Y | Y | Y |
| Secret Manager | `secretmanager.googleapis.com` | Y | Y | Y | Y | Y |
| Secure Source Manager | `securesourcemanager.googleapis.com` | Y | Y | Y | Y | Y |
| Sensitive Data Protection | `dlp.googleapis.com` | Y | Y | Y | Y | Y |
| Spanner | `spanner.googleapis.com` | Y | Y | Y | Y | Y |
| Speech-to-Text | `speech.googleapis.com` | Y | Y | Y | - | - |
| VPC Service Controls (France, Germany, Italy) | `accesscontextmanager.googleapis.com`, `accesscontextintelligence.googleapis.com` | Y | Y | Y | - | - |
| VPC Service Controls (Kingdom of Saudi Arabia) | `accesscontextmanager.googleapis.com`, `servicenetworking.googleapis.com`, `accesscontextintelligence.googleapis.com` | - | - | - | Y | Y |
| Virtual Private Cloud (VPC) (France, Germany, Italy) | `compute.googleapis.com`, `servicenetworking.googleapis.com` | Y | Y | Y | - | - |
| Virtual Private Cloud (VPC) (Kingdom of Saudi Arabia) | `compute.googleapis.com` | - | - | - | Y | Y |

### Per-boundary pages

| Boundary | Official page |
|---|---|
| France Data Boundary by S3NS | https://docs.cloud.google.com/sovereign-controls-by-partners/docs/data-boundaries/france-data-boundary-s3ns |
| Germany Data Boundary by T-Systems | https://docs.cloud.google.com/sovereign-controls-by-partners/docs/data-boundaries/germany-data-boundary-tsi |
| Italy Data Boundary by PSN | https://docs.cloud.google.com/sovereign-controls-by-partners/docs/data-boundaries/italy-data-boundary-psn |
| Kingdom of Saudi Arabia Data Boundary Advanced by CNTXT | https://docs.cloud.google.com/sovereign-controls-by-partners/docs/data-boundaries/ksa-data-boundary-cntxt-advanced |
| Kingdom of Saudi Arabia Data Boundary Foundation by CNTXT | https://docs.cloud.google.com/sovereign-controls-by-partners/docs/data-boundaries/ksa-data-boundary-cntxt-foundation |

## Notes

- Each boundary column is one data boundary of the source. Y = listed as supported, - = not listed. Footnote markers 2 and 3 are explained in Notes.
- If a service isn't listed for a data boundary, it is unsupported and hasn't met the control requirements. Unsupported products aren't recommended without due diligence and a thorough understanding of your responsibilities in the shared responsibility model. Unsupported products may share an API endpoint with supported products, making them available to all users.
- Footnote 1: depending on the data boundary, different API endpoint types may be available. The endpoints on this page are global API endpoints; regional or locational API endpoints may be available or required for a given data boundary.
- Footnote 2 (BigQuery, BigQuery Data Transfer Service): BigQuery is supported but isn't automatically enabled when you create a new Assured Workloads folder, because of an internal configuration process that normally finishes in ten minutes but can take much longer. To check and enable it: Assured Workloads page, select the new folder, **Folder Details** page, **Allowed services** section, **Review Available Updates**; if BigQuery services are listed in the **Allowed services** pane, click **Allow Services** (this adds them to the Resource Usage Restriction organization policy for the folder). If they are not listed within 12 hours of folder creation, contact Cloud Customer Care. Gemini in BigQuery is not supported by Assured Workloads.
- Footnote 3 (Cloud Monitoring): Synthetic monitoring and Uptime checks are not supported in Sovereign Controls by Partners.
- The Cloud Build link differs for the Kingdom of Saudi Arabia Data Boundary Foundation by CNTXT in the source (build overview page); the product and endpoint are the same. The source page's boundary filter lists these five boundaries.
- This matrix was folded from the source's one-row-per-boundary table without changing any product or endpoint.
- The source lists VPC Service Controls and Virtual Private Cloud (VPC) with different API services for the Kingdom of Saudi Arabia boundaries than for the other boundaries; the parenthetical boundary names on those rows only separate the two endpoint sets and are not part of the product names.
- Snippet taken from https://docs.cloud.google.com/sovereign-controls-by-partners/docs/regional-endpoints (the `gcloud services enable SERVICE_NAME` step).
- Source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/supported-products (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [france-data-boundary-s3ns.md](./france-data-boundary-s3ns.md)
- [germany-data-boundary-tsi.md](./germany-data-boundary-tsi.md)
- [regional-endpoints.md](./regional-endpoints.md)
- [create-folder.md](./create-folder.md)
