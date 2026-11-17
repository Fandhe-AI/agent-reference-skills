---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/xds-control-plane-apis
---

# xDS control plane APIs

Cloud Service Mesh and its clients (Envoy proxies or proxyless gRPC libraries) exchange configuration over the open source xDS API. Resources such as forwarding rules and backend services are converted to xDS configuration. Only xDS v3 is supported; this page covers migrating from xDS v2 to v3. Supports Google Cloud APIs only, not Istio APIs.

## Signature / Usage

### Proxyless gRPC: node ID and xDS v3 bootstrap

Add `"server_features": ["xds_v3"]` in the `"xds_servers"` field and use this node ID format:

```text
"projects/PROJECT_NUMBER/networks/NETWORK_NAME/nodes/ID"
```

A full bootstrap example (snippet taken from https://docs.cloud.google.com/service-mesh/docs/onboarding/prepare-service-routing-envoy-proxyless):

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

### Migration steps

| Step | Action |
|------|--------|
| 1. IAM | The client service account needs `trafficdirector.networks.reportMetrics` and `trafficdirector.networks.getConfigs`, both included in Traffic Director Client (`roles/trafficdirector.client`). For custom roles, add the permissions; then `roles/compute.networkViewer` and/or `roles/compute.networkAdmin` can be removed from the service account. Prefer the Client role to avoid overly broad permissions. |
| 2. Envoy on Compute Engine | Rolling restart or replacement of the MIGs; an Envoy version supporting xDS v3 is added automatically. |
| 2. Envoy on GKE (auto injection) | Re-install the sidecar injector on the GKE clusters; new Pods get an xDS v3 sidecar. |
| 2. Envoy on GKE (manual injection) | Redeploy the sidecar proxy on each cluster. |
| 2. Proxyless gRPC | Use a gRPC version that supports xDS v3, update the bootstrap (above), then build and redeploy. |

## Notes

- Without the bootstrap changes, gRPC versions that support xDS v3 still use xDS v2. The changes do not affect gRPC versions that don't support xDS v3.
- Cloud Service Mesh gRPC bootstrap generator version 0.19.0 or later generates an xDS v3-compatible bootstrap. The source encourages checking for generator updates yearly.
- Verify with the client status tool, which states whether the configuration is xDS v2 or xDS v3.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/xds-control-plane-apis (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-service-routing-envoy-proxyless.md](./prepare-service-routing-envoy-proxyless.md)
- [features.md](./features.md)
- [set-up-proxyless-mesh.md](./set-up-proxyless-mesh.md)
