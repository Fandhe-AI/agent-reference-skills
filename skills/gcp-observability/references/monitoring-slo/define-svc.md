---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/ui/define-svc
---

# Define a Service (Candidate and Custom Services)

In Cloud Monitoring a service is a construct you associate with SLOs and alerting policies. Monitoring recognizes GKE- and Cloud Run-based services as candidates; you choose which to treat as Monitoring services, or you define arbitrary custom services. Services are created in the Google Cloud console (SLOs page > Define service) or by posting a configuration object to `services.create`.

## Signature / Usage

### Create a service from a candidate (API)

Post one of these `Service` objects to the `services.create` method of the SLO API (part of the Cloud Monitoring API).

GKE namespace (`GkeNamespace`):

```json
{
  "displayName": "test-kube-namespace",
  "gkeNamespace": {
    "location": "us-central1-c",
    "clusterName": "cluster-1",
    "namespaceName": "test-kube-namespace"
  }
}
```

GKE service (`GkeService`):

```json
{
  "displayName": "test-kube-service",
  "gkeService": {
    "location": "us-central1-c",
    "clusterName": "cluster-1",
    "namespaceName": "kube-system",
    "serviceName": "test-kube-service"
  }
}
```

GKE workload (`GkeWorkload`):

```json
{
  "displayName": "frontend-a",
  "gkeWorkload": {
    "location": "us-central1-b",
    "clusterName": "cluster-2",
    "namespaceName": "default",
    "topLevelControllerType": "Deployment",
    "topLevelControllerName": "frontend-a"
  }
}
```

Cloud Run (`CloudRun`):

```json
{
  "displayName": "test-cloudrun-service",
  "cloudRun": {
    "serviceName": "test-cloudrun-service",
    "location": "us-central1"
  }
}
```

Cloud Service Mesh (`MeshIstio`):

Adapted (not in the official docs): added the missing comma after the `meshUid` value so the JSON is valid.

```json
{
  "displayName": "test-mesh-istio-service",
  "meshIstio": {
    "meshUid": "mesh-identifier",
    "serviceName": "test-mesh-istio-service",
    "serviceNamespace": "default"
  }
}
```

Istio on GKE (`clusterIstio`):

```json
{
  "displayName": "test-cluster-istio-service",
  "clusterIstio": {
    "serviceName": "test-cloud-service",
    "clusterName": "cluster-2",
    "serviceNamespace": "default",
    "location": "us-central1"
  }
}
```

App Engine (`AppEngine`):

Adapted (not in the official docs): removed the doubled quote before `moduleId` so the JSON is valid.

```json
{
  "displayName": "test-mesh-istio-service",
  "appEngine": {
    "moduleId": "id-of-the-service"
  }
}
```

### Create a custom service (API)

Post a `Custom` configuration object to `services.create`:

```json
{
  "displayName": "hello-world-service",
  "custom": {}
}
```

## Options / Props

### Candidate service types Monitoring can identify

| Type | Service field in the request body |
|------|-----------------------------------|
| Cloud Service Mesh services | `meshIstio` |
| Istio on Google Kubernetes Engine services | `clusterIstio` |
| App Engine services | `appEngine` |
| GKE namespaces | `gkeNamespace` |
| GKE services | `gkeService` |
| GKE workloads | `gkeWorkload` |
| Cloud Run service | `cloudRun` |
| Custom (arbitrary grouping of SLOs, or SLOs on business metrics) | `custom` |

## Notes

- Corrected from the official docs: the Cloud Service Mesh example had no comma after `"meshUid": "mesh-identifier"`, and the App Engine example had `""moduleId"`; both fixed as marked above. The App Engine example keeps the source's `displayName` of `test-mesh-istio-service`.
- Console: SLOs page > Define service > Service Candidates tab (filter, pick a candidate, optionally change the display name, then Submit; the generated JSON configuration must not be changed) or Custom Service tab (enter a display name, Submit).
- A GKE service or Cloud Run service in the Kubernetes / Cloud Run sense is different from a Monitoring service; Monitoring does not assume you want all candidates, so you select them.
- After creating a service, define at least one SLO for it to be useful (see `create-slo.md`); a new service's dashboard is empty.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/ui/define-svc (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-slo.md](./create-slo.md)
- [api-structures.md](./api-structures.md)
- [using-api.md](./using-api.md)
