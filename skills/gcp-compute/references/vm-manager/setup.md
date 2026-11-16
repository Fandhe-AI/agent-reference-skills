---
source: https://docs.cloud.google.com/compute/vm-manager/docs/setup
---

# Set up VM Manager

Steps to enable VM Manager on Compute Engine VMs: enable the OS Config API, make sure the OS Config agent is installed, set the `enable-osconfig` metadata, optionally disable unneeded features, and configure proxies. You can enable VM Manager per VM, per project, or for all projects in a folder or organization.

## Signature / Usage

### Enable the OS Config API (single project)

Requires the Service Usage Admin role (`roles/serviceusage.serviceUsageAdmin`, permission `serviceusage.services.enable`).

```bash
gcloud services enable osconfig.googleapis.com --project=PROJECT_ID
```

### Enable the OS Config API for a folder or organization (Preview, hierarchical service activation)

For a folder:

```bash
gcloud beta services enable osconfig.googleapis.com \
    --folder=FOLDER_ID
```

For an organization:

```bash
gcloud beta services enable osconfig.googleapis.com \
    --organization=ORGANIZATION_ID
```

### Require OS Config organization policy

Needs `resourcemanager.organizationAdmin`. Find your organization ID:

```bash
gcloud organizations list
```

Set the constraint in your organization (replace `organization-id` with your organization ID):

```bash
gcloud resource-manager org-policies enable-enforce compute.requireOsConfig \
    --organization=organization-id
```

### Check the OS Config agent

```bash
sudo systemctl status google-osconfig-agent
```

```powershell
PowerShell Get-Service google_osconfig_agent
```

### Install the OS Config agent

Windows Server:

```powershell
googet -noconfirm install google-osconfig-agent
```

Debian / Ubuntu (Google-provided images):

```bash
sudo apt update
sudo apt -y install google-osconfig-agent
```

RHEL 7/8, CentOS 7/8, Rocky Linux 8/9:

```bash
sudo yum -y install google-osconfig-agent
```

Debian 13 and later, when the package cannot be found or the image is not Google-provided. Install the public repository GPG key to `/etc/apt/keyrings`:

Adapted (not in the official docs): `curl -f` added so that an HTTP error page is not written into the keyring file.

```bash
sudo curl -f https://packages.cloud.google.com/apt/doc/apt-key.gpg -o /etc/apt/keyrings/google-keyring.gpg
```

Determine the Debian distro name, then create the source list file `/etc/apt/sources.list.d/google-cloud.list`:

Adapted (not in the official docs): the repository URL uses `https://` instead of `http://` (the source shows `http://packages.cloud.google.com`).

```bash
eval $(grep VERSION_CODENAME /etc/os-release)
sudo tee /etc/apt/sources.list.d/google-cloud.list << EOM
deb [signed-by=/etc/apt/keyrings/google-keyring.gpg] https://packages.cloud.google.com/apt google-compute-engine-${VERSION_CODENAME}-stable main
EOM
```

Debian 12 and earlier. Install the public repository GPG key:

Adapted (not in the official docs): download, inspect, then install the key instead of `curl ... | sudo apt-key add -`; the key is dearmored into `/usr/share/keyrings/cloud.google.gpg` as on the gcloud CLI install page.

```bash
curl -fsSLo /tmp/cloud.google.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
gpg --show-keys /tmp/cloud.google.gpg
sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg /tmp/cloud.google.gpg
```

Determine the Debian distro name, then create the source list file `/etc/apt/sources.list.d/google-cloud.list`:

Adapted (not in the official docs): the repository URLs use `https://` instead of `http://` (the source shows `http://packages.cloud.google.com`), and each line has `[signed-by=/usr/share/keyrings/cloud.google.gpg]` because the key is no longer added with `apt-key`.

```bash
eval $(grep VERSION_CODENAME /etc/os-release)
sudo tee /etc/apt/sources.list.d/google-cloud.list << EOM
deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt google-compute-engine-${VERSION_CODENAME}-stable main
deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt google-cloud-packages-archive-keyring-${VERSION_CODENAME} main
EOM
```

### Set the metadata values

Project-wide:

```bash
gcloud compute project-info add-metadata \
  --project PROJECT_ID \
  --metadata=enable-osconfig=TRUE
```

On an existing instance:

```bash
gcloud compute instances add-metadata VM_NAME \
  --metadata=enable-osconfig=TRUE
```

At instance creation:

```bash
gcloud compute instances create VM_NAME \
  --metadata=enable-osconfig=TRUE
```

### Disable features you do not need

```bash
gcloud compute project-info add-metadata \
    --project PROJECT_ID \
    --metadata=osconfig-disabled-features=tasks
```

To disable `osinventory` and `guestpolicies` instead, the source sets `--metadata=osconfig-disabled-features=osinventory,guestpolicies`.

### Configure an HTTP proxy

Linux (systemd, as root):

```bash
mkdir -p /etc/systemd/system/google-osconfig-agent.service.d
cat >/etc/systemd/system/google-osconfig-agent.service.d/override.conf <<EOF
[Service]
Environment="http_proxy=http://PROXY_IP:PROXY_PORT" \
  "https_proxy=http://PROXY_IP:PROXY_PORT" \
  "no_proxy=169.254.169.254,fd20:ce::254,metadata,metadata.google.internal"
EOF
```

Restart the OS Config agent service:

```bash
systemctl daemon-reload
systemctl restart google-osconfig-agent
```

Windows (administrator command prompt): the source uses `setx http_proxy`, `setx https_proxy` and `setx no_proxy ... /m`.

### View and change project feature settings

```bash
gcloud compute os-config project-feature-settings describe \
    --project PROJECT_ID
```

```bash
gcloud compute os-config project-feature-settings update \
    --project PROJECT_ID \
    --patch-and-config-feature-set=full
```

REST: `GET https://osconfig.googleapis.com/v1/projects/PROJECT_ID/locations/global/projectFeatureSettings` returns the settings; a `PATCH` to the same URL with body `{"name": "projects/PROJECT_ID/locations/global/projectFeatureSettings", "patchAndConfigFeatureSet": "OSCONFIG_C"}` changes them.

### Disable the OS Config agent

```bash
sudo systemctl stop google-osconfig-agent
sudo systemctl disable google-osconfig-agent
```

On Windows the source uses `PowerShell Stop-Service google_osconfig_agent [-StartupType disabled]`.

## Options / Props

| Item | Values / meaning |
|------|------------------|
| `enable-osconfig` | `TRUE` enables Patch, OS policies and OS inventory management (instance or project metadata) |
| `enable-guest-attributes` | `TRUE`; also required for the earlier version of OS inventory management, otherwise the dashboard shows No data |
| `osconfig-disabled-features` | comma list: `osinventory` (OS inventory management), `tasks` (Patch and OS policies), `guestpolicies` (OS guest policies, beta) |
| `patchAndConfigFeatureSet` | `OSCONFIG_C` = full VM Manager feature set; `OSCONFIG_B` = limited feature set |
| Limited mode | Enabled when Ops Agent is installed at VM creation without VM Manager; subset of features for unlimited VMs at no cost (view OS policy assignments, no create/edit). Changes after updating feature settings can take up to 2 hours to propagate. |
| Agent install default | Preinstalled on CentOS, Container-Optimized OS, Debian, RHEL, Rocky Linux, SLES, Ubuntu and Windows Server images with build date `v20200114` or later |
| Active (billable) agent | VM Manager set up, VM in `RUNNING` state, agent communicating with the OS Config service; stopped, suspended or disconnected VMs are not counted |
| Proxy `no_proxy` | Must exclude metadata server `169.254.169.254` and `fd20:ce::254`; Google also recommends excluding `*.googleapis.com`; for specific VMs use `[zone-name]-osconfig.googleapis.com` (e.g. `us-central1-f-osconfig.googleapis.com`) |

## Notes

- Require OS Config constraint (`compute.requireOsConfig`): new projects get `enable-osconfig=TRUE`; requests that set it to `FALSE` are rejected for new and existing VMs and projects; it does not change existing VMs or projects. `osconfig-disabled-features` still works. For App Engine flexible environment, Google recommends disabling the constraint because it prevents Flex VM creation.
- Google-managed VMs (App Engine flexible environment, Serverless VPC Access connector, Managed Service for Apache Spark) have VM Manager disabled by default even with project-wide metadata.
- Security caution from the source: roles that allow creating patch jobs or OS policy assignments grant access to run code on VMs. Follow least privilege. If VM Manager is unused, set `enable-osconfig` to `FALSE`, disable features via metadata and disable the agent. Metadata values do not stop the agent service.
- All VMs need an attached service account (no IAM roles required; used to sign API requests). VMs without internet access need Private Google Access.
- Corrected from the official docs: the Debian 13 and later apt repository line `deb [signed-by=/etc/apt/keyrings/google-keyring.gpg] http://packages.cloud.google.com/apt ...` is shown with `https://`; the Debian 12 and earlier apt repository lines `deb http://packages.cloud.google.com/apt ...` (two lines) are shown with `https://` and `[signed-by=/usr/share/keyrings/cloud.google.gpg]`.
- Adapted from the official docs: the Debian 12 and earlier key step `curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -` pipes a download into a root command and uses `apt-key`, which the gcloud CLI install page keeps only "For older distributions"; it is shown as download (`curl -fsSLo`), inspect (`gpg --show-keys`), then `sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg`, the form the gcloud CLI install page uses for "newer distributions (Debian 9+ or Ubuntu 18.04+)" (`curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg`, with `deb [signed-by=/usr/share/keyrings/cloud.google.gpg] ...`). The Debian 13 and later key step `sudo curl https://packages.cloud.google.com/apt/doc/apt-key.gpg -o ...` is shown with `curl -f` so that an HTTP error page is not saved as the keyring.
- Never put secrets in startup scripts or metadata. Setting `enable-guest-attributes=TRUE,enable-osconfig=TRUE` is the variant for the earlier version of OS inventory management.
- Omitted: the startup-script install example (Debian 10), the folder / project variants of the organization-policy command (`--folder=folder-id`, `--project=project-id`), the `enable-guest-attributes=TRUE,enable-osconfig=TRUE` variants of the metadata commands, the Ubuntu 16.04 / 18.04 repository commands, SLES / openSUSE repository setup, Console steps, and a few REST descriptions. Hierarchical activation is Preview (Pre-GA Offerings Terms apply). The source also shows Console steps.
- Verification guide: https://docs.cloud.google.com/compute/docs/troubleshooting/vm-manager/verify-setup
- Source (apt key with `gpg --dearmor` and `signed-by`): https://docs.cloud.google.com/sdk/docs/install-sdk (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/vm-manager/docs/setup (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [patch.md](./patch.md)
- [os-policies.md](./os-policies.md)
- [os-inventory-management.md](./os-inventory-management.md)
