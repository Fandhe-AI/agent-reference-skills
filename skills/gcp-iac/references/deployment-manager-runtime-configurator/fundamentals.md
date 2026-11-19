---
source: https://docs.cloud.google.com/deployment-manager/docs/fundamentals
---

# Deployment Manager Fundamentals

Deployment Manager describes a deployment as a YAML configuration made of resources, optionally split into Jinja2 or Python templates. This page defines configuration, templates, resources, types (base types, type providers, composite types), manifests and deployments.

## Signature / Usage

### Configuration

A configuration must contain a `resources:` section. Each resource has `name`, `type` and `properties`.

```yaml
resources:
- name: the-first-vm
  type: compute.v1.instance
  properties:
    zone: us-central1-a
    machineType: https://www.googleapis.com/compute/v1/projects/myproject/zones/us-central1-a/machineTypes/f1-micro
    disks:
    - deviceName: boot
      type: PERSISTENT
      boot: true
      autoDelete: true
      initializeParams:
        sourceImage: https://www.googleapis.com/compute/v1/projects/debian-cloud/global/images/debian-7-wheezy-v20150423
    networkInterfaces:
    - network: https://www.googleapis.com/compute/v1/projects/myproject/global/networks/default
      accessConfigs:
      - name: External NAT
        type: ONE_TO_ONE_NAT
```

### Templates (unexpanded configuration)

Template files are Python or Jinja2 and are expanded recursively into the same resource YAML.

```yaml
imports:
- path: vm_template.jinja

resources:
- name: vm-instance
  type: vm_template.jinja
  properties:
    zone: us-central1-a
    project: myproject
```

Adapted (not in the official docs): in the fully-expanded example, `networkInterfaces` is moved out of `initializeParams` and `accessConfigs` is moved under the network interface item (the source indentation nests them incorrectly).

```yaml
resources:
- name: the-first-vm
  type: compute.v1.instance
  properties:
    zone: us-central1-a
    machineType: https://www.googleapis.com/compute/v1/projects/myproject/zones/us-central1-a/machineTypes/f1-micro
    disks:
    - deviceName: boot
      type: PERSISTENT
      boot: true
      autoDelete: true
      initializeParams:
        sourceImage: https://www.googleapis.com/compute/v1/projects/debian-cloud/global/images/debian-7-wheezy-v20150423
    networkInterfaces:
    - network: https://www.googleapis.com/compute/v1/projects/myproject/global/networks/default
      accessConfigs:
      - name: External NAT
        type: ONE_TO_ONE_NAT
```

### Type syntaxes

Google-managed base types:

```text
type: [API].[VERSION].[RESOURCE]
```

Google-managed type providers (beta):

```text
type: gcp-types/[PROVIDER]:[RESOURCE]
```

Base types provided by a type provider (`[COLLECTION]` is the path to the API resource to deploy):

```text
type: [PROJECT_ID]/[TYPE_PROVIDER]:[COLLECTION]
```

Composite types:

```text
type: [PROJECT_ID]/composite:[TYPE_NAME]
```

Calling a composite type:

```yaml
resources:
- name: my-composite-type
  type: myproject/composite:example-composite-type
```

## Options / Props

| Concept | Description |
|---------|-------------|
| Configuration | YAML file listing the resources for a single deployment; needs a `resources:` section |
| Resource fields | `name` (user-defined string), `type` (for example `compute.v1.instance`, `compute.v1.disk`), `properties` (must match the type) |
| Template | Python or Jinja2 file; interpreted recursively and inlined into the configuration |
| Base type | Single primitive resource backed by a RESTful API with Create, Read, Update, Delete (CRUD); for example `compute.v1.instance`, `storage.v1.bucket`, `sqladmin.v1beta4.database` |
| Type provider | Exposes all CRUD resources of an API as base types; needs an OpenAPI or Google Discovery descriptor; advanced scenario |
| Google-managed type providers | Beta; `type: gcp-types/[PROVIDER]:[RESOURCE]` |
| Composite type | One or more preconfigured templates registered with Deployment Manager; expands to base types |
| Manifest | Read-only object with the original configuration, imported templates and the fully-expanded resource list; a new manifest is generated on every update |
| Deployment | Collection of resources deployed and managed together from a configuration |

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down."; use Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Corrected from the official docs: as written, the fully-expanded example parses with `networkInterfaces` inside `disks[0].initializeParams` and `accessConfigs` as a property of the instance; it was re-indented to the nesting of the configuration example at the top of the same page. Example values (image, machine type) are copied as written.
- A truncated `type: compute.v1.instance # The type of resource to deploy` fragment with an elision on the source page is not reproduced here.
- Google recommends creating your own type provider only if you are very familiar with the API.
- Source: https://docs.cloud.google.com/deployment-manager/docs/fundamentals (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deprecations.md](./deprecations.md)
- [dm-convert.md](./dm-convert.md)
