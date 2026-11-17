---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-envoy-http-mesh
---

# Set up Envoy proxies with HTTP services

Configure Cloud Service Mesh with an Envoy sidecar-based mesh, an HTTP service in a managed instance group, and `Mesh` and `HTTPRoute` resources. Supports Google Cloud APIs only, not Istio APIs. Complete the prepare page first.

## Signature / Usage

### Configure the `Mesh` resource

Save as `mesh.yaml`. The interception port defaults to `15001` if omitted.

```yaml
name: sidecar-mesh
interceptionPort: 15001
```

```bash
gcloud network-services meshes import sidecar-mesh \
  --source=mesh.yaml \
  --location=global
```

### Configure the HTTP server

Adapted (not in the official docs): inside the double-quoted `startup-script` value the source writes `'\`$(/bin/hostname)\`'`, so the local shell expands `$(/bin/hostname)` to the workstation's host name and the VM then runs that name as a command; the example escapes `$` instead, so `$(/bin/hostname)` reaches the startup script and is evaluated on each backend VM.

```bash
gcloud compute instance-templates create td-httpd-vm-template \
  --scopes=https://www.googleapis.com/auth/cloud-platform \
  --tags=http-td-server \
  --image-family=debian-11 \
  --image-project=debian-cloud \
  --metadata=startup-script="#! /bin/bash
sudo apt-get update -y
sudo apt-get install apache2 -y
sudo service apache2 restart
echo '<!doctype <html><body><h1>'\$(/bin/hostname)'</h1></body></html>' | sudo tee /var/www/html/index.html"
```

```bash
gcloud compute instance-groups managed create http-td-mig-us-east1 \
  --zone=ZONE \
  --size=2 \
  --template=td-httpd-vm-template
```

```bash
gcloud compute health-checks create http http-helloworld-health-check
```

```bash
gcloud compute firewall-rules create http-vm-allow-health-checks \
  --network=default \
  --action=ALLOW \
  --direction=INGRESS \
  --source-ranges=35.191.0.0/16,130.211.0.0/22 \
  --target-tags=http-td-server \
  --rules=tcp:80
```

```bash
gcloud compute backend-services create http-helloworld-service \
  --global \
  --load-balancing-scheme=INTERNAL_SELF_MANAGED \
  --protocol=HTTP \
  --health-checks http-helloworld-health-check
```

```bash
gcloud compute backend-services add-backend http-helloworld-service \
  --instance-group=http-td-mig-us-east1 \
  --instance-group-zone=ZONE \
  --global
```

### Set up routing with an `HTTPRoute`

Save as `http_route.yaml`. You can use either `PROJECT_ID` or `PROJECT_NUMBER`.

```yaml
name: helloworld-http-route
hostnames:
- helloworld-gce
meshes:
- projects/PROJECT_NUMBER/locations/global/meshes/sidecar-mesh
rules:
- action:
   destinations:
   - serviceName: "projects/PROJECT_NUMBER/locations/global/backendServices/http-helloworld-service"
```

```bash
gcloud network-services http-routes import helloworld-http-route \
  --source=http_route.yaml \
  --location=global
```

### Create an HTTP client with an Envoy sidecar

The `mesh` parameter refers to the `Mesh` resource created earlier.

```bash
gcloud beta compute instance-templates create td-vm-client-template \
  --image-family=debian-11 \
  --image-project=debian-cloud \
  --service-proxy=enabled,mesh=sidecar-mesh
```

```bash
gcloud compute instances create td-vm-client \
  --zone=ZONE \
  --source-instance-template td-vm-client-template
```

```bash
gcloud compute ssh td-vm-client --zone=ZONE
```

```bash
curl -H "Host: helloworld-gce" http://10.0.0.1/
```

The command returns a response from one MIG VM with its hostname.

## Options / Props

| Item | Value |
|------|-------|
| Mesh `interceptionPort` | Default `15001` |
| Backend service | Global, `--load-balancing-scheme=INTERNAL_SELF_MANAGED`, `--protocol=HTTP` |
| Health-check source ranges | `35.191.0.0/16`, `130.211.0.0/22` (port 80, tag `http-td-server`) |
| Client sidecar | `--service-proxy=enabled,mesh=MESH_NAME` (gcloud beta) |

## Notes

- The source uses the `debian-11` image family, an older Debian release; choose a currently supported Debian family for new VMs (the proxyless guide uses `debian-12`).
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Corrected from the official docs: the source startup script `echo '<!doctype <html><body><h1>'\`$(/bin/hostname)\`'</h1></body></html>'` sits inside a double-quoted `--metadata=startup-script="..."` argument, so `$(/bin/hostname)` is expanded by the shell that runs gcloud and the escaped backticks then execute that host name on the VM; `\$(/bin/hostname)` without backticks defers the expansion to the VM.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-envoy-http-mesh (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-service-routing-envoy-proxyless.md](./prepare-service-routing-envoy-proxyless.md)
- [set-up-tcp-route.md](./set-up-tcp-route.md)
- [advanced-traffic-management.md](./advanced-traffic-management.md)
- [set-up-proxyless-mesh.md](./set-up-proxyless-mesh.md)
