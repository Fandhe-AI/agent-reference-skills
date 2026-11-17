---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-tcp-route
---

# Set up TCP services

Set up Cloud Service Mesh with a TCP service and a `TCPRoute` resource. Similar to the Envoy sidecar configuration with HTTP services, except that the backend service provides a TCP service and routing uses TCP/IP parameters instead of HTTP. Supports Google Cloud APIs only, not Istio APIs. Complete the prepare page first.

## Signature / Usage

### Configure the `Mesh` resource

Save as `mesh.yaml`.

```yaml
name: sidecar-mesh
```

```bash
gcloud network-services meshes import sidecar-mesh \
  --source=mesh.yaml \
  --location=global
```

### Configure the TCP server

Test service on port `10000` using netcat.

```bash
gcloud compute instance-templates create tcp-td-vm-template \
  --scopes=https://www.googleapis.com/auth/cloud-platform \
  --tags=allow-health-checks \
  --image-family=debian-10 \
  --image-project=debian-cloud \
  --metadata=startup-script="#! /bin/bash
sudo apt-get update -y
sudo apt-get install netcat -y
while true;
  do echo 'Hello from TCP service' | nc -l -s 0.0.0.0 -p 10000;
done &"
```

```bash
gcloud compute instance-groups managed create tcp-td-mig-us-east1 \
  --zone=ZONE \
  --size=1 \
  --template=tcp-td-vm-template
```

Adapted (not in the official docs): the source command has blank lines between the flags, which breaks the line continuation; the flags are joined with `\` and nothing else changed.

```bash
gcloud compute instance-groups set-named-ports tcp-td-mig-us-east1 \
  --zone=ZONE \
  --named-ports=tcp:10000
```

```bash
gcloud compute health-checks create tcp tcp-helloworld-health-check --port 10000
```

```bash
gcloud compute firewall-rules create tcp-vm-allow-health-checks \
   --network default \
   --action allow \
   --direction INGRESS \
   --source-ranges=35.191.0.0/16,130.211.0.0/22 \
   --target-tags allow-health-checks \
   --rules tcp:10000
```

```bash
gcloud compute backend-services create tcp-helloworld-service \
    --global \
    --load-balancing-scheme=INTERNAL_SELF_MANAGED \
    --protocol=TCP \
    --health-checks tcp-helloworld-health-check
```

```bash
gcloud compute backend-services add-backend tcp-helloworld-service \
  --instance-group tcp-td-mig-us-east1 \
  --instance-group-zone=ZONE \
  --global
```

### Set up routing with `TCPRoute`

Adapted (not in the official docs): `$PROJECT_NUMBER` inside the YAML is not expanded by anything, so it is an upper-case placeholder `PROJECT_NUMBER` (replace it with your project number or project ID).

```yaml
name: helloworld-tcp-route
meshes:
- projects/PROJECT_NUMBER/locations/global/meshes/sidecar-mesh
rules:
- action:
    destinations:
    - serviceName: projects/PROJECT_NUMBER/locations/global/backendServices/tcp-helloworld-service
  matches:
  - address: '10.0.0.1/32'
    port: '10000'
```

Adapted (not in the official docs): the source passes `--source=tcp-route.yaml` but saves the file as `tcp_route.yaml`; the file name is made consistent.

```bash
gcloud network-services tcp-routes import helloworld-tcp-route \
  --source=tcp_route.yaml \
  --location=global
```

### Create a TCP client with an Envoy sidecar

```bash
gcloud beta compute instance-templates create td-vm-client-template \
  --image-family=debian-10 \
  --image-project=debian-cloud \
  --service-proxy=enabled,mesh=sidecar-mesh \
  --metadata=startup-script="#! /bin/bash
sudo apt-get update -y
sudo apt-get install netcat -y"
```

```bash
gcloud compute instances create td-vm-client \
  --zone=ZONE \
  --source-instance-template td-vm-client-template
```

```bash
gcloud compute ssh td-vm-client
```

```bash
echo 'Hi TCP Service' | nc 10.0.0.1 10000
```

The test service returns **Hello from TCP service**, and echoes text you type.

## Options / Props

| Item | Value |
|------|-------|
| Backend service | Global, `INTERNAL_SELF_MANAGED`, `--protocol=TCP` |
| Backend port | `10000` (named port `tcp:10000`) |
| `TCPRoute` match | `address` (here `10.0.0.1/32`) and `port` |
| Health-check source ranges | `35.191.0.0/16`, `130.211.0.0/22` |

## Notes

- Limitation: you cannot configure a Google Cloud Armor security policy when using TCP traffic routing.
- With `TCPRoute` you cannot use the advanced traffic management features (they need HTTP or gRPC).
- Corrected from the official docs: `set-named-ports tcp-td-mig-us-east1` followed by blank lines before `--zone=ZONE` and `--named-ports=tcp:10000` (the continuation was broken); `--source=tcp-route.yaml` while the file is saved as `tcp_route.yaml`; and `$PROJECT_NUMBER` inside the YAML.
- The source uses the `debian-10` image family, an old Debian release; choose a currently supported Debian family for new VMs.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-tcp-route (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-envoy-http-mesh.md](./set-up-envoy-http-mesh.md)
- [limitations.md](./limitations.md)
- [prepare-service-routing-envoy-proxyless.md](./prepare-service-routing-envoy-proxyless.md)
