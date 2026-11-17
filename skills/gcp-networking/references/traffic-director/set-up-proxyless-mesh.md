---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-proxyless-mesh
---

# Set up proxyless gRPC services

Set up a proxyless gRPC service mesh with `Mesh` and `GRPCRoute` resources: a gRPC server in a managed instance group, a `GRPCRoute`, and a client VM that tests with `grpcurl`. Supports Google Cloud APIs only, not Istio APIs. Complete the prerequisites in the prepare page first.

## Signature / Usage

### Configure the `Mesh` resource

The Mesh name is the key the proxyless client uses to request its configuration. Save as `mesh.yaml`.

```yaml
name: grpc-mesh
```

```bash
gcloud network-services meshes import grpc-mesh \
  --source=mesh.yaml \
  --location=global
```

### Configure the gRPC server

Create `cloud-init.yaml` that runs the `helloworld` container on port `50051`.

```yaml
#cloud-config
write_files:
- path: /etc/systemd/system/grpc-server.service
  permissions: '0644'
  owner: root
  content: |
    [Unit]
    Description=gRPC Server Container
    After=network-online.target docker.service
    Wants=network-online.target
    Requires=docker.service

    [Service]
    TimeoutStartSec=0
    Restart=always
    ExecStartPre=-/usr/bin/docker stop %n
    ExecStartPre=-/usr/bin/docker rm %n
    ExecStart=/usr/bin/docker run --rm --name %n --net=host grpc/java-example-hostname:1.83.1
    ExecStop=/usr/bin/docker stop %n

runcmd:
- iptables -A INPUT -p tcp --dport 50051 -j ACCEPT
- systemctl daemon-reload
- systemctl start --no-block grpc-server.service
```

```bash
gcloud compute instance-templates create grpc-td-vm-template \
  --image-project=cos-cloud \
  --image-family=cos-stable \
  --metadata-from-file=user-data=cloud-init.yaml \
  --tags=allow-health-checks \
  --scopes=cloud-platform
```

```bash
gcloud compute instance-groups managed create grpc-td-mig \
  --zone=ZONE \
  --size=2 \
  --template=grpc-td-vm-template
```

Create the named port on which the gRPC service listens:

```bash
gcloud compute instance-groups set-named-ports grpc-td-mig \
 --named-ports=grpc-helloworld-port:50051 \
 --zone=ZONE
```

Create a gRPC health check (services must implement the gRPC health checking protocol):

```bash
gcloud compute health-checks create grpc grpc-helloworld-health-check \
  --use-serving-port
```

Allow health-check probes (source ranges are the Google health check ranges):

```bash
gcloud compute firewall-rules create grpc-vm-allow-health-checks \
  --network=default \
  --action=ALLOW \
  --direction=INGRESS \
  --source-ranges="35.191.0.0/16,130.211.0.0/22" \
  --target-tags=allow-health-checks \
  --rules=tcp:50051
```

Create the global backend service (scheme `INTERNAL_SELF_MANAGED`, protocol `GRPC`) and add the MIG:

```bash
gcloud compute backend-services create grpc-helloworld-service \
  --global \
  --load-balancing-scheme=INTERNAL_SELF_MANAGED \
  --protocol=GRPC \
  --port-name=grpc-helloworld-port \
  --health-checks=grpc-helloworld-health-check
```

```bash
gcloud compute backend-services add-backend grpc-helloworld-service \
  --instance-group=grpc-td-mig \
  --instance-group-zone=ZONE \
  --global
```

### Set up routing with `GRPCRoute`

Save as `grpc_route.yaml`. You can use either `PROJECT_ID` or `PROJECT_NUMBER`.

```yaml
name: helloworld-grpc-route
hostnames:
- helloworld-gce
meshes:
- projects/PROJECT_NUMBER/locations/global/meshes/grpc-mesh
rules:
- action:
    destinations:
    - serviceName: projects/PROJECT_NUMBER/locations/global/backendServices/grpc-helloworld-service
```

```bash
gcloud network-services grpc-routes import helloworld-grpc-route \
  --source=grpc_route.yaml \
  --location=global
```

### Create a gRPC client

The startup script sets `GRPC_XDS_BOOTSTRAP` and generates the bootstrap file with `--config-mesh=grpc-mesh` (the mesh name must match the `Mesh` resource). The project number and zone come from the metadata server; override the project number with `--gcp-project-number`.

Adapted (not in the official docs): `curl -L` is changed to `curl -fL` so that an HTTP error page is not piped into `tar`.

```bash
gcloud compute instances create grpc-client \
  --zone=ZONE\
  --scopes=https://www.googleapis.com/auth/cloud-platform \
  --image-family=debian-12 \
  --image-project=debian-cloud \
  --metadata-from-file=startup-script=<(echo '#!/bin/bash
set -ex
export GRPC_XDS_BOOTSTRAP=/run/td-grpc-bootstrap.json
echo export GRPC_XDS_BOOTSTRAP=$GRPC_XDS_BOOTSTRAP | sudo tee /etc/profile.d/grpc-xds-bootstrap.sh
curl -fL https://storage.googleapis.com/traffic-director/td-grpc-bootstrap-0.19.0.tar.gz | tar -xz
./td-grpc-bootstrap-0.19.0/td-grpc-bootstrap --config-mesh=grpc-mesh | tee $GRPC_XDS_BOOTSTRAP')
```

### Verify with grpcurl

```bash
gcloud compute ssh grpc-client --zone=ZONE
```

Adapted (not in the official docs): `curl -L` is changed to `curl -fL` so that an HTTP error page is not piped into `tar`.

```bash
curl -fL https://github.com/fullstorydev/grpcurl/releases/download/v1.9.2/grpcurl_1.9.2_linux_x86_64.tar.gz | tar -xz
```

```bash
./grpcurl --plaintext \
  -d '{"name": "world"}' \
  xds:///helloworld-gce helloworld.Greeter/SayHello
```

Expected output, where `INSTANCE_HOSTNAME` is the name of a gRPC server VM:

```json
{
  "message": "Hello world, from INSTANCE_HOSTNAME"
}
```

## Options / Props

| Item | Value |
|------|-------|
| Backend service scheme | `INTERNAL_SELF_MANAGED` |
| Backend service protocol | `GRPC` |
| gRPC server port / named port | `50051` / `grpc-helloworld-port` |
| Client service URI | `xds:///helloworld-gce` |
| Bootstrap generator | `td-grpc-bootstrap-0.19.0`; the source says to check for generator updates yearly |

## Notes

- Adapted from the official docs: the two `curl -L ... | tar -xz` downloads use `curl -fL`. For anything beyond a test VM, download, verify and then extract as separate steps.
- The server example is a test setup; it uses a public container image and the client uses `--plaintext`. The firewall rule only allows Google health-check ranges, and the guest `iptables` rule opens only port 50051.
- Creating and then deleting MIGs, templates, firewall rules and backend services is a connectivity-affecting change; try it in a disposable project first.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-proxyless-mesh (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-service-routing-envoy-proxyless.md](./prepare-service-routing-envoy-proxyless.md)
- [proxyless-overview.md](./proxyless-overview.md)
- [limitations-proxyless.md](./limitations-proxyless.md)
- [set-up-envoy-http-mesh.md](./set-up-envoy-http-mesh.md)
