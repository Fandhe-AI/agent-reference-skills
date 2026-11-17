# traffic-director

| Name | Description | Path |
| --- | --- | --- |
| Proxyless gRPC overview | Architecture, name resolution and use cases of Cloud Service Mesh with proxyless gRPC | [proxyless-overview.md](./proxyless-overview.md) |
| Prepare for service routing | Prerequisites: roles, APIs, xDS v3, Envoy and gRPC requirements, bootstrap file | [prepare-service-routing-envoy-proxyless.md](./prepare-service-routing-envoy-proxyless.md) |
| Set up proxyless gRPC services | Mesh and GRPCRoute with a MIG backend and grpcurl test | [set-up-proxyless-mesh.md](./set-up-proxyless-mesh.md) |
| Set up Envoy proxies with HTTP services | Mesh and HTTPRoute with an Envoy sidecar client | [set-up-envoy-http-mesh.md](./set-up-envoy-http-mesh.md) |
| Set up TCP services | Mesh and TCPRoute with a netcat test service | [set-up-tcp-route.md](./set-up-tcp-route.md) |
| Supported features | Feature matrix for Envoy and proxyless gRPC | [features.md](./features.md) |
| Limitations with Envoy | General, advanced traffic management and Service Directory limitations | [limitations.md](./limitations.md) |
| Proxyless gRPC limitations | URL map, target gRPC proxy and backend service limitations | [limitations-proxyless.md](./limitations-proxyless.md) |
| xDS control plane APIs | xDS v3 support and migration from xDS v2 | [xds-control-plane-apis.md](./xds-control-plane-apis.md) |
| Advanced traffic management | Resources, request handling, route actions and backend distribution policies | [advanced-traffic-management.md](./advanced-traffic-management.md) |
| Set up advanced load balancing | Service load balancing policies, preferred backends, failover threshold | [set-up-advanced-load-balancing.md](./set-up-advanced-load-balancing.md) |
