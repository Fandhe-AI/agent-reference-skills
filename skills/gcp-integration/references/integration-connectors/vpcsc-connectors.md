---
source: https://docs.cloud.google.com/integration-connectors/docs/vpcsc-connectors
---

# Set up VPC Service Controls for Integration Connectors

Restrict access to the Integration Connectors service (`connectors.googleapis.com`) with a VPC Service Controls perimeter to constrain data within the perimeter and mitigate data exfiltration. After the perimeter exists, configure policies that decide which other Google Cloud services or users can access `connectors.googleapis.com`.

## Signature / Usage

Use the Cloud console, `gcloud`, or the `accessPolicies.servicePerimeters.create` API; the steps below use `gcloud` with user access enabled. You need the permissions to configure VPC Service Controls perimeters (see Access control with IAM in the VPC Service Controls documentation).

### 1. Access level for the allowed user

Create `access.yaml` with the user allowed to access the perimeter:

```yaml
- members:
    - user:USER_EMAIL
```

Get the organization's access policy ID (select the policy for which you create the perimeter):

```bash
gcloud access-context-manager policies list --organization=ORGANIZATION_ID
```

```bash
gcloud access-context-manager levels create ACCESS_LEVEL_NAME \
--title "CUSTOM_TITLE" \
--basic-level-spec access.yaml \
--policy=POLICY_ID
```

### 2. Turn on `vpcsc` in the project's global settings

Adapted (not in the official docs): added the required `updateMask` query parameter as `?updateMask=vpcsc` (the camelCase JSON name of the `Settings.vpcsc` field; the source shows no mask) and quoted the URL.

```bash
curl -X PATCH -H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{"vpcsc": true}' \
"https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/global/settings?updateMask=vpcsc"
```

This starts a long-running operation; wait for it to complete:

```bash
curl -H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/global/operations/OPERATION_ID
```

### 3. Create the perimeter and give the user access

Adapted (not in the official docs): the flag is `--access-levels` (the source wrote `--access_levels`, which is not a gcloud flag), `--policy=POLICY_ID` was added, and the resource uses the project number form `projects/PROJECT_NUMBER` required by gcloud help.

```bash
gcloud access-context-manager perimeters create PERIMETER_NAME \
--title="PERIMETER_TITLE" \
--resources=projects/PROJECT_NUMBER \
--restricted-services=connectors.googleapis.com \
--access-levels=ACCESS_LEVEL_NAME \
--policy=POLICY_ID
```

Add `connectors.googleapis.com` and an access level to an existing perimeter:

```bash
gcloud access-context-manager perimeters update PERIMETER_NAME \
--add-restricted-services="connectors.googleapis.com" \
--add-access-levels=ACCESS_LEVEL_NAME \
--policy=POLICY_ID
```

### Verify the perimeter

Adapted (not in the official docs): added `--policy=POLICY_ID`; without it gcloud 593.0.0 fails with "Error parsing [perimeter] ... Failed to find attribute [policy]" unless the policy is set as a property or the organization has exactly one access policy.

```bash
gcloud access-context-manager perimeters describe PERIMETER_NAME --policy=POLICY_ID
```

### Remove a project from the perimeter

First set `vpcsc` to `false` in the project's global settings, then wait for the operation as above:

Adapted (not in the official docs): same fix as the earlier settings call (`?updateMask=vpcsc` added, URL quoted).

```bash
curl -X PATCH -H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{"vpcsc": false}' \
"https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/global/settings?updateMask=vpcsc"
```

Then remove the project from the perimeter:

Adapted (not in the official docs): added `--remove-resources=projects/PROJECT_NUMBER`; the source command has no flag, so it changes nothing. The help gives the resource form `projects/<projectnumber>`.

```bash
gcloud access-context-manager perimeters update accessPolicies/POLICY_ID/servicePerimeters/PERIMETER_NAME --remove-resources=projects/PROJECT_NUMBER
```

## Options / Props

### Considerations

| Condition | Effect |
|---|---|
| Connection to a Google Cloud resource | That resource must be accessible from within the perimeter. |
| Existing connections to a public endpoint | Before setting up the perimeter they must use the PSC attachment to reach the backend; without the PSC attachment they fail after the perimeter is set up. |
| Connection to a non-Google Cloud resource | The connection destination must be a PSC attachment; connections created without it fail. |
| Event subscriptions | You must enable private connectivity for event subscriptions to use the feature in a perimeter-protected project. |
| Custom connectors | Not supported in projects with VPC Service Controls enabled (stated on the Create a custom connector page). |

## Notes

- Existing connections to a public endpoint fail after the perimeter is set up unless they use a PSC attachment (see Considerations); try the perimeter on a disposable project first.
- Order of steps: `vpcsc` is set to `true` before the perimeter is created, and to `false` before the project is removed from the perimeter.
- Corrected from the official docs: `--access_levels=ACCESS_LEVEL_NAME` became `--access-levels` (the flag in the gcloud help), `--resources=projects/PROJECT_ID` became `projects/PROJECT_NUMBER` (help: "in the form projects/<projectnumber>"), and `perimeters create` gained `--policy=POLICY_ID`; `perimeters describe PERIMETER_NAME` gained `--policy=POLICY_ID`; `gcloud access-context-manager perimeters update accessPolicies/POLICY_ID/servicePerimeters/PERIMETER_NAME` (no flags) gained `--remove-resources`.
- Corrected from the official docs: both `PATCH .../locations/global/settings` calls had no `updateMask`; the connectors v1 Discovery document describes `updateMask` of `projects.locations.global.updateSettings` as "Required. The list of fields to update." The mask uses the field name `vpcsc`.
- The `access.yaml` file holds the details of the user allowed to access the perimeter. VPC Service Controls itself is in `gcp-security`.
- Omitted: Console steps.
- Source: https://docs.cloud.google.com/integration-connectors/docs/vpcsc-connectors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/integration-connectors/docs/create-custom-connector (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [eventsubscription.md](./eventsubscription.md)
- [network-connectivity-private.md](./network-connectivity-private.md)
- [custom-connectors.md](./custom-connectors.md)
