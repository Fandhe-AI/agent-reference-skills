---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service
---

# About Kubernetes Services

The types of Kubernetes Services (ClusterIP, NodePort, LoadBalancer, ExternalName, Headless) and how GKE uses Services to group Pod endpoints behind a stable IP address, with YAML examples for multiple ports and single- or dual-stack options.

## Signature / Usage

### Selector

A Pod is a member of a Service only if it has all labels in the selector.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  # Use labels to select the member Pods of the Service.
  selector:
    app: metrics
    department: engineering
  ports:
  ...
```

### ClusterIP

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-cip-service
spec:
  selector:
    app: metrics
    department: sales
  # Create a ClusterIP Service. Kubernetes dynamically allocates an IP address
  # to the Service.
  type: ClusterIP
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
```

Create it with `kubectl apply -f [MANIFEST_FILE]`, then view the stable IP with `kubectl get service`. The member Pod must have a container listening on `targetPort`; otherwise clients see "Failed to connect" or "This site can't be reached".

### NodePort

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-np-service
spec:
  selector:
    app: products
    department: sales
  # Kubernetes allocates a nodePort between 30000 and 32767 for external traffic
  # that reaches the node IP address. Additionally, Kubernetes dynamically
  # allocates a clusterIP IP address for internal traffic.
  type: NodePort
  ports:
  - protocol: TCP
    port: 80 # Route internal traffic that reaches the clusterIP IP address on this port.
    targetPort: 8080
```

### ExternalName

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-xn-service
spec:
  type: ExternalName
  externalName: example.com
```

The DNS name `my-xn-service.default.svc.cluster.local` is redirected to `example.com`. An ExternalName Service has no Pods and no stable IP.

### Headless

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  # Prevent Kubernetes from allocating an IP address to the Service.
  clusterIP: None
  selector:
    app: nginx
  ports:
  - name: http
    port: 80
    targetPort: 80
```

```bash
dig +short nginx.default.svc.cluster.local
dig +short +search nginx
```

Adapted (not in the official docs): the placeholder `[file.yaml]` is replaced by an upper-case placeholder.

```bash
kubectl create service clusterip my-svc --clusterip="None" --dry-run=client -o yaml > FILE_NAME.yaml
```

Replace `FILE_NAME` with the output file name.

### Arbitrary port and multiple ports

`port` is arbitrary; `targetPort` must be a port a container listens on. With several ServicePort entries each needs a unique `name`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-tp-service
spec:
  clusterIP: 10.11.242.196
  externalTrafficPolicy: Cluster
  ports:
  # Forward traffic that reaches port 31233 on the node IP address, or port
  # 60000 on the clusterIP IP address, to port 50000 on a member Pod.
  - name: my-first-service-port
    nodePort: 31233
    port: 60000
    protocol: TCP
    targetPort: 50000
  # Forward traffic that reaches port 31081 on the node IP address, or port
  # 60001 on the clusterIP IP address, to port 8080 on a member Pod.
  - name: my-second-service-port
    nodePort: 31081
    port: 60001
    protocol: TCP
    targetPort: 8080
  selector:
    app: tests
    department: engineering
  sessionAffinity: None
  type: LoadBalancer
status:
  loadBalancer:
    ingress:
    - ip: 203.0.113.201
```

## Options / Props

| Type | Behavior |
|---|---|
| ClusterIP (default) | Internal clients use a stable internal IP |
| NodePort | Extension of ClusterIP; clients use a node IP and `nodePort` (30000-32767, allocated automatically; omit the field to avoid collisions) |
| LoadBalancer | Extension of NodePort; clients use a network load balancer IP |
| ExternalName | DNS alias for an external DNS name |
| Headless | `clusterIP: None`; DNS returns Pod IPs, no stable IP |

| ServicePort field | Notes |
|---|---|
| `name`, `protocol`, `port`, `targetPort`, `nodePort` | `name` must be unique when there is more than one port |

## Notes

- A LoadBalancer Service supports a maximum of five ports.
- Kubernetes creates an Endpoints object with the same name as the Service to track member Pods.
- IPv6 Services of type ClusterIP or NodePort are supported; define `ipFamilies` and `ipFamilyPolicy` as IPv4, IPv6 or dual-stack.
- Part of the Service abstraction is implemented in node iptables rules; the rest by a regional external passthrough Network Load Balancer or an external Application Load Balancer depending on type.
- Headless Services without selectors do not get EndpointSlice objects from the control plane.
- Adapted from the official docs: `kubectl create service clusterip my-svc --clusterip="None" --dry-run=client -o yaml > [file.yaml]` was changed to use `FILE_NAME.yaml`.
- Before copying the Service manifest: `clusterIP` must be an unused address inside the cluster's Service IP range (omit it to let Kubernetes choose one), `nodePort` values must be free ports in the node port range (omit them to have them allocated), and `status` is filled in by the cluster and is not part of what you apply.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/service (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-load-balancer.md](./service-load-balancer.md)
- [service-networking.md](./service-networking.md)
- [about-service-discovery.md](./about-service-discovery.md)
- [ingress.md](./ingress.md)
