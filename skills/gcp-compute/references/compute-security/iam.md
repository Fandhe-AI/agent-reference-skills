---
source: https://docs.cloud.google.com/compute/docs/access/iam
---

# Compute Engine IAM roles and permissions

Predefined IAM roles for Compute Engine, the `roles/iam.serviceAccountUser` pairing with `roles/compute.instanceAdmin.v1`, the permission needed for the Google Cloud console, SSH access for instance admins, and the service agent roles used by managed instance groups.

## Signature / Usage

### Permission needed to use the Google Cloud console

To use the console for Compute Engine resources you need a role that contains this permission on the project:

```text
compute.projects.get
```

### Grant Service Account User on one service account (recommended scope)

`roles/iam.serviceAccountUser` plus `roles/compute.instanceAdmin.v1` lets a member create instances that run as a service account, attach a persistent disk to, set metadata on, SSH into, or reconfigure such an instance. Snippet taken from https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances:

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Replace `SERVICE_ACCOUNT_NAME`, `PROJECT_ID` and `USER_EMAIL` with your values.

## Options / Props

### Granting `roles/iam.serviceAccountUser`

| Scope | Effect |
|---|---|
| On a specific service account (recommended) | Access only to service accounts for which the member is an `iam.serviceAccountUser`. |
| At project level | Access to all service accounts in the project, including ones created in the future. |

### Predefined roles (id and purpose)

| Role | Purpose as stated in the source |
|---|---|
| `roles/compute.admin` | Full control of all Compute Engine resources; add `roles/iam.serviceAccountUser` for VMs that run as a service account. |
| `roles/compute.editor` | Editor role for compute. |
| `roles/compute.instanceAdmin` (beta) | Create, modify, delete VM instances (and disks). |
| `roles/compute.instanceAdmin.v1` | Full control of instances, instance groups, disks, snapshots, images; read access to networking resources. Granted only at instance level, the user cannot create new instances. |
| `roles/compute.loadBalancerAdmin` | Create, modify, delete load balancers and associated resources. |
| `roles/compute.networkAdmin` | Networking resources except firewall rules and SSL certificates. |
| `roles/compute.networkUser` | Use a shared VPC network; lowest-level resource: subnetwork. |
| `roles/compute.networkViewer` | Read-only access to networking resources. |
| `roles/compute.osAdminLogin` | Log in to an instance as an administrator user (lowest-level resource: instance). |
| `roles/compute.osLogin` | Log in to an instance as a standard user (lowest-level resource: instance). |
| `roles/compute.osLoginExternalUser` | Available only at the organization level; access for an external user to set OS Login information for the organization. |
| `roles/compute.securityAdmin` | Firewall rules, SSL certificates, and Shielded VM configuration. |
| `roles/compute.storageAdmin` | Create, modify, delete disks, images, snapshots. |
| `roles/compute.viewer` | Read-only get and list, without reading data stored on resources. |
| `roles/compute.imageUser` | List and read images; at project level also create resources from images in the project (lowest-level resource: image). |
| `roles/compute.xpnAdmin` | Administer shared VPC host projects. |
| `roles/compute.loadBalancerServiceUser` | Use services from a load balancer in other projects. |
| `roles/compute.orgFirewallPolicyAdmin` / `roles/compute.orgFirewallPolicyUser` | Full control of / view or use organization Firewall Policies. |
| `roles/compute.orgSecurityPolicyAdmin` / `roles/compute.orgSecurityPolicyUser` | Full control of / view or use organization Security Policies. |
| `roles/compute.orgSecurityResourceAdmin` | Full control of Firewall Policy associations to the organization or folders. |
| `roles/compute.packetMirroringAdmin` / `roles/compute.packetMirroringUser` | Specify resources to be mirrored / use packet mirrorings. |
| `roles/compute.peerSubnetMigrationAdmin` | Use a subnetwork whose PURPOSE is "PEER_MIGRATION". |
| `roles/compute.publicIpAdmin` | Full control of public IP address management. |
| `roles/compute.soleTenantViewer` | View sole-tenancy node groups. |
| `roles/compute.vmExtensionPolicyAdmin` / `roles/compute.vmExtensionPolicyViewer` | Administer / view zone and global VM extension policies. |
| `roles/compute.folderVmExtensionPolicyAdmin` / `...Viewer` (Beta) | Folder-level VM extension policies. |
| `roles/compute.orgVmExtensionPolicyAdmin` / `...Viewer` (Beta) | Organization-level VM extension policies. |
| `roles/compute.futureReservationAdmin` / `...User` / `...Viewer` (Beta) | Future reservations. |
| `roles/compute.interconnectGroupAnalyzer` / `roles/compute.interconnectAttachmentGroupAnalyzer` | Analyze Interconnect (Attachment) Groups via GetOperationalStatus. |

### Service agent roles

| Role | Purpose |
|---|---|
| `roles/compute.instanceGroupManagerServiceAgent` | All permissions MIGs need to create and manage instances. |
| `roles/compute.serviceAgent` | Lets the Compute Engine service account assert service account authority; includes access to service accounts. |

Warning from the source: do not grant service agent roles to any principals except service agents.

## Notes

- The source lists the full permission set of every role; it is not copied here. See https://docs.cloud.google.com/iam/docs/roles-permissions/compute for the permission lists.
- Managed instance groups: all MIG operations run as the Google APIs Service Agent (by default granted `roles/compute.instanceGroupManagerServiceAgent` at project level). If you customize its access, grant `roles/compute.instanceAdmin.v1` and, only if the MIG creates VMs that can run as a service account, `roles/iam.serviceAccountUser`. Compute Engine validates this role and permissions on all resources referenced by instance templates (images, disks, VPC networks, subnets) when you create a MIG or update its template. The agent is also used by other processes, including Deployment Manager.
- Source inconsistency kept as written: this page's prose gives the Google APIs Service Agent email as `PROJECT_ID@cloudservices.gserviceaccount.com`, while the service-accounts page shows `PROJECT_NUMBER@cloudservices.gserviceaccount.com` (see [service-accounts.md](./service-accounts.md)); verify the address in your project's IAM page.
- `roles/compute.instanceAdmin.v1` members connect with the gcloud CLI or SSH-in-browser; the tools generate a key pair and add the public key to project metadata, or to instance metadata if the member cannot edit project metadata.
- Beta markers differ between this page and [access.md](./access.md) (for example `roles/compute.instanceAdmin` is beta here); beta labels are as written in each source.
- Distance line: Compute Engine roles only; IAM in general is in `gcp-foundation`. OS Login roles apply to Compute Engine VMs.
- Source inconsistency: this page says "the tools automatically generate a public/private key pair and add the public key to the project metadata. If the member does not have permissions to edit project metadata, the tool adds the member's public key to the instance metadata instead.", while oslogin.md (compute-access-ssh) says "Compute instances that use OS Login can't use metadata-based SSH keys. If you enable OS Login for a compute instance, then the compute instance's guest agent ignores the keys stored in metadata". The metadata-key mechanism describes VMs without OS Login.
- Source (OS Login and metadata SSH keys): https://docs.cloud.google.com/compute/docs/oslogin (retrieved 2026-11-17)
- Source (compared page): https://docs.cloud.google.com/compute/docs/access/service-accounts (service-accounts.md) (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/access/iam (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances (retrieved 2026-11-17).

## Related

- [access.md](./access.md)
- [service-accounts.md](./service-accounts.md)
- [create-enable-service-accounts-for-instances.md](./create-enable-service-accounts-for-instances.md)
