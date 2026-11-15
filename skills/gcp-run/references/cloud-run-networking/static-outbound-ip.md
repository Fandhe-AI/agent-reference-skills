---
source: https://docs.cloud.google.com/run/docs/configuring/static-outbound-ip
---

# Static outbound IP address

By default Cloud Run workloads reach the internet through a regional pool of dynamic IP addresses shared across serverless workloads. To send outbound requests from a dedicated static IP, route all egress (`--vpc-egress=all-traffic`) through a VPC network (Direct VPC egress or a Serverless VPC Access connector) and attach a Cloud NAT gateway that uses a reserved static IP.

## Signature / Usage

Use a static IP when you connect to an external database or API with an IP allowlist, to reputation-sensitive endpoints (payment gateways, partner APIs behind third-party WAFs), or when you run authorized scanning, port enumeration, fingerprinting, vulnerability probing, scraping, or load testing.

### Configure Cloud NAT (gcloud)

```bash
gcloud compute routers create ROUTER_NAME \
  --network=NETWORK_NAME \
  --region=REGION
```

```bash
gcloud compute addresses create ORIGIN_IP_NAME --region=REGION
```

```bash
gcloud compute routers nats create NAT_NAME \
  --router=ROUTER_NAME \
  --region=REGION \
  --nat-custom-subnet-ip-ranges=SUBNET_NAME \
  --nat-external-ip-pool=ORIGIN_IP_NAME
```

Use the same region as your Cloud Run workloads to minimize latency and network costs.

### Route all traffic: Direct VPC egress

```bash
gcloud run deploy SERVICE_NAME \
--image=IMAGE_URL \
--network=NETWORK \
--subnet=SUBNET \
--region=REGION \
--vpc-egress=all-traffic
```

### Route all traffic: Serverless VPC Access connector

```bash
gcloud run deploy SERVICE_NAME \
--image=IMAGE_URL \
--vpc-connector=CONNECTOR_NAME \
--region=REGION \
--vpc-egress=all-traffic
```

### YAML (Direct VPC egress)

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/network-interfaces: '[{"network":"NETWORK","subnetwork":"SUBNET"}]'
        run.googleapis.com/vpc-access-egress: all-traffic
    spec:
      containers:
      - image: IMAGE_URL
```

### YAML (Serverless VPC Access connector)

Adapted (not in the official docs): added `run.googleapis.com/vpc-access-egress: all-traffic`, which the source's connector YAML omits; without it egress stays `private-ranges-only` and internet traffic bypasses Cloud NAT.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/vpc-access-connector: CONNECTOR_NAME
        run.googleapis.com/vpc-access-egress: all-traffic
    spec:
      containers:
      - image: IMAGE_URL
```

For a connector, replace only `run.googleapis.com/network-interfaces` with `run.googleapis.com/vpc-access-connector: CONNECTOR_NAME` and keep `run.googleapis.com/vpc-access-egress: all-traffic`. Apply either YAML with `gcloud run services replace service.yaml`.

### Verify

Call an API or site that echoes the originating IP (the source mentions `curlmyip.org`) from the workload.

## Notes

- Do not run scanning, port enumeration, fingerprinting, probing, scraping, or load testing over the default shared IP pool: it degrades shared IP reputation, can disrupt other customers in violation of the Google Cloud Acceptable Use Policy, and Google might throttle or suspend your workload.
- The tutorial configures Cloud NAT in manual mode with one static IP. For many instances or many concurrent connections, assign multiple static IPs, raise minimum ports per instance, or enable dynamic port allocation.
- Source inconsistency: this page leads with Direct VPC egress plus Cloud NAT and offers a connector as an option (https://docs.cloud.google.com/run/docs/configuring/static-outbound-ip), while the Direct VPC egress page warns of cold-start delays of 30s or more with Cloud NAT and recommends Serverless VPC Access connectors with Cloud NAT for better startup performance (https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc).
- Cloud NAT adds no extra hop: the NAT gateway and Cloud Router are control plane only.
- For jobs, worker pools, or instances pass the same VPC network and `all-traffic` egress settings.
- Deleting the reserved address: see "Release a static external IP address" in the VPC docs (`https://docs.cloud.google.com/vpc/docs/reserve-static-external-ip-address#release_ip`).
- A reserved IP resource keeps the underlying address when the resource it is attached to is deleted and re-created.
- Comparison (from the source): Direct VPC egress or a connector can both feed Cloud NAT; the source tells you to pass `--vpc-connector` instead of `--network`/`--subnet` for the connector path.
- Corrected from the official docs: the source's connector YAML sets only `run.googleapis.com/vpc-access-connector: CONNECTOR_NAME` with no `run.googleapis.com/vpc-access-egress` annotation, so egress falls back to the default `private-ranges-only` (https://docs.cloud.google.com/run/docs/configuring/vpc-connectors) and internet traffic does not use Cloud NAT or the static IP; the gcloud (`--vpc-egress=all-traffic`) and Terraform (`egress = "ALL_TRAFFIC"`) connector examples on the same page route all traffic.
- The source also shows Terraform examples for the router, address, NAT, and both service variants.
- Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`).
- If the YAML you apply to an existing service has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing an existing revision name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/configuring/static-outbound-ip (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-direct-vpc.md](./vpc-direct-vpc.md)
- [vpc-connectors.md](./vpc-connectors.md)
- [networking-best-practices.md](./networking-best-practices.md)
