---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/using-api
---

# Working with the SLO API (Services and SLOs)

Manage services and service-level objectives with the `services` and `services.serviceLevelObjectives` resources of the Cloud Monitoring API (v3). The examples call the REST endpoints with `curl` against `https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/...`; client libraries can be used instead.

## Signature / Usage

### Setup: project, authentication, access token

```bash
PROJECT_ID=my-test-service
```

```bash
gcloud auth login
```

```bash
gcloud config set project ${PROJECT_ID}
```

```bash
ACCESS_TOKEN=`gcloud auth print-access-token`
```

### Get a service

Adapted (not in the official docs): quoted the URL so the shell does not split or glob it.

```bash
curl  --http1.1 --header "Authorization: Bearer ${ACCESS_TOKEN}" "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/services/${SERVICE_ID}"
```

### Create a service

```bash
SERVICE_ID=my-test-service
```

```bash
CREATE_SERVICE_POST_BODY=$(cat <<EOF
{
  "displayName": "My Test GKE Workload Service",
  "basicService": {
    "serviceType": "GKE_WORKLOAD",
    "serviceLabels": {
      "cluster_name": "workload-test",
      "location": "us-central1-c",
      "namespace_name": "kube-system",
      "project_id": "PROJECT_ID",
      "top_level_controller_name": "gke-metrics-controller",
      "top_level_controller_type": "DaemonSet"
    }
  }
}
EOF
)
```

Adapted (not in the official docs): quoted the URL so the `?` in the query string is not treated as a glob.

```bash
curl  --http1.1 --header "Authorization: Bearer ${ACCESS_TOKEN}" --header "Content-Type: application/json" -X POST -d "${CREATE_SERVICE_POST_BODY}" "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/services?service_id=${SERVICE_ID}"
```

### Delete a service

Adapted (not in the official docs): quoted the URL.

```bash
curl  --http1.1 --header "Authorization: Bearer ${ACCESS_TOKEN}" -X DELETE "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/services/${SERVICE_ID}"
```

### List SLOs of a service

Adapted (not in the official docs): quoted the URL.

```bash
curl  --http1.1 --header "Authorization: Bearer ${ACCESS_TOKEN}" "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/services/${SERVICE_ID}/serviceLevelObjectives"
```

### Get a specific SLO

Adapted (not in the official docs): quoted the URL.

```bash
SLO_ID=dhefHDM4TwSRZEKIV4ZYEg

curl  --http1.1 --header "Authorization: Bearer ${ACCESS_TOKEN}" "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/services/${SERVICE_ID}/serviceLevelObjectives/${SLO_ID}"
```

### SLO skeleton

```text
{
  "displayName": string,
  "serviceLevelIndicator": {
    object (ServiceLevelIndicator)
  },
  "goal": number,

  // Union field period can be only one of the following:
  "rollingPeriod": string,
  "calendarPeriod": enum (CalendarPeriod)
  // End of list of possible types for union field period.
}
```

### Create an SLO (rolling 3-day, 75% availability)

```bash
SERVICE_ID=custom:my-test-service
```

```bash
CREATE_SLO_POST_BODY=$(cat <<EOF
{
  "serviceLevelIndicator": {
    "basicSli": {
      "availability": {},
      "location": [
        "us-central1-c"
      ]
    }
  },
  "goal": 0.75,
  "rollingPeriod": "259200s",
  "displayName": "75% Availability in Rolling 3 Days"
}
EOF
)
```

Adapted (not in the official docs): quoted the URL.

```bash
curl  --http1.1 --header "Authorization: Bearer ${ACCESS_TOKEN}" --header "Content-Type: application/json" -X POST -d "${CREATE_SLO_POST_BODY}" "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/services/${SERVICE_ID}/serviceLevelObjectives"
```

Optionally give the SLO an ID with the `service_level_objective_id` query parameter.

Adapted (not in the official docs): quoted the URL.

```bash
SLO_ID=test-slo-id

curl  --http1.1 --header "Authorization: Bearer ${ACCESS_TOKEN}" --header "Content-Type: application/json" -X POST -d "${CREATE_SLO_POST_BODY}" "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/services/${SERVICE_ID}/serviceLevelObjectives?service_level_objective_id=${SLO_ID}"
```

### Delete an SLO

Adapted (not in the official docs): quoted the URL.

```bash
curl  --http1.1 --header "Authorization: Bearer ${ACCESS_TOKEN}" -X DELETE "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/services/${SERVICE_ID}/serviceLevelObjectives/${SLO_ID}"
```

## Options / Props

### Identifier rules (project and service IDs)

| Rule | Value |
|------|-------|
| Length | 1-63 characters |
| Characters | Lower-case letters, numbers and hyphens only |
| Initial character | Lower-case letter |
| Terminal character | Lower-case letter or number, not a hyphen |
| Regular expression (full match) | `^[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?$` |

### Endpoints (base `https://monitoring.googleapis.com/v3/projects/PROJECT_ID`)

| Operation | Method and path | Reference method |
|-----------|-----------------|------------------|
| List services | `GET /services` | `services.list` |
| Get service | `GET /services/SERVICE_ID` | `services.get` |
| Create service | `POST /services?service_id=SERVICE_ID` (service ID optional) | `services.create` |
| Delete service | `DELETE /services/SERVICE_ID` | `services.delete` |
| List SLOs | `GET /services/SERVICE_ID/serviceLevelObjectives` | `services.serviceLevelObjectives.list` |
| Get SLO | `GET /services/SERVICE_ID/serviceLevelObjectives/SLO_ID` | `services.serviceLevelObjectives.get` |
| Create SLO | `POST /services/SERVICE_ID/serviceLevelObjectives` (optional `service_level_objective_id` query parameter) | `services.serviceLevelObjectives.create` |
| Delete SLO | `DELETE /services/SERVICE_ID/serviceLevelObjectives/SLO_ID` | `services.serviceLevelObjectives.delete` |

### Supported service types (`serviceType`)

| Type | Value |
|------|-------|
| App Engine | `APP_ENGINE` |
| Cloud Endpoints | `CLOUD_ENDPOINTS` |
| Canonical Istio | `ISTIO_CANONICAL_SERVICE` |
| Cluster Istio | `CLUSTER_ISTIO` |
| Cloud Run | `CLOUD_RUN` |
| GKE service / namespace / workload | `GKE_SERVICE` / `GKE_NAMESPACE` / `GKE_WORKLOAD` |
| Custom | `CUSTOM` |

### Limit

| Item | Value |
|------|-------|
| SLOs per service | Up to 500 |

## Notes

- The service ID is the part of the `name` after `projects/PROJECT_NUMBER/services/`; the SLO ID is the string after `serviceLevelObjectives/`.
- SLIs for Cloud Service Mesh, Istio on GKE and App Engine services are predefined (you can use the Cloud Service Mesh console and only set the goal and compliance period); for other services you must define the `serviceLevelIndicator` in the API.
- You must specify a display name, one of `BasicSli` / `RequestBasedSli` / `WindowsBasedSli`, a goal, and a rolling period (in seconds, for example `259200s`) or a calendar period.
- `SERVICE_ID=custom:my-test-service` is verbatim from the source, but it does not match the identifier regular expression above; use the real service ID from the service's `name`.
- Delete calls remove the service or SLO definition; try them on a disposable project first. The access token is short-lived and appears in shell variables and command lines; do not print or share it (the source's `echo ${ACCESS_TOKEN}` verification step is not reproduced). Re-run `gcloud auth print-access-token` if requests report unauthenticated.
- `"project_id": "PROJECT_ID"` inside the create-service body is a literal placeholder; replace it with your project ID.
- SLO time series are retrieved with `timeSeries.list` and a time-series selector (see `timeseries-selectors.md`).
- Omitted from the source: the sample `services.list` response (it contains a `...` elision) and the sample SLO `get` response (invalid JSON; a valid equivalent is in `api-structures.md`), plus the second SLO example for 95% availability over a calendar week.
- Corrected from the official docs: the source gives the identifier regular expression as `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` without anchors; unanchored, a substring search also accepts IDs that break the rules listed with it (for example a leading or trailing hyphen, or more than 63 characters), so it is shown anchored as `^...$` (a full match).
- Source inconsistency: the monitoring v3 Discovery document describes the `services.create` `serviceId` parameter as "Must match the pattern [a-z0-9\-]+" and the `serviceLevelObjectives.create` `serviceLevelObjectiveId` parameter as "Must match the pattern ^[a-zA-Z0-9-_:.]+$"; it names the query parameters `serviceId` and `serviceLevelObjectiveId`, while the source's URLs use `service_id` and `service_level_objective_id`.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/using-api (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [api-structures.md](./api-structures.md)
- [timeseries-selectors.md](./timeseries-selectors.md)
- [define-svc.md](./define-svc.md)
- [create-slo.md](./create-slo.md)
