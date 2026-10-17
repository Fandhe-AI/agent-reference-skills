---
source: https://docs.docker.com/reference/cli/docker/context/inspect/
---

# docker context inspect

Display detailed information on one or more contexts.

## Signature / Usage

```console
$ docker context inspect [OPTIONS] [CONTEXT] [CONTEXT...]
$ docker context inspect "local+aks"
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints using the given Go template. See https://docs.docker.com/go/formatting/ |

## Notes

- Example output (abbreviated from the official page):

```json
[
  {
    "Name": "local+aks",
    "Metadata": {
      "Description": "Local Docker Engine",
      "StackOrchestrator": "swarm"
    },
    "Endpoints": {
      "docker": {
        "Host": "npipe:////./pipe/docker_engine",
        "SkipTLSVerify": false
      }
    },
    "TLSMaterial": {},
    "Storage": {
      "MetadataPath": "C:\\Users\\simon\\.docker\\contexts\\meta\\cb6d08c0a1bfa5fe6f012e61a442788c00bed93f509141daff05f620fc54ddee",
      "TLSPath": "C:\\Users\\simon\\.docker\\contexts\\tls\\cb6d08c0a1bfa5fe6f012e61a442788c00bed93f509141daff05f620fc54ddee"
    }
  }
]
```

## Related

- [docker context ls](./context-ls.md)
