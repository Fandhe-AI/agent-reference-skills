---
source: https://docs.cloud.google.com/security-command-center/docs/security-posture-essentials-secure-default-template
---

# Predefined posture template for secure by default, essentials

Lists the preventative organization policy constraints in v1.0 of the predefined posture template `secure_by_default_essential`. It helps prevent common misconfigurations and issues caused by default settings, and can be deployed without changes. Requires SCC Premium or Enterprise (Deprecated) with organization-level activation.

## Signature / Usage

### View the template (gcloud)

```bash
gcloud scc posture-templates describe \
    organizations/ORGANIZATION_ID/locations/global/postureTemplates/secure_by_default_essential
```

### View the template (REST)

```text
GET https://securityposture.googleapis.com/v1/organizations/ORGANIZATION_ID/locations/global/postureTemplates/secure_by_default_essential
```

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://securityposture.googleapis.com/v1/organizations/ORGANIZATION_ID/locations/global/postureTemplates/secure_by_default_essential"
```

## Options / Props

### Policies in the template

| Policy | Value / effect | Compliance standard (NIST SP 800-53) |
|---|---|---|
| `iam.disableServiceAccountKeyCreation` | `true`: prevents creating persistent service account keys. | AC-2 |
| `iam.automaticIamGrantsForDefaultServiceAccounts` | `true`: disables automatic Editor grant to default service accounts at creation. | AC-3 |
| `iam.disableServiceAccountKeyUpload` | `true`: disables service account key uploads (avoids leaked and reused key material). | AC-6 |
| `storage.publicAccessPrevention` | `true`: prevents public access to Cloud Storage buckets. | AC-3 and AC-6 |
| `storage.uniformBucketLevelAccess` | `true`: enforces uniform bucket-level access (no per-object ACLs). | AC-3 and AC-6 |
| `compute.requireOsLogin` | `true`: requires OS Login on newly created VMs. | AC-3 and AU-12 |
| `compute.disableSerialPortAccess` | `true`: disables VM serial port access. | AC-3 and AC-6 |
| `compute.restrictXpnProjectLienRemoval` | `true`: restricts removal of Shared VPC host project liens. | AC-3 and AC-6 |
| `compute.vmExternalIpAccess` | `denyAll`: no VM instance may have a public IP address. Allowed instances can be set with `policy_rules` `allowed_values` entries of the form `is:projects/PROJECT_ID/zones/ZONE/instances/INSTANCE`. | AC-3 and AC-6 |
| `compute.skipDefaultNetworkCreation` | `true`: no default VPC network and default firewall rules in new projects. | AC-3 and AC-6 |
| `compute.setNewProjectDefaultToZonalDNSOnly` | `Zonal DNS only` for new projects (restricts legacy DNS settings). | AC-3 and AC-6 |
| `sql.restrictPublicIp` | `true`: Cloud SQL instances cannot have public IP addresses. | AC-3 and AC-6 |
| `sql.restrictAuthorizedNetworks` | `true`: prevents public or non-RFC 1918 ranges from accessing Cloud SQL. | AC-3 and AC-6 |
| `compute.restrictProtocolForwardingCreationForTypes` | `INTERNAL`: protocol forwarding for internal IP addresses only. | AC-3 and AC-6 |
| `compute.disableVpcExternalIpv6` | `true`: disables external IPv6 subnets. | AC-3 and AC-6 |
| `compute.disableNestedVirtualization` | `true`: turns off nested virtualization for all Compute Engine VMs. | AC-3 and AC-6 |

## Notes

- The source also shows the Windows PowerShell / cmd.exe variants of the gcloud command and the PowerShell `Invoke-WebRequest` form of the REST call.
- Deploying this template enforces these constraints on real resources (for example, no external IPs and no service account keys) and can block existing workflows; the source recommends reviewing policies against your environment. Deploy it first to a non-production folder or project.
- The `curl` form sends an access token from `gcloud auth print-access-token` in the `Authorization` header over HTTPS; do not paste the token or the expanded command into shared logs or tickets.
- The SCC Enterprise tier shuts down on May 21, 2027; organizations move to Premium on or after that date.
- Source: https://docs.cloud.google.com/security-command-center/docs/security-posture-essentials-secure-default-template (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-posture-overview.md](./security-posture-overview.md)
- [how-to-use-security-posture.md](./how-to-use-security-posture.md)
