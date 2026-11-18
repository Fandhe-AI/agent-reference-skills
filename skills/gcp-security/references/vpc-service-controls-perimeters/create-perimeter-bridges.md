---
source: https://docs.cloud.google.com/vpc-service-controls/docs/create-perimeter-bridges
---

# Creating a perimeter bridge

Create a bridge-type service perimeter that connects projects from different perimeters, with gcloud or the Access Context Manager API.

## Signature / Usage

### gcloud

```bash
gcloud access-context-manager perimeters create BRIDGE_NAME \
  --title="BRIDGE_TITLE" --perimeter-type=bridge \
  --resources=PROJECTS \
  --policy=POLICY_NAME
```

### API

```text
POST https://accesscontextmanager.googleapis.com/v1/accessPolicies/POLICY_NAME/servicePerimeters
```

The request body must include a `ServicePerimeter` resource that defines the bridge, with `perimeterType` set to `PERIMETER_TYPE_BRIDGE`. The response body is an `Operation` resource describing the `POST`.

## Options / Props

| Name | Description |
|---|---|
| `BRIDGE_NAME` | Name of the perimeter bridge. |
| `BRIDGE_TITLE` | Title of the bridge. |
| `PROJECTS` | Comma-delimited project identifiers such as `projects/100712` or `projects/100712,projects/233130`. Only numeric IDs are supported, not the project name. |
| `POLICY_NAME` | Numeric name of the organization's access policy, for example `330193482019`. |

## Notes

- Console: choose **Bridge** as the perimeter type and an enforcement mode (**Dry run** or **Enforced**), then add projects. Search for a perimeter by its name only (not its ID), so use a unique name.
- Creating a bridge in enforced mode changes what traffic is allowed between projects; test in dry run mode or on disposable projects first. Bridge restrictions are in share-across-perimeters.md.
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/create-perimeter-bridges (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [share-across-perimeters.md](./share-across-perimeters.md)
- [create-service-perimeters.md](./create-service-perimeters.md)
