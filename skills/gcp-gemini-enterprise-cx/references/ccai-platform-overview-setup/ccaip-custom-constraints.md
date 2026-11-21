---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/ccaip-custom-constraints
---

# Custom organization policy constraints for CCAI Platform

Organization Policy custom constraints for CCAI Platform give fine-grained control over ingress and egress network paths that VPC Service Controls does not cover, by partitioning traffic into components. Implementing a custom constraint requires the instance to be configured for private access, which restricts public internet access and requires Private Service Connect for agents, managers and administrators.

## Signature / Usage

### Create a custom constraint

Conditions are written in Common Expression Language (CEL) against the `ContactCenter` resource. Write the YAML file and use its path as `CONSTRAINT_PATH` below.

Adapted (not in the official docs): `methodTypes` lists `CREATE` only; the source's block also lists `UPDATE`, but the same page's Console and gcloud instructions say the constraint can only be enforced on `CREATE`.

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes:
- contactcenteraiplatform.googleapis.com/ContactCenter
methodTypes:
- CREATE
condition: "CONDITION"
actionType: ACTION_TYPE
displayName: "DISPLAY_NAME"
description: "DESCRIPTION"
```

- `ORGANIZATION_ID`: your organization ID.
- `CONSTRAINT_NAME`: must start with a `custom.` prefix and can only include uppercase letters, lowercase letters, or numbers, for example `custom.requirePrivateAccess`; maximum length of 70 characters, not counting the prefix.
- `CONDITION`: a CEL condition, for example `resource.privateAccess.ingressSettings.exists(private_component, private_component.name == 'AGENT')`; maximum length of 1,500 characters.
- `ACTION_TYPE`: specify `ALLOW`.
- `DISPLAY_NAME`: maximum length of 200 characters. `DESCRIPTION`: shown as the error message when the policy is violated; maximum length of 2000 characters.

### Set up a custom constraint

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
```

Replace `CONSTRAINT_PATH` with the full path to your custom constraint file, for example `/home/user/customconstraint.yaml`. Then verify it exists:

```bash
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
```

### Enforce a custom constraint

Create a policy YAML file that references the constraint:

```yaml
name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: true
```

`PROJECT_ID` is the project on which you enforce the constraint and `CONSTRAINT_NAME` the name you defined, for example `custom.requirePrivateAccess`. Then run the following; the policy takes up to 15 minutes to take effect.

```bash
gcloud org-policies set-policy POLICY_PATH
```

### Test the constraint

With the `AGENT` example condition enforced on `CREATE`, creating an instance configured for private access (with a component of type `AGENT`) succeeds, and you then need a Private Service Connect connection to access it; attempting to create an instance without configuring private access fails, because creation that does not match the condition is blocked. The example constraint applies to `CREATE` only: the Action column of the supported resources table below reads "Create or update an instance." as the source writes it, but this page does not state that updates of existing instances are checked (see Notes).

## Options / Props

### Components

| Component | Description | Traffic direction | Example value |
|---|---|---|---|
| `AGENT` | The group of all ingress network paths related to the tasks that an agent, manager, or CCAI Platform administrator does. | Ingress | `AGENT` |
| `CRM` | Egress traffic to a customer relationship management (CRM) app. | Egress | `CRM` |
| `MEDIA` | Media egress traffic. | Egress | `MEDIA` |
| `DIRECT_ACCESS_POINT` | Egress traffic to a direct access endpoint (DAP). | Egress | `DIRECT_ACCESS_POINT` |
| `EMAIL` | Email egress traffic. | Egress | `EMAIL` |
| `COBROWSE` | Screen Share egress traffic. | Egress | `COBROWSE` |

### Supported resources and operations (as the source writes them; the example constraint on this page sets `methodTypes` to `CREATE` only and does not check updates)

| Resource | Action | Attribute | Operator | Example condition |
|---|---|---|---|---|
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | name | contains | `resource.name.contains("us-central1/contactCenters/myContactCenter")` |
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | name | matches | `resource.name.matches("projects/my-project/locations/us-central1/contactCenters/myContactCenter")` |
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | name | startsWith | `resource.name.startsWith("projects/my-project/")` |
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | name | endsWith | `resource.name.endsWith("/contactCenters/myContactCenter")` |
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | privateAccess | exists | `resource.privateAccess.ingressSettings.exists(private_component, private_component.name == 'AGENT')` Checks that the `AGENT` component is enabled. |

## Notes

- Required roles: Organization policy administrator (`roles/orgpolicy.policyAdmin`) on the organization resource; for full access to CCAI Platform resources, Contact Center AI Platform Admin (`roles/contactcenteraiplatform.admin`) on the project; Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) on the project. Permissions: `orgpolicy.customConstraints.get`, `.list`, `.create`, `.update`, `.delete`. If you use an external identity provider, first sign in to the gcloud CLI with your federated identity, then run `gcloud init`.
- Organization Policy Service, including predefined and custom organization policies, is offered at no charge. Policies are inherited by descendants of the resource on which they are enforced.
- Limitations: CCAI Platform is not integrated with Cloud Asset Inventory, so the Policy Simulator feature of Policy Intelligence is not available for CCAI Platform Organization Policy. Most resource types support up to 20 custom constraints; creating more fails.
- The supported resources and operations table is kept as the source writes it: every row gives the Action "Create or update an instance.", but the example constraint on this page sets `methodTypes` to `- CREATE` only, so it applies to instance creation and does not check updates of existing instances. Whether `UPDATE` is supported is stated inconsistently in the source: its first YAML block lists `- UPDATE` and its Console instructions say "the operation to create or update the resource is permitted only if the condition evaluates to true", while the same Console instructions say "This constraint can only be enforced on the REST `CREATE` method." and its gcloud instructions say `methodTypes` "Can only be `CREATE`." (full quotes in the source inconsistency note below).
- With the `ALLOW` action and `methodTypes` `CREATE`, creating an instance is permitted only if the condition evaluates to true; every other creation not explicitly listed in the condition is blocked.
- Source inconsistency: the source covers both create and update in several places: its first YAML block lists `methodTypes` `- CREATE` and `- UPDATE`; its Console instructions say "The allow action means that the operation to create or update the resource is permitted only if the condition evaluates to true. Every other case except those explicitly listed in the condition is blocked."; its gcloud instructions say "The allow action means that if the condition evaluates to true, the operation to create or update the resource is permitted."; every row of its supported resources table gives the Action "Create or update an instance."; and its test section says "Creating or updating an instance without a component of type `AGENT`fails", that for an instance that existed before enforcement "updates to the instance fail (unless the updates include adding a component of type `AGENT`" and that changing the deployment schedule of a private instance "The update succeeds.". But the same Console instructions say "This constraint can only be enforced on the REST `CREATE` method." and the same gcloud instructions say `methodTypes` "Can only be `CREATE`." The source does not settle whether `UPDATE` is accepted or enforced, so the page applies the constraint to `CREATE` only and does not state that updates of existing instances are checked. The source's gcloud-specific YAML block writes `resourceTypes: RESOURCE_NAME` as a scalar and is omitted; use the list form shown above.
- Corrected from the official docs: the first YAML block writes `methodTypes:` with `- CREATE` and `- UPDATE`; the page keeps `- CREATE` only, the value the same page's Console and gcloud instructions allow.
- In the supported resources table, the retrieved page has six more rows after the `privateAccess` / `exists` row, all truncated: one row has only the Resource, Action and Attribute cells (`ContactCenter`, the same Action text, `privateAccess`) and five rows have only the Resource and Action cells (`ContactCenter`, the same Action text). They carry no operator or example condition and are left out (they would also break the five-column table). The "Example custom organization policies" table holds its YAML only as collapsed single-line cell text and is not reproduced. The second example in the source also has an unbalanced parenthesis in its condition.
- The source shows the Console and gcloud only; the Console steps for creating a constraint and the `gcloud init` block are omitted.
- Creating private access instances is covered on the get-started page; Private Service Connect is covered on the VPC Service Controls page.
- Discovery (`contactcenteraiplatform.v1alpha1`): `ContactCenter.privateAccess` is a `PrivateAccess` object with `ingressSettings` and `egressSettings` (lists of `Component` with `name` and `serviceAttachmentNames`) and `pscSetting`.
- Corrected from the official docs: the Supported resources and operations table writes the `startsWith` example as `resource.name.startsWith("projects/my-project")` and the `endsWith` example as `resource.name.endsWith("myContactCenter")`. That prefix also matches other projects whose ID begins with `my-project` (for example `projects/my-project2`), and that suffix also matches contact centers whose ID ends with `myContactCenter` (for example `.../contactCenters/xmyContactCenter`); the table ends the prefix with `/` and starts the suffix at `/contactCenters/` so each matches one project or one contact center ID. The `contains` example `resource.name.contains("us-central1/contactCenters/myContactCenter")` is kept as written; it also matches longer IDs such as `myContactCenter2`.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/ccaip-custom-constraints (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-service-controls.md](./vpc-service-controls.md)
- [get-started.md](./get-started.md)
