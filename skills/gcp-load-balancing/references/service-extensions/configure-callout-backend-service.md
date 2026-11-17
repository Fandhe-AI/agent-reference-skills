---
source: https://docs.cloud.google.com/service-extensions/docs/configure-callout-backend-service
---

# Configure a user-managed callout backend service

Create a user-managed callout backend service (an `ext_proc` gRPC server on a VM instance group) that supported Application Load Balancers call from the data path. It is a prerequisite for route, authorization and user-managed traffic extensions. The example uses a regional internal Application Load Balancer with VM instance group backends.

## Signature / Usage

### Enable APIs

```bash
gcloud services enable compute.googleapis.com networkservices.googleapis.com
```

### Route extensions only: second backend service

```bash
gcloud compute instances create l7-ilb-backend2-vm \
  --zone=us-west1-a \
  --network=lb-network \
  --subnet=backend-subnet \
  --tags=allow-ssh,load-balanced-backend \
  --image-family=debian-11 \
  --image-project=debian-cloud \
  --metadata=startup-script='#! /bin/bash
      apt-get update
      apt-get install apache2 -y
      a2ensite default-ssl
      a2enmod ssl
      echo "Page served from second backend service" | tee /var/www/html/index.html
      systemctl restart apache2'
```

```bash
gcloud compute instance-groups unmanaged create l7-ilb-backend-service2-ig \
  --zone us-west1-a
```

```bash
gcloud compute instance-groups unmanaged add-instances l7-ilb-backend-service2-ig \
  --zone=us-west1-a \
  --instances=l7-ilb-backend2-vm
```

```bash
gcloud compute backend-services create l7-ilb-backend-service2 \
  --load-balancing-scheme=INTERNAL_MANAGED \
  --protocol=HTTP \
  --health-checks=l7-ilb-basic-check \
  --health-checks-region=us-west1 \
  --region=us-west1
```

```bash
gcloud compute backend-services add-backend l7-ilb-backend-service2 \
  --balancing-mode=UTILIZATION \
  --instance-group=l7-ilb-backend-service2-ig \
  --instance-group-zone=us-west1-a \
  --region=us-west1
```

```bash
gcloud compute url-maps add-path-matcher l7-ilb-map \
  --path-matcher-name=callouts \
  --default-service=l7-ilb-backend-service2 \
  --new-hosts=service-extensions.com \
  --region=us-west1
```

### Callout VM running the sample Python `ext_proc` server

The source uses `create-with-container`, which gcloud 593.0.0 marks as deprecated (see Notes); for a new deployment, run the container on the VM by one of the alternatives in the migration guide.

```bash
gcloud compute instances create-with-container callouts-vm \
  --container-image=us-docker.pkg.dev/service-extensions-samples/callouts/python-example-basic:main \
  --network=lb-network \
  --subnet=backend-subnet \
  --zone=us-west1-a \
  --tags=allow-ssh,load-balanced-backend
```

### Unmanaged instance group with named ports

```bash
gcloud compute instance-groups unmanaged create callouts-ig \
  --zone=us-west1-a
```

```bash
gcloud compute instance-groups unmanaged set-named-ports callouts-ig \
  --named-ports=http:80,grpc:443 \
  --zone=us-west1-a
```

```bash
gcloud compute instance-groups unmanaged add-instances callouts-ig \
  --zone=us-west1-a \
  --instances=callouts-vm
```

### Health check, HTTP/2 backend service and backend

```bash
gcloud compute health-checks create http callouts-hc \
  --region=us-west1 \
  --port=80
```

```bash
gcloud compute backend-services create l7-ilb-callout-service \
  --load-balancing-scheme=INTERNAL_MANAGED \
  --protocol=HTTP2 \
  --port-name=grpc \
  --health-checks=callouts-hc \
  --health-checks-region=us-west1 \
  --region=us-west1
```

```bash
gcloud compute backend-services add-backend l7-ilb-callout-service \
  --balancing-mode=UTILIZATION \
  --instance-group=callouts-ig \
  --instance-group-zone=us-west1-a \
  --region=us-west1
```

## Options / Props

| Item | Value |
|------|-------|
| Required roles (or project owner / editor) | `compute.instanceAdmin.v1` to create instances; `compute.networkAdmin` to create Cloud Load Balancing components |
| APIs | Compute Engine API, Network Services API |
| Sample container image | `us-docker.pkg.dev/service-extensions-samples/callouts/python-example-basic:main` (Python `ext_proc` server; the repository has other Python and Go samples for header and body mutation) |
| Callout backend service protocol | `HTTP2`, port name `grpc`, with an HTTP health check |
| Console sample values | Backend service `l7-ilb-callout-service`, region `us-west1`, health check `callouts-hc` port `80`, Cloud Armor backend security policy `None`, instance group `callouts-ig`, balancing mode `Utilization` |
| Route-extension host matcher sample | Name `l7-ilb-map`, host `service-extensions.com`, path `callouts`, backend `l7-ilb-backend-service2` |

## Notes

- If you use your own extension server, its gRPC server must be configured to use TLS; without TLS, connections to the extension server fail.
- Callout servers might need firewall rules to allow proxy traffic.
- Source inconsistency: the Console steps list the load balancer type as `Regional external Application Load Balancer (EXTERNAL_MANAGED)` while the gcloud example and the linked setup guide use `INTERNAL_MANAGED` (regional internal Application Load Balancer); both are kept as written.
- The commands create VMs, instance groups, backend services and URL map path matchers, and `add-path-matcher` changes a running load balancer's routing; try them on a disposable setup first.
- The VM example uses the `debian-11` image as written in the source; Debian 11 is an older image, so check the current supported images before reusing it. The sample startup script installs Apache with `apt-get install apache2 -y`.
- The `allow-ssh` tag only labels the VMs; no firewall rule is created on this page, and none should open SSH to `0.0.0.0/0`.
- The source also shows Console steps.
- Full flag lists for `gcloud compute ...` commands are in the `gcp-compute` skill (for example https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services/create).
- Deprecated: the gcloud 593.0.0 help for `gcloud compute instances create-with-container` says "(DEPRECATED) The option to deploy a container during VM creation using the container startup agent is deprecated. Use alternative services to run containers on your VMs. Learn more at https://cloud.google.com/compute/docs/containers/migrate-containers." The command is kept as in the source for the sample callout server; the full help is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/service-extensions/docs/configure-callout-backend-service (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [callouts-overview.md](./callouts-overview.md)
- [configure-traffic-extensions.md](./configure-traffic-extensions.md)
- [lb-extensions-overview.md](./lb-extensions-overview.md)
