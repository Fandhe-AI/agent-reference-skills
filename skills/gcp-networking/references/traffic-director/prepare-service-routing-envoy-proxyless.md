---
source: https://docs.cloud.google.com/service-mesh/docs/onboarding/prepare-service-routing-envoy-proxyless
---

# Prepare to set up on service routing APIs with Envoy and proxyless workloads

Prerequisites for Cloud Service Mesh with the service routing APIs on Compute Engine VMs (Envoy) or proxyless gRPC applications: projects, billing, IAM roles, APIs, service account access to the Traffic Director API, xDS v3, Envoy and gRPC requirements. Supports Google Cloud APIs only, not Istio APIs.

## Signature / Usage

### Grant the xDS client service account access to the Traffic Director API

xDS clients (Envoy or proxyless gRPC) connect to the `trafficdirector.googleapis.com` xDS server with a service account identity. On a Compute Engine VM this is the service account assigned to the VM (by default the Compute Engine default service account). `PROJECT` is the output of `gcloud config get-value project`.

```bash
gcloud projects add-iam-policy-binding PROJECT \
    --member serviceAccount:SERVICE_ACCOUNT_EMAIL \
    --role=roles/trafficdirector.client
```

### Enable the required APIs

```bash
gcloud services enable osconfig.googleapis.com \
trafficdirector.googleapis.com \
compute.googleapis.com \
networkservices.googleapis.com
```

### Java: add the xDS dependency (Gradle)

Replace `LATEST_GRPC_VERSION` with the latest gRPC version.

```text
dependencies {
  runtimeOnly 'io.grpc:grpc-xds:LATEST_GRPC_VERSION'
}
```

### Java: add the xDS dependency (Maven)

```xml
    <dependency>
      <groupId>io.grpc</groupId>
      <artifactId>grpc-xds</artifactId>
      <version>LATEST_GRPC_VERSION</version>
      <scope>runtime</scope>
    </dependency>
```

### Set the gRPC name resolver to `xds`

Use the `xds:///` prefix in the target name when creating the channel. Load balancing for gRPC clients is per channel. The service name in the target URI must be in the Cloud Service Mesh configuration.

```text
ManagedChannelBuilder.forTarget("xds:///helloworld[:PORT_NUMBER]")
```

### Bootstrap file

Define the environment variable `GRPC_XDS_BOOTSTRAP` with the bootstrap file name as its value. You can use the Cloud Service Mesh gRPC bootstrap generator (`GoogleCloudPlatform/traffic-director-grpc-bootstrap`).

```json
{
  "xds_servers": [
    {
      "server_uri": "trafficdirector.googleapis.com:443",
      "channel_creds": [
        {
          "type": "google_default"
        }
      ],
      "server_features": ["xds_v3"]
    }
  ],
  "node": {
    "id": "projects/123456789012/networks/default/nodes/b7f9c818-fb46-43ca-8662-d3bdbcf7ec18",
    "metadata": {
      "TRAFFICDIRECTOR_NETWORK_NAME": "default"
    },
    "locality": {
      "zone": "us-central1-a"
    }
  }
}
```

## Options / Props

### Required IAM roles

Project `roles/owner` or `roles/editor` already includes the permissions. Otherwise all of these roles are required.

| Task | Required role |
|------|---------------|
| Set IAM policy for a service account | Service Account Admin (`roles/iam.serviceAccountAdmin`) |
| Enable Cloud Service Mesh | Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) |
| Create networks, subnets, meshes, gateways and load balancer components | Compute Network Admin (`roles/compute.networkAdmin`) |
| Add and remove firewall rules | Compute Security Admin (`roles/compute.securityAdmin`) |
| Create instances | Compute Instance Admin (`roles/compute.instanceAdmin`) |
| Access to service accounts | Service Account User (`roles/iam.serviceAccountUser`) |
| xDS data plane (Envoy or proxyless gRPC) receives xDS configuration | Traffic Director Client (`roles/trafficdirector.client`) |

### Prerequisites and requirements

| Item | Requirement |
|------|-------------|
| VM scope | Compute Engine VMs must have the `https://www.googleapis.com/auth/cloud-platform` scope. |
| APIs | `osconfig.googleapis.com`, `trafficdirector.googleapis.com`, `compute.googleapis.com`, `networkservices.googleapis.com`. Also enable the Cloud DNS API and configure Cloud DNS. |
| xDS version | The service routing APIs require xDS v3. |
| Envoy | Version 1.20.0 or later. Automated Envoy deployment on Compute Engine VMs installs the version validated with Cloud Service Mesh; replace long-running VMs with a rolling update to pick up the latest version. |
| gRPC | Use the most recent gRPC version. Cloud Service Mesh endeavors to be compatible with gRPC versions less than one year old. Java needs `grpc-xds`, Go needs the xds Go package import; other languages need nothing extra. |

### Bootstrap file fields

| Field | Description |
|-------|-------------|
| `xds_servers` | List of xDS servers; gRPC uses only the first one. |
| `server_uri` | Specify at least one. Default `trafficdirector.googleapis.com:443`. |
| `channel_creds` | Credentials for the xDS server. |
| `type` | Use `google_default`. |
| `server_features` | Features supported by the server, such as xDS v3. Default empty. |
| `node` | Information about the client. |
| `id` | Format `projects/PROJECT_NUMBER/networks/NETWORK_NAME/nodes/ID`; `ID` is a unique string identifying the client. |
| `metadata` | Information specific to the xDS server. |
| `TRAFFICDIRECTOR_MESH_NAME` | If empty or not specified, the value is `default`. |
| `locality` | Google Cloud zone in which the client runs. |

### Proxyless gRPC overall process

1. Update gRPC clients to the latest version with the most recent patch.
2. Update the clients' name resolver scheme when creating a channel and specify a bootstrap file.
3. Configure Cloud Service Mesh and Cloud Load Balancing resources (Compute Engine VMs or GKE NEGs).

## Notes

- The source also shows Console steps for granting the role and enabling APIs.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source inconsistency: the sample bootstrap JSON sets `TRAFFICDIRECTOR_NETWORK_NAME`, while the field table on this page documents `TRAFFICDIRECTOR_MESH_NAME` (default `default`) and does not list a network name field. Use the field table when generating a bootstrap for a mesh.
- Source: https://docs.cloud.google.com/service-mesh/docs/onboarding/prepare-service-routing-envoy-proxyless (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-proxyless-mesh.md](./set-up-proxyless-mesh.md)
- [set-up-envoy-http-mesh.md](./set-up-envoy-http-mesh.md)
- [set-up-tcp-route.md](./set-up-tcp-route.md)
- [xds-control-plane-apis.md](./xds-control-plane-apis.md)
- [proxyless-overview.md](./proxyless-overview.md)
