---
source: https://docs.cloud.google.com/application-integration/docs/vpc-service-controls
---

# Set up VPC Service Controls for Application Integration

VPC Service Controls lets you define a security perimeter around the Application Integration service (`integrations.googleapis.com`) to constrain data within a VPC and mitigate data exfiltration. After the perimeter exists, ingress and egress policies decide which other Google Cloud services can reach Application Integration and which services it can reach.

## Signature / Usage

### Create a perimeter

Create it with the Console, the `gcloud` command or the `accessPolicies.servicePerimeters.create` API (the command takes some time to complete). It restricts integration services for the project.

Adapted (not in the official docs): added the `PERIMETER_NAME` positional argument (the ID of the perimeter, required by gcloud 593.0.0), removed the dangling `\` after the last flag, and replaced `projects/PROJECT_ID` with `projects/PROJECT_NUMBER` because the gcloud help describes `--resources` as `projects/<projectnumber>`.

```bash
gcloud access-context-manager perimeters create PERIMETER_NAME \
    --title=PERIMETER_TITLE \
    --resources=projects/PROJECT_NUMBER \
    --restricted-services=integrations.googleapis.com
```

`PERIMETER_NAME` is the ID of the perimeter, `PERIMETER_TITLE` is the name of the perimeter, and `PROJECT_NUMBER` is the number of the project to protect.

### Add an egress policy to an existing perimeter

The source's example adds the policy in `vpcsc-egress.yaml` to a perimeter named `integrationPerimeter`. An ingress policy is defined the same way (see the ingress rules reference in the VPC Service Controls docs).

Adapted (not in the official docs): added the missing `\` line continuation between the two lines of the source command.

```bash
gcloud access-context-manager perimeters update integrationPerimeter \
    --set-egress-policies=vpcsc-egress.yaml
```

### Verify the perimeter

```bash
gcloud access-context-manager perimeters describe integrationPerimeter
```

## Options / Props

### Tasks that cannot be used when a VPC service perimeter is enabled for Application Integration

| Task |
|---|
| Apps Script task |
| Call REST Endpoint task |
| Cloud function task |
| Send email task |

## Notes

- Use ingress and egress rules to allow IP addresses, service accounts or users to use Application Integration (https://docs.cloud.google.com/vpc-service-controls/docs/ingress-egress-rules).
- The required IAM roles to configure VPC Service Controls are in https://docs.cloud.google.com/vpc-service-controls/docs/access-control. VPC Service Controls itself is covered by `gcp-security`.
- Corrected from the official docs: the create command was shown as `gcloud access-context-manager perimeters create  \ --title=PERIMETER_TITLE --resources=projects/PROJECT_ID --restricted-services=integrations.googleapis.com \` (no `PERIMETER` positional argument, which the gcloud 593.0.0 SYNOPSIS requires, and a trailing `\`). The gcloud help describes `--resources` as "currently only projects, in the form projects/<projectnumber>".
- Corrected from the official docs: the update command was shown as `gcloud access-context-manager perimeters update integrationPerimeter` followed by an unjoined `--set-egress-policies=vpcsc-egress.yaml` line (missing `\`).
- `perimeters create`, `update` and `describe` also take `--policy=POLICY` (the access policy ID); per the gcloud help it is set automatically only if the current account belongs to an organization with exactly one access policy. Add it to the commands above otherwise.
- Source: https://docs.cloud.google.com/application-integration/docs/vpc-service-controls (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [cmek.md](./cmek.md)
- [access-control.md](./access-control.md)
