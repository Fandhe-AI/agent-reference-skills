---
source: https://docs.docker.com/reference/cli/docker/context/update/
---

# docker context update

Update an existing context. See `docker context create`.

## Signature / Usage

```console
$ docker context update [OPTIONS] CONTEXT
$ docker context update \
    --description "some description" \
    --docker "host=tcp://myserver:2376,ca=~/ca-file,cert=~/cert-file,key=~/key-file" \
    my-context
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--description` |  | Description of the context |
| `--docker` |  | set the docker endpoint |

## Related

- [docker context create](./context-create.md)
