---
source: https://docs.cloud.google.com/app-hub/docs/register-resources
---

# Register existing resources to an application

Create an App Hub application as a logical container, then register supported resources inside your application management boundary as services and workloads. You first need the management project and boundary set up, the required APIs enabled, and IAM roles granted.

## Signature / Usage

### Create an application

```bash
gcloud apphub applications create APPLICATION_NAME \
  --project=PROJECT_ID \
  --scope-type=SCOPE_TYPE \
  --location=LOCATION \
  --display-name=DISPLAY_NAME \
  --criticality-type=CRITICALITY \
  --environment-type=ENVIRONMENT \
  --developer-owners=display-name=DEV_NAME,email=DEV_EMAIL \
  --operator-owners=display-name=OPERATOR_NAME,email=OPERATOR_EMAIL \
  --business-owners=display-name=BUSINESS_NAME,email=BUSINESS_EMAIL
```

```bash
gcloud apphub applications list \
  --project=PROJECT_ID \
  --location=LOCATION
```

### Register services

```bash
gcloud apphub discovered-services list \
  --project=PROJECT_ID \
  --location=REGION \
  --filter=FILTER_EXPRESSION
```

```bash
gcloud apphub applications services create SERVICE_NAME \
  --project=PROJECT_ID \
  --location=APPLICATION_LOCATION \
  --application=APPLICATION_NAME \
  --discovered-service=projects/PROJECT_ID/locations/REGION/discoveredServices/SERVICE_ID \
  --display-name=SERVICE_DISPLAY_NAME \
  --criticality-type=CRITICALITY \
  --environment-type=ENVIRONMENT \
  --developer-owners=display-name=DEV_NAME,email=DEV_EMAIL \
  --operator-owners=display-name=OPERATOR_NAME,email=OPERATOR_EMAIL \
  --business-owners=display-name=BUSINESS_NAME,email=BUSINESS_EMAIL
```

```bash
gcloud apphub applications services list \
  --application=APPLICATION_NAME \
  --project=PROJECT_ID \
  --location=APPLICATION_LOCATION
```

### Register workloads

```bash
gcloud apphub discovered-workloads list \
  --project=PROJECT_ID \
  --location=REGION \
  --filter=FILTER_EXPRESSION
```

```bash
gcloud apphub applications workloads create WORKLOAD_NAME \
  --project=PROJECT_ID \
  --location=APPLICATION_LOCATION \
  --application=APPLICATION_NAME \
  --discovered-workload=projects/PROJECT_ID/locations/REGION/discoveredWorkloads/WORKLOAD_ID \
  --display-name=WORKLOAD_DISPLAY_NAME \
  --criticality-type=CRITICALITY \
  --environment-type=ENVIRONMENT \
  --developer-owners=display-name=DEV_NAME,email=DEV_EMAIL \
  --operator-owners=display-name=OPERATOR_NAME,email=OPERATOR_EMAIL \
  --business-owners=display-name=BUSINESS_NAME,email=BUSINESS_EMAIL
```

```bash
gcloud apphub applications workloads list \
  --application=APPLICATION_NAME \
  --project=PROJECT_ID \
  --location=APPLICATION_LOCATION
```

## Options / Props

### `applications create` values

| Placeholder | Required | Values |
|---|---|---|
| `PROJECT_ID` | Yes | ID of the management project. |
| `SCOPE_TYPE` | Yes | `REGIONAL`, `MULTI_REGIONAL`, `GLOBAL` |
| `LOCATION` | Yes | `REGIONAL`: an App Hub supported region name; `MULTI_REGIONAL`: `us` or `eu`; `GLOBAL`: `global`. |
| `APPLICATION_NAME` | Yes | Unique identifier; lowercase letters, numbers, or hyphens only; cannot be changed after creation. |
| `DISPLAY_NAME` | No | Not unique; can be changed later. |
| `CRITICALITY` | No | `MISSION_CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |
| `ENVIRONMENT` | No | `PRODUCTION`, `STAGING`, `DEVELOPMENT`, `TEST` |
| `DEV_NAME` / `DEV_EMAIL`, `OPERATOR_NAME` / `OPERATOR_EMAIL`, `BUSINESS_NAME` / `BUSINESS_EMAIL` | No | Display name and email of the developer, operator and business owner. Email format `username@yourdomain`, for example `jane-doe@gmail.com`. |

### Register commands values

| Placeholder | Required | Meaning |
|---|---|---|
| `REGION` (discovered list) | Yes | Regional: App Hub supported region name; multi-regional: `us` or `eu`; global: `global`. |
| `FILTER_EXPRESSION` | No | `--filter` expression, for example `service_properties.gcp_project=projects/PROJECT_ID` or `service_properties.gcp_project=projects/PROJECT_ID AND service_reference.uri~"forwardingRules"`; for workloads `workload_properties.gcp_project=projects/PROJECT_ID`. |
| `APPLICATION_LOCATION` | Yes | Location of the application (region, `us` / `eu`, or `global`). |
| `APPLICATION_NAME` | Yes | Application to register into. |
| `SERVICE_ID` / `WORKLOAD_ID` | Yes | ID copied from the discovered list output. |
| `SERVICE_NAME` / `WORKLOAD_NAME` | Yes | Name used to register it in the application. |

## Notes

- After creating an application, you can't change its location, and you can't change its name.
- You can register up to 10 resources at a time.
- `PROJECT_ID` is the management project in every `--project` flag. In the `service_properties.gcp_project` / `workload_properties.gcp_project` filter examples it is the project that contains the resource (the `gcpProject` value in the list output), which can differ from the management project.
- You can select different criticality and environment values for a service or workload than for the application.
- You can only register exclusive services to one application; shared services can be registered to more than one. App Hub discovers shared services even if they are registered to another application, but attributes and owner information from the application are not applied to a shared service because shared services don't have attributes.
- Detached services and workloads (project or folder moved out of the boundary, or underlying resource deleted) stay in the application until you unregister them; to reattach, register them again.
- Next step: grant user access (to individual or all applications) and optionally use Cloud Hub.
- The source also shows Console and Terraform (`google_apphub_application`, `google_apphub_service`, `google_apphub_workload` and the discovered data sources) forms, and sample command output; they are omitted.
- Source: https://docs.cloud.google.com/app-hub/docs/register-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-applications.md](./manage-applications.md)
- [supported-resources.md](./supported-resources.md)
- [global-regional-applications.md](./global-regional-applications.md)
- [set-up-app-hub.md](./set-up-app-hub.md)
