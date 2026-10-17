---
source: https://docs.docker.com/reference/cli/docker/image/tag/
---

# docker image tag

Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE. Alias: `docker tag`.

## Signature / Usage

```console
$ docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

```console
$ docker tag 0e5574283393 fedora/httpd:version1.0
$ docker tag httpd fedora/httpd:version1.0
$ docker tag httpd:test fedora/httpd:version1.0.test
$ docker tag 0e5574283393 myregistryhost:5000/fedora/httpd:version1.0
```

## Notes

### Image reference format

```text
[HOST[:PORT]/]NAMESPACE/REPOSITORY[:TAG]
```

| Component | Description |
| --- | --- |
| `HOST` | Registry location. If omitted, defaults to Docker Hub (`docker.io`). |
| `PORT` | Optional registry port (e.g. `:5000`). |
| `NAMESPACE/REPOSITORY` | Namespace (optional) usually a user or organization; repository is required. If the namespace is omitted it defaults to `library` (Docker Official Images). |
| `TAG` | Optional version or variant identifier. If omitted, defaults to `latest`. |

`example.com:5000/team/my-app:2.0` has host `example.com`, port `5000`, namespace `team`, repository `my-app`, tag `2.0`. `alpine` has host `docker.io`, namespace `library`, repository `alpine`, tag `latest` (all defaults).

### Other notes

- If the source tag is not specified, the alias is created for the existing local `:latest` version.
- To push to a private registry, include the registry hostname and port (if needed) in the target.
- The canonical definition of the image naming format is the Distribution reference (`github.com/distribution/reference`, on pkg.go.dev).

## Related

- [docker image push](./image-push.md)
- [docker image ls](./image-ls.md)
