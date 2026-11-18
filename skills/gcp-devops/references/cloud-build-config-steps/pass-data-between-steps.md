---
source: https://docs.cloud.google.com/build/docs/configuring-builds/pass-data-between-steps
---

# Pass data between build steps

Each build step runs in an isolated container that is discarded afterwards. To persist data to later steps, use `/workspace` (the default volume, where the source code is extracted) or define your own named volumes. Volumes keep their contents for the duration of the build.

## Signature / Usage

### Using `/workspace`

The first step writes two files; the second reads them. Everything else in the environment is discarded between steps.

```yaml
steps:
- id: "Store Values"
  name: ubuntu
  entrypoint: bash
  args:
    - -c
    - |
      # Save a value to persistent volume mount: "/workspace"
      echo "First Value" > /workspace/first.txt &&
      # Save another
      expr 1 + 1 > /workspace/second.txt
# In the next step, everything in the environment is discarded
# EXCEPT items in "/workspace"
- id: "Read Values"
  name: ubuntu
  entrypoint: bash
  args:
    - -c
    - |
      # Read from "/workspace"
      echo "First we saved " $(cat /workspace/first.txt) &&
      echo "Then we saved " $(cat /workspace/second.txt)
```

### Using a user-specified volume

Both steps declare a `volumes` block with the same `name` and `path`.

```yaml
steps:
- name: 'ubuntu'
  entrypoint: 'bash'
  args:
    - '-c'
    - |
      echo "Hello, world!" > /persistent_volume/file
  volumes:
  - name: 'myvolume'
    path: '/persistent_volume'
- name: 'ubuntu'
  entrypoint: 'bash'
  args:
    - '-c'
    - |
      cat /persistent_volume/file
  volumes:
  - name: 'myvolume'
    path: '/persistent_volume'
```

## Options / Props

| Field | Description |
|-------|-------------|
| `volumes[].name` | Name of the volume. Use the same name in every step that shares it. |
| `volumes[].path` | File path where the data is stored; read and write under this path. |

## Notes

- Source: https://docs.cloud.google.com/build/docs/configuring-builds/pass-data-between-steps (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Anything written to user-defined volumes and `/workspace` by any step is available to subsequent steps.
- The `-c` flag executes multi-line commands: any string after `-c` is treated as a command.
- Do not write secrets to `/workspace` or a volume unless later steps need them; see the secrets page for the supported flow.
- The source also shows JSON forms of both examples.

## Related

- [configure-build-step-order.md](./configure-build-step-order.md)
- [use-secrets.md](./use-secrets.md)
- [create-basic-configuration.md](./create-basic-configuration.md)
