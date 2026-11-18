---
source: https://docs.cloud.google.com/application-design-center/docs/deploy-applications
---

# Deploy applications

Deploying an application draft provisions Google Cloud resources and registers the application in App Hub. Before deploying you can preview the planned Terraform changes, assess the design against organization policies and enable required APIs. Afterwards you can troubleshoot failures, inspect details and apply new template revisions.

## Signature / Usage

### Preview, then deploy

Preview can take several minutes. Automatically create a service account:

```bash
gcloud design-center spaces applications preview APPLICATION \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--create-sa \
--service-account=SERVICE_ACCOUNT
```

Or use your own service account:

```bash
gcloud design-center spaces applications preview APPLICATION \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--service-account=SERVICE_ACCOUNT
```

Deploy asynchronously and copy the full operation name (create a service account):

```bash
 gcloud design-center spaces applications deploy APPLICATION \
 --project=PROJECT \
 --location=LOCATION \
 --space=SPACE \
 --create-sa \
 --service-account=SERVICE_ACCOUNT \
 --async
```

Deploy with your own service account:

```bash
 gcloud design-center spaces applications deploy APPLICATION \
 --project=PROJECT \
 --location=LOCATION \
 --space=SPACE \
 --service-account=SERVICE_ACCOUNT \
 --async
```

Track the deployment:

```bash
gcloud design-center operations describe OPERATION \
--project=PROJECT \
--location=LOCATION
```

### View application details

```bash
gcloud design-center spaces applications describe APPLICATION \
--project=PROJECT \
--location=LOCATION \
--space=SPACE
```

### Apply a template revision

Find the latest revision URI:

```bash
 gcloud design-center spaces application-templates describe APPLICATION_TEMPLATE \
 --project=PROJECT \
 --location=LOCATION \
 --space=SPACE \
 --format='yaml(name,latestRevision)'
```

Update the application to use it, then redeploy with `--replace`:

```bash
 gcloud design-center spaces applications update APPLICATION \
 --project=PROJECT \
 --location=LOCATION \
 --space=SPACE \
 --source-application-template-revision=SOURCE_APPLICATION_TEMPLATE_REVISION
```

## Options / Props

### Required roles

| Task | Required roles |
|---|---|
| Deploy an application and apply template revisions | Application Admin (`roles/designcenter.applicationAdmin`) or Application Operator (`roles/designcenter.applicationOperator`) |
| Automatically create a service account during deployment | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) |

### Placeholders

| Name | Description |
|---|---|
| `APPLICATION` | The application ID |
| `LOCATION` | The application region |
| `SERVICE_ACCOUNT` | With `--create-sa`: a name for the new service account. Otherwise the full resource name `projects/PROJECT/serviceAccounts/EMAIL_ADDRESS` |
| `OPERATION` | Full operation name from the deploy output, `projects/PROJECT/locations/LOCATION/operations/operation-OPERATION_ID` |
| `SOURCE_APPLICATION_TEMPLATE_REVISION` | `projects/PROJECT/locations/LOCATION/spaces/SPACE/applicationTemplates/APPLICATION_TEMPLATE/revisions/REVISION` |

## Notes

- Deploying creates Google Cloud resources and you begin to incur charges. For an application you plan to delete later, deploy to the `TEST`, `DEVELOPMENT` or `STAGING` Environment, and try it on a disposable project first.
- To update an existing application, add `--replace` to the deploy commands. If you modified an application's components outside App Design Center, those changes are not retained on redeploy; revise the template (then apply the revision) or revise the application instead.
- Use an existing service account whose roles are granted as described in "Grant roles to your service account" (`https://docs.cloud.google.com/application-design-center/docs/grant-roles-service-account`), or let the deployment create one (requires `roles/resourcemanager.projectIamAdmin` to assign the deployment roles).
- Source inconsistency: the source names `roles/designcenter.applicationOperator`, which is not listed in the generated Application Design Center IAM reference (`roles/designcenter.applicationAdmin`, `roles/designcenter.admin`, `roles/designcenter.user` and `roles/designcenter.applicationEditor` are); the role name is kept as the source writes it.
- The deploy output operation is tracked with `design-center operations describe`; a failed operation must be checked there and in the Deployments panel (View logs) rather than assumed successful.
- Troubleshoot Deployment (Preview): analyzes errors and suggests documentation, configuration changes (Update Application) or gcloud commands (Run command in Cloud Shell).
- Application details show last update time, revision date, region, source template, service account, outputs such as service URIs, deployment status and links to logs, plus a link to App Hub.
- The source also shows Console steps, omitted here.
- Source: https://docs.cloud.google.com/application-design-center/docs/deploy-applications (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [design-application-templates.md](./design-application-templates.md)
- [import-terraform.md](./import-terraform.md)
- [enforce-security-policies.md](./enforce-security-policies.md)
