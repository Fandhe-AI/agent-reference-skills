---
source: https://docs.cloud.google.com/service-directory/docs/configuring-service-directory
---

# Configure Service Directory

Set up a Service Directory namespace, register a service in it, add endpoints, resolve the service, and delete resources. A namespace can be created while registering a service or beforehand. Install or upgrade to the latest Google Cloud CLI first.

## Signature / Usage

### Create a namespace

Create the namespace in a region close to where your services run. Services can be registered in any Service Directory region and are still globally resolvable. A single namespace can't span multiple regions; a project can have multiple namespaces, in different regions.

```bash
gcloud service-directory namespaces create NAMESPACE \
   --location REGION
```

Optional: set an IAM policy on the namespace (applies to the namespace and all its services). `ROLE` is the role being granted.

```bash
gcloud service-directory namespaces add-iam-policy-binding NAMESPACE \
--member user:someone@example.com \
--role ROLE \
--location REGION
```

### Create a service

Service names must be unique within a namespace and follow the naming convention for DNS labels.

```bash
gcloud service-directory services create SERVICE \
   --annotations KEY_1=VALUE_1,KEY_2=VALUE_2 \
   --namespace NAMESPACE \
   --location REGION
```

Optional: set an IAM policy on the service (applies to the service and all its endpoints).

```bash
gcloud service-directory services add-iam-policy-binding SERVICE \
--member user:someone@example.com \
--role ROLE \
--namespace NAMESPACE \
--location REGION
```

### Create endpoints

An endpoint has a unique name, an optional IP address and a port, and key-value annotations. A specified IP address must be a valid IPv4 or IPv6 address.

```bash
gcloud service-directory endpoints create ENDPOINT \
   --address IP_ADDRESS \
   --port PORT_NUMBER \
   --annotations KEY_1=VALUE_1,KEY_2=VALUE_2 \
   --service SERVICE \
   --namespace NAMESPACE \
   --location REGION
```

```bash
gcloud service-directory endpoints create ENDPOINT2 \
   --address IP_ADDRESS2 \
   --port PORT_NUMBER2 \
   --service SERVICE \
   --namespace NAMESPACE \
   --location REGION
```

### Resolve a service

Resolving (by DNS, HTTP, or gRPC) returns all properties of the service, all endpoints, and all annotations.

```bash
gcloud service-directory services resolve SERVICE \
   --namespace NAMESPACE \
   --location REGION
```

### Delete resources

Delete an endpoint:

```bash
gcloud service-directory endpoints delete ENDPOINT \
    --service=SERVICE \
    --namespace=NAMESPACE \
    --location=REGION
```

Delete a service (its endpoints are deleted as well):

```bash
gcloud service-directory services delete SERVICE \
    --namespace=NAMESPACE \
    --location=REGION
```

Delete a namespace (its services and endpoints are deleted as well):

```bash
gcloud service-directory namespaces delete NAMESPACE \
    --location=REGION
```

### Client library (Python)

```python
def create_namespace(project_id: str, location: str, namespace_id: str) -> Namespace:
    """Creates a namespace in the given location.

    Args:
        project_id: Your Google Cloud project id.
        location: The Google Cloud region containing the new namespace.
        namespace_id: A unique id for the namespace.

    Returns:
        The created namespace.
    """

    client = servicedirectory_v1.RegistrationServiceClient()

    namespace = servicedirectory_v1.Namespace(
        name=client.namespace_path(project_id, location, namespace_id)
    )

    response = client.create_namespace(
        parent=f"projects/{project_id}/locations/{location}",
        namespace=namespace,
        namespace_id=namespace_id,
    )

    print(f"Created namespace {response.name}.")

    return response
```

## Options / Props

| Placeholder | Meaning |
|-------------|---------|
| `NAMESPACE` | Name of the namespace |
| `SERVICE` | Name of the service |
| `ENDPOINT`, `ENDPOINT2` | Names of the endpoints created in the service |
| `IP_ADDRESS`, `IP_ADDRESS2` | The IPv6 and IPv4 addresses of the endpoints, respectively |
| `PORT_NUMBER`, `PORT_NUMBER2` | Ports the endpoints run on |
| `KEY_1`, `VALUE_1`, `KEY_2`, `VALUE_2` | Annotation key and value string pairs |
| `ROLE` | Role being granted (see the Service Directory access control page) |
| `REGION` | Google Cloud region that contains the namespace |

## Notes

- Deleting an endpoint, service, or namespace is destructive and cascades (a service takes its endpoints, a namespace takes its services and endpoints). Try it on a disposable resource first.
- A service or namespace with a Service Directory zone pointing to it can be deleted; further DNS queries for the service return `NXDOMAIN` (for a deleted namespace, all queries except SOA/NS requests for the zone origin return `NXDOMAIN`).
- To create a Private Service Connect forwarding rule and register it as a service, see https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services#configure-sd-manual (the producer service's own docs, such as Cloud SQL, are in the `gcp-databases-relational` skill).
- The source also shows Console steps and C#, Go, Java, Node.js, PHP, and Ruby client-library samples for every task; only the Python namespace sample is kept here.
- Per the gcloud 593.0.0 help SYNOPSIS, `gcloud service-directory locations describe LOCATION` takes a single positional `LOCATION`.
- Source: https://docs.cloud.google.com/service-directory/docs/configuring-service-directory (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [key-terms.md](./key-terms.md)
- [quotas.md](./quotas.md)
