---
source: https://docs.docker.com/compose/how-tos/multiple-compose-files/include/
---

# Include

Incorporate another Compose file (local, OCI artifact, or Git) into the current application with `include`.

```yaml
include:
  - my-compose-include.yaml  #with serviceB declared
services:
  serviceA:
    build: .
    depends_on:
      - serviceB #use serviceB directly as if it was declared in this Compose file
```

From an OCI artifact:

```yaml
include:
  - oci://docker.io/username/my-compose-app:latest # use a Compose file stored as an OCI artifact
services:
  serviceA:
    build: .
    depends_on:
      - serviceB 
```

Local override of an included model:

```yaml
include:
  - path : 
      - third-party/compose.yaml
      - override.yaml  # local override for third-party model
```

## Notes

- Each included path loads as its own application model with its own project directory, so relative paths resolve correctly (unlike `extends` and merge).
- Conflicting resources between the including file and an included file are an error; use a per-include override file or a global `compose.override.yaml` to customize.
- `include` is recursive.
