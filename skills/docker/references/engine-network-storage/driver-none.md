---
source: https://docs.docker.com/engine/network/drivers/none/
---

# None network driver

To completely isolate the networking stack of a container, start it with `--network none`. Within the container only the loopback device is created.

## Signature / Usage

```console
$ docker run --rm --network none alpine:latest ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
```

## Notes

- No IPv6 loopback address is configured for containers using the `none` driver (only `127.0.0.1/8` on `lo`).
- `none` is not available for Swarm services.

## Related

- [Network drivers](./network-drivers.md)
- [Host network driver](./driver-host.md)
- [Bridge network driver](./driver-bridge.md)
