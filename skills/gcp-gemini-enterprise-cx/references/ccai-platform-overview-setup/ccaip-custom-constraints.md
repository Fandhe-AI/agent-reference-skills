---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/ccaip-custom-constraints
---

# Custom organization policy constraints for CCAI Platform

Organization Policy custom constraints for CCAI Platform give fine-grained control over ingress and egress network paths that VPC Service Controls does not cover, by partitioning traffic into components. Implementing a custom constraint requires the instance to be configured for private access, which restricts public internet access and requires Private Service Connect for agents, managers and administrators.

## Signature / Usage

### Create a custom constraint

Conditions are written in Common Expression Language (CEL) against the `ContactCenter` resource. Write the YAML file and use its path as `CONSTRAINT_PATH` below.

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes:
- contactcenteraiplatform.googleapis.com/ContactCenter
methodTypes:
- CREATE
- UPDATE
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

The source describes these test results with the `AGENT` example condition enforced (whether `UPDATE` is enforced is inconsistent in the source; see Notes): creating or updating an instance with a component of type `AGENT` succeeds (create the instance configured for private access, then update it, for example change the deployment schedule); creating an instance without private access and an `AGENT` component fails. For an existing instance without an `AGENT` component, updates fail after enforcement, unless the update configures private access and adds an `AGENT` component (you then need a Private Service Connect connection to access it).

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

### Supported resources and operations

| Resource | Action | Attribute | Operator | Example condition |
|---|---|---|---|---|
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | name | contains | `resource.name.contains("us-central1/contactCenters/myContactCenter")` |
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | name | matches | `resource.name.matches("projects/my-project/locations/us-central1/contactCenters/myContactCenter")` |
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | name | startsWith | `resource.name.startsWith("projects/my-project")` |
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | name | endsWith | `resource.name.endsWith("myContactCenter")` |
| ContactCenter | Create or update an instance. For more information, see [Create a CCAI Platform instance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/get-started#create-ccaip-instance). | privateAccess | exists | `resource.privateAccess.ingressSettings.exists(private_component, private_component.name == 'AGENT')` Checks that the `AGENT` component is enabled. |

## Notes

- Required roles: Organization policy administrator (`roles/orgpolicy.policyAdmin`) on the organization resource; for full access to CCAI Platform resources, Contact Center AI Platform Admin (`roles/contactcenteraiplatform.admin`) on the project; Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) on the project. Permissions: `orgpolicy.customConstraints.get`, `.list`, `.create`, `.update`, `.delete`. If you use an external identity provider, first sign in to the gcloud CLI with your federated identity, then run `gcloud init`.
- Organization Policy Service, including predefined and custom organization policies, is offered at no charge. Policies are inherited by descendants of the resource on which they are enforced.
- Limitations: CCAI Platform is not integrated with Cloud Asset Inventory, so the Policy Simulator feature of Policy Intelligence is not available for CCAI Platform Organization Policy. Most resource types support up to 20 custom constraints; creating more fails.
- The `ALLOW` action means the create or update operation is permitted only if the condition evaluates to true; every other case not explicitly listed in the condition is blocked.
- Source inconsistency: the first YAML lists `methodTypes` `- CREATE` and `- UPDATE`, and the test section says "Creating or updating an instance without a component of type `AGENT`fails" and that for an existing instance "updates to the instance fail"; the Console instructions say "This constraint can only be enforced on the REST `CREATE` method." and the gcloud instructions say `methodTypes` "Can only be `CREATE`." The first block is kept as the source writes it; the source does not settle whether `UPDATE` is enforced. The source's gcloud-specific YAML block writes `resourceTypes: RESOURCE_NAME` as a scalar and is omitted; use the list form shown above.
- In the supported resources table, the retrieved page has six more rows after the `privateAccess` / `exists` row, all truncated: one row has only the Resource, Action and Attribute cells (`ContactCenter`, the same Action text, `privateAccess`) and five rows have only the Resource and Action cells (`ContactCenter`, the same Action text). They carry no operator or example condition and are left out (they would also break the five-column table). The "Example custom organization policies" table holds its YAML only as collapsed single-line cell text and is not reproduced. The second example in the source also has an unbalanced parenthesis in its condition.
- The source shows the Console and gcloud only; the Console steps for creating a constraint and the `gcloud init` block are omitted.
- Creating private access instances is covered on the get-started page; Private Service Connect is covered on the VPC Service Controls page.
- Discovery (`contactcenteraiplatform.v1alpha1`): `ContactCenter.privateAccess` is a `PrivateAccess` object with `ingressSettings` and `egressSettings` (lists of `Component` with `name` and `serviceAttachmentNames`) and `pscSetting`.
- The `startsWith` example condition `resource.name.startsWith("projects/my-project")` in the Supported resources and operations table is copied as written; that prefix also matches other projects whose ID begins with `my-project` (for example `projects/my-project2`). To match one project only, end the prefix with `/` (`"projects/my-project/"`).
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/ccaip-custom-constraints (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-service-controls.md](./vpc-service-controls.md)
- [get-started.md](./get-started.md)
