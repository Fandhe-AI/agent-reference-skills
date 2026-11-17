---
source: https://docs.cloud.google.com/load-balancing/docs/negs/setting-up-zonal-negs
---

# Set up zonal NEGs

How to create and manage zonal NEGs before or after a load balancer exists. Some actions do not apply to zonal NEGs created and managed by GKE Ingress. `GCE_VM_IP` zonal NEGs back internal passthrough and regional external passthrough Network Load Balancers; `GCE_VM_IP_PORT` zonal NEGs back external / internal Application Load Balancers and external / internal proxy Network Load Balancers (primary use: container-native load balancing).

## Signature / Usage

### Create a `GCE_VM_IP_PORT` zonal NEG

Optional flags are in square brackets (template, not runnable as is).

Adapted (not in the official docs): added the missing line continuation after `--network=NETWORK` (the `GCE_VM_IP` example below has the same fix).

```text
gcloud compute network-endpoint-groups create NEG_NAME \
    --zone=ZONE \
    --network=NETWORK \
    [--subnet=SUBNET] \
    [--default-port=DEFAULT_PORT]
```

### Create a `GCE_VM_IP` zonal NEG

Adapted (not in the official docs): added the missing line continuation after `--network=NETWORK`, otherwise `--subnet` runs as a separate command.

```bash
gcloud compute network-endpoint-groups create NEG_NAME \
    --network-endpoint-type=gce-vm-ip \
    --zone=ZONE \
    --network=NETWORK \
    --subnet=SUBNET
```

### Add endpoints to a `GCE_VM_IP_PORT` zonal NEG

```bash
gcloud compute network-endpoint-groups update my-lb-neg \
    --zone=asia-southeast1-a \
    --add-endpoint 'instance=my-vm1,ip=10.1.1.1,port=80'
```

Syntax templates (IPv4, IPv6, dual-stack; `GCE_VM_IP` omits `port`):

```text
gcloud compute network-endpoint-groups update NEG_NAME \
    --zone=ZONE \
    --add-endpoint 'instance=INSTANCE_NAME,[ip=IPv4_ADDRESS],[ipv6=IPv6_ADDRESS],[port=PORT]' \
    [--add-endpoint ...]
```

### Add a zonal NEG to a backend service

```bash
gcloud compute backend-services add-backend my-lb \
   --network-endpoint-group my-lb-neg \
   --network-endpoint-group-zone=asia-southeast1-a \
   --global \
   --balancing-mode=RATE \
   --max-rate-per-endpoint=5
```

### Remove a NEG from a backend service

Adapted (not in the official docs): the source example uses the zone `southeast1-a`, which does not match the NEG's zone; it is changed to `asia-southeast1-a`, the zone used for `my-lb-neg` in the other examples of the source page.

```bash
gcloud compute backend-services remove-backend my-neg-backend \
    --network-endpoint-group=my-lb-neg \
    --network-endpoint-group-zone=asia-southeast1-a
```

### Remove endpoints from a NEG

```bash
gcloud compute network-endpoint-groups update my-lb-neg \
     --remove-endpoint 'instance=my-vm1,ip=10.1.1.1,port=80' \
     --zone=asia-southeast1-a
```

### Delete a NEG

```bash
gcloud compute network-endpoint-groups delete my-lb-neg \
    --zone=asia-southeast1-a
```

### List and describe NEGs and endpoints

```bash
gcloud compute network-endpoint-groups list-network-endpoints NEG_NAME \
     --zone=ZONE
```

```bash
gcloud compute network-endpoint-groups describe my-lb-neg \
    --zone=asia-southeast1-a
```

### Health check using the endpoint serving port

Adapted (not in the official docs): added the missing line continuation after `HTTP_HEALTH_CHECK_NAME`.

```bash
gcloud compute health-checks create http HTTP_HEALTH_CHECK_NAME \
    --use-serving-port
```

## Options / Props

| Placeholder | Meaning |
|---|---|
| `NEG_NAME` | Name of the NEG; unique within the zone |
| `ZONE` | Zone in which the NEG is created |
| `NETWORK` | Network of the NEG; if omitted for `GCE_VM_IP_PORT`, the network named `default` is used |
| `SUBNET` | Subnet of the endpoints; optional for an auto mode VPC network (the auto-created subnet of the zone's region is used), required for a custom mode VPC or a manually created subnet |
| `DEFAULT_PORT` | Optional default port (`GCE_VM_IP_PORT` only); if omitted every endpoint must be given as IP:port; if set, the port can be omitted from the endpoint |
| `INSTANCE_NAME` | VM that owns the IP address |
| `IPv4_ADDRESS` | Primary internal IPv4 of a NIC (also alias-range IPv4 for `GCE_VM_IP_PORT`) |
| `IPv6_ADDRESS` | First `/128` of a `/96` range (`GCE_VM_IP`); any `/128` of a `/96` range (`GCE_VM_IP_PORT`) |
| `PORT` | Endpoint port; optional if the NEG has a default port; not supported for `GCE_VM_IP` |

## Notes

- The source also shows Console steps for each task; they are omitted. Custom endpoint filtering for `listNetworkEndpoints` is REST only (not Console or gcloud).
- Destructive and connectivity-breaking: removing a NEG from a backend service, removing endpoints and deleting a NEG can drop traffic. Removing an endpoint triggers connection draining using the backend service drain parameters (the maximum across backend services that share the NEG). Deleting a VM removes its endpoints immediately and closes connections; deleting a NEG after deleting its backend service removes endpoints without draining. A NEG attached to a backend service cannot be deleted. Try these on a disposable load balancer first.
- If the IP address is omitted when adding an endpoint, it is selected from the network interface in the NEG's subnet. The `--ip-address-selection-policy` flag of the backend service sets the preferred traffic type from backend service to backends.
- Health checks for zonal NEG backends must use a numbered port (`--port`) or `--use-serving-port` (see the Corrected line below for `update`). Legacy health checks cannot be used with a zonal NEG.
- Example describe output contains `defaultPort: 80`, `kind: compute#networkEndpointGroup`, `loadBalancer.network` and `loadBalancer.zone` URLs.
- The full flag list for these commands is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-endpoint-groups/create). GKE container-native load balancing is in the `gcp-gke` skill.
- Corrected from the official docs: the original `GCE_VM_IP_PORT` create template and the original `GCE_VM_IP` create example lacked a `\` after `--network=NETWORK`; the health check example lacked a `\` after `HTTP_HEALTH_CHECK_NAME`; the remove-backend example used `--network-endpoint-group-zone=southeast1-a`, while every other example for `my-lb-neg` on the page uses `asia-southeast1-a`.
- Corrected from the official docs: the source says "the `--use-serving-port` flag is implemented with `gcloud compute health-checks create`, but not with `gcloud compute health-checks update`". In gcloud 593.0.0 the flag is also documented for `gcloud compute health-checks update` `grpc`, `grpc-with-tls`, `http`, `http2`, `https`, `ssl` and `tcp`, and `gcloud compute health-checks update http my-hc --use-serving-port` parses, so an existing health check can be switched to the serving port without recreating it. The full flag list is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/load-balancing/docs/negs/setting-up-zonal-negs (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [zonal-neg-concepts.md](./zonal-neg-concepts.md)
- [negs.md](./negs.md)
