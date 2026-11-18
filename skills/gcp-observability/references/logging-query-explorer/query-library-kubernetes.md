---
source: https://docs.cloud.google.com/logging/docs/view/query-library
---

# Sample Logging queries: Kubernetes and GKE

Logging query language samples for GKE and Kubernetes: cluster, pod, node, namespace, container, control plane and TPU workload queries. Usage rules are in [query-library.md](./query-library.md). For Admin Activity audit log queries see the GKE audit logging page (`https://docs.cloud.google.com/kubernetes-engine/docs/how-to/audit-logging`).

## Signature / Usage

```text
resource.type="k8s_container" AND resource.labels.pod_name="POD_NAME" AND severity=ERROR
```

Adapted (not in the official docs): the source query "Kubernetes pod audit logs from control plane" ends with an unterminated string (`.../pods/POD_NAME` without the closing double quote); the quote is added below and in the table.

```text
resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.resourceName="core/v1/namespaces/POD_NAMESPACE/pods/POD_NAME"
```

## Options / Props

### Cluster-level queries

| Query/filter name | Expression |
|---|---|
| Google Kubernetes Engine cluster operations | `resource.type="gke_cluster" AND log_id("cloudaudit.googleapis.com/activity")` |
| Google Kubernetes Engine cluster creation | `resource.type="gke_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName="google.container.v1.ClusterManager.CreateCluster"` |
| Kubernetes cluster deployment | `resource.type="k8s_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName:"deployments"` |
| Kubernetes cluster authentication failure | `resource.type="k8s_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.authenticationInfo.principalEmail="system:anonymous"` |
| Kubernetes cluster operations and events in `us-central1-b` | `resource.type="k8s_cluster" AND resource.labels.location="us-central1-b"` |
| Kubernetes pod requests from users | `resource.type="k8s_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName:"io.k8s.core.v1.pods" AND protoPayload.authenticationInfo.principalEmail="USER_EMAIL"` |
| Kubernetes events | `resource.type="k8s_cluster" AND log_id("events")` |
| Kubernetes Endpoints update | `resource.type="k8s_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.request.kind="Endpoints"` |
| Kubernetes control plane logs | `resource.type="k8s_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.serviceName="k8s.io"` |
| Kubernetes Engine control plane logs | `resource.type="k8s_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.serviceName="container.googleapis.com"` |
| Pod deletion | `resource.type="k8s_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName=~"io\.k8s\.core\.v1\.pods\.(create\|delete)"` |
| Kubernetes pod audit logs from control plane | `resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.resourceName="core/v1/namespaces/POD_NAMESPACE/pods/POD_NAME"` |
| Kubernetes pod evictions | `resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName="io.k8s.core.v1.pods.eviction.create"` |
| Kubernetes node audit logs from the control plane | `resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName:"io.k8s.core.v1.nodes"` |
| Kubernetes cluster control plane for Addon Manager Activity | `resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.authenticationInfo.principalEmail="system:addon-manager"` |
| Kubernetes control plane errors (excluding `Conflict`, which is normal) | `resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.status.message!="Conflict" AND protoPayload.status.code!=0` |
| Ingress Controller events | `resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("events") AND jsonPayload.source.component="loadbalancer-controller"` |
| Service Controller events (kube-controller-manager) | `resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("events") AND jsonPayload.source.component="service-controller"` |
| Cluster Autoscaler events | `resource.type="k8s_cluster" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("events") AND jsonPayload.source.component="cluster-autoscaler"` |

### Pod-level queries

| Filter name | Expression |
|---|---|
| Query pod during creation | `resource.type="k8s_pod" AND resource.labels.pod_name="POD_NAME" AND log_id("events")` |
| Query pod terminated due to resource pressure | `resource.type="k8s_pod" AND log_id("events") AND jsonPayload.reason="Evicted"` |
| Scheduler events | `resource.type="k8s_pod" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("events") AND jsonPayload.source.component="default-scheduler"` |
| Scheduler events (preemptions) | `resource.type="k8s_pod" AND resource.labels.location="CLUSTER_LOCATION" AND resource.labels.cluster_name="CLUSTER_NAME" AND log_id("events") AND jsonPayload.source.component="default-scheduler" AND jsonPayload.reason="Preempted"` |

### Node-level queries

| Filter name | Expression |
|---|---|
| Node events | `resource.type="k8s_node" AND log_id("events")` |
| Looking at Kube-proxy logs | `resource.type="k8s_node" AND log_id("kube-proxy")` |
| Looking at dockerd logs | `resource.type="k8s_node" AND log_id("container-runtime")` |
| Looking at kubelet errors or failures | `resource.type="k8s_node" AND log_id("kubelet") AND jsonPayload.MESSAGE:("error" OR "fail")` |
| Looking at node logs for GKE system logs | `resource.type = "k8s_node" logName:( "logs/container-runtime" OR "logs/docker" OR "logs/kube-container-runtime-monitor" OR "logs/kube-logrotate" OR "logs/kube-node-configuration" OR "logs/kube-node-installation" OR "logs/kubelet" OR "logs/kubelet-monitor" OR "logs/node-journal" OR "logs/node-problem-detector")` |

### Namespace queries

| Filter name | Expression |
|---|---|
| Container and pod logs for GKE system logs | `resource.type = ("k8s_container" OR "k8s_pod") resource.labels.namespace_name = ( "cnrm-system" OR "config-management-system" OR "gatekeeper-system" OR "gke-connect" OR "gke-system" OR "istio-system" OR "knative-serving" OR "monitoring-system" OR "kube-system")` |

### Container queries

| Filter name | Expression |
|---|---|
| Stdout container logs across all pods and containers in a cluster | `resource.type="k8s_container" AND log_id("stdout")` |
| Container error logs across all pods and containers in a cluster | `resource.type="k8s_container" AND log_id("stderr") AND severity=ERROR` |
| Container error logs for a pod with a specific name | `resource.type="k8s_container" AND resource.labels.pod_name="POD_NAME" AND severity=ERROR` |
| Container error logs for a specific container in a specific pod | `resource.type="k8s_container" AND resource.labels.pod_name="POD_NAME" AND resource.labels.container_name="server" AND severity=ERROR` |
| Container error logs for a specific namespace and container | `resource.type="k8s_container" AND resource.labels.namespace_name="istio-system" AND resource.labels.container_name="egressgateway" AND severity=ERROR` |
| Container logs for a pod with a specific label | `resource.type="k8s_container" AND labels."k8s-pod/app"="loadgenerator" AND severity=ERROR` |
| Container error logs for pods running on a specific node | `resource.type="k8s_container" AND labels."compute.googleapis.com/resource_name"="NODE_NAME" AND severity=ERROR` |
| Container logs for a pod with a label generated using skaffold | `resource.type="k8s_container" AND labels."k8s-pod/app"="loadgenerator" AND labels."k8s-pod/skaffold_dev/run-id"="SKAFFOLD_RUN_ID" severity=ERROR` |
| Container error logs for a specific pod containing a `POST` in the textPayload | `resource.type="k8s_container" AND resource.labels.pod_name="POD_NAME" AND textPayload:"POST" AND severity=ERROR` |
| Container error logs for a specific pod containing a `GET` in the structured JSON | `resource.type="k8s_container" AND resource.labels.pod_name="POD_NAME" AND jsonPayload."http.req.method"="GET" AND severity=ERROR` |
| Container errors logs in the kube-system namespace | `resource.type="k8s_container" AND resource.labels.namespace_name="kube-system" AND severity=ERROR` |
| Container error in the container insights log | `resource.type="k8s_container" AND log_id("clouderrorreporting.googleapis.com/insights")` |
| Kubernetes container logs | `resource.type="k8s_container" AND resource.labels.container_name="CONTAINER_NAME"` |

### Control plane queries (GKE control plane logs must be enabled)

| Filter name | Expression |
|---|---|
| Kubernetes API server logs | `resource.type="k8s_control_plane_component" resource.labels.component_name="apiserver" resource.labels.location="CLUSTER_LOCATION" resource.labels.cluster_name="CLUSTER_NAME"` |
| Kubernetes Scheduler logs | `resource.type="k8s_control_plane_component" resource.labels.component_name="scheduler" resource.labels.location="CLUSTER_LOCATION" resource.labels.cluster_name="CLUSTER_NAME"` |
| Kubernetes Controller Manager logs | `resource.type="k8s_control_plane_component" resource.labels.component_name="controller-manager" resource.labels.location="CLUSTER_LOCATION" resource.labels.cluster_name="CLUSTER_NAME"` |

### TPU workload queries (GKE system and workload logging must be enabled)

| Filter name | Expression |
|---|---|
| Stdout container logs across all TPU nodes with the same prefix | `resource.type="k8s_container" AND labels."compute.googleapis.com/resource_name"=~"^TPU_NODE_PREFIX.*" AND log_id("stdout")` |
| Container error logs across all TPU nodes with the same prefix | `resource.type="k8s_container" AND labels."compute.googleapis.com/resource_name"=~"^TPU_NODE_PREFIX.*" AND log_id("stderr") AND severity=ERROR` |
| Stdout container logs from the same GKE Job | `resource.type="k8s_container" AND labels."k8s-pod/batch.kubernetes.io/job-name" = "JOB_NAME" AND log_id("stdout")` |
| Container error logs from the same GKE Job | `resource.type="k8s_container" AND labels."k8s-pod/batch.kubernetes.io/job-name"="JOB_NAME" AND log_id("stderr") AND severity=ERROR` |
| Stdout container logs from the same GKE JobSet | `resource.type="k8s_container" AND labels."k8s-pod/jobset_sigs_k8s_io/jobset-name"="JOBSET_NAME" AND log_id("stdout")` |
| Container error logs from the same GKE JobSet | `resource.type="k8s_container" AND labels."k8s-pod/jobset_sigs_k8s_io/jobset-name"="JOBSET_NAME" AND log_id("stderr") AND severity=ERROR` |

## Notes

- Adapted from the official docs: "Kubernetes pod audit logs from control plane" originally ended `protoPayload.resourceName="core/v1/namespaces/POD_NAMESPACE/pods/POD_NAME` (missing closing quote).
- Control plane queries need GKE control plane logs enabled; TPU workload queries need GKE system and workload logging enabled. Cluster-side logging settings (`gcloud container clusters ... --logging`) are in the `gcp-gke` skill.
- The `k8s_container` queries read application stdout / stderr, which can contain personal data or secrets; do not log credentials from workloads.
- Container-runtime and Docker log queries (`log_id("container-runtime")`) refer to GKE node logs; the container runtime itself is covered by the `docker` skill.
- Corrected from the official docs: the two "across all TPU nodes with the same prefix" queries read `labels."compute.googleapis.com/resource_name"=~"TPU_NODE_PREFIX.*"`. Logging query language regular expressions "aren't anchored by default", and a begins-with match is written `=~ "^foo"` (https://docs.cloud.google.com/logging/docs/view/logging-query-language, regular expression examples), so the unanchored pattern also matches node names that contain the prefix anywhere; `^` was added.
- Source: https://docs.cloud.google.com/logging/docs/view/query-library (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-library.md](./query-library.md)
- [query-library-compute-networking.md](./query-library-compute-networking.md)
- [query-library-security-iam.md](./query-library-security-iam.md)
