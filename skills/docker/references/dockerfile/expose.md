---
source: https://docs.docker.com/reference/dockerfile/#expose
---

# EXPOSE

Informs Docker that the container listens on the specified network ports at runtime.

## Signature / Usage

```dockerfile
EXPOSE <port> [<port>/<protocol>...]
```

```dockerfile
EXPOSE 80/udp
```

Expose on both TCP and UDP with two lines:

```dockerfile
EXPOSE 80/tcp
EXPOSE 80/udp
```

## Notes

- The default protocol is TCP.
- `EXPOSE` doesn't actually publish the port. It functions as documentation between the image builder and the person running the container about which ports are intended to be published. Publish at run time with `-p` (map specific ports) or `-P` (publish all exposed ports to high-order ports):

  ```console
  $ docker run -p 80:80/tcp -p 80:80/udp ...
  ```

- With `-P` and both TCP and UDP exposed, the port is exposed once for each protocol, and `-P` uses an ephemeral high-ordered host port, so TCP and UDP don't use the same host port.
- Regardless of `EXPOSE` settings, you can override them at runtime with `-p`.
- `docker network` can create networks for communication among containers without exposing or publishing specific ports; containers on the network communicate over any port.
- Build checks: `ExposeProtoCasing` (protocol should be lowercase) and `ExposeInvalidFormat` (no IP address or host-port mapping in `EXPOSE`).

## Related

- [build-check-rules.md](./build-check-rules.md)
