---
source: https://docs.cloud.google.com/iam/docs/maintain-custom-roles-deployment-manager
---

# Maintaining Custom Roles with Deployment Manager

Describe IAM custom roles as config-as-code using Cloud Deployment Manager configurations, schemas, and Jinja templates.

## Signature / Usage

`project_custom_role.yaml`:

Adapted (not in the official docs): `stage: GA` is added because the template reads `properties["stage"]` and the official config does not define it (an undefined property fails expansion).

```yaml
imports:
- path: project_custom_role.jinja

resources:
- name: custom-role
  type: project_custom_role.jinja
  properties:
    roleId: myCustomRole
    title: My Title
    description: My description.
    stage: GA
    includedPermissions:
    - iam.roles.get
    - iam.roles.list
```

`project_custom_role.jinja`:

```yaml
resources:
- name: custom-role
  type: gcp-types/iam-v1:projects.roles
  properties:
    parent: projects/{{ env["project"] }}

    roleId: {{ properties["roleId"] }}

    role:
      title: {{ properties["title"] }}

      description: {{ properties["description"] }}

      stage: {{ properties["stage"] }}

      includedPermissions: {{ properties["includedPermissions"] }}
```

Deploy and inspect:

```bash
gcloud deployment-manager deployments create \
   your-deployment-name --config project_custom_role.yaml
gcloud deployment-manager deployments describe your-deployment-name
gcloud deployment-manager manifests describe your-manifest-id \
    --deployment your-deployment-name
```

## Notes

- Adapted from the official docs: `stage: GA` added to `project_custom_role.yaml`; the template references `properties["stage"]`. Use `ALPHA` / `BETA` / `GA` as needed.
- Deprecation: Deployment Manager is deprecated; support ends and new usage is restricted, with Infrastructure Manager as the successor (see the gcp-services-index skill, `references/lifecycle/shutdown-and-deprecated.md`; confirm the current dates there). Prefer Infrastructure Manager (Terraform) or `gcloud iam roles create` for new custom-role automation. Not confirmed in the official docs for exact shutdown dates on this page.
- Custom roles are maintained by your organization: new permissions are not added automatically, so beta features stay unavailable until the permissions are added. Config files plus source control support auditing, launch stage promotion (`ALPHA` to `BETA`), and sharing patterns.
- Deployment Manager config types: configurations (YAML resources), schemas (properties and defaults; project and organization variants), templates (Jinja or Python).
- Prerequisite: enable the IAM and Deployment Manager APIs (needs Service Usage Admin, `roles/serviceusage.serviceUsageAdmin`) and grant the Role Administrator role to the "Google APIs service agent" principal so it can manage roles. That grant is powerful; remove it once the deployment is complete if not needed.
- Sample repository: `GoogleCloudPlatform/deploymentmanager-samples`, directory `examples/v2/iam_custom_role/jinja`.
- Source: https://docs.cloud.google.com/iam/docs/maintain-custom-roles-deployment-manager
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [iam-concepts-and-console-grant.md](./iam-concepts-and-console-grant.md)
