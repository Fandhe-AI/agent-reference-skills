---
source: https://docs.cloud.google.com/application-design-center/docs/design-application-templates
---

# Design standard application templates

Standard application templates define a preferred architecture and govern the resources and configuration developers use. A standard template can be shared in a space, published to a catalog, or embedded in a composite template. Developers configure each component but cannot add or remove components. Each template generates Terraform code that developers can download or deploy from App Design Center.

## Signature / Usage

### Create a template

```bash
gcloud design-center spaces application-templates create APPLICATION_TEMPLATE \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--display-name=DISPLAY_NAME \
--description=DESCRIPTION
```

### Add components from the Google catalog and connect them

Identify the template revision URIs of Google catalog components.

```bash
gcloud design-center spaces shared-templates list \
--google-catalog \
--location=us-central1
```

Add a component (repeat with a second component ID and URI).

```bash
gcloud design-center spaces application-templates components create COMPONENT \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--application-template=APPLICATION_TEMPLATE \
--shared-template-revision-uri=SHARED_TEMPLATE_URI
```

Create a connection between two components.

```bash
gcloud design-center spaces application-templates components connections create CONNECTION \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--application-template=APPLICATION_TEMPLATE \
--component=COMPONENT \
--destination-component-uri=COMPONENT_2
```

Add input and output variables.

```bash
gcloud design-center spaces application-templates update APPLICATION_TEMPLATE \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--add-root-input-variables=componentUri=COMPONENT_URI,variable=VARIABLE \
--add-root-output-variables=componentUri=COMPONENT_URI,variable=VARIABLE
```

### Configure default values for components

Describe a component to view its parameters.

```bash
gcloud design-center spaces application-templates components describe COMPONENT \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--application-template=APPLICATION_TEMPLATE
```

Parameter file (for example for a Cloud Run component), created in your home directory:

```json
  [
      {
        "key": "service_name",
        "value": "frontend-service"
      },
      {
        "key": "project_id",
        "value": "DEPLOYMENT_PROJECT"
      }
  ]
```

```bash
gcloud design-center spaces application-templates components update COMPONENT \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--parameters=PARAMETERS_FILE_PATH \
--application-template=APPLICATION_TEMPLATE
```

Edit connection parameters.

```bash
gcloud design-center spaces application-templates components connections update CONNECTION \
    --component=COMPONENT \
    --application-template=APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --source-component-parameters='[{"key": "SOURCE_KEY", "value": "SOURCE_VALUE"}]'
```

### Delete a template

```sh
gcloud design-center spaces application-templates delete APPLICATION_TEMPLATE \
--project=PROJECT \
--location=LOCATION \
--space=SPACE
```

## Options / Props

### Required roles

| Task | Required roles |
|---|---|
| Create, design and edit standard application templates | Application Design Center Admin (`roles/designcenter.admin`) or Application Design Center User (`roles/designcenter.user`) |
| Publish or share standard templates to a catalog | Application Design Center Admin (`roles/designcenter.admin`) |

### Placeholders

| Name | Description |
|---|---|
| `PROJECT` | Your management project ID |
| `LOCATION` | The application template region |
| `SPACE` | Your space ID |
| `SHARED_TEMPLATE_URI` | Component shared template revision URI, for example `projects/my-project/locations/us-central1/spaces/my-space/sharedTemplates/my-shared-template/revisions/rev1` |
| `COMPONENT_URI` / `VARIABLE` | Component that is the basis of the variable and the component variable (for example `database_name`) |

### Component kinds

| Kind | Description |
|---|---|
| Assets | High-level resources that help you control other resources, such as service accounts |
| Services | Network or API interfaces consumed over the network, such as Cloud Storage and Vertex AI |
| Workloads | Binary deployments that perform business functions, such as Cloud Run and Compute Engine |

### Generated Terraform files

| File | Content |
|---|---|
| `main.tf` | Infrastructure code with a module for each component |
| `outputs.tf` | Information about deployed infrastructure components |
| `variables.tf` | Name, type and description of variables used in `main.tf` |
| `input.tfvars` | Values for variables used in `main.tf` |
| `providers.tf` | Labels that help Terraform interact with Google Cloud APIs and resources |

## Notes

- Deleting a template is irreversible; try it on a disposable project or template first.
- Component project selection (console): the project must be inside the app-enabled folder and must not be a management project.
- Variables are exposed in generated `variables.tf` and `outputs.tf`; in a composite template an output of one standard template (for example a database name) can be an input of another.
- Verify a template before sharing: create an application with Environment `TEST` and Criticality `LOW`, deploy it, test, then delete the test deployment to avoid recurring costs.
- Revisions: modifying a template creates a template revision; developers must deploy applications using the revision to apply changes. Revisions are not published to catalogs automatically; add the template to the catalog again.
- Security frameworks (Preview): running assessments at design time is optional but recommended because assessments are enforced before deployment. With Security Command Center Standard tier templates are validated against the Security Essentials framework; with Premium or Enterprise you can create and attach additional frameworks (folder-level or single-project boundary).
- Generated Terraform can be edited in the console Code view (validated automatically, View diff, Save code changes).
- The source also shows the design canvas and Console steps, omitted here.
- Source: https://docs.cloud.google.com/application-design-center/docs/design-application-templates (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-catalogs.md](./manage-catalogs.md)
- [supported-resources.md](./supported-resources.md)
- [enforce-security-policies.md](./enforce-security-policies.md)
- [deploy-applications.md](./deploy-applications.md)
