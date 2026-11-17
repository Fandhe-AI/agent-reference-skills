---
source: https://docs.cloud.google.com/vpc/docs/move-ip-address-different-project
---

# Move an external IPv4 address to a different project

Move a reserved (static) external IPv4 address, regional or global, from one project to another, within one organization or across organizations.

## Signature / Usage

### gcloud

Regional address:

```bash
gcloud compute addresses move ADDRESS_NAME \
    --target-project=TARGET_PROJECT \
    --region=REGION
```

Regional address with a new name and description:

```bash
gcloud compute addresses move ADDRESS_NAME \
    --target-project=TARGET_PROJECT \
    --new-name=NEW_NAME \
    --description=NEW_DESCRIPTION \
    --region=REGION
```

Global address:

```bash
gcloud compute addresses move ADDRESS_NAME \
    --target-project=TARGET_PROJECT \
    --global
```

### REST

Regional address:

```text
POST https://www.googleapis.com/compute/v1/projects/SOURCE_PROJECT/regions/REGION/addresses/ADDRESS_NAME/move
```

Adapted (not in the official docs): removed the trailing comma (invalid JSON in the source) and used `regions/REGION/addresses/` in `destination_address`, as the Compute Engine API documents for regional moves.

```json
{
  "destination_address": "projects/TARGET_PROJECT/regions/REGION/addresses/ADDRESS_NAME"
}
```

Regional address with a new name and description:

```text
POST https://www.googleapis.com/compute/v1/projects/SOURCE_PROJECT/regions/REGION/addresses/ADDRESS_NAME/move
```

Adapted (not in the official docs): removed the trailing comma and used `regions/REGION/addresses/` in `destination_address`, as above.

```json
{
  "destination_address": "projects/TARGET_PROJECT/regions/REGION/addresses/NEW_NAME",
  "description": "NEW_DESCRIPTION"
}
```

Global address:

```text
POST https://www.googleapis.com/compute/v1/projects/SOURCE_PROJECT/global/addresses/ADDRESS_NAME/move
```

Adapted (not in the official docs): removed the trailing comma (invalid JSON in the source).

```json
{
  "destination_address": "projects/TARGET_PROJECT/global/addresses/ADDRESS_NAME"
}
```

## Options / Props

### Placeholders

| Name | Description |
|------|-------------|
| `ADDRESS_NAME` | Name of the address resource to move |
| `SOURCE_PROJECT` | Project that currently holds the address |
| `TARGET_PROJECT` | Name or ID of the project to move the address to |
| `REGION` | Region of the address |
| `NEW_NAME` | New name in the new project |
| `NEW_DESCRIPTION` | New description; if omitted the existing description is kept |

### Permissions

| Address | Permissions |
|---------|-------------|
| Regional | `compute.addresses.delete` in the source project; `compute.addresses.create` in the destination project |
| Global | `compute.globalAddresses.delete` in the source project; `compute.globalAddresses.create` in the destination project |

Example roles: Compute Admin (`roles/compute.admin`), Compute Network Admin (`roles/compute.networkAdmin`), Compute Public IP Admin (`roles/compute.publicIpAdmin`).

### Prerequisites and limitations

| Item |
|------|
| Per-project system limits "Address move requests per minute" and "Address move requests per minute per region" must not be `0`; if `0`, contact your Google Cloud sales team. |
| Target project must exist and have the Compute Engine API enabled, with capacity in the static IP addresses quota (regional) or static IP addresses global quota (global). |
| The address must be external, IPv4, reserved (static), not in use by any resource, and not reserved by Cloud Support as part of a contiguous range. |
| After unassigning, wait 10 minutes (global) or 20 minutes (regional) before moving. |
| You cannot change the region of a regional address, or convert global to regional or the reverse. |
| BYOIP addresses and IPv6 addresses cannot be moved between projects. |

## Notes

- Corrected from the official docs: the source request bodies end with a trailing comma (`"destination_address": "...",` and `"description": "NEW_DESCRIPTION",`), which is invalid JSON. Its regional examples write `"destination_address": "projects/TARGET_PROJECT/global/addresses/ADDRESS_NAME"` (and `.../global/addresses/NEW_NAME`); the Compute Engine API reference for `RegionAddressesMoveRequest.destinationAddress` documents `projects/project/regions/region/addresses/address`, so `regions/REGION/addresses/` is used. The source's `SOURCE_PROJECT` entry reads "the name or ID of the project that you want to move the IP address to" (the same text as `TARGET_PROJECT`); in the Placeholders table it is described as the project that currently holds the address.
- The move removes the address from the source project and creates it in the destination, which can break connectivity for anything using it; try it on a disposable address first. By default the name and description are kept.
- Troubleshooting: the error `Invalid resource usage: 'Cannot move address that belongs to a reserved address range. Address range must be disassembled first.'` means Cloud Support reserved the address as part of a contiguous range (its name has the form `STRING-198-51-100-2`); contact Cloud Support.
- The source also shows the Console. The full gcloud flag list is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/vpc/docs/move-ip-address-different-project (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ip-addresses.md](./ip-addresses.md)
- [bring-your-own-ip.md](./bring-your-own-ip.md)
