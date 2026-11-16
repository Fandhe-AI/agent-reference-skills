---
source: https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances
---

# Create a VM that uses a user-managed service account

Create a user-managed service account, grant it IAM roles, let a principal attach it, and create a VM that runs as that service account with the `cloud-platform` access scope.

## Signature / Usage

### Create the service account

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

Replace `SERVICE_ACCOUNT_NAME` with a name for the service account.

### Grant a role to the service account

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

Replace `SERVICE_ACCOUNT_NAME` with the service account name, `PROJECT_ID` with the project ID where you created it, and `ROLE` with the role to grant. Run it again for each additional role. In production do not grant Owner, Editor or Viewer; grant a predefined or custom role that meets your needs.

### Let a principal attach the service account

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Replace `USER_EMAIL` with the email address of a Google Account.

### Create the VM

Provide the service account email and the `cloud-platform` access scope:

```bash
gcloud compute instances create VM_NAME \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --scopes=https://www.googleapis.com/auth/cloud-platform
```

Replace `SERVICE_ACCOUNT_EMAIL` with the email of the service account you created (for example `my-sa-123@my-project-123.iam.gserviceaccount.com`) and `VM_NAME` with the VM name. Example:

```bash
gcloud compute instances create example-vm \
    --service-account 123-my-sa@my-project-123.iam.gserviceaccount.com \
    --scopes=https://www.googleapis.com/auth/cloud-platform
```

## Options / Props

### Required roles on the project

| Role | Id |
|---|---|
| Compute Instance Admin (v1) | `roles/compute.instanceAdmin.v1` |
| Create Service Accounts | `roles/iam.serviceAccountCreator` |
| Project IAM Admin | `roles/resourcemanager.projectIamAdmin` |

### Required permissions

| Task | Permission |
|---|---|
| Create service accounts | All permissions in `iam.serviceAccountCreator` |
| Grant permissions to the service account | All permissions in `resourcemanager.projectIamAdmin` |
| Create VMs | `compute.instances.create` on the project |
| Custom image / snapshot / instance template source | `compute.images.useReadOnly` / `compute.snapshots.useReadOnly` / `compute.instanceTemplates.useReadOnly` on that resource |
| Legacy network | `compute.networks.use` on the project (external IP: `compute.networks.useExternalIp`) |
| Static IP address | `compute.addresses.use` on the project |
| Subnet | `compute.subnetworks.use` on the project or subnet (external IP on a VPC network: `compute.subnetworks.useExternalIp`) |
| Metadata / tags / labels | `compute.instances.setMetadata` on the project; `compute.instances.setTags` / `compute.instances.setLabels` on the VM |
| Set the VM's service account | `compute.instances.setServiceAccount` on the VM |
| Disks | `compute.disks.create` on the project; `compute.disks.use` (read-write or read-only) or `compute.disks.useReadOnly` on an existing disk |

## Notes

- Recommended setup: a new user-managed service account (not the default one) with only the needed roles, attached to the VM, with the `https://www.googleapis.com/auth/cloud-platform` scope; access is then controlled by IAM roles. In the console choose "Allow full access to all Cloud APIs".
- Anyone who connects to a VM can use all IAM permissions granted to its attached service account.
- The alias `--scopes=cloud-platform` is recognized only by the gcloud CLI; the API and libraries need the full scope URI.
- To change the service account of an existing VM, see https://docs.cloud.google.com/compute/docs/instances/change-service-account.
- Deleting a service account removes applications' access through it (including the default App Engine and Compute Engine accounts). Disable it first and re-enable if needed; try it on a disposable resource first.
- The source also shows Console, Terraform and a REST `instances.insert` body (with `serviceAccounts` and `shieldedInstanceConfig`), which are omitted. In that REST body Secure Boot is optional: Compute Engine enables vTPM and integrity monitoring by default on Shielded VM capable images, not Secure Boot; after the VM starts you must stop it to modify Shielded VM options.
- Distance line: service accounts for Compute Engine VMs; IAM in general is in `gcp-foundation`.
- Source: https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-accounts.md](./service-accounts.md)
- [iam.md](./iam.md)
- [shielded-vm.md](./shielded-vm.md)
