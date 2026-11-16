---
source: https://docs.cloud.google.com/compute/docs/access
---

# Compute Engine access control

Overview of how to give users access to Compute Engine resources with IAM: predefined, basic and custom roles, resource-level IAM policies, organization policies, SSH-only access, service accounts for apps on VMs, and managed workload identities.

## Signature / Usage

### Let a principal attach a service account to VMs

The page states that managing VMs that run as a service account also needs `roles/iam.serviceAccountUser`. Snippet taken from https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances (grant on one specific service account):

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Replace `SERVICE_ACCOUNT_NAME` with the service account name, `PROJECT_ID` with the project ID, and `USER_EMAIL` with the principal's Google Account email.

### Access paths

- Project-level or resource-level IAM roles for people who manage resources.
- SSH keys added to the project or to one instance, for people who only need to connect (no wide API permissions).
- A user-managed service account for application code on the VM.
- Managed workload identities (X.509 certificates from Certificate Authority Service, per-VM mTLS, auto-rotated).

## Options / Props

### Predefined Compute Engine roles

| Role title | Capabilities | Target user |
|---|---|---|
| Compute Engine image user | List and use images from another project; grant together with another role (for example Instance Admin). For MIGs or Deployment Manager you might need to grant it to the project's Google APIs service account. | Service accounts, systems administrators, developers |
| Compute Engine instance admin (v1) | Full control of instances, instance groups, disks, snapshots and images; read-only access to networking resources. Also grant `roles/iam.serviceAccountUser` if VMs run as a service account. | Systems administrators, developers |
| Compute Engine admin role | Full control of all Compute Engine resources. Also grant `roles/iam.serviceAccountUser` if VMs run as a service account. | Systems administrators, developers |
| Compute Engine network admin | Create, modify, delete networking resources except firewall rules and SSL certificates; read-only access to firewall rules, SSL certificates and instances. Cannot create, start, stop or delete instances. | Network administrators |
| Compute Engine security admin | Create, modify, delete firewall rules and SSL certificates. | Security administrators |
| Compute Engine load balancer admin (beta) | Create, modify, delete load balancers and associated resources. | Load balancer administrators |
| Compute Engine service account user | Create instances that use service accounts; attach a disk and set metadata on an instance already running as a service account. Not useful alone (no Compute Engine API permissions). | Systems administrators, developers |
| Compute Engine viewer role | Read-only get and list without reading data stored on resources. | System administrators |
| Compute Engine network user | Use a shared VPC network (use host-project networks and subnetworks, cannot delete or create networks there). | Systems administrators, developers |
| Compute Engine network viewer | Read-only access to all networking resources. | Network administrators, systems administrators, developers, service accounts |
| Compute Engine storage admin (beta) | Create, modify, delete disks, images, snapshots. | Systems administrators, developers |
| Compute Engine shared VPC admin | Administer shared VPC host projects (enable host projects, associate service projects). Can only be granted at the organization level. | Project creators |

### Basic roles

| Role | Permissions |
|---|---|
| `Owner` | All viewer and editor privileges, plus billing settings, access control and deleting a project. |
| `Editor` | All viewer privileges, plus create, modify and delete resources. |
| `Viewer` | Read-only on all resources. |

Prefer predefined roles; use basic roles only where IAM is not yet supported. Custom roles are an option when neither fits.

### Capability matrix (columns abbreviated)

Columns: Instance admin (v1) / Image user / Network user / Network viewer / Network admin / Security admin / Storage admin / Shared VPC admin / Compute admin / Compute viewer / Load balancer admin.

| Capability | IA v1 | Img | NetU | NetV | NetA | Sec | Stor | XPN | Adm | View | LB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Create or delete VM instances | Yes* | No | No | No | No | No | No | No | Yes | No | No |
| SSH into VM instances | Yes* | No | No | No | No | No | No | No | Yes* | No | No |
| List or get VM instances | Yes | No | No | Yes | Yes | No | No | No | Yes | Yes | Yes |
| Create or delete images, disks, snapshots | Yes | No | No | No | No | No | Yes | No | Yes | Yes | No |
| List or get images | Yes | Yes | No | No | No | No | Yes | No | Yes | Yes | No |
| Create or delete instance groups | Yes* | No | No | No | No | No | No | No | Yes | No | Yes |
| Create and manage load balancers | No | No | No | No | Yes | No | No | No | Yes | No | Yes |
| Create and manage firewalls and SSL certificates | No | No | No | No | No | Yes | No | No | Yes | No | No for firewalls, Yes for SSL certificates |
| Create and manage shared VPC host projects | No | No | No | No | No | No | No | Yes | Yes | No | No |
| Use networks and subnetworks in a shared VPC host project | No | No | Yes | No | No | No | No | No | Yes | No | No |

`*` If the VM instance can run as a service account, grant the service account user role as well. The source matrix has further rows (VPNs, network and firewall views, networks and subnetworks, instance-group lists); see the source page.

## Notes

- Resource-level IAM policies let you grant a role on specific instances, images or disks; the effective policy is the union of the resource policy and policies inherited from parents.
- Organization policies for Compute Engine named here: disable interactive serial console access, disable external IP addresses for VMs, restrict image projects. Setting them needs `orgpolicy.policyAdmin` on the organization; projects can have overrides. See [organization-policies.md](./organization-policies.md).
- `roles/compute.instanceAdmin.v1`, owner and editor members can SSH into instances automatically (instances that run as a service account also need `roles/iam.serviceAccountUser`).
- Source inconsistency kept as written: the matrix lists Compute viewer as "Yes" for "Create or delete images, disks, snapshots", while the role description says read-only.
- Distance line: this page covers Compute Engine IAM roles; IAM in general is in `gcp-foundation`. VPC networks and firewalls themselves are in the planned `gcp-networking`.
- The source page also links Console flows for adding team members; those are omitted.
- Source inconsistency: this page says "To give a user SSH access to VM instances and prevent access to all APIs, add the user's SSH keys to the project or instance" (the "Access paths" SSH-key bullet), while oslogin.md (compute-access-ssh) says "Compute instances that use OS Login can't use metadata-based SSH keys. If you enable OS Login for a compute instance, then the compute instance's guest agent ignores the keys stored in metadata". The SSH-key path applies only to VMs without OS Login; for OS Login VMs, set-up-oslogin.md lists `roles/compute.osLogin` or `roles/compute.osAdminLogin` for "All users".
- Source (OS Login and metadata SSH keys): https://docs.cloud.google.com/compute/docs/oslogin (retrieved 2026-11-17)
- Source (OS Login roles): https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/access (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances (retrieved 2026-11-17).

## Related

- [iam.md](./iam.md)
- [service-accounts.md](./service-accounts.md)
- [create-enable-service-accounts-for-instances.md](./create-enable-service-accounts-for-instances.md)
- [organization-policies.md](./organization-policies.md)
