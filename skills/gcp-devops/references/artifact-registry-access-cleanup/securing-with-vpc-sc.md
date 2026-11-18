---
source: https://docs.cloud.google.com/artifact-registry/docs/securing-with-vpc-sc
---

# Securing Artifact Registry with VPC Service Controls

VPC Service Controls place Artifact Registry and other Google Cloud services in a security perimeter to prevent unauthorized copying or transfer of data. You can control artifact movement across the perimeter, access repositories via private IP addresses, and configure ingress and egress rules.

## Signature / Usage

Egress rule to use `mirror.gcr.io` (cached Docker Hub images) from inside a service perimeter:

```yaml
- egressTo:
    operations:
    - serviceName: artifactregistry.googleapis.com
      methodSelectors:
      - method: artifactregistry.googleapis.com/DockerRead
    resources:
    - projects/342927644502
  egressFrom:
    identityType: ANY_IDENTITY
```

## Options / Props

### IP ranges for private access

| Range | Domain |
|---|---|
| `199.36.153.4/30` | `restricted.googleapis.com` |
| `199.36.153.8/30` | `private.googleapis.com` |

## Notes

- With Artifact Registry and GKE private clusters inside a perimeter, you can access container images in the perimeter and Google Cloud-provided images. Cached Docker Hub images on `mirror.gcr.io` are not inside the perimeter unless the egress rule above allows egress to the Artifact Registry Docker cache that hosts `mirror.gcr.io`.
- You can reach Artifact Registry through the default Google APIs domain IPs or the special ranges above (see Private Google Access configuration; the "registry access with a virtual IP" page shows an example with `restricted.googleapis.com`).
- Put all services that access Artifact Registry in the same perimeter, including Binary Authorization, Artifact Analysis and runtimes such as GKE and Cloud Run.
- For images in Artifact Registry `gcr.io` repositories, ingress / egress policies must use identity type `ANY_IDENTITY`; `ANY_SERVICE_ACCOUNT` and `ANY_USER_ACCOUNT` cannot be used for the `gcr.io` domain.
- Adding Artifact Analysis to a perimeter is documented on the Artifact Analysis "securing in a service perimeter" page. Perimeter creation and rule syntax are covered by the `gcp-security` skill (VPC Service Controls).
- Source: https://docs.cloud.google.com/artifact-registry/docs/securing-with-vpc-sc (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [protect-artifacts.md](./protect-artifacts.md)
- [access-control.md](./access-control.md)
